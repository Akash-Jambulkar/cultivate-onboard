import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppLayout } from "@/components/layout/AppLayout";
import { Dashboard } from "@/pages/Dashboard";
import { RoleExpectations } from "@/pages/pre-onboarding/RoleExpectations";
import { ITTutorial } from "@/pages/pre-onboarding/ITTutorial";
import { Documents } from "@/pages/pre-onboarding/Documents";
import { WelcomeKit } from "@/pages/pre-onboarding/WelcomeKit";
import { Simulations } from "@/pages/onboarding/Simulations";
import { Birthdays } from "@/pages/onboarding/Birthdays";
import { Feedback } from "@/pages/onboarding/Feedback";
import { TeamStructure } from "@/pages/onboarding/TeamStructure";
import { Culture } from "@/pages/onboarding/Culture";
import { Learning } from "@/pages/post-onboarding/Learning";
import { Mentorship } from "@/pages/post-onboarding/Mentorship";
import { Performance } from "@/pages/post-onboarding/Performance";
import { Wellness } from "@/pages/post-onboarding/Wellness";
import { Career } from "@/pages/post-onboarding/Career";
import { Stories } from "@/pages/community/Stories";
import { Events } from "@/pages/community/Events";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/pre-onboarding/role" element={<RoleExpectations />} />
            <Route path="/pre-onboarding/it-tutorial" element={<ITTutorial />} />
            <Route path="/pre-onboarding/documents" element={<Documents />} />
            <Route path="/pre-onboarding/welcome-kit" element={<WelcomeKit />} />
            <Route path="/onboarding/simulations" element={<Simulations />} />
            <Route path="/onboarding/birthdays" element={<Birthdays />} />
            <Route path="/onboarding/feedback" element={<Feedback />} />
            <Route path="/onboarding/team" element={<TeamStructure />} />
            <Route path="/onboarding/culture" element={<Culture />} />
            <Route path="/post-onboarding/learning" element={<Learning />} />
            <Route path="/post-onboarding/mentorship" element={<Mentorship />} />
            <Route path="/post-onboarding/performance" element={<Performance />} />
            <Route path="/post-onboarding/wellness" element={<Wellness />} />
            <Route path="/post-onboarding/career" element={<Career />} />
            <Route path="/community/stories" element={<Stories />} />
            <Route path="/community/events" element={<Events />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
