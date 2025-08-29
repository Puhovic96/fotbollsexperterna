import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4 text-football-green">404</h1>
        <p className="text-xl text-muted-foreground mb-4">Oops! Sidan hittades inte</p>
        <a 
          href="/" 
          className="inline-flex items-center justify-center bg-gradient-goal text-football-green-dark px-6 py-3 rounded-lg font-semibold hover:bg-goal-gold-light transition-colors"
        >
          Tillbaka till startsidan
        </a>
      </div>
    </div>
  );
};

export default NotFound;
