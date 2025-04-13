import { Typography } from "antd";
import React from "react";

export interface ApartmentHeaderProps {
  title: string;
  address: string;
  viewCount: number;
  eyeIcon: string;
}

export const ApartmentHeader: React.FC<ApartmentHeaderProps> = ({
  title,
  address,
  viewCount,
  eyeIcon,
}) => {
  return (
    <div className="mb-4 flex w-full justify-between">
      <div>
        <Typography.Title level={3}>{title}</Typography.Title>
        <p className="text-[#7A7E81]">{address}</p>
      </div>
      <div className="flex h-max items-center gap-2">
        <img src={eyeIcon} alt="" />
        <span className="text-[#7A7E81]">{viewCount} просмотров</span>
      </div>
    </div>
  );
};
