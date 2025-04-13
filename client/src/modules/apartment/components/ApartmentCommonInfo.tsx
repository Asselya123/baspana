import { Typography } from "antd";
import React from "react";
import { CommonInfoBlock } from "./CommonInfoBlock";

export interface ApartmentCommonInfoProps {
  commonInfo: {
    propertyName: string;
    value: string;
  }[];
}

export const ApartmentCommonInfo: React.FC<ApartmentCommonInfoProps> = ({
  commonInfo,
}) => {
  return (
    <div className="border-b border-[#D1D4D7] py-4">
      <Typography.Title level={4}>Общая информация</Typography.Title>
      <div className="grid grid-cols-2 gap-x-10 gap-y-5">
        {commonInfo.map((item, index) => (
          <CommonInfoBlock
            key={`${item.propertyName}-${index}`}
            propertyName={item.propertyName}
            value={item.value}
          />
        ))}
      </div>
    </div>
  );
};
