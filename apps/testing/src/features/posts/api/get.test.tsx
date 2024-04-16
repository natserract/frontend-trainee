import { waitFor, screen, act } from "@testing-library/react";
import { http } from "msw";

import { API_HOST } from "../../../config";
import { createRenderer } from "../../../test";
import { usePosts } from "./get";
import { server } from "../../../test/server/server";

describe("get post", () => {
  const { renderHook, render } = createRenderer();

  function Component() {
    const getPosts = usePosts();

    if (getPosts.isLoading) {
      return <div data-testid="loading">Loading...</div>;
    }

    if (getPosts.isError) {
      return <div data-testid="error">Ups something went wrong!</div>;
    }

    return (
      <div data-testid="posts">
        {getPosts.data?.map((post) => (
          <div data-testid="posts-item" key={post.id}>
            {post.title}
          </div>
        ))}
      </div>
    );
  }

  describe("query", () => {
    it("should render loading state initially and then display posts", async () => {
      act(() => {
        render(<Component />);
      });

      const loading = screen.getByTestId("loading");
      expect(loading).toBeInTheDocument();

      await waitFor(() => {
        const posts = screen.getAllByTestId("posts-item");
        return expect(posts).toHaveLength(20);
      });

      // debug
      screen.debug();
    });

    it("should return the error states for a unsuccessful query", async () => {
      // One time override
      // @see https://mswjs.io/docs/best-practices/network-behavior-overrides/#one-time-override
      server.use(
        http.get(
          `${API_HOST}/posts`,
          () => {
            throw new Error("Error!");
          },
          {
            once: true,
          },
        ),
      );
      const { result, rerender } = renderHook(() => usePosts());

      await waitFor(() => result.current.isError);

      // A function to rerender the test component, causing any hooks to be recalculated.
      // If newProps are passed, they will replace the callback function's initialProps for subsequent rerenders.
      rerender();

      expect(result.current.isError).toEqual(true);
    });
  });
});
