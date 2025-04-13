import { App, Typography } from "antd";
import { FC, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { GoBack } from "@/components/GoBack";
import { Layout } from "@/components/Layout";
import { Application } from "@/types";
import { ApplicationResult } from "../components/ApplicationResult";
import { ApplicationTemplate } from "../components/ApplicationTemplate";
import { ConfirmationWait } from "../components/ConfirmationWait";
import { DocumentUpload } from "../components/DocumentUpload";
import { MockEspModal } from "../components/MockEspModal";
import { useCreateApplication } from "./application";

const { Title } = Typography;

const getStep = (search: string) => {
  const step = new URLSearchParams(search).get("step");
  if (Number.isNaN(Number(step))) return 1;
  if (Number(step) < 1) return 1;

  return Number(step);
};

const getFromLocalStorage = (key: string) => {
  try {
    return JSON.parse(localStorage.getItem(key) || "null");
  } catch (error) {
    return null;
  }
};

interface ApplicationSignPageProps {}

export const ApplicationSignPage: FC<ApplicationSignPageProps> = ({}) => {
  const [openMockEspModal, setOpenMockEspModal] = useState(false);
  const location = useLocation();
  const [step, setStep] = useState(getStep(location.search));
  const navigate = useNavigate();
  const [isAgree, setIsAgree] = useState<boolean | null>(null);
  const { message } = App.useApp();
  const [loading, setLoading] = useState(false);
  const [documentLink, setDocumentLink] = useState<string | null>(null);
  const [createdApplication, setCreatedApplication] =
    useState<Application | null>(getFromLocalStorage("application"));

  const { mutate: createApplication, isPending } = useCreateApplication(
    (application) => {
      setCreatedApplication(application);
      localStorage.setItem("application", JSON.stringify(application));
      setStep(4);
      navigate(`${location.pathname}?step=4`, { replace: true });
    },
  );

  return (
    <Layout className="bg-[#F6F7F8]">
      <GoBack />
      <Title level={4} className="mt-2">
        Постановка на учет
      </Title>
      {step === 4 && createdApplication ? (
        <ApplicationResult
          onSubmit={() => navigate("/")}
          application={createdApplication}
        />
      ) : step === 2 ? (
        <DocumentUpload
          onSubmit={() => {
            if (!documentLink) {
              message.error("Необходимо загрузить документ");
              return;
            }
            setStep(3);
            navigate(`${location.pathname}?step=3`, { replace: true });
          }}
          setDocumentLink={setDocumentLink}
        />
      ) : step === 3 ? (
        <ConfirmationWait
          onSubmit={() => {
            if (!documentLink) {
              message.error("Необходимо загрузить документ");
              return;
            }
            createApplication({
              document_url: `${import.meta.env.VITE_API_URL}/media/${documentLink}`,
              creation_date: new Date().toISOString().split("T")[0],
            });
          }}
          loading={isPending}
        />
      ) : (
        <>
          <MockEspModal
            open={openMockEspModal}
            onClose={() => {
              setOpenMockEspModal(false);
            }}
            onSubmit={() => {
              setOpenMockEspModal(false);
              setLoading(true);
              setTimeout(() => {
                message.success("Подтверждение отправлено!");
                navigate(`${location.pathname}?step=2`, { replace: true });
                setStep(2);
                setLoading(false);
              }, 1000);
            }}
          />
          <ApplicationTemplate
            onSubmit={() => {
              if (isAgree === null) {
                message.error(
                  "Вы должны подтвердить согласие на обработку персональных данных",
                );
                return;
              }
              setOpenMockEspModal(true);
            }}
            loading={loading}
            isAgree={isAgree}
            setIsAgree={setIsAgree}
          />
        </>
      )}
    </Layout>
  );
};
