import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Trophy, Target, HelpCircle } from "lucide-react";

const Header = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="bg-gradient-field border-b-4 border-goal-gold shadow-field">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="bg-goal-gold p-3 rounded-full shadow-goal group-hover:scale-110 transition-transform duration-300">
              <Trophy className="h-8 w-8 text-football-green-dark" />
            </div>
            <h1 className="text-3xl font-bold text-field-white tracking-tight">
              Football Fun Hub
            </h1>
          </Link>

          {/* Navigation */}
          <nav className="flex flex-wrap items-center gap-2">
            <Link to="/">
              <Button
                variant={isActive("/") ? "goal" : "field"}
                size="default"
                className="hover-goal"
              >
                Hem
              </Button>
            </Link>
            <Link to="/quiz">
              <Button
                variant={isActive("/quiz") ? "goal" : "field"}
                size="default"
                className="hover-goal"
              >
                <HelpCircle className="h-4 w-4" />
                Quiz
              </Button>
            </Link>
            <Link to="/guess-the-player">
              <Button
                variant={isActive("/guess-the-player") ? "goal" : "field"}
                size="default"
                className="hover-goal"
              >
                <Target className="h-4 w-4" />
                Gissa Spelaren
              </Button>
            </Link>
            <Link to="/who-am-i">
              <Button
                variant={isActive("/who-am-i") ? "goal" : "field"}
                size="default"
                className="hover-goal"
              >
                <HelpCircle className="h-4 w-4" />
                Vem är jag?
              </Button>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;