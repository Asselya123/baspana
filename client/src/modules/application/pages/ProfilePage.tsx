import { HeartOutlined, RightOutlined } from "@ant-design/icons";
import { Button, ConfigProvider, Skeleton, Typography } from "antd";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PeopleIcon from "@/assets/people.svg";
import { useGetApartments } from "./apartments";
import { useGetApplications } from "./application";
import { useGetProfile } from "./profile";

export const ApartmentItemCard = ({
  id,
  title,
  price,
  label,
  image,
}: {
  id: string;
  title: string;
  price: JSX.Element | string;
  label: string;
  image: string;
  isLiked: boolean;
}) => {
  return (
    <Link to={`/apartments/${id}`}>
      <div className="w-[280px] min-w-[280px] overflow-hidden rounded-xl">
        <div className="relative">
          <img
            src={image}
            className="h-[160px] w-full bg-gradient-to-l from-[#008F91] to-[#003D3E] object-cover"
          />
          <div className="absolute right-4 top-4">
            <Button icon={<HeartOutlined />} />
          </div>
          <div className="absolute left-4 top-4 rounded-2xl bg-white px-4 py-1 text-xs">
            {label}
          </div>
        </div>
        <div className="flex flex-col gap-2 bg-[#EBEFF1] p-4">
          <h5 className="h-[48px] overflow-hidden text-ellipsis text-base font-semibold leading-[24px] !text-black">
            {title}
          </h5>
          <Typography.Paragraph>{price}</Typography.Paragraph>
        </div>
      </div>
    </Link>
  );
};

const NoApplicationFound = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center p-20">
      <img src={PeopleIcon} alt="No application found" />
      <Typography.Title level={4}>
        У вас нет статуса очередника
      </Typography.Title>
      <p className="text-[#7A7E81 mb-5 text-center">
        Для постановки в очередь на жилье подайте заявку и подпишите её с
        помощью ЭЦП
      </p>
      <ConfigProvider theme={{ token: { colorPrimary: "#F05E22" } }}>
        <Button size="large" type="primary" onClick={() => navigate("/sign")}>
          Подать заявку
        </Button>
      </ConfigProvider>
    </div>
  );
};

export const ProfilePage = () => {
  const { data: apartments } = useGetApartments();
  const { data: applications, isLoading } = useGetApplications();
  const [debouncedLoading, setDebouncedLoading] = useState(true);
  const { data: profile, isLoading: isProfileLoading } = useGetProfile();

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedLoading(isLoading || isProfileLoading);
    }, 500);
    return () => clearTimeout(timer);
  }, [isLoading, isProfileLoading]);

  if (debouncedLoading) {
    return <Skeleton active />;
  }

  if (!applications?.length) {
    return <NoApplicationFound />;
  }

  return (
    <>
      <div className="mb-5 flex gap-8 rounded-xl bg-white p-5">
        <div
          className="flex flex-col items-center justify-center rounded-xl px-8 py-5"
          style={{
            background:
              "linear-gradient(141deg, #008F91 15.18%, #003D3E 86.41%)",
          }}
        >
          <p className="text-white opacity-70">Дата постановки</p>
          <h5 className="text-2xl font-medium text-white">
            {new Date(applications?.[0]?.creation_date).toLocaleDateString(
              "ru-RU",
            )}
          </h5>
        </div>
        <div className="grow">
          <Typography.Title level={3}>
            {profile?.user?.first_name} {profile?.user?.last_name}
          </Typography.Title>
          <p className="mb-3 text-[#7A7E81]">{profile?.address}</p>
          <div className="w-full rounded-lg bg-[#F5F6F8] px-5 py-3">
            <p className="text-xs text-[#7A7E81]">Категория</p>
            <p className="text-sm text-[#333839]">
              {profile?.social_categories}
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-5 rounded-xl bg-white p-5">
        <div
          className="flex gap-5 rounded-xl px-8 py-5"
          style={{
            background:
              "linear-gradient(262deg, #DBFBDA 5.93%, #D1EEFF 68.26%)",
          }}
        >
          <div>
            <Typography.Title level={5}>Льготная ипотека 5%</Typography.Title>
            <Typography.Paragraph>
              Согласно лестнице доступности жилья Вы можете получить
              государственную поддержку в виде льготного ипотечного займа со
              ставкой вознаграждения 5%. Ниже мы подобрали подходящие объекты
              недвижимости в вашем регионе.
            </Typography.Paragraph>
            <Button color="primary">Подробнее </Button>
          </div>
          <Button href="/apartments">
            <div className="flex items-center justify-center gap-1">
              Показать все объекты
              <RightOutlined />
            </div>
          </Button>
        </div>
        <div>
          <div className="flex w-[calc(min(100vw,1280px)-272px-80px-64px-40px)] gap-5 overflow-x-scroll">
            {apartments?.map((item, index) => (
              <ApartmentItemCard
                key={index}
                id={item.id}
                isLiked={false}
                title={item.address}
                price={`от ${item.apartment_types[0]?.cost_per_square_meter} ₸/м²`}
                label={item.name}
                image={item.images[0]}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
