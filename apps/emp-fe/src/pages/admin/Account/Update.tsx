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
import { accDetails, accUpdate } from '../../../services/account.service';
import { useState, useEffect } from 'react';
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



export const Update: React.FC = () => {
  let { id } = useParams();
  const [listAcc, setListAcc] = useState<any>();
  const getListRoleFromBE = async () => {
    const response = await accDetails(id);
    console.log(response);
    setListAcc(response.data.Result);
    form.setFieldsValue({
      fullname: response.data.Result.fullname,
      email: response.data.Result.email,
      role : response.data.Result.role,
      phone : response.data.Result.phone,
      dob : moment(response.data.Result.dob),
      address : response.data.Result.address,
    });
  };
  const [form] = Form.useForm();
  useEffect(() => {
    getListRoleFromBE();
  }, []);
  const roleList = Object.keys(RoleName).map(role => {
    if (role) {
      return <TreeNode key={role.toLowerCase()} title={role} value={role.toLowerCase()} />;
    }
    return null;
});

  const navigate = useNavigate(); 
  const onFinish = async (values: any) => {
    try {
      console.log(values);
      await accUpdate(id, {values});
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
                message: 'Please fill and input right type!!!',
              },
            ]}
          >
            <Input disabled />
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

export default Update;
