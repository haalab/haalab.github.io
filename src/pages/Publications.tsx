import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { FileText, ExternalLink } from "lucide-react";
import { useState } from "react";

const Publications = () => {
  const [filter, setFilter] = useState("all");

  const publications = [
    {
      year: 2024,
      title: "Higher-Order Thinking Augmentation through Human-Agent Collaboration",
      authors: "Smith, J., Doe, J., & Chen, E.",
      venue: "ACM CHI Conference on Human Factors in Computing Systems",
      category: "Higher-Order Thinking Augmentation",
      link: "#"
    },
    {
      year: 2024,
      title: "Designing High-Fidelity Interaction Patterns for Human-Agent Teams",
      authors: "Johnson, A., Smith, J., & Williams, S.",
      venue: "International Journal of Human-Computer Interaction",
      category: "High-Fidelity Interaction Design",
      link: "#"
    },
    {
      year: 2023,
      title: "The Social Impact of Agent Integration: A Framework for Analysis",
      authors: "Chen, E., Williams, S., & Smith, J.",
      venue: "Nature Human Behaviour",
      category: "Societal Transformation Analysis",
      link: "#"
    },
    {
      year: 2023,
      title: "Decision-Making in High-Stakes Scenarios: Human-Agent Collaboration Study",
      authors: "Doe, J., Lee, M., & Johnson, A.",
      venue: "AAAI Conference on Artificial Intelligence",
      category: "High-Stakes Decision-Making",
      link: "#"
    },
    {
      year: 2023,
      title: "Ethical Frameworks for Human-Agent Society Integration",
      authors: "Williams, S., Chen, E., & Smith, J.",
      venue: "Science Robotics",
      category: "Ethical Considerations",
      link: "#"
    },
    {
      year: 2022,
      title: "Economic and Cultural Shifts in Agent-Enhanced Workplaces",
      authors: "Johnson, A., & Smith, J.",
      venue: "Journal of Economic Perspectives",
      category: "Economic & Cultural Impact",
      link: "#"
    }
  ];

  const categories = [
    "Higher-Order Thinking Augmentation",
    "High-Stakes Decision-Making",
    "High-Fidelity Interaction Design",
    "Societal Transformation Analysis",
    "Economic & Cultural Impact",
    "Ethical Considerations"
  ];

  const filteredPublications = filter === "all" 
    ? publications 
    : publications.filter(pub => pub.category === filter);

  const groupedByYear = filteredPublications.reduce((acc, pub) => {
    if (!acc[pub.year]) acc[pub.year] = [];
    acc[pub.year].push(pub);
    return acc;
  }, {} as Record<number, typeof publications>);

  const years = Object.keys(groupedByYear).sort((a, b) => Number(b) - Number(a));

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
      <Navigation />
      
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-5xl">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 font-['Outfit']">
              Publications
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Our contributions to advancing human-agent collaboration research
            </p>
          </div>

          {/* Filter */}
          <div className="flex flex-wrap gap-2 justify-center mb-12">
            <button
              onClick={() => setFilter("all")}
              className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                filter === "all"
                  ? "bg-primary text-white shadow-[var(--shadow-warm)]"
                  : "bg-muted hover:bg-primary/10 text-foreground"
              }`}
            >
              All
            </button>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setFilter(category)}
                className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                  filter === category
                    ? "bg-primary text-white shadow-[var(--shadow-warm)]"
                    : "bg-muted hover:bg-primary/10 text-foreground"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Publications by Year */}
          <div className="space-y-12">
            {years.map((year) => (
              <div key={year}>
                <h2 className="text-3xl font-bold mb-6 font-['Outfit'] flex items-center gap-3">
                  <span className="w-12 h-1 bg-gradient-to-r from-primary to-accent rounded"></span>
                  {year}
                </h2>
                <div className="space-y-4">
                  {groupedByYear[Number(year)].map((pub, index) => (
                    <Card
                      key={index}
                      className="p-6 hover:shadow-[var(--shadow-warm)] transition-all duration-300 group"
                    >
                      <div className="flex gap-4">
                        <div className="flex-shrink-0">
                          <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                            <FileText className="w-6 h-6" />
                          </div>
                        </div>
                        <div className="flex-grow">
                          <h3 className="text-lg font-semibold mb-2 font-['Outfit'] group-hover:text-primary transition-colors">
                            {pub.title}
                          </h3>
                          <p className="text-sm text-muted-foreground mb-2">
                            {pub.authors}
                          </p>
                          <p className="text-sm font-medium text-foreground mb-3">
                            {pub.venue}
                          </p>
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-xs px-3 py-1 rounded-full bg-primary/10 text-primary">
                              {pub.category}
                            </span>
                            <a
                              href={pub.link}
                              className="text-sm text-primary hover:underline flex items-center gap-1"
                            >
                              View Paper <ExternalLink className="w-3 h-3" />
                            </a>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Publications;
