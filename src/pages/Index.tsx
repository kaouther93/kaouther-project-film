import { Button } from "@/components/ui/button";
import { ArrowRight, Code, Sparkles } from "lucide-react";
import heroBackground from "@/assets/hero-bg.jpg";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-subtle relative overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-10"
        style={{ backgroundImage: `url(${heroBackground})` }}
      />
      
      {/* Decorative Elements */}
      <div className="absolute top-20 left-20 w-2 h-2 bg-primary rounded-full animate-pulse opacity-60" />
      <div className="absolute top-40 right-32 w-1 h-1 bg-accent rounded-full animate-pulse opacity-40" />
      <div className="absolute bottom-32 left-40 w-1.5 h-1.5 bg-primary-glow rounded-full animate-pulse opacity-50" />
      
      {/* Hero Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4">
        <div className="text-center max-w-4xl mx-auto">
          {/* Icon */}
          <div className="mb-8 flex justify-center">
            <div className="relative">
              <div className="w-16 h-16 bg-gradient-hero rounded-full flex items-center justify-center shadow-elegant animate-glow">
                <Code className="w-8 h-8 text-primary-foreground" />
              </div>
              <Sparkles className="w-4 h-4 text-accent absolute -top-1 -right-1 animate-pulse" />
            </div>
          </div>
          
          {/* Main Title */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-hero bg-clip-text text-transparent animate-fade-in">
            Kaouther Aguerbaoui
          </h1>
          
          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-muted-foreground mb-12 animate-fade-in font-light leading-relaxed">
            Développeur frontend passionné par les technologies modernes
          </p>
          
          {/* CTA Button */}
          <div className="animate-scale-in">
            <Button variant="hero" size="lg" className="text-lg px-8 py-6 rounded-full">
              Voir mes projets
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
          
          {/* Decorative Line */}
          <div className="mt-16 flex justify-center">
            <div className="w-32 h-px bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
