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
import {
  createMemberCard,
  MemberType,
} from '../../../services/membercard.service';
import { getListAcc } from '../../../services/account.service';
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
  const [listAcc, setListAcc] = useState<any[]>([]);

  const getListAccFromBE = async () => {
    const res = await getListAcc();
    setListAcc(res.data.accounts);
    console.log(res.data.accounts);
  };

  useEffect(() => {
    getListAccFromBE();
  }, []);

  const navigate = useNavigate();
  const onFinish = async (values: any) => {
    try {
      console.log(values);
      await createMemberCard(values);
      message.success('MemberCard updated successfully');
      navigate(`/membership/detailmemtype/${id}`);
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
          style={{ maxWidth: 600 }}
          form={form}
          onFinish={onFinish}
          initialValues={{ membership_type_id: id, active: true }}
        >
          <Form.Item
            label="Select Account "
            name="account_id"
            rules={[{ required: true, message: 'Please choose!' }]}
          >
            <TreeSelect>
              {listAcc.map((acc) => (
                <TreeSelect.TreeNode
                  key={acc._id}
                  title={acc.email}
                  value={acc._id}
                />
              ))}
            </TreeSelect>
          </Form.Item>
          <Form.Item name="membership_type_id" hidden>
            <Input />
          </Form.Item>
          <Form.Item name="active" hidden>
        <Input />
      </Form.Item>
          <Form.Item
            label="Start Date"
            name="start_date"
            rules={[
              { required: true, message: 'Please fill and input right type!' },
            ]}
          >
            <DatePicker type="date" />
          </Form.Item>
          <Form.Item label="End Date" name="end_date">
            <DatePicker type="date" />
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
