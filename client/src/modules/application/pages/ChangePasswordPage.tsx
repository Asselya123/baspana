import { Button, Form, Input, Typography } from "antd";
import { useChangePassword } from "@/api";

export default function ChangePasswordPage() {
  const [form] = Form.useForm();
  const { mutate: changePassword, isPending } = useChangePassword(
    form.resetFields,
  );
  return (
    <div className="w-[400px]">
      <Typography.Title level={3}>Сменить пароль</Typography.Title>
      <Form
        layout="vertical"
        form={form}
        onFinish={(values) =>
          changePassword({
            old_password: values?.old_password,
            new_password: values?.new_password,
          })
        }
      >
        <Form.Item
          name="old_password"
          label="Старый пароль"
          rules={[
            { required: true, message: "Старый пароль обязательно" },
            {
              min: 6,
              message: "Старый пароль должен быть не менее 6 символов",
            },
          ]}
        >
          <Input.Password name="old_password" placeholder="Старый пароль" />
        </Form.Item>
        <Form.Item
          name="new_password"
          label="Пароль"
          rules={[
            { required: true, message: "Пароль обязательно" },
            {
              min: 6,
              message: "Пароль должен быть не менее 6 символов",
            },
          ]}
        >
          <Input.Password name="new_password" placeholder="Пароль" />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            size="large"
            className="mt-5 w-full"
            htmlType="submit"
            loading={isPending}
          >
            Сменить пароль
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
