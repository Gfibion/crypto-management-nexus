
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import SkillCard from "./SkillCard";
import { getCategoryIcon } from "./SkillIcons";
import { getCategoryColor } from "./skillsData";

interface SkillCategoryProps {
  category: string;
  skills: Array<{
    id: string;
    name: string;
    category: string;
    description?: string;
    proficiency_level: number;
    years_experience?: number;
    icon?: string;
    competencies?: string[];
  }>;
}

const SkillCategory = ({ category, skills }: SkillCategoryProps) => {
  const categoryColor = getCategoryColor(category);

  return (
    <Card className="bg-slate-800/50 border-purple-800/30">
      <CardHeader>
        <CardTitle className="text-2xl text-white flex items-center gap-3">
          <div className={`p-2 bg-${categoryColor}-800/30 rounded-lg text-${categoryColor}-300`}>
            {getCategoryIcon(category)}
          </div>
          <span>{category}</span>
          <Badge variant="secondary" className={`bg-${categoryColor}-800/30 text-${categoryColor}-300 ml-auto`}>
            {skills.length} Skills
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid lg:grid-cols-2 gap-6">
          {skills.map((skill) => (
            <SkillCard key={skill.id} skill={skill} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default SkillCategory;
