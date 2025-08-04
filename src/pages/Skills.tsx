
import { useSkills } from "@/hooks/useSupabaseData";
import { categoryOrder } from "@/components/skills/skillsData";
import { populateSkillsData } from "@/utils/populateSkillsData";
import { useEffect } from "react";
import SkillCategory from "@/components/skills/SkillCategory";
import SkillsSummary from "@/components/skills/SkillsSummary";
import ActionCards from "@/components/skills/ActionCards";
import SkillsCTA from "@/components/skills/SkillsCTA";
import LoadingSpinner from "@/components/LoadingSpinner";
import ConsultationLinks from "@/components/services/ConsultationLinks";

const Skills = () => {
  const { data: skills, isLoading, error } = useSkills();

  useEffect(() => {
    // Populate skills data if not exists
    populateSkillsData().catch(console.error);
  }, []);

  // Use skills from database or provide fallback data
  const allSkills = skills && skills.length > 0 
    ? skills 
    : [
        { name: "Strategic Planning", category: "Management", proficiency_level: 85, icon: "target" },
        { name: "Project Management", category: "Management", proficiency_level: 90, icon: "users" },
        { name: "Financial Analysis", category: "Financial", proficiency_level: 85, icon: "trending-up" },
        { name: "Web Development", category: "ICT", proficiency_level: 80, icon: "code" },
        { name: "Business Development", category: "Entrepreneurship", proficiency_level: 75, icon: "rocket" }
      ];

  const groupedSkills = allSkills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, any[]>);

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
        <LoadingSpinner message="Loading skills..." size="lg" />
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
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
            Comprehensive Skills & Expertise Portfolio
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Proven competencies across {sortedCategories.length} key domains: business management, financial strategy, 
            entrepreneurship, strategic planning, and cutting-edge technology solutions.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 max-w-2xl mx-auto mb-8">
            {sortedCategories.map((category) => (
              <div key={category} className="text-center p-3 bg-slate-800/50 rounded-lg border border-purple-600/30">
                <div className="text-lg font-bold text-white">{groupedSkills[category]?.length || 0}</div>
                <div className="text-sm text-gray-300">{category}</div>
              </div>
            ))}
          </div>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-400 to-blue-400 mx-auto"></div>
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

        {/* Consultation Links Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-white mb-8">
            Leverage My Expertise
          </h2>
          <p className="text-gray-300 text-center mb-8 max-w-2xl mx-auto">
            Ready to apply these skills to your business? Get personalized consultation 
            tailored to your specific challenges and goals.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <ConsultationLinks serviceName="Business Consulting" />
            <ConsultationLinks serviceName="Strategic Planning" />
            <ConsultationLinks serviceName="Technology Solutions" />
          </div>
        </div>

        {/* Action Cards */}
        <ActionCards />

        {/* Call to Action */}
        <SkillsCTA />
      </div>
    </div>
  );
};

export default Skills;
