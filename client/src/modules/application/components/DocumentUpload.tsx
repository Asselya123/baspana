import { MessageOutlined } from "@ant-design/icons";
import { App, Button, Typography, Upload } from "antd";
import { FC } from "react";
import { axiosAuthorizedApi } from "@/api";

const { Title } = Typography;

const { Dragger } = Upload;

interface DocumentUploadProps {
  onSubmit: () => void;
  setDocumentLink: (documentLink: string) => void;
}

export const DocumentUpload: FC<DocumentUploadProps> = ({
  onSubmit,
  setDocumentLink,
}) => {
  const { message } = App.useApp();
  const customUploadRequest = async (options: any) => {
    const { onSuccess, onError, file, onProgress } = options;

    const formData = new FormData();
    const config = {
      headers: { "content-type": "multipart/form-data" },
      onUploadProgress: (event: any) => {
        onProgress({ percent: (event.loaded / event.total) * 100 });
      },
    };

    try {
      formData.append("file", file);
      const res = await axiosAuthorizedApi.post<{ path: string }>(
        `/api/upload/`,
        formData,
        config,
      );

      const resumeLink = res.data.path;

      onSuccess(resumeLink);
      setDocumentLink(resumeLink);
      message.success("Документ успешно загружен");
    } catch (updateError) {
      console.log("updateError", updateError);
      message.error("Не удалось загрузить документ");
      onError(updateError);
    }
  };
  return (
    <div className="mb-10 rounded-lg bg-white p-5">
      <Title level={5}>Загрузите документ основание</Title>
      <p className="mb-5 text-base text-gray-500">
        Подача заявки возможна без предоставления дополнительных документов
      </p>
      <div className="mb-5 flex gap-4 rounded-lg border border-[#007FF5] p-5">
        <MessageOutlined className="block text-lg" />
        <ul className="list-inside list-disc">
          Загрузите документ основание если:
          <li>Единственное жилище заявителя признано аварийным;</li>
          <li>
            Заявитель не достиг совершеннолетнего возраста, но является сиротой
            или оставшийся без попечения родителей, потерявший родителей до
            совершеннолетия, страдающий тяжелыми формами некоторых хронических
            заболеваний.
          </li>
        </ul>
      </div>
      <Dragger maxCount={1} customRequest={customUploadRequest}>
        <div className="flex w-full items-center justify-center gap-5">
          перетащите файл сюда, чтобы загрузить или
          <Button type="primary" htmlType="submit">
            Загрузить
          </Button>
        </div>
      </Dragger>
      <div className="mt-8 flex justify-end">
        <Button type="primary" onClick={onSubmit}>
          Далее
        </Button>
      </div>
    </div>
  );
};
