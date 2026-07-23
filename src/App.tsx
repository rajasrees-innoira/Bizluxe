import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Route, Switch, Router as WouterRouter } from 'wouter';
import { useScrollToTop } from '@/hooks/useScrollToTop';
import Home from '@/pages/Home';
import About from '@/pages/About';
import Collections from '@/pages/Collections';
import ContactUs from '@/pages/ContactUs';
import Team from '@/pages/Team';
import OurPartners from '@/pages/OurPartners';
import NotFound from '@/pages/not-found';

const queryClient = new QueryClient();

function Router() {
  useScrollToTop();
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/collections" component={Collections} />
      <Route path="/contact" component={ContactUs} />
      <Route path="/team" component={Team} />
      <Route path="/partners" component={OurPartners} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;