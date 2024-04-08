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
  import { findMemberType, updateMemberType } from '../../../services/membercard.service';
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

    const getListFromBE = async () => {
      const response = await findMemberType(id);
      console.log(response.data.Result);
      setListAcc(response.data.Result);
   
      form.setFieldsValue({
        name: response.data.Result.name,
        price: response.data.Result.price,
        durations : response.data.Result.durations,
        description : response.data.Result.description,
        discount : response.data.Result.discount,
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
        await updateMemberType(id, {values});
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
        <Layout style={{ padding: '30px' }}>
          <Form
            {...formItemLayout}
            variant="filled"
            style={{ maxWidth: 600 }}
            form={form}
            onFinish={onFinish}

          >
          <Form.Item
            hidden
            name="name"  >
            <Input disabled/>
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
                  validator: (noruleyet, value) => {
                    if (value > 10 && value < 1000) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error('Price per hours can not over 1000$ !!!')
                    );
                  },
                },
              ]}
          >
            <Input prefix="$" type="number" min={0} step={0.1} />
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

          <Form.Item
            label="Discount"
            name="discount"
            rules={[
              { required: true, message: 'Please fill and input right type!' },
            ]}
          >
            <TreeSelect>
              <TreeNode value="5" title="5%" />
              <TreeNode value="10" title="10%" />
              <TreeNode value="15" title="15%" />
              <TreeNode value="20" title="20%" />
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
  
  export default Update;
  