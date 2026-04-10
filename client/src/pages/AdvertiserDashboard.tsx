import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2, Eye, BarChart3, Star, Settings, LogOut, TrendingUp, Users, Calendar } from "lucide-react";
import { mockProperties } from "@/data/mockData";

const AdvertiserDashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [propertyStats] = useState({
    total: mockProperties.length,
    active: mockProperties.filter(p => !p.featured).length,
    featured: mockProperties.filter(p => p.featured).length,
    totalViews: mockProperties.reduce((acc, p) => acc + p.views, 0),
    totalContacts: mockProperties.reduce((acc, p) => acc + (p.contacts || 0), 0),
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border sticky top-16 z-40">
        <div className="container py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Tableau de bord annonceur</h1>
            <p className="text-sm text-muted-foreground">Gérez vos annonces et consultez vos statistiques</p>
          </div>
          <div className="flex items-center gap-3">
            <Button className="bg-accent hover:bg-accent/90 text-accent-foreground gap-2">
              <Plus className="w-4 h-4" />
              Nouvelle annonce
            </Button>
            <Button variant="outline" size="icon">
              <Settings className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="icon">
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="container py-8">
        <Tabs defaultValue="dashboard" value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid grid-cols-3 lg:grid-cols-4 w-full lg:w-auto">
            <TabsList className="flex gap-2 w-full">
              <TabsList className="flex items-center gap-2 px-4 py-2 text-foreground data-[state=active]:bg-accent data-[state=active]:text-accent-foreground">
                <BarChart3 className="w-4 h-4" />
                <span className="hidden sm:inline">Aperçu</span>
              </TabsList>
              <TabsList className="flex items-center gap-2 px-4 py-2 text-foreground data-[state=active]:bg-accent data-[state=active]:text-accent-foreground">
                <Calendar className="w-4 h-4" />
                <span className="hidden sm:inline">Annonces</span>
              </TabsList>
              <TabsList className="flex items-center gap-2 px-4 py-2 text-foreground data-[state=active]:bg-accent data-[state=active]:text-accent-foreground">
                <BarChart3 className="w-4 h-4" />
                <span className="hidden sm:inline">Statistiques</span>
              </TabsList>
              <TabsList className="flex items-center gap-2 px-4 py-2 text-foreground data-[state=active]:bg-accent data-[state=active]:text-accent-foreground">
                <Users className="w-4 h-4" />
                <span className="hidden sm:inline">Forfaits</span>
              </TabsList>
            </TabsList>
          </TabsList>

          {/* Dashboard Overview */}
          <TabsContent value="dashboard" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              {[
                { label: "Annonces actives", value: propertyStats.active, icon: Calendar, color: "text-blue-600" },
                { label: "En vedette", value: propertyStats.featured, icon: Star, color: "text-yellow-600" },
                { label: "Vues totales", value: propertyStats.totalViews.toLocaleString(), icon: Eye, color: "text-green-600" },
                { label: "Demandes de contact", value: propertyStats.totalContacts, icon: Users, color: "text-purple-600" },
                { label: "Taux de conversion", value: "12%", icon: TrendingUp, color: "text-red-600" },
              ].map((stat, i) => (
                <Card key={i} className="p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">{stat.label}</p>
                      <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                    </div>
                    <stat.icon className={`w-5 h-5 ${stat.color}`} />
                  </div>
                </Card>
              ))}
            </div>

            {/* Recent Activity */}
            <Card className="p-6">
              <h3 className="font-semibold text-foreground mb-4">Annonces récentes</h3>
              <div className="space-y-3">
                {mockProperties.slice(0, 5).map((property) => (
                  <div key={property.id} className="flex items-center justify-between p-3 bg-card rounded-lg border border-border hover:bg-muted/50">
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-foreground line-clamp-1">{property.title}</p>
                      <p className="text-sm text-muted-foreground">{property.city}</p>
                    </div>
                    <div className="flex items-center gap-3 ml-4">
                      <div className="text-right">
                        <p className="text-sm font-semibold text-foreground">{property.views}</p>
                        <p className="text-xs text-muted-foreground">vues</p>
                      </div>
                      {property.featured && <Badge>En vedette</Badge>}
                      <Badge variant="outline" className="text-xs">{property.category === "location" ? "À louer" : "À vendre"}</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          {/* Listings Management */}
          <TabsContent value="listings" className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-foreground">Gérer vos annonces</h3>
              <Button className="bg-accent hover:bg-accent/90 text-accent-foreground gap-2">
                <Plus className="w-4 h-4" />
                Nouvelle annonce
              </Button>
            </div>

            <div className="space-y-3">
              {mockProperties.map((property) => (
                <Card key={property.id} className="p-4 hover:bg-muted/50">
                  <div className="flex items-center gap-4">
                    <img src={property.images[0]} alt={property.title} className="w-24 h-24 rounded object-cover" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-semibold text-foreground line-clamp-1">{property.title}</h4>
                        {property.featured && <Star className="w-4 h-4 fill-yellow-400 text-yellow-600" />}
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{property.address}, {property.city}</p>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1"><Eye className="w-3 h-3" /> {property.views} vues</span>
                        <span className="flex items-center gap-1"><Users className="w-3 h-3" /> {property.contacts || 0} contacts</span>
                        <span>Publié le {new Date(property.publishedAt).toLocaleDateString("fr-CA")}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button size="sm" variant="outline" className="gap-1">
                        <Edit className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">Éditer</span>
                      </Button>
                      <Button size="sm" variant="outline" className="gap-1 text-destructive hover:text-destructive hover:bg-destructive/10">
                        <Trash2 className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">Supprimer</span>
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Statistics */}
          <TabsContent value="stats" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="p-6">
                <h3 className="font-semibold text-foreground mb-4">Vues par type de propriété</h3>
                <div className="space-y-3">
                  {[
                    { type: "Commercial", views: 1234, percent: 35 },
                    { type: "Bureau", views: 892, percent: 25 },
                    { type: "Industriel", views: 756, percent: 22 },
                    { type: "Terrain", views: 618, percent: 18 },
                  ].map((item) => (
                    <div key={item.type}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="font-medium text-foreground">{item.type}</span>
                        <span className="text-muted-foreground">{item.views} vues</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div className="bg-accent h-full rounded-full" style={{ width: `${item.percent}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="font-semibold text-foreground mb-4">Performance</h3>
                <div className="space-y-4">
                  {[
                    { label: "Taux de clic (CTR)", value: "4.2%", change: "+0.3%" },
                    { label: "Taux de contact", value: "8.7%", change: "+1.2%" },
                    { label: "Temps moyen de visite", value: "3m 42s", change: "+15s" },
                    { label: "Taux de rebond", value: "32%", change: "-5%" },
                  ].map((metric, i) => (
                    <div key={i} className="flex items-center justify-between p-3 bg-muted/50 rounded">
                      <span className="text-sm font-medium text-foreground">{metric.label}</span>
                      <div className="text-right">
                        <p className="font-bold text-foreground">{metric.value}</p>
                        <p className="text-xs text-green-600">{metric.change}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </TabsContent>

          {/* Packages/Plans */}
          <TabsContent value="plans" className="space-y-4">
            <h3 className="font-semibold text-foreground">Forfaits et options de visibilité</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  name: "Gratuit",
                  price: "0 $",
                  period: "/mois",
                  features: ["1 annonce", "30 jours de publication", "Statistiques basiques", "Support par email"],
                  cta: "Actuellement actif",
                  current: true,
                },
                {
                  name: "Standard",
                  price: "29 $",
                  period: "/mois",
                  features: ["5 annonces", "60 jours de publication", "Statistiques avancées", "Support prioritaire", "1 mise en vedette/mois"],
                  cta: "Passer à Standard",
                },
                {
                  name: "Premium",
                  price: "99 $",
                  period: "/mois",
                  features: ["Annonces illimitées", "Durée illimitée", "Toutes les statistiques", "Support 24/7", "4 mises en vedette/mois", "Analyse du marché"],
                  cta: "Passer à Premium",
                  highlight: true,
                },
              ].map((plan, i) => (
                <Card key={i} className={`p-6 relative ${plan.highlight ? "ring-2 ring-accent" : ""}`}>
                  {plan.highlight && <Badge className="absolute -top-3 left-6 bg-accent">Populaire</Badge>}
                  <h4 className="font-bold text-lg text-foreground mb-2">{plan.name}</h4>
                  <div className="mb-4">
                    <span className="text-3xl font-bold text-foreground">{plan.price}</span>
                    <span className="text-muted-foreground text-sm">{plan.period}</span>
                  </div>
                  <ul className="space-y-2 mb-6">
                    {plan.features.map((feature, j) => (
                      <li key={j} className="text-sm text-muted-foreground flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button
                    className={plan.current ? "" : plan.highlight ? "w-full bg-accent hover:bg-accent/90 text-accent-foreground" : "w-full"}
                    variant={plan.current ? "outline" : undefined}
                    disabled={plan.current}
                  >
                    {plan.cta}
                  </Button>
                </Card>
              ))}
            </div>

            {/* Add-ons */}
            <div className="mt-8">
              <h4 className="font-semibold text-foreground mb-4">Options promotionnelles à la carte</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { name: "Mise en vedette (1 semaine)", price: "49 $", description: "Affichage prioritaire" },
                  { name: "Mise en avant (1 mois)", price: "149 $", description: "Page d'accueil" },
                  { name: "Boost de recherche (2 semaines)", price: "79 $", description: "Classement amélioré" },
                ].map((addon, i) => (
                  <Card key={i} className="p-4">
                    <p className="font-semibold text-foreground mb-1">{addon.name}</p>
                    <p className="text-sm text-muted-foreground mb-3">{addon.description}</p>
                    <p className="text-2xl font-bold text-accent mb-3">{addon.price}</p>
                    <Button variant="outline" className="w-full" size="sm">Acheter</Button>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdvertiserDashboard;
