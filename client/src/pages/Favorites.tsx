import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, MapPin, Maximize2, Tag, Trash2, Filter, Search, Grid3X3, List } from "lucide-react";
import { mockProperties } from "@/data/mockData";
import PropertyCard from "@/components/PropertyCard";

const Favorites = () => {
  const [favoriteIds, setFavoriteIds] = useState<string[]>(["1", "3", "6"]);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState("date");
  const [filterType, setFilterType] = useState("");

  const favProperties = useMemo(() => {
    let results = mockProperties.filter((p) => favoriteIds.includes(p.id));

    if (filterType) {
      results = results.filter((p) => p.type === filterType);
    }

    switch (sortBy) {
      case "price-asc":
        results.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        results.sort((a, b) => b.price - a.price);
        break;
      case "area":
        results.sort((a, b) => b.area - a.area);
        break;
      case "date":
        results.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
        break;
    }

    return results;
  }, [favoriteIds, filterType, sortBy]);

  const removeFavorite = (id: string) => {
    setFavoriteIds((prev) => prev.filter((fav) => fav !== id));
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-primary py-8">
        <div className="container">
          <div className="flex items-center gap-3 mb-4">
            <Heart className="w-8 h-8 text-accent fill-accent" />
            <h1 className="text-3xl font-bold text-primary-foreground">Mes Favoris</h1>
          </div>
          <p className="text-primary-foreground/70">
            {favProperties.length} propriété{favProperties.length !== 1 ? "s" : ""} sauvegardée{favProperties.length !== 1 ? "s" : ""}
          </p>
        </div>
      </div>

      <div className="container py-8">
        {favoriteIds.length === 0 ? (
          <Card className="p-12 text-center">
            <Heart className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-foreground mb-2">Pas de propriétés sauvegardées</h2>
            <p className="text-muted-foreground mb-6">
              Vous n'avez pas encore ajouté de propriétés à vos favoris.
            </p>
            <Link to="/proprietes">
              <Button className="bg-accent hover:bg-accent/90 text-accent-foreground">
                <Search className="w-4 h-4 mr-2" />
                Explorez les propriétés
              </Button>
            </Link>
          </Card>
        ) : (
          <div className="space-y-6">
            {/* Controls */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="h-9 rounded-md border border-input bg-background px-3 text-sm flex-1 sm:flex-none"
                >
                  <option value="">Tous les types</option>
                  <option value="commercial">Commercial</option>
                  <option value="bureau">Bureau</option>
                  <option value="industriel">Industriel</option>
                  <option value="terrain">Terrain</option>
                </select>

                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="h-9 rounded-md border border-input bg-background px-3 text-sm flex-1 sm:flex-none"
                >
                  <option value="date">Plus récentes</option>
                  <option value="price-asc">Prix croissant</option>
                  <option value="price-desc">Prix décroissant</option>
                  <option value="area">Superficie</option>
                </select>
              </div>

              <div className="hidden md:flex border border-border rounded-lg overflow-hidden">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 ${viewMode === "grid" ? "bg-accent text-accent-foreground" : "bg-card text-muted-foreground hover:bg-muted"}`}
                >
                  <Grid3X3 className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 ${viewMode === "list" ? "bg-accent text-accent-foreground" : "bg-card text-muted-foreground hover:bg-muted"}`}
                >
                  <List className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Properties Grid/List */}
            {favProperties.length === 0 ? (
              <Card className="p-8 text-center">
                <p className="text-muted-foreground">Aucune propriété ne correspond à vos filtres</p>
              </Card>
            ) : viewMode === "grid" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {favProperties.map((property) => (
                  <div key={property.id} className="relative">
                    <PropertyCard property={property} />
                    <button
                      onClick={() => removeFavorite(property.id)}
                      className="absolute top-4 right-4 w-8 h-8 rounded-full bg-destructive text-white flex items-center justify-center hover:bg-destructive/90 transition-colors z-10"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-3">
                {favProperties.map((property) => (
                  <Card key={property.id} className="p-4 hover:bg-muted/50">
                    <div className="flex items-center gap-4">
                      <img
                        src={property.images[0]}
                        alt={property.title}
                        className="w-24 h-24 rounded object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-foreground line-clamp-1 mb-1">
                          {property.title}
                        </h4>
                        <div className="flex items-center gap-1.5 text-sm text-muted-foreground mb-2">
                          <MapPin className="h-3.5 w-3.5" />
                          <span className="line-clamp-1">
                            {property.address}, {property.city}
                          </span>
                        </div>
                        <div className="flex items-center gap-3 text-xs text-muted-foreground mb-2">
                          <span className="flex items-center gap-1">
                            <Maximize2 className="h-3.5 w-3.5" />
                            {property.area.toLocaleString("fr-CA")} pi²
                          </span>
                          {property.rooms > 0 && <span>{property.rooms} pièces</span>}
                          <Badge variant="secondary" className="text-xs">
                            {property.category === "location" ? "À louer" : "À vendre"}
                          </Badge>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-2 ml-4">
                        <div className="text-right">
                          <p className="font-bold text-accent text-sm">
                            {property.priceUnit === "total"
                              ? `$${property.price.toLocaleString()}`
                              : property.priceUnit === "mois"
                              ? `$${property.price}/mois`
                              : `$${property.price}/pi²/an`}
                          </p>
                        </div>
                        <button
                          onClick={() => removeFavorite(property.id)}
                          className="w-8 h-8 rounded bg-destructive text-white flex items-center justify-center hover:bg-destructive/90 transition-colors"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Create Alert */}
        {favProperties.length > 0 && (
          <Card className="mt-8 p-6 bg-accent/5 border-accent/20">
            <h3 className="font-semibold text-foreground mb-2">Créer une alerte personnalisée</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Recevez des notifications par email pour les nouvelles annonces similaires à vos favoris.
            </p>
            <Button className="bg-accent hover:bg-accent/90 text-accent-foreground">
              Créer une alerte
            </Button>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Favorites;
