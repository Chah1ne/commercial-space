import { Link } from "react-router-dom";
import { Heart, MapPin, Maximize2, Tag } from "lucide-react";
import { Property } from "@/types/property";
import { Badge } from "@/components/ui/badge";
import { useFavorites } from "@/hooks/useFavorites";

interface PropertyCardProps {
  property: Property;
}

const PropertyCard = ({ property }: PropertyCardProps) => {
  const { isFavorite, toggleFavorite } = useFavorites();

  const formatPrice = (price: number, unit: string) => {
    if (unit === "total") return `${price.toLocaleString("fr-CA")} $`;
    if (unit === "mois") return `${price.toLocaleString("fr-CA")} $/mois`;
    return `${price} $/pi²/an`;
  };

  const typeLabels: Record<string, string> = {
    commercial: "Commercial",
    bureau: "Bureau",
    industriel: "Industriel",
    terrain: "Terrain",
  };

  return (
    <div className="bg-card rounded-xl overflow-hidden border border-border card-hover group">
      <div className="relative aspect-[16/10] overflow-hidden">
        <Link to={`/propriete/${property.id}`}>
          <img
            src={property.images[0]}
            alt={property.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        </Link>
        <div className="absolute top-3 left-3 flex gap-2">
          <Badge className="bg-accent text-accent-foreground text-xs font-semibold">
            {property.category === "location" ? "À louer" : "À vendre"}
          </Badge>
          {property.featured && (
            <Badge className="bg-warning text-warning-foreground text-xs font-semibold">
              En vedette
            </Badge>
          )}
        </div>
        <button
          onClick={() => toggleFavorite(property.id)}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-card/80 backdrop-blur-sm flex items-center justify-center hover:bg-card transition-colors"
        >
          <Heart className={`h-4 w-4 ${isFavorite(property.id) ? "fill-accent text-accent" : "text-foreground"}`} />
        </button>
        <div className="absolute bottom-3 left-3">
          <span className="text-xs font-medium text-primary-foreground bg-primary/70 backdrop-blur-sm rounded px-2 py-1">
            {typeLabels[property.type]}
          </span>
        </div>
      </div>

      <div className="p-4">
        <Link to={`/propriete/${property.id}`}>
          <h3 className="font-semibold text-foreground hover:text-accent transition-colors line-clamp-1 mb-1">
            {property.title}
          </h3>
        </Link>
        <div className="flex items-center gap-1.5 text-sm text-muted-foreground mb-3">
          <MapPin className="h-3.5 w-3.5 shrink-0" />
          <span className="line-clamp-1">{property.address}, {property.city}</span>
        </div>
        <div className="flex items-center justify-between border-t border-border pt-3">
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Maximize2 className="h-3.5 w-3.5" />
              {property.area.toLocaleString("fr-CA")} pi²
            </span>
            {property.rooms > 0 && (
              <span>{property.rooms} pièces</span>
            )}
          </div>
          <div className="flex items-center gap-1 text-accent font-bold text-sm">
            <Tag className="h-3.5 w-3.5" />
            {formatPrice(property.price, property.priceUnit)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
