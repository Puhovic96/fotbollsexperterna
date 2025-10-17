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
    <header className="bg-card border-b border-border shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Menu Button */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon" className="hover-lift">
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
            <div className="bg-primary p-2 rounded-lg group-hover:scale-105 transition-transform duration-200">
              <Trophy className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-foreground tracking-tight">
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