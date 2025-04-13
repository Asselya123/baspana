import React from "react";

export interface ProgramLabelProps {
  label: string;
}

export const ProgramLabel: React.FC<ProgramLabelProps> = ({ label }) => {
  return (
    <div className="flex items-center justify-center gap-2 rounded-full border border-[#008F91] bg-[#E7F5EE] px-4 py-1">
      <span className="text-sm">{label}</span>
    </div>
  );
};
