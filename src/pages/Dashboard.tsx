
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { BarChart4, Database, Shield, FileUp, ArrowUpRight } from "lucide-react";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import DashboardMetrics from "@/components/dashboard/DashboardMetrics";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader />
      
      <div className="container py-8 px-4 max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Welcome back, {user?.name}</h1>
            <p className="text-muted-foreground mt-1">
              Monitor and improve your data governance with AI-powered insights.
            </p>
          </div>
          
          <div className="mt-4 lg:mt-0 flex flex-col sm:flex-row gap-3">
            <Link to="/pipeline">
              <Button 
                className="bg-blue-600 hover:bg-blue-700 text-white"
                size="lg"
                onClick={() => {
                  toast({
                    title: "Navigating to Data Pipeline",
                    description: "Loading the AI-powered data governance pipeline",
                  });
                }}
              >
                <Database className="mr-2 h-4 w-4" /> Data Governance Pipeline
              </Button>
            </Link>
          </div>
        </div>
        
        {/* Dashboard metrics */}
        <DashboardMetrics />
        
        {/* Dashboard Tabs */}
        <Tabs defaultValue="overview" className="mt-6" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3 lg:w-[400px]">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="datasets">Datasets</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-4 mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="col-span-2">
                <CardContent className="p-6">
                  <div className="flex flex-col items-center justify-center p-6 text-center h-64">
                    <Database className="h-10 w-10 text-blue-600 mb-4" />
                    <h3 className="text-xl font-semibold mb-2">Get Started with Data Governance</h3>
                    <p className="text-muted-foreground mb-4">
                      Ensure your data is high-quality, compliant, and AI-ready with our automated governance pipeline.
                    </p>
                    <Link to="/pipeline">
                      <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                        Launch Pipeline <ArrowUpRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex flex-col h-full justify-between">
                    <div>
                      <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
                      <div className="space-y-4">
                        <div className="flex items-start gap-3">
                          <Shield className="h-5 w-5 text-blue-600 mt-0.5" />
                          <div>
                            <p className="text-sm font-medium">First login completed</p>
                            <p className="text-xs text-muted-foreground">
                              {new Date().toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <BarChart4 className="h-5 w-5 text-blue-600 mt-0.5" />
                          <div>
                            <p className="text-sm font-medium">Dashboard initialized</p>
                            <p className="text-xs text-muted-foreground">
                              {new Date().toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-6">
                      <Button variant="outline" className="w-full">View All Activity</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="datasets" className="space-y-4 mt-6">
            <div className="flex flex-col items-center justify-center p-10 border border-dashed rounded-lg bg-white">
              <FileUp className="h-10 w-10 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">No Datasets Yet</h3>
              <p className="text-muted-foreground mb-4 text-center max-w-md">
                Upload your first dataset through the Data Governance Pipeline to analyze and improve its quality.
              </p>
              <Link to="/pipeline">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                  Upload Dataset
                </Button>
              </Link>
            </div>
          </TabsContent>
          
          <TabsContent value="reports" className="space-y-4 mt-6">
            <div className="flex flex-col items-center justify-center p-10 border border-dashed rounded-lg bg-white">
              <BarChart4 className="h-10 w-10 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">No Reports Generated</h3>
              <p className="text-muted-foreground mb-4 text-center max-w-md">
                Run the Data Governance Pipeline on your datasets to generate detailed quality and compliance reports.
              </p>
              <Link to="/pipeline">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                  Generate Report
                </Button>
              </Link>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;
