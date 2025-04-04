
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/ui/page-header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { MessageCircle, Leaf, Image, Users, BookOpen, ArrowRight } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

export default function Dashboard() {
  const { user, isAuthenticated } = useAuth();

  const features = [
    {
      title: "AI Farming Assistant",
      description: "Ask questions about farming, get crop recommendations, and learn best practices.",
      icon: MessageCircle,
      color: "bg-primary/10 text-primary",
      link: "/assistant",
    },
    {
      title: "Plant Disease Detection",
      description: "Upload plant images to identify diseases and get treatment recommendations.",
      icon: Image,
      color: "bg-accent/10 text-accent",
      link: "/disease-detection",
    },
    {
      title: "Farming Community",
      description: "Connect with other farmers, share experiences, and learn from each other.",
      icon: Users, 
      color: "bg-secondary/10 text-secondary",
      link: "/community",
    },
    {
      title: "Growing Guides",
      description: "Access detailed guides on best practices for growing various crops.",
      icon: BookOpen,
      color: "bg-agri-brown/10 text-agri-brown",
      link: "/guide",
    },
  ];

  return (
    <div className="h-full leaf-background">
      <div className="container py-6 h-full">
        {/* Welcome section */}
        <PageHeader 
          title={`Welcome${isAuthenticated ? `, ${user?.username}` : " to Agrislove"}`}
          description="Your smart agriculture platform for sustainable and successful farming."
        />

        {/* Feature overview */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {features.map((feature) => (
            <Card key={feature.title} className="overflow-hidden hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between">
                  <div className={`p-2 rounded-md ${feature.color}`}>
                    <feature.icon size={22} />
                  </div>
                </div>
                <CardTitle className="mt-4 text-xl">{feature.title}</CardTitle>
                <CardDescription>{feature.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" asChild className="w-full group">
                  <Link to={feature.link}>
                    Explore
                    <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </section>

        {/* Seasonal tips card */}
        <section className="mb-8">
          <Card className="bg-gradient-to-br from-agri-green/90 to-agri-green-dark/90 text-white">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Leaf className="h-5 w-5" />
                <CardTitle>Seasonal Farming Tips</CardTitle>
              </div>
              <CardDescription className="text-white/80">
                Get the most out of your crops this season with these tips
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
                  <h3 className="font-medium mb-1">Soil Preparation</h3>
                  <p className="text-sm text-white/80">Test soil pH and add necessary amendments before planting.</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
                  <h3 className="font-medium mb-1">Pest Management</h3>
                  <p className="text-sm text-white/80">Monitor for seasonal pests and use natural repellents when possible.</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
                  <h3 className="font-medium mb-1">Water Conservation</h3>
                  <p className="text-sm text-white/80">Implement efficient irrigation systems to reduce water usage.</p>
                </div>
              </div>
              <Button variant="secondary" className="w-full mt-2">
                <Link to="/guide">View Complete Guide</Link>
              </Button>
            </CardContent>
          </Card>
        </section>

        {/* Getting started section for non-logged in users */}
        {!isAuthenticated && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Get Started with Agrislove</CardTitle>
              <CardDescription>Create an account to access all features and save your preferences</CardDescription>
            </CardHeader>
            <CardContent className="flex gap-4">
              <Button asChild>
                <Link to="/signup">Sign Up</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/login">Login</Link>
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
