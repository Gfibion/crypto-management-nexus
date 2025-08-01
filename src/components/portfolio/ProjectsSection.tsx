
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle, Clock } from "lucide-react";
import { projects } from "./portfolioData";

const ProjectsSection = () => {
  const getStatusBadge = (status: string) => {
    const isCompleted = status === 'Completed';
    return (
      <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${
        isCompleted 
          ? 'bg-green-800 text-white border border-green-600' 
          : 'bg-orange-800 text-white border border-orange-600'
      }`}>
        {isCompleted ? (
          <CheckCircle className="h-4 w-4" />
        ) : (
          <Clock className="h-4 w-4" />
        )}
        {status}
      </div>
    );
  };

  return (
    <div className="mb-16">
      <h2 className="text-3xl font-bold text-center mb-12 text-white">Featured Projects</h2>
      <div className="grid lg:grid-cols-2 gap-8">
        {projects.map((project, index) => (
          <Card key={index} className="bg-slate-800/60 border-purple-800/40 hover:border-purple-600/60 transition-all duration-300 backdrop-blur-sm shadow-xl">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between mb-3">
                <Badge variant="secondary" className={`bg-${project.color}-800/40 text-${project.color}-300 border-${project.color}-600/30`}>
                  {project.category}
                </Badge>
                <div className="flex items-center gap-3">
                  {getStatusBadge(project.status)}
                  <span className="text-gray-400 text-sm font-medium">{project.year}</span>
                </div>
              </div>
              <CardTitle className="text-xl text-white leading-tight">{project.title}</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-gray-300 mb-5 leading-relaxed">{project.description}</p>
              
              <div className="mb-5">
                <h4 className="text-purple-300 font-semibold mb-3 text-sm uppercase tracking-wide">Technologies Used:</h4>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, techIndex) => (
                    <Badge key={techIndex} variant="outline" className="border-purple-400/40 text-purple-200 text-xs bg-purple-900/20 hover:bg-purple-800/30 transition-colors">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <h4 className="text-purple-300 font-semibold mb-3 text-sm uppercase tracking-wide">Key Achievements:</h4>
                <div className="space-y-2">
                  {project.achievements.map((achievement, achievementIndex) => (
                    <div key={achievementIndex} className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-purple-400 rounded-full flex-shrink-0"></div>
                      <span className="text-gray-300 text-sm">{achievement}</span>
                    </div>
                  ))}
                </div>
              </div>

              <Button variant="outline" className="w-full border-purple-400/60 text-purple-400 hover:bg-purple-400 hover:text-white transition-all duration-200 font-medium">
                View Case Study
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ProjectsSection;
