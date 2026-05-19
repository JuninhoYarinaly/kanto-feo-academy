import { Play, Music, Users, Award } from "lucide-react";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <section id="home" className="relative min-h-[90vh] flex items-center overflow-hidden bg-linear-to-br from-cream via-background to-coral-light/20">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 text-8xl">🎵</div>
        <div className="absolute top-40 right-20 text-6xl">🎸</div>
        <div className="absolute bottom-40 left-1/4 text-7xl">🎹</div>
        <div className="absolute bottom-20 right-1/3 text-5xl">🥁</div>
      </div>

      <div className="container mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary text-sm font-medium">
              <Music className="h-4 w-4" />
              École de Musique en Ligne
            </div>

            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-charcoal leading-tight">
              Avelao hiteny ny{" "}
              <span className="text-primary">talentanao</span>
            </h1>

            <p className="text-lg text-muted-foreground max-w-lg mx-auto lg:mx-0">
              Apprenez la guitare, le piano, la batterie, le violon ou le chant 
              depuis chez vous. Des cours vidéo de qualité avec un suivi personnalisé.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              {/* <Link to="/register"> */}
                <Button size="lg" className="gap-2 bg-primary hover:bg-primary/90 text-lg px-8">
                  <Play className="h-5 w-5" />
                  Commencer maintenant
                </Button>
              {/* </Link> */}
                <Button size="lg" variant="outline" className="gap-2 text-lg px-8">
                  Découvrir les cours
                </Button>
            </div>

            <div className="flex flex-wrap gap-8 justify-center lg:justify-start pt-8">
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 text-3xl font-bold text-primary">
                  <Users className="h-6 w-6" />
                  500+
                </div>
                <p className="text-sm text-muted-foreground">Élèves inscrits</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 text-3xl font-bold text-primary">
                  <Music className="h-6 w-6" />
                  5
                </div>
                <p className="text-sm text-muted-foreground">Instruments</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 text-3xl font-bold text-primary">
                  <Award className="h-6 w-6" />
                  100+
                </div>
                <p className="text-sm text-muted-foreground">Leçons vidéo</p>
              </div>
            </div>
          </div>

          <div className="relative  w-[240px] sm:w-[320px] md:w-[450px] max-w-lg mx-auto">
            <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl ">
              <img 
                src="https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=600&h=700&fit=crop"
                alt="Musicien jouant de la guitare"
                className="w-full h-auto object-cover"
              />
            </div>
            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-72 h-72 bg-primary/20 rounded-full blur-3xl" />
            <div className="absolute -bottom-8 -left-8 w-64 h-64 bg-accent/20 rounded-full blur-3xl" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
