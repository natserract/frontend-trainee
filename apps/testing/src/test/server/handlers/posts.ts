import { http, HttpResponse, PathParams, DefaultBodyType } from "msw";

import { API_HOST } from "../../../config";
import type { Post } from "../../../features/posts/types/models";
import * as postsDB from "../../data/posts";

// @see https://mswjs.io/docs/best-practices/structuring-handlers
export const postsHandlers = [
  http.get<PathParams, DefaultBodyType, Post[] | { message: string }>(
    `${API_HOST}/posts`,
    async ({ request }) => {
      console.debug("Handler", request.method, request.url);

      try {
        const result = await postsDB.readMany();
        return HttpResponse.json(result);
      } catch (error: any) {
        return HttpResponse.json(
          {
            message: error?.message || "Server Error",
          },
          { status: 400 },
        );
      }
    },
  ),
  http.get(`${API_HOST}/posts/:postId`, async ({ params }) => {
    try {
      const { postId } = params;
      const result = await postsDB.read(parseInt(postId as string, 10));
      return HttpResponse.json(result);
    } catch (error: any) {
      return HttpResponse.json(
        {
          message: error?.message || "Server Error",
        },
        { status: 400 },
      );
    }
  }),
];
