import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useFetchClient } from "./useFetchClient";
import { uploadAsset } from "./utils";
import { FileMetadata } from "./files";

type UseUploadParams = {
  endpoint: string;
  debug?: boolean;
};

export function useUpload(params: UseUploadParams) {
  const [progress, setProgress] = useState(0);

  const { post } = useFetchClient();

  const mutation = useMutation<unknown, unknown, { asset: FileMetadata }>({
    mutationFn: async ({ asset }) => {
      if (params.debug) {
        return new Promise((resolve) => resolve(asset));
      }
      return uploadAsset(params.endpoint, asset, post, setProgress);
    },
  });

  const upload = (asset: FileMetadata) => mutation.mutateAsync({ asset });

  return {
    upload,
    error: mutation.error,
    progress,
    status: mutation.status,
  };
}
