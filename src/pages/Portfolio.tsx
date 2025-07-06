
import PortfolioHeader from "@/components/portfolio/PortfolioHeader";
import MetricsSection from "@/components/portfolio/MetricsSection";
import ProjectsSection from "@/components/portfolio/ProjectsSection";
import TestimonialsSection from "@/components/portfolio/TestimonialsSection";
import PortfolioCTA from "@/components/portfolio/PortfolioCTA";
import PageLayout from "@/components/PageLayout";

const Portfolio = () => {
  return (
    <PageLayout className="bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="max-w-6xl mx-auto px-4">
        <PortfolioHeader />
        <MetricsSection />
        <ProjectsSection />
        <TestimonialsSection />
        <PortfolioCTA />
      </div>
    </PageLayout>
  );
};

export default Portfolio;
