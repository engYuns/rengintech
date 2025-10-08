import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { LogOut, Plus, Trash2, Edit, Check, X, Star } from "lucide-react";

// TODO: Remove mock data - replace with real database data
const mockClients = [
  { id: 1, name: "TechCorp Solutions", category: "Web Development", description: "E-commerce platform" },
  { id: 2, name: "Creative Studio", category: "Graphic Design", description: "Brand identity redesign" },
];

const mockReviews = [
  { id: 1, name: "Ahmed Hassan", company: "TechStart Inc.", rating: 5, text: "Excellent service!", approved: true },
  { id: 2, name: "Sara Ibrahim", company: "Creative Hub", rating: 5, text: "Great work!", approved: false },
];

export default function AdminDashboard() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [clients, setClients] = useState(mockClients);
  const [reviews, setReviews] = useState(mockReviews);
  const [newClient, setNewClient] = useState({ name: "", category: "", description: "" });

  useEffect(() => {
    // TODO: Replace with actual auth check
    const isAuth = localStorage.getItem('adminAuth');
    if (!isAuth) {
      setLocation('/admin');
    }
  }, [setLocation]);

  const handleLogout = () => {
    localStorage.removeItem('adminAuth');
    toast({ title: "Logged out successfully" });
    setLocation('/admin');
  };

  const handleAddClient = (e: React.FormEvent) => {
    e.preventDefault();
    const client = { id: Date.now(), ...newClient };
    setClients([...clients, client]);
    setNewClient({ name: "", category: "", description: "" });
    toast({ title: "Client added successfully" });
    console.log('Added client:', client);
  };

  const handleDeleteClient = (id: number) => {
    setClients(clients.filter(c => c.id !== id));
    toast({ title: "Client deleted" });
    console.log('Deleted client:', id);
  };

  const handleApproveReview = (id: number) => {
    setReviews(reviews.map(r => r.id === id ? { ...r, approved: true } : r));
    toast({ title: "Review approved" });
    console.log('Approved review:', id);
  };

  const handleDeleteReview = (id: number) => {
    setReviews(reviews.filter(r => r.id !== id));
    toast({ title: "Review deleted" });
    console.log('Deleted review:', id);
  };

  return (
    <div className="min-h-screen bg-background">
      <nav className="border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Rengin Tech Admin</h1>
            <Button variant="outline" onClick={handleLogout} data-testid="button-logout">
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="clients" className="space-y-6">
          <TabsList>
            <TabsTrigger value="clients" data-testid="tab-clients">Clients</TabsTrigger>
            <TabsTrigger value="reviews" data-testid="tab-reviews">Reviews</TabsTrigger>
          </TabsList>

          <TabsContent value="clients" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Add New Client</CardTitle>
                <CardDescription>Add a new client project to the portfolio</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleAddClient} className="space-y-4">
                  <Input
                    placeholder="Client Name"
                    value={newClient.name}
                    onChange={(e) => setNewClient({ ...newClient, name: e.target.value })}
                    required
                    data-testid="input-client-name"
                  />
                  <Input
                    placeholder="Category (e.g., Web Development)"
                    value={newClient.category}
                    onChange={(e) => setNewClient({ ...newClient, category: e.target.value })}
                    required
                    data-testid="input-client-category"
                  />
                  <Textarea
                    placeholder="Project Description"
                    value={newClient.description}
                    onChange={(e) => setNewClient({ ...newClient, description: e.target.value })}
                    required
                    data-testid="textarea-client-description"
                  />
                  <Button type="submit" data-testid="button-add-client">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Client
                  </Button>
                </form>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Client List</CardTitle>
                <CardDescription>Manage your portfolio clients</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {clients.map((client) => (
                    <div key={client.id} className="flex items-center justify-between p-4 border border-border rounded-md" data-testid={`client-${client.id}`}>
                      <div className="flex-1">
                        <h3 className="font-semibold">{client.name}</h3>
                        <p className="text-sm text-muted-foreground">{client.category}</p>
                        <p className="text-sm text-muted-foreground mt-1">{client.description}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" data-testid={`button-edit-${client.id}`}>
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="destructive" size="sm" onClick={() => handleDeleteClient(client.id)} data-testid={`button-delete-${client.id}`}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reviews" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Review Management</CardTitle>
                <CardDescription>Approve or delete customer reviews</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {reviews.map((review) => (
                    <div key={review.id} className="p-4 border border-border rounded-md" data-testid={`review-${review.id}`}>
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-semibold">{review.name}</h3>
                            <Badge variant={review.approved ? "default" : "secondary"}>
                              {review.approved ? "Approved" : "Pending"}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">{review.company}</p>
                          <div className="flex gap-1 my-2">
                            {[...Array(review.rating)].map((_, i) => (
                              <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            ))}
                          </div>
                          <p className="text-sm">{review.text}</p>
                        </div>
                        <div className="flex gap-2">
                          {!review.approved && (
                            <Button variant="default" size="sm" onClick={() => handleApproveReview(review.id)} data-testid={`button-approve-${review.id}`}>
                              <Check className="w-4 h-4" />
                            </Button>
                          )}
                          <Button variant="destructive" size="sm" onClick={() => handleDeleteReview(review.id)} data-testid={`button-delete-review-${review.id}`}>
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
