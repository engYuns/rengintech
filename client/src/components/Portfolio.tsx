import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useQuery } from "@tanstack/react-query";
import type { Client } from "@shared/schema";

export default function Portfolio() {
  const { data: clients = [], isLoading } = useQuery<Client[]>({
    queryKey: ['/api/clients'],
  });

  if (isLoading) {
    return (
      <section className="py-16 md:py-24 lg:py-32 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Our Portfolio</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Showcasing our successful projects and happy clients
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="aspect-[4/3] bg-muted animate-pulse rounded-md" />
            ))}
          </div>
        </div>
      </section>
    );
  }

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
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Our Portfolio</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Showcasing our successful projects and happy clients
          </p>
        </motion.div>

        {clients.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No clients yet. Check back soon!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {clients.map((client, index) => (
              <motion.div
                key={client.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05, duration: 0.4 }}
              >
                <Card className="overflow-hidden hover-elevate active-elevate-2 transition-all duration-300 group cursor-pointer" data-testid={`card-client-${client.id}`}>
                  <div className="relative aspect-[4/3] overflow-hidden bg-muted flex items-center justify-center">
                    {client.logoUrl ? (
                      <img 
                        src={client.logoUrl} 
                        alt={client.name}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/20 to-accent/20">
                        <span className="text-4xl font-bold text-primary/40">{client.name.charAt(0)}</span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                      <div className="text-white">
                        <h4 className="font-semibold text-lg">{client.name}</h4>
                        <Badge variant="secondary" className="mt-2">{client.category}</Badge>
                        {client.description && (
                          <p className="text-sm mt-2 text-gray-200">{client.description}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
