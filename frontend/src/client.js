import sanityClient from "@sanity/client";

export const client = sanityClient({
  projectId: "qvybfss8",
  dataset: "production",
  apiVersion: "2023-01-31",
  useCdn: true,
  token:
    "skhDz41Qj4K3z9TyUajC92I0QqDpeQh1dBF1DgXiXL8K8VxscuTAWwqjbEkj7LZ8m8hnM7tcrTpeT6Q1EIzjZJTvQgk9zovdkBQYDRmAblWlokNKV7wz1bjti58JbhqjlZChVlsDuNNRjzVgXAcm6DyGCBH8Ekq1aDa5wI2zmzxJSbOo8oIh",
});

export const createUser = async (user) => {
  const newUser = await client.createIfNotExists(user);
  return newUser;
};

export const getPosts = async () => {
  const posts = await client.fetch("*[_type == 'post']");
  return posts;
};

export const getPersonalPosts = async (author) => {
  const myPosts = await client.fetch(
    `*[_type == 'post' && author == '${author}']`
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
