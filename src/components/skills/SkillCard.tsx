
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Star } from "lucide-react";
import { getSkillIcon } from "./SkillIcons";
import { getCategoryColor } from "./skillsData";

interface SkillCardProps {
  skill: {
    id: string;
    name: string;
    category: string;
    description?: string;
    proficiency_level: number;
    years_experience?: number;
    icon?: string;
    competencies?: string[];
  };
}

const SkillCard = ({ skill }: SkillCardProps) => {
  const categoryColor = getCategoryColor(skill.category);

  return (
    <div className="space-y-3 p-4 bg-slate-700/30 rounded-lg border border-slate-600/30">
      <div className="flex items-start gap-3">
        {skill.icon && (
          <div className={`text-${categoryColor}-400 mt-1`}>
            {getSkillIcon(skill.icon)}
          </div>
        )}
        <div className="flex-1">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-lg font-semibold text-white">{skill.name}</h3>
            <div className="flex items-center gap-2">
              <span className={`text-${categoryColor}-400 font-bold`}>
                {skill.proficiency_level}%
              </span>
              {skill.years_experience && (
                <Badge variant="outline" className={`border-${categoryColor}-400/30 text-${categoryColor}-300 text-xs`}>
                  {skill.years_experience}y exp
                </Badge>
              )}
            </div>
          </div>
          <Progress value={skill.proficiency_level} className="h-2 mb-3" />
          {skill.description && (
            <p className="text-gray-400 text-sm mb-3">{skill.description}</p>
          )}
          {skill.competencies && (
            <>
              <h4 className="text-white font-medium mb-2 text-sm">Key Competencies:</h4>
              <div className="grid grid-cols-2 gap-1">
                {skill.competencies.map((competency: string, idx: number) => (
                  <div key={idx} className="flex items-center text-xs">
                    <Star className={`h-3 w-3 mr-2 text-${categoryColor}-400`} />
                    <span className="text-gray-300">{competency}</span>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SkillCard;
