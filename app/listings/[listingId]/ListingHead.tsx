"use client";

import Avatar from "@/app/components/inputs/Avatar";
import HeartButton from "@/app/components/inputs/HeartButton";
import useCountries from "@/app/hooks/useCountries";
import { SafeUser } from "@/app/types";
import Image from "next/image";
import React from "react";

interface ListingHeadProps {
  title: string;
  imageSrc: string;
  locationValue: string;
  id: string;
  currentUser?: SafeUser | null;
}

const ListingHead: React.FC<ListingHeadProps> = ({
  title,
  imageSrc,
  locationValue,
  id,
  currentUser,
}) => {
  const { getByValue } = useCountries();
  const location = getByValue(locationValue);

  return (
    <div>
      <header>
        <h3 className="text-lg">{title}</h3>
        <p>{`${location?.region}, ${location?.label}`}</p>
      </header>
      <div className="w-full h-[60vh] overflow-hidden rounded-xl relative mt-10 ">
      <Image
          src={imageSrc}
          fill
          className="object-cover w-full"
          alt="Image"
        />
        <div className="absolute top-5 right-5 ">
          <HeartButton listingId={id} currentUser={currentUser} />
        </div>
      </div>
    </div>
  );
};

export default ListingHead;
