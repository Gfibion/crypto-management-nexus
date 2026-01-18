import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useEducation } from "@/hooks/useSupabaseData";
import { GraduationCap, Calendar, Award } from "lucide-react";
import LoadingSpinner from "@/components/LoadingSpinner";
import SEOHead from "@/components/SEOHead";

const Education = () => {
  const { data: education, isLoading, error } = useEducation();

  if (isLoading) {
    return (
      <div className="min-h-screen pt-20 px-4 flex items-center justify-center">
        <LoadingSpinner message="Loading education data..." size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen pt-20 px-4 flex items-center justify-center">
        <div className="text-red-400 text-xl">Error loading education</div>
      </div>
    );
  }

  return (
    <>
      <SEOHead 
        title="Gfibion Joseph Mutua Education & Qualifications | Business Management & ICT Academic Background"
        description="Discover the educational background and academic qualifications of Gfibion Joseph Mutua, professional business manager and ICT consultant. View degrees, certifications, and academic achievements in business management and technology."
        keywords="Gfibion Joseph Mutua education, business management degree, ICT qualifications, academic background, business consultant education, Kenya business graduate, management studies, technology education, professional qualifications, academic achievements"
        canonical="https://www.josephmgfibion.org/education"
        ogImage="https://www.josephmgfibion.org/og-default.png"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "EducationalOccupationalCredential",
          "name": "Gfibion Joseph Mutua Educational Background",
          "description": "Academic qualifications and educational achievements",
          "credentialCategory": "Business Management & ICT"
        }}
      />
      <div className="min-h-screen pt-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Education & Qualifications
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Academic foundation and professional certifications that shape my expertise in business management and technology
          </p>
        </div>

        {/* Education Timeline */}
        <div className="relative">
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-600 to-blue-600"></div>
          
          <div className="space-y-12">
            {education?.map((edu, index) => (
              <div key={edu.id} className="relative flex items-start">
                <div className="absolute left-6 w-4 h-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full border-4 border-slate-900"></div>
                
                <div className="ml-20 w-full">
                  <Card className="bg-slate-800/50 border-purple-800/30 hover:border-purple-600/50 transition-all duration-300 hover:transform hover:scale-105">
                    <CardHeader>
                      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                        <div>
                          <CardTitle className="text-xl text-white flex items-center gap-2 mb-2">
                            <GraduationCap className="h-6 w-6 text-purple-400" />
                            {edu.degree}
                          </CardTitle>
                          <h3 className="text-lg text-purple-300 font-semibold">{edu.institution}</h3>
                          {edu.field_of_study && (
                            <p className="text-gray-400">{edu.field_of_study}</p>
                          )}
                        </div>
                        <div className="flex flex-col items-start lg:items-end gap-2">
                          <div className="flex items-center gap-2 text-gray-300">
                            <Calendar className="h-4 w-4" />
                            <span>
                              {edu.start_year} - {edu.end_year || 'Present'}
                            </span>
                          </div>
                          {edu.grade && (
                            <Badge variant="outline" className="border-purple-400/30 text-purple-300">
                              {edu.grade}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      {edu.description && (
                        <p className="text-gray-300 mb-4">{edu.description}</p>
                      )}
                      
                      {edu.achievements && edu.achievements.length > 0 && (
                        <div>
                          <h4 className="text-purple-300 font-semibold mb-2 flex items-center gap-2">
                            <Award className="h-4 w-4" />
                            Key Achievements
                          </h4>
                          <div className="space-y-2">
                            {edu.achievements.map((achievement, achievementIndex) => (
                              <div key={achievementIndex} className="flex items-start space-x-2">
                                <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                                <span className="text-gray-300 text-sm">{achievement}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Summary Stats */}
        <div className="grid md:grid-cols-3 gap-8 mt-16 mb-16">
          <Card className="bg-slate-800/50 border-purple-800/30 text-center">
            <CardContent className="p-6">
              <div className="text-4xl font-bold text-purple-400 mb-2">
                {education?.length || 0}
              </div>
              <p className="text-gray-300">Qualifications</p>
            </CardContent>
          </Card>
          
          <Card className="bg-slate-800/50 border-purple-800/30 text-center">
            <CardContent className="p-6">
              <div className="text-4xl font-bold text-blue-400 mb-2">
                {education?.reduce((total, edu) => {
                  const years = (edu.end_year || new Date().getFullYear()) - edu.start_year;
                  return total + years;
                }, 0) || 0}
              </div>
              <p className="text-gray-300">Years of Study</p>
            </CardContent>
          </Card>
          
          <Card className="bg-slate-800/50 border-purple-800/30 text-center">
            <CardContent className="p-6">
              <div className="text-4xl font-bold text-green-400 mb-2">
                {education?.filter(edu => edu.achievements && edu.achievements.length > 0).length || 0}
              </div>
              <p className="text-gray-300">With Honors</p>
            </CardContent>
          </Card>
        </div>

        {/* Call to Action */}
        <Card className="bg-gradient-to-r from-purple-900/30 to-blue-900/30 border-purple-600/30">
          <CardContent className="p-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Continuous Learning</h2>
            <p className="text-xl text-gray-300 mb-8">
              Committed to staying at the forefront of business and technology innovation
            </p>
            <button className="px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-lg font-semibold transition-all duration-300">
              View Latest Certifications
            </button>
          </CardContent>
        </Card>
      </div>
      </div>
    </>
  );
};

export default Education;
