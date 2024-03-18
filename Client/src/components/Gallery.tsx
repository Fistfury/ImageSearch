import { useAuth0 } from "@auth0/auth0-react";
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
    if (user && user.name && window.confirm("Are you sure you want to delete this picture?"))
     { 
      const username = user.name;
      try {
        await axios.delete(`http://localhost:3000/gallery/${encodeURIComponent(username)}`, {
          data: { title: picture.title },
        });
        setSavedPictures(savedPictures.filter((p) => p.title !== picture.title));
      } catch (error) {
        console.error("Failed to delete image", error);
      }
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {savedPictures.map((picture, index) => (
        <div key={index} className="border rounded shadow-lg overflow-hidden">
          <img
            src={picture.url}
            alt={picture.title}
            className="w-full h-48 object-cover"
          />
            <button onClick={() => handleDeleteClick(picture)}>Delete</button>
        </div>
      ))}
    </div>
  );
};
