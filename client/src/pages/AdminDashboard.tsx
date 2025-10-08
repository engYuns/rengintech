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
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import type { Client, Review } from "@shared/schema";

export default function AdminDashboard() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [newClient, setNewClient] = useState({ name: "", category: "", description: "", logoUrl: "" });

  useEffect(() => {
    const isAuth = localStorage.getItem('adminAuth');
    if (!isAuth) {
      setLocation('/admin');
    }
  }, [setLocation]);

  const { data: clients = [] } = useQuery<Client[]>({
    queryKey: ['/api/clients'],
  });

  const { data: reviews = [] } = useQuery<Review[]>({
    queryKey: ['/api/reviews/all'],
  });

  const addClientMutation = useMutation({
    mutationFn: async (data: typeof newClient) => {
      return await apiRequest('/api/clients', 'POST', data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/clients'] });
      toast({ title: "Client added successfully" });
      setNewClient({ name: "", category: "", description: "", logoUrl: "" });
    },
    onError: () => {
      toast({ title: "Failed to add client", variant: "destructive" });
    },
  });

  const deleteClientMutation = useMutation({
    mutationFn: async (id: string) => {
      return await apiRequest(`/api/clients/${id}`, 'DELETE');
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/clients'] });
      toast({ title: "Client deleted" });
    },
    onError: () => {
      toast({ title: "Failed to delete client", variant: "destructive" });
    },
  });

  const approveReviewMutation = useMutation({
    mutationFn: async (id: string) => {
      return await apiRequest(`/api/reviews/${id}/approve`, 'PATCH');
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/reviews/all'] });
      queryClient.invalidateQueries({ queryKey: ['/api/reviews'] });
      toast({ title: "Review approved" });
    },
    onError: () => {
      toast({ title: "Failed to approve review", variant: "destructive" });
    },
  });

  const deleteReviewMutation = useMutation({
    mutationFn: async (id: string) => {
      return await apiRequest(`/api/reviews/${id}`, 'DELETE');
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/reviews/all'] });
      queryClient.invalidateQueries({ queryKey: ['/api/reviews'] });
      toast({ title: "Review deleted" });
    },
    onError: () => {
      toast({ title: "Failed to delete review", variant: "destructive" });
    },
  });

  const handleLogout = () => {
    localStorage.removeItem('adminAuth');
    toast({ title: "Logged out successfully" });
    setLocation('/admin');
  };

  const handleAddClient = (e: React.FormEvent) => {
    e.preventDefault();
    addClientMutation.mutate(newClient);
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
                    disabled={addClientMutation.isPending}
                    data-testid="input-client-name"
                  />
                  <Input
                    placeholder="Category (e.g., Web Development)"
                    value={newClient.category}
                    onChange={(e) => setNewClient({ ...newClient, category: e.target.value })}
                    required
                    disabled={addClientMutation.isPending}
                    data-testid="input-client-category"
                  />
                  <Input
                    placeholder="Logo URL (optional)"
                    value={newClient.logoUrl}
                    onChange={(e) => setNewClient({ ...newClient, logoUrl: e.target.value })}
                    disabled={addClientMutation.isPending}
                    data-testid="input-client-logo"
                  />
                  <Textarea
                    placeholder="Project Description"
                    value={newClient.description}
                    onChange={(e) => setNewClient({ ...newClient, description: e.target.value })}
                    required
                    disabled={addClientMutation.isPending}
                    data-testid="textarea-client-description"
                  />
                  <Button type="submit" disabled={addClientMutation.isPending} data-testid="button-add-client">
                    <Plus className="w-4 h-4 mr-2" />
                    {addClientMutation.isPending ? "Adding..." : "Add Client"}
                  </Button>
                </form>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Client List ({clients.length})</CardTitle>
                <CardDescription>Manage your portfolio clients</CardDescription>
              </CardHeader>
              <CardContent>
                {clients.length === 0 ? (
                  <p className="text-muted-foreground text-center py-8">No clients yet. Add your first client above.</p>
                ) : (
                  <div className="space-y-4">
                    {clients.map((client) => (
                      <div key={client.id} className="flex items-center justify-between p-4 border border-border rounded-md" data-testid={`client-${client.id}`}>
                        <div className="flex-1">
                          <h3 className="font-semibold">{client.name}</h3>
                          <p className="text-sm text-muted-foreground">{client.category}</p>
                          <p className="text-sm text-muted-foreground mt-1">{client.description}</p>
                          {client.logoUrl && (
                            <p className="text-xs text-muted-foreground mt-1">Logo: {client.logoUrl}</p>
                          )}
                        </div>
                        <div className="flex gap-2">
                          <Button 
                            variant="destructive" 
                            size="sm" 
                            onClick={() => deleteClientMutation.mutate(client.id)} 
                            disabled={deleteClientMutation.isPending}
                            data-testid={`button-delete-${client.id}`}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reviews" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Review Management ({reviews.length})</CardTitle>
                <CardDescription>Approve or delete customer reviews</CardDescription>
              </CardHeader>
              <CardContent>
                {reviews.length === 0 ? (
                  <p className="text-muted-foreground text-center py-8">No reviews yet.</p>
                ) : (
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
                              <Button 
                                variant="default" 
                                size="sm" 
                                onClick={() => approveReviewMutation.mutate(review.id)} 
                                disabled={approveReviewMutation.isPending}
                                data-testid={`button-approve-${review.id}`}
                              >
                                <Check className="w-4 h-4" />
                              </Button>
                            )}
                            <Button 
                              variant="destructive" 
                              size="sm" 
                              onClick={() => deleteReviewMutation.mutate(review.id)} 
                              disabled={deleteReviewMutation.isPending}
                              data-testid={`button-delete-review-${review.id}`}
                            >
                              <X className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
