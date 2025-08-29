import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Target, RotateCcw, Play, Trophy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface CareerStep {
  club: string;
  year: string;
  country: string;
}

interface Player {
  id: number;
  name: string;
  career: CareerStep[];
  photoUrl: string;
}

const GuessThePlayer = () => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null);
  const [revealedSteps, setRevealedSteps] = useState(0);
  const [guess, setGuess] = useState("");
  const [gameState, setGameState] = useState<'menu' | 'playing' | 'won' | 'lost'>('menu');
  const [score, setScore] = useState(0);
  const [gamesPlayed, setGamesPlayed] = useState(0);
  const { toast } = useToast();

  useEffect(() => {
    fetch('/players.json')
      .then(response => response.json())
      .then(data => setPlayers(data))
      .catch(error => console.error('Error loading player data:', error));
  }, []);

  const startNewGame = () => {
    if (players.length === 0) return;
    
    const randomPlayer = players[Math.floor(Math.random() * players.length)];
    setCurrentPlayer(randomPlayer);
    setRevealedSteps(1);
    setGuess("");
    setGameState('playing');
  };

  const handleGuess = () => {
    if (!currentPlayer || !guess.trim()) return;

    const playerName = currentPlayer.name.toLowerCase();
    const userGuess = guess.toLowerCase().trim();

    // Check various forms of the name
    const nameVariations = [
      playerName,
      playerName.split(' ')[0], // First name only
      playerName.split(' ').slice(-1)[0], // Last name only
      playerName.replace(/[àáâãäå]/g, 'a')
               .replace(/[èéêë]/g, 'e')
               .replace(/[ìíîï]/g, 'i')
               .replace(/[òóôõö]/g, 'o')
               .replace(/[ùúûü]/g, 'u')
               .replace(/[ç]/g, 'c')
               .replace(/[ñ]/g, 'n') // Handle accents
    ];

    if (nameVariations.some(variation => 
      variation.includes(userGuess) || userGuess.includes(variation)
    )) {
      setGameState('won');
      setScore(prev => prev + Math.max(1, currentPlayer.career.length - revealedSteps + 1));
      setGamesPlayed(prev => prev + 1);
      toast({
        title: "Rätt! 🎉",
        description: `Det var ${currentPlayer.name}!`,
        className: "border-win-green"
      });
    } else {
      if (revealedSteps < currentPlayer.career.length) {
        setRevealedSteps(prev => prev + 1);
        setGuess("");
        toast({
          title: "Fel svar 😔",
          description: "Försök igen med nästa ledtråd!",
          variant: "destructive"
        });
      } else {
        setGameState('lost');
        setGamesPlayed(prev => prev + 1);
        toast({
          title: "Spelet över 😞",
          description: `Det var ${currentPlayer.name}!`,
          variant: "destructive"
        });
      }
    }
  };

  const resetGame = () => {
    setCurrentPlayer(null);
    setRevealedSteps(0);
    setGuess("");
    setGameState('menu');
    setScore(0);
    setGamesPlayed(0);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && gameState === 'playing') {
      handleGuess();
    }
  };

  if (players.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-field-cream to-background">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-football-green mx-auto mb-4"></div>
            <p className="text-lg">Laddar spelardata...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-field-cream to-background">
      <Header />
      
      <main className="py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          
          {gameState === 'menu' && (
            <div className="text-center">
              <h1 className="text-5xl font-bold mb-4">Gissa Spelaren</h1>
              <p className="text-xl text-muted-foreground mb-8">
                Se spelarens karriär steg för steg och gissa vem det är
              </p>
              
              <Card className="max-w-md mx-auto shadow-card-custom hover-goal">
                <CardHeader className="text-center">
                  <div className="bg-gradient-goal p-6 rounded-full w-20 h-20 mx-auto mb-4 shadow-goal">
                    <Target className="h-8 w-8 text-football-green-dark" />
                  </div>
                  <CardTitle className="text-2xl">Börja Spelet</CardTitle>
                  <CardDescription>
                    Gissa spelaren baserat på karriärsteg
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="hero" size="lg" className="w-full goal-celebration" onClick={startNewGame}>
                    <Play className="h-5 w-5" />
                    Starta Spel
                  </Button>
                </CardContent>
              </Card>
            </div>
          )}

          {gameState === 'playing' && currentPlayer && (
            <div className="max-w-2xl mx-auto">
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h1 className="text-3xl font-bold">Gissa Spelaren</h1>
                  <p className="text-muted-foreground">Karriärsteg {revealedSteps} av {currentPlayer.career.length}</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-semibold text-football-green">Poäng: {score}</p>
                  <p className="text-sm text-muted-foreground">Spel: {gamesPlayed + 1}</p>
                </div>
              </div>

              <Card className="mb-6 shadow-card-custom">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5 text-goal-gold" />
                    Spelarens Karriär
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {currentPlayer.career.slice(0, revealedSteps).map((step, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                        <div>
                          <p className="font-semibold">{step.club}</p>
                          <p className="text-sm text-muted-foreground">{step.country}</p>
                        </div>
                        <Badge variant="outline">{step.year}</Badge>
                      </div>
                    ))}
                    {revealedSteps < currentPlayer.career.length && (
                      <div className="p-3 bg-muted/10 rounded-lg border-2 border-dashed border-muted text-center">
                        <p className="text-muted-foreground">Nästa klubb avslöjs vid fel svar...</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card className="mb-6 shadow-card-custom">
                <CardHeader>
                  <CardTitle>Din Gissning</CardTitle>
                  <CardDescription>
                    Skriv spelarens namn (för- eller efternamn räcker)
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-3">
                    <Input
                      value={guess}
                      onChange={(e) => setGuess(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Skriv spelarens namn..."
                      className="flex-1"
                    />
                    <Button onClick={handleGuess} variant="goal" disabled={!guess.trim()}>
                      Gissa
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <div className="text-center">
                <Button variant="destructive" onClick={resetGame}>
                  <RotateCcw className="h-4 w-4" />
                  Avbryt Spel
                </Button>
              </div>
            </div>
          )}

          {(gameState === 'won' || gameState === 'lost') && currentPlayer && (
            <div className="max-w-2xl mx-auto text-center result-slide-up">
              <Card className="shadow-field">
                <CardHeader>
                  <div className={`${gameState === 'won' ? 'bg-gradient-goal' : 'bg-lose-red'} p-6 rounded-full w-24 h-24 mx-auto mb-6 shadow-goal`}>
                    {gameState === 'won' ? (
                      <Trophy className="h-12 w-12 text-football-green-dark" />
                    ) : (
                      <Target className="h-12 w-12 text-field-white" />
                    )}
                  </div>
                  <CardTitle className="text-3xl mb-2">
                    {gameState === 'won' ? 'Rätt gissat! 🎉' : 'Spelet över 😔'}
                  </CardTitle>
                  <CardDescription className="text-lg">
                    Det var <span className="font-bold text-football-green">{currentPlayer.name}</span>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-6">
                    <p className="text-4xl font-bold mb-2 text-football-green">{score} poäng</p>
                    <p className="text-muted-foreground">
                      {gameState === 'won' 
                        ? `Gissade efter ${revealedSteps} av ${currentPlayer.career.length} ledtrådar`
                        : `Alla ${currentPlayer.career.length} ledtrådar visades`
                      }
                    </p>
                  </div>

                  {/* Player's full career */}
                  <div className="mb-6 text-left">
                    <h3 className="font-semibold mb-3 text-center">Fullständig karriär:</h3>
                    <div className="space-y-2 max-h-48 overflow-y-auto">
                      {currentPlayer.career.map((step, index) => (
                        <div key={index} className="flex items-center justify-between p-2 bg-muted/20 rounded text-sm">
                          <div>
                            <span className="font-medium">{step.club}</span>
                            <span className="text-muted-foreground ml-2">({step.country})</span>
                          </div>
                          <span className="text-muted-foreground">{step.year}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Monetization Area */}
                  <div className="bg-muted/30 p-6 rounded-lg mb-6">
                    <h3 className="font-semibold mb-4 text-football-green">Följ dina fotbollshjältar!</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <a 
                        href="#" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="block bg-goal-gold text-football-green-dark px-4 py-3 rounded font-medium hover:bg-goal-gold-light transition-colors text-center"
                      >
                        🏆 Köp matchtröja →
                      </a>
                      <a 
                        href="#" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="block bg-football-green text-field-white px-4 py-3 rounded font-medium hover:bg-football-green-light transition-colors text-center"
                      >
                        ⚽ Se matcher live →
                      </a>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button variant="hero" size="lg" onClick={startNewGame}>
                      <Play className="h-4 w-4" />
                      Nästa Spelare
                    </Button>
                    <Button variant="field" size="lg" onClick={resetGame}>
                      Tillbaka till meny
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default GuessThePlayer;