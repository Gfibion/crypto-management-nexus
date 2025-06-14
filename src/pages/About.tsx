
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const About = () => {
  return (
    <div className="min-h-screen pt-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            About Gfibion Joseph Mutua
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            A passionate business professional bridging traditional management with innovative technology solutions
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
            <p className="text-blue-400 text-lg mb-4">Strategic Leader & Tech Innovator</p>
            <div className="flex flex-wrap gap-2 justify-center">
              <Badge variant="secondary" className="bg-purple-800/30 text-purple-300">Management</Badge>
              <Badge variant="secondary" className="bg-blue-800/30 text-blue-300">ICT</Badge>
              <Badge variant="secondary" className="bg-pink-800/30 text-pink-300">Blockchain</Badge>
            </div>
          </div>

          {/* Bio Section */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-6">Professional Journey</h3>
            <div className="space-y-4 text-gray-300">
              <p>
                I'm Gfibion Joseph Mutua, with a strong foundation in business management 
                and an unwavering passion for emerging technologies. I specialize in helping organizations navigate 
                the complex intersection of traditional business practices and innovative digital solutions.
              </p>
              <p>
                My expertise spans strategic planning, operational excellence, and technology integration, with a particular 
                focus on blockchain technology and cryptocurrency markets. I believe in the transformative power of 
                decentralized systems and their potential to revolutionize how we conduct business.
              </p>
              <p>
                Through years of experience in ICT and business management, I've developed a unique perspective on how 
                technology can drive sustainable growth and competitive advantage. My approach combines analytical rigor 
                with creative problem-solving to deliver results that matter for my clients and partners.
              </p>
            </div>
          </div>
        </div>

        {/* Key Achievements */}
        <Card className="bg-slate-800/50 border-purple-800/30 mb-16">
          <CardContent className="p-8">
            <h3 className="text-2xl font-bold text-white mb-6 text-center">Key Achievements</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-400 mb-2">10+</div>
                <p className="text-gray-300">Years in Business Management</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-400 mb-2">50+</div>
                <p className="text-gray-300">Successful ICT Projects</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-pink-400 mb-2">25+</div>
                <p className="text-gray-300">Blockchain Implementations</p>
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
                <p className="text-gray-400">Embracing cutting-edge technologies to create sustainable competitive advantages</p>
              </CardContent>
            </Card>
            <Card className="bg-slate-800/30 border-purple-800/20 hover:border-purple-600/40 transition-all duration-300">
              <CardContent className="p-6">
                <h4 className="text-lg font-semibold text-blue-300 mb-3">Integrity</h4>
                <p className="text-gray-400">Building trust through transparent communication and ethical business practices</p>
              </CardContent>
            </Card>
            <Card className="bg-slate-800/30 border-purple-800/20 hover:border-purple-600/40 transition-all duration-300">
              <CardContent className="p-6">
                <h4 className="text-lg font-semibold text-pink-300 mb-3">Excellence</h4>
                <p className="text-gray-400">Delivering exceptional results through continuous learning and improvement</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
