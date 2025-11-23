import { supabase } from '@/integrations/supabase/client';
import { businessManagementServices, ictTechnologyServices } from '@/components/services/serviceData';
import { skillsData } from '@/components/skills/skillsData';

export const populateAdminServicesData = async () => {
  try {
    // Import and use the main populateServicesData function which handles upsert
    const populateServicesData = (await import('@/utils/populateServicesData')).populateServicesData;
    return await populateServicesData();
  } catch (error) {
    console.error('Error in populateAdminServicesData:', error);
    throw error;
  }
};

export const populateAdminSkillsData = async () => {
  try {
    // Check if skills already exist
    const { data: existingSkills } = await supabase
      .from('skills')
      .select('id');
    
    if (existingSkills && existingSkills.length > 0) {
      console.log('Skills already populated');
      return;
    }
    
    // Convert skillsData to database format
    const allSkills = Object.entries(skillsData).flatMap(([category, skills]) => 
      skills.map(skill => ({
        name: skill.name,
        category,
        proficiency_level: skill.level,
        icon: skill.icon,
        description: skill.description,
        years_experience: 1 // Default value
      }))
    );
    
    const { error } = await supabase
      .from('skills')
      .insert(allSkills);
    
    if (error) {
      console.error('Error populating skills:', error);
    } else {
      console.log('Skills populated successfully');
    }
  } catch (error) {
    console.error('Error in populateAdminSkillsData:', error);
  }
};

export const populateAllAdminData = async () => {
  await populateAdminServicesData();
  await populateAdminSkillsData();
};