import { useState, useRef, useCallback } from "react";
import {
  useItemStartListener,
  useItemFinishListener,
  useItemErrorListener,
} from "@rpldy/uploady";
import type { BatchItem } from "@rpldy/shared";

/* Define the shape of each uploaded file */
interface UploadedFile {
  id: string;
  name: string;
  size: number;
  url?: string;
}

/* Define the structure of the returned hook values */
interface UseFileUploadResult {
  files: UploadedFile[]; // Current list of uploaded/added files
  errors: string[]; // List of validation or upload errors
  ref: React.RefObject<HTMLDivElement | null>; // Optional ref for drag-drop or container
  resetFiles: () => void; // Clears all files and errors
  removeFile: (id: string) => void; // Remove a specific file by its ID
  addUploadedFileUrl: (item: BatchItem) => void; // Add the uploaded URL after success
  addError: (msg: string) => void; // Add a new error message
}

/* Custom hook to manage file uploads with validation */
export function useFileUpload(
  maxFiles = 10, // Maximum number of files allowed
  maxSizeMB = 25, // Maximum size per file in MB
  allowedTypes: string[] = [
    /* Supported file types */
    "image/png", // Images
    "image/jpeg", // Images
    "application/pdf", // PDFs
    "application/msword", // Word docs (.doc)
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // Word docs (.docx)
    "text/plain", // Text files
    "application/zip", // ZIP files
  ]
): UseFileUploadResult {
  const [files, setFiles] = useState<UploadedFile[]>([]); // Track valid files
  const [errors, setErrors] = useState<string[]>([]); // Track errors
  const ref = useRef<HTMLDivElement | null>(null); // Optional container ref

  /* Add an error message to the error state (avoid duplicates) */
  const addError = useCallback((msg: string) => {
    setErrors((prev) => (prev.includes(msg) ? prev : [...prev, msg]));
  }, []);

  /* Reset files and errors to initial state */
  const resetFiles = useCallback(() => {
    setFiles([]);
    setErrors([]);
  }, []);

  /* Remove a specific file from the list */
  const removeFile = useCallback((id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
  }, []);

  /* Listener triggered when a new file starts uploading */
  useItemStartListener((item: BatchItem) => {
    const file = item.file as File;
    const fileSizeMB = file.size / (1024 * 1024); // Convert bytes to MB

    /* Validate file type */
    if (!allowedTypes.includes(file.type)) {
      addError(`File type "${file.name}" is not allowed.`);
      return;
    }

    setFiles((prev) => {
      /* Validate max files */
      if (prev.length >= maxFiles) {
        addError(`Maximum "${maxFiles}" attachments allowed.`);
        return prev;
      }

      /* Validate max size */
      if (fileSizeMB > maxSizeMB) {
        addError(
          `File "${file.name}" is too large. Maximum size is ${maxSizeMB}MB.`
        );
        return prev;
      }

      /* Add file to state if all validations pass, store size in KB with decimals */
      return [
        ...prev,
        { id: item.id, name: file.name, size: +(fileSizeMB * 1024).toFixed(2) },
      ];
    });
  });

  /* Add uploaded file URL after successful upload */
  const addUploadedFileUrl = useCallback((item: BatchItem) => {
    const uploadedUrl = item.uploadResponse?.data?.url;
    if (!uploadedUrl) return;

    setFiles((prev) =>
      prev.map((f) => (f.id === item.id ? { ...f, url: uploadedUrl } : f))
    );
  }, []);

  /* Listen for finished uploads to update file URLs */
  useItemFinishListener(addUploadedFileUrl);

  /* Listen for upload errors and add to error state */
  useItemErrorListener((item: BatchItem) => {
    const file = item.file as File;
    addError(`Error uploading "${file.name}"`);
  });

  return {
    files,
    errors,
    ref,
    resetFiles,
    removeFile,
    addUploadedFileUrl,
    addError,
  };
}
