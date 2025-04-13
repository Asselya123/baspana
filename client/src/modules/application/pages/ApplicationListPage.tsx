import {
  DeleteOutlined,
  PlusOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Button, Input, Popconfirm, Table, Tag, Typography } from "antd";
import { ColumnType } from "antd/es/table";
import { FC, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Application } from "@/types";
import { useDeleteApplication, useGetApplications } from "./application";

const DeleteApplicationButton: FC<{ id: string }> = ({ id }) => {
  const { mutate: deleteApplication, isPending } = useDeleteApplication(id);

  return (
    <Popconfirm
      title="Вы уверены, что хотите удалить заявление?"
      okButtonProps={{ loading: isPending, danger: true }}
      onConfirm={() => {
        deleteApplication();
      }}
    >
      <Button icon={<DeleteOutlined />} danger>
        Удалить
      </Button>
    </Popconfirm>
  );
};

interface ApplicationListPageProps {}

const columns: ColumnType<Application>[] = [
  {
    title: "Наименование",
    dataIndex: "title",
    key: "title",
    render: (_, record) => {
      return <Typography.Text strong>{record.name}</Typography.Text>;
    },
  },
  {
    title: "Статус",
    dataIndex: "status",
    key: "status",
    render: (_, record) => {
      return (
        <Tag
          color={
            record.status === "success"
              ? "success"
              : record.status === "in_progress"
                ? "warning"
                : "error"
          }
        >
          {record.status === "success"
            ? "Принято"
            : record.status === "in_progress"
              ? "В процессе"
              : "Отказано"}
        </Tag>
      );
    },
  },
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
    render: (_, record) => {
      return <p className="text-base text-gray-500">№ {record.id}</p>;
    },
  },
  {
    title: "Дата создания",
    dataIndex: "createdAt",
    key: "createdAt",
    render: (_, record) => {
      return (
        <p className="text-base text-gray-500">№ {record.creation_date}</p>
      );
    },
  },
];

export const ApplicationListPage: FC<ApplicationListPageProps> = ({}) => {
  const navigate = useNavigate();
  const { data: applications, isLoading } = useGetApplications();
  const [tableColumns, setTableColumns] =
    useState<ColumnType<Application>[]>(columns);
  const [params] = useSearchParams();

  useEffect(() => {
    const isEdit = params.get("is_edit") === "true";
    if (isEdit) {
      setTableColumns([
        ...columns,
        {
          title: "Действия",
          dataIndex: "actions",
          key: "actions",
          render: (_, record) => {
            return <DeleteApplicationButton id={record.id} />;
          },
        },
      ]);
    } else {
      setTableColumns(columns);
    }
  }, [params]);

  return (
    <div>
      <div className="mb-10 max-w-[300px]">
        <Input prefix={<SearchOutlined />} placeholder="Поиск" />
      </div>
      <Table
        loading={isLoading}
        rowKey={(record) => record.id}
        dataSource={applications}
        columns={tableColumns}
        pagination={{ pageSize: 10 }}
        footer={() => {
          return (
            <div className="flex justify-center">
              <Button icon={<PlusOutlined />} onClick={() => navigate("/sign")}>
                Подать заявку еще раз
              </Button>
            </div>
          );
        }}
      />
    </div>
  );
};
