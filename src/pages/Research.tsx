import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Brain, Users, Zap, Target, Globe, Network } from "lucide-react";

const Research = () => {
  const researchAreas = [
    {
      title: "Human-Agent Teaming",
      icon: <Users className="w-8 h-8" />,
      gradient: "from-primary to-accent",
      topics: [
        {
          name: "Higher-Order Thinking Augmentation",
          icon: <Brain className="w-6 h-6" />,
          description: "Enhancing human cognitive capabilities through intelligent agent collaboration, focusing on complex problem-solving and creative thinking."
        },
        {
          name: "High-Stakes Decision-Making",
          icon: <Target className="w-6 h-6" />,
          description: "Developing frameworks for human-agent collaboration in critical scenarios where decisions have significant consequences."
        },
        {
          name: "High-Fidelity Interaction",
          icon: <Zap className="w-6 h-6" />,
          description: "Creating seamless, intuitive interfaces that enable natural and effective communication between humans and agents."
        }
      ]
    },
    {
      title: "Human-Agent Society",
      icon: <Globe className="w-8 h-8" />,
      gradient: "from-secondary to-primary",
      topics: [
        {
          name: "Societal Transformation",
          icon: <Network className="w-6 h-6" />,
          description: "Investigating how the integration of agents into human society reshapes social structures, norms, and relationships."
        },
        {
          name: "Impact Analysis",
          icon: <Globe className="w-6 h-6" />,
          description: "Analyzing the economic, cultural, and ethical implications of widespread agent adoption in everyday life."
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 font-['Outfit']">
              Our Research
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Pioneering the future of human-agent collaboration through innovative research
              that bridges technology and society
            </p>
          </div>

          {/* Research Areas */}
          <div className="space-y-16">
            {researchAreas.map((area, index) => (
              <div key={index} className="animate-fade-in" style={{ animationDelay: `${index * 0.2}s` }}>
                <Card className="p-8 md:p-12 border-2 hover:shadow-[var(--shadow-warm)] transition-all duration-300">
                  {/* Area Header */}
                  <div className="flex items-center gap-4 mb-8">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${area.gradient} flex items-center justify-center text-white`}>
                      {area.icon}
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold font-['Outfit']">
                      {area.title}
                    </h2>
                  </div>

                  {/* Topics */}
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {area.topics.map((topic, topicIndex) => (
                      <div
                        key={topicIndex}
                        className="group p-6 rounded-xl bg-muted/50 hover:bg-gradient-to-br hover:from-primary/5 hover:to-accent/5 border border-border hover:border-primary/30 transition-all duration-300"
                      >
                        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4 group-hover:scale-110 transition-transform">
                          {topic.icon}
                        </div>
                        <h3 className="text-lg font-semibold mb-3 font-['Outfit']">
                          {topic.name}
                        </h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {topic.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            ))}
          </div>

          {/* Call to Action */}
          <div className="mt-16 text-center">
            <Card className="p-8 bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20">
              <h3 className="text-2xl font-bold mb-4 font-['Outfit']">
                Interested in Collaboration?
              </h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                We're always looking for passionate researchers and partners who share our vision
                of creating a better human-agent society.
              </p>
              <a href="/contact" className="inline-block">
                <button className="px-8 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-all hover:shadow-[var(--shadow-warm)]">
                  Get in Touch
                </button>
              </a>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Research;
