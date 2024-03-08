import { useAuth0 } from "@auth0/auth0-react";
import { useState } from "react";

// SökMotorId = "34f14d92fbdae4dc1"
interface Item {
  link: string;
  title: string;
}
interface SearchResults {
  items: Item[];
}
export const ImageApp = () => {
  const { isAuthenticated } = useAuth0();
  const [inputValue, setInputValue] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResults | null>(
    null
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const search = async (searchQuery: string) => {
    if (!searchQuery) return;

    try {
      const response = await fetch(
        `https://www.googleapis.com/customsearch/v1?key=${
          import.meta.env.VITE_GOOGLE_API_KEY
        }&cx=${
          import.meta.env.VITE_SEARCH_MOTOR_ID
        }&num=10&searchType=image&q=${searchQuery}`
      );

      const data = await response.json();
      console.log(data);

      setSearchResults(data);
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
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r"
            >
              Search
            </button>
          </div>
        </form>
        {searchResults && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {searchResults.items.map((item) => (
              <div
                key={item.link}
                className="border rounded shadow-lg overflow-hidden"
              >
                <img
                  src={item.link}
                  alt={item.title}
                  className="w-full h-48 object-cover"
                />
              </div>
            ))}
          </div>
        )}
      </div>
    )
  );
};
