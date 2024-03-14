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

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {savedPictures.map((picture, index) => (
        <div key={index} className="border rounded shadow-lg overflow-hidden">
          <img
            src={picture.url}
            alt={picture.title}
            className="w-full h-48 object-cover"
          />
        </div>
      ))}
    </div>
  );
};
