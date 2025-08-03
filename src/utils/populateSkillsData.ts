import { supabase } from '@/integrations/supabase/client';
import { skillsData, categoryOrder } from '@/components/skills/skillsData';

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

    // Transform static skills data to database format
    const allSkillsData = Object.entries(skillsData).flatMap(([category, skills]) =>
      skills.map(skill => ({
        name: skill.name,
        category,
        proficiency_level: skill.level,
        years_experience: 1,
        description: null,
        icon: skill.icon || 'star'
      }))
    );

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