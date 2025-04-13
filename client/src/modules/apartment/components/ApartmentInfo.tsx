import React from "react";

export interface ApartmentInfoProps {
  info: {
    title: string;
    value: string;
  }[];
}

export const ApartmentInfo: React.FC<ApartmentInfoProps> = ({ info }) => {
  return (
    <div className="flex flex-wrap items-center justify-between gap-2 py-5">
      {info.map((item, index) => (
        <div
          key={`${item.title}-${index}`}
          className="flex flex-col items-center gap-2"
        >
          <p className="text-gray-500">{item.title}</p>
          <p>{item.value}</p>
        </div>
      ))}
    </div>
  );
};
