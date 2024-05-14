import {
  Button,
  ConfigProvider,
  DatePicker,
  Form,
  Input,
  Layout,
  TreeSelect,
  message,
} from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import {  createAcc } from '../../../services/account.service';
import { useEffect } from 'react';
import { RoleName} from '../../../components/RoleProtected/RoleProtected'
import moment from 'moment';
import { TreeNode } from 'antd/es/tree-select';


const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 14 },
  },
};


export const Create: React.FC = () => {

  const roleList = Object.keys(RoleName).map(role => {
    if (role) {
      return <TreeNode key={role.toLowerCase()} title={role} value={role.toLowerCase()} />;
    }
    return null;
});
  
  const [form] = Form.useForm();


  const navigate = useNavigate(); 
  const onFinish = async (values: any) => {
    try {
      console.log(values);
      await createAcc(values);
      message.success('Account updated successfully');
      navigate('/account');
    } catch (error) {
      console.error('Error updating account:', error);
      message.error('Failed to update account');
    }
  };

 

  return (
    <ConfigProvider
      theme={{
        token: {
          colorBgBase: '#141414',
          colorText: 'white',
          colorBorder: 'white',
          borderRadius: 10,
        },
      }}
    >
      <Layout style={{ padding: '30px' }}>
        <Form
          {...formItemLayout}
          variant="filled"
          style={{ maxWidth: 600 }}
          form={form}
          onFinish={onFinish}
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                type: "email",
                message: 'Please fill and input right type email!!!',
              },
            ]}
          >
            <Input placeholder='Email'/>
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: 'Please fill and input right type!!!',
              },
            ]}
          >
            <Input.Password placeholder='Password'/>
          </Form.Item>
          <Form.Item
            label="Full Name"
            name="fullname"
            rules={[
              {
                required: true,
                message: 'Please fill and input right type!!!',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Role"
            name="role"
            rules={[{ required: true, message: 'Please input!' }]}
          >
         <TreeSelect>{roleList}</TreeSelect>
          </Form.Item>

          <Form.Item
            label="Phone Number"
            name="phone"
            rules={[
              {
                required: true,
                message: 'Please fill and input right type',
              },
            ]}
          >
            <Input type="number" style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item
            label="Date Of Birth"
            name="dob"
            rules={[
              { required: true, message: 'Please fill and input right type!' },
            ]}
          >
            <DatePicker type = "date" />
          </Form.Item>

          <Form.Item
            label="Address"
            name="address"
            rules={[
              { required: true, message: 'Please fill and input right type!' },
            ]}
          >
            <Input.TextArea />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
            <Button type="primary" ghost htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Layout>
    </ConfigProvider>
  );
};

export default Create;
