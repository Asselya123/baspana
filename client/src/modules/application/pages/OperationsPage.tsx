import { PaperClipOutlined, RightOutlined } from "@ant-design/icons";
import { Typography } from "antd";
import { Link } from "react-router-dom";

const OPERATIONS_LIST = [
  {
    title: "Заявление на восстановление в очереди",
    icon: <PaperClipOutlined />,
    link: "/sign",
  },
  {
    title: "Заявление на исключение из очереди",
    icon: <PaperClipOutlined />,
    link: "/applications?is_edit=true",
  },
  {
    title: "Заявление на замену в очереди",
    icon: <PaperClipOutlined />,
    link: "/applications?is_edit=true",
  },
];

const OperationCard = ({
  title,
  icon,
}: {
  title: string;
  icon: React.ReactNode;
}) => {
  return (
    <div className="flex items-center gap-2 rounded-xl bg-white p-5">
      {icon}
      <p className="grow text-sm">{title}</p>
      <RightOutlined />
    </div>
  );
};

export const OperationsPage = () => {
  return (
    <div>
      <Typography.Title level={3}>Доступные операции</Typography.Title>
      <div className="grid grid-cols-2 gap-2">
        {OPERATIONS_LIST.map((operation) => (
          <Link to={operation.link} key={operation.title}>
            <OperationCard {...operation} />
          </Link>
        ))}
      </div>
    </div>
  );
};
