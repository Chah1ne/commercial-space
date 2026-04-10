import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, Phone, MapPin, Clock, MessageSquare, Send } from "lucide-react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-primary py-12">
        <div className="container text-center">
          <h1 className="text-4xl font-bold text-primary-foreground mb-4">Nous Contacter</h1>
          <p className="text-lg text-primary-foreground/70">
            Nous serions heureux de répondre à vos questions
          </p>
        </div>
      </div>

      <div className="container py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Phone */}
            <Card className="p-6">
              <Phone className="w-8 h-8 text-accent mb-3" />
              <h3 className="font-semibold text-foreground mb-2">Téléphone</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Appelez-nous pendant les heures de bureau
              </p>
              <a href="tel:+15143493333" className="font-semibold text-accent hover:underline">
                1 (514) 349-3333
              </a>
            </Card>

            {/* Email */}
            <Card className="p-6">
              <Mail className="w-8 h-8 text-accent mb-3" />
              <h3 className="font-semibold text-foreground mb-2">Courriel</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Envoyez-nous un message à tout moment
              </p>
              <a href="mailto:info@espacecommercial.ca" className="font-semibold text-accent hover:underline">
                info@espacecommercial.ca
              </a>
            </Card>

            {/* Address */}
            <Card className="p-6">
              <MapPin className="w-8 h-8 text-accent mb-3" />
              <h3 className="font-semibold text-foreground mb-2">Bureau</h3>
              <p className="text-sm text-muted-foreground">
                1000, rue de la Gauchetière<br />
                Bureau 1500<br />
                Montréal, QC H3B 4W8
              </p>
            </Card>

            {/* Hours */}
            <Card className="p-6">
              <Clock className="w-8 h-8 text-accent mb-3" />
              <h3 className="font-semibold text-foreground mb-2">Heures d'ouverture</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>Lun-Ven: 8h00 - 18h00</li>
                <li>Sam: 9h00 - 17h00</li>
                <li>Dim: Fermé</li>
              </ul>
            </Card>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="p-8">
              <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
                <MessageSquare className="w-6 h-6" />
                Envoyez-nous un message
              </h2>

              {submitted && (
                <div className="mb-6 p-4 bg-green-50 text-green-800 rounded-lg border border-green-200">
                  Merci! Nous avons reçu votre message et vous répondrons bientôt.
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="name" className="text-sm font-semibold mb-2 block">
                      Nom complet *
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="Jean Dupont"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-sm font-semibold mb-2 block">
                      Adresse courriel *
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="jean@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="phone" className="text-sm font-semibold mb-2 block">
                      Numéro de téléphone
                    </Label>
                    <Input
                      id="phone"
                      name="phone"
                      placeholder="(514) 123-4567"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <Label htmlFor="subject" className="text-sm font-semibold mb-2 block">
                      Sujet *
                    </Label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                      required
                    >
                      <option value="">Sélectionner un sujet</option>
                      <option value="general">Question générale</option>
                      <option value="listing">À propos d'une annonce</option>
                      <option value="advertiser">Services annonceur</option>
                      <option value="support">Support technique</option>
                      <option value="other">Autre</option>
                    </select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="message" className="text-sm font-semibold mb-2 block">
                    Message *
                  </Label>
                  <textarea
                    id="message"
                    name="message"
                    placeholder="Décrivez votre demande..."
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full rounded-md border border-input bg-background px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                    required
                  />
                </div>

                <div className="flex items-center">
                  <input type="checkbox" id="agree" defaultChecked className="rounded" />
                  <label htmlFor="agree" className="text-sm text-muted-foreground ml-2">
                    J'accepte les conditions de confidentialité
                  </label>
                </div>

                <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground gap-2 py-6">
                  <Send className="w-4 h-4" />
                  Envoyer le message
                </Button>
              </form>
            </Card>

            {/* FAQ */}
            <div className="mt-12">
              <h3 className="text-2xl font-bold text-foreground mb-6">Questions fréquentes</h3>
              <div className="space-y-4">
                {[
                  {
                    q: "Quel est le délai de réponse?",
                    a: "Nous répondons à la plupart des demandes dans les 24 heures.",
                  },
                  {
                    q: "Comment puis-je publier une annonce?",
                    a: "Créez un compte, accédez à votre tableau de bord et cliquez sur 'Nouvelle annonce'. Le processus prend environ 5 minutes.",
                  },
                  {
                    q: "Est-il gratuit de publier une annonce?",
                    a: "Oui, les annonces de base sont gratuites. Des options premium sont disponibles pour augmenter la visibilité.",
                  },
                  {
                    q: "Comment modifier ou supprimer une annonce?",
                    a: "Accédez à votre tableau de bord, trouvez l'annonce et cliquez sur 'Éditer' ou 'Supprimer'.",
                  },
                ].map((faq, i) => (
                  <Card key={i} className="p-4">
                    <p className="font-semibold text-foreground mb-2">{faq.q}</p>
                    <p className="text-sm text-muted-foreground">{faq.a}</p>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
