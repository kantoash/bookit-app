"use client";

import useCountries from "@/app/hooks/useCountries";
import { SafeUser } from "@/app/types";
import Image from "next/image";
import React, { useMemo } from "react";
import { IconType } from "react-icons";
import ListingCategory from "./ListingCategory";
import dynamic from "next/dynamic";


type Category = {
  label: string;
  icon: IconType;
};

interface ListingInfoProps {
  user: SafeUser;
  category: Category | undefined;
  description: string;
  roomCount: number;
  guestCount: number;
  bathroomCount: number;
  locationValue: string;
}
const ListingInfo: React.FC<ListingInfoProps> = ({
  user,
  category,
  description,
  roomCount,
  guestCount,
  bathroomCount,
  locationValue,
}) => {
  const { getByValue } = useCountries();
  const coordinates = getByValue(locationValue)?.latlng;
  const Map = useMemo(
    () =>
      dynamic(() => import("../../components/inputs/Map"), {
        ssr: false,
      }),
    [locationValue]
  );
  return (
    <div className="col-span-4 flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <div className="text-xl font-semibold flex flex-row items-center gap-2">
          <div>Hosted By {user?.name}</div>
          <Image
            src={user.image || "./images/placeholder"}
            alt=""
            height={20}
            width={20}
            className="rounded-full"
          />
        </div>
        <div className="flex flex-row items-center gap-4 font-light text-neutral-600">
          <div>Max guest: {guestCount}</div>
          <div>room: {roomCount}</div>
          <div>bathrooms: {bathroomCount}</div>
        </div>
      </div>
      {category && (
        <ListingCategory icon={category.icon} label={category.label} />
       )}
       <hr />
      <div className="
      text-lg font-light text-neutral-500">
        {description}
      </div>
      <hr />
      <Map center={coordinates} />
    </div>
  );
};

export default ListingInfo;
