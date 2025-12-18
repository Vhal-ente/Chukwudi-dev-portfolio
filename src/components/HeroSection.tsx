import { Github, Linkedin, Mail, Download, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-accent" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl animate-float delay-500" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Status badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8 animate-fade-in-up">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-sm font-medium text-muted-foreground">
              Available for opportunities
            </span>
          </div>

          {/* Main heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 animate-fade-in-up delay-100">
            Hi, I'm{" "}
            <span className="text-gradient">Nwobi Chukwudi</span>
          </h1>

          {/* Role */}
          <p className="text-xl sm:text-2xl md:text-3xl font-medium text-muted-foreground mb-6 animate-fade-in-up delay-200">
            Full-Stack Software Engineer
          </p>

          {/* Description */}
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-in-up delay-300">
            Building scalable web applications with React, Node.js, and modern
            technologies. Passionate about creating elegant solutions that drive
            business value and enhance user experiences.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 animate-fade-in-up delay-400">
            <Button
              size="lg"
              className="bg-gradient-primary text-primary-foreground hover:opacity-90 transition-opacity glow-primary px-8"
              asChild
            >
              <a href="#contact">
                <Mail className="mr-2 h-4 w-4" />
                Get in Touch
              </a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="glass glass-hover px-8"
              asChild
            >
              <a href="https://drive.google.com/file/d/1ZdMxL_C-8Y7icgxNv-uql0wGbZrPzlx6/view?usp=drive_link" download>
                <Download className="mr-2 h-4 w-4" />
                Download CV
              </a>
            </Button>
          </div>

          {/* Social Links */}
          <div className="flex items-center justify-center gap-4 animate-fade-in-up delay-500">
            <a
              href="https://github.com/Vhal-ente"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full glass glass-hover"
            >
              <Github className="h-5 w-5" />
            </a>
            <a
              href="https://www.linkedin.com/in/vhalentine"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full glass glass-hover"
            >
              <Linkedin className="h-5 w-5" />
            </a>
            <a
              href="mailto:valentinenwobi9@gmail.com"
              className="p-3 rounded-full glass glass-hover"
            >
              <Mail className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <ChevronDown className="h-6 w-6 text-muted-foreground" />
      </div>
    </section>
  );
}
