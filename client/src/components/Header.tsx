import { Link, useLocation } from "react-router-dom";
import { Building2, Heart, Menu, Phone, Plus, Search, User, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <header className={`sticky top-0 z-50 w-full transition-colors ${isHome ? "bg-primary" : "bg-primary"}`}>
      {/* Top bar */}
      <div className="border-b border-primary-foreground/10">
        <div className="container flex items-center justify-between h-10 text-sm text-primary-foreground/70">
          <div className="hidden md:flex items-center gap-6">
            <Link to="/a-propos" className="hover:text-primary-foreground transition-colors">À Propos</Link>
            <Link to="/contact" className="hover:text-primary-foreground transition-colors">Contactez-nous</Link>
            <Link to="/aide" className="hover:text-primary-foreground transition-colors">Centre d'aide</Link>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="h-3.5 w-3.5" />
            <span className="font-medium text-primary-foreground">1 (514) 349-3333</span>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <div className="container flex items-center justify-between h-16">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="bg-accent rounded-lg p-1.5">
            <Building2 className="h-6 w-6 text-accent-foreground" />
          </div>
          <div className="text-primary-foreground">
            <span className="text-xl font-bold tracking-tight block leading-none">ESPACE</span>
            <span className="text-xs font-medium tracking-widest opacity-80">COMMERCIAL</span>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-1">
          <Link to="/proprietes?category=featured" className="px-4 py-2 text-sm font-medium text-primary-foreground/80 hover:text-primary-foreground transition-colors rounded-md hover:bg-primary-foreground/5">
            En vedette
          </Link>
          <Link to="/proprietes?category=location" className="px-4 py-2 text-sm font-medium text-primary-foreground/80 hover:text-primary-foreground transition-colors rounded-md hover:bg-primary-foreground/5">
            À louer
          </Link>
          <Link to="/proprietes?category=vente" className="px-4 py-2 text-sm font-medium text-primary-foreground/80 hover:text-primary-foreground transition-colors rounded-md hover:bg-primary-foreground/5">
            À vendre
          </Link>
          <Link to="/recherche-avancee" className="px-4 py-2 text-sm font-medium text-primary-foreground/80 hover:text-primary-foreground transition-colors rounded-md hover:bg-primary-foreground/5">
            Recherche avancée
          </Link>
          <Link to="/recherche-carte" className="px-4 py-2 text-sm font-medium text-primary-foreground/80 hover:text-primary-foreground transition-colors rounded-md hover:bg-primary-foreground/5">
            Carte
          </Link>
          <Link to="/blog" className="px-4 py-2 text-sm font-medium text-primary-foreground/80 hover:text-primary-foreground transition-colors rounded-md hover:bg-primary-foreground/5">
            Blog
          </Link>
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <Link to="/recherche-avancee">
            <Button variant="ghost" size="icon" className="text-primary-foreground/70 hover:text-primary-foreground hover:bg-primary-foreground/10">
              <Search className="h-5 w-5" />
            </Button>
          </Link>
          <Link to="/favoris">
            <Button variant="ghost" size="icon" className="text-primary-foreground/70 hover:text-primary-foreground hover:bg-primary-foreground/10">
              <Heart className="h-5 w-5" />
            </Button>
          </Link>
          <Button variant="ghost" size="sm" className="text-primary-foreground/70 hover:text-primary-foreground hover:bg-primary-foreground/10 gap-2">
            <User className="h-4 w-4" />
            Se connecter
          </Button>
          <Link to="/tableau-de-bord">
            <Button className="bg-accent hover:bg-accent/90 text-accent-foreground gap-2 font-semibold">
              <Plus className="h-4 w-4" />
              Tableau de bord
            </Button>
          </Link>
        </div>

        {/* Mobile toggle */}
        <button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden text-primary-foreground p-2">
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-primary border-t border-primary-foreground/10 pb-4">
          <nav className="container flex flex-col gap-2 pt-4">
            <Link to="/proprietes?category=featured" onClick={() => setMobileOpen(false)} className="px-4 py-2.5 text-sm font-medium text-primary-foreground/80 hover:text-primary-foreground rounded-md hover:bg-primary-foreground/5">
              En vedette
            </Link>
            <Link to="/proprietes?category=location" onClick={() => setMobileOpen(false)} className="px-4 py-2.5 text-sm font-medium text-primary-foreground/80 hover:text-primary-foreground rounded-md hover:bg-primary-foreground/5">
              À louer
            </Link>
            <Link to="/proprietes?category=vente" onClick={() => setMobileOpen(false)} className="px-4 py-2.5 text-sm font-medium text-primary-foreground/80 hover:text-primary-foreground rounded-md hover:bg-primary-foreground/5">
              À vendre
            </Link>
            <Link to="/recherche-avancee" onClick={() => setMobileOpen(false)} className="px-4 py-2.5 text-sm font-medium text-primary-foreground/80 hover:text-primary-foreground rounded-md hover:bg-primary-foreground/5">
              Recherche avancée
            </Link>
            <Link to="/recherche-carte" onClick={() => setMobileOpen(false)} className="px-4 py-2.5 text-sm font-medium text-primary-foreground/80 hover:text-primary-foreground rounded-md hover:bg-primary-foreground/5">
              Carte
            </Link>
            <Link to="/blog" onClick={() => setMobileOpen(false)} className="px-4 py-2.5 text-sm font-medium text-primary-foreground/80 hover:text-primary-foreground rounded-md hover:bg-primary-foreground/5">
              Blog
            </Link>
            <Link to="/favoris" onClick={() => setMobileOpen(false)} className="px-4 py-2.5 text-sm font-medium text-primary-foreground/80 hover:text-primary-foreground rounded-md hover:bg-primary-foreground/5">
              Favoris
            </Link>
            <div className="border-t border-primary-foreground/10 mt-2 pt-2 flex flex-col gap-2">
              <Button variant="ghost" className="justify-start text-primary-foreground/70 hover:text-primary-foreground hover:bg-primary-foreground/10 gap-2">
                <User className="h-4 w-4" /> Se connecter
              </Button>
              <Link to="/tableau-de-bord" onClick={() => setMobileOpen(false)}>
                <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground gap-2 font-semibold">
                  <Plus className="h-4 w-4" /> Tableau de bord
                </Button>
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
