import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Target, HelpCircle, Trophy, Star, Users, Clock } from "lucide-react";
import heroImage from "@/assets/football-celebration-hero.jpg";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="relative bg-gradient-hero text-white">
          <div className="container mx-auto px-4 py-24">
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
                Fotbollsexperterna
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-white/90">
                Testa dina fotbollskunskaper med våra interaktiva spel
              </p>
              <div className="flex justify-center gap-4">
                <Link to="/quiz">
                  <Button size="lg" className="bg-white text-primary hover:bg-gray-100">
                    Börja spela
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Games Section */}
        <section className="py-20 px-4">
          <div className="container mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Våra Spel</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Välj mellan sex olika utmaningar och testa dina fotbollskunskaper
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {/* Quiz Card */}
              <Card className="card-pro p-6 text-center">
                <div className="bg-primary p-3 rounded-full w-12 h-12 mx-auto mb-4">
                  <HelpCircle className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-xl mb-2">Fotbollsquiz</CardTitle>
                <CardDescription className="mb-4">
                  4 svårighetsnivåer med hundratals frågor
                </CardDescription>
                <div className="flex justify-center gap-1 mb-4">
                  <span className="bg-accent-green text-white px-2 py-1 rounded text-xs">Lätt</span>
                  <span className="bg-accent-orange text-white px-2 py-1 rounded text-xs">Medium</span>
                  <span className="bg-primary text-white px-2 py-1 rounded text-xs">Svår</span>
                  <span className="bg-accent-red text-white px-2 py-1 rounded text-xs">Expert</span>
                </div>
                <Link to="/quiz">
                  <Button className="w-full">
                    Starta Quiz
                  </Button>
                </Link>
              </Card>

              {/* Guess the Player Card */}
              <Card className="card-pro p-6 text-center">
                <div className="bg-primary p-3 rounded-full w-12 h-12 mx-auto mb-4">
                  <Target className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-xl mb-2">Gissa Spelaren</CardTitle>
                <CardDescription className="mb-4">
                  Gissa spelare baserat på deras karriär
                </CardDescription>
                <div className="flex justify-center items-center gap-2 mb-4">
                  <Users className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium">Karriärspår</span>
                </div>
                <Link to="/guess-the-player">
                  <Button className="w-full">
                    Spela Nu
                  </Button>
                </Link>
              </Card>

              {/* Who Am I Card */}
              <Card className="card-pro p-6 text-center">
                <div className="bg-primary p-3 rounded-full w-12 h-12 mx-auto mb-4">
                  <Star className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-xl mb-2">Vem är jag?</CardTitle>
                <CardDescription className="mb-4">
                  Ledtrådsbaserat gissningsspel
                </CardDescription>
                <div className="flex justify-center items-center gap-2 mb-4">
                  <HelpCircle className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium">Ledtrådar</span>
                </div>
                <Link to="/who-am-i">
                  <Button className="w-full">
                    Börja Spelet
                  </Button>
                </Link>
              </Card>

              {/* På Spåret Card */}
              <Card className="card-pro p-6 text-center">
                <div className="bg-primary p-3 rounded-full w-12 h-12 mx-auto mb-4">
                  <Target className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-xl mb-2">På Spåret</CardTitle>
                <CardDescription className="mb-4">
                  Gissa spelare, lag eller arenor
                </CardDescription>
                <div className="flex justify-center gap-1 mb-4">
                  <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded text-xs">⚽ Spelare</span>
                  <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded text-xs">🏆 Lag</span>
                  <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded text-xs">🏟️ Arenor</span>
                </div>
                <Link to="/pa-sparet">
                  <Button className="w-full">
                    Spela På Spåret
                  </Button>
                </Link>
              </Card>

              {/* Higher or Lower Card */}
              <Card className="card-pro p-6 text-center">
                <div className="bg-primary p-3 rounded-full w-12 h-12 mx-auto mb-4">
                  <Trophy className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-xl mb-2">Higher or Lower</CardTitle>
                <CardDescription className="mb-4">
                  Gissa om statistiken är högre eller lägre
                </CardDescription>
                <div className="flex justify-center gap-1 mb-4">
                  <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded text-xs">📊 Stats</span>
                  <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded text-xs">🎯 Gissa</span>
                </div>
                <Link to="/higher-lower">
                  <Button className="w-full">
                    Spela Nu
                  </Button>
                </Link>
              </Card>

              {/* Timeline Challenge Card */}
              <Card className="card-pro p-6 text-center">
                <div className="bg-primary p-3 rounded-full w-12 h-12 mx-auto mb-4">
                  <Clock className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-xl mb-2">Timeline Challenge</CardTitle>
                <CardDescription className="mb-4">
                  Dra och släpp klubbar i rätt ordning
                </CardDescription>
                <div className="flex justify-center gap-1 mb-4">
                  <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded text-xs">🏃‍♂️ Drag</span>
                  <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded text-xs">📍 Drop</span>
                  <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded text-xs">⏰ Ordning</span>
                </div>
                <Link to="/timeline-challenge">
                  <Button className="w-full">
                    Spela Timeline
                  </Button>
                </Link>
              </Card>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="bg-gray-50 py-20 px-4">
          <div className="container mx-auto">
            <div className="text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Varför välja Fotbollsexperterna?</h2>
              <p className="text-lg text-muted-foreground mb-16 max-w-2xl mx-auto">
                Professionell plattform för fotbollskunskap och underhållning
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                <div className="text-center">
                  <div className="bg-primary p-4 rounded-full w-16 h-16 mx-auto mb-6">
                    <Trophy className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Hundratals Frågor</h3>
                  <p className="text-muted-foreground">
                    Över 200 noggrant utvalda frågor från lätt till expert-nivå
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="bg-primary p-4 rounded-full w-16 h-16 mx-auto mb-6">
                    <Users className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Sex Olika Spel</h3>
                  <p className="text-muted-foreground">
                    Unika spellägen som testar olika aspekter av fotbollskunskap
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="bg-primary p-4 rounded-full w-16 h-16 mx-auto mb-6">
                    <Star className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Responsiv Design</h3>
                  <p className="text-muted-foreground">
                    Optimerad för alla enheter - mobil, surfplatta och dator
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;