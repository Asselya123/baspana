import React from "react";

export interface ConditionLabelProps {
  label: string;
}

export const ConditionLabel: React.FC<ConditionLabelProps> = ({ label }) => {
  return (
    <div className="flex items-center justify-center gap-2 rounded-full border border-[#D1D4D7] bg-[#EBEFF1] px-4 py-1">
      <span className="whitespace-nowrap text-sm">{label}</span>
    </div>
  );
};
