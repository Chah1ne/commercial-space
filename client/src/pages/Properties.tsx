import { useSearchParams, Link } from "react-router-dom";
import { useState, useMemo } from "react";
import { Filter, Grid3X3, List, MapPin, Search, SlidersHorizontal, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { mockProperties, propertyTypes, categories, cities } from "@/data/mockData";
import PropertyCard from "@/components/PropertyCard";
import { Property } from "@/types/property";

const Properties = () => {
  const [searchParams] = useSearchParams();
  const [showFilters, setShowFilters] = useState(true);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const [filters, setFilters] = useState({
    query: searchParams.get("query") || "",
    type: searchParams.get("type")?.split(",").filter(Boolean) || [],
    category: searchParams.get("category") || "",
    city: searchParams.get("city") || "",
    postalCode: searchParams.get("postalCode") || "",
    minPrice: parseInt(searchParams.get("minPrice") || "0"),
    maxPrice: parseInt(searchParams.get("maxPrice") || "1000000"),
    minArea: parseInt(searchParams.get("minArea") || "0"),
    maxArea: parseInt(searchParams.get("maxArea") || "100000"),
    leed: searchParams.get("leed") === "true",
    bomaBest: searchParams.get("bomaBest") === "true",
    parking: searchParams.get("parking") === "true",
    transit: searchParams.get("transit") === "true",
    elevator: searchParams.get("elevator") === "true",
    amenities: searchParams.get("amenities")?.split(",").filter(Boolean) || [],
    sortBy: searchParams.get("sortBy") || "newest",
  });

  const updateFilter = (key: string, value: any) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const filteredProperties = useMemo(() => {
    let results = [...mockProperties];

    // Category filter
    if (filters.category) {
      results = results.filter((p) => p.category === filters.category);
    }

    // Type filter (multiple)
    if (filters.type.length > 0) {
      results = results.filter((p) => filters.type.includes(p.type));
    }

    // City filter
    if (filters.city) {
      results = results.filter((p) => p.city === filters.city);
    }

    // Postal code filter
    if (filters.postalCode) {
      results = results.filter((p) => p.postalCode.includes(filters.postalCode));
    }

    // Query filter
    if (filters.query) {
      const q = filters.query.toLowerCase();
      results = results.filter((p) =>
        p.title.toLowerCase().includes(q) ||
        p.address.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.city.toLowerCase().includes(q)
      );
    }

    // Price filter
    if (filters.minPrice > 0) {
      results = results.filter((p) => {
        const price = p.priceUnit === "mois" ? p.price * 12 : p.price;
        return price >= filters.minPrice;
      });
    }
    if (filters.maxPrice < 1000000) {
      results = results.filter((p) => {
        const price = p.priceUnit === "mois" ? p.price * 12 : p.price;
        return price <= filters.maxPrice;
      });
    }

    // Area filter
    if (filters.minArea > 0) {
      results = results.filter((p) => p.area >= filters.minArea);
    }
    if (filters.maxArea < 100000) {
      results = results.filter((p) => p.area <= filters.maxArea);
    }

    // Amenities filter
    if (filters.amenities.length > 0) {
      results = results.filter((p) => {
        return filters.amenities.some((amenity) => {
          switch (amenity) {
            case "parking": return p.amenities.parking > 0;
            case "elevator": return p.amenities.elevator;
            case "transitAccess": return p.amenities.transitAccess;
            case "airConditioning": return p.amenities.airConditioning;
            case "cafeteria": return p.amenities.cafeteria;
            default: return true;
          }
        });
      });
    }

    // Certifications filter
    if (filters.leed) {
      results = results.filter((p) => p.amenities.leed);
    }
    if (filters.bomaBest) {
      results = results.filter((p) => p.amenities.bomaBest);
    }

    // Parking filter
    if (filters.parking) {
      results = results.filter((p) => p.amenities.parking > 0);
    }

    // Transit filter
    if (filters.transit) {
      results = results.filter((p) => p.amenities.transitAccess);
    }

    // Elevator filter
    if (filters.elevator) {
      results = results.filter((p) => p.amenities.elevator);
    }

    // Sorting
    switch (filters.sortBy) {
      case "price-asc":
        results.sort((a, b) => {
          const priceA = a.priceUnit === "mois" ? a.price * 12 : a.price;
          const priceB = b.priceUnit === "mois" ? b.price * 12 : b.price;
          return priceA - priceB;
        });
        break;
      case "price-desc":
        results.sort((a, b) => {
          const priceA = a.priceUnit === "mois" ? a.price * 12 : a.price;
          const priceB = b.priceUnit === "mois" ? b.price * 12 : b.price;
          return priceB - priceA;
        });
        break;
      case "area-asc":
        results.sort((a, b) => a.area - b.area);
        break;
      case "area-desc":
        results.sort((a, b) => b.area - a.area);
        break;
      case "newest":
        results.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
        break;
      case "views":
        results.sort((a, b) => b.views - a.views);
        break;
      default:
        results.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
    }

    return results;
  }, [filters]);

  const clearFilters = () => {
    setFilters({
      query: "",
      type: [],
      category: "",
      city: "",
      postalCode: "",
      minPrice: 0,
      maxPrice: 1000000,
      minArea: 0,
      maxArea: 100000,
      leed: false,
      bomaBest: false,
      parking: false,
      transit: false,
      elevator: false,
      amenities: [],
      sortBy: "newest",
    });
  };

  const activeFilterCount = [
    filters.type.length > 0,
    filters.category,
    filters.city,
    filters.query,
    filters.minArea > 0,
    filters.maxArea < 100000,
    filters.minPrice > 0,
    filters.maxPrice < 1000000,
    filters.leed,
    filters.bomaBest,
    filters.parking,
    filters.transit,
    filters.elevator,
    filters.amenities.length > 0,
  ].filter(Boolean).length;

  return (
    <div className="min-h-screen bg-background">
      {/* Search bar */}
      <div className="bg-primary py-6">
        <div className="container">
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                value={filters.query}
                onChange={(e) => updateFilter("query", e.target.value)}
                placeholder="Rechercher par adresse, ville, mot-clé..."
                className="w-full h-11 rounded-lg border-0 bg-card pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10 gap-2"
            >
              <SlidersHorizontal className="h-4 w-4" />
              Filtres
              {activeFilterCount > 0 && (
                <span className="bg-accent text-accent-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                  {activeFilterCount}
                </span>
              )}
            </Button>
          </div>
        </div>
      </div>

      <div className="container py-8">
        <div className="flex gap-8">
          {/* Sidebar Filters */}
          {showFilters && (
            <aside className="hidden lg:block w-72 shrink-0">
              <div className="bg-card rounded-xl border border-border p-5 sticky top-24">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-foreground flex items-center gap-2">
                    <Filter className="h-4 w-4" /> Filtres
                  </h3>
                  {activeFilterCount > 0 && (
                    <button onClick={clearFilters} className="text-xs text-accent hover:underline">Effacer tout</button>
                  )}
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Catégorie</label>
                    <select value={filters.category} onChange={(e) => updateFilter("category", e.target.value)} className="w-full h-9 rounded-md border border-input bg-background px-3 text-sm">
                      <option value="">Toutes</option>
                      {categories.map((c) => <option key={c.value} value={c.value}>{c.label}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Type</label>
                    <select value={filters.type} onChange={(e) => updateFilter("type", e.target.value)} className="w-full h-9 rounded-md border border-input bg-background px-3 text-sm">
                      <option value="">Tous les types</option>
                      {propertyTypes.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Ville</label>
                    <select value={filters.city} onChange={(e) => updateFilter("city", e.target.value)} className="w-full h-9 rounded-md border border-input bg-background px-3 text-sm">
                      <option value="">Toutes les villes</option>
                      {cities.map((c) => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Superficie (pi²)</label>
                    <div className="grid grid-cols-2 gap-2">
                      <input placeholder="Min" value={filters.minArea} onChange={(e) => updateFilter("minArea", e.target.value)} className="h-9 rounded-md border border-input bg-background px-3 text-sm" />
                      <input placeholder="Max" value={filters.maxArea} onChange={(e) => updateFilter("maxArea", e.target.value)} className="h-9 rounded-md border border-input bg-background px-3 text-sm" />
                    </div>
                  </div>
                </div>
              </div>
            </aside>
          )}

          {/* Results */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-xl font-bold text-foreground">
                  {filteredProperties.length} propriété{filteredProperties.length !== 1 ? "s" : ""} trouvée{filteredProperties.length !== 1 ? "s" : ""}
                </h1>
              </div>
              <div className="flex items-center gap-3">
                <select value={filters.sortBy} onChange={(e) => updateFilter("sortBy", e.target.value)} className="h-9 rounded-md border border-input bg-background px-3 text-sm">
                  <option value="relevance">Pertinence</option>
                  <option value="newest">Plus récentes</option>
                  <option value="price-asc">Prix croissant</option>
                  <option value="price-desc">Prix décroissant</option>
                  <option value="area-asc">Superficie (croissante)</option>
                  <option value="area-desc">Superficie (décroissante)</option>
                  <option value="views">Plus consultées</option>
                </select>
                <div className="hidden md:flex border border-border rounded-lg overflow-hidden">
                  <button onClick={() => setViewMode("grid")} className={`p-2 ${viewMode === "grid" ? "bg-accent text-accent-foreground" : "bg-card text-muted-foreground hover:bg-muted"}`}>
                    <Grid3X3 className="h-4 w-4" />
                  </button>
                  <button onClick={() => setViewMode("list")} className={`p-2 ${viewMode === "list" ? "bg-accent text-accent-foreground" : "bg-card text-muted-foreground hover:bg-muted"}`}>
                    <List className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            {filteredProperties.length === 0 ? (
              <div className="text-center py-20">
                <MapPin className="h-12 w-12 text-muted-foreground/30 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">Aucune propriété trouvée</h3>
                <p className="text-muted-foreground mb-4">Essayez de modifier vos critères de recherche</p>
                <Button onClick={clearFilters} variant="outline">Effacer les filtres</Button>
              </div>
            ) : (
              <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6" : "flex flex-col gap-4"}>
                {filteredProperties.map((property) => (
                  <PropertyCard key={property.id} property={property} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Properties;
