import { useState } from "react";
import { ArrowLeft, Plus, Trash2, Upload } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const Publish = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    title: "",
    type: "commercial",
    category: "location",
    price: "",
    priceUnit: "pi²/an",
    area: "",
    address: "",
    city: "",
    province: "Québec",
    postalCode: "",
    description: "",
    features: [] as string[],
    images: [] as string[],
    parking: "",
    floors: "",
    rooms: "",
    yearBuilt: "",
    availableDate: "",
  });

  const [featureInput, setFeatureInput] = useState("");

  const addFeature = () => {
    if (featureInput.trim()) {
      setFormData({
        ...formData,
        features: [...formData.features, featureInput],
      });
      setFeatureInput("");
    }
  };

  const removeFeature = (index: number) => {
    setFormData({
      ...formData,
      features: formData.features.filter((_, i) => i !== index),
    });
  };

  const handlePublish = () => {
    console.log("Publishing property:", formData);
    alert("Propriété publiée avec succès!");
  };

  const steps = ["Détails de base", "Localisation", "Description", "Images", "Vérification"];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border sticky top-16 z-40">
        <div className="container py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/tableau-de-bord">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Publier une propriété</h1>
              <p className="text-sm text-muted-foreground">Étape {step} de {steps.length}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container py-8">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex gap-2 mb-4">
            {steps.map((stepName, i) => (
              <button
                key={i}
                onClick={() => setStep(i + 1)}
                className={`flex-1 py-2 px-4 rounded-lg font-medium text-sm transition-colors ${
                  i + 1 === step
                    ? "bg-accent text-accent-foreground"
                    : i + 1 < step
                    ? "bg-green-500/20 text-green-600"
                    : "bg-card border border-border text-muted-foreground"
                }`}
              >
                {stepName}
              </button>
            ))}
          </div>
          <div className="h-1 bg-card rounded-full overflow-hidden">
            <div
              className="h-full bg-accent transition-all"
              style={{ width: `${(step / steps.length) * 100}%` }}
            />
          </div>
        </div>

        <div className="max-w-2xl mx-auto">
          {/* Step 1: Basic Details */}
          {step === 1 && (
            <Card className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Titre de l'annonce</label>
                <input
                  type="text"
                  placeholder="Ex: Bureau moderne centre-ville"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Type de propriété</label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm"
                  >
                    <option value="commercial">Commercial</option>
                    <option value="bureau">Bureau</option>
                    <option value="industriel">Industriel</option>
                    <option value="terrain">Terrain</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Catégorie</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm"
                  >
                    <option value="location">À louer</option>
                    <option value="vente">À vendre</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Prix</label>
                  <input
                    type="number"
                    placeholder="0"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Unité de prix</label>
                  <select
                    value={formData.priceUnit}
                    onChange={(e) => setFormData({ ...formData, priceUnit: e.target.value })}
                    className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm"
                  >
                    <option value="pi²/an">$ par pi²/an</option>
                    <option value="mois">$ par mois</option>
                    <option value="total">$ total</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Superficie (pi²)</label>
                <input
                  type="number"
                  placeholder="0"
                  value={formData.area}
                  onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                  className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm"
                />
              </div>

              <div className="flex gap-3 justify-end">
                <Button variant="outline">Annuler</Button>
                <Button className="bg-accent hover:bg-accent/90 text-accent-foreground" onClick={() => setStep(2)}>
                  Suivant
                </Button>
              </div>
            </Card>
          )}

          {/* Step 2: Location */}
          {step === 2 && (
            <Card className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Adresse</label>
                <input
                  type="text"
                  placeholder="Ex: 1250 boul. René-Lévesque Ouest"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Ville</label>
                  <input
                    type="text"
                    placeholder="Ex: Montréal"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Code postal</label>
                  <input
                    type="text"
                    placeholder="Ex: H3B 4W8"
                    value={formData.postalCode}
                    onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                    className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Province</label>
                  <select
                    value={formData.province}
                    onChange={(e) => setFormData({ ...formData, province: e.target.value })}
                    className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm"
                  >
                    <option value="Québec">Québec</option>
                    <option value="Ontario">Ontario</option>
                    <option value="Colombie-Britannique">Colombie-Britannique</option>
                    <option value="Alberta">Alberta</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Date de disponibilité</label>
                  <input
                    type="date"
                    value={formData.availableDate}
                    onChange={(e) => setFormData({ ...formData, availableDate: e.target.value })}
                    className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm"
                  />
                </div>
              </div>

              <div className="flex gap-3 justify-end">
                <Button variant="outline" onClick={() => setStep(1)}>
                  Précédent
                </Button>
                <Button className="bg-accent hover:bg-accent/90 text-accent-foreground" onClick={() => setStep(3)}>
                  Suivant
                </Button>
              </div>
            </Card>
          )}

          {/* Step 3: Description & Features */}
          {step === 3 && (
            <Card className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Description</label>
                <textarea
                  placeholder="Décrivez votre propriété en détail..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={6}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Caractéristiques</label>
                <div className="flex gap-2 mb-3">
                  <input
                    type="text"
                    placeholder="Ex: Air climatisé"
                    value={featureInput}
                    onChange={(e) => setFeatureInput(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && addFeature()}
                    className="flex-1 h-10 rounded-md border border-input bg-background px-3 text-sm"
                  />
                  <Button className="bg-accent hover:bg-accent/90 text-accent-foreground gap-1" onClick={addFeature}>
                    <Plus className="h-4 w-4" /> Ajouter
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.features.map((feature, i) => (
                    <Badge key={i} className="bg-primary/20 text-primary hover:bg-primary/30 cursor-pointer" onClick={() => removeFeature(i)}>
                      {feature}
                      <Trash2 className="h-3 w-3 ml-1" />
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  { label: "Étages", key: "floors" },
                  { label: "Pièces", key: "rooms" },
                  { label: "Année de construction", key: "yearBuilt" },
                  { label: "Stationnement", key: "parking" },
                ].map((field) => (
                  <div key={field.key}>
                    <label className="block text-xs font-medium text-muted-foreground mb-1">{field.label}</label>
                    <input
                      type="number"
                      placeholder="0"
                      value={formData[field.key as keyof typeof formData]}
                      onChange={(e) => setFormData({ ...formData, [field.key]: e.target.value })}
                      className="w-full h-9 rounded-md border border-input bg-background px-2 text-sm"
                    />
                  </div>
                ))}
              </div>

              <div className="flex gap-3 justify-end">
                <Button variant="outline" onClick={() => setStep(2)}>
                  Précédent
                </Button>
                <Button className="bg-accent hover:bg-accent/90 text-accent-foreground" onClick={() => setStep(4)}>
                  Suivant
                </Button>
              </div>
            </Card>
          )}

          {/* Step 4: Images */}
          {step === 4 && (
            <Card className="p-6 space-y-6">
              <div className="border-2 border-dashed border-border rounded-lg p-8 text-center cursor-pointer hover:bg-card/50 transition-colors">
                <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                <p className="text-sm font-medium text-foreground mb-1">Cliquez pour télécharger des images</p>
                <p className="text-xs text-muted-foreground">Jusqu'à 10 images (JPG, PNG)</p>
              </div>

              <div className="grid grid-cols-3 gap-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="aspect-video bg-card border border-border rounded-lg flex items-center justify-center">
                    <span className="text-muted-foreground text-sm">Image {i}</span>
                  </div>
                ))}
              </div>

              <div className="flex gap-3 justify-end">
                <Button variant="outline" onClick={() => setStep(3)}>
                  Précédent
                </Button>
                <Button className="bg-accent hover:bg-accent/90 text-accent-foreground" onClick={() => setStep(5)}>
                  Suivant
                </Button>
              </div>
            </Card>
          )}

          {/* Step 5: Verification */}
          {step === 5 && (
            <Card className="p-6 space-y-6">
              <h2 className="text-lg font-semibold text-foreground">Vérification de votre annonce</h2>

              <div className="bg-card/50 border border-border rounded-lg p-4 space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-muted-foreground">Titre:</span><span className="font-medium text-foreground">{formData.title || "—"}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Type:</span><span className="font-medium text-foreground">{formData.type}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Catégorie:</span><span className="font-medium text-foreground">{formData.category === "location" ? "À louer" : "À vendre"}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Localisation:</span><span className="font-medium text-foreground">{formData.city}, {formData.province}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Prix:</span><span className="font-medium text-foreground">{formData.price} {formData.priceUnit}</span></div>
              </div>

              <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4 text-sm text-green-700 dark:text-green-400">
                Votre annonce sera publiée immédiatement après la confirmation.
              </div>

              <div className="flex gap-3 justify-end">
                <Button variant="outline" onClick={() => setStep(4)}>
                  Précédent
                </Button>
                <Button className="bg-green-600 hover:bg-green-700 text-white font-semibold" onClick={handlePublish}>
                  Publier l'annonce
                </Button>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default Publish;
