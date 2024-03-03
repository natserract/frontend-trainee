import { ACCEPTED_FORMAT, DIMENSION, SIZE } from "./constants";

function isImage(file: File) {
  return file.type.startsWith("image/");
}

interface ImageDimensions {
  height?: number;
  width?: number;
}

export interface FileMetadata extends ImageDimensions {
  ext: string | undefined;
  size: number;
  name: string;
  url: string;
  rawFile: File;
}

export const parseFileMetadatas = async (file: File): Promise<FileMetadata> => {
  const isFormatAuthorized = ACCEPTED_FORMAT.includes(file.type);
  if (!isFormatAuthorized) {
    throw new Error("File format: Format not supported!");
  }

  const fileDimensions = await new Promise<ImageDimensions>((resolve) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (isImage(file)) {
        const img = new Image();
        img.onload = () => {
          resolve({ width: img.width, height: img.height });
        };
        img.src = reader.result as string;
      } else {
        resolve({ width: undefined, height: undefined });
      }
    };
    reader.readAsDataURL(file);
  });

  if (isImage(file) && fileDimensions.width && fileDimensions.height) {
    const areDimensionsAuthorized =
      fileDimensions.width <= DIMENSION && fileDimensions.height <= DIMENSION;

    if (!areDimensionsAuthorized) {
      throw new Error("File dimension: The file uploaded is too large");
    }
  }

  const asset = {
    ext: file.name.split(".").pop(),
    size: file.size / 1000,
    name: file.name,
    url: URL.createObjectURL(file),
    rawFile: file,
    width: fileDimensions.width,
    height: fileDimensions.height,
  };
  const isSizeAuthorized = asset.size <= SIZE;
  if (!isSizeAuthorized) {
    throw new Error("File sizing: The file uploaded is too large");
  }

  return asset;
};
