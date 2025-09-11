import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Quiz from "./pages/Quiz";
import GuessThePlayer from "./pages/GuessThePlayer";
import WhoAmI from "./pages/WhoAmI";
import PaSparet from "./pages/PaSparet";
import HigherLower from "./pages/HigherLower";
import TimelineChallenge from "./pages/TimelineChallenge";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/guess-the-player" element={<GuessThePlayer />} />
          <Route path="/who-am-i" element={<WhoAmI />} />
          <Route path="/pa-sparet" element={<PaSparet />} />
          <Route path="/higher-lower" element={<HigherLower />} />
          <Route path="/timeline-challenge" element={<TimelineChallenge />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
