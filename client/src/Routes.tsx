import { Button, Typography } from "antd";
import { FC } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { Layout } from "./components/Layout";
import { ApartmentDetailsPage } from "./modules/apartment/pages/ApartmentDetailsPage";
import { ApartmentsPage } from "./modules/apartment/pages/ApartmentsPage";
import { ApplicationListPage } from "./modules/application/pages/ApplicationListPage";
import { ApplicationSignPage } from "./modules/application/pages/ApplicationSignPage";
import ChangePasswordPage from "./modules/application/pages/ChangePasswordPage";
import { OperationsPage } from "./modules/application/pages/OperationsPage";
import { PersonalCabinetLayout } from "./modules/application/pages/PersonalCabinetLayout";
import { ProfilePage } from "./modules/application/pages/ProfilePage";
import { Protected } from "./modules/application/pages/Protected";
import { LandingPage } from "./modules/shared/pages/LandingPage";
import LoginPage from "./modules/shared/pages/LoginPage";

const NotFoundPage = () => {
  const navigate = useNavigate();
  return (
    <Layout>
      <div className="flex h-screen flex-col items-center justify-center">
        <Typography.Title level={1}>404</Typography.Title>
        <Typography.Title level={5}>Страница не найдена</Typography.Title>
        <Button type="primary" onClick={() => navigate("/")}>
          На главную
        </Button>
      </div>
    </Layout>
  );
};

interface RouterProviderProps {}

export const RouterProvider: FC<RouterProviderProps> = ({}) => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={<LandingPage />} />
      <Route element={<Protected />}>
        <Route path="/sign" element={<ApplicationSignPage />} />
        <Route element={<PersonalCabinetLayout />}>
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/operations" element={<OperationsPage />} />
          <Route path="/applications" element={<ApplicationListPage />} />
          <Route path="/change-password" element={<ChangePasswordPage />} />
        </Route>
        <Route path="/apartments/:id" element={<ApartmentDetailsPage />} />
        <Route path="/apartments" element={<ApartmentsPage />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};
