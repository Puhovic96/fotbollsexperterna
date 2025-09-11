import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { TrendingUp, TrendingDown, RotateCcw, Trophy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Question {
  id: number;
  question: string;
  correctAnswer: "Higher" | "Lower";
  actualStat: number;
  statType: string;
  player: string;
  season: string;
}

const HigherLower = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetch('/higher-lower-questions.json')
      .then(response => response.json())
      .then(data => {
        const shuffled = [...data].sort(() => Math.random() - 0.5);
        setQuestions(shuffled);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error loading questions:', error);
        setLoading(false);
      });
  }, []);

  const handleAnswer = (answer: "Higher" | "Lower") => {
    if (showAnswer) return;

    const currentQuestion = questions[currentQuestionIndex];
    const isCorrect = answer === currentQuestion.correctAnswer;
    
    setShowAnswer(true);

    if (isCorrect) {
      setScore(score + 1);
      setStreak(streak + 1);
      setBestStreak(Math.max(bestStreak, streak + 1));
      toast({
        title: "Rätt! 🎉",
        description: `${currentQuestion.player} hade ${currentQuestion.actualStat} ${currentQuestion.statType.toLowerCase()}`,
        duration: 3000,
      });
    } else {
      setStreak(0);
      toast({
        title: "Fel! 😔",
        description: `${currentQuestion.player} hade ${currentQuestion.actualStat} ${currentQuestion.statType.toLowerCase()}`,
        variant: "destructive",
        duration: 3000,
      });
    }

    setTimeout(() => {
      if (currentQuestionIndex >= questions.length - 1) {
        setGameOver(true);
      } else {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setShowAnswer(false);
      }
    }, 3000);
  };

  const resetGame = () => {
    const shuffled = [...questions].sort(() => Math.random() - 0.5);
    setQuestions(shuffled);
    setCurrentQuestionIndex(0);
    setScore(0);
    setGameOver(false);
    setShowAnswer(false);
    setStreak(0);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-field-cream to-background">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-football-green mx-auto"></div>
            <p className="mt-4 text-lg">Laddar frågor...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (gameOver) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-field-cream to-background">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <Card className="max-w-2xl mx-auto shadow-card-custom">
            <CardHeader className="text-center">
              <div className="bg-gradient-goal p-4 rounded-full w-20 h-20 mx-auto mb-4">
                <Trophy className="h-12 w-12 text-football-green-dark" />
              </div>
              <CardTitle className="text-3xl mb-2">Spelet Avslutat!</CardTitle>
              <CardDescription className="text-lg">
                Du svarade rätt på {score} av {questions.length} frågor
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gradient-field p-4 rounded-lg">
                  <div className="text-2xl font-bold text-field-white">{score}</div>
                  <div className="text-field-white/80 text-sm">Rätt svar</div>
                </div>
                <div className="bg-gradient-goal p-4 rounded-lg">
                  <div className="text-2xl font-bold text-football-green-dark">{bestStreak}</div>
                  <div className="text-football-green-dark/80 text-sm">Längsta streak</div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="text-lg font-semibold">
                  {score >= 20 ? "🏆 Mästare!" : 
                   score >= 15 ? "⭐ Mycket bra!" : 
                   score >= 10 ? "👍 Bra jobbat!" :
                   score >= 5 ? "📈 Inte illa!" : "🤔 Mer träning behövs!"}
                </div>
                
                <Button onClick={resetGame} className="w-full" size="lg">
                  <RotateCcw className="mr-2 h-5 w-5" />
                  Spela Igen
                </Button>
              </div>
            </CardContent>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-field-cream to-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Progress Header */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="flex justify-between items-center mb-4">
            <div className="text-sm text-muted-foreground">
              Fråga {currentQuestionIndex + 1} av {questions.length}
            </div>
            <div className="flex gap-4 text-sm">
              <span className="bg-win-green text-field-white px-3 py-1 rounded-full">
                Rätt: {score}
              </span>
              <span className="bg-goal-gold text-football-green-dark px-3 py-1 rounded-full">
                Streak: {streak}
              </span>
            </div>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className="bg-gradient-field h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Question Card */}
        <Card className="max-w-2xl mx-auto shadow-card-custom">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl mb-4">Higher or Lower?</CardTitle>
            <CardDescription className="text-lg leading-relaxed">
              {currentQuestion.question}
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {!showAnswer ? (
              <div className="grid grid-cols-2 gap-4">
                <Button
                  onClick={() => handleAnswer("Higher")}
                  className="h-20 text-lg font-semibold bg-win-green hover:bg-win-green/90 text-field-white"
                  disabled={showAnswer}
                >
                  <TrendingUp className="mr-2 h-6 w-6" />
                  Higher
                </Button>
                <Button
                  onClick={() => handleAnswer("Lower")}
                  className="h-20 text-lg font-semibold bg-lose-red hover:bg-lose-red/90 text-field-white"
                  disabled={showAnswer}
                >
                  <TrendingDown className="mr-2 h-6 w-6" />
                  Lower
                </Button>
              </div>
            ) : (
              <div className="text-center space-y-4">
                <div className={`text-6xl font-bold ${
                  showAnswer ? 'animate-pulse' : ''
                }`}>
                  {currentQuestion.actualStat}
                </div>
                <div className="text-lg text-muted-foreground">
                  {currentQuestion.statType} • {currentQuestion.season}
                </div>
                <div className="text-sm text-muted-foreground">
                  Nästa fråga kommer snart...
                </div>
              </div>
            )}

            {/* Player Info */}
            <div className="bg-field-cream p-4 rounded-lg text-center">
              <div className="font-semibold text-football-green-dark">
                {currentQuestion.player}
              </div>
              <div className="text-sm text-muted-foreground">
                {currentQuestion.season} • {currentQuestion.statType}
              </div>
            </div>
          </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
  );
};

export default HigherLower;