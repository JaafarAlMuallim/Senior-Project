import React from "react";

const FolderContent: React.FC<{ folderId: number }> = ({ folderId }) => {
  return (
    <div>
      <h1>Folder Content for Folder ID: {folderId}</h1>
    </div>
  );
};

export default FolderContent;
