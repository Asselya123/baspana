import { DownloadOutlined, FileOutlined } from "@ant-design/icons";
import { Button, ConfigProvider, Result, Typography } from "antd";
import { FC } from "react";
import { Application } from "@/types";
import { useGetProfile } from "../pages/profile";

const { Title } = Typography;

interface ApplicationResultProps {
  onSubmit: () => void;
  application: Application;
}

export const ApplicationResult: FC<ApplicationResultProps> = ({
  onSubmit,
  application,
}) => {
  const { data: profile } = useGetProfile();
  return (
    <div className="mb-10 rounded-lg bg-white p-5">
      <Result
        status="success"
        title="Ваше заявление принято на рассмотрение"
        subTitle="Вы можете отслеживать статус заявки в Личном кабинете"
        className="!pb-5"
      />
      <div className="mb-5 rounded-lg bg-[#F5F6F8] p-5">
        <Title level={5}>
          {profile?.user?.first_name} {profile?.user?.last_name}
        </Title>
        <p className="mb-5 text-sm text-gray-500">ИИН: {profile?.iin}</p>
        <div className="mb-5 flex gap-20 rounded-lg bg-white p-5">
          <div>
            <p className="text-sm text-gray-500">Номер запроса</p>
            <p className="text-base">{application.id}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Дата подачи запроса</p>
            <p className="text-base">{application.creation_date}</p>
          </div>
        </div>
        <div className="flex justify-between rounded-lg bg-white p-5">
          <div className="flex items-center gap-3">
            <FileOutlined className="text-lg" />
            <a
              href={application.document_url}
              className="text-base text-blue-600"
              target="_blank"
            >
              Заявление о постановке на учет
            </a>
            <p className="text-sm text-gray-500">{application.creation_date}</p>
          </div>
          <ConfigProvider
            theme={{
              components: { Button: { colorPrimary: "#333839" } },
            }}
          >
            <Button
              type="primary"
              icon={<DownloadOutlined />}
              onClick={() => {
                window.open(application.document_url, "_blank");
              }}
            >
              Скачать
            </Button>
          </ConfigProvider>
        </div>
      </div>

      <div className="mt-5 flex justify-center">
        <Button type="primary" onClick={onSubmit}>
          На главную
        </Button>
      </div>
    </div>
  );
};
