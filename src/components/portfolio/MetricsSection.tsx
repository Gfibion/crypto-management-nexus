
import { Card, CardContent } from "@/components/ui/card";
import { Star, ArrowUp } from "lucide-react";
import { metrics } from "./portfolioData";

const MetricsSection = () => {
  const getIcon = (iconType: string) => {
    switch (iconType) {
      case "star":
        return <Star className="h-6 w-6" />;
      case "arrow-up":
        return <ArrowUp className="h-6 w-6" />;
      case "dollar":
        return <div className="text-lg font-bold">$</div>;
      case "users":
        return <div className="text-lg font-bold">👥</div>;
      default:
        return <Star className="h-6 w-6" />;
    }
  };

  return (
    <div className="grid md:grid-cols-4 gap-6 mb-16">
      {metrics.map((metric, index) => (
        <Card key={index} className="bg-slate-800/60 border-purple-800/40 text-center hover:border-purple-600/60 transition-all duration-300 hover:transform hover:scale-105 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="text-purple-400 mb-3 flex justify-center">{getIcon(metric.icon)}</div>
            <div className="text-3xl font-bold text-white mb-2">{metric.value}</div>
            <p className="text-gray-300 text-sm font-medium">{metric.label}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default MetricsSection;
