
import PortfolioHeader from "@/components/portfolio/PortfolioHeader";
import MetricsSection from "@/components/portfolio/MetricsSection";
import ProjectsSection from "@/components/portfolio/ProjectsSection";
import TestimonialsSection from "@/components/portfolio/TestimonialsSection";
import PortfolioCTA from "@/components/portfolio/PortfolioCTA";
import PageLayout from "@/components/PageLayout";
import SEOHead from "@/components/SEOHead";
import ReferralShare from "@/components/ReferralShare";

const Portfolio = () => {
  return (
    <>
      <SEOHead 
        title="Gfibion Joseph Mutua Portfolio - Business Management & ICT Projects | Professional Work Showcase"
        description="Explore the professional portfolio of Gfibion Joseph Mutua featuring business management projects, ICT consulting work, strategic planning implementations, and academic achievements. View case studies and project outcomes from an emerging business professional."
        keywords="Gfibion Joseph Mutua portfolio, business management projects, ICT consulting portfolio, strategic planning case studies, business consultant work examples, technology integration projects, professional portfolio Kenya, business strategy implementations, digital transformation projects, academic business projects"
        ogImage="/og-portfolio.png"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "CreativeWork",
          "name": "Gfibion Joseph Mutua Professional Portfolio",
          "description": "Professional portfolio showcasing business management and ICT consulting projects",
          "author": {
            "@type": "Person",
            "name": "Gfibion Joseph Mutua"
          }
        }}
      />
      <PageLayout className="bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="max-w-6xl mx-auto px-4">
        <PortfolioHeader />
        <MetricsSection />
        <ProjectsSection />
        <TestimonialsSection />
        <PortfolioCTA />
        <ReferralShare className="mt-8" />
      </div>
      </PageLayout>
    </>
  );
};

export default Portfolio;
