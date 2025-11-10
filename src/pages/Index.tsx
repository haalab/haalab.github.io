import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Users, Brain, Globe, Sparkles } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-muted/30 to-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
                <Sparkles className="w-4 h-4" />
                Preparing for the Human-Agent Society
              </div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight font-['Outfit']">
                Human-Agent
                <span className="block bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
                  Ally Lab
                </span>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl">
                We're pioneering research that bridges humans and intelligent agents,
                creating a collaborative future where augmented thinking and seamless interaction
                transform how we work, decide, and live together.
              </p>
              <div className="text-sm text-muted-foreground/80 leading-relaxed max-w-2xl italic">
                <span className="font-medium">HAA (はぁ〜):</span> Our lab's name embodies the sense of relief and satisfaction — 
                like "はぁ〜〜〜、この商品があって本当によかった！" or "Haa~~, completing such research is wonderful!" — 
                that positive exclamation we feel when human-agent collaboration truly works.
              </div>
              <div className="flex flex-wrap gap-4">
                <a href="/research">
                  <Button className="bg-primary text-white hover:bg-primary/90 transition-all hover:shadow-[var(--shadow-warm)] px-8 py-6 text-lg">
                    Explore Research
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </a>
                <a href="/contact">
                  <Button variant="outline" className="border-2 border-primary text-primary hover:bg-primary/5 px-8 py-6 text-lg">
                    Join Us
                  </Button>
                </a>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-3xl bg-gradient-to-br from-primary/20 via-accent/20 to-secondary/20 backdrop-blur-sm border border-primary/20 overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=800&fit=crop')] bg-cover bg-center opacity-40"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white z-10">
                    <div className="text-6xl font-bold mb-4 font-['Outfit']">HAA</div>
                    <div className="text-xl">はぁ〜〜〜</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Research Areas Preview */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 font-['Outfit']">
              Our Research Focus
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Two interconnected research areas shaping the future of human-agent collaboration
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="p-8 hover:shadow-[var(--shadow-warm)] transition-all duration-300 group border-2">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform">
                <Users className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold mb-4 font-['Outfit']">
                Human-Agent Teaming
              </h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Exploring how intelligent agents can augment human cognitive capabilities
                in complex problem-solving, high-stakes decision-making, and collaborative tasks.
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-2">
                  <Brain className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Higher-Order Thinking Augmentation</span>
                </li>
                <li className="flex items-start gap-2">
                  <Brain className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-sm">High-Stakes Decision-Making</span>
                </li>
                <li className="flex items-start gap-2">
                  <Brain className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-sm">High-Fidelity Interaction Design</span>
                </li>
              </ul>
              <a href="/research" className="text-primary hover:underline font-medium inline-flex items-center gap-2">
                Learn more <ArrowRight className="w-4 h-4" />
              </a>
            </Card>

            <Card className="p-8 hover:shadow-[var(--shadow-warm)] transition-all duration-300 group border-2">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-secondary to-primary flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform">
                <Globe className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold mb-4 font-['Outfit']">
                Human-Agent Society
              </h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Investigating the transformative impact of integrating intelligent agents
                into human society and understanding the emerging social dynamics.
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-2">
                  <Globe className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Societal Transformation Analysis</span>
                </li>
                <li className="flex items-start gap-2">
                  <Globe className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Economic & Cultural Impact</span>
                </li>
                <li className="flex items-start gap-2">
                  <Globe className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Ethical Considerations</span>
                </li>
              </ul>
              <a href="/research" className="text-secondary hover:underline font-medium inline-flex items-center gap-2">
                Learn more <ArrowRight className="w-4 h-4" />
              </a>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-5xl">
          <Card className="p-12 bg-gradient-to-br from-primary/10 via-accent/10 to-secondary/10 border-2 border-primary/20 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 font-['Outfit']">
              Join Our Mission
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
              We're always looking for passionate researchers, collaborators, and partners
              who share our vision of creating a harmonious human-agent society.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="/people">
                <Button className="bg-primary text-white hover:bg-primary/90 transition-all hover:shadow-[var(--shadow-warm)] px-8 py-6 text-lg">
                  Meet the Team
                </Button>
              </a>
              <a href="/contact">
                <Button variant="outline" className="border-2 border-primary text-primary hover:bg-primary/5 px-8 py-6 text-lg">
                  Get in Touch
                </Button>
              </a>
            </div>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
