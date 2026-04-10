import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Search, X, MapPin, DollarSign, Ruler, Zap } from "lucide-react";
import { propertyTypes, categories, cities, provinces } from "@/data/mockData";

interface SearchFilters {
  query: string;
  type: string[];
  category: string;
  city: string;
  province: string;
  postalCode: string;
  searchRadius: number;
  minPrice: number;
  maxPrice: number;
  minArea: number;
  maxArea: number;
  amenities: string[];
  leed: boolean;
  bomaBest: boolean;
  parking: boolean;
  transit: boolean;
  elevator: boolean;
  sortBy: string;
}

const AdvancedSearch = () => {
  const navigate = useNavigate();
  const [filters, setFilters] = useState<SearchFilters>({
    query: "",
    type: [],
    category: "",
    city: "",
    province: "Québec",
    postalCode: "",
    searchRadius: 25,
    minPrice: 0,
    maxPrice: 1000000,
    minArea: 0,
    maxArea: 100000,
    amenities: [],
    leed: false,
    bomaBest: false,
    parking: false,
    transit: false,
    elevator: false,
    sortBy: "relevance",
  });

  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);

  const amenitiesList = [
    { id: "airConditioning", label: "Air climatisé" },
    { id: "alarmSystem", label: "Système d'alarme" },
    { id: "conferenceRooms", label: "Salles de conférence" },
    { id: "cafeteria", label: "Cafétéria/Cuisine" },
    { id: "elevator", label: "Ascenseur" },
    { id: "loadingDock", label: "Quai de chargement" },
    { id: "sprinklers", label: "Gicleurs" },
    { id: "parking", label: "Stationnement" },
    { id: "transitAccess", label: "Transport en commun" },
    { id: "wheelchair", label: "Accessible aux fauteuils roulants" },
    { id: "highVoltage", label: "Électricité haute tension" },
  ];

  const handlePropertyTypeChange = (type: string) => {
    setFilters((prev) => ({
      ...prev,
      type: prev.type.includes(type)
        ? prev.type.filter((t) => t !== type)
        : [...prev.type, type],
    }));
  };

  const handleAmenityChange = (amenity: string) => {
    setSelectedAmenities((prev) =>
      prev.includes(amenity)
        ? prev.filter((a) => a !== amenity)
        : [...prev, amenity]
    );
    setFilters((prev) => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter((a) => a !== amenity)
        : [...prev.amenities, amenity],
    }));
  };

  const handleSearch = useCallback(() => {
    const queryParams = new URLSearchParams();
    
    if (filters.query) queryParams.append("query", filters.query);
    if (filters.type.length > 0) queryParams.append("type", filters.type.join(","));
    if (filters.category) queryParams.append("category", filters.category);
    if (filters.city) queryParams.append("city", filters.city);
    if (filters.postalCode) queryParams.append("postalCode", filters.postalCode);
    if (filters.searchRadius) queryParams.append("radius", filters.searchRadius.toString());
    if (filters.minPrice > 0) queryParams.append("minPrice", filters.minPrice.toString());
    if (filters.maxPrice < 1000000) queryParams.append("maxPrice", filters.maxPrice.toString());
    if (filters.minArea > 0) queryParams.append("minArea", filters.minArea.toString());
    if (filters.maxArea < 100000) queryParams.append("maxArea", filters.maxArea.toString());
    if (filters.leed) queryParams.append("leed", "true");
    if (filters.bomaBest) queryParams.append("bomaBest", "true");
    if (filters.parking) queryParams.append("parking", "true");
    if (filters.transit) queryParams.append("transit", "true");
    if (filters.elevator) queryParams.append("elevator", "true");
    if (filters.sortBy) queryParams.append("sortBy", filters.sortBy);
    if (selectedAmenities.length > 0) queryParams.append("amenities", selectedAmenities.join(","));

    navigate(`/proprietes?${queryParams.toString()}`);
  }, [filters, selectedAmenities, navigate]);

  const handleReset = () => {
    setFilters({
      query: "",
      type: [],
      category: "",
      city: "",
      province: "Québec",
      postalCode: "",
      searchRadius: 25,
      minPrice: 0,
      maxPrice: 1000000,
      minArea: 0,
      maxArea: 100000,
      amenities: [],
      leed: false,
      bomaBest: false,
      parking: false,
      transit: false,
      elevator: false,
      sortBy: "relevance",
    });
    setSelectedAmenities([]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Recherche Avancée</h1>
          <p className="text-lg text-gray-600">
            Trouvez le local commercial parfait avec nos filtres détaillés
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Filters Sidebar */}
          <Card className="lg:col-span-1 p-6 h-fit sticky top-20">
            <div className="space-y-6">
              {/* Search Query */}
              <div>
                <Label htmlFor="query" className="text-base font-semibold mb-2 block">
                  Mots-clés
                </Label>
                <Input
                  id="query"
                  placeholder="Montréal, bureau, entrepôt..."
                  value={filters.query}
                  onChange={(e) => setFilters((prev) => ({ ...prev, query: e.target.value }))}
                  className="w-full"
                />
              </div>

              {/* Property Type */}
              <div>
                <Label className="text-base font-semibold mb-3 block">Type de propriété</Label>
                <div className="space-y-2">
                  {propertyTypes.map((type) => (
                    <div key={type.value} className="flex items-center space-x-2">
                      <Checkbox
                        id={type.value}
                        checked={filters.type.includes(type.value)}
                        onCheckedChange={() => handlePropertyTypeChange(type.value)}
                      />
                      <label
                        htmlFor={type.value}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                      >
                        {type.label}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Category */}
              <div>
                <Label className="text-base font-semibold mb-2 block">Type de transaction</Label>
                <Select value={filters.category} onValueChange={(value) => setFilters((prev) => ({ ...prev, category: value }))}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Sélectionner..." />
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

              {/* Location */}
              <div className="space-y-3 border-t pt-4">
                <Label className="text-base font-semibold mb-2 block flex items-center gap-2">
                  <MapPin className="w-4 h-4" /> Localisation
                </Label>
                
                <div>
                  <Label htmlFor="province" className="text-sm mb-1 block">Province</Label>
                  <Select value={filters.province} onValueChange={(value) => setFilters((prev) => ({ ...prev, province: value }))}>
                    <SelectTrigger id="province" className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {provinces.map((prov) => (
                        <SelectItem key={prov} value={prov}>
                          {prov}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="city" className="text-sm mb-1 block">Ville</Label>
                  <Select value={filters.city} onValueChange={(value) => setFilters((prev) => ({ ...prev, city: value }))}>
                    <SelectTrigger id="city" className="w-full">
                      <SelectValue placeholder="Sélectionner..." />
                    </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Toutes</SelectItem>
                      {cities.map((city) => (
                        <SelectItem key={city} value={city}>
                          {city}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="postal" className="text-sm mb-1 block">Code postal</Label>
                  <Input
                    id="postal"
                    placeholder="H3B 4W8"
                    value={filters.postalCode}
                    onChange={(e) => setFilters((prev) => ({ ...prev, postalCode: e.target.value }))}
                  />
                </div>

                <div>
                  <Label htmlFor="radius" className="text-sm mb-2 block">
                    Rayon de recherche: {filters.searchRadius} km
                  </Label>
                  <Slider
                    value={[filters.searchRadius || 25]}
                    onValueChange={(value) => setFilters((prev) => ({ ...prev, searchRadius: value[0] }))}
                    min={1}
                    max={50}
                    step={1}
                    className="w-full"
                  />
                </div>
              </div>

              {/* Price */}
              <div className="space-y-3 border-t pt-4">
                <Label className="text-base font-semibold mb-2 block flex items-center gap-2">
                  <DollarSign className="w-4 h-4" /> Prix
                </Label>
                
                <div>
                  <Label htmlFor="minPrice" className="text-sm mb-1 block">Prix minimum ($)</Label>
                  <Input
                    id="minPrice"
                    type="number"
                    value={filters.minPrice}
                    onChange={(e) => setFilters((prev) => ({ ...prev, minPrice: parseInt(e.target.value) || 0 }))}
                  />
                </div>

                <div>
                  <Label htmlFor="maxPrice" className="text-sm mb-1 block">Prix maximum ($)</Label>
                  <Input
                    id="maxPrice"
                    type="number"
                    value={filters.maxPrice}
                    onChange={(e) => setFilters((prev) => ({ ...prev, maxPrice: parseInt(e.target.value) || 1000000 }))}
                  />
                </div>
              </div>

              {/* Area */}
              <div className="space-y-3 border-t pt-4">
                <Label className="text-base font-semibold mb-2 block flex items-center gap-2">
                  <Ruler className="w-4 h-4" /> Superficie
                </Label>
                
                <div>
                  <Label htmlFor="minArea" className="text-sm mb-1 block">Superficie min (pi²)</Label>
                  <Input
                    id="minArea"
                    type="number"
                    value={filters.minArea}
                    onChange={(e) => setFilters((prev) => ({ ...prev, minArea: parseInt(e.target.value) || 0 }))}
                  />
                </div>

                <div>
                  <Label htmlFor="maxArea" className="text-sm mb-1 block">Superficie max (pi²)</Label>
                  <Input
                    id="maxArea"
                    type="number"
                    value={filters.maxArea}
                    onChange={(e) => setFilters((prev) => ({ ...prev, maxArea: parseInt(e.target.value) || 100000 }))}
                  />
                </div>
              </div>

              {/* Amenities */}
              <div className="space-y-3 border-t pt-4">
                <Label className="text-base font-semibold mb-2 block flex items-center gap-2">
                  <Zap className="w-4 h-4" /> Commodités
                </Label>
                <div className="space-y-2 max-h-56 overflow-y-auto">
                  {amenitiesList.map((amenity) => (
                    <div key={amenity.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={amenity.id}
                        checked={selectedAmenities.includes(amenity.id)}
                        onCheckedChange={() => handleAmenityChange(amenity.id)}
                      />
                      <label
                        htmlFor={amenity.id}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                      >
                        {amenity.label}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Certifications */}
              <div className="space-y-2 border-t pt-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="leed"
                    checked={filters.leed}
                    onCheckedChange={(checked) => setFilters((prev) => ({ ...prev, leed: checked as boolean }))}
                  />
                  <label htmlFor="leed" className="text-sm font-medium cursor-pointer">
                    Certification LEED
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="bomaBest"
                    checked={filters.bomaBest}
                    onCheckedChange={(checked) => setFilters((prev) => ({ ...prev, bomaBest: checked as boolean }))}
                  />
                  <label htmlFor="bomaBest" className="text-sm font-medium cursor-pointer">
                    Certifié BOMA BESt
                  </label>
                </div>
              </div>

              {/* Sort */}
              <div className="border-t pt-4">
                <Label htmlFor="sort" className="text-base font-semibold mb-2 block">Tri</Label>
                <Select value={filters.sortBy} onValueChange={(value) => setFilters((prev) => ({ ...prev, sortBy: value }))}>
                  <SelectTrigger id="sort" className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="relevance">Pertinence</SelectItem>
                    <SelectItem value="price-asc">Prix (croissant)</SelectItem>
                    <SelectItem value="price-desc">Prix (décroissant)</SelectItem>
                    <SelectItem value="area-asc">Superficie (croissante)</SelectItem>
                    <SelectItem value="area-desc">Superficie (décroissante)</SelectItem>
                    <SelectItem value="newest">Plus récent</SelectItem>
                    <SelectItem value="views">Plus consulté</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Buttons */}
              <div className="space-y-2 border-t pt-4 flex flex-col gap-2">
                <Button onClick={handleSearch} className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                  <Search className="w-4 h-4 mr-2" />
                  Rechercher
                </Button>
                <Button onClick={handleReset} variant="outline" className="w-full">
                  <X className="w-4 h-4 mr-2" />
                  Réinitialiser
                </Button>
              </div>
            </div>
          </Card>

          {/* Results Preview */}
          <div className="lg:col-span-3">
            <Card className="p-8">
              <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Filtres Actifs</h2>
                <div className="flex flex-wrap gap-2 justify-center mb-6">
                  {filters.type.length > 0 && filters.type.map((type) => (
                    <Badge key={type} variant="secondary">
                      {propertyTypes.find((t) => t.value === type)?.label}
                    </Badge>
                  ))}
                  {filters.category && (
                    <Badge variant="secondary">
                      {categories.find((c) => c.value === filters.category)?.label}
                    </Badge>
                  )}
                  {filters.city && (
                    <Badge variant="secondary">
                      {filters.city}
                    </Badge>
                  )}
                  {filters.leed && <Badge variant="secondary">LEED</Badge>}
                  {filters.bomaBest && <Badge variant="secondary">BOMA BESt</Badge>}
                </div>
                <p className="text-gray-600 mb-4">
                  Cliquez sur "Rechercher" pour voir les résultats correspondant à vos critères
                </p>
                <Button onClick={handleSearch} className="bg-blue-600 hover:bg-blue-700 text-white">
                  <Search className="w-4 h-4 mr-2" />
                  Voir les résultats
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvancedSearch;
