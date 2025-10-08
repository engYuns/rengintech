import { motion } from "framer-motion";
import { ArrowRight, Award, Users, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@assets/stock_images/modern_tech_office_w_432422c9.jpg";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/60 to-black/70" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
            Transform Your{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Digital Presence
            </span>
          </h1>
          <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-3xl mx-auto">
            15+ Projects Delivered | 8 Expert Team Members | 3 Years of Excellence
          </p>
          <div className="flex flex-wrap gap-4 justify-center mb-16">
            <Button size="lg" className="gap-2" data-testid="button-view-work">
              View Our Work <ArrowRight className="w-5 h-5" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="gap-2 bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20" 
              data-testid="button-get-started"
            >
              Get Started
            </Button>
          </div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            {[
              { icon: Briefcase, label: "Projects", value: "15+" },
              { icon: Users, label: "Team Members", value: "8" },
              { icon: Award, label: "Years Experience", value: "3" },
            ].map((stat, i) => (
              <div 
                key={i} 
                className="bg-white/10 backdrop-blur-md border border-white/20 rounded-md p-6 hover-elevate active-elevate-2"
              >
                <stat.icon className="w-8 h-8 text-accent mb-3 mx-auto" />
                <div className="text-3xl font-bold text-white font-mono">{stat.value}</div>
                <div className="text-sm text-gray-300">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full p-1">
          <div className="w-1.5 h-3 bg-white/50 rounded-full mx-auto" />
        </div>
      </div>
    </section>
  );
}
