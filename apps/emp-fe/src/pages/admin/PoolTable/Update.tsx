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
  import { findPoolTable, updatePoolTable , BrandName , StatusName } from '../../../services/pooltable.service';
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
      const response = await findPoolTable(id);
      console.log(response);
      setListAcc(response.data.Result);
      form.setFieldsValue({
        number: response.data.Result.number,
        brandname: response.data.Result.brandname,
        price : response.data.Result.price,
        status : response.data.Result.status,
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
        await updatePoolTable(id, {values});
        message.success('PoolTable updated successfully');
        navigate('/pooltable');
      } catch (error) {
        console.error('Error updating PoolTable:', error);
        message.error('Failed to update PoolTable');
      }
    };

    const statusList = Object.keys(StatusName).filter((status) => status !== "USED").map((status) => {
        if (status) {
          return (
            <TreeNode
              key={status.toLowerCase()}
              title={status}
              value={status.toLowerCase()}
            />
          );
        }
        
      });
    
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
            label="Table Number"
            name="number"
            rules={[
              {
                required: true,
                message: 'Please fill ',
              },
              {
                validator: (norule, value) => {
                  if (value && value < 30) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error('Table number cannot over than 30!')
                  );
                },
              },
            ]}
          >
            <Input disabled/>
          </Form.Item>
          <Form.Item
            label="Brand of Table"
            style={{textEmphasisColor : "white"}}
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
                  validator: (noruleyet, value) => {
                    if (value && value < 100) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error('Price per hours can not over 100$ !!!')
                    );
                  },
                },
              ]}
          >
            <Input prefix="$" type="number" min={0} step={0.1} />
          </Form.Item>

          <Form.Item
            label="Status"
            name="status"
            rules={[{ required: true, message: 'Please choose!' }]}
          >
            <TreeSelect>{statusList}</TreeSelect>
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
  