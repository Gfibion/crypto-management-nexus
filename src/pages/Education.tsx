
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const Education = () => {
  const education = [
    {
      year: "2023",
      degree: "Certified Blockchain Professional",
      institution: "Blockchain Training Alliance",
      description: "Advanced certification covering blockchain architecture, smart contracts, and enterprise implementations.",
      status: "Completed",
      color: "pink"
    },
    {
      year: "2021",
      degree: "AWS Certified Solutions Architect",
      institution: "Amazon Web Services",
      description: "Professional certification in cloud architecture, scalable systems, and AWS infrastructure.",
      status: "Completed",
      color: "blue"
    },
    {
      year: "2020",
      degree: "Project Management Professional (PMP)",
      institution: "Project Management Institute",
      description: "Global standard for project management professionals with focus on leadership and strategy.",
      status: "Completed",
      color: "purple"
    },
    {
      year: "2018",
      degree: "Master of Business Administration (MBA)",
      institution: "University of Business Excellence",
      description: "Specialized in Strategic Management and Technology Innovation with focus on emerging markets.",
      status: "Completed",
      color: "blue"
    },
    {
      year: "2015",
      degree: "Bachelor of Science in Information Technology",
      institution: "Tech University",
      description: "Comprehensive program covering software development, database management, and system analysis.",
      status: "Completed",
      color: "purple"
    }
  ];

  const continuingEducation = [
    "Advanced Cryptocurrency Trading Strategies",
    "DeFi Protocol Development",
    "Smart Contract Security Auditing",
    "Machine Learning for Business Applications",
    "Digital Transformation Leadership",
    "Agile and Scrum Methodologies"
  ];

  return (
    <div className="min-h-screen pt-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Education & Qualifications
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Continuous learning journey combining formal education with industry certifications
          </p>
        </div>

        {/* Timeline Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12 text-white">Academic Journey</h2>
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500"></div>
            
            <div className="space-y-8">
              {education.map((item, index) => (
                <div key={index} className="relative flex items-start space-x-8">
                  {/* Timeline dot */}
                  <div className={`relative z-10 w-16 h-16 rounded-full bg-gradient-to-r from-${item.color}-500 to-${item.color}-600 flex items-center justify-center flex-shrink-0`}>
                    <span className="text-white font-bold text-sm">{item.year}</span>
                  </div>
                  
                  {/* Content */}
                  <Card className="flex-1 bg-slate-800/50 border-purple-800/30 hover:border-purple-600/50 transition-all duration-300 hover:transform hover:scale-105">
                    <CardHeader>
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div>
                          <CardTitle className="text-xl text-white mb-2">{item.degree}</CardTitle>
                          <p className={`text-${item.color}-400 font-semibold`}>{item.institution}</p>
                        </div>
                        <Badge variant="secondary" className={`bg-${item.color}-800/30 text-${item.color}-300 w-fit`}>
                          {item.status}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-300">{item.description}</p>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Continuing Education */}
        <Card className="bg-slate-800/50 border-purple-800/30 mb-16">
          <CardHeader>
            <CardTitle className="text-2xl text-white text-center">Continuing Education</CardTitle>
            <p className="text-gray-400 text-center">Ongoing professional development and specialization courses</p>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {continuingEducation.map((course, index) => (
                <div key={index} className="p-4 rounded-lg bg-gradient-to-br from-slate-700/30 to-slate-600/30 hover:from-slate-700/50 hover:to-slate-600/50 transition-all duration-300 border border-purple-800/20 hover:border-purple-600/40">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full"></div>
                    <span className="text-gray-300 text-sm">{course}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Key Achievements */}
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="bg-gradient-to-br from-blue-900/30 to-purple-900/30 border-blue-600/30 text-center">
            <CardContent className="p-6">
              <div className="text-4xl font-bold text-blue-400 mb-2">15+</div>
              <p className="text-gray-300">Professional Certifications</p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 border-purple-600/30 text-center">
            <CardContent className="p-6">
              <div className="text-4xl font-bold text-purple-400 mb-2">500+</div>
              <p className="text-gray-300">Hours of Continued Learning</p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-pink-900/30 to-blue-900/30 border-pink-600/30 text-center">
            <CardContent className="p-6">
              <div className="text-4xl font-bold text-pink-400 mb-2">3.9</div>
              <p className="text-gray-300">Average GPA</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Education;
