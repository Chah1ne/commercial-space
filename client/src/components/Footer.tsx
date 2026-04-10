import { Building2, ExternalLink, Mail, MapPin, Phone } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-2.5 mb-4">
              <div className="bg-accent rounded-lg p-1.5">
                <Building2 className="h-5 w-5 text-accent-foreground" />
              </div>
              <div>
                <span className="text-lg font-bold tracking-tight block leading-none">ESPACE</span>
                <span className="text-[10px] font-medium tracking-widest opacity-80">COMMERCIAL</span>
              </div>
            </Link>
            <p className="text-sm text-primary-foreground/60 leading-relaxed">
              La plateforme #1 pour la location et la vente de propriétés commerciales au Québec.
            </p>
            <div className="flex gap-3 mt-6">
              {["FB", "TW", "LI", "IG"].map((label, i) => (
                <a key={i} href="#" className="w-9 h-9 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-accent transition-colors text-xs font-bold">
                  {label}
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold mb-4">Propriétés</h4>
            <ul className="space-y-2.5 text-sm text-primary-foreground/60">
              <li><Link to="/proprietes?category=location" className="hover:text-primary-foreground transition-colors">Commercial à louer</Link></li>
              <li><Link to="/proprietes?category=vente" className="hover:text-primary-foreground transition-colors">Commercial à vendre</Link></li>
              <li><Link to="/proprietes?type=bureau" className="hover:text-primary-foreground transition-colors">Bureaux</Link></li>
              <li><Link to="/proprietes?type=industriel" className="hover:text-primary-foreground transition-colors">Industriel</Link></li>
              <li><Link to="/proprietes?type=terrain" className="hover:text-primary-foreground transition-colors">Terrains</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Pour les annonceurs</h4>
            <ul className="space-y-2.5 text-sm text-primary-foreground/60">
              <li><Link to="/tableau-de-bord" className="hover:text-primary-foreground transition-colors">Tableau de bord</Link></li>
              <li><Link to="/forfaits" className="hover:text-primary-foreground transition-colors">Nos forfaits</Link></li>
              <li><Link to="/blog" className="hover:text-primary-foreground transition-colors">Blog</Link></li>
              <li><Link to="/contact" className="hover:text-primary-foreground transition-colors">Support</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-3 text-sm text-primary-foreground/60">
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-accent" />
                1000, rue de la Gauchetière, Montréal
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-accent" />
                1 (514) 349-3333
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-accent" />
                info@espacecommercial.ca
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="border-t border-primary-foreground/10">
        <div className="container py-5 flex flex-col md:flex-row items-center justify-between text-xs text-primary-foreground/40">
          <p>© 2026 Espace Commercial. Tous droits réservés.</p>
          <div className="flex gap-6 mt-3 md:mt-0">
            <a href="#" className="hover:text-primary-foreground transition-colors">Politique de confidentialité</a>
            <a href="#" className="hover:text-primary-foreground transition-colors">Conditions d'utilisation</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
