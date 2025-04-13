
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Database, ShieldCheck, BarChart4, FileText } from "lucide-react";

const DashboardMetrics = () => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card className="hover:shadow-md transition-shadow">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Datasets</CardTitle>
          <Database className="h-4 w-4 text-blue-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">0</div>
          <p className="text-xs text-muted-foreground mt-1">
            Upload your first dataset
          </p>
        </CardContent>
      </Card>
      
      <Card className="hover:shadow-md transition-shadow">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Quality Score</CardTitle>
          <BarChart4 className="h-4 w-4 text-blue-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">--</div>
          <p className="text-xs text-muted-foreground mt-1">
            No datasets analyzed yet
          </p>
        </CardContent>
      </Card>
      
      <Card className="hover:shadow-md transition-shadow">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Compliance Status</CardTitle>
          <ShieldCheck className="h-4 w-4 text-blue-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">--</div>
          <p className="text-xs text-muted-foreground mt-1">
            Run pipeline for assessment
          </p>
        </CardContent>
      </Card>
      
      <Card className="hover:shadow-md transition-shadow">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Reports Generated</CardTitle>
          <FileText className="h-4 w-4 text-blue-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">0</div>
          <p className="text-xs text-muted-foreground mt-1">
            Generate your first report
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardMetrics;
