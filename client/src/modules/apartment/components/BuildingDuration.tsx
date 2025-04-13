import { Carousel, Select, Typography } from "antd";
import React from "react";

export interface BuildingDurationProps {
  images: {
    url: string;
    date: string;
  }[];
  description: string;
  lastUpdated: string;
  startYear: number;
  endYear: number;
}

const MONTHS = [
  { label: "Январь", value: 1 },
  { label: "Февраль", value: 2 },
  { label: "Март", value: 3 },
  { label: "Апрель", value: 4 },
  { label: "Май", value: 5 },
  { label: "Июнь", value: 6 },
  { label: "Июль", value: 7 },
  { label: "Август", value: 8 },
  { label: "Сентябрь", value: 9 },
  { label: "Октябрь", value: 10 },
  { label: "Ноябрь", value: 11 },
  { label: "Декабрь", value: 12 },
];

export const BuildingDuration: React.FC<BuildingDurationProps> = ({
  images,
  description,
  lastUpdated,
  startYear,
  endYear,
}) => {
  return (
    <div className="my-8 border-t border-[#D1D4D7] py-8">
      <div className="flex justify-between">
        <div>
          <Typography.Title level={3}> Ход строительства </Typography.Title>
          <p className="text-sm text-[#7A7E81]">{lastUpdated}</p>
        </div>
        <div className="flex gap-4">
          <Select
            className="w-40"
            options={Array.from(
              { length: endYear - startYear + 1 },
              (_, i) => ({
                label: (startYear + i).toString(),
                value: startYear + i,
              }),
            )}
            defaultValue={startYear}
          />
          <Select className="w-40" options={MONTHS} defaultValue={1} />
        </div>
      </div>
      <p className="my-5">{description}</p>
      <Carousel className="max-w-[800px]">
        {images.map((image, index) => (
          <div key={`${image.url}-${index}`}>
            <img src={image.url} alt="" />
          </div>
        ))}
      </Carousel>
    </div>
  );
};
