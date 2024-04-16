import { useQuery } from "@tanstack/react-query";

import { BaseClient } from "../../../lib/axios";
import { Post } from "../types/models";
import { QueryConfig, ExtractFnReturnType } from "../../../lib/react-query";

const endpoint = "/posts";
const queryKey = ["posts"];

export const getPosts = (): Promise<Post[]> => {
  const client = new BaseClient();
  return client.getListResource(endpoint);
};

export const getPostsPaginate = (
  offset: number,
  limit = 20,
): Promise<Post[]> => {
  const client = new BaseClient();
  return client.getListResource(endpoint, offset, limit);
};

type QueryFnType = typeof getPosts;

type UsePostsOptions = {
  config?: QueryConfig<QueryFnType>;
};

export const usePosts = ({ config }: UsePostsOptions = {}) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey,
    queryFn: getPosts,
  });
};
