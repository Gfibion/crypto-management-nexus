
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
    <div className="space-y-2 sm:space-y-3 p-3 sm:p-4 bg-slate-700/30 rounded-lg border border-slate-600/30">
      <div className="flex items-start gap-2 sm:gap-3">
        {skill.icon && (
          <div className={`text-${categoryColor}-400 mt-1 text-sm sm:text-base`}>
            {getSkillIcon(skill.icon)}
          </div>
        )}
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-start mb-1 sm:mb-2">
            <h3 className="text-xs sm:text-base font-medium text-purple-200 leading-tight pr-2 flex-1">{skill.name}</h3>
            <div className="flex items-center gap-1 sm:gap-2 shrink-0">
              <span className={`text-${categoryColor}-400 font-bold text-xs sm:text-sm`}>
                {skill.proficiency_level}%
              </span>
              {skill.years_experience && (
                <Badge variant="outline" className={`border-${categoryColor}-400/30 text-${categoryColor}-300 text-xs hidden sm:inline-flex`}>
                  {skill.years_experience}y exp
                </Badge>
              )}
            </div>
          </div>
          <Progress value={skill.proficiency_level} className="h-1.5 sm:h-2 mb-2 sm:mb-3" />
          {skill.description && (
            <p className="text-gray-400 text-xs sm:text-sm mb-2 sm:mb-3 line-clamp-2">{skill.description}</p>
          )}
          {skill.competencies && (
            <>
              <h4 className="text-white font-medium mb-1 sm:mb-2 text-xs sm:text-sm">Key Skills:</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-0.5 sm:gap-1">
                {skill.competencies.slice(0, 4).map((competency: string, idx: number) => (
                  <div key={idx} className="flex items-center text-xs">
                    <Star className={`h-2.5 w-2.5 sm:h-3 sm:w-3 mr-1 sm:mr-2 text-${categoryColor}-400 shrink-0`} />
                    <span className="text-gray-300 truncate">{competency}</span>
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
