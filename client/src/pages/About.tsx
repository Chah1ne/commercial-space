import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { CheckCircle, Users, TrendingUp, Zap } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <div className="bg-primary py-16">
        <div className="container text-center">
          <h1 className="text-4xl font-bold text-primary-foreground mb-4">À Propos de Nous</h1>
          <p className="text-lg text-primary-foreground/70 max-w-2xl mx-auto">
            Révolutionner le marché immobilier commercial au Québec avec une plateforme moderne et conviviale
          </p>
        </div>
      </div>

      <div className="container py-16 space-y-16">
        {/* Mission */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-3xl font-bold text-foreground mb-4">Notre Mission</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Espace Commercial a été créée avec une vision claire: simplifier et moderniser la façon dont les entreprises trouvent et louent des espaces commerciaux au Québec.
            </p>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Nous croyons que chaque entreprise mérite d'accéder facilement aux meilleures opportunités immobilières commerciales, sans complications inutiles ni intermédiaires.
            </p>
            <div className="space-y-3">
              {[
                "Plateforme transparente et fiable",
                "Fonctionnalités avancées de recherche",
                "Support client exceptionnel",
                "Communauté d'annonceurs vérifiés",
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-accent" />
                  <span className="text-foreground">{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-gradient-to-br from-accent/20 to-accent/5 rounded-lg h-80 flex items-center justify-center">
            <div className="text-6xl">🏢</div>
          </div>
        </section>

        {/* Stats */}
        <section>
          <h2 className="text-3xl font-bold text-foreground mb-8 text-center">Nos Chiffres</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { icon: TrendingUp, value: "2,500+", label: "Propriétés actives" },
              { icon: Users, value: "1,200+", label: "Annonceurs" },
              { icon: Zap, value: "15K+", label: "Utilisateurs actifs" },
              { icon: CheckCircle, value: "98%", label: "Satisfaction" },
            ].map((stat, i) => (
              <Card key={i} className="p-6 text-center">
                <stat.icon className="w-8 h-8 text-accent mx-auto mb-4" />
                <p className="text-3xl font-bold text-foreground mb-2">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </Card>
            ))}
          </div>
        </section>

        {/* Values */}
        <section>
          <h2 className="text-3xl font-bold text-foreground mb-8 text-center">Nos Valeurs</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Transparence",
                description: "Nous croyons en la divulgation complète et honnête de toutes les informations.",
              },
              {
                title: "Innovation",
                description: "Nous utilisons la technologie la plus avancée pour améliorer l'expérience utilisateur.",
              },
              {
                title: "Fiabilité",
                description: "Notre plateforme est disponible 24/7 avec un support client exceptionnelquand vous en avez besoin.",
              },
              {
                title: "Communauté",
                description: "Nous construisons une communauté de propriétaires et locataires professionnels.",
              },
              {
                title: "Équité",
                description: "Nous offrons une plateforme équitable pour tous les acteurs du marché.",
              },
              {
                title: "Excellence",
                description: "Nous nous efforçons continuellement d'améliorer nos services et notre plateforme.",
              },
            ].map((value, i) => (
              <Card key={i} className="p-6">
                <h3 className="font-semibold text-foreground mb-2 text-lg">{value.title}</h3>
                <p className="text-muted-foreground text-sm">{value.description}</p>
              </Card>
            ))}
          </div>
        </section>

        {/* Timeline */}
        <section>
          <h2 className="text-3xl font-bold text-foreground mb-8 text-center">Notre Historique</h2>
          <div className="space-y-8 max-w-2xl mx-auto">
            {[
              { year: "2023", title: "Fondation", description: "Espace Commercial a été créée avec une vision de transformer le marché immobilier." },
              { year: "2024", title: "Lancement bêta", description: "Lancement de la plateforme bêta avec 500 propriétés en ligne." },
              { year: "2025", title: "Expansion", description: "Expansion à tout le Québec avec plus de 2,000 propriétés actives." },
              { year: "2026", title: "Aujourd'hui", description: "Plus de 1,200 annonceurs vérifiés et 15,000+ utilisateurs actifs mensuels." },
            ].map((item, i) => (
              <div key={i} className="flex gap-6">
                <div className="text-right pt-1">
                  <p className="font-bold text-accent text-lg">{item.year}</p>
                </div>
                <div className="flex gap-6">
                  <div className="w-0.5 bg-accent/30" />
                  <div className="pb-8">
                    <h3 className="font-semibold text-foreground text-lg mb-2">{item.title}</h3>
                    <p className="text-muted-foreground">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Team */}
        <section>
          <h2 className="text-3xl font-bold text-foreground mb-8 text-center">Notre Équipe</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: "Jean Dupont", role: "PDG & Co-fondateur", image: "👨‍💼" },
              { name: "Marie Leclerc", role: "VP Opérations", image: "👩‍💼" },
              { name: "Pierre Gagnon", role: "VP Technologie", image: "👨‍💻" },
              { name: "Sophie Bernard", role: "Directrice Marketing", image: "👩‍💼" },
              { name: "Marc Rivard", role: "Directeur Support Client", image: "👨‍💼" },
              { name: "Anne Lefevre", role: "Coordinatrice Communauté", image: "👩‍💼" },
            ].map((member, i) => (
              <Card key={i} className="p-6 text-center">
                <div className="text-5xl mb-4">{member.image}</div>
                <h3 className="font-semibold text-foreground mb-1">{member.name}</h3>
                <p className="text-sm text-muted-foreground">{member.role}</p>
              </Card>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="bg-accent/10 border border-accent/20 rounded-lg p-12 text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">Rejoignez la Révolution Immobilière</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Que vous soyez à la recherche d'un espace commercial ou que vous ayez une propriété à louer, Espace Commercial est votre partenaire idéal.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/proprietes">
              <Button className="bg-accent hover:bg-accent/90 text-accent-foreground px-8">
                Parcourir les propriétés
              </Button>
            </Link>
            <Link to="/tableau-de-bord">
              <Button variant="outline">
                Devenir annonceur
              </Button>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;
