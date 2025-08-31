import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Target, HelpCircle, Trophy, Star, Users } from "lucide-react";
import heroImage from "@/assets/football-hero.jpg";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-field-cream to-background">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="relative overflow-hidden">
          <div 
            className="h-96 bg-cover bg-center field-pattern"
            style={{ backgroundImage: `url(${heroImage})` }}
          >
            <div className="absolute inset-0 bg-gradient-field/80 flex items-center justify-center">
              <div className="text-center text-field-white px-4">
                <h1 className="text-5xl md:text-7xl font-bold mb-4 tracking-tight">
                  Fotbollsexperterna
                </h1>
                <p className="text-xl md:text-2xl mb-8 text-field-white/90">
                  Testa dina fotbollskunskaper och ha kul!
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Games Section */}
        <section className="py-16 px-4">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">Våra Spel</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Välj mellan olika utmaningar och testa dina fotbollskunskaper på alla nivåer
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Quiz Card */}
              <Card className="group hover-goal shadow-card-custom">
                <CardHeader className="text-center pb-4">
                  <div className="bg-gradient-goal p-4 rounded-full w-16 h-16 mx-auto mb-4 shadow-goal">
                    <HelpCircle className="h-8 w-8 text-football-green-dark" />
                  </div>
                  <CardTitle className="text-2xl">Fotbollsquiz</CardTitle>
                  <CardDescription>
                    4 svårighetsnivåer med hundratals frågor
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <div className="mb-6">
                    <div className="flex justify-center gap-2 mb-4">
                      <span className="bg-win-green text-field-white px-3 py-1 rounded-full text-sm font-medium">Lätt</span>
                      <span className="bg-goal-gold text-football-green-dark px-3 py-1 rounded-full text-sm font-medium">Medium</span>
                      <span className="bg-football-green text-field-white px-3 py-1 rounded-full text-sm font-medium">Svår</span>
                      <span className="bg-lose-red text-field-white px-3 py-1 rounded-full text-sm font-medium">Expert</span>
                    </div>
                    <p className="text-muted-foreground text-sm">
                      Från grundläggande frågor till expertnivå
                    </p>
                  </div>
                  <Link to="/quiz">
                    <Button variant="field" className="w-full">
                      Starta Quiz
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              {/* Guess the Player Card */}
              <Card className="group hover-goal shadow-card-custom">
                <CardHeader className="text-center pb-4">
                  <div className="bg-gradient-goal p-4 rounded-full w-16 h-16 mx-auto mb-4 shadow-goal">
                    <Target className="h-8 w-8 text-football-green-dark" />
                  </div>
                  <CardTitle className="text-2xl">Gissa Spelaren</CardTitle>
                  <CardDescription>
                    Gissa spelare baserat på deras karriär
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <div className="mb-6">
                    <div className="flex justify-center items-center gap-2 mb-4">
                      <Users className="h-5 w-5 text-goal-gold" />
                      <span className="text-sm font-medium">Karriärspår</span>
                    </div>
                    <p className="text-muted-foreground text-sm">
                      Se spelarens klubbhistoria och gissa vem det är
                    </p>
                  </div>
                  <Link to="/guess-the-player">
                    <Button variant="field" className="w-full">
                      Spela Nu
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              {/* Who Am I Card */}
              <Card className="group hover-goal shadow-card-custom">
                <CardHeader className="text-center pb-4">
                  <div className="bg-gradient-goal p-4 rounded-full w-16 h-16 mx-auto mb-4 shadow-goal">
                    <Star className="h-8 w-8 text-football-green-dark" />
                  </div>
                  <CardTitle className="text-2xl">Vem är jag?</CardTitle>
                  <CardDescription>
                    Ledtrådsbaserat gissningsspel
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <div className="mb-6">
                    <div className="flex justify-center items-center gap-2 mb-4">
                      <HelpCircle className="h-5 w-5 text-goal-gold" />
                      <span className="text-sm font-medium">Ledtrådar</span>
                    </div>
                    <p className="text-muted-foreground text-sm">
                      Få ledtrådar och gissa spelaren för poäng
                    </p>
                  </div>
                  <Link to="/who-am-i">
                    <Button variant="field" className="w-full">
                      Börja Spelet
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="bg-gradient-field py-16 px-4">
          <div className="container mx-auto">
            <div className="text-center text-field-white">
              <h2 className="text-4xl font-bold mb-12">Varför välja Fotbollsexperterna?</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                <div className="text-center">
                  <div className="bg-goal-gold p-4 rounded-full w-16 h-16 mx-auto mb-4 shadow-goal">
                    <Trophy className="h-8 w-8 text-football-green-dark" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Hundratals Frågor</h3>
                  <p className="text-field-white/80">
                    Över 200 noggrant utvalda frågor från lätt till expert-nivå
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="bg-goal-gold p-4 rounded-full w-16 h-16 mx-auto mb-4 shadow-goal">
                    <Users className="h-8 w-8 text-football-green-dark" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Olika Spellägen</h3>
                  <p className="text-field-white/80">
                    Tre unika spel som testar olika aspekter av fotbollskunskap
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="bg-goal-gold p-4 rounded-full w-16 h-16 mx-auto mb-4 shadow-goal">
                    <Star className="h-8 w-8 text-football-green-dark" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Responsiv Design</h3>
                  <p className="text-field-white/80">
                    Spela på mobil, surfplatta eller dator - fungerar överallt
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