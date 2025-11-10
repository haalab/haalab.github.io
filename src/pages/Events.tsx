import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Calendar, MapPin, Clock, Users } from "lucide-react";

const Events = () => {
  const upcomingEvents = [
    {
      date: "March 15, 2024",
      time: "14:00 - 16:00",
      title: "HAA Lab Open House",
      location: "Lab Building, Room 301",
      description: "Join us for an open house to learn about our research and meet the team. Refreshments will be provided.",
      type: "open-house"
    },
    {
      date: "March 28, 2024",
      time: "10:00 - 11:30",
      title: "Seminar: Future of Human-Agent Collaboration",
      location: "Virtual Event",
      description: "Guest speaker Dr. Maria Garcia will discuss emerging trends in human-agent teaming.",
      type: "seminar"
    },
    {
      date: "April 12, 2024",
      time: "09:00 - 17:00",
      title: "Annual Research Symposium",
      location: "University Conference Center",
      description: "Our annual symposium featuring presentations from lab members and invited speakers.",
      type: "conference"
    }
  ];

  const pastEvents = [
    {
      date: "January 20, 2024",
      title: "Workshop: Designing High-Fidelity Interactions",
      location: "Lab Building",
      type: "workshop"
    },
    {
      date: "December 8, 2023",
      title: "Research Showcase 2023",
      location: "University Auditorium",
      type: "showcase"
    },
    {
      date: "November 15, 2023",
      title: "Guest Lecture: Ethics in AI Systems",
      location: "Virtual Event",
      type: "lecture"
    }
  ];

  const getEventTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      "open-house": "bg-accent/20 text-primary",
      "seminar": "bg-secondary/20 text-secondary",
      "conference": "bg-primary/20 text-primary",
      "workshop": "bg-accent/20 text-primary",
      "showcase": "bg-secondary/20 text-secondary",
      "lecture": "bg-primary/20 text-primary"
    };
    return colors[type] || "bg-muted text-foreground";
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
      <Navigation />
      
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-5xl">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 font-['Outfit']">
              Events
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Join us for seminars, workshops, and collaborative discussions about the future
              of human-agent collaboration
            </p>
          </div>

          {/* Upcoming Events */}
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-8">
              <Calendar className="w-8 h-8 text-primary" />
              <h2 className="text-3xl font-bold font-['Outfit']">Upcoming Events</h2>
            </div>
            <div className="space-y-6">
              {upcomingEvents.map((event, index) => (
                <Card
                  key={index}
                  className="p-6 md:p-8 hover:shadow-[var(--shadow-warm)] transition-all duration-300 group"
                >
                  <div className="flex flex-col md:flex-row gap-6">
                    {/* Date Badge */}
                    <div className="flex-shrink-0">
                      <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-accent flex flex-col items-center justify-center text-white group-hover:scale-105 transition-transform">
                        <div className="text-2xl font-bold">
                          {event.date.split(" ")[1].replace(",", "")}
                        </div>
                        <div className="text-xs uppercase">
                          {event.date.split(" ")[0].slice(0, 3)}
                        </div>
                      </div>
                    </div>

                    {/* Event Details */}
                    <div className="flex-grow">
                      <div className="flex flex-wrap items-center gap-2 mb-3">
                        <span className={`text-xs px-3 py-1 rounded-full font-medium ${getEventTypeColor(event.type)}`}>
                          {event.type.split("-").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ")}
                        </span>
                      </div>
                      <h3 className="text-xl md:text-2xl font-bold mb-3 font-['Outfit'] group-hover:text-primary transition-colors">
                        {event.title}
                      </h3>
                      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          {event.time}
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          {event.location}
                        </div>
                      </div>
                      <p className="text-muted-foreground leading-relaxed">
                        {event.description}
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Past Events */}
          <div>
            <div className="flex items-center gap-3 mb-8">
              <Users className="w-8 h-8 text-primary" />
              <h2 className="text-3xl font-bold font-['Outfit']">Past Events</h2>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {pastEvents.map((event, index) => (
                <Card
                  key={index}
                  className="p-6 hover:shadow-lg transition-all duration-300 bg-muted/30"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
                      <Calendar className="w-6 h-6 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-2">{event.date}</p>
                      <h3 className="font-semibold mb-2 font-['Outfit']">
                        {event.title}
                      </h3>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="w-3 h-3" />
                        {event.location}
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Newsletter CTA */}
          <div className="mt-16">
            <Card className="p-8 md:p-12 bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20 text-center">
              <h3 className="text-2xl font-bold mb-4 font-['Outfit']">
                Stay Updated
              </h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Subscribe to our newsletter to receive updates about upcoming events,
                research findings, and lab news.
              </p>
              <a href="/contact" className="inline-block">
                <button className="px-8 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-all hover:shadow-[var(--shadow-warm)]">
                  Subscribe Now
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

export default Events;
