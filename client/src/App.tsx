import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AppProvider } from "./components/AppContext";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import Billing from "@/pages/Billing";
import Trips from "@/pages/Trips";
import Profile from "@/pages/Profile";
import Notifications from "@/pages/Notifications";
import Reports from "@/pages/Reports";
import Links from "@/pages/Links";
import PublishTrip from "@/pages/PublishTrip";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/home" component={Home} />
      <Route path="/billing" component={Billing} />
      <Route path="/trips" component={Trips} />
      <Route path="/profile" component={Profile} />
      <Route path="/notifications" component={Notifications} />
      <Route path="/reports" component={Reports} />
      <Route path="/links" component={Links} />
      <Route path="/publishtrip" component={PublishTrip} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AppProvider>
          <Toaster />
          <Router />
        </AppProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
