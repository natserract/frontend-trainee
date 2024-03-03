import { useUpload } from "./useUpload";
import {
  FormEvent,
  PropsWithChildren,
  useRef,
  DragEvent,
  useState,
} from "react";
import { parseFileMetadatas } from "./files";

interface IUpload {
  multiple?: boolean;
  droppable?: boolean;
}

function Upload({ multiple, droppable, children }: PropsWithChildren<IUpload>) {
  const [dragging, setDragging] = useState(false);
  const ref = useRef<HTMLInputElement>(null);

  const { upload } = useUpload({ endpoint: "https://api.com", debug: true });

  const onUploadingFiles = async (files: File[]) => {
    const fileItems = Array.from(files || []);
    if (!fileItems.length) {
      return;
    }

    try {
      const uploadFiles = await Promise.all(
        fileItems.map(async (file) => {
          const asset = await parseFileMetadatas(file);
          const response = await upload(asset);
          return response;
        })
      );
      console.log("files uploaded", uploadFiles);
    } catch (err) {
      console.error(err);
    }
  };

  const handleFileChange = async (e: FormEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    const target = e.target as HTMLInputElement;
    const files = Array.from(target.files || []);
    await onUploadingFiles(files);
  };

  const handleFileDrop = async (e: DragEvent<HTMLDivElement>) => {
    if (!droppable) {
      return;
    }

    e.preventDefault();
    e.stopPropagation();

    const files = Array.from(e.dataTransfer.files || []);
    await onUploadingFiles(files);
    setDragging(false);
  };

  const handleDragEnter = (e: DragEvent<HTMLDivElement>) => {
    if (!droppable) {
      return;
    }

    e.preventDefault();
    e.stopPropagation();

    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      setDragging(true);
    }
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    if (!droppable) {
      return;
    }

    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    if (!droppable) {
      return;
    }

    e.preventDefault();
    e.stopPropagation();

    setDragging(false);
  };

  // Debug
  if (dragging) {
    console.debug("File drag enter into element");
  } else {
    console.debug("File dragg leav from element");
  }

  return (
    <div
      onChange={handleFileChange}
      onDrop={handleFileDrop}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
    >
      <input ref={ref} className="hidden" type="file" multiple={multiple} />

      <label className="flex flex-row items-center w-full h-full">
        {children}
      </label>
    </div>
  );
}

export default Upload;
