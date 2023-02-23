export default {
  name: "comment",
  title: "Comment",
  type: "document",
  fields: [
    {
      name: "postedBy",
      title: "PostedBy",
      type: "postedBy",
    },
    {
      name: "comment",
      title: "Comment",
      type: "string",
    },
    {
    	name: "createdAt", 
    	title: "CreatedAt", 
    	type: "datetime"
    }
  ],
};
