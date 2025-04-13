import { Button, Select } from "antd";
import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";

interface ApartmentCardProps {
  apartmentTypes: {
    label: string;
    roomCount: number;
    minArea: number;
    maxArea: number;
    price: number;
    pricePerSquareMeter: number;
    availableCount: number;
    schemeUrl: string;
  }[];
}
const InfoItem: FC<{ label: string; value: string }> = ({ label, value }) => {
  return (
    <div className="flex flex-col gap-2">
      <p className="text-sm text-[#7A7E81]">{label}</p>
      <p className="text-sm font-medium">{value}</p>
    </div>
  );
};

const formatPrice = (price: number) => {
  return price.toLocaleString("ru-RU", {
    style: "currency",
    currency: "KZT",
    minimumFractionDigits: 0,
  });
};

export const ApartmentCard: FC<ApartmentCardProps> = ({ apartmentTypes }) => {
  const [selectedApartment, setSelectedApartment] = useState(apartmentTypes[0]);
  const navigate = useNavigate();
  return (
    <div className="h-max w-[360px] min-w-[340px] rounded-lg border border-[#D1D4D7] p-5">
      <Select
        options={apartmentTypes.map((type) => ({
          label: type.label,
          value: type.label,
        }))}
        className="w-full"
        onChange={(value) => {
          const apartment = apartmentTypes.find((type) => type.label === value);
          if (apartment) {
            setSelectedApartment(apartment);
          }
        }}
        defaultValue={apartmentTypes[0].label}
      />
      <div className="my-8 grid grid-cols-2 gap-4">
        <InfoItem
          label="Количество комнат"
          value={selectedApartment.roomCount.toString()}
        />
        <InfoItem
          label="Площадь"
          value={`${selectedApartment.minArea} - ${selectedApartment.maxArea} м2`}
        />
        <InfoItem label="Цена" value={formatPrice(selectedApartment.price)} />
        <InfoItem
          label="Цена за м2"
          value={formatPrice(selectedApartment.pricePerSquareMeter)}
        />
        <InfoItem
          label="Доступно"
          value={selectedApartment.availableCount.toString()}
        />
      </div>
      <img src={selectedApartment.schemeUrl} alt="scheme" />
      <Button
        className="mt-8 w-full"
        type="primary"
        size="large"
        onClick={() => navigate("/sign")}
      >
        Подать заявку
      </Button>
    </div>
  );
};
