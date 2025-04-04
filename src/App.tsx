
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { Layout } from "@/components/layout/Layout";

// Pages
import Dashboard from "./pages/Dashboard";
import Assistant from "./pages/Assistant";
import DiseaseDetection from "./pages/DiseaseDetection";
import Community from "./pages/Community";
import Guide from "./pages/Guide";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route
              path="/"
              element={
                <Layout>
                  <Dashboard />
                </Layout>
              }
            />
            <Route
              path="/assistant"
              element={
                <Layout>
                  <Assistant />
                </Layout>
              }
            />
            <Route
              path="/disease-detection"
              element={
                <Layout>
                  <DiseaseDetection />
                </Layout>
              }
            />
            <Route
              path="/community"
              element={
                <Layout>
                  <Community />
                </Layout>
              }
            />
            <Route
              path="/guide"
              element={
                <Layout>
                  <Guide />
                </Layout>
              }
            />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
