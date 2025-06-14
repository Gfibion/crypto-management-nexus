
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useSkills } from "@/hooks/useSupabaseData";

const Skills = () => {
  const { data: skills, isLoading, error } = useSkills();

  // Group skills by category
  const groupedSkills = skills?.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, typeof skills>);

  const getCategoryColor = (category: string) => {
    const colors = {
      "Management": "blue",
      "ICT": "purple", 
      "Blockchain": "pink"
    };
    return colors[category as keyof typeof colors] || "gray";
  };

  if (isLoading) {
    return (
      <div className="min-h-screen pt-20 px-4 flex items-center justify-center">
        <div className="text-white text-xl">Loading skills...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen pt-20 px-4 flex items-center justify-center">
        <div className="text-red-400 text-xl">Error loading skills</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Skills & Expertise
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            A comprehensive overview of my technical competencies and professional capabilities across management, technology, and blockchain domains
          </p>
        </div>

        {/* Skills by Category */}
        <div className="space-y-12 mb-16">
          {groupedSkills && Object.entries(groupedSkills).map(([category, categorySkills]) => (
            <Card key={category} className="bg-slate-800/50 border-purple-800/30">
              <CardHeader>
                <CardTitle className="text-2xl text-white flex items-center gap-3">
                  <Badge variant="secondary" className={`bg-${getCategoryColor(category)}-800/30 text-${getCategoryColor(category)}-300`}>
                    {category}
                  </Badge>
                  <span>{category} Skills</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid lg:grid-cols-2 gap-6">
                  {categorySkills.map((skill) => (
                    <div key={skill.id} className="space-y-3">
                      <div className="flex justify-between items-center">
                        <h3 className="text-lg font-semibold text-white">{skill.name}</h3>
                        <div className="flex items-center gap-2">
                          <span className="text-purple-400 font-bold">{skill.proficiency_level}%</span>
                          {skill.years_experience && (
                            <Badge variant="outline" className="border-purple-400/30 text-purple-300 text-xs">
                              {skill.years_experience}y exp
                            </Badge>
                          )}
                        </div>
                      </div>
                      <Progress value={skill.proficiency_level} className="h-2" />
                      {skill.description && (
                        <p className="text-gray-400 text-sm">{skill.description}</p>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Skills Summary */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {Object.entries(groupedSkills || {}).map(([category, categorySkills]) => {
            const avgProficiency = Math.round(
              categorySkills.reduce((sum, skill) => sum + skill.proficiency_level, 0) / categorySkills.length
            );
            const totalExperience = categorySkills.reduce((sum, skill) => sum + (skill.years_experience || 0), 0);

            return (
              <Card key={category} className="bg-gradient-to-br from-slate-800/50 to-slate-700/50 border-purple-600/30 text-center">
                <CardContent className="p-6">
                  <div className={`text-4xl font-bold mb-2 text-${getCategoryColor(category)}-400`}>
                    {avgProficiency}%
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">{category}</h3>
                  <p className="text-gray-300 text-sm mb-2">Average Proficiency</p>
                  <div className="text-purple-300 text-sm">
                    {totalExperience}+ years combined experience
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Call to Action */}
        <Card className="bg-gradient-to-r from-purple-900/30 to-blue-900/30 border-purple-600/30">
          <CardContent className="p-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Ready to Collaborate?</h2>
            <p className="text-xl text-gray-300 mb-8">
              Let's leverage these skills to drive your business forward
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-lg font-semibold transition-all duration-300">
                Start a Project
              </button>
              <button className="px-8 py-3 border border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white rounded-lg font-semibold transition-all duration-300">
                View Services
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Skills;
