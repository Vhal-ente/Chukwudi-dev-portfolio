import { ExternalLink, Github } from "lucide-react";
import { Button } from "@/components/ui/button";

import projectVertex from "@/assets/AI-readiness-checker.png";
import projectSafelto from "@/assets/Safelto.png";
import projectVirgas from "@/assets/Virgas.png";
import projectCrossshield from "@/assets/Crossshieldhc.png";
import projectClosestead from "@/assets/project-closestead.jpg";
import projectImmigration from "@/assets/immigrationpath2canada.png";

interface Project {
  title: string;
  description: string;
  image: string;
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured?: boolean;
  inProgress?: boolean;
}

const projects: Project[] = [
  {
    title: "Vertex AI Readiness Checker",
    description:
      "A web-based tool that assesses organization's AI readiness in about five minutes. Evaluates strengths and gaps in strategy, data, infrastructure, and governance, providing actionable reports.",
    image: projectVertex,
    technologies: ["React.js", "TypeScript", "Tailwind CSS", "OpenAPI"],
    liveUrl: "https://ai.vertex.com/",
    featured: true,
  },
  {
    title: "Safelto",
    description:
      "A smart, unified web-based platform designed to enhance community living by simplifying operations, improving security, and fostering stronger connections among residents.",
    image: projectSafelto,
    technologies: ["React.js", "TypeScript", "Tailwind CSS"],
    liveUrl: "https://web-app.safelto.com",
    featured: true,
  },
  {
    title: "Virgas",
    description:
      "Smart gas monitoring application that tracks gas levels in real-time using IoT devices. Users can purchase and monitor gas usage, ensuring they never run out.",
    image: projectVirgas,
    technologies: ["React.js", "TypeScript", "Styled Components"],
    liveUrl: "https://virgasapp.com/",
    featured: true,
  },
  {
    title: "Cross Shield Health Consulting",
    description:
      "Healthcare platform connecting community pharmacies, suppliers, and patients to ensure reliable access to essential medicines in hard-to-reach areas.",
    image: projectCrossshield,
    technologies: ["React.js", "Tailwind CSS", "TypeScript", "Adonis JS", "MySQL"],
    liveUrl: "https://crossshieldhc.com",
    inProgress: true,
  },
  {
    title: "CloseStead",
    description:
      "Property management web application for efficiently managing short-term apartments, tracking availability, occupancy status, and reservations.",
    image: projectClosestead,
    technologies: ["React.js", "Redux", "TypeScript", "SQLite", "Sequelize"],
  },
  {
    title: "Immigration Path 2 Canada",
    description:
      "Resource platform providing detailed information on various immigration pathways to Canada, including work permits, student visas, and permanent residency.",
    image: projectImmigration,
    technologies: ["WordPress", "Custom CSS"],
    liveUrl: "https://immigrationpath2canada.com",
  },
];

export function ProjectsSection() {
  return (
    <section id="projects" className="py-20 md:py-32 relative">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Projects</h2>
            <div className="w-20 h-1 bg-gradient-primary mx-auto rounded-full mb-4" />
            <p className="text-muted-foreground max-w-2xl mx-auto">
              A selection of projects that showcase my skills in building scalable,
              user-focused applications
            </p>
          </div>

          {/* Projects Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <div
                key={project.title}
                className="group rounded-xl glass glass-hover overflow-hidden flex flex-col"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Project Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent opacity-60" />
                  
                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex gap-2">
                    {project.featured && (
                      <span className="px-2 py-1 text-xs font-medium rounded-full bg-gradient-primary text-primary-foreground">
                        Featured
                      </span>
                    )}
                    {project.inProgress && (
                      <span className="px-2 py-1 text-xs font-medium rounded-full bg-yellow-500/20 text-yellow-500 border border-yellow-500/30">
                        In Progress
                      </span>
                    )}
                  </div>
                </div>

                {/* Project Content */}
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4 flex-1">
                    {project.description}
                  </p>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 text-xs font-medium rounded-md bg-secondary text-secondary-foreground"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Links */}
                  <div className="flex gap-3">
                    {project.liveUrl && (
                      <Button size="sm" variant="outline" className="flex-1" asChild>
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <ExternalLink className="mr-2 h-4 w-4" />
                          Live Demo
                        </a>
                      </Button>
                    )}
                    {project.githubUrl && (
                      <Button size="sm" variant="ghost" asChild>
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Github className="h-4 w-4" />
                        </a>
                      </Button>
                    )}
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
