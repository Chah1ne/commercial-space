import { Check, Zap, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

const Pricing = () => {
  const plans = [
    {
      name: "Gratuit",
      price: "0",
      description: "Parfait pour débuter",
      features: [
        "Jusqu'à 1 annonce active",
        "Durée d'affichage: 30 jours",
        "Accès aux statistiques de base",
        "Support par email",
        "Galerie avec 5 images max",
        "Formulaire de contact",
      ],
      cta: "Commencer",
      color: "bg-card border-border",
      buttonVariant: "outline",
    },
    {
      name: "Standard",
      price: "49",
      period: "/mois",
      description: "Pour les petits annonceurs",
      popular: true,
      features: [
        "Jusqu'à 5 annonces actives",
        "Durée d'affichage: 90 jours",
        "Accès aux statistiques détaillées",
        "Support prioritaire",
        "Galerie avec 20 images par annonce",
        "Mise en vedette jusqu'à 2x par mois",
        "Rapport mensuel personnalisé",
        "Badge 'Annonceur vérifié'",
      ],
      cta: "Sélectionner",
      color: "bg-accent/5 border-accent/30",
      buttonVariant: "default",
    },
    {
      name: "Premium",
      price: "149",
      period: "/mois",
      description: "Pour les professionnels",
      features: [
        "Annonces illimitées",
        "Durée d'affichage: 1 an",
        "Accès aux statistiques avancées",
        "Support VIP 24/7",
        "Galerie illimitée avec vidéos",
        "Mise en vedette illimitée",
        "API d'intégration",
        "Gestion de plusieurs utilisateurs",
        "Rapports personnalisés mensuels",
        "Annonces en vedette garanties",
      ],
      cta: "Sélectionner",
      color: "bg-primary/5 border-primary/30",
      buttonVariant: "default",
    },
  ];

  const addOns = [
    { name: "Mise en vedette (1 mois)", price: "29", description: "Affichage prioritaire en première page" },
    { name: "Vidéo professionnelle", price: "99", description: "Production et montage vidéo" },
    { name: "Visite virtuelle 3D", price: "199", description: "Tournée interactive Matterport" },
    { name: "Rapport de marché", price: "49", description: "Analyse comparative du secteur" },
    { name: "Support prioritaire (1 mois)", price: "19", description: "Chat et téléphone prioritaires" },
    { name: "Publicité sur Google Ads", price: "250+", description: "Campagne de 30 jours" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border sticky top-16 z-40">
        <div className="container py-4">
          <h1 className="text-3xl font-bold text-foreground">Forfaits et tarification</h1>
          <p className="text-muted-foreground mt-1">Choisissez le plan adapté à vos besoins</p>
        </div>
      </div>

      <div className="container py-12">
        {/* Main Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {plans.map((plan, i) => (
            <Card
              key={i}
              className={`relative p-8 flex flex-col ${plan.color} border-2 transition-all hover:shadow-lg ${
                plan.popular ? "ring-2 ring-accent" : ""
              }`}
            >
              {plan.popular && (
                <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-accent text-accent-foreground px-3">
                  POPULAIRE
                </Badge>
              )}

              <div className="mb-6">
                <h3 className="text-2xl font-bold text-foreground">{plan.name}</h3>
                <p className="text-sm text-muted-foreground mt-1">{plan.description}</p>
              </div>

              <div className="mb-6">
                <span className="text-4xl font-bold text-foreground">${plan.price}</span>
                {plan.period && <span className="text-muted-foreground ml-1">{plan.period}</span>}
              </div>

              <Link to="/tableau-de-bord" className="w-full">
                <Button
                  className={`w-full font-semibold gap-2 mb-8 ${
                    plan.buttonVariant === "default"
                      ? "bg-accent hover:bg-accent/90 text-accent-foreground"
                      : ""
                  }`}
                  variant={plan.buttonVariant as any}
                >
                  {plan.cta}
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>

              <div className="space-y-3 flex-1">
                {plan.features.map((feature, j) => (
                  <div key={j} className="flex gap-3 items-start">
                    <Check className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                    <span className="text-sm text-muted-foreground">{feature}</span>
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>

        {/* Add-ons */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-8">Services à la carte</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {addOns.map((addon, i) => (
              <Card key={i} className="p-4 flex items-start justify-between hover:bg-card/80 transition-colors cursor-pointer">
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground text-sm">{addon.name}</h3>
                  <p className="text-xs text-muted-foreground mt-1">{addon.description}</p>
                </div>
                <div className="text-right ml-4">
                  <p className="font-bold text-accent">${addon.price}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="max-w-2xl mx-auto mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-8 text-center">Questions fréquentes</h2>
          <div className="space-y-4">
            {[
              {
                q: "Puis-je changer de forfait à tout moment?",
                a: "Oui, vous pouvez upgrader ou downgrader votre plan à tout moment. Les changements sont appliqués au prochain cycle de facturation.",
              },
              {
                q: "Combien de temps dure mon annonce?",
                a: "Les annonces gratuit durent 30 jours, Standard 90 jours, et Premium 1 an. Vous pouvez les renouveler automatiquement.",
              },
              {
                q: "Y a-t-il un contrat à long terme?",
                a: "Non, tous nos forfaits sont mensuels et sans engagement. Vous pouvez annuler à tout moment.",
              },
              {
                q: "Puis-je ajouter plusieurs utilisateurs à mon compte?",
                a: "Oui, les forfaits Standard et Premium permettent d'ajouter des utilisateurs supplémentaires pour gérer vos annonces.",
              },
            ].map((item, i) => (
              <Card key={i} className="p-4">
                <h3 className="font-semibold text-foreground mb-2">{item.q}</h3>
                <p className="text-sm text-muted-foreground">{item.a}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-accent/10 to-primary/10 border border-accent/20 rounded-xl p-8 text-center">
          <h2 className="text-2xl font-bold text-foreground mb-2">Prêt à commencer?</h2>
          <p className="text-muted-foreground mb-6">Publiez votre première propriété maintenant et rejoignez notre communauté de 1 200+ annonceurs.</p>
          <div className="flex gap-3 justify-center">
            <Link to="/tableau-de-bord">
              <Button className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold">
                <Zap className="h-4 w-4 mr-2" /> Commencer gratuitement
              </Button>
            </Link>
            <Button variant="outline">En savoir plus</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
