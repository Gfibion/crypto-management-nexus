
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const Articles = () => {
  const articles = [
    {
      title: "The Future of Business in Web3: Navigating Decentralized Opportunities",
      excerpt: "Exploring how traditional businesses can adapt and thrive in the Web3 ecosystem, leveraging blockchain technology for competitive advantage.",
      date: "2024-01-15",
      readTime: "8 min read",
      category: "Blockchain",
      tags: ["Web3", "Business Strategy", "Blockchain"],
      featured: true
    },
    {
      title: "Digital Transformation: Beyond Technology Implementation",
      excerpt: "Understanding that successful digital transformation requires cultural change, not just new tools. A comprehensive guide for business leaders.",
      date: "2024-01-10",
      readTime: "6 min read",
      category: "Technology",
      tags: ["Digital Transformation", "Leadership", "Strategy"]
    },
    {
      title: "DeFi Protocols: Risk Management for Enterprise Adoption",
      excerpt: "Analyzing the opportunities and challenges of integrating DeFi protocols into traditional business operations and risk mitigation strategies.",
      date: "2024-01-05",
      readTime: "10 min read",
      category: "Cryptocurrency",
      tags: ["DeFi", "Risk Management", "Enterprise"]
    },
    {
      title: "Smart Contract Auditing: Best Practices for Business Leaders",
      excerpt: "Essential guidelines for business leaders looking to implement smart contracts, focusing on security, compliance, and operational efficiency.",
      date: "2023-12-28",
      readTime: "7 min read",
      category: "Blockchain",
      tags: ["Smart Contracts", "Security", "Best Practices"]
    },
    {
      title: "Project Management in the Age of Remote Teams",
      excerpt: "Effective strategies for managing distributed teams, maintaining productivity, and fostering collaboration in hybrid work environments.",
      date: "2023-12-20",
      readTime: "5 min read",
      category: "Management",
      tags: ["Project Management", "Remote Work", "Team Leadership"]
    },
    {
      title: "Cryptocurrency Investment Strategies for Businesses",
      excerpt: "A comprehensive guide to corporate cryptocurrency adoption, including treasury management, payment integration, and regulatory considerations.",
      date: "2023-12-15",
      readTime: "9 min read",
      category: "Cryptocurrency",
      tags: ["Investment", "Treasury Management", "Compliance"]
    }
  ];

  const categories = ["All", "Blockchain", "Technology", "Cryptocurrency", "Management"];

  const getCategoryColor = (category: string) => {
    const colors = {
      "Blockchain": "purple",
      "Technology": "blue",
      "Cryptocurrency": "pink",
      "Management": "green"
    };
    return colors[category as keyof typeof colors] || "gray";
  };

  return (
    <div className="min-h-screen pt-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Articles & Insights
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Exploring the intersection of business management, technology innovation, and blockchain transformation
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-4 justify-center mb-12">
          {categories.map((category) => (
            <Button
              key={category}
              variant={category === "All" ? "default" : "outline"}
              className={category === "All" 
                ? "bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white border-0" 
                : "border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white"
              }
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Featured Article */}
        {articles.filter(article => article.featured).map((article, index) => (
          <Card key={index} className="bg-gradient-to-r from-slate-800/50 to-slate-700/50 border-purple-600/50 mb-12 hover:border-purple-500/70 transition-all duration-300">
            <CardContent className="p-8">
              <div className="flex flex-col lg:flex-row gap-8">
                <div className="lg:w-1/3">
                  <div className="aspect-video bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                    <span className="text-white text-lg font-semibold">Featured Article</span>
                  </div>
                </div>
                <div className="lg:w-2/3">
                  <div className="flex items-center gap-4 mb-4">
                    <Badge variant="secondary" className={`bg-${getCategoryColor(article.category)}-800/30 text-${getCategoryColor(article.category)}-300`}>
                      {article.category}
                    </Badge>
                    <span className="text-gray-400 text-sm">{article.date}</span>
                    <span className="text-gray-400 text-sm">{article.readTime}</span>
                  </div>
                  <h2 className="text-2xl lg:text-3xl font-bold text-white mb-4 hover:text-purple-300 transition-colors cursor-pointer">
                    {article.title}
                  </h2>
                  <p className="text-gray-300 mb-6 text-lg">{article.excerpt}</p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {article.tags.map((tag, tagIndex) => (
                      <Badge key={tagIndex} variant="outline" className="border-purple-400/30 text-purple-300">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white border-0">
                    Read Full Article
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {/* Articles Grid */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {articles.filter(article => !article.featured).map((article, index) => (
            <Card key={index} className="bg-slate-800/50 border-purple-800/30 hover:border-purple-600/50 transition-all duration-300 hover:transform hover:scale-105 group">
              <CardHeader>
                <div className="aspect-video bg-gradient-to-br from-slate-700 to-slate-600 rounded-lg mb-4 flex items-center justify-center">
                  <span className="text-gray-400">Article Preview</span>
                </div>
                <div className="flex items-center gap-4 mb-2">
                  <Badge variant="secondary" className={`bg-${getCategoryColor(article.category)}-800/30 text-${getCategoryColor(article.category)}-300`}>
                    {article.category}
                  </Badge>
                  <span className="text-gray-400 text-sm">{article.date}</span>
                  <span className="text-gray-400 text-sm">{article.readTime}</span>
                </div>
                <CardTitle className="text-xl text-white group-hover:text-purple-300 transition-colors cursor-pointer">
                  {article.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 mb-4">{article.excerpt}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {article.tags.map((tag, tagIndex) => (
                    <Badge key={tagIndex} variant="outline" className="border-purple-400/30 text-purple-300 text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <Button variant="outline" className="border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white w-full">
                  Read More
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Newsletter Signup */}
        <Card className="bg-gradient-to-r from-purple-900/30 to-blue-900/30 border-purple-600/30">
          <CardContent className="p-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Stay Updated</h2>
            <p className="text-xl text-gray-300 mb-6">
              Subscribe to get the latest insights on business, technology, and blockchain innovation
            </p>
            <div className="max-w-md mx-auto flex gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 rounded-lg bg-slate-800 border border-purple-600/30 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
              />
              <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white border-0">
                Subscribe
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Articles;
