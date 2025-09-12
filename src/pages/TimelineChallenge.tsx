import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Shuffle, CheckCircle, Trophy, Clock } from "lucide-react";
import { toast } from "sonner";

interface CareerStep {
  club: string;
  year: string;
  country: string;
  matches: number;
  goals: number;
}

interface Player {
  id: number;
  name: string;
  photoUrl: string;
  career: CareerStep[];
}

interface DragItem {
  club: string;
  year: string;
  country: string;
  originalIndex: number;
}

const TimelineChallenge = () => {
  const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null);
  const [shuffledCareer, setShuffledCareer] = useState<DragItem[]>([]);
  const [userOrder, setUserOrder] = useState<DragItem[]>([]);
  const [isChecking, setIsChecking] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [draggedItem, setDraggedItem] = useState<DragItem | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

  useEffect(() => {
    loadNewChallenge();
  }, []);

  const loadNewChallenge = async () => {
    try {
      const response = await fetch('/players.json');
      const players: Player[] = await response.json();
      
      // Filter players with at least 3 career steps
      const playersWithCareer = players.filter(p => p.career && p.career.length >= 3);
      const randomPlayer = playersWithCareer[Math.floor(Math.random() * playersWithCareer.length)];
      
      setCurrentPlayer(randomPlayer);
      
      // Create shuffled career with original indices
      const careerWithIndices: DragItem[] = randomPlayer.career.map((step, index) => ({
        ...step,
        originalIndex: index
      }));
      
      // Shuffle the career steps
      const shuffled = [...careerWithIndices].sort(() => Math.random() - 0.5);
      setShuffledCareer(shuffled);
      setUserOrder([]);
      setShowResult(false);
      setIsChecking(false);
    } catch (error) {
      console.error('Error loading players:', error);
      toast.error("Kunde inte ladda speldata");
    }
  };

  const handleDragStart = (e: React.DragEvent, item: DragItem) => {
    setDraggedItem(item);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    setDragOverIndex(index);
  };

  const handleDragLeave = () => {
    setDragOverIndex(null);
  };

  const handleDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();
    setDragOverIndex(null);
    
    if (!draggedItem) return;

    const newUserOrder = [...userOrder];
    
    // Remove the item if it already exists in userOrder
    const existingIndex = newUserOrder.findIndex(item => item.originalIndex === draggedItem.originalIndex);
    if (existingIndex !== -1) {
      newUserOrder.splice(existingIndex, 1);
    }
    
    // Insert at the new position
    newUserOrder.splice(dropIndex, 0, draggedItem);
    
    setUserOrder(newUserOrder);
    setDraggedItem(null);
  };

  const handleRemoveFromTimeline = (itemToRemove: DragItem) => {
    setUserOrder(userOrder.filter(item => item.originalIndex !== itemToRemove.originalIndex));
  };

  const checkAnswer = () => {
    if (userOrder.length !== currentPlayer?.career.length) {
      toast.error("Du måste placera alla klubbar på tidslinjen!");
      return;
    }

    setIsChecking(true);
    
    setTimeout(() => {
      const isCorrect = userOrder.every((item, index) => item.originalIndex === index);
      
      if (isCorrect) {
        toast.success("Rätt! Bra jobbat! 🎉");
      } else {
        toast.error("Fel ordning, försök igen!");
      }
      
      setShowResult(true);
      setIsChecking(false);
    }, 1000);
  };

  const getAvailableItems = () => {
    return shuffledCareer.filter(item => 
      !userOrder.some(placedItem => placedItem.originalIndex === item.originalIndex)
    );
  };

  const isCorrectOrder = () => {
    return userOrder.every((item, index) => item.originalIndex === index);
  };

  if (!currentPlayer) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-field-cream to-background">
        <Header />
        <main className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <Clock className="h-12 w-12 mx-auto mb-4 text-football-green animate-spin" />
            <p className="text-lg">Laddar utmaning...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-field-cream to-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 text-football-green">Timeline Challenge</h1>
          <p className="text-lg text-muted-foreground mb-6">
            Dra och släpp klubbarna i rätt kronologisk ordning för {currentPlayer.name}
          </p>
          
          <Card className="max-w-md mx-auto mb-8">
            <CardHeader className="text-center pb-4">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full overflow-hidden bg-gradient-goal">
                <img 
                  src={currentPlayer.photoUrl} 
                  alt={currentPlayer.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = '/placeholder.svg';
                  }}
                />
              </div>
              <CardTitle className="text-2xl">{currentPlayer.name}</CardTitle>
            </CardHeader>
          </Card>
        </div>

        {/* Available Items */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4 text-center">Klubbar att placera:</h3>
          <div className="flex flex-wrap justify-center gap-3">
            {getAvailableItems().map((item) => (
              <div
                key={`available-${item.originalIndex}`}
                draggable
                onDragStart={(e) => handleDragStart(e, item)}
                className="bg-card p-3 rounded-lg border-2 border-dashed border-muted-foreground/30 cursor-move hover:border-football-green hover:bg-field-cream/50 transition-all duration-200 min-w-[120px] text-center"
              >
                <div className="font-semibold text-sm">{item.club}</div>
                <div className="text-xs text-muted-foreground">{item.country}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4 text-center">Tidslinje (tidigt → sent):</h3>
          
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-football-green" />
                <span className="text-sm text-muted-foreground">Tidig karriär</span>
              </div>
              <div className="flex-1 h-0.5 bg-football-green/30 mx-4"></div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Sen karriär</span>
                <Trophy className="h-5 w-5 text-goal-gold" />
              </div>
            </div>
            
            <div className="flex gap-4 justify-center flex-wrap">
              {Array.from({ length: currentPlayer.career.length }, (_, index) => (
                <div
                  key={`timeline-${index}`}
                  onDragOver={(e) => handleDragOver(e, index)}
                  onDragLeave={handleDragLeave}
                  onDrop={(e) => handleDrop(e, index)}
                  className={`
                    min-h-[100px] min-w-[120px] p-4 rounded-lg border-2 border-dashed 
                    flex flex-col items-center justify-center text-center transition-all duration-200
                    ${dragOverIndex === index 
                      ? 'border-football-green bg-football-green/10 scale-105' 
                      : 'border-muted-foreground/30 bg-muted/20'
                    }
                  `}
                >
                  <div className="text-sm font-semibold text-football-green mb-2">
                    #{index + 1}
                  </div>
                  {userOrder[index] ? (
                    <div 
                      className="bg-card p-2 rounded border cursor-pointer hover:bg-destructive/10 transition-colors"
                      onClick={() => handleRemoveFromTimeline(userOrder[index])}
                    >
                      <div className="font-semibold text-sm">{userOrder[index].club}</div>
                      <div className="text-xs text-muted-foreground">{userOrder[index].country}</div>
                    </div>
                  ) : (
                    <div className="text-xs text-muted-foreground">Släpp här</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 justify-center">
          <Button 
            onClick={checkAnswer}
            disabled={isChecking || userOrder.length !== currentPlayer.career.length}
            variant="field"
            size="lg"
          >
            {isChecking ? (
              <>
                <Clock className="h-4 w-4 mr-2 animate-spin" />
                Kollar...
              </>
            ) : (
              <>
                <CheckCircle className="h-4 w-4 mr-2" />
                Kolla Svar
              </>
            )}
          </Button>
          
          <Button 
            onClick={loadNewChallenge}
            variant="outline"
            size="lg"
          >
            <Shuffle className="h-4 w-4 mr-2" />
            Ny Utmaning
          </Button>
        </div>

        {/* Result Display */}
        {showResult && (
          <Card className="max-w-2xl mx-auto mt-8">
            <CardHeader>
              <CardTitle className="text-center">
                {isCorrectOrder() ? (
                  <span className="text-win-green">🎉 Rätt! Fantastiskt! 🎉</span>
                ) : (
                  <span className="text-lose-red">❌ Fel ordning</span>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <h4 className="font-semibold mb-4">Rätt ordning för {currentPlayer.name}:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {currentPlayer.career.map((step, index) => (
                    <div key={index} className="bg-muted/50 p-3 rounded-lg">
                      <div className="font-semibold text-sm">#{index + 1} {step.club}</div>
                      <div className="text-xs text-muted-foreground">{step.year} • {step.country}</div>
                      <div className="text-xs text-muted-foreground">
                        {step.matches} matcher, {step.goals} mål
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default TimelineChallenge;