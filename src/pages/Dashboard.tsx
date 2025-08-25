import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import AddModuleModal from "@/components/AddModuleModal";
import { Plus, Users } from "lucide-react";

const modules = [
  {
    id: 1,
    name: "Home",
    description: "Puerta de entrada con accesos a campañas, noticias y llamadas a la acción clave",
    icon: "🏠",
    pages: 8,
    isCustom: false
  },
  {
    id: 2,
    name: "Quiénes somos",
    description: "Identidad institucional: movimiento internacional, historia, misión/visión/principios",
    icon: "👥",
    pages: 12,
    isCustom: false
  },
  {
    id: 3,
    name: "Participa",
    description: "Convoca a sumarse: voluntariado, campañas, apoyo administrativo, cultura humanitaria",
    icon: "🤝",
    pages: 6,
    isCustom: false
  },
  {
    id: 4,
    name: "Donar",
    description: "Canaliza donaciones: Colecta Nacional, Fondo desastres, tramitar deducible",
    icon: "💝",
    pages: 8,
    isCustom: false
  },
  {
    id: 5,
    name: "Programas",
    description: "Líneas de acción: Socorros, Resiliencia, Atención migrantes, Salud comunitaria",
    icon: "📋",
    pages: 15,
    isCustom: false
  },
  {
    id: 6,
    name: "Formación y capacitación",
    description: "Oferta académica: CENCAD, escuelas, cursos, certificaciones, educación en línea",
    icon: "🎓",
    pages: 10,
    isCustom: false
  },
  {
    id: 7,
    name: "Servicios",
    description: "Cartera de servicios: hospitales, servicios médicos, banco de sangre",
    icon: "🏥",
    pages: 7,
    isCustom: false
  },
  {
    id: 8,
    name: "Cómo prepararse en emergencias",
    description: "Información práctica: recomendaciones y aplicaciones móviles",
    icon: "🚨",
    pages: 4,
    isCustom: false
  },
  {
    id: 9,
    name: "Transparencia",
    description: "Rendición de cuentas: estados financieros, reportes, proyectos financiados",
    icon: "📊",
    pages: 8,
    isCustom: false
  },
  {
    id: 10,
    name: "Prensa y noticias",
    description: "Comunicados, galería multimedia, entrevistas, boletín institucional",
    icon: "📰",
    pages: 12,
    isCustom: false
  },
  {
    id: 12,
    name: "Tienda",
    description: "Canal de comercio para productos institucionales",
    icon: "🛒",
    pages: 5,
    isCustom: false
  },
  {
    id: 13,
    name: "Contacto",
    description: "Vías de comunicación con la institución",
    icon: "📞",
    pages: 3,
    isCustom: false
  },
  {
    id: 14,
    name: "Legales",
    description: "Aviso de privacidad, políticas, términos y condiciones",
    icon: "⚖️",
    pages: 4,
    isCustom: false
  }
];

const states = [
  "Aguascalientes", "Baja California", "Baja California Sur", "Campeche", "Chiapas", 
  "Chihuahua", "Coahuila", "Colima", "Durango", "Estado de México", "Guanajuato", 
  "Guerrero", "Hidalgo", "Jalisco", "Michoacán", "Morelos", "Nayarit", "Nuevo León", 
  "Oaxaca", "Puebla", "Querétaro", "Quintana Roo", "San Luis Potosí", "Sinaloa", 
  "Sonora", "Tabasco", "Tamaulipas", "Tlaxcala", "Veracruz", "Yucatán", "Zacatecas"
];

const Dashboard = () => {
  const [level, setLevel] = useState<string>("nacional");
  const [selectedState, setSelectedState] = useState<string>("");
  const [allModules, setAllModules] = useState(modules);
  const [isAddModuleOpen, setIsAddModuleOpen] = useState(false);
  const navigate = useNavigate();

  const handleEditModule = (moduleId: number) => {
    navigate(`/editor/${moduleId}?level=${level}&state=${selectedState}`);
  };

  const handleLogout = () => {
    navigate("/");
  };

  const handleAddModule = (newModule: any) => {
    setAllModules([...allModules, newModule]);
  };

  const handleUserManagement = () => {
    navigate("/users");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-primary rounded-sm flex items-center justify-center mr-3">
                <span className="text-white font-bold text-xl">+</span>
              </div>
              <div>
                <h1 className="text-lg font-bold text-foreground">CRUZ ROJA MEXICANA</h1>
                <p className="text-xs text-muted-foreground">Gestor de Contenido</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button 
                onClick={handleUserManagement}
                variant="outline"
                className="flex items-center space-x-2"
              >
                <Users className="w-4 h-4" />
                <span>Gestión de Usuarios</span>
              </Button>
              <Button onClick={handleLogout} variant="outline">
                Cerrar Sesión
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Level Selector */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-primary">Configuración de Nivel</CardTitle>
            <CardDescription>
              Selecciona el nivel de edición para el contenido
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <label className="text-sm font-medium text-foreground mb-2 block">
                  Nivel de Edición
                </label>
                <Select value={level} onValueChange={setLevel}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona el nivel" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="nacional">Nacional</SelectItem>
                    <SelectItem value="estatal">Estatal</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              {level === "estatal" && (
                <div className="flex-1">
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Estado
                  </label>
                  <Select value={selectedState} onValueChange={setSelectedState}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona el estado" />
                    </SelectTrigger>
                    <SelectContent>
                      {states.map((state) => (
                        <SelectItem key={state} value={state}>
                          {state}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Modules Grid */}
        <div className="mb-6 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-2">Módulos de Contenido</h2>
            <p className="text-muted-foreground">
              Administra el contenido de cada módulo de la landing page ({level === "nacional" ? "Nacional" : `${selectedState || "Estatal"}`})
            </p>
          </div>
          <Button 
            onClick={() => setIsAddModuleOpen(true)}
            className="bg-primary hover:bg-primary-hover flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Agregar Módulo</span>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allModules.map((module) => (
            <Card key={module.id} className="hover:shadow-lg transition-shadow cursor-pointer group">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="text-2xl">{module.icon}</div>
                      <div>
                        <CardTitle className="text-lg group-hover:text-primary transition-colors">
                          {module.name}
                        </CardTitle>
                        <div className="flex items-center space-x-2 mt-1">
                          <Badge variant="secondary">
                            {module.pages} páginas
                          </Badge>
                          {module.isCustom && (
                            <Badge variant="outline" className="text-xs">
                              Personalizado
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <CardDescription className="mb-4 text-sm">
                  {module.description}
                </CardDescription>
                <Button 
                  onClick={() => handleEditModule(module.id)}
                  className="w-full bg-primary hover:bg-primary-hover"
                  disabled={level === "estatal" && !selectedState}
                >
                  Editar Contenido
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {level === "estatal" && !selectedState && (
          <div className="text-center mt-8 p-6 bg-secondary/50 rounded-lg">
            <p className="text-muted-foreground">
              Por favor selecciona un estado para habilitar la edición de módulos
            </p>
          </div>
        )}
      </div>

      {/* Add Module Modal */}
      <AddModuleModal
        isOpen={isAddModuleOpen}
        onClose={() => setIsAddModuleOpen(false)}
        onAddModule={handleAddModule}
      />
    </div>
  );
};

export default Dashboard;