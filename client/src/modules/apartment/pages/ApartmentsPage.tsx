import { Empty, Skeleton, Typography } from "antd";
import { Layout } from "@/components/Layout";
import { ApartmentItemCard } from "@/modules/application/pages/ProfilePage";
import { useGetApartments } from "@/modules/application/pages/apartments";

export const ApartmentsPage = () => {
  const { data: apartments, isLoading: isApartmentsLoading } =
    useGetApartments();

  if (isApartmentsLoading) {
    return (
      <Layout>
        <Skeleton active className="mt-10" />
      </Layout>
    );
  }

  if (!apartments?.length) {
    return (
      <Layout>
        <Empty className="mt-10">
          <Typography.Title level={4}>Жилых комплексов нет</Typography.Title>
          <Typography.Paragraph>
            Попробуйте позже или обратитесь в техподдержку
          </Typography.Paragraph>
        </Empty>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="mb-0 mt-5 flex">
        <Typography.Title level={2}>Жилые комплексы</Typography.Title>
      </div>

      <div className="flex flex-wrap gap-5">
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
    </Layout>
  );
};
