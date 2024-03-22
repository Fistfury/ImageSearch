import { useAuth0 } from "@auth0/auth0-react";
import { useState } from "react";
import { Item } from "./SearchResults";
import axios from "axios";
import {MagnifyingGlassIcon } from '@heroicons/react/24/outline';


interface ImageAppProps {
  setSearchResults: (value: Item[] | null) => void;
}
export const ImageApp = ({ setSearchResults }: ImageAppProps) => {
  const { isAuthenticated } = useAuth0();
  const [inputValue, setInputValue] = useState("");
  const [searchTime, setSearchTime] = useState("");
  const [correctedQuery, setCorrectedQuery] = useState("");
  const [showCorrected, setShowCorrected] = useState(true);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    setShowCorrected(true);
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
        image: item.image,
      }));

      const searchInformation = data.searchInformation;
      if (searchInformation) {
        setSearchTime(searchInformation.searchTime.toFixed(2));
      }

      const spelling = data.spelling;
      if (spelling?.correctedQuery) {
        setCorrectedQuery(spelling.correctedQuery);
      } else {
        setCorrectedQuery("");
      }

      setSearchResults(items);
    } catch (error) {
      console.error("Fetching failed", error);
    }
  };
  const handleCorrectedQuery = () => {
    search(correctedQuery);
    setShowCorrected(false);
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
          <button
              type="submit"
              className="bg-darkGreen hover:bg-lightGreen text-white font-bold py-2 px-4 rounded-r"
            >
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-600" />
            </button>
            <input
              className="pl-4 pr-3 py-2 w-full lg:w-80 focus:outline-none"
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              placeholder="Search..."
            />
          
          </div>
        </form>
        <div className="text-center my-4">
          {searchTime && (
            <div className="text-lg text-whiteText">
              Search time: {searchTime} seconds
            </div>
          )}
          {showCorrected && correctedQuery && (
            <div className="text-lg text-whiteText">
              Did you mean:
              <button
                onClick={handleCorrectedQuery}
                className="text-blue-600 hover:underline ml-2 mr-2"
              >
                {correctedQuery}
              </button>
              ?
            </div>
          )}
        </div>
      </div>
    )
  );
};
