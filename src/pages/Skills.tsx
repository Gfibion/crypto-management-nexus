
import { useSkills } from "@/hooks/useSupabaseData";
import { managementSkills, ictSkills, financialSkills, categoryOrder } from "@/components/skills/skillsData";
import SkillCategory from "@/components/skills/SkillCategory";
import SkillsSummary from "@/components/skills/SkillsSummary";
import ActionCards from "@/components/skills/ActionCards";
import SkillsCTA from "@/components/skills/SkillsCTA";

const Skills = () => {
  const { data: skills, isLoading, error } = useSkills();

  // Filter out the specified skills from database skills and group by category
  const filteredDatabaseSkills = (skills || []).filter(skill => {
    const skillsToRemove = [
      "Business Strategy", "Project Management", "Team Leadership",
      "React", "Javascript", "Python", "Node.js"
    ];
    return !skillsToRemove.some(removeSkill => 
      skill.name.toLowerCase().includes(removeSkill.toLowerCase())
    );
  });

  // Group skills by category with custom order
  const allSkills = [
    ...managementSkills,
    ...ictSkills,
    ...financialSkills,
    ...filteredDatabaseSkills
  ];

  const groupedSkills = allSkills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, typeof allSkills>);

  // Sort categories according to the specified order
  const sortedCategories = Object.keys(groupedSkills).sort((a, b) => {
    const indexA = categoryOrder.indexOf(a);
    const indexB = categoryOrder.indexOf(b);
    if (indexA === -1) return 1;
    if (indexB === -1) return -1;
    return indexA - indexB;
  });

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
            Comprehensive Skills & Expertise Portfolio
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Proven competencies in business management, financial strategy, entrepreneurship, strategic planning, and cutting-edge technology solutions
          </p>
        </div>

        {/* Skills by Category - Ordered */}
        <div className="space-y-12 mb-16">
          {sortedCategories.map((category) => (
            <SkillCategory
              key={category}
              category={category}
              skills={groupedSkills[category]}
            />
          ))}
        </div>

        {/* Skills Summary */}
        <SkillsSummary groupedSkills={groupedSkills} sortedCategories={sortedCategories} />

        {/* Action Cards */}
        <ActionCards />

        {/* Call to Action */}
        <SkillsCTA />
      </div>
    </div>
  );
};

export default Skills;
