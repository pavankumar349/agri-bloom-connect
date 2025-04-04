
import { useState, useRef } from "react";
import { PageHeader } from "@/components/ui/page-header";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Upload, AlertCircle, Loader2, Leaf } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface DetectionResult {
  disease: string;
  confidence: number;
  description: string;
  treatment: string;
  prevention: string;
}

// Sample detection results for demo purposes
const SAMPLE_RESULTS: Record<string, DetectionResult> = {
  "tomato_late_blight": {
    disease: "Tomato Late Blight",
    confidence: 0.92,
    description: "Late blight is a serious disease affecting tomatoes and potatoes. It's caused by the fungus-like organism Phytophthora infestans and can rapidly destroy plants, especially in wet, cool conditions.",
    treatment: "Remove and destroy infected plant parts. Apply copper-based fungicides. In severe cases, remove entire plants to prevent spread.",
    prevention: "Plant resistant varieties. Ensure good air circulation by proper spacing. Avoid overhead watering. Apply preventative fungicides during high-risk periods.",
  },
  "corn_leaf_rust": {
    disease: "Corn Leaf Rust",
    confidence: 0.87,
    description: "Corn leaf rust is caused by the fungus Puccinia sorghi and appears as small, circular to elongated, powdery, cinnamon-brown pustules on both leaf surfaces.",
    treatment: "Apply appropriate fungicides early in infection. Remove severely infected plants to prevent spread.",
    prevention: "Plant resistant hybrids. Rotate crops. Control volunteer corn. Consider preventative fungicide application in high-risk areas.",
  },
  "apple_scab": {
    disease: "Apple Scab",
    confidence: 0.89,
    description: "Apple scab is a fungal disease caused by Venturia inaequalis that affects apple trees, causing dark, scabby lesions on leaves and fruit.",
    treatment: "Apply fungicides according to local recommendations. Remove fallen leaves to reduce fungal spores.",
    prevention: "Plant resistant varieties. Prune trees for good air circulation. Apply preventative fungicides from bud break until harvest in wet seasons.",
  },
};

export default function DiseaseDetection() {
  const [image, setImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<DetectionResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    setResult(null);
    
    const file = e.target.files?.[0];
    if (!file) return;

    // Check file type
    if (!file.type.match('image.*')) {
      setError("Please upload an image file (JPEG, PNG, etc.)");
      return;
    }

    // Check file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      setError("File is too large. Maximum size is 10MB.");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleDetect = () => {
    if (!image) return;
    
    setIsProcessing(true);
    setError(null);

    // Simulate API call with timeout
    setTimeout(() => {
      // Randomly select a sample result for demo
      const results = Object.values(SAMPLE_RESULTS);
      const randomResult = results[Math.floor(Math.random() * results.length)];
      
      setResult(randomResult);
      setIsProcessing(false);
    }, 2000);
  };

  const resetDetection = () => {
    setImage(null);
    setResult(null);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="h-full">
      <div className="container py-6">
        <PageHeader
          title="Plant Disease Detection"
          description="Upload images of your plants to identify diseases and get treatment recommendations"
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card className="h-full">
              <CardHeader>
                <CardTitle>Upload Plant Image</CardTitle>
              </CardHeader>
              <CardContent>
                {error && (
                  <Alert variant="destructive" className="mb-4">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <div 
                  className={`border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center text-center h-[300px] ${
                    image ? "border-primary" : "border-border"
                  }`}
                >
                  {image ? (
                    <img 
                      src={image} 
                      alt="Plant to analyze" 
                      className="max-h-full max-w-full object-contain"
                    />
                  ) : (
                    <>
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                        <Upload className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="text-lg font-medium mb-2">Upload an image</h3>
                      <p className="text-muted-foreground mb-4">
                        Drag and drop or click to upload an image of your plant
                      </p>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                        id="image-upload"
                      />
                      <Button
                        onClick={() => fileInputRef.current?.click()}
                        variant="outline"
                      >
                        Select Image
                      </Button>
                    </>
                  )}
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                {image && (
                  <>
                    <Button variant="outline" onClick={resetDetection}>
                      Reset
                    </Button>
                    <Button onClick={handleDetect} disabled={isProcessing}>
                      {isProcessing ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Analyzing...
                        </>
                      ) : (
                        "Detect Disease"
                      )}
                    </Button>
                  </>
                )}
              </CardFooter>
            </Card>
          </div>

          <div>
            <Card className="h-full">
              <CardHeader>
                <CardTitle>Detection Results</CardTitle>
              </CardHeader>
              <CardContent>
                {isProcessing ? (
                  <div className="h-full flex flex-col items-center justify-center py-10">
                    <Loader2 className="h-10 w-10 animate-spin text-primary mb-4" />
                    <p className="text-muted-foreground">Analyzing plant image...</p>
                  </div>
                ) : result ? (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Leaf className="h-5 w-5 text-primary" />
                        <h3 className="font-semibold text-lg">{result.disease}</h3>
                      </div>
                      <div className="bg-primary/10 text-primary px-2 py-1 rounded-md text-sm">
                        {Math.round(result.confidence * 100)}% confidence
                      </div>
                    </div>

                    <Tabs defaultValue="description" className="w-full">
                      <TabsList className="grid grid-cols-3 mb-2">
                        <TabsTrigger value="description">Info</TabsTrigger>
                        <TabsTrigger value="treatment">Treatment</TabsTrigger>
                        <TabsTrigger value="prevention">Prevention</TabsTrigger>
                      </TabsList>
                      <TabsContent value="description" className="mt-0">
                        <p className="text-sm">{result.description}</p>
                      </TabsContent>
                      <TabsContent value="treatment" className="mt-0">
                        <p className="text-sm">{result.treatment}</p>
                      </TabsContent>
                      <TabsContent value="prevention" className="mt-0">
                        <p className="text-sm">{result.prevention}</p>
                      </TabsContent>
                    </Tabs>
                  </div>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-center p-4">
                    <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center mb-4">
                      <Leaf className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <h3 className="text-lg font-medium mb-2">No results yet</h3>
                    <p className="text-muted-foreground">
                      Upload a plant image and click "Detect Disease" to get results
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
