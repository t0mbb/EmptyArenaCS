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
import { createCategory } from '../../../services/product.service';
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
  const [form] = Form.useForm();
  useEffect(() => {}, []);

  const navigate = useNavigate();
  const onFinish = async (values: any) => {
    try {
      console.log(values);
      await createCategory(values);
      message.success('Category updated successfully');
      navigate('/category');
    } catch (error) {
      console.error('Error updating Category:', error);
      message.error('Failed to update Category');
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
          style={{ maxWidth: 600, marginLeft: 500 }}
          form={form}
          onFinish={onFinish}
        >
          <Form.Item
            label="Category"
            name="name"
            rules={[{ required: true, message: 'Please choose!' }]}
          >
            <TreeSelect>
              <TreeNode value="food" title="Food" />
              <TreeNode value="drink" title="Drink" />
              <TreeNode value="cues" title="Cues" />
              <TreeNode value="gloves" title="Gloves" />
            </TreeSelect>
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
