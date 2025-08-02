import { supabase } from '@/integrations/supabase/client';
import { managementSkills, ictSkills, financialSkills, entrepreneurshipSkills, strategySkills } from '@/components/skills/skillsData';

export const populateSkillsData = async () => {
  try {
    // First, check if skills already exist
    const { data: existingSkills } = await supabase
      .from('skills')
      .select('id')
      .limit(1);

    if (existingSkills && existingSkills.length > 0) {
      console.log('Skills already exist in database');
      return;
    }

    // Prepare skills data for database insertion
    const allSkillsData = [
      ...managementSkills,
      ...ictSkills,
      ...financialSkills,
      ...entrepreneurshipSkills,
      ...strategySkills
    ].map(skill => ({
      name: skill.name,
      category: skill.category,
      proficiency_level: skill.proficiency_level,
      years_experience: skill.years_experience,
      description: null,
      icon: skill.icon
    }));

    // Insert skills into database
    const { error } = await supabase
      .from('skills')
      .insert(allSkillsData);

    if (error) {
      console.error('Error populating skills data:', error);
      throw error;
    }

    console.log('Skills data populated successfully');
  } catch (error) {
    console.error('Failed to populate skills data:', error);
    throw error;
  }
};