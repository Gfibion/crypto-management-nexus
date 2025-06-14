
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";

const ProcessSection: React.FC = () => {
  const processSteps = [
    { step: "01", title: "Discovery", description: "Deep dive analysis of your business needs and technical requirements" },
    { step: "02", title: "Strategy", description: "Custom solution design with clear timelines and deliverables" },
    { step: "03", title: "Implementation", description: "Agile development and deployment with regular progress updates" },
    { step: "04", title: "Optimization", description: "Performance monitoring, support, and continuous improvement" }
  ];

  return (
    <Card className="bg-gradient-to-r from-purple-900/30 to-blue-900/30 border-purple-600/30 mb-16">
      <CardContent className="p-8">
        <h2 className="text-3xl font-bold text-center text-white mb-12">Our Proven Process</h2>
        <div className="grid md:grid-cols-4 gap-8">
          {processSteps.map((process, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl font-bold text-purple-400 mb-4">{process.step}</div>
              <h3 className="text-xl font-semibold text-white mb-2">{process.title}</h3>
              <p className="text-gray-300 text-sm">{process.description}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProcessSection;
