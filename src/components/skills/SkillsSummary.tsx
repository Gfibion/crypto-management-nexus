
import { Card, CardContent } from "@/components/ui/card";
import { getCategoryIcon } from "./SkillIcons";
import { getCategoryColor } from "./skillsData";

interface SkillsSummaryProps {
  groupedSkills: Record<string, any[]>;
  sortedCategories: string[];
}

const SkillsSummary = ({ groupedSkills, sortedCategories }: SkillsSummaryProps) => {
  return (
    <div className="grid md:grid-cols-4 gap-8 mb-16">
      {sortedCategories.map((category) => {
        const categorySkills = groupedSkills[category];
        const avgProficiency = Math.round(
          categorySkills.reduce((sum, skill) => sum + skill.proficiency_level, 0) / categorySkills.length
        );
        const totalExperience = categorySkills.reduce((sum, skill) => sum + (skill.years_experience || 0), 0);
        const categoryColor = getCategoryColor(category);

        return (
          <Card key={category} className="bg-gradient-to-br from-slate-800/50 to-slate-700/50 border-purple-600/30 text-center">
            <CardContent className="p-6">
              <div className="mb-4">
                <div className={`mx-auto w-fit p-3 bg-${categoryColor}-800/30 rounded-full mb-3`}>
                  <div className={`text-${categoryColor}-400`}>
                    {getCategoryIcon(category)}
                  </div>
                </div>
              </div>
              <div className={`text-4xl font-bold mb-2 text-${categoryColor}-400`}>
                {avgProficiency}%
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">{category}</h3>
              <p className="text-gray-300 text-sm mb-2">Average Proficiency</p>
              {totalExperience > 0 && (
                <div className="text-purple-300 text-sm">
                  {totalExperience}+ years combined experience
                </div>
              )}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default SkillsSummary;
