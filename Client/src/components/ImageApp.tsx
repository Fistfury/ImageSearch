import { useAuth0 } from "@auth0/auth0-react";
import { useState } from "react";
import { Item } from "./SearchResults";
import axios from "axios";

// SökMotorId = "34f14d92fbdae4dc1"
interface ImageAppProps {
  setSearchResults: (value: Item[] | null) => void;
}
export const ImageApp = ({ setSearchResults }: ImageAppProps) => {
  const { isAuthenticated } = useAuth0();
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const search = async (searchQuery: string) => {
    if (!searchQuery) return;

    try {
      const response = await axios.get(
        `https://www.googleapis.com/customsearch/v1`,
        {
          params: {
            key: import.meta.env.VITE_GOOGLE_API_KEY,
            cx: import.meta.env.VITE_SEARCH_MOTOR_ID,
            num: 10,
            searchType: "image",
            q: searchQuery,
          },
        }
      );

      const data = response.data;
      console.log(data);

      const items = data.items.map((item: any) => ({
        link: item.link,
        title: item.title,
      }));

      setSearchResults(items);
    } catch (error) {
      console.error("Fetching failed", error);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    search(inputValue);
    setInputValue("");
  };

  return (
    isAuthenticated && (
      <div className="container mx-auto px-4">
        <form onSubmit={handleSubmit} className="flex justify-center my-8">
          <div className="flex border-2 border-gray-200 rounded overflow-hidden">
            <input
              className="pl-4 pr-3 py-2 w-full lg:w-80 focus:outline-none"
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              placeholder="Search..."
            />
            <button
              type="submit"
              className="bg-brightLavender hover:bg-electricPurple text-white font-bold py-2 px-4 rounded-r"
            >
              Search
            </button>
          </div>
        </form>
      </div>
    )
  );
};
