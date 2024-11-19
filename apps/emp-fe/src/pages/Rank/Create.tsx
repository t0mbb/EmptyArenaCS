import {
    Button,
    ConfigProvider,
    DatePicker,
    Form,
    Input,
    Layout,
    TreeSelect,
    message,
    InputNumber
  } from 'antd';
  import { useNavigate, useParams } from 'react-router-dom';
  import { createRank, Ranking } from '../../services/rank.service';
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
    const roleList = Object.keys(Ranking).map(role => {
      const value = Ranking[role as keyof typeof Ranking];
      if (value) {
        return <TreeNode key={value} title={value} value={value} />;
      }
      return null;
  });
  
    const navigate = useNavigate();
    const onFinish = async (values: any) => {
      try {
     
        await createRank(values);
        message.success('Rank updated successfully');
        navigate('/rank');
      } catch (error) {
  
        message.error('Failed to update Rank');
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
            style={{ maxWidth: 600, marginLeft: 300 }}
            form={form}
            onFinish={onFinish}
          >
            <Form.Item
              label="Rank name"
              name="name"
              rules={[{ required: true, message: 'Please choose!' }]}
            >
          <TreeSelect>{roleList}</TreeSelect>
            </Form.Item>

            <Form.Item
            label="Min Elo of that rank"
            name="min_elo"
            rules={[
                {
                  required: true,
                  message: 'Please fill ',
                  type : 'number'
                }
             
              ]}
          >
            <InputNumber style ={{width : 300}}/>
          </Form.Item>

          <Form.Item
            label="Max elo of that rank"
            name="max_elo"
            rules={[
                {
                  required: true,
                  message: 'Please fill ',
                }
             
              ]}
          >
            <InputNumber style ={{width : 300}}
            />
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
  