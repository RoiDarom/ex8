import React, { useState, useEffect } from 'react';

function ImageBrowser() {
    const [imageRows, setImageRows] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null);

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const response = await fetch('https://picsum.photos/list');
                const imageData = await response.json();

                const images = imageData.map(imageData => ({
                    id: imageData.id,
                    url: `https://picsum.photos/id/${imageData.id}/50/50`
                }));

                const imagesPerRow = 10;
                const numRows = 3;
                const rows = [];
                for (let i = 0; i < images.length && i < numRows; i++) {
                    rows.push(images.slice(i * imagesPerRow, (i + 1) * imagesPerRow));
                }
                setImageRows(rows);
            } catch (error) {
                console.error('Error fetching images:', error);
            }
        };

        fetchImages();
    }, []);

    const selectImage = image => {
        setSelectedImage({
            id: image.id,
            url: `https://picsum.photos/id/${image.id}/350/350`
        });
    };

    return (
        <div className="container">
            {imageRows.map((row, rowIndex) => (
                <div key={rowIndex} className="image-row">
                    {row.map(image => (
                        <div key={image.id} className="image">
                            <img
                                src={image.url}
                                alt={`Image ${image.id}`}
                                onClick={() => selectImage(image)}
                                width="50"
                                height="50"
                                className="img-thumbnail"
                            />
                        </div>
                    ))}
                </div>
            ))}
            {selectedImage && (
                <div className="mt-3">
                    <h2>Selected Image</h2>
                    <img
                        src={selectedImage.url}
                        alt={`Selected Image ${selectedImage.id}`}
                        width="350"
                        height="350"
                        className="img-thumbnail"
                    />
                </div>
            )}
        </div>
    );
}

export default ImageBrowser;
