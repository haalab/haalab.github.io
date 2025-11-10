import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Mail, Linkedin, Globe } from "lucide-react";

const People = () => {
  const teamMembers = [
    {
      name: "Dr. Jane Smith",
      role: "Principal Investigator",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
      bio: "Leading expert in human-AI interaction with 15+ years of research experience.",
      email: "jane.smith@haalab.org",
      linkedin: "https://linkedin.com",
      website: "https://example.com"
    },
    {
      name: "Dr. John Doe",
      role: "Senior Researcher",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
      bio: "Specializes in high-stakes decision-making and cognitive augmentation.",
      email: "john.doe@haalab.org",
      linkedin: "https://linkedin.com"
    },
    {
      name: "Dr. Emily Chen",
      role: "Senior Researcher",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
      bio: "Expert in human-agent society and social transformation research.",
      email: "emily.chen@haalab.org",
      website: "https://example.com"
    },
    {
      name: "Alex Johnson",
      role: "PhD Candidate",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
      bio: "Researching high-fidelity interaction design for human-agent teams.",
      email: "alex.johnson@haalab.org"
    },
    {
      name: "Sarah Williams",
      role: "PhD Candidate",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop",
      bio: "Investigating ethical implications of agent integration in society.",
      email: "sarah.williams@haalab.org"
    },
    {
      name: "Michael Lee",
      role: "Research Assistant",
      image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop",
      bio: "Supporting research in cognitive augmentation and decision-making systems.",
      email: "michael.lee@haalab.org"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
      <Navigation />
      
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-7xl">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 font-['Outfit']">
              Our Team
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Meet the talented researchers and innovators driving forward the future of
              human-agent collaboration
            </p>
          </div>

          {/* Team Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <Card
                key={index}
                className="overflow-hidden hover:shadow-[var(--shadow-warm)] transition-all duration-300 group"
              >
                <div className="aspect-square overflow-hidden bg-muted">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-1 font-['Outfit']">
                    {member.name}
                  </h3>
                  <p className="text-sm text-primary font-medium mb-3">
                    {member.role}
                  </p>
                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                    {member.bio}
                  </p>
                  <div className="flex gap-3">
                    {member.email && (
                      <a
                        href={`mailto:${member.email}`}
                        className="w-9 h-9 rounded-lg bg-muted hover:bg-primary hover:text-white transition-all flex items-center justify-center"
                      >
                        <Mail className="w-4 h-4" />
                      </a>
                    )}
                    {member.linkedin && (
                      <a
                        href={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-9 h-9 rounded-lg bg-muted hover:bg-primary hover:text-white transition-all flex items-center justify-center"
                      >
                        <Linkedin className="w-4 h-4" />
                      </a>
                    )}
                    {member.website && (
                      <a
                        href={member.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-9 h-9 rounded-lg bg-muted hover:bg-primary hover:text-white transition-all flex items-center justify-center"
                      >
                        <Globe className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Join Us Section */}
          <div className="mt-20">
            <Card className="p-8 md:p-12 bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20 text-center">
              <h2 className="text-3xl font-bold mb-4 font-['Outfit']">
                Join Our Team
              </h2>
              <p className="text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
                We're always looking for self-motivated researchers, PhD candidates, and postdocs
                who want to shape the future of human-agent collaboration. Check out our
                open positions or reach out to discuss opportunities.
              </p>
              <a href="/contact" className="inline-block">
                <button className="px-8 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-all hover:shadow-[var(--shadow-warm)]">
                  View Open Positions
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

export default People;
