import { BellFilled, HomeOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import LogoIcon from "../assets/logo.svg";

const links = [
  {
    label: "Постановление на очередь жилья",
    href: "/sign",
  },
  {
    label: "Доступные квартиры",
    href: "/apartments",
  },
  {
    label: "Отбасы инфо",
    href: "https://hcsbk.kz/ru/faq/",
  },
  {
    label: "Контакты",
    href: "#footer",
    onClick: () => {
      const footer = document.getElementById("footer");
      if (footer) {
        footer.scrollIntoView({ behavior: "smooth" });
      }
    },
  },
];

const PointIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
  >
    <path
      d="M12.5616 21.3517L13.176 21.7818L13.176 21.7818L12.5616 21.3517ZM11.7726 21.3517L11.1582 21.7818L11.1582 21.7818L11.7726 21.3517ZM17.5842 9.06616C17.5842 9.87409 17.3426 10.8924 16.9201 12.0345C16.5016 13.166 15.9247 14.3688 15.298 15.5304C14.0446 17.8535 12.62 19.9605 11.9472 20.9216L13.176 21.7818C13.8636 20.7996 15.3252 18.639 16.6181 16.2427C17.2645 15.0446 17.8757 13.7748 18.327 12.5548C18.7743 11.3455 19.0842 10.1334 19.0842 9.06616H17.5842ZM12.1671 3.70874C15.1658 3.70874 17.5842 6.1142 17.5842 9.06616H19.0842C19.0842 5.27205 15.9804 2.20874 12.1671 2.20874V3.70874ZM6.75 9.06616C6.75 6.1142 9.16843 3.70874 12.1671 3.70874V2.20874C8.35379 2.20874 5.25 5.27205 5.25 9.06616H6.75ZM12.387 20.9216C11.7142 19.9605 10.2896 17.8535 9.03624 15.5304C8.4095 14.3688 7.83265 13.166 7.41409 12.0345C6.99163 10.8924 6.75 9.87409 6.75 9.06616H5.25C5.25 10.1334 5.5599 11.3455 6.00725 12.5548C6.4585 13.7748 7.06974 15.0446 7.71612 16.2427C9.00898 18.639 10.4707 20.7996 11.1582 21.7818L12.387 20.9216ZM11.9472 20.9216C12.0521 20.7718 12.2821 20.7718 12.387 20.9216L11.1582 21.7818C11.6505 22.485 12.6837 22.485 13.176 21.7818L11.9472 20.9216ZM14.0601 9.27445C14.0601 10.372 13.1959 11.2311 12.1671 11.2311V12.7311C14.0577 12.7311 15.5601 11.1666 15.5601 9.27445H14.0601ZM12.1671 7.31775C13.1959 7.31775 14.0601 8.17687 14.0601 9.27445H15.5601C15.5601 7.3823 14.0577 5.81775 12.1671 5.81775V7.31775ZM10.274 9.27445C10.274 8.17687 11.1383 7.31775 12.1671 7.31775V5.81775C10.2764 5.81775 8.77403 7.3823 8.77403 9.27445H10.274ZM12.1671 11.2311C11.1383 11.2311 10.274 10.372 10.274 9.27445H8.77403C8.77403 11.1666 10.2764 12.7311 12.1671 12.7311V11.2311Z"
      fill="#7A7E81"
    />
  </svg>
);

const UserIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
  >
    <rect y="0.00012207" width="24" height="24" rx="12" fill="#008F91" />
    <path
      d="M14.9212 7.88901C14.9212 9.4845 13.6133 10.7779 12 10.7779C10.3867 10.7779 9.07877 9.4845 9.07877 7.88901C9.07877 6.29352 10.3867 5.00012 12 5.00012C13.6133 5.00012 14.9212 6.29352 14.9212 7.88901Z"
      fill="white"
    />
    <path
      d="M6.7184 14.2168C7.4198 12.1616 9.36875 10.7779 11.5621 10.7779H12.4379C14.6313 10.7779 16.5802 12.1616 17.2816 14.2168L17.9222 16.0938C18.2417 17.0301 17.5375 18.0001 16.5382 18.0001H7.46175C6.4625 18.0001 5.75829 17.0301 6.07783 16.0938L6.7184 14.2168Z"
      fill="white"
    />
  </svg>
);

function getIsAuth() {
  const token = localStorage.getItem("token");
  const isAuth = !!token;
  return isAuth;
}

export const Header = () => {
  const [isAuth, setIsAuth] = useState(getIsAuth());
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setIsAuth(getIsAuth());
  }, [pathname]);

  return (
    <header className="flex flex-col items-center">
      <div className="mx-auto flex w-full max-w-[1280px] items-center justify-between gap-2 px-10 pb-2 pt-4">
        <div className="flex items-center gap-8">
          <a
            href="https://2gis.kz/almaty/search/%D0%9E%D1%82%D0%B1%D0%B0%D1%81%D1%8B%20%D0%B1%D0%B0%D0%BD%D0%BA%20%D0%BE%D1%82%D0%B4%D0%B5%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5"
            className="flex items-center gap-2 !text-[#7A7E81]"
            target="_blank"
          >
            <PointIcon />
            Местоположение
          </a>
          <div
            className="flex cursor-pointer items-center gap-2 rounded-lg bg-[#E7F5EE] px-4 py-2 font-medium text-[#008F91]"
            onClick={() => navigate("/operations")}
          >
            <HomeOutlined style={{ fontSize: 24, color: "#008F91" }} />
            Центр обеспечения жильем
          </div>
        </div>
        <div className="flex items-center gap-10">
          <div className="flex items-center gap-2">
            <BellFilled style={{ fontSize: 24 }} />
          </div>
          <div>
            <span className="font-medium underline">Рус</span> / Қаз
          </div>
        </div>
      </div>
      <div className="flex w-full items-center justify-center border-b border-t border-[#D1D4D7]">
        <div className="mx-auto flex w-full max-w-[1280px] items-center justify-between gap-2 px-10 py-3">
          <div className="flex items-center gap-8">
            <Link to="/">
              <img src={LogoIcon} alt="logo" />
            </Link>
            {links.map((link) => (
              <div key={link.label}>
                <Link
                  className="!text-black hover:!underline"
                  to={link.href}
                  onClick={link.onClick}
                >
                  {link.label}
                </Link>
              </div>
            ))}
          </div>
          <div>
            {isAuth ? (
              <Link
                to="/profile"
                className="flex items-center gap-2 !text-[#008F91]"
              >
                Личный кабинет
                <UserIcon />
              </Link>
            ) : (
              <Button type="primary" icon={<HomeOutlined />} href="/login">
                Вход / Регистрация
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
