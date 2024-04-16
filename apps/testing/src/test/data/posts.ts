import postsData from "./posts-data.json";

const posts = [...postsData];

async function read(postId: number) {
  return posts.find((post) => post.id === postId);
}

async function readMany(ids: number[] = []) {
  return posts.filter((post) => !ids.includes(post.id));
}

export { read, readMany };
