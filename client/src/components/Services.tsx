import { motion } from "framer-motion";
import { TrendingUp, Code, Palette, Video, Camera, Megaphone } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const services = [
  {
    icon: TrendingUp,
    title: "Social Media Management",
    description: "Build your brand presence across all social platforms with engaging content and strategic campaigns.",
  },
  {
    icon: Code,
    title: "Website Development",
    description: "Custom websites and web applications built with cutting-edge technology for optimal performance.",
  },
  {
    icon: Palette,
    title: "Graphic Design",
    description: "Eye-catching visual designs that communicate your brand message effectively and beautifully.",
  },
  {
    icon: Video,
    title: "Motion Graphics",
    description: "Dynamic animated content that brings your ideas to life with professional motion design.",
  },
  {
    icon: Camera,
    title: "Video & Photo Graphics",
    description: "Professional photography and videography services to showcase your business in the best light.",
  },
  {
    icon: Megaphone,
    title: "Digital Marketing",
    description: "Data-driven marketing strategies that drive growth and maximize your ROI.",
  },
];

export default function Services() {
  return (
    <section className="py-16 md:py-24 lg:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Our Services</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Comprehensive digital solutions to elevate your business
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <Card className="h-full hover-elevate active-elevate-2 transition-all duration-300 hover:shadow-lg" data-testid={`card-service-${index}`}>
                <CardContent className="p-8">
                  <service.icon className="w-12 h-12 text-primary mb-4" />
                  <h3 className="text-2xl font-semibold mb-3">{service.title}</h3>
                  <p className="text-muted-foreground">{service.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
