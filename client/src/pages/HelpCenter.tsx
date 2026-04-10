import { useState } from "react";
import { Search, ChevronDown, MessageCircle, Phone, Mail, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const HelpCenter = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedCategory, setExpandedCategory] = useState("getting-started");
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const categories = [
    {
      id: "getting-started",
      name: "Commencer",
      icon: "🚀",
      articles: [
        { title: "Comment créer un compte?", slug: "create-account" },
        { title: "Comment publier ma première propriété?", slug: "publish-first" },
        { title: "Quels sont les types de propriétés supportés?", slug: "property-types" },
        { title: "Comment ajouter des images?", slug: "add-images" },
      ],
    },
    {
      id: "account",
      name: "Mon compte",
      icon: "👤",
      articles: [
        { title: "Comment modifier mon profil?", slug: "edit-profile" },
        { title: "Comment réinitialiser mon mot de passe?", slug: "reset-password" },
        { title: "Comment supprimer mon compte?", slug: "delete-account" },
        { title: "Comment gérer mes préférences?", slug: "preferences" },
      ],
    },
    {
      id: "properties",
      name: "Propriétés",
      icon: "🏢",
      articles: [
        { title: "Comment éditer une annonce?", slug: "edit-listing" },
        { title: "Comment supprimer une annonce?", slug: "delete-listing" },
        { title: "Comment mettre en vedette une propriété?", slug: "featured" },
        { title: "Quels sont les critères de qualité?", slug: "quality-criteria" },
      ],
    },
    {
      id: "search",
      name: "Recherche",
      icon: "🔍",
      articles: [
        { title: "Comment utiliser la recherche avancée?", slug: "advanced-search" },
        { title: "Comment créer une alerte?", slug: "create-alert" },
        { title: "Comment sauvegarder une propriété?", slug: "save-property" },
        { title: "Comment comparer des propriétés?", slug: "compare" },
      ],
    },
    {
      id: "pricing",
      name: "Forfaits",
      icon: "💰",
      articles: [
        { title: "Quels sont les différents forfaits?", slug: "plans" },
        { title: "Comment upgrader mon forfait?", slug: "upgrade" },
        { title: "Puis-je annuler mon abonnement?", slug: "cancel" },
        { title: "Quels sont les modes de paiement?", slug: "payment-methods" },
      ],
    },
    {
      id: "technical",
      name: "Technique",
      icon: "⚙️",
      articles: [
        { title: "Navigateurs supportés", slug: "browsers" },
        { title: "Problèmes de chargement", slug: "loading-issues" },
        { title: "Erreurs d'affichage", slug: "display-errors" },
        { title: "API et intégrations", slug: "api" },
      ],
    },
  ];

  const faqs = [
    {
      q: "Combien de temps durent les annonces?",
      a: "Les annonces gratuit durent 30 jours, Standard 90 jours, et Premium 1 an. Vous pouvez les renouveler automatiquement avant expiration.",
      category: "pricing",
    },
    {
      q: "Est-ce que je dois payer pour commencer?",
      a: "Non! Vous pouvez publier votre première propriété gratuitement avec jusqu'à 5 images et les statistiques de base.",
      category: "pricing",
    },
    {
      q: "Puis-je gérer plusieurs propriétés?",
      a: "Oui! Les forfaits Standard et Premium vous permettent de gérer plusieurs annonces simultanément.",
      category: "properties",
    },
    {
      q: "Comment contacter un annonceur?",
      a: "Cliquez sur le bouton 'Contacter l'annonceur' sur la page de la propriété. Vous pouvez envoyer un message, un email, ou un appel téléphonique.",
      category: "search",
    },
    {
      q: "Les données de mes propriétés sont-elles sécurisées?",
      a: "Oui, nous utilisons le chiffrement SSL et les meilleures pratiques de sécurité pour protéger vos données.",
      category: "technical",
    },
    {
      q: "Puis-je exporter mes données?",
      a: "Oui, vous pouvez exporter vos propriétés et statistiques en format CSV ou Excel depuis votre tableau de bord.",
      category: "account",
    },
  ];

  const filteredArticles = categories.map((cat) => ({
    ...cat,
    articles: cat.articles.filter(
      (article) =>
        searchQuery === "" ||
        article.title.toLowerCase().includes(searchQuery.toLowerCase())
    ),
  }));

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border sticky top-16 z-40">
        <div className="container py-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Centre d'aide</h1>
          <p className="text-muted-foreground mb-6">Besoin d'aide? Consultez notre centre de ressources ou contactez-nous</p>

          {/* Search */}
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Rechercher dans l'aide..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-10 rounded-md border border-input bg-background pl-10 pr-4 text-sm"
            />
          </div>
        </div>
      </div>

      <div className="container py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {filteredArticles.map((category) => (
              <div key={category.id}>
                {category.articles.length > 0 && (
                  <>
                    <button
                      onClick={() =>
                        setExpandedCategory(
                          expandedCategory === category.id ? "" : category.id
                        )
                      }
                      className="w-full flex items-center justify-between p-4 bg-card border border-border rounded-lg hover:bg-card/80 transition-colors text-left"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{category.icon}</span>
                        <h2 className="text-lg font-semibold text-foreground">{category.name}</h2>
                      </div>
                      <ChevronDown
                        className={`h-5 w-5 text-muted-foreground transition-transform ${
                          expandedCategory === category.id ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {expandedCategory === category.id && (
                      <div className="mt-3 space-y-2 ml-4">
                        {category.articles.map((article, i) => (
                          <div
                            key={i}
                            className="p-3 bg-card/50 border border-border rounded-lg hover:bg-card/80 transition-colors cursor-pointer group"
                          >
                            <h3 className="font-medium text-foreground group-hover:text-accent transition-colors">
                              {article.title}
                            </h3>
                          </div>
                        ))}
                      </div>
                    )}
                  </>
                )}
              </div>
            ))}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* FAQ Section */}
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">Questions fréquentes</h3>
              <div className="space-y-3">
                {faqs.slice(0, 3).map((faq, i) => (
                  <button
                    key={i}
                    onClick={() => setExpandedFaq(expandedFaq === i ? null : i)}
                    className="w-full text-left p-3 bg-card border border-border rounded-lg hover:bg-card/80 transition-colors"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <p className="font-medium text-sm text-foreground pr-2">{faq.q}</p>
                      <ChevronDown
                        className={`h-4 w-4 text-muted-foreground shrink-0 mt-0.5 transition-transform ${
                          expandedFaq === i ? "rotate-180" : ""
                        }`}
                      />
                    </div>
                    {expandedFaq === i && (
                      <p className="text-xs text-muted-foreground mt-2 pt-2 border-t border-border">
                        {faq.a}
                      </p>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Contact Options */}
            <Card className="p-6">
              <h3 className="font-semibold text-foreground mb-4">Nous contacter</h3>
              <div className="space-y-3">
                <div className="flex gap-3 items-start">
                  <MessageCircle className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-foreground">Chat en direct</p>
                    <p className="text-xs text-muted-foreground">Disponible 9h-18h</p>
                  </div>
                </div>
                <div className="flex gap-3 items-start">
                  <Mail className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-foreground">Email</p>
                    <a href="mailto:support@commspace.ca" className="text-xs text-accent hover:underline">
                      support@commspace.ca
                    </a>
                  </div>
                </div>
                <div className="flex gap-3 items-start">
                  <Phone className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-foreground">Téléphone</p>
                    <a href="tel:+14165551234" className="text-xs text-accent hover:underline">
                      (416) 555-1234
                    </a>
                  </div>
                </div>
                <div className="flex gap-3 items-start">
                  <Clock className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-foreground">Heures d'ouverture</p>
                    <p className="text-xs text-muted-foreground">Lun-Ven: 9h-18h</p>
                    <p className="text-xs text-muted-foreground">Sam-Dim: 10h-16h</p>
                  </div>
                </div>
              </div>
              <Button className="w-full mt-4 bg-accent hover:bg-accent/90 text-accent-foreground">
                <MessageCircle className="h-4 w-4 mr-2" /> Démarrer un chat
              </Button>
            </Card>

            {/* Status */}
            <Card className="p-4 bg-green-500/5 border-green-500/20">
              <p className="text-sm font-medium text-green-700 dark:text-green-400">
                Tous les services fonctionnent correctement
              </p>
              <p className="text-xs text-green-600/70 mt-1">
                Dernier incident: il y a 2 semaines
              </p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpCenter;
