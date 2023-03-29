import sanityClient from "@sanity/client";
import { v4 as uuidv4 } from "uuid";

export const client = sanityClient({
  projectId: "qvybfss8",
  dataset: "production",
  apiVersion: "2023-01-31",
  useCdn: false,
  token:
    "skyCyBeSqCgxo4Cz5cwodES6NxBk5rsDS7ykNzBBNJs1C6XQ8AHeCavvxj2IGtAL7iv0fHVUlQYIsHVvCup6ttspsHwof36lI219WkJtiQIVKJyzCqf5ZVgk85BwfFGiduhTBNR1wXESshxwWakhh9b29VTdopkxFhDZOr4YUIVobiE8OeDP",
});

export const createUser = async (user) => {
  const newUser = await client.createIfNotExists(user);
  return newUser;
};

export const getUserInfo = async (id) => {
  const userDetails = await client.fetch(
    `*[_type == 'user' && _id match '${id}']`
  );
  return userDetails;
};

export const getPosts = async () => {
  const posts = await client.fetch(
    `*[_type == "post"] | order(_createdAt desc){
      title,
      excerpt, 
      image {
        asset -> {
          url
        }
      },
      _id,
      destination,
      categories[]-> | order(title asc), 
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
    }[0...20]`
  );
  return posts;
};

export const getFollowerCategoryPosts = (categoryId, followerId) => {
  const posts = client.fetch(
    `*[_type == 'post' && '${categoryId}' in categories[]->_id && userId match '${followerId}']`
  );
  return posts;
};

export const getSearchedPosts = async (searchTerm) => {
  const filteredPosts = client.fetch(
    `*[_type == "post" && title match '${searchTerm}*' || catagory match '${searchTerm}*' || about match '${searchTerm}*']{
      title,
      image {
        asset -> {
          url
        }
      },
      _id,
      destination,
      categories[]-> | order(title asc), 
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

export const getPostsByCategory = (id) => {
  const posts =
    client.fetch(`*[_type == 'post' && '${id}' in categories[]->_id] | order(_createdAt desc){
      title,
      excerpt, 
      image {
        asset -> {
          url
        }
      },
      _id,
      destination,
      categories[]-> | order(title asc), 
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
  }[0...20]`);
  return posts;
};

export const getPostsByFollowing = (userId) => {
  const posts =
    client.fetch(`*[_type == "post" && userId match '${userId}'] | order(_createdAt desc){
      title,
      excerpt, 
      image {
        asset -> {
          url
        }
      },
      _id,
      destination,
      categories[]-> | order(title asc), 
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
    }[0...20]`);
  return posts;
};

export const getPersonalPosts = async (id) => {
  const myPosts = await client.fetch(
    `*[_type == "post" && userId match '${id}'] | order(_createdAt desc){
      title,
      excerpt, 
      image {
        asset -> {
          url
        }
      },
      _id,
      destination,
      categories[]-> | order(title asc), 
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
      comments[] -> {
        _key,
        postedBy -> {
        	_id, 
        	name, 
        	image
        }, 
      }, 
      _createdAt, 
      publishedAt,
    }[0...20]`
  );
  return myPosts;
};

export const getCategories = () => {
  const categories = client.fetch(`*[_type == 'category'] | order(title asc)`);
  return categories;
};

export const getAllLikesAndComments = (userId) => {
  const allLikes = client.fetch(
    `*[_type == 'post' && userId match '${userId}']{
    	save[]->, 
    	comments[]->,
    }`
  );
  return allLikes;
};

export const getAllFollowing = (id) => {
  const result = client.fetch(`*[_type == 'user' && _id match '${id}']{
  	follow[] {
  	  userId, 
      postedBy->{
        _id, 
        name, 
        image,
      } 
  	},
  }`);
  return result;
};

export const getAllFollowers = (id) => {
  const result = client.fetch(
    `*[_type == 'user' && '${id}' in follow[].userId]{
    	name, 
    	_id, 
    	image, 
    }`
  );
  return result;
};

export const followUser = (userId, followId) => {
  const follow = client
    .patch(userId)
    .setIfMissing({ follow: [] })
    .insert("after", "follow[-1]", [
      {
        _key: uuidv4(),
        userId: followId,
        postedBy: {
          _type: "postedBy",
          _ref: followId,
        },
      },
    ])
    .commit();
  return follow;
};

export const unfollowUser = (key, userId) => {
  const unfollowQuery = [`follow[_key == "${key}"]`];
  const unfollow = client.patch(userId).unset(unfollowQuery).commit();
  return unfollow;
};

export const createPost = async (post) => {
  const result = client.createIfNotExists(post);
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
      categories[]-> | order(title asc),
      body,
      title, 
      excerpt, 
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
      comments[] {
        comment, 
      	postedBy -> {
          _id,
          name, 
          image
        },
        createdAt,
      } | order(createdAt asc), 
      _createdAt,
      publishedAt,
    }`);
  return result;
};

export const savePost = async (postId, userId) => {
  const saved = client
    .patch(postId)
    .setIfMissing({ save: [] })
    .insert("after", "save[-1]", [
      {
        _key: uuidv4(),
        userId: userId,
        postedBy: {
          _type: "postedBy",
          _ref: userId,
        },
      },
    ])
    .commit();
  return saved;
};

export const unsavePost = (postId, key) => {
  const savedToRemove = [`save[_key == "${key}"]`];
  const unsaved = client.patch(postId).unset(savedToRemove).commit();
  return unsaved;
};

export const updateDocumentTitle = async (_id, title) => {
  const result = client.patch(_id).set({ title });
  return result;
};

export const updateProfileImage = (id, image) => {
  const result = client.patch(id).set({ image }).commit();
  return result;
};

export const updateHeaderImage = (userId, headerImage) => {
  const result = client
    .patch(userId)
    .set({ headerImage: { asset: { _ref: headerImage._id } } })
    .commit();
  return result;
};

export const updateBio = (id, bio) => {
  const newBio = client.patch(id).set({ bio }).commit();
  return newBio;
};

export const updatePost = (postId, updatedPost) => {
  const { title, excerpt, body, categories, publishedAt } = updatedPost;
  if (updatedPost.image) {
    const update = client
      .patch(postId)
      .set({
        title,
        excerpt,
        body,
        categories: categories.map((id) => ({
          _ref: id,
        })),
        image: { asset: { _ref: updatedPost.image._id } },
        publishedAt,
      })
      .commit();
    return update;
  }
  if (!updatedPost.image) {
    const update = client
      .patch(postId)
      .set({
        title,
        excerpt,
        body,
        categories: categories.map((id) => ({
          _ref: id,
        })),
        publishedAt,
      })
      .commit({ autoGenerateArrayKeys: true });
    return update;
  }
};

export const addComment = (postId, userId, comment) => {
  const addedComment = client
    .patch(postId)
    .setIfMissing({ comments: [] })
    .insert("after", "comments[-1]", [
      {
        _key: uuidv4(),
        comment,
        createdAt: new Date(),
        postedBy: {
          _type: "postedBy",
          _ref: userId,
        },
      },
    ])
    .commit();
  return addedComment;
};

export const deleteMyPost = async (id) => {
  const result = client.delete(id);
  return result;
};

export const updateUsername = async (_id, username) => {
  const updatedDocument = client.patch(_id).set({ name: username }).commit();
  return updatedDocument;
};

export const deleteUser = async (userId) => {
  const deletedUser = client.delete(userId);
  return deletedUser;
};
