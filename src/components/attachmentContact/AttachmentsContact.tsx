import React, { useState, useRef, useCallback } from "react";
import UploadButton from "@rpldy/upload-button";
import UploadDropZone from "@rpldy/upload-drop-zone";
import Icon from "../iconsSvg/IconsSvg.tsx";

interface AttachmentsContactProps {
  reft: React.RefObject<HTMLDivElement | null>;
}

function AttachmentsContact({ reft }: AttachmentsContactProps) {
  /* State to track whether user is currently dragging files over the drop zone */
  const [isDragging, setIsDragging] = useState(false);

  /* Ref to prevent multiple rapid state updates on drag events */
  const tickingRef = useRef(false);

  const handleDragEnter = useCallback(() => {
    if (!tickingRef.current) {
      window.requestAnimationFrame(() => {
        setIsDragging(true);
        tickingRef.current = false;
      });
      tickingRef.current = true;
    }
  }, []);

  const handleDragLeaveOrDrop = useCallback(() => {
    if (!tickingRef.current) {
      window.requestAnimationFrame(() => {
        setIsDragging(false);
        tickingRef.current = false;
      });
      tickingRef.current = true;
    }
  }, []);

  return (
    <div className="w-full mt-2">
      <h3 className="text-caption text-primary mb-1.5">
        Attachments
        <span className="text-secondary">
          (optional, max 10 files, 25MB each)
        </span>
      </h3>

      <div
        ref={reft}
        className={`w-full min-h-40 border-2 border-dashed rounded-md indent-2 hover:border-gray-400 duration-300
              ${
                isDragging
                  ? "border-blue-500 bg-blue-500/10"
                  : "border-secondary-sec"
              }`}
        onDragOver={handleDragEnter}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeaveOrDrop}
        onDrop={handleDragLeaveOrDrop}
      >
        <UploadButton className="w-full h-full p-6 flex flex-col justify-between items-center gap-2 cursor-pointer">
          <UploadDropZone className="w-full h-full">
            <Icon type="image" className="text-5xl text-disabled" />

            <div className="text-center">
              <p className="text-body text-primary">
                Drop files here or{" "}
                <span className="text-accent">click to browse</span>
              </p>

              <p className="text-caption text-secondary">
                Supports: Images, PDFs, Word docs, Text files, ZIP files
              </p>
            </div>
          </UploadDropZone>
        </UploadButton>
      </div>
    </div>
  );
}

export default AttachmentsContact;
