import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Star, RotateCcw, Play, Trophy, Eye, EyeOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Player {
  id: number;
  name: string;
  clues: string[];
  maxPoints: number;
  photoUrl: string;
}

const WhoAmI = () => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null);
  const [revealedClues, setRevealedClues] = useState(0);
  const [guess, setGuess] = useState("");
  const [gameState, setGameState] = useState<'menu' | 'playing' | 'won' | 'lost'>('menu');
  const [currentScore, setCurrentScore] = useState(0);
  const [totalScore, setTotalScore] = useState(0);
  const [gamesPlayed, setGamesPlayed] = useState(0);
  const { toast } = useToast();

  useEffect(() => {
    fetch('/whoami.json')
      .then(response => response.json())
      .then(data => setPlayers(data))
      .catch(error => console.error('Error loading who am i data:', error));
  }, []);

  const startNewGame = () => {
    if (players.length === 0) return;
    
    const randomPlayer = players[Math.floor(Math.random() * players.length)];
    setCurrentPlayer(randomPlayer);
    setRevealedClues(1);
    setGuess("");
    setGameState('playing');
    setCurrentScore(randomPlayer.maxPoints);
  };

  const revealNextClue = () => {
    if (!currentPlayer || revealedClues >= currentPlayer.clues.length) return;
    
    setRevealedClues(prev => prev + 1);
    // Reduce points for each clue revealed
    const pointReduction = Math.floor(currentPlayer.maxPoints / currentPlayer.clues.length);
    setCurrentScore(prev => Math.max(5, prev - pointReduction));
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
      setTotalScore(prev => prev + currentScore);
      setGamesPlayed(prev => prev + 1);
      toast({
        title: "Rätt! 🎉",
        description: `Det var ${currentPlayer.name}! Du fick ${currentScore} poäng!`,
        className: "border-win-green"
      });
    } else {
      toast({
        title: "Fel svar 😔",
        description: "Försök igen eller ta nästa ledtråd!",
        variant: "destructive"
      });
      setGuess("");
    }
  };

  const giveUp = () => {
    if (!currentPlayer) return;
    setGameState('lost');
    setGamesPlayed(prev => prev + 1);
    toast({
      title: "Spelet över 😞",
      description: `Det var ${currentPlayer.name}!`,
      variant: "destructive"
    });
  };

  const resetGame = () => {
    setCurrentPlayer(null);
    setRevealedClues(0);
    setGuess("");
    setGameState('menu');
    setCurrentScore(0);
    setTotalScore(0);
    setGamesPlayed(0);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && gameState === 'playing') {
      handleGuess();
    }
  };

  const getScoreColor = () => {
    if (!currentPlayer) return "text-football-green";
    const percentage = (currentScore / currentPlayer.maxPoints) * 100;
    if (percentage >= 80) return "text-win-green";
    if (percentage >= 60) return "text-goal-gold";
    if (percentage >= 40) return "text-football-green";
    return "text-lose-red";
  };

  if (players.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-field-cream to-background">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-football-green mx-auto mb-4"></div>
            <p className="text-lg">Laddar speldata...</p>
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
              <h1 className="text-5xl font-bold mb-4">Vem är jag?</h1>
              <p className="text-xl text-muted-foreground mb-8">
                Få ledtrådar och gissa spelaren för att få poäng
              </p>
              
              <Card className="max-w-md mx-auto shadow-card-custom hover-goal">
                <CardHeader className="text-center">
                  <div className="bg-gradient-goal p-6 rounded-full w-20 h-20 mx-auto mb-4 shadow-goal">
                    <Star className="h-8 w-8 text-football-green-dark" />
                  </div>
                  <CardTitle className="text-2xl">Börja Spelet</CardTitle>
                  <CardDescription>
                    Ju färre ledtrådar, desto fler poäng!
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-6 text-left">
                    <h4 className="font-semibold mb-2">Så fungerar det:</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Få ledtrådar en i taget</li>
                      <li>• Gissa när som helst för poäng</li>
                      <li>• Ju tidigare, desto fler poäng</li>
                      <li>• Maximalt 70 poäng per spelare</li>
                    </ul>
                  </div>
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
                  <h1 className="text-3xl font-bold">Vem är jag?</h1>
                  <p className="text-muted-foreground">
                    Ledtråd {revealedClues} av {currentPlayer.clues.length}
                  </p>
                </div>
                <div className="text-right">
                  <p className={`text-2xl font-bold ${getScoreColor()}`}>{currentScore}p</p>
                  <p className="text-sm text-muted-foreground">
                    Total: {totalScore}p | Spel: {gamesPlayed + 1}
                  </p>
                </div>
              </div>

              <Card className="mb-6 shadow-card-custom">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Star className="h-5 w-5 text-goal-gold" />
                    Ledtrådar
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {currentPlayer.clues.slice(0, revealedClues).map((clue, index) => (
                      <div key={index} className="p-4 bg-muted/30 rounded-lg border-l-4 border-goal-gold">
                        <div className="flex items-start gap-3">
                          <Badge variant="outline" className="mt-1">
                            {index + 1}
                          </Badge>
                          <p className="flex-1">{clue}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {revealedClues < currentPlayer.clues.length && (
                    <div className="mt-4 text-center">
                      <Button 
                        variant="outline" 
                        onClick={revealNextClue}
                        className="hover:bg-football-green hover:text-field-white"
                      >
                        <Eye className="h-4 w-4" />
                        Nästa ledtråd (färre poäng)
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card className="mb-6 shadow-card-custom">
                <CardHeader>
                  <CardTitle>Din Gissning</CardTitle>
                  <CardDescription>
                    Gissa när som helst för att få poäng
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

              <div className="flex justify-center gap-4">
                <Button variant="destructive" onClick={giveUp}>
                  <EyeOff className="h-4 w-4" />
                  Ge upp
                </Button>
                <Button variant="outline" onClick={resetGame}>
                  <RotateCcw className="h-4 w-4" />
                  Avbryt
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
                      <Star className="h-12 w-12 text-field-white" />
                    )}
                  </div>
                  <CardTitle className="text-3xl mb-2">
                    {gameState === 'won' ? 'Rätt gissat! 🎉' : 'Bättre lycka nästa gång! 😔'}
                  </CardTitle>
                  <CardDescription className="text-lg">
                    Det var <span className="font-bold text-football-green">{currentPlayer.name}</span>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-6">
                    {gameState === 'won' && (
                      <p className="text-4xl font-bold mb-2 text-goal-gold">+{currentScore} poäng</p>
                    )}
                    <p className="text-2xl font-bold mb-2 text-football-green">
                      Total: {totalScore} poäng
                    </p>
                    <p className="text-muted-foreground">
                      {gameState === 'won' 
                        ? `Gissade efter ${revealedClues} av ${currentPlayer.clues.length} ledtrådar`
                        : `Alla ${currentPlayer.clues.length} ledtrådar behövdes`
                      }
                    </p>
                  </div>

                  {/* Show all clues */}
                  <div className="mb-6 text-left">
                    <h3 className="font-semibold mb-3 text-center">Alla ledtrådar om {currentPlayer.name}:</h3>
                    <div className="space-y-2 max-h-48 overflow-y-auto">
                      {currentPlayer.clues.map((clue, index) => (
                        <div key={index} className="p-3 bg-muted/20 rounded text-sm">
                          <div className="flex items-start gap-2">
                            <Badge variant="outline" className="text-xs">
                              {index + 1}
                            </Badge>
                            <span className="flex-1">{clue}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Monetization Area */}
                  <div className="bg-muted/30 p-6 rounded-lg mb-6">
                    <h3 className="font-semibold mb-4 text-football-green">Lär dig mer om fotbollslegenderna!</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <a 
                        href="#" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="block bg-goal-gold text-football-green-dark px-4 py-3 rounded font-medium hover:bg-goal-gold-light transition-colors text-center"
                      >
                        📚 Fotbollsböcker →
                      </a>
                      <a 
                        href="#" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="block bg-football-green text-field-white px-4 py-3 rounded font-medium hover:bg-football-green-light transition-colors text-center"
                      >
                        🎬 Dokumentärer →
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

export default WhoAmI;