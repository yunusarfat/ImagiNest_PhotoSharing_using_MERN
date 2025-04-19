import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

function ImageDetails() {
  const { id } = useParams();
  const [imageDetails, setImageDetails] = useState({});

  const fetchImageDetails = async () => {
    try {
      const url = `https://imaginest-photosharing-using-mern.onrender.com/api/images/${id}`;

      const result = await fetch(url);
      const { data } = await result.json();
      setImageDetails(data);
    } catch (err) {
      console.log("Error fetching image details", err);
    }
  };

  useEffect(() => {
    fetchImageDetails();
  }, [id]);

  return (
    <div className="min-h-screen bg-gray-100 px-64 py-8 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-xl flex flex-col md:flex-row max-w-4xl w-full overflow-hidden">
        {/* Image Left */}
        <div className="md:w-1/2 p-4 flex items-center justify-center bg-gray-50">
          {imageDetails.imageURL ? (
            <img
              src={imageDetails.imageURL}
              alt={imageDetails.originalName}
              className="w-full h-auto object-contain rounded-lg"
            />
          ) : (
            <p className="text-gray-500">Loading image...</p>
          )}
        </div>

        {/* Info Right */}
        <div className="md:w-1/2 p-6 space-y-4">
          <Link
            to="/"
            className="text-blue-600 hover:underline font-medium text-sm"
          >
            ← Back to Gallery
          </Link>

          <h2 className="text-2xl font-semibold text-gray-800">
            {imageDetails.originalName || "No Name"}
          </h2>

          <div className="text-gray-700 space-y-2">
            <p>
              <strong className="font-medium">Type:</strong>{" "}
              {imageDetails.mimetype || "Not available"}
            </p>
            <p>
              <strong className="font-medium">Size:</strong>{" "}
              {imageDetails.size
                ? `${(imageDetails.size / 1024).toFixed(2)}kb`
                : "Unknown"}
            </p>
            <p>
              <strong className="font-medium">Uploaded:</strong>{" "}
              {imageDetails.createAt
                ? new Date(imageDetails.createAt).toLocaleString()
                : "Not available"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ImageDetails;
