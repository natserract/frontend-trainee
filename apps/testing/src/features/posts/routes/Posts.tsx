import { usePosts } from "../api/get";

export default function Posts() {
  const getPosts = usePosts();

  return (
    <div>
      <h1>Fetch Posts!</h1>
    </div>
  );
}
