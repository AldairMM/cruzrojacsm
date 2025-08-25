import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Plus, Search, Edit, Trash2, UserPlus, Mail, Shield, Users } from "lucide-react";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
  lastLogin: string;
  level: string;
  state?: string;
}

const mockUsers: User[] = [
  {
    id: 1,
    name: "Ana García Rodríguez",
    email: "ana.garcia@cruzrojamexicana.org",
    role: "Administrador",
    status: "Activo",
    lastLogin: "2024-01-15",
    level: "Nacional"
  },
  {
    id: 2,
    name: "Carlos Mendoza",
    email: "carlos.mendoza@cruzroja-jalisco.org",
    level: "Estatal",
    state: "Jalisco",
    role: "Editor",
    status: "Activo",
    lastLogin: "2024-01-14"
  },
  {
    id: 3,
    name: "María López",
    email: "maria.lopez@cruzroja-cdmx.org",
    level: "Estatal",
    state: "Ciudad de México",
    role: "Editor",
    status: "Inactivo",
    lastLogin: "2024-01-10"
  },
  {
    id: 4,
    name: "Roberto Silva",
    email: "roberto.silva@cruzrojamexicana.org",
    role: "Supervisor",
    status: "Activo",
    lastLogin: "2024-01-15",
    level: "Nacional"
  }
];

const UserManagement = () => {
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    role: "",
    level: "",
    state: ""
  });
  
  const navigate = useNavigate();
  const { toast } = useToast();

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddUser = () => {
    if (!newUser.name || !newUser.email || !newUser.role || !newUser.level) {
      toast({
        title: "Error",
        description: "Por favor completa todos los campos requeridos",
        variant: "destructive"
      });
      return;
    }

    const user: User = {
      id: Date.now(),
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      status: "Activo",
      lastLogin: "Nunca",
      level: newUser.level,
      state: newUser.level === "Estatal" ? newUser.state : undefined
    };

    setUsers([...users, user]);
    setNewUser({ name: "", email: "", role: "", level: "", state: "" });
    setIsAddUserOpen(false);
    
    toast({
      title: "Usuario agregado",
      description: `${user.name} ha sido agregado exitosamente`,
    });
  };

  const handleDeleteUser = (userId: number) => {
    setUsers(users.filter(user => user.id !== userId));
    toast({
      title: "Usuario eliminado",
      description: "El usuario ha sido eliminado del sistema",
    });
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case "Administrador":
        return "bg-red-100 text-red-800";
      case "Supervisor":
        return "bg-orange-100 text-orange-800";
      case "Editor":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusBadgeColor = (status: string) => {
    return status === "Activo" 
      ? "bg-green-100 text-green-800" 
      : "bg-red-100 text-red-800";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Button 
                onClick={() => navigate("/dashboard")}
                variant="ghost" 
                size="sm"
                className="flex items-center space-x-2"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Volver al Dashboard</span>
              </Button>
              <div className="flex items-center">
                <div className="w-8 h-8 bg-primary rounded-sm flex items-center justify-center mr-3">
                  <Users className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h1 className="font-bold text-foreground">Gestión de Usuarios</h1>
                  <p className="text-xs text-muted-foreground">Cruz Roja Mexicana</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Users className="w-8 h-8 text-primary" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-muted-foreground">Total Usuarios</p>
                  <p className="text-2xl font-bold text-foreground">{users.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Shield className="w-8 h-8 text-primary" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-muted-foreground">Administradores</p>
                  <p className="text-2xl font-bold text-foreground">
                    {users.filter(u => u.role === "Administrador").length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Edit className="w-8 h-8 text-primary" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-muted-foreground">Editores</p>
                  <p className="text-2xl font-bold text-foreground">
                    {users.filter(u => u.role === "Editor").length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <UserPlus className="w-8 h-8 text-green-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-muted-foreground">Activos</p>
                  <p className="text-2xl font-bold text-foreground">
                    {users.filter(u => u.status === "Activo").length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle>Usuarios del Sistema</CardTitle>
                <CardDescription>
                  Administra los usuarios que tienen acceso al gestor de contenido
                </CardDescription>
              </div>
              <Dialog open={isAddUserOpen} onOpenChange={setIsAddUserOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-primary hover:bg-primary-hover">
                    <Plus className="w-4 h-4 mr-2" />
                    Agregar Usuario
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Agregar Nuevo Usuario</DialogTitle>
                    <DialogDescription>
                      Completa la información del nuevo usuario
                    </DialogDescription>
                  </DialogHeader>
                  
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nombre completo *</Label>
                      <Input
                        id="name"
                        value={newUser.name}
                        onChange={(e) => setNewUser({...newUser, name: e.target.value})}
                        placeholder="Ej: Juan Pérez González"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={newUser.email}
                        onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                        placeholder="juan.perez@cruzrojamexicana.org"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="role">Rol *</Label>
                      <Select value={newUser.role} onValueChange={(value) => setNewUser({...newUser, role: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecciona un rol" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Administrador">Administrador</SelectItem>
                          <SelectItem value="Supervisor">Supervisor</SelectItem>
                          <SelectItem value="Editor">Editor</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="level">Nivel *</Label>
                      <Select value={newUser.level} onValueChange={(value) => setNewUser({...newUser, level: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecciona el nivel" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Nacional">Nacional</SelectItem>
                          <SelectItem value="Estatal">Estatal</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                     {newUser.level === "Estatal" && (
                       <div className="space-y-2">
                         <Label htmlFor="state">Estado *</Label>
                         <Select value={newUser.state} onValueChange={(value) => setNewUser({...newUser, state: value})}>
                           <SelectTrigger>
                             <SelectValue placeholder="Selecciona el estado" />
                           </SelectTrigger>
                           <SelectContent>
                             <SelectItem value="Jalisco">Jalisco</SelectItem>
                             <SelectItem value="Ciudad de México">Ciudad de México</SelectItem>
                             <SelectItem value="Nuevo León">Nuevo León</SelectItem>
                             <SelectItem value="Puebla">Puebla</SelectItem>
                           </SelectContent>
                         </Select>
                       </div>
                     )}
                  </div>
                  
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsAddUserOpen(false)}>
                      Cancelar
                    </Button>
                    <Button onClick={handleAddUser} className="bg-primary hover:bg-primary-hover">
                      Crear Usuario
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </CardHeader>
          
          <CardContent>
            {/* Search */}
            <div className="flex items-center space-x-2 mb-6">
              <Search className="w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por nombre, email o rol..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="max-w-sm"
              />
            </div>

            {/* Users Table */}
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Usuario</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Rol</TableHead>
                  <TableHead>Nivel</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead>Último acceso</TableHead>
                  <TableHead>Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                          <span className="text-sm font-semibold text-primary">
                            {user.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium">{user.name}</p>
                          <p className="text-sm text-muted-foreground">{user.level}{user.state ? ` - ${user.state}` : ''}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Mail className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm">{user.email}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getRoleBadgeColor(user.role)}>
                        {user.role}
                      </Badge>
                    </TableCell>
                    <TableCell>{user.level}</TableCell>
                    <TableCell>
                      <Badge className={getStatusBadgeColor(user.status)}>
                        {user.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {user.lastLogin}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleDeleteUser(user.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UserManagement;