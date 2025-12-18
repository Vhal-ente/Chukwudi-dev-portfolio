import { Mail, Phone, MapPin, Github, Linkedin, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "valentinenwobi9@gmail.com",
    href: "mailto:valentinenwobi9@gmail.com",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+234-903-937-2810",
    href: "tel:+2349039372810",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Lagos, Nigeria",
  },
];

const socialLinks = [
  {
    icon: Github,
    label: "GitHub",
    href: "https://github.com/Vhal-ente",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/vhalentine",
  },
];

export function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

// In ContactSection.tsx - Update the handleSubmit function
const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  setIsSubmitting(true);

  const form = e.currentTarget;
  const formData = new FormData(form);
  
  // Get form data - ensure inputs have these 'name' attributes
  const payload = {
    name: formData.get('name') as string,
    email: formData.get('email') as string,
    subject: formData.get('subject') as string,
    message: formData.get('message') as string,
  };

  try {
    // USE YOUR RENDER BACKEND URL HERE
    const backendUrl = import.meta.env?.VITE_API_URL || 'https://portfolio-backend.onrender.com';
    
    const response = await fetch(`${backendUrl}/api/contact`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(payload),
    });

    const result = await response.json();

    if (response.ok && result.success) {
      toast({
        title: 'Success!',
        description: result.message || 'Your message has been sent successfully.',
        duration: 5000,
      });
      form.reset(); // Clear the form
    } else {
      throw new Error(result.error || 'Failed to send message');
    }
  } catch (error) {
    console.error('Contact form error:', error);
    toast({
      title: 'Error',
      description: 'Could not send your message. Please try again later.',
      variant: 'destructive',
      duration: 5000,
    });
  } finally {
    setIsSubmitting(false);
  }
};

  return (
    <section id="contact" className="py-20 md:py-32 relative bg-secondary/30">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-5xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Get In Touch</h2>
            <div className="w-20 h-1 bg-gradient-primary mx-auto rounded-full mb-4" />
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Have a project in mind or want to collaborate? Feel free to reach out!
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-bold mb-6">Contact Information</h3>
                <div className="space-y-4">
                  {contactInfo.map((item) => (
                    <div key={item.label} className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-lg bg-gradient-primary flex items-center justify-center flex-shrink-0">
                        <item.icon className="h-5 w-5 text-primary-foreground" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">{item.label}</p>
                        {item.href ? (
                          <a
                            href={item.href}
                            className="font-medium hover:text-primary transition-colors"
                          >
                            {item.value}
                          </a>
                        ) : (
                          <p className="font-medium">{item.value}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Social Links */}
              <div>
                <h3 className="text-xl font-bold mb-4">Connect with me</h3>
                <div className="flex gap-3">
                  {socialLinks.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-lg glass glass-hover"
                    >
                      <link.icon className="h-5 w-5" />
                    </a>
                  ))}
                </div>
              </div>

              {/* Download CV */}
              <div className="p-6 rounded-xl glass">
                <h3 className="font-bold mb-2">Download my resume</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Get a copy of my resume for more details about my experience and skills.
                </p>
                <Button className="bg-gradient-primary text-primary-foreground" asChild>
                  <a href="https://drive.google.com/file/d/1ZdMxL_C-8Y7icgxNv-uql0wGbZrPzlx6/view?usp=drive_link" download>
                    Download CV
                  </a>
                </Button>
              </div>
            </div>

            {/* Contact Form */}
            <div className="p-6 md:p-8 rounded-xl glass">
              <h3 className="text-xl font-bold mb-6">Send a Message</h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Name</label>
                    <Input
                    name="name"
                      placeholder="Your name"
                      required
                      className="bg-background/50"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Email</label>
                    <Input
                    name="email"
                      type="email"
                      placeholder="your@email.com"
                      required
                      className="bg-background/50"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Subject</label>
                  <Input
                  name="subject"
                    placeholder="What's this about?"
                    required
                    className="bg-background/50"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Message</label>
                  <Textarea
                  name="message"
                    placeholder="Your message..."
                    rows={5}
                    required
                    className="bg-background/50 resize-none"
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-gradient-primary text-primary-foreground"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    "Sending..."
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
