import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

// TODO: remove mock data - this will be replaced with real reviews from the database
const mockReviews = [
  {
    id: 1,
    name: "Ahmed Hassan",
    company: "TechStart Inc.",
    rating: 5,
    text: "Rengin Tech transformed our digital presence completely. Their team's creativity and professionalism exceeded our expectations!",
  },
  {
    id: 2,
    name: "Sara Ibrahim",
    company: "Creative Hub",
    rating: 5,
    text: "Outstanding work on our website and branding. The attention to detail and modern design approach is exactly what we needed.",
  },
  {
    id: 3,
    name: "Omar Ali",
    company: "Digital Solutions",
    rating: 5,
    text: "Professional team, excellent communication, and delivered ahead of schedule. Highly recommend for any digital marketing needs!",
  },
  {
    id: 4,
    name: "Layla Mohammed",
    company: "BrandCraft",
    rating: 5,
    text: "The motion graphics and video production quality is top-notch. They brought our vision to life beautifully!",
  },
];

export default function Reviews() {
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
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Client Reviews</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            What our clients say about working with us
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {mockReviews.map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <Card className="h-full hover-elevate active-elevate-2" data-testid={`card-review-${review.id}`}>
                <CardContent className="p-6">
                  <div className="flex gap-1 mb-4">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-6 italic">"{review.text}"</p>
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        {review.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-semibold">{review.name}</div>
                      <div className="text-sm text-muted-foreground">{review.company}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
