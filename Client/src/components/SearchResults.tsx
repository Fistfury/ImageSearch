import axios from "axios";

export interface Item {
  link: string;
  title: string;
}
export interface SearchResultsProps {
  items: Item[];
}

export const SearchResults = ({ items }: SearchResultsProps) => {
    const handleImageClick = async (item: Item) => {
        try {
            await axios.post('http://localhost:3000/gallery', item);

        } catch (error) {
            console.error("Failed to save image", error)
        }
    }


  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((item) => (
          <div
            key={item.link}
            className="border rounded shadow-lg overflow-hidden"
          >
            <img
              src={item.link}
              alt={item.title}
              className="w-full h-48 object-cover"
              onClick={() => handleImageClick(item)}
            />
          </div>
        ))}
      </div>
    </>
  );
};
