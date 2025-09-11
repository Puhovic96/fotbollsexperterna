import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Trophy, Target, HelpCircle, Menu, Clock } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Header = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="bg-gradient-field border-b-4 border-goal-gold shadow-field">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between gap-4">
          {/* Menu Button */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="field" size="icon" className="hover-goal">
                <Menu className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-56">
              <DropdownMenuItem asChild>
                <Link to="/" className="flex items-center gap-2 w-full">
                  <Trophy className="h-4 w-4" />
                  Hem
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/quiz" className="flex items-center gap-2 w-full">
                  <HelpCircle className="h-4 w-4" />
                  Quiz
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/guess-the-player" className="flex items-center gap-2 w-full">
                  <Target className="h-4 w-4" />
                  Gissa Spelaren
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/who-am-i" className="flex items-center gap-2 w-full">
                  <HelpCircle className="h-4 w-4" />
                  Vem är jag?
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/pa-sparet" className="flex items-center gap-2 w-full">
                  <Target className="h-4 w-4" />
                  På Spåret
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/higher-lower" className="flex items-center gap-2 w-full">
                  <Trophy className="h-4 w-4" />
                  Higher or Lower
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/timeline-challenge" className="flex items-center gap-2 w-full">
                  <Clock className="h-4 w-4" />
                  Timeline Challenge
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Centered Logo */}
          <Link to="/" className="flex items-center gap-3 group absolute left-1/2 transform -translate-x-1/2">
            <div className="bg-goal-gold p-3 rounded-full shadow-goal group-hover:scale-110 transition-transform duration-300">
              <Trophy className="h-8 w-8 text-football-green-dark" />
            </div>
            <h1 className="text-3xl font-bold text-field-white tracking-tight">
              Fotbollsexperterna
            </h1>
          </Link>

          {/* Empty space for balance */}
          <div className="w-10"></div>
        </div>
      </div>
    </header>
  );
};

export default Header;