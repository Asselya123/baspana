import { ArrowLeftOutlined } from "@ant-design/icons";
import { FC } from "react";
import { useNavigate } from "react-router-dom";

export const GoBack: FC = () => {
  const navigate = useNavigate();
  return (
    <div
      className="mt-5 flex items-center gap-2"
      onClick={() => navigate(-1)}
      style={{ cursor: "pointer" }}
    >
      <ArrowLeftOutlined className="text-sm font-medium text-gray-500" />
      <span className="text-base font-medium text-gray-500">Назад</span>
    </div>
  );
};
