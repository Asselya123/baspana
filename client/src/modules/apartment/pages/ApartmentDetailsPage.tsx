import { Empty, Spin } from "antd";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import CompanyLogo from "@/assets/company-logo.svg";
import Eye from "@/assets/eye.svg";
import Preview from "@/assets/preview.webp";
import { GoBack } from "@/components/GoBack";
import { Layout } from "@/components/Layout";
import { useGetApartmentById } from "@/modules/application/pages/apartments";
import { ApartmentCard } from "../components/ApartmentCard";
import { ApartmentCarousel } from "../components/ApartmentCarousel";
import { ApartmentCommonInfo } from "../components/ApartmentCommonInfo";
import { ApartmentConditions } from "../components/ApartmentConditions";
import { ApartmentDescription } from "../components/ApartmentDescription";
import { ApartmentHeader } from "../components/ApartmentHeader";
import { ApartmentInfo } from "../components/ApartmentInfo";
import { AvailablePrograms } from "../components/AvailablePrograms";
import { BuilderInfo } from "../components/BuilderInfo";
import { BuildingDuration } from "../components/BuildingDuration";
import { QuestionBlock } from "../components/QuestionBlock";

const getApartmentViewCount = (id: string) => {
  const saved = localStorage.getItem(`m-data-${id}`);

  if (saved && Number.isInteger(parseInt(saved))) {
    return parseInt(saved);
  }
  localStorage.setItem(`m-data-${id}`, "200");
  return 200;
};

const updateApartmentViewCount = (id: string) => {
  const saved = localStorage.getItem(`m-data-${id}`);
  if (saved && Number.isInteger(parseInt(saved))) {
    localStorage.setItem(`m-data-${id}`, (parseInt(saved) + 1).toString());
  }
};

export const ApartmentDetailsPage = () => {
  const { id } = useParams();
  useEffect(() => {
    updateApartmentViewCount(id ?? "");
  }, []);
  const { data: apartment, isLoading } = useGetApartmentById(id ?? "");
  if (isLoading) {
    return (
      <Layout>
        <div className="flex h-full w-full items-center justify-center py-20">
          <Spin size="large" />
        </div>
      </Layout>
    );
  }
  if (!apartment) {
    return (
      <Layout>
        <div className="flex h-full w-full items-center justify-center py-20">
          <Empty description="Квартира не найдена" />
        </div>
      </Layout>
    );
  }
  return (
    <Layout>
      <GoBack />
      <div className="mt-5 flex w-full grow justify-center">
        <div className="flex w-full flex-col">
          <ApartmentHeader
            title={apartment?.name}
            address={apartment?.address}
            viewCount={getApartmentViewCount(id ?? "")}
            eyeIcon={Eye}
          />
          <div className="flex gap-10">
            <div className="max-w-[800px] max-xl:w-[700px] max-lg:w-[600px]">
              <ApartmentCarousel images={apartment.images} />
              <ApartmentInfo
                info={[
                  {
                    title: "Код объекта",
                    value: apartment.object_code,
                  },
                  {
                    title: "Этажность",
                    value: `${apartment.floor} этаж`,
                  },
                  {
                    title: "Зданий",
                    value: `${apartment.building_count} зданий`,
                  },
                  {
                    title: "Материал",
                    value: apartment.material,
                  },
                  {
                    title: "Начало строительства",
                    value: apartment.building_start_date,
                  },
                  {
                    title: "Срок сдачи",
                    value: apartment.building_start_date,
                  },
                ]}
              />
              <AvailablePrograms
                programs={apartment.available_programs.map((program) => ({
                  label: program,
                }))}
              />
              <ApartmentConditions
                conditions={apartment.conditions.map((condition) => ({
                  label: condition,
                }))}
              />
              <ApartmentDescription description={apartment.description} />
              <ApartmentCommonInfo
                commonInfo={[
                  {
                    propertyName: "Балкон",
                    value: apartment.has_balcony ? "Есть" : "Нет",
                  },
                  {
                    propertyName: "Балкон",
                    value: apartment.is_balcony_glazed ? "Есть" : "Нет",
                  },
                  {
                    propertyName: "Год постройки",
                    value: apartment.building_start_date,
                  },
                  {
                    propertyName: "Тип дома",
                    value: apartment.home_type,
                  },
                  {
                    propertyName: "Тип санузла",
                    value: apartment.bathroom_type,
                  },
                  {
                    propertyName: "Безопасность",
                    value: apartment.security,
                  },
                  {
                    propertyName: "Парковка",
                    value: apartment.parking_type,
                  },
                  {
                    propertyName: "Лифт",
                    value: apartment.elevator_type,
                  },
                ]}
              />
              <BuilderInfo
                companyLogo={CompanyLogo}
                companyName={apartment.builder.name}
                info={[
                  {
                    title: "Телефон",
                    value: apartment.builder.phone_number,
                  },
                  {
                    title: "Email",
                    value: apartment.builder.email,
                  },
                  {
                    title: "Сайт",
                    value: apartment.builder.site,
                  },
                  {
                    title: "Контакты",
                    value: apartment.builder.contacts,
                  },
                ]}
              />
              <QuestionBlock
                title="Остались вопросы?"
                description="Получите консультацию на прямую от строительной компании"
                buttonText="Получить консультацию"
                onButtonClick={() => console.log("Consultation requested")}
              />
              <BuildingDuration
                images={[
                  {
                    url: Preview,
                    date: "15 октября 2021",
                  },
                  {
                    url: Preview,
                    date: "15 октября 2021",
                  },
                  {
                    url: Preview,
                    date: "15 октября 2021",
                  },
                ]}
                description="В составе квартир предусматриваются жилые комнаты, кухни, санузлы, балконы. Фундаменты – монолитные железобетонные, стены тех подполья - железобетонные монолитные. Наружные стены и перегородки – сборные трехслойные наружные стеновые несущие панели, перекрытия – сборные железобетонные панели, лестницы - монолитные железобетонные. "
                lastUpdated="Обновлено 15 октября 2021"
                startYear={2021}
                endYear={2025}
              />
            </div>
            <ApartmentCard
              apartmentTypes={apartment.apartment_types.map((type) => ({
                label: type.label,
                roomCount: type.room_count,
                minArea: type.min_area,
                maxArea: type.max_area,
                price: type.min_area * type.cost_per_square_meter,
                pricePerSquareMeter: type.cost_per_square_meter,
                availableCount: type.available_count,
                schemeUrl: type.scheme_url,
              }))}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};
