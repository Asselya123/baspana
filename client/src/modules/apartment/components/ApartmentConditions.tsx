import { Typography } from "antd";
import React from "react";
import { ConditionLabel } from "./ConditionLabel";

export interface ApartmentConditionsProps {
  conditions: { label: string }[];
}

export const ApartmentConditions: React.FC<ApartmentConditionsProps> = ({
  conditions,
}) => {
  return (
    <div className="border-b border-[#D1D4D7] py-4">
      <Typography.Title level={3}>Условия участия</Typography.Title>
      <Typography.Paragraph>
        По данному объекту в конкурсе могут участвовать только следующие
        категории:
      </Typography.Paragraph>
      <div className="flex flex-wrap gap-2">
        {conditions.map((condition, index) => (
          <ConditionLabel
            key={`${condition.label}-${index}`}
            label={condition.label}
          />
        ))}
      </div>
    </div>
  );
};
