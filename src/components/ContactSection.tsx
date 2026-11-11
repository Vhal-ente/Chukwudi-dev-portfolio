import { Mail, Phone, MapPin, Github, Linkedin, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

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
  const whatsappUrl = "https://wa.me/qr/7CWU2BIAWM25I1";
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=240x240&margin=12&color=000000&bgcolor=FFFFFF&data=${encodeURIComponent(whatsappUrl)}`;

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
                  <a href="https://drive.google.com/file/d/1cFEWYBwIGQrqa9XQvKVozy--Td6X0uKA/view?usp=sharing" download>
                    Download CV
                  </a>
                </Button>
              </div>
            </div>

            {/* WhatsApp QR Code */}
            <div className="p-6 md:p-8 rounded-xl glass flex flex-col items-center justify-center text-center">
              <div className="w-12 h-12 rounded-lg bg-gradient-primary flex items-center justify-center mb-4">
                <MessageCircle className="h-6 w-6 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-bold mb-2">Message me on WhatsApp</h3>
              <p className="text-sm text-muted-foreground mb-6">
                Scan this code with your phone camera to start a chat.
              </p>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Open WhatsApp chat"
                className="rounded-xl bg-white p-3 shadow-lg transition-transform hover:scale-105"
              >
                <img
                  src={qrCodeUrl}
                  alt="QR code to start a WhatsApp chat"
                  width={240}
                  height={240}
                  className="h-52 w-52 md:h-60 md:w-60"
                />
              </a>
              <p className="text-sm text-muted-foreground mt-5 mb-4">
                or chat directly at <span className="font-medium text-foreground">+234 903 937 2810</span>
              </p>
              <Button className="bg-gradient-primary text-primary-foreground" asChild>
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Open WhatsApp
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
