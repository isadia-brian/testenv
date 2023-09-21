"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";

const page = () => {
  const [houses, setHouses] = useState([]);
  console.log(houses);

  houses.forEach((house) => {
    console.log(house.images);
  });

  useEffect(() => {
    async function getHouses() {
      const res = await axios.get("/api/houses");

      setHouses(res.data.houses);
    }

    getHouses();
  }, []);
  return (
    <div>
      <ul>
        {houses?.map((house) => {
          return (
            <li key={house._id}>
              <p>{house.title}</p>
              <Image
                src={house.images[0].url}
                width={132}
                height={132}
                alt={house.title}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default page;
