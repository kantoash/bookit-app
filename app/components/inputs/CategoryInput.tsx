"use client";

import React from "react";
import { IconType } from "react-icons";

interface CategoryInputProps {
  label: string;
  icon: IconType;
  selected: boolean;
  setValue: (value: string) => void;
}

const CategoryInput: React.FC<CategoryInputProps> = ({
  label,
  icon: Icon,
  selected,
  setValue,
}) => {
  return (
    <div onClick={() => setValue(label)} className={`CategoryItem text-gray-500 border-[1px] px-3 py-2 rounded-xl border-gray-300 ${selected ? 'bg-neutral-200' : 'bg-blue-50'} `}>
      <Icon size={30} />
      <p>{label}</p>
    </div>
  );
};

export default CategoryInput;
