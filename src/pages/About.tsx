
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import SEOHead from "@/components/SEOHead";

const About = () => {
  return (
    <>
      <SEOHead 
        title="About Gfibion Joseph Mutua - Professional Business Manager & ICT Consultant"
        description="Learn about Gfibion Joseph Mutua, emerging business professional and tech enthusiast specializing in strategic management, digital innovation, and technology integration. Fresh graduate with modern business knowledge."
        keywords="Gfibion Joseph Mutua, about, business professional, tech enthusiast, strategic management, digital innovation, technology integration, fresh graduate, business management, ICT specialist"
        ogImage="https://josephmgfibion.org/og-default.png"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "Person",
          "name": "Gfibion Joseph Mutua",
          "alternateName": "Joseph Mutua",
          "jobTitle": "Business Manager & ICT Consultant",
          "description": "Emerging business professional and tech enthusiast ready to drive innovation",
          "alumniOf": "Business Management Program",
          "knowsAbout": ["Business Management", "ICT", "Innovation", "Strategic Thinking", "Digital Innovation", "Technology Integration"],
          "url": "https://josephmgfibion.org/about"
        }}
      />
      <div className="min-h-screen pt-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            About Gfibion Joseph Mutua
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            A motivated recent graduate ready to bridge traditional business management with innovative technology solutions
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Profile Section */}
          <div className="flex flex-col items-center">
            <div className="w-64 h-64 rounded-full bg-gradient-to-br from-purple-400 to-blue-500 p-1 mb-6">
              <div className="w-full h-full rounded-full bg-slate-800 flex items-center justify-center">
                <div className="text-6xl font-bold text-purple-400">JM</div>
              </div>
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Gfibion Joseph Mutua</h2>
            <p className="text-blue-400 text-lg mb-4">Emerging Business Professional & Tech Enthusiast</p>
            <div className="flex flex-wrap gap-2 justify-center">
              <Badge variant="secondary" className="bg-purple-800/30 text-purple-300">Business Management</Badge>
              <Badge variant="secondary" className="bg-blue-800/30 text-blue-300">ICT</Badge>
              <Badge variant="secondary" className="bg-pink-800/30 text-pink-300">Innovation</Badge>
            </div>
          </div>

          {/* Bio Section */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-6">Professional Journey</h3>
            <div className="space-y-4 text-gray-300">
              <p>
                I'm Gfibion Joseph Mutua, a recent graduate with a strong foundation in business management 
                and an unwavering passion for emerging technologies. As I enter the professional world, I bring 
                fresh perspectives on how organizations can navigate the complex intersection of traditional 
                business practices and innovative digital solutions.
              </p>
              <p>
                My academic background has equipped me with knowledge in strategic planning, operational principles, 
                and technology integration, with some experience in emerging technologies. 
                I believe in the transformative power of innovative systems and their potential to revolutionize
                how we conduct business in the modern era.
              </p>
              <p>
                Through my studies and personal projects, I've developed a unique perspective on how technology 
                can drive sustainable growth and competitive advantage. My approach combines fresh academic insights 
                with enthusiasm for creative problem-solving to contribute meaningfully to organizational success.
              </p>
            </div>
          </div>
        </div>

        {/* Key Achievements */}
        <Card className="bg-slate-800/50 border-purple-800/30 mb-16">
          <CardContent className="p-8">
            <h3 className="text-2xl font-bold text-white mb-6 text-center">Academic & Personal Achievements</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-400 mb-2">Fresh</div>
                <p className="text-gray-300">Graduate with Business Management Background</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-400 mb-2">15+</div>
                <p className="text-gray-300">Academic & Personal Projects Completed</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-pink-400 mb-2">5+</div>
                <p className="text-gray-300">Technology Certifications Earned</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Values Section */}
        <div className="text-center mb-16">
          <h3 className="text-2xl font-bold text-white mb-8">Core Values</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-slate-800/30 border-purple-800/20 hover:border-purple-600/40 transition-all duration-300">
              <CardContent className="p-6">
                <h4 className="text-lg font-semibold text-purple-300 mb-3">Innovation</h4>
                <p className="text-gray-400">Embracing cutting-edge technologies and fresh approaches to create sustainable competitive advantages</p>
              </CardContent>
            </Card>
            <Card className="bg-slate-800/30 border-purple-800/20 hover:border-purple-600/40 transition-all duration-300">
              <CardContent className="p-6">
                <h4 className="text-lg font-semibold text-blue-300 mb-3">Integrity</h4>
                <p className="text-gray-400">Building trust through transparent communication, ethical practices, and commitment to continuous learning</p>
              </CardContent>
            </Card>
            <Card className="bg-slate-800/30 border-purple-800/20 hover:border-purple-600/40 transition-all duration-300">
              <CardContent className="p-6">
                <h4 className="text-lg font-semibold text-pink-300 mb-3">Excellence</h4>
                <p className="text-gray-400">Delivering quality results through dedication, fresh perspectives, and eagerness to contribute meaningfully</p>
              </CardContent>
            </Card>
          </div>
        </div>
        </div>
      </div>
    </>
  );
};

export default About;
