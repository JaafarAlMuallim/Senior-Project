"use client";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const FOLDERS = [
  { id: 1, name: "Class notes" },
  { id: 2, name: "Pictures" },
  { id: 3, name: "Slides" },
  { id: 4, name: "Old Exams" },
];

interface Folder {
  id: number;
  name: string;
}

const Folder: React.FC<{ folder: Folder; onDelete: (id: number) => void }> = ({
  folder,
  onDelete,
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleFolderClick = () => {
    // Navigate to the folder page (replace with actual navigation logic)
    console.log(`Navigating to folder: ${folder.name}`);
  };

  const handleDialogToggle = () => setIsDialogOpen((prev) => !prev);

  return (
    <div
      className="folder bg-white shadow-md rounded-lg p-6 flex items-center transition-transform transform hover:scale-105 hover:shadow-lg hover:bg-blue-500 cursor-pointer"
      onClick={handleFolderClick}
    >
      <span className="folder-icon mr-2 text-3xl">📁</span>
      <span className="folder-name flex-grow font-semibold text-lg">
        {folder.name}
      </span>
      <div className="folder-options relative mb-4">
        <button
          className="cursor-pointer"
          onClick={(e) => {
            e.stopPropagation(); // Prevent triggering folder click
            handleDialogToggle();
          }}
        >
          ...
        </button>
        {isDialogOpen && (
          <ul className="absolute bg-white shadow-md rounded-lg p-2">
            <li>
              <button
                className="bg-white rounded-md text-black w-20 transition-transform transform hover:scale-105 hover:shadow-lg hover:bg-blue-500 cursor-pointer"
                onClick={() => onDelete(folder.id)}
              >
                Delete
              </button>
            </li>
            <li>
              <button
                className="bg-white rounded-md text-black w-20 transition-transform transform hover:scale-105 hover:shadow-lg hover:bg-blue-500 cursor-pointer"
                onClick={handleDialogToggle}
              >
                Close
              </button>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
};

const CoursePage = () => {
  const [sorted, setSorted] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const toggleSort = () => setSorted((prev) => !prev);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleDeleteFolder = (id: number) => {
    // Logic to delete the folder (replace with actual delete logic)
    console.log(`Deleting folder with id: ${id}`);
  };

  const filteredFolders = FOLDERS.filter((folder) =>
    folder.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedFolders = [...filteredFolders].sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  return (
    <MaxWidthWrapper>
      <div className="flex flex-col gap-8">
        <h1 className="text-2xl font-bold">MATH 101</h1>
        <h2 className="text-xl">Folders</h2>
        <div className="flex justify-between items-center mb-4">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearch}
            className="border p-2 rounded-md"
          />
          <div className="flex items-center gap-2">
            <button
              onClick={toggleSort}
              className="text-black hover:bg-blue-100 font-bold py-2 px-4 rounded flex items-center"
            >
              <span className="material-icons">☰⬇</span>
            </button>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <button
                  className="hover:bg-blue-100 text-white font-bold py-2 px-4 rounded flex items-center"
                  onClick={() => setIsDialogOpen(true)}
                >
                  <span className="material-icons">📂</span>
                </button>
              </DialogTrigger>
              <DialogContent>
                <DialogTitle>Upload File</DialogTitle>
                <DialogDescription>
                  <input type="file" />
                </DialogDescription>
                <Button onClick={() => setIsDialogOpen(false)}>Close</Button>
              </DialogContent>
            </Dialog>
          </div>
        </div>
        <div className="flex flex-col item-center gap-4">
          {sortedFolders.map((folder) => (
            <Folder
              key={folder.id}
              folder={folder}
              onDelete={handleDeleteFolder}
            />
          ))}
        </div>
      </div>
    </MaxWidthWrapper>
  );
};

export default CoursePage;
