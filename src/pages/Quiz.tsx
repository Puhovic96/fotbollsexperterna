import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Trophy, RotateCcw, Play, CheckCircle, XCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Question {
  question: string;
  options: string[];
  answer: string;
}

interface QuizData {
  easy: Question[];
  medium: Question[];
  hard: Question[];
  expert: Question[];
}

const Quiz = () => {
  const [quizData, setQuizData] = useState<QuizData | null>(null);
  const [selectedLevel, setSelectedLevel] = useState<keyof QuizData | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [answered, setAnswered] = useState(false);
  const { toast } = useToast();

  const levelConfig = {
    easy: { name: "Lätt", color: "bg-win-green", questions: 10 },
    medium: { name: "Medium", color: "bg-goal-gold", questions: 15 },
    hard: { name: "Svår", color: "bg-football-green", questions: 20 },
    expert: { name: "Expert", color: "bg-lose-red", questions: 25 }
  };

  useEffect(() => {
    fetch('/questions.json')
      .then(response => response.json())
      .then(data => setQuizData(data))
      .catch(error => console.error('Error loading quiz data:', error));
  }, []);

  const startQuiz = (level: keyof QuizData) => {
    if (!quizData) return;
    
    const levelQuestions = [...quizData[level]];
    const shuffledQuestions = levelQuestions.sort(() => Math.random() - 0.5);
    const selectedQuestions = shuffledQuestions.slice(0, levelConfig[level].questions);
    
    setSelectedLevel(level);
    setQuestions(selectedQuestions);
    setCurrentQuestionIndex(0);
    setScore(0);
    setShowResult(false);
    setSelectedAnswer(null);
    setAnswered(false);
  };

  const handleAnswerSelect = (answer: string) => {
    if (answered) return;
    
    setSelectedAnswer(answer);
    setAnswered(true);
    
    const currentQuestion = questions[currentQuestionIndex];
    const isCorrect = answer === currentQuestion.answer;
    
    if (isCorrect) {
      setScore(prev => prev + 1);
      toast({
        title: "Rätt svar! 🎉",
        description: `${currentQuestion.answer} är korrekt!`,
        className: "border-win-green"
      });
    } else {
      toast({
        title: "Fel svar 😔",
        description: `Rätt svar var: ${currentQuestion.answer}`,
        variant: "destructive"
      });
    }

    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(prev => prev + 1);
        setSelectedAnswer(null);
        setAnswered(false);
      } else {
        setShowResult(true);
      }
    }, 2000);
  };

  const resetQuiz = () => {
    setSelectedLevel(null);
    setQuestions([]);
    setCurrentQuestionIndex(0);
    setScore(0);
    setShowResult(false);
    setSelectedAnswer(null);
    setAnswered(false);
  };

  const getScoreMessage = () => {
    const percentage = (score / questions.length) * 100;
    if (percentage >= 90) return { message: "Fantastiskt! Du är en fotbollsexpert! ⚽🏆", color: "text-win-green" };
    if (percentage >= 70) return { message: "Mycket bra! Du har stora fotbollskunskaper! 👏", color: "text-goal-gold" };
    if (percentage >= 50) return { message: "Bra jobbat! Du kan definitivt mer fotboll! ⚽", color: "text-football-green" };
    return { message: "Fortsätt träna! Fotboll är kul att lära sig! 📚", color: "text-lose-red" };
  };

  if (!quizData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-field-cream to-background">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-football-green mx-auto mb-4"></div>
            <p className="text-lg">Laddar quiz...</p>
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
          {!selectedLevel && (
            <>
              <div className="text-center mb-12">
                <h1 className="text-5xl font-bold mb-4">Fotbollsquiz</h1>
                <p className="text-xl text-muted-foreground mb-8">
                  Välj svårighetsgrad och testa dina fotbollskunskaper
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {Object.entries(levelConfig).map(([level, config]) => (
                  <Card key={level} className="group hover-goal cursor-pointer shadow-card-custom" onClick={() => startQuiz(level as keyof QuizData)}>
                    <CardHeader className="text-center">
                      <div className="bg-gradient-goal p-4 rounded-full w-16 h-16 mx-auto mb-4 shadow-goal">
                        <Trophy className="h-8 w-8 text-football-green-dark" />
                      </div>
                      <CardTitle className="text-2xl">{config.name}</CardTitle>
                      <CardDescription>{config.questions} frågor</CardDescription>
                    </CardHeader>
                    <CardContent className="text-center">
                      <Badge className={`${config.color} text-field-white mb-4 px-4 py-2`}>
                        {config.name}
                      </Badge>
                      <Button variant="field" size="lg" className="w-full">
                        <Play className="h-4 w-4" />
                        Starta
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </>
          )}

          {selectedLevel && !showResult && (
            <div className="max-w-3xl mx-auto">
              <div className="flex justify-between items-center mb-8">
                <Badge className={`${levelConfig[selectedLevel].color} text-field-white px-4 py-2 text-lg`}>
                  {levelConfig[selectedLevel].name}
                </Badge>
                <div className="text-right">
                  <p className="text-lg font-semibold">
                    Fråga {currentQuestionIndex + 1} av {questions.length}
                  </p>
                  <p className="text-muted-foreground">
                    Poäng: {score}/{currentQuestionIndex + (answered ? 1 : 0)}
                  </p>
                </div>
              </div>

              <Card className="shadow-card-custom mb-6">
                <CardHeader>
                  <CardTitle className="text-xl leading-relaxed">
                    {questions[currentQuestionIndex]?.question}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 gap-3">
                    {questions[currentQuestionIndex]?.options.map((option, index) => {
                      let buttonClass = "w-full text-left h-auto py-4 px-6 whitespace-normal";
                      
                      if (answered) {
                        if (option === questions[currentQuestionIndex].answer) {
                          buttonClass += " bg-win-green text-field-white";
                        } else if (option === selectedAnswer && selectedAnswer !== questions[currentQuestionIndex].answer) {
                          buttonClass += " bg-lose-red text-field-white";
                        } else {
                          buttonClass += " bg-muted text-muted-foreground";
                        }
                      } else {
                        buttonClass += " bg-card hover:bg-football-green hover:text-field-white transition-colors";
                      }

                      return (
                        <Button
                          key={index}
                          variant="outline"
                          className={buttonClass}
                          onClick={() => handleAnswerSelect(option)}
                          disabled={answered}
                        >
                          <div className="flex items-center gap-3">
                            {answered && option === questions[currentQuestionIndex].answer && (
                              <CheckCircle className="h-5 w-5" />
                            )}
                            {answered && option === selectedAnswer && selectedAnswer !== questions[currentQuestionIndex].answer && (
                              <XCircle className="h-5 w-5" />
                            )}
                            <span className="flex-1">{option}</span>
                          </div>
                        </Button>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>

              <div className="text-center">
                <Button variant="destructive" onClick={resetQuiz}>
                  <RotateCcw className="h-4 w-4" />
                  Avbryt Quiz
                </Button>
              </div>
            </div>
          )}

          {showResult && (
            <div className="max-w-2xl mx-auto text-center result-slide-up">
              <Card className="shadow-field">
                <CardHeader>
                  <div className="bg-gradient-goal p-6 rounded-full w-24 h-24 mx-auto mb-6 shadow-goal">
                    <Trophy className="h-12 w-12 text-football-green-dark" />
                  </div>
                  <CardTitle className="text-3xl mb-4">Quiz Avslutat!</CardTitle>
                  <CardDescription className="text-lg">
                    {levelConfig[selectedLevel!].name} nivå
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-8">
                    <p className="text-6xl font-bold mb-4 text-football-green">
                      {score}/{questions.length}
                    </p>
                    <p className="text-xl mb-4 text-muted-foreground">
                      {Math.round((score / questions.length) * 100)}% rätt
                    </p>
                    <p className={`text-lg font-semibold ${getScoreMessage().color}`}>
                      {getScoreMessage().message}
                    </p>
                  </div>

                  {/* Monetization Area */}
                  <div className="bg-muted/30 p-6 rounded-lg mb-6">
                    <h3 className="font-semibold mb-4 text-football-green">Visa ditt fotbollsintresse!</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <a 
                        href="#" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="block bg-goal-gold text-football-green-dark px-4 py-3 rounded font-medium hover:bg-goal-gold-light transition-colors"
                      >
                        🏆 Köp matchtröja →
                      </a>
                      <a 
                        href="#" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="block bg-football-green text-field-white px-4 py-3 rounded font-medium hover:bg-football-green-light transition-colors"
                      >
                        ⚽ Fotbollsskor →
                      </a>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button variant="hero" size="lg" onClick={() => startQuiz(selectedLevel!)}>
                      <RotateCcw className="h-4 w-4" />
                      Spela igen
                    </Button>
                    <Button variant="field" size="lg" onClick={resetQuiz}>
                      Välj ny nivå
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

export default Quiz;