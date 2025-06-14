
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, ArrowUp } from "lucide-react";

const Portfolio = () => {
  const projects = [
    {
      title: "Enterprise Blockchain Integration",
      category: "Blockchain",
      description: "Led the implementation of a comprehensive blockchain solution for supply chain management, reducing operational costs by 30%.",
      technologies: ["Ethereum", "Smart Contracts", "Web3.js", "Solidity"],
      achievements: ["30% cost reduction", "Improved transparency", "Automated processes"],
      status: "Completed",
      year: "2023",
      color: "purple"
    },
    {
      title: "Digital Transformation Initiative",
      category: "Technology",
      description: "Orchestrated complete digital overhaul for mid-size manufacturing company, modernizing legacy systems and processes.",
      technologies: ["Cloud Migration", "API Integration", "Process Automation", "Data Analytics"],
      achievements: ["40% efficiency gain", "Reduced manual errors", "Real-time reporting"],
      status: "Completed",
      year: "2023",
      color: "blue"
    },
    {
      title: "DeFi Protocol Development",
      category: "Cryptocurrency",
      description: "Designed and managed development of decentralized finance protocol focusing on yield farming and liquidity provision.",
      technologies: ["DeFi", "Yield Farming", "Liquidity Pools", "Token Economics"],
      achievements: ["$2M+ TVL", "Security audited", "Multi-chain support"],
      status: "Ongoing",
      year: "2024",
      color: "pink"
    },
    {
      title: "Multi-Site Operations Optimization",
      category: "Management",
      description: "Streamlined operations across 15 locations, implementing unified processes and performance metrics.",
      technologies: ["Process Management", "KPI Dashboards", "Team Training", "Quality Systems"],
      achievements: ["25% productivity increase", "Standardized processes", "Enhanced quality control"],
      status: "Completed",
      year: "2022",
      color: "green"
    },
    {
      title: "Cryptocurrency Treasury Management",
      category: "Cryptocurrency",
      description: "Developed comprehensive crypto treasury strategy for tech startup, managing digital asset portfolio and hedging risks.",
      technologies: ["Portfolio Management", "Risk Assessment", "DeFi Integration", "Compliance"],
      achievements: ["35% portfolio growth", "Risk mitigation", "Regulatory compliance"],
      status: "Completed",
      year: "2023",
      color: "pink"
    },
    {
      title: "Smart Contract Audit Platform",
      category: "Blockchain",
      description: "Created automated smart contract auditing platform to identify vulnerabilities and ensure security best practices.",
      technologies: ["Static Analysis", "Security Patterns", "Automated Testing", "Reporting"],
      achievements: ["99% accuracy rate", "Reduced audit time", "Enhanced security"],
      status: "Completed",
      year: "2023",
      color: "purple"
    }
  ];

  const metrics = [
    { label: "Projects Completed", value: "50+", icon: <Star className="h-6 w-6" /> },
    { label: "Client Satisfaction", value: "98%", icon: <ArrowUp className="h-6 w-6" /> },
    { label: "Total Value Delivered", value: "$5M+", icon: <div className="text-lg font-bold">$</div> },
    { label: "Team Members Led", value: "200+", icon: <div className="text-lg font-bold">👥</div> }
  ];

  const testimonials = [
    {
      quote: "Outstanding leadership in our blockchain transformation. The results exceeded expectations.",
      author: "Sarah Johnson",
      role: "CTO, TechCorp",
      company: "TechCorp"
    },
    {
      quote: "Exceptional project management skills and deep understanding of emerging technologies.",
      author: "Michael Chen",
      role: "CEO, InnovateCo",
      company: "InnovateCo"
    },
    {
      quote: "The digital transformation project was delivered on time and under budget. Impressive results.",
      author: "Lisa Rodriguez",
      role: "Operations Director",
      company: "ManufacturingPlus"
    }
  ];

  return (
    <div className="min-h-screen pt-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Portfolio & Projects
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Showcasing successful implementations across business management, technology integration, and blockchain innovation
          </p>
        </div>

        {/* Metrics Section */}
        <div className="grid md:grid-cols-4 gap-6 mb-16">
          {metrics.map((metric, index) => (
            <Card key={index} className="bg-slate-800/50 border-purple-800/30 text-center hover:border-purple-600/50 transition-all duration-300">
              <CardContent className="p-6">
                <div className="text-purple-400 mb-2 flex justify-center">{metric.icon}</div>
                <div className="text-3xl font-bold text-white mb-2">{metric.value}</div>
                <p className="text-gray-300 text-sm">{metric.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12 text-white">Featured Projects</h2>
          <div className="grid lg:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <Card key={index} className="bg-slate-800/50 border-purple-800/30 hover:border-purple-600/50 transition-all duration-300 hover:transform hover:scale-105">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="secondary" className={`bg-${project.color}-800/30 text-${project.color}-300`}>
                      {project.category}
                    </Badge>
                    <div className="flex items-center gap-2">
                      <Badge variant={project.status === 'Completed' ? 'default' : 'secondary'} className="text-xs">
                        {project.status}
                      </Badge>
                      <span className="text-gray-400 text-sm">{project.year}</span>
                    </div>
                  </div>
                  <CardTitle className="text-xl text-white">{project.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 mb-4">{project.description}</p>
                  
                  <div className="mb-4">
                    <h4 className="text-purple-300 font-semibold mb-2">Technologies Used:</h4>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, techIndex) => (
                        <Badge key={techIndex} variant="outline" className="border-purple-400/30 text-purple-200 text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="mb-4">
                    <h4 className="text-purple-300 font-semibold mb-2">Key Achievements:</h4>
                    <div className="space-y-1">
                      {project.achievements.map((achievement, achievementIndex) => (
                        <div key={achievementIndex} className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                          <span className="text-gray-300 text-sm">{achievement}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Button variant="outline" className="w-full border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white">
                    View Case Study
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12 text-white">Client Testimonials</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-slate-800/50 border-purple-800/30 hover:border-purple-600/50 transition-all duration-300">
                <CardContent className="p-6">
                  <div className="text-4xl text-purple-400 mb-4">"</div>
                  <p className="text-gray-300 mb-4 italic">{testimonial.quote}</p>
                  <div className="border-t border-purple-800/30 pt-4">
                    <p className="text-white font-semibold">{testimonial.author}</p>
                    <p className="text-purple-300 text-sm">{testimonial.role}</p>
                    <p className="text-gray-400 text-sm">{testimonial.company}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <Card className="bg-gradient-to-r from-purple-900/30 to-blue-900/30 border-purple-600/30">
          <CardContent className="p-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Ready to Start Your Project?</h2>
            <p className="text-xl text-gray-300 mb-8">
              Let's discuss how we can bring similar success to your organization
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white border-0">
                Schedule Consultation
              </Button>
              <Button variant="outline" size="lg" className="border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white">
                Download Portfolio PDF
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Portfolio;
