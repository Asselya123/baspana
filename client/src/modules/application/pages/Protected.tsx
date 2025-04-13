import { FC, useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

interface ProtectedProps {}

export const Protected: FC<ProtectedProps> = ({}) => {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token"),
  );
  const location = useLocation();
  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, [location.pathname]);
  if (!token) {
    return <Navigate to="/login" />;
  }
  return <Outlet />;
};
