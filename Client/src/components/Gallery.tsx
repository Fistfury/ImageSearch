import { useAuth0 } from "@auth0/auth0-react";
import { TrashIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import { useEffect, useState } from "react";

interface Image {
  link: string;
  title: string;
}

interface Item {
  url: string;
  title: string;
  image: Image;
}

export const Gallery = () => {
  const { user } = useAuth0();
  const [savedPictures, setSavedPictures] = useState<Item[]>([]);

  useEffect(() => {
    const fetchUserPictures = async () => {
      if (user && user.name) {
        const username = user.name;
        try {
          const response = await axios.get(
            `http://localhost:3000/gallery/${encodeURIComponent(username)}`
          );
          console.log("User's saved pictures", response.data);
          setSavedPictures(response.data);
        } catch (error) {
          console.error("Failed to get user's saved pictures", error);
        }
      }
    };

    fetchUserPictures();
  }, [user]);

  const handleDeleteClick = async (picture: Item) => {
    if (
      user &&
      user.name &&
      window.confirm("Are you sure you want to delete this picture?")
    ) {
      const username = user.name;
      const userPicture = picture.url;
      try {
        await axios.delete(
          `http://localhost:3000/gallery/${encodeURIComponent(
            username
          )}/${encodeURIComponent(userPicture)}`
        );
        setSavedPictures(savedPictures.filter((p) => p.url !== picture.url));
      } catch (error) {
        console.error("Failed to delete image", error);
      }
    }
  };

  return (
    <div className="flex flex-wrap justify-center">
      {savedPictures.map((picture, index) => (
        <div
          key={index}
          className="flex flex-col border rounded shadow-lg overflow-hidden m-2 "
        >
          <img
            src={picture.url}
            alt={picture.title}
            className="w-full h-36 object-cover"
          />
          <button onClick={() => handleDeleteClick(picture)}
          className="flex justify-center items-center">
            <TrashIcon className=" h-8 w-8 mt-2 text-darkGreen transition-transform duration-300 hover:scale-105 hover:shadow-2xl" />
          </button>
        </div>
      ))}
    </div>
  );
};
