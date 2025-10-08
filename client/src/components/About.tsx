import { motion } from "framer-motion";
import { Award, Users, Target, Zap } from "lucide-react";

const stats = [
  { icon: Award, label: "Years of Experience", value: "3" },
  { icon: Users, label: "Team Members", value: "8" },
  { icon: Target, label: "Projects Completed", value: "15+" },
  { icon: Zap, label: "Client Satisfaction", value: "100%" },
];

export default function About() {
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
          <h2 className="text-4xl md:text-5xl font-bold mb-4">About Rengin Tech</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            We're a passionate team of digital experts dedicated to helping businesses thrive in the digital age. 
            With 3 years of proven excellence, our 8-member team has successfully delivered over 15 transformative projects.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="text-center"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-md bg-primary/10 mb-4">
                <stat.icon className="w-8 h-8 text-primary" />
              </div>
              <div className="text-3xl md:text-4xl font-bold font-mono mb-2">{stat.value}</div>
              <div className="text-sm md:text-base text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
