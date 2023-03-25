import { useContext, useState } from "react";
import { ProfileContext } from "../../../context/profileContext";
import { updateHeaderImage, client } from "../../../client";
import { DotLoader } from "react-spinners";
import imageUrlBuilder from "@sanity/image-url";

const HeaderImage = () => {
  const { profile } = useContext(ProfileContext);

  const [imageLoad, setImageLoad] = useState(false);
  const [wrongImageType, setWrongImageType] = useState(false);
  const [currentImage, setCurrentImage] = useState(profile.headerImage);

  const builder = imageUrlBuilder(client);
  function urlFor(source) {
    return builder.image(source);
  }

  const addHeaderImage = (e) => {
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
          setCurrentImage(doc);
          setImageLoad(false);
          updateHeaderImage(profile._id, doc);
        })
        .catch((err) => console.log(err));
    } else {
      setImageLoad(false);
      setWrongImageType(true);
    }
  };

  return (
    <div className="p-5 mx-2 my-5 flex flex-col items-center justify-center rounded-md shadow-lg text-white bg-gradient-to-r from-blue-400 to-violet-500 relative md:min-h-[400px]">
      <label className="w-full min-h-[150px] bg-gray-200 flex justify-center items-center text-black">
        {imageLoad && <DotLoader />}
        {wrongImageType ? (
          <p className="text-sm">Please Select The Correct Image Type & Size</p>
        ) : (
          <>
            {profile.headerImage ? (
              <>
                <img
                  src={urlFor(currentImage).url()}
                  alt="header image"
                  className="absolute w-full h-full object-cover object-center rounded-md"
                />
                <p className="text-sm isolate bg-white px-3 py-1 rounded-md shadow-md cursor-pointer">
                  Add A Header Image
                </p>
              </>
            ) : (
              <p className="text-sm">Add A Header Image</p>
            )}
          </>
        )}
        <input
          type="file"
          name="uploadImage"
          className="h-0 w-0"
          onChange={addHeaderImage}
        />
      </label>
    </div>
  );
};

export default HeaderImage;
