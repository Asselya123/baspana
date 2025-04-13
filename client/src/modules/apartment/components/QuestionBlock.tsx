import { Button } from "antd";
import React from "react";

export interface QuestionBlockProps {
  title: string;
  description: string;
  buttonText: string;
  onButtonClick?: () => void;
}

export const QuestionBlock: React.FC<QuestionBlockProps> = ({
  title,
  description,
  buttonText,
  onButtonClick,
}) => {
  return (
    <div
      style={{
        background: "linear-gradient(141deg, #008F91 15.18%, #003D3E 86.41%)",
      }}
      className="flex items-center justify-between gap-5 rounded-xl p-6"
    >
      <div className="text-white">
        <p className="text-base font-semibold">{title}</p>
        <p className="text-sm">{description}</p>
      </div>
      <Button onClick={onButtonClick}>{buttonText}</Button>
    </div>
  );
};
