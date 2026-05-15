import { ArrowRight, Music } from "lucide-react";
import { Button } from "@/components/ui/button";

const CTASection = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-primary to-coral-dark relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 text-9xl">🎵</div>
        <div className="absolute bottom-10 right-10 text-8xl">🎶</div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center text-white">
          <Music className="h-16 w-16 mx-auto mb-6 opacity-90" />
          
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Prêt à commencer votre aventure musicale ?
          </h2>
          
          <p className="text-lg md:text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Inscrivez-vous maintenant et bénéficiez de votre première leçon gratuite. 
            Paiement sécurisé via Orange Money, Airtel Money ou MVola.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {/* <Link to="/register"> */}
              <Button 
                size="lg" 
                variant="secondary"
                className="gap-2 text-lg px-8 bg-white text-primary hover:bg-white/90"
              >
                S'inscrire gratuitement
                <ArrowRight className="h-5 w-5" />
              </Button>
            {/* </Link> */}
            {/* <Link to="/instruments"> */}
              <Button 
                size="lg" 
                variant="outline"
                className="gap-2 text-lg px-8 border-white text-white hover:bg-white/10"
              >
                Voir les cours
              </Button>
            {/* </Link> */}
          </div>

          <p className="mt-6 text-sm opacity-75">
            ✓ Première leçon gratuite &nbsp;•&nbsp; ✓ Annulation facile &nbsp;•&nbsp; ✓ Paiement sécurisé
          </p>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
