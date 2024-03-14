import axios from "axios";
import { useEffect, useState } from "react";

interface Image {
    link: string;
    title: string;
}

export const Gallery = () => {
    const [images, setImages] = useState<Image[]>([]);

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const response = await axios.get('http://localhost:3000/gallery');
                setImages(response.data);
            } catch (error) {
                console.error('Failed to fetch images', error);
            }
        };

        fetchImages();
    }, []);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {images.map((image, index) => (
                <div key={index} className="border rounded shadow-lg overflow-hidden">
                    <img src={image.link} alt={image.title} className="w-full h-48 object-cover" />
                    
                </div>
            ))}
        </div>
    );
};