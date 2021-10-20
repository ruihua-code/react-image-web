import { useState, useEffect } from "react";
import { Form, Input, Button, Divider } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import LoginApi from "../../api/login";
import { NavLink } from "react-router-dom";
import "./index.scss";
function LoginPage() {
  const [codeImage, setCode] = useState(null);
  const [uuid, setUuid] = useState(null);
  const onFinish = (values) => {
    console.log("Success:", values);
    LoginApi.login({
      code: values.code,
      phone: values.phone,
      password: values.password,
      uuid: uuid,
    });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const codeImageHtml = (
    <img
      onClick={() => setImageCode()}
      className="img-code"
      src={codeImage}
      alt="验证码"
    ></img>
  );

  const setImageCode = () => {
    LoginApi.getCode().then((res) => {
      setCode("data:image/gif;base64," + res.img);
      setUuid(res.uuid);
    });
  };
  const tailFormItemLayout = {
    wrapperCol: {
      sm: {
        span: 15,
        offset: 8,
      },
    },
  };
  useEffect(() => {
    setImageCode();
  }, []);
  return (
    <div>
      <div className="bg"></div>
      <div className="login">
        <h2 className="title">
          <Divider>小明跑腿 &bull; 后台管理系统</Divider>
        </h2>

        <Form
          className="formLogin"
          name="basic"
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 18 }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="账号"
            name="phone"
            rules={[{ required: true, message: "请输入账号" }]}
          >
            <Input allowClear prefix={<UserOutlined />} placeholder="账号" />
          </Form.Item>

          <Form.Item
            label="密码"
            name="password"
            rules={[{ required: true, message: "请输入密码" }]}
          >
            <Input.Password
              allowClear
              prefix={<LockOutlined />}
              placeholder="密码"
            />
          </Form.Item>
          <Form.Item
            {...tailFormItemLayout}
            name="code"
            rules={[{ required: true, message: "请输入验证码" }]}
          >
            <Input allowClear addonAfter={codeImageHtml} placeholder="验证码" />
          </Form.Item>
          <Form.Item>
            <NavLink to="/registry">注册</NavLink>
          </Form.Item>
          <Form.Item className="btn-login">
            <Button type="primary" shape="round" htmlType="submit">
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default LoginPage;
