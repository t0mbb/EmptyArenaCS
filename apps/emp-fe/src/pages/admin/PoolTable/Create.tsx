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
  createPoolTable,
  StatusName,
  BrandName,
} from '../../../services/pooltable.service';
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

  const brandList = Object.keys(BrandName).map((brand) => {
    if (brand) {
      return (
        <TreeNode
          key={brand.toLowerCase()}
          title={brand}
          value={brand.toLowerCase()}
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
      await createPoolTable(values);
      message.success('PoolTable updated successfully');
      navigate('/poolTable');
    } catch (error) {
      console.error('Error updating PoolTable:', error);
      message.error('Failed to update PoolTable');
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
          initialValues={{ status : "available"}}
        >
          <Form.Item
            label="Table Number"
            name="number"
            rules={[
              {
                required: true,
                message: 'Please fill ',
              },
              {
                validator: (_, value) =>
                  value <= 100 ? Promise.resolve() : Promise.reject('Table number cannot be greater than 100'),
              },
            ]}
          >
            <InputNumber type="number" />
          </Form.Item>
          <Form.Item
            label="Brand of Table"
            name="brandname"
            rules={[{ required: true, message: 'Please choose!' }]}
          >
            <TreeSelect>{brandList}</TreeSelect>
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
            label="Status"
            name="status"
            rules={[{ required: true, message: 'Please choose!' }]}
             hidden >
           
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
