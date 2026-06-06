import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import { useState, useEffect } from "react";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { TradesProvider } from "./contexts/TradesContext";
import Dashboard from "./pages/Dashboard";
import NovoTrade from "./pages/NovoTrade";
import Historico from "./pages/Historico";
import Regras from "./pages/Regras";
import Janelas from "./pages/Janelas";
import Analista from "./pages/Analista";
import Academia from "./pages/Academia";
import Layout from "./components/Layout";

function SplashScreen({ onDone }: { onDone: () => void }) {
  useEffect(() => {
    const timer = setTimeout(onDone, 1200);
    return () => clearTimeout(timer);
  }, [onDone]);

  return (
    <div className="fixed inset-0 bg-[#000000] z-[99999] flex items-center justify-center">
      <div className="text-center animate-fade-in-up">
        <h1 className="font-mono-title text-2xl font-semibold text-[#E8E8E8] tracking-tight">
          THE DESK
        </h1>
        <div className="mt-2 w-8 h-[1px] bg-[#2E2E2E] mx-auto" />
      </div>
    </div>
  );
}
function Router() {
  // make sure to consider if you need authentication for certain routes
  return (
    <Switch>
      <Route path="/" component={Dashboard} />
      <Route path="/novo-trade" component={NovoTrade} />
      <Route path="/historico" component={Historico} />
      <Route path="/janelas" component={Janelas} />
      <Route path="/regras" component={Regras} />
      <Route path="/analista" component={Analista} />
      <Route path="/academia" component={Academia} />
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const [showSplash, setShowSplash] = useState(() => {
    const shown = sessionStorage.getItem("thedesk_splash_shown");
    return !shown;
  });

  const handleSplashDone = () => {
    setShowSplash(false);
    sessionStorage.setItem("thedesk_splash_shown", "1");
  };

  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <TradesProvider>
          <TooltipProvider>
            <Toaster
              position="top-right"
              toastOptions={{
                style: {
                  background: "#0A0A0A",
                  border: "1px solid #1E1E1E",
                  color: "#E8E8E8",
                  fontFamily: "'IBM Plex Mono', monospace",
                  borderRadius: "2px",
                },
              }}
            />
            {showSplash && <SplashScreen onDone={handleSplashDone} />}
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
