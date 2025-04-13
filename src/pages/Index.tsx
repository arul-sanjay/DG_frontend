
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, Database, Lock, Cpu, BarChart4 } from "lucide-react";
import NavBar from "../components/NavBar";
import { useAuth } from "../context/AuthContext";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();

  const features = [
    {
      icon: <Database className="h-6 w-6 text-blue-600" />,
      title: "Data Quality Checks",
      description: "Automatically analyze data for missing values, duplicates, and anomalies."
    },
    {
      icon: <BarChart4 className="h-6 w-6 text-blue-600" />,
      title: "Bias Detection",
      description: "Identify potential biases in your datasets with distribution analysis."
    },
    {
      icon: <Lock className="h-6 w-6 text-blue-600" />,
      title: "Privacy Assessment",
      description: "Detect PII data and ensure compliance with privacy regulations."
    },
    {
      icon: <Cpu className="h-6 w-6 text-blue-600" />,
      title: "AI-Powered Analysis",
      description: "Utilize LLMs to understand data context and provide intelligent insights."
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <NavBar />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 hero-gradient text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center space-y-8 py-12">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight max-w-4xl mx-auto">
              AI-Powered Data Governance for the Modern Enterprise
            </h1>
            <p className="text-lg md:text-xl max-w-2xl mx-auto opacity-90 leading-relaxed">
              Ensure your data is high-quality, compliant, and AI-ready with our automated data governance platform.
            </p>
            <div className="pt-4">
              {isAuthenticated ? (
                <Link to="/pipeline">
                  <Button 
                    size="lg" 
                    className="bg-white text-blue-700 hover:bg-gray-100 mr-4"
                    onClick={() => {
                      toast({
                        title: "Navigating to Data Pipeline",
                        description: "Loading the AI-powered data governance pipeline",
                      });
                    }}
                  >
                    Launch Data Pipeline <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              ) : (
                <Link to="/signup">
                  <Button size="lg" className="bg-white text-blue-700 hover:bg-gray-100 mr-4">
                    Get Started <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              )}
              <Link to="#features">
                <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/20">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </div>
        
        {/* Wave Divider */}
        <div className="w-full">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" className="w-full h-auto">
            <path fill="#ffffff" fillOpacity="1" d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"></path>
          </svg>
        </div>
      </section>
      
      {/* Problem Statement Section */}
      <section className="py-20 bg-gray-50" id="features">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Problem Statement</h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              Companies struggle to ensure their datasets are of high quality, compliant with privacy regulations, and free from biases, 
              particularly when preparing data for AI applications. Manual data governance processes are slow, error-prone, and inefficient, 
              leading to delays, compliance risks, and suboptimal AI model performance.
            </p>
          </div>
          
          {/* Solution */}
          <div className="mb-20">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Solution</h3>
              <p className="text-gray-700 mb-6">
                This application provides an automated, AI-powered data governance pipeline that analyzes datasets, identifies issues, 
                and offers actionable insights. Built with Streamlit, LangChain Grok, and Llama 3.1 70B, it performs critical tasks like 
                data quality checks, bias detection, privacy assessments, and compliance verification, all while maintaining transparency 
                through a user-friendly interface.
              </p>
              
              <h4 className="text-xl font-semibold text-gray-900 mb-4">How It Solves the Problem</h4>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">
                    <strong className="text-gray-900">Automation:</strong> Eliminates manual processes by using AI agents to analyze data.
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">
                    <strong className="text-gray-900">Flexibility:</strong> Adapts to any dataset structure or domain using dynamic LLM prompts and sampling.
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">
                    <strong className="text-gray-900">Transparency:</strong> Displays each step's progress and results, enabling users to understand and trust the process.
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">
                    <strong className="text-gray-900">Scalability:</strong> Handles large datasets by sampling and can be extended with additional tools or policies.
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">
                    <strong className="text-gray-900">Compliance and Quality:</strong> Ensures data meets governance standards and is AI-ready.
                  </span>
                </li>
              </ul>
            </div>
          </div>
          
          {/* Features */}
          <h3 className="text-2xl font-bold text-center text-gray-900 mb-12">Key Features</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                <div className="flex flex-col items-center text-center">
                  <div className="p-3 bg-blue-50 rounded-full mb-4">
                    {feature.icon}
                  </div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h4>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Outcome Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Outcome for the User</h2>
            <p className="text-lg text-gray-700">
              Upon completing the pipeline, users receive comprehensive insights and actionable intelligence about their data.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            <div className="bg-blue-50 p-6 rounded-lg hover:shadow-md transition-shadow duration-300">
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Dataset Overview</h4>
              <p className="text-gray-700">Basic stats and a sampled view of the data</p>
            </div>
            <div className="bg-blue-50 p-6 rounded-lg hover:shadow-md transition-shadow duration-300">
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Initial Analysis</h4>
              <p className="text-gray-700">Inferred domain and column meanings</p>
            </div>
            <div className="bg-blue-50 p-6 rounded-lg hover:shadow-md transition-shadow duration-300">
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Data Quality Report</h4>
              <p className="text-gray-700">Metrics on missing values, duplicates, and improvement suggestions</p>
            </div>
            <div className="bg-blue-50 p-6 rounded-lg hover:shadow-md transition-shadow duration-300">
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Bias Analysis</h4>
              <p className="text-gray-700">Identification of potential biases with distribution details</p>
            </div>
            <div className="bg-blue-50 p-6 rounded-lg hover:shadow-md transition-shadow duration-300">
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Privacy Assessment</h4>
              <p className="text-gray-700">List of PII columns and handling recommendations</p>
            </div>
            <div className="bg-blue-50 p-6 rounded-lg hover:shadow-md transition-shadow duration-300">
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Compliance Report</h4>
              <p className="text-gray-700">Status against predefined governance policies</p>
            </div>
            <div className="bg-blue-50 p-6 rounded-lg hover:shadow-md transition-shadow duration-300">
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Lineage Documentation</h4>
              <p className="text-gray-700">Metadata tracking the dataset's origin and transformations</p>
            </div>
            <div className="bg-blue-50 p-6 rounded-lg hover:shadow-md transition-shadow duration-300">
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Recommendations</h4>
              <p className="text-gray-700">Actionable steps to enhance data quality and governance</p>
            </div>
            <div className="bg-blue-50 p-6 rounded-lg hover:shadow-md transition-shadow duration-300">
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Full Report</h4>
              <p className="text-gray-700">A downloadable JSON file summarizing all findings</p>
            </div>
          </div>
          
          {/* CTA */}
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Ready to Streamline Your Data Governance?</h3>
            <p className="text-lg text-gray-700 mb-8 max-w-3xl mx-auto">
              This tool streamlines data preparation for AI, reduces governance risks, and saves time, enabling organizations to 
              deploy reliable, compliant AI solutions faster and more confidently.
            </p>
            {isAuthenticated ? (
              <Link to="/pipeline">
                <Button 
                  size="lg" 
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                  onClick={() => {
                    toast({
                      title: "Navigating to Data Pipeline",
                      description: "Loading the AI-powered data governance pipeline",
                    });
                  }}
                >
                  Launch Data Pipeline <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            ) : (
              <Link to="/signup">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
                  Get Started Today <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            )}
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row md:justify-between items-center">
            <div className="flex items-center gap-2 mb-6 md:mb-0">
              <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                <span className="text-white font-bold text-sm">DG</span>
              </div>
              <span className="font-bold text-xl">DataGuardian</span>
            </div>
            <div className="flex gap-8">
              <a href="#" className="text-gray-300 hover:text-white transition-colors">About</a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">Features</a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">Contact</a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">Privacy</a>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} DataGuardian. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
