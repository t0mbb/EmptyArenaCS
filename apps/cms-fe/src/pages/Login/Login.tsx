import { Button, Checkbox, Form, type FormProps, Input } from 'antd';
import { login } from '../../services/auth.service';
import { useState } from 'react';

type FieldType = {
  email: string;
  password: string;
};

const Login = () => {
  const [message, setMessage] = useState();
  const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
    const response = await login(values.email, values.password)
    sessionStorage.setItem('accessToken', response.data.accessToken);
    sessionStorage.setItem('userData', response.data.userData);
    
    setMessage(response.data.message);
    console.log('login', response);

  };
  
  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item<FieldType>
        label="Email"
        name="email"
        rules={[{ required: true, message: 'Please input your email!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item<FieldType>
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
      {message ? message : null}
    </Form>
  );
};

export default Login;
