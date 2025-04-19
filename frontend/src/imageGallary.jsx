import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDropzone } from "react-dropzone";
import { ToastContainer, toast } from "react-toastify";

function ImageGallary() {
  const [imageList, setImageList] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  const fetchImages = async () => {
    try {
      const url = "http://localhost:8080/api/images";
      const result = await fetch(url);
      const { data } = await result.json();
      console.log(data);
      setImageList(data);
    } catch (err) {
      console.log("error in fetching images", err);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const onDrop = async (acceptedFiles) => {
    setLoading(true);
    const formData = new FormData();
    acceptedFiles.forEach((file) => {
      formData.append("images", file);
    });
    try {
      const url = "http://localhost:8080/api/images/upload-images";
      const options = {
        method: "POST",
        // ❗ Remove manual content-type setting
        body: formData,
      };
      const result = await fetch(url, options);
      const { message, success } = await result.json();
      if (success) {
        toast.success(message);
      } else {
        toast.error(message);
      }
      fetchImages();
      setLoading(false);
    } catch (err) {
      console.log("Error uploading files", err);
      toast.error("Error uploading files");
    }
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div className="min-h-screen bg-gray-100 px-6 py-8">
      <h1 className="text-4xl font-bold text-center text-indigo-700 mb-8">
      ImagiNest
      </h1>
      

      {/* Upload Section */}
      <div
        {...getRootProps()}
        className="border-4 border-dashed border-indigo-400 rounded-lg p-10 text-center cursor-pointer bg-white hover:shadow-md transition duration-200"
      >
        <input {...getInputProps()} />
        <p className="text-gray-500">📁 Drag and drop files here or click to select</p>
      </div>

      <div className="text-center my-4">
        {loading ? (
          <p className="text-yellow-600 font-semibold">Uploading...</p>
        ) : (
          <p className="text-green-700 font-semibold">Ready to upload!</p>
        )}
      </div>

      {/* Image Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-10">
        {imageList.map((image) => (
          console.log(image.image),
          <div
            key={image._id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition duration-300"
          >
            <Link to={`/${image._id}`}>
              <img
                src={image.imageURL}
                alt={image.originalName}
                className="w-full h-60 object-cover"
              />
              <div className="p-4">
                <p className="text-center text-gray-800 font-medium">
                  {image.originalName}
                </p>
              </div>
            </Link>
          </div>
        ))}
      </div>

      <ToastContainer position="top-center" autoClose={2000} theme="dark" />
    </div>
  );
}

export default ImageGallary;
