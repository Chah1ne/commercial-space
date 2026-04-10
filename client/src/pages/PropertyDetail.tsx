import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Calendar, ChevronLeft, ChevronRight, Clock, Eye, Heart, Mail, MapPin, Maximize2, Phone, Printer, Share2, Tag, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { mockProperties } from "@/data/mockData";
import { useState } from "react";

const PropertyDetail = () => {
  const { id } = useParams();
  const property = mockProperties.find((p) => p.id === id);
  const [currentImage, setCurrentImage] = useState(0);
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [contactMessage, setContactMessage] = useState("");

  if (!property) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground mb-2">Propriété introuvable</h2>
          <Link to="/proprietes"><Button className="bg-accent hover:bg-accent/90 text-accent-foreground mt-4">Retour aux propriétés</Button></Link>
        </div>
      </div>
    );
  }

  const typeLabels: Record<string, string> = { commercial: "Commercial", bureau: "Bureau", industriel: "Industriel", terrain: "Terrain" };

  const formatPrice = (price: number, unit: string) => {
    if (unit === "total") return `${price.toLocaleString("fr-CA")} $`;
    if (unit === "mois") return `${price.toLocaleString("fr-CA")} $/mois`;
    return `${price} $/pi²/an`;
  };

  const nextImage = () => setCurrentImage((prev) => (prev + 1) % property.images.length);
  const prevImage = () => setCurrentImage((prev) => (prev - 1 + property.images.length) % property.images.length);

  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumb */}
      <div className="bg-card border-b border-border">
        <div className="container py-3 flex items-center gap-2 text-sm text-muted-foreground">
          <Link to="/" className="hover:text-foreground">Accueil</Link>
          <span>/</span>
          <Link to="/proprietes" className="hover:text-foreground">Propriétés</Link>
          <span>/</span>
          <span className="text-foreground">{property.title}</span>
        </div>
      </div>

      <div className="container py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Gallery */}
            <div className="relative rounded-xl overflow-hidden aspect-[16/10]">
              <img src={property.images[currentImage]} alt={property.title} className="w-full h-full object-cover" />
              {property.images.length > 1 && (
                <>
                  <button onClick={prevImage} className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-card/80 backdrop-blur-sm flex items-center justify-center hover:bg-card transition-colors">
                    <ChevronLeft className="h-5 w-5 text-foreground" />
                  </button>
                  <button onClick={nextImage} className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-card/80 backdrop-blur-sm flex items-center justify-center hover:bg-card transition-colors">
                    <ChevronRight className="h-5 w-5 text-foreground" />
                  </button>
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                    {property.images.map((_, i) => (
                      <button key={i} onClick={() => setCurrentImage(i)} className={`w-2.5 h-2.5 rounded-full transition-colors ${i === currentImage ? "bg-accent" : "bg-card/60"}`} />
                    ))}
                  </div>
                </>
              )}
              <div className="absolute top-3 left-3 flex gap-2">
                <Badge className="bg-accent text-accent-foreground">{property.category === "location" ? "À louer" : "À vendre"}</Badge>
                <Badge className="bg-primary text-primary-foreground">{typeLabels[property.type]}</Badge>
              </div>
            </div>

            {/* Thumbnails */}
            {property.images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto">
                {property.images.map((img, i) => (
                  <button key={i} onClick={() => setCurrentImage(i)} className={`shrink-0 w-20 h-16 rounded-lg overflow-hidden border-2 transition-colors ${i === currentImage ? "border-accent" : "border-transparent"}`}>
                    <img src={img} alt="" className="w-full h-full object-cover" loading="lazy" />
                  </button>
                ))}
              </div>
            )}

            {/* Title & Actions */}
            <div>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">{property.title}</h1>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="h-4 w-4 text-accent" />
                    <span>{property.address}, {property.city}, {property.province} {property.postalCode}</span>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-2xl font-bold text-accent">{formatPrice(property.price, property.priceUnit)}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 mt-4">
                <Button variant="outline" size="sm" className="gap-1.5"><Heart className="h-4 w-4" /> Favoris</Button>
                <Button variant="outline" size="sm" className="gap-1.5"><Share2 className="h-4 w-4" /> Partager</Button>
                <Button variant="outline" size="sm" className="gap-1.5"><Printer className="h-4 w-4" /> Imprimer</Button>
              </div>
            </div>

            {/* Quick Info */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: "Superficie", value: `${property.area.toLocaleString("fr-CA")} pi²`, icon: Maximize2 },
                { label: "Pièces", value: property.rooms || "N/A", icon: Tag },
                { label: "Étages", value: property.floors || "N/A", icon: Tag },
                { label: "Stationnement", value: property.parking || "N/A", icon: Tag },
              ].map((item, i) => (
                <div key={i} className="bg-card border border-border rounded-lg p-4 text-center">
                  <item.icon className="h-5 w-5 text-accent mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">{item.label}</p>
                  <p className="font-semibold text-foreground">{item.value}</p>
                </div>
              ))}
            </div>

            {/* Description */}
            <div className="bg-card border border-border rounded-xl p-6">
              <h2 className="text-lg font-semibold text-foreground mb-3">Description</h2>
              <p className="text-muted-foreground leading-relaxed">{property.description}</p>
            </div>

            {/* Features */}
            <div className="bg-card border border-border rounded-xl p-6">
              <h2 className="text-lg font-semibold text-foreground mb-4">Caractéristiques</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {property.features.map((f, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm">
                    <div className="w-2 h-2 rounded-full bg-accent shrink-0" />
                    <span className="text-foreground">{f}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Details table */}
            <div className="bg-card border border-border rounded-xl p-6">
              <h2 className="text-lg font-semibold text-foreground mb-4">Détails</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-8 text-sm">
                {[
                  ["ID de l'annonce", property.id],
                  ["Type", typeLabels[property.type]],
                  ["Catégorie", property.category === "location" ? "À louer" : "À vendre"],
                  ["Superficie", `${property.area.toLocaleString("fr-CA")} pi²`],
                  ["Étages", property.floors || "N/A"],
                  ["Pièces", property.rooms || "N/A"],
                  ["Année de construction", property.yearBuilt || "N/A"],
                  ["Stationnement", `${property.parking} places`],
                  ["Disponibilité", new Date(property.availableDate).toLocaleDateString("fr-CA")],
                  ["Publié le", new Date(property.publishedAt).toLocaleDateString("fr-CA")],
                ].map(([label, value], i) => (
                  <div key={i} className="flex justify-between py-2 border-b border-border">
                    <span className="text-muted-foreground">{label}</span>
                    <span className="font-medium text-foreground">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Broker Info */}
            <div className="bg-card border border-border rounded-xl p-6 sticky top-24">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <User className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">{property.broker.name}</p>
                  <p className="text-sm text-muted-foreground">{property.broker.company}</p>
                </div>
              </div>

              <div className="space-y-2 mb-6">
                <a href={`tel:${property.broker.phone}`} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
                  <Phone className="h-4 w-4 text-accent" />
                  {property.broker.phone}
                </a>
                <a href={`mailto:${property.broker.email}`} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
                  <Mail className="h-4 w-4 text-accent" />
                  {property.broker.email}
                </a>
              </div>

              <div className="border-t border-border pt-4">
                <h3 className="font-semibold text-foreground mb-3">Contacter l'annonceur</h3>
                <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
                  <input placeholder="Votre nom" value={contactName} onChange={(e) => setContactName(e.target.value)} className="w-full h-9 rounded-md border border-input bg-background px-3 text-sm" />
                  <input placeholder="Votre courriel" type="email" value={contactEmail} onChange={(e) => setContactEmail(e.target.value)} className="w-full h-9 rounded-md border border-input bg-background px-3 text-sm" />
                  <input placeholder="Votre téléphone" value={contactPhone} onChange={(e) => setContactPhone(e.target.value)} className="w-full h-9 rounded-md border border-input bg-background px-3 text-sm" />
                  <textarea placeholder="Votre message" value={contactMessage} onChange={(e) => setContactMessage(e.target.value)} rows={4} className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm resize-none" />
                  <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-semibold">
                    Envoyer le message
                  </Button>
                </form>
              </div>

              <div className="border-t border-border pt-4 mt-4 flex items-center justify-between text-xs text-muted-foreground">
                <span className="flex items-center gap-1"><Eye className="h-3.5 w-3.5" /> {property.views} vues</span>
                <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> Publié le {new Date(property.publishedAt).toLocaleDateString("fr-CA")}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetail;
