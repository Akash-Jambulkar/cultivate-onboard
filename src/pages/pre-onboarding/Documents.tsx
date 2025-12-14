import { useState, useRef } from "react";
import { PageBreadcrumb } from "@/components/ui/PageBreadcrumb";
import { FileText, Upload, Scan, CreditCard, Check, Clock, AlertCircle, X, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { Document, BankDetails } from "@/types/onboarding";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const documentCategories = [
  { id: "gov-id", name: "Government ID", description: "Passport, Driver's License, or National ID" },
  { id: "address-proof", name: "Address Proof", description: "Utility bill, Bank statement, or Lease agreement" },
  { id: "education", name: "Educational Certificates", description: "Degree certificates, Transcripts" },
  { id: "employment", name: "Previous Employment Letter", description: "Experience letter or Relieving letter" },
  { id: "tax-docs", name: "Tax Documents", description: "PAN card, Tax returns, or W-2 forms" },
];

const initialDocuments: Document[] = documentCategories.map((cat) => ({
  id: cat.id,
  name: cat.name,
  category: cat.id,
  status: "required",
  uploadedAt: null,
}));

const statusConfig = {
  verified: { icon: Check, color: "text-success", bg: "bg-success-light", label: "Verified" },
  pending: { icon: Clock, color: "text-warning", bg: "bg-warning-light", label: "Pending Review" },
  required: { icon: AlertCircle, color: "text-destructive", bg: "bg-destructive/10", label: "Required" },
};

export const Documents = () => {
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [documents, setDocuments] = useLocalStorage<Document[]>("onboarding-documents", initialDocuments);
  const [bankDetails, setBankDetails] = useLocalStorage<BankDetails>("bank-details", {
    accountNumber: "",
    ifscCode: "",
    verified: false,
  });
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [accountNumber, setAccountNumber] = useState(bankDetails.accountNumber);
  const [ifscCode, setIfscCode] = useState(bankDetails.ifscCode);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      setUploadDialogOpen(true);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      if (selectedCategory) {
        uploadDocument(files[0], selectedCategory);
      } else {
        setUploadDialogOpen(true);
      }
    }
  };

  const uploadDocument = (file: File, categoryId: string) => {
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      toast({
        title: "File too large",
        description: "Maximum file size is 10MB",
        variant: "destructive",
      });
      return;
    }

    const validTypes = ["application/pdf", "image/jpeg", "image/png"];
    if (!validTypes.includes(file.type)) {
      toast({
        title: "Invalid file type",
        description: "Please upload PDF, JPG, or PNG files only",
        variant: "destructive",
      });
      return;
    }

    setDocuments((prev) =>
      prev.map((doc) =>
        doc.id === categoryId
          ? {
              ...doc,
              status: "pending" as const,
              uploadedAt: new Date().toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              }),
              fileName: file.name,
              fileSize: file.size,
            }
          : doc
      )
    );

    toast({
      title: "Document uploaded",
      description: `${file.name} has been uploaded and is pending review`,
    });

    setSelectedCategory(null);
    setUploadDialogOpen(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleUploadClick = (categoryId?: string) => {
    if (categoryId) {
      setSelectedCategory(categoryId);
    }
    fileInputRef.current?.click();
  };

  const handleVerifyBank = () => {
    if (!accountNumber.trim() || !ifscCode.trim()) {
      toast({
        title: "Missing information",
        description: "Please enter both account number and IFSC code",
        variant: "destructive",
      });
      return;
    }

    if (accountNumber.length < 8 || accountNumber.length > 18) {
      toast({
        title: "Invalid account number",
        description: "Account number should be 8-18 digits",
        variant: "destructive",
      });
      return;
    }

    setBankDetails({
      accountNumber,
      ifscCode,
      verified: true,
    });

    toast({
      title: "Bank account verified",
      description: "Your bank details have been verified successfully",
    });
  };

  const verifiedCount = documents.filter((d) => d.status === "verified").length;
  const pendingCount = documents.filter((d) => d.status === "pending").length;

  return (
    <div className="animate-fade-in">
      <PageBreadcrumb items={[{ label: "Pre-Onboarding", to: "/" }, { label: "Document Submission" }]} />

      <div className="mb-8">
        <h1 className="text-2xl lg:text-3xl font-bold text-foreground mb-2">Personal Documents</h1>
        <p className="text-muted-foreground">Upload and manage your verification documents</p>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept=".pdf,.jpg,.jpeg,.png"
        onChange={handleFileSelect}
        className="hidden"
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Upload Area */}
        <div className="card-interactive p-6 lg:col-span-2">
          <div className="flex items-center gap-3 mb-4">
            <div className="icon-circle-primary">
              <Scan className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-foreground">Smart Document Scanner</h2>
              <p className="text-sm text-muted-foreground">Upload your documents for verification</p>
            </div>
          </div>

          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors cursor-pointer ${
              isDragging ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
            }`}
          >
            <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-2xl flex items-center justify-center">
              <Upload className="w-8 h-8 text-primary" />
            </div>
            <p className="text-foreground font-medium mb-1">Drag & drop your documents here</p>
            <p className="text-sm text-muted-foreground mb-4">or click to browse files</p>
            <div className="flex justify-center gap-3">
              <Button onClick={() => handleUploadClick()}>
                <Upload className="w-4 h-4 mr-2" />
                Upload Document
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-4">Supported: PDF, JPG, PNG (max 10MB)</p>
          </div>

          {/* Progress Summary */}
          <div className="mt-4 flex items-center justify-between p-4 bg-secondary/50 rounded-xl">
            <div className="flex items-center gap-6">
              <div className="text-center">
                <p className="text-2xl font-bold text-success">{verifiedCount}</p>
                <p className="text-xs text-muted-foreground">Verified</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-warning">{pendingCount}</p>
                <p className="text-xs text-muted-foreground">Pending</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-destructive">
                  {documents.filter((d) => d.status === "required").length}
                </p>
                <p className="text-xs text-muted-foreground">Required</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium text-foreground">
                {Math.round((verifiedCount / documents.length) * 100)}% Complete
              </p>
              <div className="w-32 h-2 bg-muted rounded-full mt-1 overflow-hidden">
                <div
                  className="h-full bg-success rounded-full transition-all"
                  style={{ width: `${(verifiedCount / documents.length) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Bank Verification */}
        <div className="card-interactive p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className={`icon-circle-${bankDetails.verified ? "success" : "primary"}`}>
              <CreditCard className="w-5 h-5" />
            </div>
            <h2 className="text-lg font-semibold text-foreground">Bank Verification</h2>
          </div>

          {bankDetails.verified ? (
            <div className="bg-success-light rounded-xl p-4 text-center">
              <Check className="w-12 h-12 mx-auto mb-2 text-success" />
              <p className="font-medium text-success">Account Verified</p>
              <p className="text-sm text-muted-foreground mt-1">
                ****{bankDetails.accountNumber.slice(-4)}
              </p>
              <Button
                variant="outline"
                size="sm"
                className="mt-3"
                onClick={() =>
                  setBankDetails({ accountNumber: "", ifscCode: "", verified: false })
                }
              >
                Update Details
              </Button>
            </div>
          ) : (
            <>
              <div className="bg-secondary/50 rounded-xl p-4 mb-4">
                <p className="text-sm text-muted-foreground mb-3">
                  Securely verify your bank account for salary deposits
                </p>
                <div className="space-y-3">
                  <div>
                    <label className="text-xs text-muted-foreground">Account Number</label>
                    <input
                      type="text"
                      value={accountNumber}
                      onChange={(e) => setAccountNumber(e.target.value.replace(/\D/g, ""))}
                      placeholder="Enter account number"
                      maxLength={18}
                      className="w-full mt-1 px-3 py-2 rounded-lg border border-input bg-background text-sm"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground">IFSC Code</label>
                    <input
                      type="text"
                      value={ifscCode}
                      onChange={(e) => setIfscCode(e.target.value.toUpperCase())}
                      placeholder="Enter IFSC code"
                      maxLength={11}
                      className="w-full mt-1 px-3 py-2 rounded-lg border border-input bg-background text-sm"
                    />
                  </div>
                </div>
              </div>
              <Button className="w-full" onClick={handleVerifyBank}>
                Verify Account
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Documents List */}
      <div className="card-interactive p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="icon-circle-primary">
              <FileText className="w-5 h-5" />
            </div>
            <h2 className="text-lg font-semibold text-foreground">Document Status</h2>
          </div>
          <span className="text-sm text-muted-foreground">
            {verifiedCount}/{documents.length} verified
          </span>
        </div>

        <div className="space-y-3">
          {documents.map((doc) => {
            const config = statusConfig[doc.status];
            const StatusIcon = config.icon;
            const categoryInfo = documentCategories.find((c) => c.id === doc.id);

            return (
              <div
                key={doc.id}
                className="flex items-center justify-between p-4 rounded-xl border border-border hover:border-primary/30 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
                    <FileText className="w-5 h-5 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{doc.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {doc.uploadedAt
                        ? `Uploaded on ${doc.uploadedAt}${doc.fileName ? ` • ${doc.fileName}` : ""}`
                        : categoryInfo?.description || "Not uploaded yet"}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span
                    className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-sm ${config.bg} ${config.color}`}
                  >
                    <StatusIcon className="w-4 h-4" />
                    {config.label}
                  </span>
                  {doc.status === "required" && (
                    <Button size="sm" onClick={() => handleUploadClick(doc.id)}>
                      Upload
                    </Button>
                  )}
                  {doc.status === "pending" && (
                    <Button variant="outline" size="sm" onClick={() => handleUploadClick(doc.id)}>
                      Replace
                    </Button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Category Selection Dialog */}
      <Dialog open={uploadDialogOpen} onOpenChange={setUploadDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Select Document Category</DialogTitle>
          </DialogHeader>
          <div className="space-y-2">
            {documentCategories.map((cat) => {
              const existingDoc = documents.find((d) => d.id === cat.id);
              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    setSelectedCategory(cat.id);
                    setUploadDialogOpen(false);
                    fileInputRef.current?.click();
                  }}
                  className="w-full p-4 text-left rounded-xl border border-border hover:border-primary/50 hover:bg-primary/5 transition-colors"
                >
                  <p className="font-medium text-foreground">{cat.name}</p>
                  <p className="text-sm text-muted-foreground">{cat.description}</p>
                  {existingDoc?.status !== "required" && (
                    <span className="text-xs text-warning">Already uploaded - will replace</span>
                  )}
                </button>
              );
            })}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
