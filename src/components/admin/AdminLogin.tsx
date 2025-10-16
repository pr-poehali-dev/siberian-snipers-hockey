import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Icon from "@/components/ui/icon";

interface AdminLoginProps {
  password: string;
  setPassword: (password: string) => void;
  onLogin: () => void;
}

const AdminLogin: React.FC<AdminLoginProps> = ({ password, setPassword, onLogin }) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex items-center justify-center relative">
      <div className="fixed inset-0 pointer-events-none opacity-5 z-0">
        <img 
          src="https://cdn.poehali.dev/files/5eafa8e1-7cd4-4959-927d-702849e9a9e9.jpg" 
          alt="Логотип фон" 
          className="w-full h-full object-contain"
        />
      </div>

      <Card className="w-full max-w-md relative z-10">
        <CardHeader className="text-center">
          <img 
            src="https://cdn.poehali.dev/files/097edba3-4667-492c-8fdc-1be95663ce9e.png" 
            alt="Логотип" 
            className="w-32 h-32 mx-auto mb-4 object-contain"
          />
          <CardTitle className="text-3xl font-oswald">АДМИН-ПАНЕЛЬ</CardTitle>
          <p className="text-muted-foreground">Введите пароль для доступа</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Пароль</Label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && onLogin()}
              placeholder="Введите пароль"
            />
          </div>
          <Button onClick={onLogin} className="w-full font-oswald text-lg">
            <Icon name="LogIn" className="mr-2" size={20} />
            ВОЙТИ
          </Button>
          <Button onClick={() => navigate("/")} variant="outline" className="w-full font-oswald">
            <Icon name="ArrowLeft" className="mr-2" size={20} />
            НА ГЛАВНУЮ
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminLogin;
