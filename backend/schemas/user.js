export default {
  name: "user",
  title: "User",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Name",
      type: "string",
    },
    {
    	name: "headerImage", 
    	title: "HeaderImage", 
    	type: "image"
    }, 
    {
      name: "image",
      title: "Image",
      type: "string",
    },
    {
      name: "bio",
      title: "Bio",
      type: "string",
    },
    {
      name: "email",
      title: "Email",
      type: "string",
    },
      {
      name: "follow",
      title: "Follow",
      type: "array",
      of: [{ type: "follow" }],
    },
  ],
};
