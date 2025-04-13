import { Typography } from "antd";
import React from "react";

export interface ApartmentDescriptionProps {
  description: string;
}

export const ApartmentDescription: React.FC<ApartmentDescriptionProps> = ({
  description,
}) => {
  return (
    <div className="border-b border-[#D1D4D7] py-4">
      <Typography.Title level={3}>Описание</Typography.Title>
      <Typography.Paragraph>{description}</Typography.Paragraph>
    </div>
  );
};
