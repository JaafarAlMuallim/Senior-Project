"use client";

import React, { useState } from "react";
import { FileIcon, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PDFViewerDialog } from "./PDFViewerDialog";
import Material from "@/models/material";

export function FileList({ materials }: { materials: Material[] }) {
  const [selectedFile, setSelectedFile] = useState<Material | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleFileClick = (file: Material) => {
    setSelectedFile(file);
    setIsDialogOpen(true);
  };
  const handleClose = () => {
    setIsDialogOpen(false);
  };

  return (
    <>
      <div className="flex flex-col items-center gap-4 w-full">
        {materials.map((file) => (
          <FileComponents file={file} handleClick={handleFileClick} />
        ))}
      </div>
      <PDFViewerDialog
        isOpen={isDialogOpen}
        handleClose={handleClose}
        file={selectedFile}
      />
    </>
  );
}
export default FileList;

const FileComponents = ({
  file,
  handleClick,
}: {
  file: Material;
  handleClick: (file: Material) => void;
}) => {
  const handleDownload = (e: React.MouseEvent, file: Material) => {
    e.stopPropagation();
    window.open(file.url, "_blank", "noopener,noreferrer");
  };
  return (
    <div
      className="flex items-center gap-2 bg-white-default shadow-md rounded-lg p-6 transition-transform transform hover:scale-105 hover:shadow-lg hover:bg-primary-light hover:text-primary-white cursor-pointer w-full"
      onClick={() => handleClick(file)}
    >
      <FileIcon />
      <span className="flex-grow font-semibold text-lg">{file.name}</span>
      <Download onClick={(e) => handleDownload(e, file)} />
    </div>
  );
};
