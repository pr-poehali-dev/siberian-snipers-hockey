
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Tickets from "./pages/Tickets";
import Shop from "./pages/Shop";
import PlayerStats from "./pages/PlayerStats";
import News from "./pages/News";
import Admin from "./pages/Admin";
import Streams from "./pages/Streams";
import Budget from "./pages/Budget";
import NotFound from "./pages/NotFound";
import Snowfall from "./components/Snowfall";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <Snowfall />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/tickets" element={<Tickets />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/player/:id" element={<PlayerStats />} />
          <Route path="/news" element={<News />} />
          <Route path="/streams" element={<Streams />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/budget" element={<Budget />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;