import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-background to-muted/30">
      <div className="text-center px-4">
        <h1 className="mb-4 text-8xl font-bold text-primary font-['Outfit']">404</h1>
        <p className="mb-8 text-2xl text-muted-foreground">Oops! Page not found</p>
        <a href="/">
          <Button className="bg-primary text-white hover:bg-primary/90 transition-all hover:shadow-[var(--shadow-warm)]">
            <Home className="w-4 h-4 mr-2" />
            Return to Home
          </Button>
        </a>
      </div>
    </div>
  );
};

export default NotFound;
