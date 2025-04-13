import { Typography } from "antd";
import React from "react";

const { Title, Text } = Typography;

export interface BuilderInfoProps {
  companyLogo: string;
  companyName: string;
  info: {
    title: string;
    value: string;
  }[];
}

export const BuilderInfo: React.FC<BuilderInfoProps> = ({
  companyLogo,
  companyName,
  info,
}) => {
  return (
    <div className="mb-5 border-b border-[#D1D4D7] py-4">
      <Typography.Title level={4}>О застройщике</Typography.Title>
      <div className="mb-8 mt-5 flex items-center gap-10">
        <img src={companyLogo} alt="" />
        <div className="flex flex-col gap-1 text-sm">
          <p className="text-gray-500">Застройщик</p>
          <Title level={5}>{companyName}</Title>
        </div>
      </div>
      <div className="flex gap-10">
        {info.slice(0, 4).map((item, index) => (
          <div
            key={`${item.title}-${index}`}
            className="flex flex-col gap-1 text-sm"
          >
            <p className="text-gray-500">{item.title}</p>
            <Text strong className="max-w-[200px] truncate">
              {item.value}
            </Text>
          </div>
        ))}
      </div>
    </div>
  );
};
