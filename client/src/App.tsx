import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Index from "./pages/Index";
import Properties from "./pages/Properties";
import PropertyDetail from "./pages/PropertyDetail";
import AdvancedSearch from "./pages/AdvancedSearch";
import MapSearch from "./pages/MapSearch";
import AdvertiserDashboard from "./pages/AdvertiserDashboard";
import Favorites from "./pages/Favorites";
import Blog from "./pages/Blog";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Publish from "./pages/Publish";
import Pricing from "./pages/Pricing";
import HelpCenter from "./pages/HelpCenter";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/recherche-avancee" element={<AdvancedSearch />} />
              <Route path="/recherche-carte" element={<MapSearch />} />
              <Route path="/proprietes" element={<Properties />} />
              <Route path="/propriete/:id" element={<PropertyDetail />} />
              <Route path="/tableau-de-bord" element={<AdvertiserDashboard />} />
              <Route path="/favoris" element={<Favorites />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/a-propos" element={<About />} />
              <Route path="/publier" element={<Publish />} />
              <Route path="/forfaits" element={<Pricing />} />
              <Route path="/aide" element={<HelpCenter />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
