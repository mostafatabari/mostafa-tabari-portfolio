import { useState, useEffect, useRef, useCallback } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { useFileUpload } from "../../hooks/fileUpload/useFileUpload.ts";
import type { FormikHelpers } from "formik";

/* Form values interface */
export interface CommentFormValues {
  name: string;
  email: string;
  subject: string;
  message: string;
}

/* Custom hook for contact form */
export const useContactForm = (maxFiles: number, maxSizeMB: number) => {
  const { files, errors, ref, removeFile, addError } = useFileUpload(
    maxFiles,
    maxSizeMB
  ); // File upload hook

  const [popupErrors, setPopupErrors] = useState<string[]>([]); // Popup error messages
  const isMountedRef = useRef(true); // Tracks component mounted state

  /* Set mounted ref false on unmount */
  useEffect(() => {
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  /* Sync file upload errors to popup errors */
  useEffect(() => {
    setPopupErrors((prev) => {
      const newErrors = errors.filter((e) => !prev.includes(e)); // Filter new errors
      return [...prev, ...newErrors];
    });
  }, [errors]);

  /* Handle form submission */
  const handleCreateComment = useCallback(
    async (
      values: CommentFormValues,
      { resetForm }: FormikHelpers<CommentFormValues>
    ) => {
      const newId = uuidv4(); // Generate unique ID

      try {
        await axios.post("http://localhost:8000/comments", {
          id: newId,
          ...values,
          attachment: files
            .filter((f) => f.url)
            .map((f) => f.url)
            .join(","), // File URLs
        });

        if (isMountedRef.current) resetForm(); // Reset form after success
      } catch {
        if (isMountedRef.current)
          addError("Failed to send comment. Please try again."); // Show error
      }
    },
    [files, addError]
  );

  /* Return hook state and functions */
  return {
    files,
    popupErrors,
    setPopupErrors,
    ref,
    removeFile,
    addError,
    handleCreateComment,
  };
};
