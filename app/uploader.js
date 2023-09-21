"use client";

import axios from "axios";
import { useState, useRef } from "react";

const Uploader = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);
  const [title, setTitle] = useState("");
  const [roomType, setRoomType] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [noOfGuests, setNoOfGuests] = useState("");
  const [allDetails, setAllDetails] = useState({});

  const fileInputRefs = [useRef(), useRef()];

  const handleFileSelect = (e, label) => {
    const selectedImage = e.target.files[0];
    console.log(selectedImage);
    selectedImage.label = label;
    setSelectedFiles((prevImages) => [...prevImages, selectedImage]);
  };

  const upload = async () => {
    const updatedUrls = [...imageUrls];
    const cloudName = "silentpalms";
    const uploadPreset = "silentpalms";

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
        updatedUrls.push({ label, url: data.secure_url });
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }

    console.log("Uploaded images:", updatedUrls);
    const houseDetails = {
      title,
      images: updatedUrls,
    };

    setAllDetails(houseDetails);

    try {
      async function handleDBPost() {
        const res = await axios.post("/api/houses", houseDetails);
        console.log(res.data);

        alert("Succesfully posted");
        const handleReset = () => {
          setTitle("");
          setAmount("");
          setDescription("");
          setNoOfGuests("");
          setRoomType("");
          setSelectedFiles([]);

          fileInputRefs.forEach((ref) => {
            if (ref.current) {
              ref.current.value = "";
            }
          });
        };

        handleReset();
      }
      handleDBPost();
    } catch (error) {
      console.log("Error posting to database");
      return;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedFiles) {
      upload();
    } else {
      console.log("Error");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col mb-3">
          <label htmlFor="title">Title</label>

          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="py-2 px-2 outline-none border border-black w-full"
          />
        </div>
        <div className="flex flex-col mb-3">
          <label htmlFor="roomType">roomType</label>

          <input
            type="text"
            id="roomType"
            value={roomType}
            onChange={(e) => setRoomType(e.target.value)}
            className="py-2 px-2 outline-none border border-black w-full"
          />
        </div>
        <div className="flex flex-col mb-3">
          <label htmlFor="description">Description</label>

          <input
            type="textArea"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="py-2 px-2 outline-none border border-black w-full"
          />
        </div>
        <div className="flex flex-col mb-3">
          <label htmlFor="amount">amount</label>

          <input
            type="text"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="py-2 px-2 outline-none border border-black w-full"
          />
        </div>
        <div className="flex flex-col mb-3">
          <label htmlFor="noOfGuests">noOfGuests</label>

          <input
            type="text"
            id="noOfGuests"
            value={noOfGuests}
            onChange={(e) => setNoOfGuests(e.target.value)}
            className="py-2 px-2 outline-none border border-black w-full"
          />
        </div>
        <div className="w-full grid grid-cols-3">
          <div className="flex flex-col mb-3">
            <label htmlFor="cover">Cover</label>

            <input
              type="file"
              id="cover"
              onChange={(e) => handleFileSelect(e, "cover")}
              ref={fileInputRefs[0]}
            />
          </div>
          <div className="flex flex-col mb-3">
            <label htmlFor="balcony">Balcony</label>

            <input
              type="file"
              id="balcony"
              onChange={(e) => handleFileSelect(e, "balcony")}
              ref={fileInputRefs[1]}
            />
          </div>
          <div className="flex flex-col mb-3">
            <label htmlFor="balcony">Balcony</label>

            <input
              type="file"
              id="balcony"
              onChange={(e) => handleFileSelect(e, "balcony")}
              ref={fileInputRefs[2]}
            />
          </div>
          <div className="flex flex-col mb-3">
            <label htmlFor="lounge">Lounge</label>

            <input
              type="file"
              id="lounge"
              onChange={(e) => handleFileSelect(e, "lounge")}
              ref={fileInputRefs[3]}
            />
          </div>
          <div className="flex flex-col mb-3">
            <label htmlFor="bedroom">Bedroom</label>

            <input
              type="file"
              id="bedroom"
              onChange={(e) => handleFileSelect(e, "bedroom")}
              ref={fileInputRefs[4]}
            />
          </div>
          <div className="flex flex-col mb-3">
            <label htmlFor="toilet">Toilet</label>

            <input
              type="file"
              id="toilet"
              onChange={(e) => handleFileSelect(e, "toilet")}
              ref={fileInputRefs[5]}
            />
          </div>
        </div>

        <button className="bg-black text-white px-5 py-2" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Uploader;
