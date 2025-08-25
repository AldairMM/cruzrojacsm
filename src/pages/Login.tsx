import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple validation for demo
    if (email && password) {
      toast({
        title: "Acceso exitoso",
        description: "Bienvenido al gestor de contenido de Cruz Roja Mexicana",
      });
      navigate("/dashboard");
    } else {
      toast({
        title: "Error de acceso",
        description: "Por favor ingresa tu email y contraseña",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-primary">
      <Card className="w-full max-w-md mx-4 shadow-2xl">
        <CardHeader className="text-center pb-6">
          <div className="flex items-center justify-center mb-4">
            <div className="w-12 h-12 bg-primary rounded-sm flex items-center justify-center mr-3">
              <span className="text-white font-bold text-2xl">+</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">CRUZ ROJA</h1>
              <p className="text-sm text-muted-foreground">MEXICANA</p>
            </div>
          </div>
        </CardHeader>
        
        <CardContent>
          <div className="text-center mb-6">
            <h2 className="text-2xl font-semibold text-primary mb-2">Iniciar Sesión</h2>
            <p className="text-muted-foreground">Ingresa tus credenciales para acceder</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium text-primary">
                Email
              </Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
                  @
                </span>
                <Input
                  id="email"
                  type="email"
                  placeholder="tu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 h-12 border-border focus:ring-primary"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium text-primary">
                Contraseña
              </Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
                  🔒
                </span>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 h-12 border-border focus:ring-primary"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="remember"
                  checked={rememberMe}
                  onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                />
                <Label htmlFor="remember" className="text-sm text-muted-foreground">
                  Recordarme
                </Label>
              </div>
              <Button variant="link" className="text-primary p-0 h-auto">
                ¿Olvidaste tu contraseña?
              </Button>
            </div>

            <Button 
              type="submit" 
              className="w-full h-12 bg-primary hover:bg-primary-hover text-white font-medium"
            >
              Iniciar Sesión
            </Button>
          </form>

          <div className="text-center mt-6">
            <p className="text-muted-foreground">
              ¿No tienes una cuenta?{" "}
              <Button variant="link" className="text-primary p-0 h-auto">
                Regístrate aquí
              </Button>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;