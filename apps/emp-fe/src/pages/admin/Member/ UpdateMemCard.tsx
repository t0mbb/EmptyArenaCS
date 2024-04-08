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
  findMemberCard,
  updateMemberCard,
} from '../../../services/membercard.service';
import { useState, useEffect } from 'react';

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
  const [idType , setidType] = useState<any>();  
  const getListFromBE = async () => {
    const response = await findMemberCard(id);
  
    setListAcc(response.data.Result);
  setidType(response.data.Result.membership_type_id._id);
    form.setFieldsValue({
      account_id: response.data.Result.account_id._id,
      membership_type_id: response.data.Result.membership_type_id._id,
      start_date: moment(response.data.Result.start_date),
      end_date: moment(response.data.Result.end_date),
      active: response.data.Result.active,
    });
  };

  const [form] = Form.useForm();
  useEffect(() => {
    getListFromBE();
  }, []);

  const navigate = useNavigate();
  const onFinish = async (values: any) => {
    try {
      console.log(values);
      await updateMemberCard(id, { values });
      message.success('MemberCard updated successfully');
      navigate(`/membership/detailmemtype/${idType}`);
    } catch (error) {
      console.error('Error updating MemberCard:', error);
      message.error('Failed to update MemberCard');
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
          <Form.Item hidden name="account_id">
            <Input disabled />
          </Form.Item>
          <Form.Item hidden name="membership_type_id">
            <Input disabled />
          </Form.Item>

          <Form.Item
            label="Start Date"
            name="start_date"
            rules={[{ required: true, message: 'Please select a start date!' }]}
          >
            <DatePicker type="date" />
          </Form.Item>
          <Form.Item
            label="End Date"
            name="end_date"
            rules={[
              { required: true, message: 'Please select an end date!' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('start_date') < value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error('End date must be after the start date!')
                  );
                },
              }),
            ]}
          >
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

export default Update;
