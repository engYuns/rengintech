import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useQuery } from "@tanstack/react-query";
import type { Review } from "@shared/schema";

export default function Reviews() {
  const { data: reviews = [], isLoading } = useQuery<Review[]>({
    queryKey: ['/api/reviews'],
  });

  if (isLoading) {
    return (
      <section className="py-16 md:py-24 lg:py-32 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Client Reviews</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              What our clients say about working with us
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-64 bg-muted animate-pulse rounded-md" />
            ))}
          </div>
        </div>
      </section>
    );
  }

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

        {reviews.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No reviews yet. Be the first to share your experience!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {reviews.map((review, index) => (
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
        )}
      </div>
    </section>
  );
}
