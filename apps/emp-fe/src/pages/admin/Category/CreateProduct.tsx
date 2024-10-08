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
  createProduct,
} from '../../../services/product.service';

import { useEffect, useState } from 'react';

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
  let { id } = useParams();

  const [form] = Form.useForm();

  const navigate = useNavigate();
  const onFinish = async (values: any) => {
    try {
      console.log(values);
      await createProduct(values);
      message.success('New Product updated successfully');
      navigate(`/category/detailCategory/${id}`);
    } catch (error) {
      console.error('Error updating Product:', error);
      message.error('Failed to update Product');
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
          style={{ maxWidth: 600  , marginLeft : 500}}
          form={form}
          onFinish={onFinish}
          initialValues={{ category_id: id, active: true }}
        >
          <Form.Item
            label="Name of Product "
            name="name"
            rules={[{ required: true, message: 'Please choose!' }]}
          >
            <Input/>
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
                     value <= 10000000 ? Promise.resolve() : Promise.reject('Price must not exceed 10,000,000'),
                 },            
               ]}
           >
             <InputNumber style ={{width : 300}} prefix="VNĐ" 
              formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
             />
          </Form.Item>

          <Form.Item name="category_id" hidden>
            <Input />
          </Form.Item>
          <Form.Item
          label = "Description"
           name="description" >
            <Input />
          </Form.Item>
          
          <Form.Item
            label="Quantity"
            name="quantity_in_stock"
            rules={[
              {
                required: true,
                message: 'Please fill and input right type! ',
            }]}
            
          >
            <Input   type="number" min={0} step={1} />
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
