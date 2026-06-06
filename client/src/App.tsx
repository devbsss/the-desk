import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { TradesProvider } from "./contexts/TradesContext";
import Dashboard from "./pages/Dashboard";
import NovoTrade from "./pages/NovoTrade";
import Historico from "./pages/Historico";
import Regras from "./pages/Regras";
import Layout from "./components/Layout";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Dashboard} />
      <Route path="/novo-trade" component={NovoTrade} />
      <Route path="/historico" component={Historico} />
      <Route path="/regras" component={Regras} />
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <TradesProvider>
          <TooltipProvider>
            <Toaster
              position="top-right"
              toastOptions={{
                style: {
                  background: "#0D0D0D",
                  border: "1px solid #1E1E1E",
                  color: "#E8E8E8",
                  fontFamily: "'JetBrains Mono', monospace",
                },
              }}
            />
            <Layout>
              <Router />
            </Layout>
          </TooltipProvider>
        </TradesProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
