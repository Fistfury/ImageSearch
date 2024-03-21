import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";

export interface Image {
  byteSize: number;
}

export interface Item {
  link: string;
  title: string;
  image: Image;
}
export interface SearchResultsProps {
  items: Item[];
}

export const SearchResults = ({ items }: SearchResultsProps) => {
  const { user } = useAuth0();

  const handleImageClick = async (item: Item) => {
    console.log("Image clicked", item);
    console.log("Image byteSize", item.image.byteSize);
    try {
      const response = await axios.post("http://localhost:3000/gallery", {
        user: user?.name,
        savedPicture: [
          {
            title: item.title,
            byteSize: item.image.byteSize,
            url: item.link,
          },
        ],
      });

      console.log("Image saved", response.data);
    } catch (error) {
      console.error("Failed to save image", error);
    }
  };

  return (
    <>
      <div className="flex flex-wrap justify-center">
        {items.map((item) => (
          <div
            key={item.link}
            className="flex border rounded shadow-lg overflow-hidden cursor-pointer transition-transform duration-300 hover:scale-105 hover:shadow-2xl m-2"
          >
            <img
              src={item.link}
              alt={item.title}
              className="w-auto h-36 object-cover"
              onClick={() => handleImageClick(item)}
            />
          </div>
        ))}
      </div>
    </>
  );
};
