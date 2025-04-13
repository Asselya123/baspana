import React from "react";

export interface CommonInfoBlockProps {
  propertyName: string;
  value: string;
}

export const CommonInfoBlock: React.FC<CommonInfoBlockProps> = ({
  propertyName,
  value,
}) => {
  return (
    <div className="flex items-center justify-between gap-1">
      <p className="text-sm text-[#7A7E81]">{propertyName}</p>
      <div className="h-full grow border-b border-dotted border-[#ADB0B2]"></div>
      <p className="text-sm font-medium text-[#333839]">{value}</p>
    </div>
  );
};
