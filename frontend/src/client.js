import sanityClient from "@sanity/client";

export const client = sanityClient({
  projectId: "qvybfss8",
  dataset: "production",
  apiVersion: "2023-01-31",
  useCdn: true,
  token:
    "skyCyBeSqCgxo4Cz5cwodES6NxBk5rsDS7ykNzBBNJs1C6XQ8AHeCavvxj2IGtAL7iv0fHVUlQYIsHVvCup6ttspsHwof36lI219WkJtiQIVKJyzCqf5ZVgk85BwfFGiduhTBNR1wXESshxwWakhh9b29VTdopkxFhDZOr4YUIVobiE8OeDP",
});

export const createUser = async (user) => {
  const newUser = await client.createIfNotExists(user);
  return newUser;
};

export const getPosts = async () => {
  const posts = await client.fetch(
    `*[_type == 'post'] | order(_createAt desc){
      image {
        asset -> {
          url
        }
      },
      _id,
      destination,
      postedBy -> {
        _id,
        name, 
        image
      },
      save[] {
        _key,
        postedBy -> {
          _id,
          name,
          image
        },
      },
      _createdAt
    }`
  );
  return posts;
};

export const getCatagoryPosts = async (catagoryId) => {
  const filteredPosts = client.fetch(
    `*[_type == "post" && title match '${catagoryId}' || catagory match '${catagoryId}' || about match '${catagoryId}*']{
      image {
        asset -> {
          url
        }
      },
      _id,
      destination,
      postedBy -> {
        _id,
        name, 
        image
      },
      save[] {
        _key,
        postedBy -> {
          _id,
          name,
          image
        },
      },
      _createdAt
    }`
  );
  return filteredPosts;
};

export const getPersonalPosts = async (id) => {
  const myPosts = await client.fetch(
    `*[_type == 'post' && userId match '${id}']`
  );
  return myPosts;
};

export const createPost = async (post) => {
  const result = client.create(post);
  return result;
};

export const singlePost = async (postId) => {
  const result = client.fetch(`*[_type == "post" && _id match "${postId}"]{
      image {
        asset -> {
          url
        }
      },
      _id,
      destination,
      postedBy -> {
        _id,
        name, 
        image
      },
      save[] {
        _key,
        postedBy -> {
          _id,
          name,
          image
        },
      },
      _createdAt,
      desc,
    }`);
  return result;
};

export const updateDocumentTitle = async (_id, title) => {
  const result = client.patch(_id).set({ title });
  return result;
};

export const deleteUser = async (userId) => {
  const deletedUser = await client.delete(
    `*[_type == "user" && _id match '${userId}']`
  );
  return deletedUser;
};
