
import { Card, CardContent } from "@/components/ui/card";
import { Star, ArrowUp, TrendingUp, Award } from "lucide-react";
import { metrics } from "./portfolioData";

const MetricsSection = () => {
  const getIcon = (iconType: string) => {
    switch (iconType) {
      case "star":
        return <Star className="h-6 w-6 animate-pulse" />;
      case "arrow-up":
        return <ArrowUp className="h-6 w-6 animate-bounce" />;
      case "dollar":
        return <div className="text-lg font-bold animate-pulse">$</div>;
      case "users":
        return <div className="text-lg font-bold animate-bounce">👥</div>;
      default:
        return <Star className="h-6 w-6 animate-pulse" />;
    }
  };

  return (
    <div className="grid md:grid-cols-4 gap-6 mb-16">
      {metrics.map((metric, index) => (
        <Card 
          key={index} 
          className="bg-slate-800/60 border-purple-800/40 text-center hover:border-red-600/60 transition-all duration-300 backdrop-blur-sm animate-fade-in group shadow-lg hover:shadow-red-500/20"
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          <CardContent className="p-6">
            <div className="text-red-400 mb-3 flex justify-center group-hover:text-red-300 transition-colors">
              {getIcon(metric.icon)}
            </div>
            <div className="text-3xl font-bold text-white mb-2 group-hover:text-red-100 transition-colors animate-pulse">
              {metric.value}
            </div>
            <p className="text-gray-300 text-sm font-medium group-hover:text-gray-200 transition-colors">
              {metric.label}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default MetricsSection;
