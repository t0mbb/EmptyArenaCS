import {
  Button,
  ConfigProvider,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Layout,
  TreeSelect,
  message,
} from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import {
  createMemberType,
  MemberType,
} from '../../../services/membercard.service';
import { useEffect } from 'react';

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
  const typeList = Object.keys(MemberType).map((type) => {
    if (type) {
      return (
        <TreeNode
          key={type.toLowerCase()}
          title={type}
          value={type.toLowerCase()}
        />
      );
    }
    return null;
  });

  const [form] = Form.useForm();
  useEffect(() => {}, []);

  const navigate = useNavigate();
  const onFinish = async (values: any) => {
    try {
      console.log(values);
      await createMemberType(values);
      message.success('MemberType updated successfully');
      navigate('/membership');
    } catch (error) {
      console.error('Error updating MemberType:', error);
      message.error('Failed to update MemberType');
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
      <Layout style={{ padding: '50px' }}>
        <Form
          {...formItemLayout}
          variant="filled"
          style={{ maxWidth: 800 }}
          form={form}
          onFinish={onFinish}
        >
          <Form.Item
            label="Type of Membership "
            name="name"
            rules={[{ required: true, message: 'Please choose!' }]}
          >
            <TreeSelect>{typeList}</TreeSelect>
          </Form.Item>
          <Form.Item
            label="Price per Hours"
            name="price"
            rules={[
                {
                  required: true,
                  message: 'Please fill ',
                },
                {
                  validator: (_, value) =>
                    value <= 1000000 ? Promise.resolve() : Promise.reject('Price must not exceed 1,000,000'),
                },            
              ]}
          >
            <InputNumber style ={{width : 300}}prefix="VNĐ" 
             formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            />
          </Form.Item>

          <Form.Item
            label="Durations of membership"
            name="durations"
            rules={[
              { required: true, message: 'Please fill and input right type!' },
            ]}
          >
            <TreeSelect >
              <TreeNode value="3 months" title="3 months"  />
              <TreeNode value="6 months" title="6 months" />
              <TreeNode value="12 months" title="1 year" />
            </TreeSelect>
          </Form.Item>

          <Form.Item label="Description" name="description">
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
