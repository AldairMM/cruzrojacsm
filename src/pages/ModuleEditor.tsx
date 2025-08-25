import { useState, useEffect } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Save, Eye, Edit, Image, Type } from "lucide-react";

// Mock content for different modules
const moduleContent = {
  1: { // Home
    title: "Bienvenidos a Cruz Roja Mexicana",
    subtitle: "Ayudar siempre es salvar vidas",
    heroText: "Somos una institución de asistencia privada, auxiliar de los poderes públicos en el ámbito humanitario.",
    ctaText: "Únete a nosotros",
    sections: [
      { type: "hero", title: "Sección Principal", content: "Contenido del hero" },
      { type: "campaigns", title: "Campañas Activas", content: "Campañas destacadas" },
      { type: "news", title: "Noticias Recientes", content: "Últimas noticias" }
    ]
  },
  2: { // Quiénes somos
    title: "¿Quiénes Somos?",
    subtitle: "Conoce nuestra historia y misión",
    heroText: "Cruz Roja Mexicana es parte del Movimiento Internacional de la Cruz Roja y de la Media Luna Roja.",
    sections: [
      { type: "identity", title: "Identidad Institucional", content: "Nuestra identidad" },
      { type: "history", title: "Historia", content: "Fundada en 1910..." },
      { type: "mission", title: "Misión", content: "Nuestra misión humanitaria" },
      { type: "vision", title: "Visión", content: "Nuestra visión al futuro" }
    ]
  }
  // Add more modules as needed
};

const ModuleEditor = () => {
  const { moduleId } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const level = searchParams.get("level") || "nacional";
  const state = searchParams.get("state") || "";
  
  const [isEditing, setIsEditing] = useState(false);
  const [currentContent, setCurrentContent] = useState(moduleContent[1]); // Default to Home
  const [editingSection, setEditingSection] = useState<string | null>(null);

  const moduleNames = {
    1: "Home", 2: "Quiénes somos", 3: "Participa", 4: "Donar", 5: "Programas",
    6: "Formación y capacitación", 7: "Servicios", 8: "Cómo prepararse en emergencias",
    9: "Transparencia", 10: "Prensa y noticias", 11: "Usuarios", 12: "Tienda",
    13: "Contacto", 14: "Legales"
  };

  useEffect(() => {
    // Load content for the specific module
    const content = moduleContent[parseInt(moduleId || "1")] || moduleContent[1];
    setCurrentContent(content);
  }, [moduleId]);

  const handleSave = () => {
    toast({
      title: "Contenido guardado",
      description: `Los cambios en ${moduleNames[parseInt(moduleId || "1")]} se han guardado exitosamente.`,
    });
    setIsEditing(false);
    setEditingSection(null);
  };

  const handleBackToDashboard = () => {
    navigate("/dashboard");
  };

  const handleEditSection = (sectionType: string) => {
    setEditingSection(sectionType);
    setIsEditing(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Button 
                onClick={handleBackToDashboard}
                variant="ghost" 
                size="sm"
                className="flex items-center space-x-2"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Volver</span>
              </Button>
              <div className="flex items-center">
                <div className="w-8 h-8 bg-primary rounded-sm flex items-center justify-center mr-3">
                  <span className="text-white font-bold text-sm">+</span>
                </div>
                <div>
                  <h1 className="font-bold text-foreground">
                    Editor: {moduleNames[parseInt(moduleId || "1")]}
                  </h1>
                  <p className="text-xs text-muted-foreground">
                    {level === "nacional" ? "Nacional" : `${state}`}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant={isEditing ? "destructive" : "secondary"}>
                {isEditing ? "Editando" : "Vista previa"}
              </Badge>
              <Button 
                onClick={() => setIsEditing(!isEditing)}
                variant="outline"
                size="sm"
              >
                {isEditing ? <Eye className="w-4 h-4" /> : <Edit className="w-4 h-4" />}
              </Button>
              {isEditing && (
                <Button onClick={handleSave} size="sm" className="bg-primary hover:bg-primary-hover">
                  <Save className="w-4 h-4 mr-2" />
                  Guardar
                </Button>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Landing Page Preview */}
          <div className="lg:col-span-2">
            <Card className="h-fit">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Eye className="w-5 h-5" />
                  <span>Vista Previa de la Landing Page</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {/* Mock Landing Page Content */}
                <div className="space-y-8">
                  {/* Hero Section */}
                  <div 
                    className={`bg-primary text-white p-8 rounded-lg relative ${isEditing ? 'cursor-pointer hover:ring-2 hover:ring-primary-hover' : ''}`}
                    onClick={() => isEditing && handleEditSection('hero')}
                  >
                    {isEditing && (
                      <div className="absolute top-2 right-2 bg-white text-primary px-2 py-1 rounded text-xs font-medium">
                        Clic para editar
                      </div>
                    )}
                    <h1 className="text-3xl font-bold mb-4">{currentContent.title}</h1>
                    <p className="text-xl mb-4">{currentContent.subtitle}</p>
                    <p className="mb-6">{currentContent.heroText}</p>
                    <Button variant="secondary" className="bg-white text-primary hover:bg-gray-100">
                      {currentContent.ctaText || "Acción principal"}
                    </Button>
                  </div>

                  {/* Content Sections */}
                  {currentContent.sections?.map((section, index) => (
                    <div 
                      key={index}
                      className={`bg-white p-6 border rounded-lg ${isEditing ? 'cursor-pointer hover:ring-2 hover:ring-primary' : ''}`}
                      onClick={() => isEditing && handleEditSection(section.type)}
                    >
                      {isEditing && (
                        <div className="absolute top-2 right-2 bg-primary text-white px-2 py-1 rounded text-xs font-medium">
                          Editar
                        </div>
                      )}
                      <h2 className="text-xl font-semibold text-primary mb-3">{section.title}</h2>
                      <p className="text-muted-foreground">{section.content}</p>
                      <div className="mt-4 flex space-x-2">
                        <Badge variant="outline">
                          <Image className="w-3 h-3 mr-1" />
                          Imagen
                        </Badge>
                        <Badge variant="outline">
                          <Type className="w-3 h-3 mr-1" />
                          Texto
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Editing Panel */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Edit className="w-5 h-5" />
                  <span>Panel de Edición</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {isEditing ? (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="title">Título Principal</Label>
                      <Input
                        id="title"
                        value={currentContent.title}
                        onChange={(e) => setCurrentContent({
                          ...currentContent,
                          title: e.target.value
                        })}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="subtitle">Subtítulo</Label>
                      <Input
                        id="subtitle"
                        value={currentContent.subtitle}
                        onChange={(e) => setCurrentContent({
                          ...currentContent,
                          subtitle: e.target.value
                        })}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="heroText">Texto Principal</Label>
                      <Textarea
                        id="heroText"
                        value={currentContent.heroText}
                        onChange={(e) => setCurrentContent({
                          ...currentContent,
                          heroText: e.target.value
                        })}
                        rows={4}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Gestión de Imágenes</Label>
                      <Button variant="outline" className="w-full">
                        <Image className="w-4 h-4 mr-2" />
                        Subir Nueva Imagen
                      </Button>
                    </div>

                    <Button onClick={handleSave} className="w-full bg-primary hover:bg-primary-hover">
                      <Save className="w-4 h-4 mr-2" />
                      Guardar Cambios
                    </Button>
                  </>
                ) : (
                  <div className="text-center py-8">
                    <Edit className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                    <p className="text-muted-foreground mb-4">
                      Activa el modo de edición para modificar el contenido
                    </p>
                    <Button 
                      onClick={() => setIsEditing(true)}
                      className="bg-primary hover:bg-primary-hover"
                    >
                      Comenzar Edición
                    </Button>
                  </div>
                )}
                
                <div className="pt-4 border-t">
                  <h4 className="font-medium mb-2">Información del Módulo</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Módulo:</span>
                      <span>{moduleNames[parseInt(moduleId || "1")]}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Nivel:</span>
                      <span className="capitalize">{level}</span>
                    </div>
                    {level === "estatal" && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Estado:</span>
                        <span>{state}</span>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModuleEditor;