"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { Document, Page, pdfjs } from "react-pdf";
import Material from "@/models/material";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url,
).toString();

interface PDFViewerDialogProps {
  file: Material | null;
  isOpen: boolean;

  handleClose: () => void;
}

export function PDFViewerDialog({
  file,
  isOpen,
  handleClose,
}: PDFViewerDialogProps) {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [height, setHeight] = useState<number>(100);

  const handleDownload = () => {
    if (file) {
      const link = document.createElement("a");
      link.href = file.url;
      link.download = file.name!;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl w-full h-[80vh] flex flex-col bg-secondary-gray text-primary-white">
        <DialogHeader className="my-2">
          <DialogTitle className="flex justify-between items-center">
            <span>{file?.name || "Unnamed File"}</span>
            <div className="flex gap-2">
              <Button variant="outline" size="icon" onClick={handleDownload}>
                <Download className="h-4 w-4" />
              </Button>
            </div>
          </DialogTitle>
        </DialogHeader>
        <div className="flex-grow w-full overflow-auto">
          {file && (
            <Document
              file={file.url}
              onLoadSuccess={async (page) => {
                setNumPages(page.numPages);
                const pageObj = await page.getPage(1);
                const pageHeight = pageObj.view[3];
                setHeight(pageHeight);
              }}
              className="flex flex-col items-center w-full"
            >
              {Array.from(new Array(numPages), (_, index) => (
                <Page
                  key={`page_${index + 1}`}
                  pageNumber={index + 1}
                  width={800}
                  height={height}
                />
              ))}
            </Document>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
