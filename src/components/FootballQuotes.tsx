import { useState, useEffect } from "react";

const quotes = [
  {
    text: "Football is not just a matter of life and death, it's more important than that.",
    author: "Bill Shankly"
  },
  {
    text: "Some people believe football is a matter of life and death. I am very disappointed with that attitude. I can assure you it is much, much more important than that.",
    author: "Bill Shankly"
  },
  {
    text: "The ball is round, the game lasts ninety minutes, and everything else is just theory.",
    author: "Sepp Herberger"
  },
  {
    text: "I learned all about life with a ball at my feet.",
    author: "Ronaldinho"
  },
  {
    text: "Football is the most important of the least important things in life.",
    author: "Arrigo Sacchi"
  },
  {
    text: "I am not a perfectionist, but I like to feel that things are done well.",
    author: "Pep Guardiola"
  },
  {
    text: "Talent without working hard is nothing.",
    author: "Cristiano Ronaldo"
  },
  {
    text: "I don't have time for hobbies. At the end of the day, I treat my job as a hobby. It's something I love doing.",
    author: "David Beckham"
  },
  {
    text: "The more difficult the victory, the greater the happiness in winning.",
    author: "Pelé"
  },
  {
    text: "When people succeed, it is because of hard work. Luck has nothing to do with success.",
    author: "Diego Maradona"
  }
];

const FootballQuotes = () => {
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);
      
      setTimeout(() => {
        setCurrentQuoteIndex((prev) => (prev + 1) % quotes.length);
        setIsVisible(true);
      }, 500);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mt-8 max-w-3xl mx-auto px-4">
      <div
        className={`transition-opacity duration-500 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        <blockquote className="text-center">
          <p className="text-lg md:text-xl text-white/90 italic mb-3">
            "{quotes[currentQuoteIndex].text}"
          </p>
          <footer className="text-sm md:text-base text-white/70 font-medium">
            — {quotes[currentQuoteIndex].author}
          </footer>
        </blockquote>
      </div>
    </div>
  );
};

export default FootballQuotes;
