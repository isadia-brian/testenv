"use client";

import { useState } from "react";

const Uploader = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleFileSelect = (e, inputIndex) => {
    const files = e.target.files;
    const updatedFiles = [...selectedFiles];
    updatedFiles[inputIndex] = files[0];
    setSelectedFiles(updatedFiles);
  };

  const upload = async () => {
    const cloudName = "silentpalms";
    const uploadPreset = "silentpalms";

    const uploadedImages = [];

    for (const image of selectedFiles) {
      const formData = new FormData();
      formData.append("file", image);
      formData.append("upload_preset", uploadPreset);

      try {
        const response = await fetch(
          `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
          {
            method: "POST",
            body: formData,
          }
        );
        const data = await response.json();
        const label = image.label;
        uploadedImages.push(data.secure_url);
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }

    console.log("Uploaded images:", uploadedImages);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedFiles) {
      console.log(selectedFiles);
      upload();
    } else {
      console.log("Error");
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col mb-3">
          <label htmlFor="file1">Upload a file</label>
          <br />
          <input
            type="file"
            id="file1"
            onChange={(e) => handleFileSelect(e, 0)}
          />
        </div>
        <div className="flex flex-col mb-3">
          <label htmlFor="file2">Upload a file</label>
          <br />
          <input
            type="file"
            id="file2"
            onChange={(e) => handleFileSelect(e, 1)}
          />
        </div>
        <button className="bg-black text-white px-5 py-2">Submit</button>
      </form>
    </div>
  );
};

export default Uploader;
