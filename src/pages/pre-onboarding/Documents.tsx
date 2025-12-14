import { PageBreadcrumb } from "@/components/ui/PageBreadcrumb";
import { FileText, Upload, Scan, CreditCard, Check, Clock, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const documents = [
  { id: 1, name: "Government ID", status: "verified", uploadedAt: "Dec 8, 2024" },
  { id: 2, name: "Address Proof", status: "pending", uploadedAt: "Dec 10, 2024" },
  { id: 3, name: "Educational Certificates", status: "verified", uploadedAt: "Dec 8, 2024" },
  { id: 4, name: "Previous Employment Letter", status: "required", uploadedAt: null },
  { id: 5, name: "Bank Account Details", status: "required", uploadedAt: null },
];

const statusConfig = {
  verified: { icon: Check, color: "text-success", bg: "bg-success-light", label: "Verified" },
  pending: { icon: Clock, color: "text-warning", bg: "bg-warning-light", label: "Pending Review" },
  required: { icon: AlertCircle, color: "text-destructive", bg: "bg-destructive/10", label: "Required" },
};

export const Documents = () => {
  return (
    <div className="animate-fade-in">
      <PageBreadcrumb items={[{ label: "Pre-Onboarding", to: "/" }, { label: "Document Submission" }]} />

      <div className="mb-8">
        <h1 className="text-2xl lg:text-3xl font-bold text-foreground mb-2">Personal Documents</h1>
        <p className="text-muted-foreground">Upload and manage your verification documents</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* OCR Scanner */}
        <div className="card-interactive p-6 lg:col-span-2">
          <div className="flex items-center gap-3 mb-4">
            <div className="icon-circle-primary">
              <Scan className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-foreground">Smart Document Scanner</h2>
              <p className="text-sm text-muted-foreground">Auto-read and extract document details</p>
            </div>
          </div>

          <div className="border-2 border-dashed border-border rounded-xl p-8 text-center hover:border-primary/50 transition-colors cursor-pointer">
            <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-2xl flex items-center justify-center">
              <Upload className="w-8 h-8 text-primary" />
            </div>
            <p className="text-foreground font-medium mb-1">Drag & drop your documents here</p>
            <p className="text-sm text-muted-foreground mb-4">or click to browse files</p>
            <div className="flex justify-center gap-3">
              <Button>
                <Upload className="w-4 h-4 mr-2" />
                Upload Document
              </Button>
              <Button variant="outline">
                <Scan className="w-4 h-4 mr-2" />
                Scan with Camera
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-4">Supported: PDF, JPG, PNG (max 10MB)</p>
          </div>
        </div>

        {/* Bank Verification */}
        <div className="card-interactive p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="icon-circle-success">
              <CreditCard className="w-5 h-5" />
            </div>
            <h2 className="text-lg font-semibold text-foreground">Bank Verification</h2>
          </div>

          <div className="bg-secondary/50 rounded-xl p-4 mb-4">
            <p className="text-sm text-muted-foreground mb-3">
              Securely verify your bank account for salary deposits
            </p>
            <div className="space-y-3">
              <div>
                <label className="text-xs text-muted-foreground">Account Number</label>
                <input
                  type="text"
                  placeholder="Enter account number"
                  className="w-full mt-1 px-3 py-2 rounded-lg border border-input bg-background text-sm"
                />
              </div>
              <div>
                <label className="text-xs text-muted-foreground">IFSC Code</label>
                <input
                  type="text"
                  placeholder="Enter IFSC code"
                  className="w-full mt-1 px-3 py-2 rounded-lg border border-input bg-background text-sm"
                />
              </div>
            </div>
          </div>

          <Button className="w-full">
            Verify Account
          </Button>
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
            {documents.filter(d => d.status === "verified").length}/{documents.length} verified
          </span>
        </div>

        <div className="space-y-3">
          {documents.map((doc) => {
            const config = statusConfig[doc.status as keyof typeof statusConfig];
            const StatusIcon = config.icon;

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
                      {doc.uploadedAt ? `Uploaded on ${doc.uploadedAt}` : "Not uploaded yet"}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-sm ${config.bg} ${config.color}`}>
                    <StatusIcon className="w-4 h-4" />
                    {config.label}
                  </span>
                  {doc.status === "required" && (
                    <Button size="sm">Upload</Button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
