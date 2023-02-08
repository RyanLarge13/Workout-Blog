import sanityClient from "@sanity/client";

export const client = sanityClient({
  projectId: "qvybfss8",
  dataset: "production",
  apiVersion: "2023-01-31",
  useCdn: true,
});

export const getPosts = async () => {
  const posts = await client.fetch("*[_type == 'post']");
  return posts;
};

export const getPersonalPosts = async (author) => {
  const myPosts = await client.fetch(
    `*[_type == 'post' && author == ${author} ] | order(desc)`
  );
  return myPosts;
};

export const createPost = async (post) => {
  const result = client.create(post);
  return result;
};

export const updateDocumentTitle = async (_id, title) => {
  const result = client.patch(_id).set({ title });
  return result;
};
