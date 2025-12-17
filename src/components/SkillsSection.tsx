const skillCategories = [
  {
    title: "Frontend",
    skills: [
      { name: "React.js", level: 95 },
      { name: "Next.js", level: 85 },
      { name: "TypeScript", level: 90 },
      { name: "JavaScript", level: 95 },
      { name: "Tailwind CSS", level: 90 },
      { name: "Redux", level: 85 },
    ],
  },
  {
    title: "Backend",
    skills: [
      { name: "Node.js", level: 85 },
      { name: "Express.js", level: 80 },
      { name: "Adonis.js", level: 75 },
      { name: "Python", level: 70 },
      { name: "REST APIs", level: 90 },
    ],
  },
  {
    title: "Databases",
    skills: [
      { name: "PostgreSQL", level: 85 },
      { name: "MySQL", level: 85 },
      { name: "MongoDB", level: 80 },
      { name: "SQLite", level: 80 },
      { name: "Sequelize", level: 80 },
    ],
  },
  {
    title: "Tools & Methods",
    skills: [
      { name: "Git & GitHub", level: 90 },
      { name: "Agile/Scrum", level: 90 },
      { name: "Testing", level: 80 },
      { name: "CI/CD", level: 75 },
      { name: "Cloudinary", level: 80 },
    ],
  },
];

export function SkillsSection() {
  return (
    <section id="skills" className="py-20 md:py-32 relative bg-secondary/30">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Skills & Technologies</h2>
            <div className="w-20 h-1 bg-gradient-primary mx-auto rounded-full mb-4" />
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Technologies and tools I use to bring ideas to life
            </p>
          </div>

          {/* Skills Grid */}
          <div className="grid md:grid-cols-2 gap-8">
            {skillCategories.map((category, categoryIndex) => (
              <div
                key={category.title}
                className="p-6 rounded-xl glass"
                style={{ animationDelay: `${categoryIndex * 100}ms` }}
              >
                <h3 className="text-xl font-bold mb-6 text-gradient">{category.title}</h3>
                <div className="space-y-4">
                  {category.skills.map((skill, skillIndex) => (
                    <div key={skill.name}>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium">{skill.name}</span>
                        <span className="text-sm text-muted-foreground">{skill.level}%</span>
                      </div>
                      <div className="h-2 bg-secondary rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-primary rounded-full transition-all duration-1000 ease-out"
                          style={{
                            width: `${skill.level}%`,
                            animationDelay: `${(categoryIndex * 100) + (skillIndex * 50)}ms`,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Additional Skills Tags */}
          <div className="mt-12 text-center">
            <h3 className="text-lg font-semibold mb-4">Also experienced with</h3>
            <div className="flex flex-wrap justify-center gap-2">
              {[
                "Styled Components",
                "Bootstrap",
                "WordPress",
                "UI/UX Design",
                "Technical Support",
                "Problem Solving",
                "Cross-functional Teams",
                "Web Analytics",
              ].map((skill) => (
                <span
                  key={skill}
                  className="px-4 py-2 rounded-full glass text-sm font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
