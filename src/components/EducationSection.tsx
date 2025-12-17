import { GraduationCap, Award } from "lucide-react";

const education = [
  {
    institution: "Nnamdi Azikiwe University, Awka",
    degree: "B.Engr. (Computer Engineering)",
    period: "Jan 2016 - Dec 2022",
    icon: GraduationCap,
  },
];

const certifications = [
  {
    name: "SCRUM Fundamentals Certified (SFC)",
    issuer: "SCRUM study - Accreditation Body for Scrum and Agile",
    icon: Award,
  },
  {
    name: "Certified Teacher/Research Personnel",
    issuer: "IEEE-NAU Skill up",
    icon: Award,
  },
  {
    name: "UI/UX and Graphics Teacher",
    issuer: "IEEE-NAU Skill up",
    icon: Award,
  },
];

export function EducationSection() {
  return (
    <section id="education" className="py-20 md:py-32 relative">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Education & Certifications</h2>
            <div className="w-20 h-1 bg-gradient-primary mx-auto rounded-full" />
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Education */}
            <div>
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <GraduationCap className="h-5 w-5 text-primary" />
                Education
              </h3>
              {education.map((edu) => (
                <div
                  key={edu.institution}
                  className="p-6 rounded-xl glass glass-hover"
                >
                  <div className="w-12 h-12 rounded-lg bg-gradient-primary flex items-center justify-center mb-4">
                    <edu.icon className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <h4 className="text-lg font-bold mb-1">{edu.degree}</h4>
                  <p className="text-muted-foreground mb-2">{edu.institution}</p>
                  <p className="text-sm text-primary">{edu.period}</p>
                </div>
              ))}
            </div>

            {/* Certifications */}
            <div>
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Award className="h-5 w-5 text-primary" />
                Certifications
              </h3>
              <div className="space-y-4">
                {certifications.map((cert, index) => (
                  <div
                    key={cert.name}
                    className="p-4 rounded-xl glass glass-hover flex items-start gap-4"
                  >
                    <div className="w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center flex-shrink-0">
                      <cert.icon className="h-5 w-5 text-primary-foreground" />
                    </div>
                    <div>
                      <h4 className="font-semibold">{cert.name}</h4>
                      <p className="text-sm text-muted-foreground">{cert.issuer}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
