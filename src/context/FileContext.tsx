import React, { createContext, useContext, useState, useCallback } from 'react';

interface FileContextType {
  files: File[];
  addFiles: (newFiles: File[]) => void;
  removeFile: (index: number) => void;
  clearFiles: () => void;
  moveFile: (index: number, direction: -1 | 1) => void;
  setFiles: (files: File[]) => void;
}

const FileContext = createContext<FileContextType | undefined>(undefined);

export const FileProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [files, setFilesState] = useState<File[]>([]);

  const addFiles = useCallback((newFiles: File[]) => {
    setFilesState(prev => [...prev, ...newFiles]);
  }, []);

  const removeFile = useCallback((index: number) => {
    setFilesState(prev => prev.filter((_, i) => i !== index));
  }, []);

  const clearFiles = useCallback(() => {
    setFilesState([]);
  }, []);

  const moveFile = useCallback((index: number, direction: -1 | 1) => {
    setFilesState(prev => {
      if (index + direction < 0 || index + direction >= prev.length) return prev;
      const newFiles = [...prev];
      [newFiles[index], newFiles[index + direction]] = [newFiles[index + direction], newFiles[index]];
      return newFiles;
    });
  }, []);

  const setFiles = useCallback((newFiles: File[]) => {
    setFilesState(newFiles);
  }, []);

  return (
    <FileContext.Provider value={{ files, addFiles, removeFile, clearFiles, moveFile, setFiles }}>
      {children}
    </FileContext.Provider>
  );
};

export const useFiles = () => {
  const context = useContext(FileContext);
  if (context === undefined) {
    throw new Error('useFiles must be used within a FileProvider');
  }
  return context;
};
