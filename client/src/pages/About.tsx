import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { CheckCircle, Users, TrendingUp, Zap, ArrowRight, Globe, Shield, Lightbulb, Award, Target, Rocket } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <div className="relative bg-gradient-to-b from-accent/10 via-background to-background border-b border-border">
        <div className="container py-24">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <div className="inline-block">
              <Badge className="bg-accent/20 text-accent border border-accent/30 gap-2">
                <Rocket className="w-3 h-3" />
                Pionniers immobiliers
              </Badge>
            </div>
            <h1 className="text-5xl lg:text-6xl font-bold text-foreground">
              Transformez votre approche immobilière
            </h1>
            <p className="text-xl text-muted-foreground">
              Espace Commercial révolutionne le marché immobilier commercial au Québec en mettant à disposition une plateforme transparente, moderne et facile à utiliser.
            </p>
          </div>
        </div>
      </div>

      <div className="container py-20 space-y-20">
        {/* Mission */}
        <section>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div>
                <div className="inline-block mb-4">
                  <Badge className="bg-accent/20 text-accent border border-accent/30">Notre Mission</Badge>
                </div>
                <h2 className="text-4xl font-bold text-foreground mb-4">Simplifier l&apos;immobilier commercial</h2>
                <p className="text-lg text-muted-foreground mb-4 leading-relaxed">
                  Espace Commercial a été créée avec une vision claire: moderniser et simplifier la façon dont les entreprises trouvent et louent des espaces commerciaux au Québec.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Nous croyons que chaque entreprise, peu importe sa taille, mérite d'accéder facilement aux meilleures opportunités immobilières sans complications inutiles.
                </p>
              </div>
              <div className="space-y-3 pt-4">
                {[
                  "Plateforme transparente et fiable",
                  "Outils de recherche avancés et intuitifs",
                  "Support client 24/7 en français",
                  "Communauté d'annonceurs vérifiés",
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-accent flex-shrink-0" />
                    <span className="text-foreground">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-accent/5 rounded-2xl" />
              <div className="relative h-80 rounded-2xl flex items-center justify-center">
                <div className="text-7xl">🏢</div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section>
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-foreground mb-4">En croissance constante</h2>
            <p className="text-lg text-muted-foreground">Nos chiffres parlent d&apos;eux-mêmes</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: TrendingUp, value: "2,500+", label: "Propriétés actives", description: "Sélectionnées avec soin" },
              { icon: Users, value: "1,200+", label: "Annonceurs vérifiés", description: "Professionnels de confiance" },
              { icon: Zap, value: "15K+", label: "Utilisateurs actifs", description: "Chaque mois" },
              { icon: Award, value: "98%", label: "Satisfaction clients", description: "Très bonne note" },
            ].map((stat, i) => (
              <Card key={i} className="p-6 text-center border border-border hover:border-accent/50 transition-colors">
                <stat.icon className="w-10 h-10 text-accent mx-auto mb-4" />
                <p className="text-4xl font-bold text-foreground mb-1">{stat.value}</p>
                <p className="font-semibold text-foreground mb-1">{stat.label}</p>
                <p className="text-sm text-muted-foreground">{stat.description}</p>
              </Card>
            ))}
          </div>
        </section>

        {/* Values */}
        <section>
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-foreground mb-4">Nos Valeurs Fondamentales</h2>
            <p className="text-lg text-muted-foreground">Ce qui nous guide chaque jour</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: Shield,
                title: "Transparence",
                description: "Divulgation complète et honnête. Pas de surprise, des données fiables.",
                color: "text-blue-500",
              },
              {
                icon: Lightbulb,
                title: "Innovation",
                description: "Technologie de pointe pour une expérience utilisateur incomparable.",
                color: "text-yellow-500",
              },
              {
                icon: Target,
                title: "Fiabilité",
                description: "Plateforme disponible 24/7 avec support client réactif et professionnel.",
                color: "text-green-500",
              },
              {
                icon: Users,
                title: "Communauté",
                description: "Réseau vibrant de propriétaires et locataires professionnels vérifiés.",
                color: "text-purple-500",
              },
              {
                icon: Zap,
                title: "Équité",
                description: "Plateforme égale pour tous les acteurs du marché, peu importe la taille.",
                color: "text-orange-500",
              },
              {
                icon: Award,
                title: "Excellence",
                description: "Amélioration continue de nos services et de notre plateforme.",
                color: "text-red-500",
              },
            ].map((value, i) => (
              <Card key={i} className="p-6 border border-border hover:border-accent/50 transition-all hover:shadow-md">
                <value.icon className={`w-8 h-8 ${value.color} mb-4`} />
                <h3 className="font-bold text-foreground mb-2 text-lg">{value.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{value.description}</p>
              </Card>
            ))}
          </div>
        </section>

        {/* Timeline */}
        <section>
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-foreground mb-4">Notre Parcours</h2>
            <p className="text-lg text-muted-foreground">Une aventure incroyable qui ne fait que commencer</p>
          </div>
          <div className="space-y-6 max-w-2xl mx-auto">
            {[
              { year: "2023", title: "Fondation", description: "Naissance d'Espace Commercial avec une vision de transformer l'immobilier commercial québécois." },
              { year: "2024", title: "Lancement bêta", description: "Lancement réussi de notre plateforme bêta avec plus de 500 propriétés mises en ligne." },
              { year: "2025", title: "Expansion majeure", description: "Croissance spectaculaire à tout le Québec avec 2,000+ propriétés et 1,000+ annonceurs." },
              { year: "2026", title: "Leadership du marché", description: "1,200+ annonceurs vérifiés, 15,000+ utilisateurs actifs et un écosystème florissant." },
            ].map((item, i) => (
              <div key={i} className="flex gap-6 pb-6">
                <div className="flex flex-col items-center">
                  <div className="w-4 h-4 bg-accent rounded-full ring-4 ring-accent/20" />
                  {i < 3 && <div className="w-0.5 h-24 bg-gradient-to-b from-accent/50 to-accent/10 mt-2" />}
                </div>
                <div className="pt-1 pb-8">
                  <p className="font-bold text-accent text-sm uppercase tracking-wide">{item.year}</p>
                  <h3 className="font-bold text-foreground text-lg mb-2">{item.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Team */}
        <section>
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-foreground mb-4">Notre Équipe Passionnée</h2>
            <p className="text-lg text-muted-foreground">Des professionnels dédiés à transformer l&apos;immobilier</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: "Jean Dupont", role: "PDG & Co-fondateur", image: "👨‍💼", bio: "20+ ans d'expérience immobilière" },
              { name: "Marie Leclerc", role: "VP Opérations", image: "👩‍💼", bio: "Gestion opérationnelle stratégique" },
              { name: "Pierre Gagnon", role: "VP Technologie", image: "👨‍💻", bio: "Innovation technologique au cœur" },
              { name: "Sophie Bernard", role: "Directrice Marketing", image: "👩‍💼", bio: "Croissance de marque et stratégie" },
              { name: "Marc Rivard", role: "Directeur Support Client", image: "👨‍💼", bio: "Excellence client 24/7" },
              { name: "Anne Lefevre", role: "Coordinatrice Communauté", image: "👩‍💼", bio: "Engagement communautaire" },
            ].map((member, i) => (
              <Card key={i} className="p-6 text-center border border-border hover:border-accent/50 transition-all hover:shadow-md">
                <div className="text-6xl mb-4">{member.image}</div>
                <h3 className="font-bold text-foreground mb-1 text-lg">{member.name}</h3>
                <p className="text-sm text-accent font-semibold mb-2">{member.role}</p>
                <p className="text-xs text-muted-foreground">{member.bio}</p>
              </Card>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-accent/20 via-accent/10 to-accent/20 rounded-2xl" />
          <div className="relative bg-gradient-to-b from-background to-background border border-accent/20 rounded-2xl p-12 md:p-16 text-center space-y-8">
            <div className="space-y-4">
              <h2 className="text-4xl md:text-5xl font-bold text-foreground">
                Êtes-vous prêt à transformer votre approche immobilière?
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Rejoignez des milliers d'entreprises et de professionnels qui font confiance à Espace Commercial pour leurs besoins immobiliers commerciaux.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
              <Link to="/proprietes">
                <Button className="bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-6 text-base gap-2 group">
                  Parcourir nos propriétés
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
                </Button>
              </Link>
              <Link to="/tableau-de-bord">
                <Button variant="outline" className="px-8 py-6 text-base">
                  Devenir annonceur
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;
