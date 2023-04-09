"use client";

import React, { useCallback } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

interface CounterProps {
  title: string;
  subtitle: string;
  value: number;
  onChange: (value: number) => void;
}

const Counter: React.FC<CounterProps> = ({
  title,
  subtitle,
  value,
  onChange,
}) => {
  const onAdd = useCallback(() => {
    onChange(value + 1);
  }, [onChange, value]);
  const onReduce = useCallback(() => {
    if (value === 1) {
      return;
    }
    onChange(value - 1);
  }, [value, onChange]);

  return (
    <div className="flex flex-row items-center justify-between ">
      <div className="flex flex-col">
        <div className="font-medium">{title}</div>
        <div className="font-light text-gray-500">{subtitle}</div>
      </div>
      <div className="flex flex-row items-center gap-4">
        <div onClick={onAdd} className="RentModalPlusMinus">
          <AiOutlinePlus size={24} />
        </div>
        <div className='text-neutral-600 text-lg'>{value}</div>
        <div onClick={onReduce} className="RentModalPlusMinus">
          <AiOutlineMinus size={24} />
        </div>
      </div>
    </div>
  );
};

export default Counter;
