import { useState, useMemo, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { mockProperties, propertyTypes, categories, cities } from "@/data/mockData";
import { MapPin, Search, DollarSign, Ruler, Eye, X } from "lucide-react";
import { Property } from "@/types/property";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const MapSearch = () => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const markersRef = useRef<L.Layer[]>([]);
  const [selectedCity, setSelectedCity] = useState("Montréal");
  const [selectedType, setSelectedType] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);

  const filteredProperties = useMemo(() => {
    let results = [...mockProperties];
    
    if (selectedCity) {
      results = results.filter((p) => p.city === selectedCity);
    }
    if (selectedType) {
      results = results.filter((p) => p.type === selectedType);
    }
    if (selectedCategory) {
      results = results.filter((p) => p.category === selectedCategory);
    }

    return results;
  }, [selectedCity, selectedType, selectedCategory]);

  const getMarkerColor = (type: string) => {
    const colors: Record<string, string> = {
      commercial: "#EF4444",
      bureau: "#3B82F6",
      industriel: "#F59E0B",
      terrain: "#10B981",
    };
    return colors[type] || "#6366F1";
  };

  const typeLabels: Record<string, string> = {
    commercial: "Commercial",
    bureau: "Bureau",
    industriel: "Industriel",
    terrain: "Terrain",
  };

  // Coordonnées des villes québécoises
  const cityCoordinates: Record<string, [number, number]> = {
    "Montréal": [45.5017, -73.5673],
    "Québec": [46.8139, -71.2080],
    "Gatineau": [45.4425, -75.6992],
    "Laval": [45.5695, -73.7445],
    "Longueuil": [45.5406, -73.5323],
  };

  // Initialize map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Only initialize once
    if (mapRef.current) return;

    const coordinates = cityCoordinates[selectedCity] || [46, -73];
    
    // Create map
    mapRef.current = L.map(mapContainerRef.current).setView(coordinates, 11);

    // Add OpenStreetMap tiles
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; OpenStreetMap contributors',
      maxZoom: 19,
    }).addTo(mapRef.current);

    return () => {
      // Cleanup on unmount
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  // Update map when city changes
  useEffect(() => {
    if (!mapRef.current) return;

    const coordinates = cityCoordinates[selectedCity] || [46, -73];
    mapRef.current.setView(coordinates, 11);
  }, [selectedCity]);

  // Update markers when filtered properties change
  useEffect(() => {
    if (!mapRef.current) return;

    // Clear existing markers
    markersRef.current.forEach((marker) => marker.remove());
    markersRef.current = [];

    // Add new markers
    filteredProperties.forEach((property) => {
      const lat = property.latitude || cityCoordinates[property.city]?.[0] || 45.5;
      const lng = property.longitude || cityCoordinates[property.city]?.[1] || -73.5;

      const marker = L.circleMarker([lat, lng], {
        radius: 8,
        fillColor: getMarkerColor(property.type),
        color: "#fff",
        weight: 2,
        opacity: 1,
        fillOpacity: 0.8,
      })
        .bindPopup(`<strong>${property.title}</strong><br/>${property.address}`, {
          closeButton: false,
        })
        .on("click", () => setSelectedProperty(property));

      marker.addTo(mapRef.current!);
      markersRef.current.push(marker);
    });
  }, [filteredProperties]);

  return (
    <div className="min-h-screen bg-background">
      <div className="h-screen flex gap-6 p-6">
        {/* Sidebar Controls */}
        <div className="w-80 flex flex-col gap-4">
          {/* Search Controls */}
          <Card className="p-4 flex-shrink-0">
            <div className="space-y-4">
              <div>
                <Label className="text-sm font-semibold mb-2 block">Ville</Label>
                <Select value={selectedCity} onValueChange={setSelectedCity}>
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {cities.map((city) => (
                      <SelectItem key={city} value={city}>
                        {city}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-sm font-semibold mb-2 block">Type</Label>
                <Select value={selectedType} onValueChange={setSelectedType}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Tous" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tous</SelectItem>
                    {propertyTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-sm font-semibold mb-2 block">Catégorie</Label>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Tous" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tous</SelectItem>
                    {categories.map((cat) => (
                      <SelectItem key={cat.value} value={cat.value}>
                        {cat.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </Card>

          {/* Properties List */}
          <div className="flex-1 overflow-y-auto">
            <div className="space-y-3">
              {filteredProperties.length === 0 ? (
                <Card className="p-4 text-center text-muted-foreground">
                  Aucune propriété trouvée
                </Card>
              ) : (
                filteredProperties.map((property) => (
                  <Card
                    key={property.id}
                    className={`p-3 cursor-pointer transition-all ${
                      selectedProperty?.id === property.id
                        ? "ring-2 ring-accent bg-accent/5"
                        : "hover:shadow-md"
                    }`}
                    onClick={() => setSelectedProperty(property)}
                  >
                    <div className="flex items-start gap-3 mb-2">
                      <div
                        className="w-3 h-3 rounded-full mt-1 flex-shrink-0"
                        style={{ backgroundColor: getMarkerColor(property.type) }}
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-sm line-clamp-1 text-foreground">
                          {property.title}
                        </h4>
                        <p className="text-xs text-muted-foreground line-clamp-1">
                          {property.address}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between gap-2 text-xs">
                      <Badge variant="secondary">{typeLabels[property.type]}</Badge>
                      <span className="font-semibold text-accent">
                        {property.priceUnit === "total"
                          ? `$${property.price.toLocaleString()}`
                          : property.priceUnit === "mois"
                          ? `$${property.price}/mois`
                          : `$${property.price}/pi²/an`}
                      </span>
                    </div>
                  </Card>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Map Area */}
        <div className="flex-1 relative rounded-lg overflow-hidden bg-slate-100">
          {/* Leaflet Map Container */}
          <div
            ref={mapContainerRef}
            className="w-full h-full rounded-lg"
            style={{ position: "relative" }}
          />

          {/* Map Info Overlay */}
          <div className="absolute top-4 left-4 bg-white px-4 py-2 rounded-lg shadow-md z-[400]">
            <p className="font-semibold text-slate-900">{selectedCity}</p>
            <p className="text-xs text-slate-600">{filteredProperties.length} propriétés</p>
          </div>

          {/* Legend */}
          <div className="absolute bottom-4 left-4 bg-white p-3 rounded-lg shadow-md z-[400]">
            <p className="text-xs font-semibold mb-2 text-slate-900">Légende</p>
            <div className="space-y-1.5 text-xs">
              {Object.entries(typeLabels).map(([key, label]) => (
                <div key={key} className="flex items-center gap-2">
                  <div
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: getMarkerColor(key) }}
                  />
                  <span className="text-slate-700">{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Property Info Card */}
          {selectedProperty && (
            <div className="absolute right-4 bottom-4 w-80 bg-white rounded-lg shadow-xl z-20 overflow-hidden animate-in">
              <div className="relative h-40 bg-slate-200 overflow-hidden">
                <img
                  src={selectedProperty.images[0]}
                  alt={selectedProperty.title}
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={() => setSelectedProperty(null)}
                  className="absolute top-2 right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center hover:bg-slate-100"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="p-4 space-y-3">
                <div>
                  <h3 className="font-bold text-foreground line-clamp-1">
                    {selectedProperty.title}
                  </h3>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                    <MapPin className="w-3 h-3" />
                    {selectedProperty.address}, {selectedProperty.city}
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 text-center text-xs">
                  <div className="bg-slate-50 p-2 rounded">
                    <p className="text-muted-foreground mb-0.5">Superficie</p>
                    <p className="font-semibold">{selectedProperty.area.toLocaleString()} pi²</p>
                  </div>
                  <div className="bg-slate-50 p-2 rounded">
                    <p className="text-muted-foreground mb-0.5">Prix</p>
                    <p className="font-semibold text-accent">${selectedProperty.price}</p>
                  </div>
                  <div className="bg-slate-50 p-2 rounded">
                    <p className="text-muted-foreground mb-0.5">Vues</p>
                    <p className="font-semibold">{selectedProperty.views}</p>
                  </div>
                </div>

                <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
                  Voir les détails
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MapSearch;
