import { Briefcase, MapPin, Calendar } from "lucide-react";

const experiences = [
  {
    company: "Vertex Software Corporation",
    role: "Frontend Engineer",
    period: "June 2025 - Present",
    location: "Remote",
    description: [
      "Collaborated with developers to design, develop, and test web applications using React.js, Tailwind CSS, and TypeScript",
      "Integrated Open-API to automate readiness gap generation and tailored recommendations, enhancing operational efficiency",
    ],
  },
  {
    company: "Safelto",
    role: "Frontend Engineer",
    period: "March 2025",
    location: "Remote",
    description: [
      "Designed and developed a smart community management platform using React.js, Tailwind CSS, and TypeScript",
      "Engaged in agile development practices, participating in sprint planning and daily stand-ups",
    ],
  },
  {
    company: "Echez Tech Hub",
    role: "Frontend Engineer",
    period: "January 2026",
    location: "Remote",
    description: [
      "Contributed to the development of a technology hub platform using Next.js, TypeScript, Tailwind CSS, and React Query",
      "Collaborated with cross-functional teams to implement features and optimize performance",
    ],
  },
  {
    company: "MephaltiHQ",
    role: "Frontend Engineer",
    period: "Aug 2024 - Dec 2024",
    location: "Benin, Nigeria",
    description: [
      "Built web applications using React.js, styled components, and TypeScript with best practices",
      "Reduced project delivery time through effective agile methodology implementation",
    ],
  },
  {
    company: "Virtual Restart",
    role: "Software Engineer (Contract)",
    period: "Dec 2024",
    location: "Germany (Remote)",
    description: [
      "Collaborated with team to develop company web application",
      "Integrated API calls and managed data storage using Python",
    ],
  },
  {
    company: "Decagon",
    role: "Associate Software Engineer",
    period: "Jul 2023 - Feb 2024",
    location: "Nigeria",
    description: [
      "Developed web applications using React and Node.js with best practices",
      "Optimized MySQL, PostgreSQL, and MongoDB databases, improving query response times",
      "Developed and executed unit and integration tests for high-quality software delivery",
    ],
  },
];

export function ExperienceSection() {
  return (
    <section id="experience" className="py-20 md:py-32 relative bg-secondary/30">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Experience</h2>
            <div className="w-20 h-1 bg-gradient-primary mx-auto rounded-full" />
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-0 md:left-1/2 transform md:-translate-x-px top-0 bottom-0 w-0.5 bg-border" />

            {experiences.map((exp, index) => (
              <div
                key={`${exp.company}-${exp.period}`}
                className={`relative mb-12 md:mb-16 ${
                  index % 2 === 0 ? "md:pr-[50%] md:text-right" : "md:pl-[50%]"
                }`}
              >
                {/* Timeline dot */}
                <div
                  className={`absolute top-0 w-4 h-4 rounded-full bg-gradient-primary border-4 border-background z-10 ${
                    index % 2 === 0
                      ? "left-[-7px] md:left-auto md:right-[-8px]"
                      : "left-[-7px] md:left-[calc(50%-8px)]"
                  }`}
                />

                {/* Content card */}
                <div
                  className={`ml-6 md:ml-0 ${
                    index % 2 === 0 ? "md:mr-8" : "md:ml-8"
                  }`}
                >
                  <div className="p-6 rounded-xl glass glass-hover">
                    <div className={`flex items-center gap-2 mb-2 ${index % 2 === 0 ? "md:justify-end" : ""}`}>
                      <Briefcase className="h-4 w-4 text-primary" />
                      <span className="font-semibold text-primary">{exp.role}</span>
                    </div>
                    
                    <h3 className="text-xl font-bold mb-3">{exp.company}</h3>
                    
                    <div className={`flex flex-wrap gap-4 text-sm text-muted-foreground mb-4 ${index % 2 === 0 ? "md:justify-end" : ""}`}>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {exp.period}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {exp.location}
                      </span>
                    </div>

                    <ul className={`space-y-2 ${index % 2 === 0 ? "md:text-right" : ""}`}>
                      {exp.description.map((item, i) => (
                        <li key={i} className="text-sm text-muted-foreground">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
