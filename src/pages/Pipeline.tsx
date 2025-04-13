import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Progress } from "@/components/ui/progress";
import ReactMarkdown from 'react-markdown';
import {
  Database,
  FileUp,
  ChevronLeft,
  BarChart4,
  FileText,
  Shield,
  Upload,
  Download,
  Eye,
  AlertCircle,
  Check,
  X
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

interface PipelineResponse {
  message: string;
  dataset_preview: Record<string, any>[];
  dataset_stats: {
    rows: number;
    columns: number;
    column_names: string[];
  };
  initial_analysis: {
    domain: string;
    column_meanings: Record<string, string>;
  };
  quality_report: {
    missing_values: Record<string, number>;
    duplicates: number;
    suggestions: string;
  };
  bias_results: {
    distributions: Record<string, Record<string, number>>;
    analysis: string;
  };
  privacy_results: {
    pii_columns: string[];
    suggestions: string;
  };
  lineage_info: Record<string, any>;
  compliance_report: {
    missing_values_check: boolean;
    pii_check: boolean;
  };
  recommendations: {
    recommendations: {
      category: string;
      description: string;
    }[];
  };
  full_report: Record<string, any>;
}

const Pipeline = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [file, setFile] = useState<File | null>(null);
  const [sampleSize, setSampleSize] = useState<number>(1000);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [result, setResult] = useState<PipelineResponse | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const steps = [
    "Dataset Ingestion",
    "Initial Analysis",
    "Data Quality Assessment",
    "Bias Detection",
    "Privacy Assessment",
    "Lineage Documentation",
    "Governance Compliance",
    "Recommendations"
  ];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (selectedFile.name.endsWith('.csv') || selectedFile.name.endsWith('.xlsx')) {
        setFile(selectedFile);
        toast({
          title: "File selected",
          description: `${selectedFile.name} (${(selectedFile.size / 1024 / 1024).toFixed(2)} MB)`,
        });
      } else {
        toast({
          variant: "destructive",
          title: "Invalid file format",
          description: "Please upload a CSV or Excel file",
        });
      }
    }
  };

  const handleRunPipeline = async () => {
    if (!file) {
      toast({
        variant: "destructive",
        title: "No file selected",
        description: "Please upload a CSV or Excel file",
      });
      return;
    }

    setIsLoading(true);
    setProgress(0);
    setCurrentStep(0);
    setResult(null);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('sample_size', sampleSize.toString());

    try {
      const timer = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 95) {
            clearInterval(timer);
            return prev;
          }
          return prev + 5;
        });
        
        setCurrentStep((prev) => {
          const newStep = Math.floor((progress / 100) * steps.length);
          return newStep < steps.length ? newStep : prev;
        });
      }, 500);

      const response = await fetch('https://data-governance.onrender.com/api/upload', {
        method: 'POST',
        body: formData,
      });

      clearInterval(timer);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Something went wrong');
      }

      const data: PipelineResponse = await response.json();
      setResult(data);
      setProgress(100);
      setCurrentStep(steps.length - 1);

      toast({
        title: "Pipeline completed",
        description: "Data governance analysis finished successfully",
      });
    } catch (error) {
      console.error('Pipeline error:', error);
      toast({
        variant: "destructive",
        title: "Pipeline failed",
        description: error instanceof Error ? error.message : "An unknown error occurred",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownloadReport = () => {
    if (!result) return;
    
    const reportBlob = new Blob([JSON.stringify(result.full_report, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(reportBlob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `data_governance_report_${new Date().toISOString().replace(/[:.]/g, '-')}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Report downloaded",
      description: "Full analysis report saved as JSON",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm">
        <div className="container max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold">DataGuardian</h1>
            <Button 
              variant="ghost" 
              onClick={() => navigate('/')}
              className="text-gray-700"
            >
              Back to Home
            </Button>
          </div>
        </div>
      </div>
      
      <div className="container py-8 px-4 max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6">
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="icon"
              className="mr-2"
              onClick={() => navigate('/')}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Data Governance Pipeline</h1>
              <p className="text-muted-foreground mt-1">
                Upload a dataset for AI-powered governance analysis
              </p>
            </div>
          </div>
        </div>
        
        {!result ? (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-xl">Upload Dataset</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6">
                <div className="flex flex-col items-center justify-center p-10 border border-dashed rounded-lg">
                  <FileUp className="h-10 w-10 text-blue-600 mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Choose a File</h3>
                  <p className="text-muted-foreground mb-4 text-center max-w-md">
                    Upload a CSV or Excel file to analyze through the data governance pipeline.
                    The file will be processed to ensure quality, compliance, and AI-readiness.
                  </p>
                  <div className="flex flex-wrap gap-4 items-center">
                    <Button 
                      onClick={() => fileInputRef.current?.click()}
                      className="bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      <Upload className="mr-2 h-4 w-4" /> Select File
                    </Button>
                    <Input
                      ref={fileInputRef}
                      type="file"
                      accept=".csv,.xlsx"
                      className="hidden"
                      onChange={handleFileChange}
                    />
                    {file && (
                      <div className="flex items-center gap-2 px-3 py-2 bg-blue-50 rounded-md text-sm">
                        <FileText className="h-4 w-4 text-blue-600" />
                        <span className="font-medium">{file.name}</span>
                        <span className="text-muted-foreground">
                          ({(file.size / 1024 / 1024).toFixed(2)} MB)
                        </span>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-5 w-5 text-gray-500 hover:text-gray-700"
                          onClick={() => setFile(null)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="grid gap-4">
                  <div>
                    <h4 className="font-medium mb-2">Sample Size</h4>
                    <div className="grid grid-cols-1 md:grid-cols-[1fr_100px] gap-4 items-center">
                      <div className="w-full">
                        <Slider
                          value={[sampleSize]}
                          min={100}
                          max={10000}
                          step={100}
                          onValueChange={(value) => setSampleSize(value[0])}
                        />
                      </div>
                      <div className="flex">
                        <Input
                          type="number"
                          value={sampleSize}
                          min={100}
                          max={10000}
                          step={100}
                          onChange={(e) => setSampleSize(parseInt(e.target.value) || 1000)}
                          className="w-24"
                        />
                        <span className="ml-2 flex items-center text-sm text-muted-foreground">rows</span>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      For large datasets, a sample is used to improve analysis performance.
                    </p>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Button
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                    size="lg"
                    onClick={handleRunPipeline}
                    disabled={isLoading || !file}
                  >
                    <Database className="mr-2 h-4 w-4" />
                    {isLoading ? "Processing..." : "Run Pipeline"}
                  </Button>
                </div>
                
                {isLoading && (
                  <div className="mt-4">
                    <h4 className="font-medium mb-2">
                      Processing: {steps[currentStep]}
                    </h4>
                    <Progress value={progress} className="h-3" />
                    <p className="text-xs text-muted-foreground mt-2">
                      Step {currentStep + 1} of {steps.length}: {steps[currentStep]}
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center">
              <div className="mb-4 lg:mb-0">
                <h2 className="text-xl font-bold tracking-tight">Analysis Results</h2>
                <p className="text-muted-foreground">
                  {file?.name} • {result.dataset_stats.rows} rows • {result.dataset_stats.columns} columns
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Button variant="outline" onClick={handleDownloadReport}>
                  <Download className="mr-2 h-4 w-4" /> Download Report
                </Button>
                <Button 
                  onClick={() => {
                    setResult(null);
                    setFile(null);
                    setProgress(0);
                    setCurrentStep(0);
                  }}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  <FileUp className="mr-2 h-4 w-4" /> Analyze New Dataset
                </Button>
              </div>
            </div>
            
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="w-full grid grid-cols-3 lg:grid-cols-5 mb-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="quality">Quality</TabsTrigger>
                <TabsTrigger value="bias">Bias</TabsTrigger>
                <TabsTrigger value="privacy">Privacy</TabsTrigger>
                <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Dataset Preview</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="rounded-md border overflow-auto max-h-96">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            {result.dataset_stats.column_names.map((column, i) => (
                              <TableHead key={i}>{column}</TableHead>
                            ))}
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {result.dataset_preview.map((row, i) => (
                            <TableRow key={i}>
                              {result.dataset_stats.column_names.map((column, j) => (
                                <TableCell key={j}>{row[column] !== null ? row[column]?.toString() : 'NULL'}</TableCell>
                              ))}
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Initial Analysis</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4">
                      <div>
                        <h4 className="font-medium mb-2">Dataset Domain</h4>
                        <p className="bg-blue-50 p-3 rounded">{result.initial_analysis.domain}</p>
                      </div>
                      <div>
                        <h4 className="font-medium mb-2">Column Meanings</h4>
                        <div className="rounded-md border overflow-hidden">
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead>Column</TableHead>
                                <TableHead>Meaning</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {Object.entries(result.initial_analysis.column_meanings).map(([column, meaning], i) => (
                                <TableRow key={i}>
                                  <TableCell className="font-medium">{column}</TableCell>
                                  <TableCell>{meaning}</TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Compliance Status</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
                      <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-md">
                        {result.compliance_report.missing_values_check ? (
                          <div className="rounded-full bg-green-100 p-2">
                            <Check className="h-5 w-5 text-green-600" />
                          </div>
                        ) : (
                          <div className="rounded-full bg-red-100 p-2">
                            <AlertCircle className="h-5 w-5 text-red-600" />
                          </div>
                        )}
                        <div>
                          <p className="font-medium">Missing Values</p>
                          <p className="text-sm text-muted-foreground">
                            {result.compliance_report.missing_values_check 
                              ? "Missing values are within acceptable limits" 
                              : "Missing values exceed acceptable threshold"}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-md">
                        {result.compliance_report.pii_check ? (
                          <div className="rounded-full bg-green-100 p-2">
                            <Check className="h-5 w-5 text-green-600" />
                          </div>
                        ) : (
                          <div className="rounded-full bg-red-100 p-2">
                            <AlertCircle className="h-5 w-5 text-red-600" />
                          </div>
                        )}
                        <div>
                          <p className="font-medium">PII Data</p>
                          <p className="text-sm text-muted-foreground">
                            {result.compliance_report.pii_check
                              ? "No PII concerns detected"
                              : "PII found in dataset"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="quality" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Data Quality Assessment</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div>
                        <h4 className="font-medium mb-2">Missing Values</h4>
                        <div className="rounded-md border overflow-hidden">
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead>Column</TableHead>
                                <TableHead>Missing Values</TableHead>
                                <TableHead>Percentage</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {Object.entries(result.quality_report.missing_values).map(([column, count], i) => (
                                <TableRow key={i}>
                                  <TableCell className="font-medium">{column}</TableCell>
                                  <TableCell>{count}</TableCell>
                                  <TableCell>
                                    {((count / result.dataset_stats.rows) * 100).toFixed(2)}%
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-medium mb-2">Duplicate Rows</h4>
                        <p className="text-lg font-semibold flex items-center">
                          {result.quality_report.duplicates}
                          <span className="text-sm font-normal text-muted-foreground ml-2">
                            ({((result.quality_report.duplicates / result.dataset_stats.rows) * 100).toFixed(2)}% of total rows)
                          </span>
                        </p>
                      </div>
                      
                      <div>
                        <h4 className="font-medium mb-2">Improvement Suggestions</h4>
                        <div className="bg-blue-50 p-4 rounded-md whitespace-pre-wrap">
                        <ReactMarkdown>{result.quality_report.suggestions}</ReactMarkdown>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="bias" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Bias Detection</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div>
                        <h4 className="font-medium mb-4">Distribution Analysis</h4>
                        <Accordion type="single" collapsible className="w-full">
                          {Object.entries(result.bias_results.distributions).map(([column, distribution], i) => (
                            <AccordionItem value={`item-${i}`} key={i}>
                              <AccordionTrigger>{column}</AccordionTrigger>
                              <AccordionContent>
                                <div className="rounded-md border overflow-hidden">
                                  <Table>
                                    <TableHeader>
                                      <TableRow>
                                        <TableHead>Value</TableHead>
                                        <TableHead>Frequency</TableHead>
                                      </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                      {Object.entries(distribution).map(([value, frequency], j) => (
                                        <TableRow key={j}>
                                          <TableCell className="font-medium">{value}</TableCell>
                                          <TableCell>{(Number(frequency) * 100).toFixed(2)}%</TableCell>
                                        </TableRow>
                                      ))}
                                    </TableBody>
                                  </Table>
                                </div>
                              </AccordionContent>
                            </AccordionItem>
                          ))}
                        </Accordion>
                      </div>
                      
                      <div>
                        <h4 className="font-medium mb-2">Bias Insights</h4>
                        <div className="bg-blue-50 p-4 rounded-md whitespace-pre-wrap">
                          <ReactMarkdown>{result.bias_results.analysis}</ReactMarkdown>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="privacy" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Privacy Assessment</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div>
                        <h4 className="font-medium mb-2">Potential PII Columns</h4>
                        {result.privacy_results.pii_columns.length > 0 ? (
                          <div className="grid gap-2">
                            {result.privacy_results.pii_columns.map((column, i) => (
                              <div key={i} className="flex items-center gap-2 bg-red-50 text-red-800 px-3 py-2 rounded-md">
                                <Shield className="h-4 w-4" />
                                <span>{column}</span>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-green-600 bg-green-50 p-3 rounded-md flex items-center">
                            <Check className="h-4 w-4 mr-2" /> No PII columns detected
                          </p>
                        )}
                      </div>
                      
                      <div>
                        <h4 className="font-medium mb-2">Privacy Recommendations</h4>
                        <div className="bg-blue-50 p-4 rounded-md whitespace-pre-wrap">
                          
                          <ReactMarkdown>{result.privacy_results.suggestions}</ReactMarkdown>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Lineage Documentation</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="rounded-md border overflow-hidden">
                      <Table>
                        <TableBody>
                          {Object.entries(result.lineage_info).map(([key, value], i) => (
                            <TableRow key={i}>
                              <TableCell className="font-medium capitalize">
                                {key.replace(/_/g, ' ')}
                              </TableCell>
                              <TableCell>
                                {Array.isArray(value) 
                                  ? value.join(', ') 
                                  : value?.toString()}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="recommendations" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Actionable Recommendations</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {result.recommendations.recommendations.map((rec, i) => (
                        <div key={i} className="bg-blue-50 p-4 rounded-md">
                          <h4 className="font-medium text-blue-800 mb-1">{rec.category}</h4>
                          <p>{rec.description}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        )}
      </div>
    </div>
  );
};

export default Pipeline;
