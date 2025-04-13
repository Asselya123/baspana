import { Typography } from "antd";
import React from "react";
import { ProgramLabel } from "./ProgramLabel";

export interface AvailableProgramsProps {
  programs: {
    label: string;
  }[];
}

export const AvailablePrograms: React.FC<AvailableProgramsProps> = ({
  programs,
}) => {
  return (
    <div className="border-y border-[#D1D4D7] py-4">
      <Typography.Title level={3}>Доступные программы</Typography.Title>
      <div className="flex flex-wrap gap-2">
        {programs.map((program, index) => (
          <ProgramLabel
            key={`${program.label}-${index}`}
            label={program.label}
          />
        ))}
      </div>
    </div>
  );
};
