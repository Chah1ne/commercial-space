export interface Broker {
  id: string;
  name: string;
  company: string;
  phone: string;
  email: string;
  website?: string;
  logo?: string;
  rating?: number;
}

export interface PropertyAmenities {
  // Climatisation & Chauffage
  airConditioning: boolean;
  heating: boolean;

  // Sécurité
  alarmSystem: boolean;
  cctv: boolean;
  securityGuard: boolean;

  // Aménagements intérieurs
  conferenceRooms: boolean;
  cafeteria: boolean;
  kitchenette: boolean;
  breakRoom: boolean;

  // Caractéristiques de bâtiment
  elevator: boolean;
  escalator: boolean;
  wheelchairAccessible: boolean;
  fitnessCenter: boolean;

  // Caractéristiques industrielles
  loadingDock: boolean;
  height: number; // en pieds
  sprinklers: boolean;
  highVoltageElectricity: boolean;

  // Stationnement & Accès
  parking: number;
  coveredParking: number;
  easternAccessibility: boolean; // Proximité autoroutes
  airportProximity: boolean;
  transitAccess: boolean;
  universityProximity: boolean;
  hospitalProximity: boolean;
  restaurantProximity: boolean;

  // Certifications & Normes
  leed: boolean;
  bomaBest: boolean;

  // Autres
  windowViews: boolean;
  balcony: boolean;
  terrace: boolean;
}

export interface Property {
  id: string;
  title: string;
  type: "commercial" | "bureau" | "industriel" | "terrain";
  category: "location" | "vente";
  price: number;
  priceUnit: string; // "pi²/an", "mois", "total"
  pricePerSqFt?: number; // Prix normalisé au pi²/mois
  area: number; // en pi²
  areaMetric?: number; // en m²
  address: string;
  city: string;
  province: string;
  postalCode: string;
  latitude?: number;
  longitude?: number;
  description: string;
  images: string[];
  videos?: string[];
  virtualTour?: string; // URL vers Matterport ou similaire
  floorPlan?: string; // URL du plan d'étage
  features: string[];
  amenities: PropertyAmenities;
  floors: number;
  rooms: number;
  yearBuilt: number;
  parking: number;
  availableDate: string;
  leaseTermMin?: number; // Durée minimale en mois
  leaseTermMax?: number; // Durée maximale en mois
  broker: Broker;
  featured: boolean;
  featuredExpiry?: string; // Date d'expiration de la mise en vedette
  publishedAt: string;
  updatedAt: string;
  views: number;
  contacts: number; // Nombre de demandes de contact
  rentalHistoryURL?: string; // URL vers l'historique des loyers
}

export interface SearchFilters {
  query: string;
  type: string[];
  category: string;
  city: string;
  province: string;
  postalCode?: string;
  searchRadius?: number; // en km
  minPrice: number;
  maxPrice: number;
  minArea: number;
  maxArea: number;
  pricePerSqFtMin?: number;
  pricePerSqFtMax?: number;
  availableDateFrom?: string;
  availableDateTo?: string;
  amenities: string[];
  leed: boolean;
  bomaBest: boolean;
  parking: boolean;
  transit: boolean;
  elevator: boolean;
  sortBy: "relevance" | "price-asc" | "price-desc" | "area-asc" | "area-desc" | "newest" | "views";
  mapBounds?: {
    north: number;
    south: number;
    east: number;
    west: number;
  };
}

export interface UserPreferences {
  id: string;
  userId: string;
  favorites: string[]; // IDs de propriétés favorites
  searches: SearchFilters[];
  alerts: SearchAlert[];
  createdAt: string;
  updatedAt: string;
}

export interface SearchAlert {
  id: string;
  name: string;
  filters: SearchFilters;
  frequency: "daily" | "weekly" | "monthly";
  email: string;
  active: boolean;
}
