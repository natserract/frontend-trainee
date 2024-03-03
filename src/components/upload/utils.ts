import { FileMetadata } from "./files";
import { AxiosRequestConfig, AxiosResponse } from "axios";

export function uploadAsset(
  endpoint: string,
  asset: FileMetadata,
  post: <TData = any, R = AxiosResponse<TData>, TSend = any>(
    url: string,
    data?: TSend,
    config?: AxiosRequestConfig<TSend>
  ) => Promise<R>,
  onProgress?: (total: number) => void
) {
  const { rawFile, name } = asset;
  const formData = new FormData();

  formData.append("files", rawFile);
  formData.append(
    "fileInfo",
    JSON.stringify({
      name,
    })
  );

  return post(endpoint, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    onUploadProgress({ total, loaded }) {
      onProgress && onProgress((loaded / (total || 0)) * 100);
    },
  });
}
