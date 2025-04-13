import { App, Button, Form, Input, Typography } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "@/api";
import { Layout } from "@/components/Layout";

export default function LoginPage() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { message } = App.useApp();

  const onFinish = async (values: any) => {
    setIsLoading(true);
    try {
      setIsLoading(true);
      const response = await login(values);
      localStorage.setItem("token", response.access);
      navigate("/profile");
    } catch (error) {
      console.error(error);
      message.error("Неверный логин или пароль");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <div className="mx-auto w-max py-10">
        <Typography.Title level={3}>
          Войти или зарегистрироваться
        </Typography.Title>
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item
            name="username"
            label="Имя пользователя"
            rules={[
              { required: true, message: "Имя пользователя обязательно" },
            ]}
          >
            <Input name="username" placeholder="Имя пользователя" />
          </Form.Item>
          <Form.Item
            name="password"
            label="Пароль"
            rules={[{ required: true, message: "Пароль обязательно" }]}
          >
            <Input.Password name="password" placeholder="Пароль" />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              size="large"
              className="mt-5 w-full"
              htmlType="submit"
              loading={isLoading}
            >
              Войти
            </Button>
          </Form.Item>
        </Form>
      </div>
    </Layout>
  );
}
