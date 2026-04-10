import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, ArrowRight, User, Search } from "lucide-react";
import { useState } from "react";

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const articles = [
    {
      id: 1,
      title: "Tendances du marché immobilier commercial en 2026",
      excerpt: "Analyse des principales tendances qui façonnent l'industrie immobilière commerciale au Québec cette année.",
      category: "Marché",
      date: "2026-04-08",
      author: "Marie Dupont",
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&h=400",
      readTime: "5 min",
    },
    {
      id: 2,
      title: "Guide complet: Louer un bureau ou un espace commercial",
      excerpt: "Découvrez les étapes essentielles pour trouver et louer le parfait espace commercial pour votre entreprise.",
      category: "Guide",
      date: "2026-04-05",
      author: "Jean Martin",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&h=400",
      readTime: "8 min",
    },
    {
      id: 3,
      title: "Négocier votre bail commercial: Conseils d'experts",
      excerpt: "Apprenez les stratégies éprouvées pour négocier les meilleures conditions de bail commercial.",
      category: "Conseils",
      date: "2026-04-01",
      author: "Sophie Bernard",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400",
      readTime: "6 min",
    },
    {
      id: 4,
      title: "Analyse: Prix des locaux commerciaux par région",
      excerpt: "Comparaison détaillée des prix au pied carré dans les principales régions du Québec.",
      category: "Analyse",
      date: "2026-03-28",
      author: "Paul Lesage",
      image: "https://images.unsplash.com/photo-1460925895917-adf4e565db8d?w=600&h=400",
      readTime: "7 min",
    },
    {
      id: 5,
      title: "Les meilleures zones commerciales de Montréal",
      excerpt: "Explorez les quartiers les plus attractifs pour les entreprises à Montréal en 2026.",
      category: "Localisation",
      date: "2026-03-25",
      author: "Anne Lefevre",
      image: "https://images.unsplash.com/photo-1449844908441-8829872d2607?w=600&h=400",
      readTime: "6 min",
    },
    {
      id: 6,
      title: "Certifications immobilières: LEED, BOMA BESt et plus",
      excerpt: "Comprendre les certifications vertes et leurs avantages pour les propriétaires et locataires.",
      category: "Durabilité",
      date: "2026-03-20",
      author: "Michel Rivard",
      image: "https://images.unsplash.com/photo-1551631788-f91e4e2b6456?w=600&h=400",
      readTime: "5 min",
    },
  ];

  const categories = ["Marché", "Guide", "Conseils", "Analyse", "Localisation", "Durabilité"];

  const filteredArticles = articles.filter((article) => {
    const matchesSearch =
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || article.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-primary py-12">
        <div className="container text-center">
          <h1 className="text-4xl font-bold text-primary-foreground mb-4">Blog Immobilier Commercial</h1>
          <p className="text-lg text-primary-foreground/70 max-w-2xl mx-auto">
            Conseils, analyses et tendances du marché immobilier commercial au Québec
          </p>
        </div>
      </div>

      <div className="container py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="p-6 sticky top-24 space-y-6">
              {/* Search */}
              <div>
                <label className="text-sm font-semibold text-foreground mb-2 block">Recherche</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Chercher..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full h-10 rounded-md border border-input bg-background pl-10 pr-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
              </div>

              {/* Categories */}
              <div>
                <label className="text-sm font-semibold text-foreground mb-3 block">Catégories</label>
                <div className="space-y-2">
                  <button
                    onClick={() => setSelectedCategory("")}
                    className={`block w-full text-left px-3 py-2 rounded text-sm transition-colors ${
                      selectedCategory === ""
                        ? "bg-accent text-accent-foreground font-medium"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted"
                    }`}
                  >
                    Tous les articles
                  </button>
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`block w-full text-left px-3 py-2 rounded text-sm transition-colors ${
                        selectedCategory === cat
                          ? "bg-accent text-accent-foreground font-medium"
                          : "text-muted-foreground hover:text-foreground hover:bg-muted"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Popular Posts */}
              <div className="border-t border-border pt-6">
                <h3 className="text-sm font-semibold text-foreground mb-3">Articles populaires</h3>
                <div className="space-y-3">
                  {articles.slice(0, 3).map((article) => (
                    <a
                      key={article.id}
                      href="#"
                      className="block p-2 rounded hover:bg-muted transition-colors group"
                    >
                      <p className="text-xs font-medium text-accent mb-1">{article.category}</p>
                      <p className="text-sm text-foreground group-hover:text-accent line-clamp-2">
                        {article.title}
                      </p>
                    </a>
                  ))}
                </div>
              </div>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {filteredArticles.length === 0 ? (
              <Card className="p-12 text-center">
                <p className="text-muted-foreground">Aucun article trouvé</p>
              </Card>
            ) : (
              <div className="space-y-8">
                {filteredArticles.map((article) => (
                  <Card key={article.id} className="overflow-hidden hover:shadow-lg transition-shadow group">
                    <div className="grid grid-cols-1 md:grid-cols-3">
                      {/* Image */}
                      <div className="md:col-span-1 h-48 md:h-auto overflow-hidden">
                        <img
                          src={article.image}
                          alt={article.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>

                      {/* Content */}
                      <div className="md:col-span-2 p-6 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center gap-2 mb-3">
                            <Badge>{article.category}</Badge>
                            <span className="text-xs text-muted-foreground">{article.readTime}</span>
                          </div>
                          <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-accent transition-colors">
                            {article.title}
                          </h3>
                          <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                            {article.excerpt}
                          </p>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <User className="w-3 h-3" />
                              {article.author}
                            </span>
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {new Date(article.date).toLocaleDateString("fr-CA")}
                            </span>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-accent hover:text-accent hover:bg-accent/10 gap-1"
                          >
                            Lire plus <ArrowRight className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Newsletter */}
      <div className="bg-accent/10 border-t border-accent/20 py-12">
        <div className="container text-center max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-foreground mb-4">Abonnez-vous à notre infolettre</h2>
          <p className="text-muted-foreground mb-6">
            Recevez les derniers articles et analyses du marché immobilier commercial directement dans votre boîte de réception.
          </p>
          <div className="flex gap-2">
            <input
              type="email"
              placeholder="Votre adresse courriel"
              className="flex-1 h-11 rounded-md border border-input bg-background px-4 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
            <Button className="bg-accent hover:bg-accent/90 text-accent-foreground px-8">
              S'abonner
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
