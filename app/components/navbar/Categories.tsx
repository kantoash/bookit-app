'use client'

import React from "react";
import { TbBeach, TbMountain } from "react-icons/tb";
import { GiIsland, GiRiver, GiForestCamp } from "react-icons/gi";
import { MdForest, MdOutlineVilla, MdOutlinePool } from "react-icons/md";
import Container from "@/app/Container";
import CategoryBox from "./CategoryBox";
import { usePathname, useSearchParams } from "next/navigation";

export const categories = [
  {
    label: "Beach",
    icon: TbBeach,
  },
  {
    label: "Mountain",
    icon: TbMountain,
  },
  {
    label: "Countryside",
    icon: MdForest,
  },
  {
    label: "Modern",
    icon: MdOutlineVilla,
  },
  {
    label: "Pools",
    icon: MdOutlinePool,
  },
  {
    label: "Island",
    icon: GiIsland,
  },
  {
    label: "River",
    icon: GiRiver,
  },
  {
    label: 'Camping',
    icon: GiForestCamp
  }
];

const Categories = () => {
  const params = useSearchParams();
  const category = params?.get("category");
  const pathname = usePathname();
  const isMainPage = pathname === "/";

  if (!isMainPage) {
    return null;
  }
  return (
    <Container>
      <div className="pt-4 flex flex-row items-center space-x-3 justify-between overflow-x-auto scrollbar-hide">
        {categories.map((item, index) => (
          <CategoryBox
            icon={item.icon}
            label={item.label}
            selected={category === item.label}
            key={index}
          />
        ))}
      </div>
    </Container>
  );
};

export default Categories;
