import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { mockProperties, propertyTypes, categories, cities } from "@/data/mockData";
import { MapPin, Search, DollarSign, Ruler, Eye, X } from "lucide-react";
import { Property } from "@/types/property";

const MapSearch = () => {
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
        <div className="flex-1 relative rounded-lg overflow-hidden bg-slate-100 flex items-center justify-center">
          <div className="w-full h-full bg-gradient-to-br from-blue-50 to-slate-100 relative">
            {/* Simulated Map Grid */}
            <div className="absolute inset-0 grid grid-cols-4 grid-rows-4 opacity-10">
              {Array.from({ length: 16 }).map((_, i) => (
                <div key={i} className="border border-slate-300" />
              ))}
            </div>

            {/* Map Title */}
            <div className="absolute top-4 left-4 bg-white px-4 py-2 rounded-lg shadow-md z-10">
              <p className="font-semibold text-slate-900">{selectedCity}</p>
              <p className="text-xs text-slate-600">{filteredProperties.length} propriétés</p>
            </div>

            {/* Legend */}
            <div className="absolute bottom-4 left-4 bg-white p-3 rounded-lg shadow-md z-10">
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

            {/* Property Markers */}
            <div className="absolute inset-0">
              {filteredProperties.map((property) => {
                // Simulated positioning based on index
                const lat = property.latitude || 45.5;
                const lng = property.longitude || -73.5;
                const x = ((lng + 74) / 2) * 100;
                const y = ((46 - lat) * 100) / 1;
                const isSelected = selectedProperty?.id === property.id;

                return (
                  <div
                    key={property.id}
                    className="absolute cursor-pointer"
                    style={{
                      left: `${Math.max(0, Math.min(100, x))}%`,
                      top: `${Math.max(0, Math.min(100, y))}%`,
                      transform: "translate(-50%, -50%)",
                    }}
                    onClick={() => setSelectedProperty(property)}
                  >
                    <div
                      className={`transition-all ${
                        isSelected
                          ? "w-12 h-12 shadow-lg ring-4 ring-white"
                          : "w-8 h-8 hover:w-10 hover:h-10 hover:shadow-md"
                      }`}
                      style={{
                        backgroundColor: getMarkerColor(property.type),
                        borderRadius: "50%",
                        border: isSelected ? "3px solid white" : "2px solid white",
                      }}
                    >
                      <div className="w-full h-full flex items-center justify-center text-white text-xs font-bold">
                        {property.id}
                      </div>
                    </div>
                  </div>
                );
              })}
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
    </div>
  );
};

export default MapSearch;
