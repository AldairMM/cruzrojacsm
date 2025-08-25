import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

interface AddModuleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddModule: (module: any) => void;
}

const moduleIcons = [
  { value: "🏠", label: "Casa" },
  { value: "📋", label: "Lista" },
  { value: "💼", label: "Negocios" },
  { value: "🎓", label: "Educación" },
  { value: "🏥", label: "Salud" },
  { value: "📰", label: "Noticias" },
  { value: "📞", label: "Contacto" },
  { value: "⚙️", label: "Configuración" },
  { value: "🎯", label: "Objetivo" },
  { value: "🔧", label: "Herramientas" },
  { value: "📊", label: "Estadísticas" },
  { value: "🛒", label: "Tienda" },
  { value: "🎨", label: "Arte" },
  { value: "🌟", label: "Destacado" }
];

const AddModuleModal = ({ isOpen, onClose, onAddModule }: AddModuleModalProps) => {
  const [moduleName, setModuleName] = useState("");
  const [description, setDescription] = useState("");
  const [icon, setIcon] = useState("");
  const [pages, setPages] = useState("1");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!moduleName.trim() || !description.trim() || !icon) {
      toast({
        title: "Error",
        description: "Por favor completa todos los campos requeridos",
        variant: "destructive"
      });
      return;
    }

    const newModule = {
      id: Date.now(), // Simple ID generation
      name: moduleName.trim(),
      description: description.trim(),
      icon: icon,
      pages: parseInt(pages) || 1,
      isCustom: true
    };

    onAddModule(newModule);
    
    toast({
      title: "Módulo agregado",
      description: `El módulo "${moduleName}" se ha creado exitosamente`,
    });

    // Reset form
    setModuleName("");
    setDescription("");
    setIcon("");
    setPages("1");
    onClose();
  };

  const handleCancel = () => {
    setModuleName("");
    setDescription("");
    setIcon("");
    setPages("1");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleCancel}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Agregar Nuevo Módulo</DialogTitle>
          <DialogDescription>
            Crea un nuevo módulo personalizado para tu landing page
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nombre del Módulo *</Label>
            <Input
              id="name"
              value={moduleName}
              onChange={(e) => setModuleName(e.target.value)}
              placeholder="Ej: Eventos especiales"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Descripción *</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe brevemente el contenido de este módulo"
              rows={3}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="icon">Icono *</Label>
            <Select value={icon} onValueChange={setIcon} required>
              <SelectTrigger>
                <SelectValue placeholder="Selecciona un icono" />
              </SelectTrigger>
              <SelectContent>
                {moduleIcons.map((iconOption) => (
                  <SelectItem key={iconOption.value} value={iconOption.value}>
                    <div className="flex items-center space-x-2">
                      <span>{iconOption.value}</span>
                      <span>{iconOption.label}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="pages">Número de páginas</Label>
            <Input
              id="pages"
              type="number"
              min="1"
              max="50"
              value={pages}
              onChange={(e) => setPages(e.target.value)}
              placeholder="1"
            />
          </div>

          <DialogFooter className="flex-col sm:flex-row gap-2">
            <Button type="button" variant="outline" onClick={handleCancel}>
              Cancelar
            </Button>
            <Button type="submit" className="bg-primary hover:bg-primary-hover">
              Crear Módulo
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddModuleModal;