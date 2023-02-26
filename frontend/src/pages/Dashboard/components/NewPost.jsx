import React, { useCallback, useState, useMemo, useContext } from "react";
import { ProfileContext } from "../../../context/profileContext.js";
import { newBlogContext } from "../../../context/newBlogContext.js";
import { AiOutlineCloudUpload, AiFillDelete } from "react-icons/ai";
import { BounceLoader } from "react-spinners";
import { createPost, client } from "../../../client.js";
import { elements, variants } from "../../../styles/elements.js";
import { v4 as uuidv4 } from "uuid";
import JoditEditor from "jodit-react";

const NewPost = () => {
  const { profile } = useContext(ProfileContext);
  const { content, setContent } = useContext(newBlogContext);

  const [imageAsset, setImageAsset] = useState(null);
  const [wrongImageType, setWrongImageType] = useState(false);
  const [imageLoad, setImageLoad] = useState(false);
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");

  const config = useMemo(
    () => ({
      height: 600,
      readonly: false,
      uploader: {
        insertImageAsBase64URI: true,
      },
    }),
    []
  );

  const appendLog = useCallback(
    (message) => {
      setContent(message);
    },
    [content, setContent]
  );

  const onChange = useCallback(
    (newContent) => {
      appendLog(newContent);
    },
    [appendLog]
  );

  const onBlur = useCallback(
    (newContent) => {
      appendLog(newContent);
    },
    [appendLog, setContent]
  );

  const uploadImage = (e) => {
    const { type, name } = e.target.files[0];

    setImageLoad(true);

    if (
      type === "image/png" ||
      type === "image/svg" ||
      type === "image/jpeg" ||
      type === "image/gif" ||
      type === "image/tiff"
    ) {
      setWrongImageType(false);
      client.assets
        .upload("image", e.target.files[0], {
          contentType: type,
          filenam: name,
        })
        .then((doc) => {
          setImageLoad(false);
          setImageAsset(doc);
        })
        .catch((err) => console.log(err));
    } else {
      setImageLoad(false);
      setWrongImageType(true);
    }
  };

  const submitNewPost = () => {
    const newPost = {
      _id: uuidv4(),
      _type: "post",
      title,
      excerpt,
      body: content,
      image: imageAsset.url,
      userId: profile._id,
      postedBy: {
        userId: profile._id,
      },
      publishedAt: new Date(),
    };
    createPost(newPost)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  return (
    <section>
      <div className="w-[90%] h-[500px] bg-gray-200 m-5 mx-auto flex justify-center items-center">
        {wrongImageType && <p>Wrong Image Type, please select a new image</p>}
        {!imageAsset ? (
          <label>
            {imageLoad ? (
              <BounceLoader color="#f0f" className="z-1 text-2xl" />
            ) : (
              <>
                <div className="flex justify-center items-center flex-col">
                  <AiOutlineCloudUpload className="text-2xl mb-2" />
                  <p>Upload Header Image</p>
                  <p className="text-gray-400 mt-2">
                    JPG, PNG, SVG, GIF, TIFF less then 20MB
                  </p>
                </div>
                <input
                  type="file"
                  name="uploadImage"
                  onChange={uploadImage}
                  className="mt-10 h-0 w-0"
                />
              </>
            )}
          </label>
        ) : (
          <div className="w-full h-full object-cover overflow-hidden relative flex justify-center items-center">
            <img src={imageAsset?.url} alt="header" />
            <button
              onClick={() => setImageAsset(null)}
              className="absolute bottom-10 bg-white py-2 px-5 rounded-md shadow-md"
            >
              <AiFillDelete className="text-2xl" />
            </button>
          </div>
        )}
      </div>
      <div className="flex justify-center items-center">
        <label htmlFor="title" className="hidden">
          Title
        </label>
        <input
          type="text"
          className={`${elements.input} my-5`}
          id="title"
          name="title"
          placeholder="Title"
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="flex justify-center items-center">
        <label htmlFor="title" className="hidden">
          Title
        </label>
        <textarea
          className="w-full text-center p-3 mx-5 my-5 shadow-md rounded-md"
          name="exceerpt"
          id="excerpt"
          cols="30"
          rows="10"
          placeholder="Excerpt"
          maxLength="600"
          onChange={(e) => setExcerpt(e.target.value)}
        ></textarea>
      </div>
      <JoditEditor
        value={content}
        config={config}
        tabIndex={1}
        onBlur={onBlur}
        onChange={onChange}
      />
      <div className="flex justify-center items-center mt-5">
        <button
          onClick={() => submitNewPost()}
          className={`${elements.button} ${variants.mainBtnBg} mt-5`}
        >
          Submit
        </button>
      </div>
    </section>
  );
};

export default NewPost;
