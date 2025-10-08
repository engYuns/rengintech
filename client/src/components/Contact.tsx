import { useState } from "react";
import { motion } from "framer-motion";
import { Phone, Mail, Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

export default function Contact() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });

  const mutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      return await apiRequest('/api/bookings', 'POST', data);
    },
    onSuccess: () => {
      toast({
        title: "Message Sent!",
        description: "We'll get back to you within 24 hours.",
      });
      setFormData({ name: "", email: "", phone: "", service: "", message: "" });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate(formData);
  };

  return (
    <section className="py-16 md:py-24 lg:py-32 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Get In Touch</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Ready to transform your digital presence? Let's talk about your project
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Input
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  disabled={mutation.isPending}
                  data-testid="input-name"
                />
              </div>
              <div>
                <Input
                  type="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  disabled={mutation.isPending}
                  data-testid="input-email"
                />
              </div>
              <div>
                <Input
                  type="tel"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  required
                  disabled={mutation.isPending}
                  data-testid="input-phone"
                />
              </div>
              <div>
                <Select 
                  value={formData.service} 
                  onValueChange={(value) => setFormData({ ...formData, service: value })}
                  disabled={mutation.isPending}
                >
                  <SelectTrigger data-testid="select-service">
                    <SelectValue placeholder="Select Service" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="social-media">Social Media Management</SelectItem>
                    <SelectItem value="website">Website Development</SelectItem>
                    <SelectItem value="graphic-design">Graphic Design</SelectItem>
                    <SelectItem value="motion-graphics">Motion Graphics</SelectItem>
                    <SelectItem value="video-photo">Video & Photo Graphics</SelectItem>
                    <SelectItem value="digital-marketing">Digital Marketing</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Textarea
                  placeholder="Tell us about your project..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                  disabled={mutation.isPending}
                  rows={5}
                  data-testid="textarea-message"
                />
              </div>
              <Button type="submit" size="lg" className="w-full" disabled={mutation.isPending} data-testid="button-submit">
                {mutation.isPending ? "Sending..." : "Request Consultation"}
              </Button>
            </form>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <Card className="bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20">
              <CardContent className="p-8 space-y-6">
                <div>
                  <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
                </div>

                <div className="space-y-4">
                  <a href="tel:+9647504313705" className="flex items-start gap-4 hover-elevate active-elevate-2 p-3 rounded-md transition-colors" data-testid="link-phone-1">
                    <Phone className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <div className="font-semibold">Phone</div>
                      <div className="text-muted-foreground">+964 750 431 3705</div>
                    </div>
                  </a>

                  <a href="tel:+9647511401782" className="flex items-start gap-4 hover-elevate active-elevate-2 p-3 rounded-md transition-colors" data-testid="link-phone-2">
                    <Phone className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <div className="font-semibold">Phone</div>
                      <div className="text-muted-foreground">+964 751 140 1782</div>
                    </div>
                  </a>

                  <a href="tel:+9647818150571" className="flex items-start gap-4 hover-elevate active-elevate-2 p-3 rounded-md transition-colors" data-testid="link-phone-3">
                    <Phone className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <div className="font-semibold">Phone</div>
                      <div className="text-muted-foreground">+964 781 815 0571</div>
                    </div>
                  </a>

                  <a href="mailto:rengintech@gmail.com" className="flex items-start gap-4 hover-elevate active-elevate-2 p-3 rounded-md transition-colors" data-testid="link-email">
                    <Mail className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <div className="font-semibold">Email</div>
                      <div className="text-muted-foreground">rengintech@gmail.com</div>
                    </div>
                  </a>

                  <a href="https://instagram.com/rengintech" target="_blank" rel="noopener noreferrer" className="flex items-start gap-4 hover-elevate active-elevate-2 p-3 rounded-md transition-colors" data-testid="link-instagram">
                    <Instagram className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <div className="font-semibold">Instagram</div>
                      <div className="text-muted-foreground">@rengintech</div>
                    </div>
                  </a>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
