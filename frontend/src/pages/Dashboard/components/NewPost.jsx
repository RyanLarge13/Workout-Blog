import React, {
  useCallback,
  useState,
  useMemo,
  useEffect,
  useContext,
} from "react";
import { newBlogContext } from "../../../context/newBlogContext.js";
import { AiOutlineCloudUpload, AiFillDelete } from "react-icons/ai";
import { BounceLoader } from "react-spinners";
import { client } from "../../../client.js";
import JoditEditor from "jodit-react";

const NewPost = () => {
  const [imageAsset, setImageAsset] = useState(null);
  const [wrongImageType, setWrongImageType] = useState(false);
  const [imageLoad, setImageLoad] = useState(false);
  const { content, setContent } = useContext(newBlogContext);
  const [logs, setLogs] = useState([]);

  const appendLog = useCallback(
    (message) => {
      console.log("logs = ", logs);
      const newLogs = [...logs, message];
      setLogs(newLogs);
    },
    [logs, setLogs]
  );

  const config = useMemo(
    () => ({
      readonly: false,
      uploader: {
        insertImageAsBase64URI: true,
      },
    }),
    []
  );

  const onChange = useCallback(
    (newContent) => {
      appendLog(`onChange triggered with ${newContent}`);
    },
    [appendLog]
  );

  const onBlur = useCallback(
    (newContent) => {
      appendLog(`onBlur triggered with ${newContent}`);
      setContent(newContent);
    },
    [appendLog, setContent]
  );

  useEffect(() => {
    console.log("onChange = ", onChange);
  }, [onChange]);

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
                  name="ploadImage"
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
      <JoditEditor
        value={content}
        config={config}
        tabIndex={1}
        onBlur={onBlur}
        onChange={onChange}
      />
      <section>
        <h1>Display</h1>
        <div dangerouslySetInnerHTML={{ __html: content }}></div>
      </section>
    </section>
  );
};

export default NewPost;
