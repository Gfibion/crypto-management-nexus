
import PortfolioHeader from "@/components/portfolio/PortfolioHeader";
import MetricsSection from "@/components/portfolio/MetricsSection";
import ProjectsSection from "@/components/portfolio/ProjectsSection";
import TestimonialsSection from "@/components/portfolio/TestimonialsSection";
import PortfolioCTA from "@/components/portfolio/PortfolioCTA";

const Portfolio = () => {
  return (
    <div className="min-h-screen pt-20 px-4 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="max-w-6xl mx-auto">
        <PortfolioHeader />
        <MetricsSection />
        <ProjectsSection />
        <TestimonialsSection />
        <PortfolioCTA />
      </div>
    </div>
  );
};

export default Portfolio;
