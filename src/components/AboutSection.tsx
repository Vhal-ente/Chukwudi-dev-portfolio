import { Code2, Users, Lightbulb, Rocket, Icon, icons } from "lucide-react";

const highlights = [
  {
    icon: Code2,
    title: "Full-Stack Development",
    description: "Proficient in React, Node.js, TypeScript, and modern web technologies",
  },
  {
    icon: Users,
    title: "Agile Collaboration",
    description: "Enhanced feature delivery efficiency by 15% through agile practices",
  },
  {
    icon: Lightbulb,
    title: "Problem Solver",
    description: "Reduced query response times by 20% through database optimization",
  },
  {
    icon: Rocket,
    title: "Continuous Innovation",
    description: "Passionate about improving software development processes",
  },
];

export function AboutSection() {
  return (
    <section id="about" className="py-20 md:py-32 relative">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">About Me</h2>
            <div className="w-20 h-1 bg-gradient-primary mx-auto rounded-full" />
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <div className="space-y-6">
              <p className="text-lg text-muted-foreground leading-relaxed">
                I'm a <span className="text-foreground font-medium">Software Engineer</span> with 
                extensive experience in full-stack development and database optimization. I specialize 
                in designing scalable solutions that contribute to high-quality software creation.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                With a strong foundation in <span className="text-foreground font-medium">React, Next.js,</span> 
                <span className="text-foreground font-medium"> Node.js, TypeScript, Express,</span> and efficient database 
                management, I've successfully collaborated in agile environments, delivering impactful 
                features and reducing delivery times significantly.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                I proactively participate in cross-functional teams to align software implementation 
                with business goals, always seeking to improve development processes through continuous 
                innovation.
              </p>
            </div>

            {/* Highlights Grid */}
            <div className="grid sm:grid-cols-2 gap-4">
              {highlights.map((item, index) => (
                <div
                  key={item.title}
                  className="p-6 rounded-xl glass glass-hover"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="w-12 h-12 rounded-lg bg-gradient-primary flex items-center justify-center mb-4">
                    <item.icon className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <h3 className="font-semibold mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
