import { Instagram, Mail, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-card border-t border-card-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-2xl font-bold mb-4">Rengin Tech</h3>
            <p className="text-muted-foreground">
              Transforming businesses through innovative digital solutions since 2021.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li><a href="#services" className="hover:text-foreground transition-colors" data-testid="link-footer-social">Social Media Management</a></li>
              <li><a href="#services" className="hover:text-foreground transition-colors" data-testid="link-footer-web">Website Development</a></li>
              <li><a href="#services" className="hover:text-foreground transition-colors" data-testid="link-footer-design">Graphic Design</a></li>
              <li><a href="#services" className="hover:text-foreground transition-colors" data-testid="link-footer-motion">Motion Graphics</a></li>
              <li><a href="#services" className="hover:text-foreground transition-colors" data-testid="link-footer-video">Video & Photo</a></li>
              <li><a href="#services" className="hover:text-foreground transition-colors" data-testid="link-footer-marketing">Digital Marketing</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <a href="tel:+9647504313705" className="hover:text-foreground transition-colors" data-testid="link-footer-phone">+964 750 431 3705</a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <a href="mailto:rengintech@gmail.com" className="hover:text-foreground transition-colors" data-testid="link-footer-email">rengintech@gmail.com</a>
              </li>
              <li className="flex items-center gap-2">
                <Instagram className="w-4 h-4" />
                <a href="https://instagram.com/rengintech" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors" data-testid="link-footer-instagram">@rengintech</a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">About</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li>3 Years of Excellence</li>
              <li>8 Expert Team Members</li>
              <li>15+ Successful Projects</li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-border text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Rengin Tech. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
