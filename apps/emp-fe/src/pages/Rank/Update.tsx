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
  import { findRank, updateRank } from '../../services/rank.service';
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
      const response = await findRank(id);
     

      setListAcc(response.data.result);
   
      form.setFieldsValue({
    
        min_elo: response.data.result.min_elo,
        max_elo : response.data.result.max_elo,
      });
    };

    const [form] = Form.useForm();
    useEffect(() => {
      getListFromBE();
    }, []);
  
    const navigate = useNavigate(); 
    const onFinish = async (values: any) => {
      try {
        await updateRank(id, {values});
        message.success('Rank updated successfully');
        navigate('/rank');
      } catch (error) {

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
            style={{ maxWidth: 600 , marginLeft: 300  }}
            form={form}
            onFinish={onFinish}

          >
          <Form.Item
            name="name"   hidden>
            <Input disabled/>
          </Form.Item>
          
          <Form.Item
              label="Min elo of that rank"
              name="min_elo"
           
            >
              <InputNumber style ={{width : 300}}/>
          </Form.Item>

          <Form.Item
            label="Max elo of that rank"
            name="max_elo"
            rules={[
              { required: true, message: 'Please fill and input right type!' },
            ]}
          >
          <InputNumber style ={{width : 300}}/>
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
  