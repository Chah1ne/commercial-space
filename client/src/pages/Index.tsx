import { Link, useNavigate } from "react-router-dom";
import { Search, MapPin, Building, ArrowRight, Star, TrendingUp, Users, ChevronRight, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { mockProperties, propertyTypes, categories, cities } from "@/data/mockData";
import PropertyCard from "@/components/PropertyCard";
import heroBg from "@/assets/hero-bg.jpg";

const Index = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchType, setSearchType] = useState("");
  const [searchCategory, setSearchCategory] = useState("");
  const [searchCity, setSearchCity] = useState("");

  const featuredProperties = mockProperties.filter((p) => p.featured);

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (searchQuery) params.set("q", searchQuery);
    if (searchType) params.set("type", searchType);
    if (searchCategory) params.set("category", searchCategory);
    if (searchCity) params.set("city", searchCity);
    navigate(`/proprietes?${params.toString()}`);
  };

  return (
    <div>
      {/* Hero */}
      <section className="relative min-h-[600px] flex items-center">
        <img src={heroBg} alt="Espace commercial moderne" className="absolute inset-0 w-full h-full object-cover" width={1920} height={1080} />
        <div className="absolute inset-0 hero-gradient" />
        <div className="relative container py-20">
          <div className="max-w-2xl mb-10 animate-fade-in">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground leading-tight mb-4">
              Trouvez l'espace
              <span className="block text-accent">idéal</span>
              pour votre entreprise
            </h1>
            <p className="text-lg text-primary-foreground/70">
              La plateforme #1 pour la location et la vente de propriétés commerciales au Québec
            </p>
          </div>

          {/* Search Box */}
          <div className="bg-card rounded-xl shadow-2xl p-6 max-w-4xl animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Que cherchez-vous ?</label>
                <select
                  value={searchCategory}
                  onChange={(e) => setSearchCategory(e.target.value)}
                  className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  <option value="">Tout</option>
                  {categories.map((c) => (
                    <option key={c.value} value={c.value}>{c.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Type</label>
                <select
                  value={searchType}
                  onChange={(e) => setSearchType(e.target.value)}
                  className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  <option value="">Tous les types</option>
                  {propertyTypes.map((t) => (
                    <option key={t.value} value={t.value}>{t.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Ville</label>
                <select
                  value={searchCity}
                  onChange={(e) => setSearchCity(e.target.value)}
                  className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  <option value="">Toutes les villes</option>
                  {cities.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Mot-clé</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                    placeholder="Adresse, ID..."
                    className="w-full h-10 rounded-md border border-input bg-background pl-10 pr-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <Link to="/recherche-avancee" className="text-sm text-accent hover:underline font-medium flex items-center gap-1">
                Recherche avancée <ChevronRight className="h-3.5 w-3.5" />
              </Link>
              <Button onClick={handleSearch} className="bg-accent hover:bg-accent/90 text-accent-foreground gap-2 px-8 font-semibold">
                <Search className="h-4 w-4" />
                Rechercher
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-6 bg-card border-b border-border">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: Building, value: "2,500+", label: "Propriétés actives" },
              { icon: Users, value: "1,200+", label: "Annonceurs vérifiés" },
              { icon: MapPin, value: "150+", label: "Villes couvertes" },
              { icon: TrendingUp, value: "98%", label: "Taux de satisfaction" },
            ].map((stat, i) => (
              <div key={i} className="flex items-center gap-3 animate-count-up" style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                  <stat.icon className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <p className="text-lg font-bold text-foreground">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured */}
      <section className="py-16 bg-background">
        <div className="container">
          <div className="flex items-center justify-between mb-8">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Star className="h-5 w-5 text-accent" />
                <span className="text-sm font-semibold text-accent uppercase tracking-wider">En vedette</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">Propriétés en vedette</h2>
            </div>
            <Link to="/proprietes?category=featured">
              <Button variant="outline" className="gap-2">
                Voir tout <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProperties.slice(0, 3).map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        </div>
      </section>

      {/* Property Types */}
      <section className="py-16 bg-secondary">
        <div className="container">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">Explorez par catégorie</h2>
            <p className="text-muted-foreground">Trouvez exactement le type d'espace dont vous avez besoin</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: "🏢", title: "Bureaux", count: 845, type: "bureau" },
              { icon: "🏬", title: "Commercial", count: 632, type: "commercial" },
              { icon: "🏭", title: "Industriel", count: 418, type: "industriel" },
              { icon: "🌍", title: "Terrains", count: 156, type: "terrain" },
            ].map((cat) => (
              <Link key={cat.type} to={`/proprietes?type=${cat.type}`} className="bg-card rounded-xl p-6 text-center card-hover border border-border">
                <span className="text-4xl block mb-3">{cat.icon}</span>
                <h3 className="font-semibold text-foreground mb-1">{cat.title}</h3>
                <p className="text-sm text-muted-foreground">{cat.count} annonces</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Recent */}
      <section className="py-16 bg-background">
        <div className="container">
          <div className="flex items-center justify-between mb-8">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Clock className="h-5 w-5 text-accent" />
                <span className="text-sm font-semibold text-accent uppercase tracking-wider">Récent</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">Dernières annonces</h2>
            </div>
            <Link to="/proprietes">
              <Button variant="outline" className="gap-2">
                Voir tout <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockProperties.slice(0, 6).map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
            Vous avez un espace à louer ou à vendre ?
          </h2>
          <p className="text-primary-foreground/70 max-w-xl mx-auto mb-8">
            Rejoignez plus de 1 200 annonceurs qui font confiance à Espace Commercial pour trouver les meilleurs locataires et acheteurs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/publier">
              <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground gap-2 font-semibold px-8">
                Publier une annonce gratuitement
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link to="/forfaits">
              <Button size="lg" variant="outline" className="border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10 gap-2">
                Voir nos forfaits
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
