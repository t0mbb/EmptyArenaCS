import React, { useState } from 'react';
import { useEffect } from 'react';
import {

  Table,

  Button,
  Form,
  ConfigProvider,
  Popconfirm,
  message,
  FloatButton,
  Tag,
  Divider,
  Modal,
  TreeSelect,
  Card,
} from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import {
  deletePoolTable,
  findPoolTable,
} from '../../../services/pooltable.service';

import { useNavigate, useParams } from 'react-router-dom';

import '../../../assets/css/table.css';
import { startService , stopService } from '../../../services/pooltable.service';
import { TreeNode } from 'antd/es/tree-select';

const Home = () => {
  const navigate = useNavigate();
  let { id } = useParams();
  const [table, setList] = useState<any>([]);

  const getDetailFromBE = async () => {
    const res = await findPoolTable(id);
    console.log(res.data);
    setList(res.data.Result);
  };
  const start = () => {
    startService(id);
    window.location.reload();
};
const stop= () => {
   stopService(id);
    window.location.reload();
};

  useEffect(() => {
    getDetailFromBE();
  }, []);

  const [form] = Form.useForm();
  const confirm = async (_id: string) => {
    deletePoolTable(_id);
    message.success('Delete Success');
  };

  const cancel = (e?: React.MouseEvent<HTMLElement>) => {
    message.error('Cancel Delete');
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  
  return (
    <ConfigProvider
      theme={{
        token: {
          colorBgBase: '#141414',
          colorBgContainer: '#',
          colorText: 'white',
          colorBorderSecondary: '#a61d24',
          borderRadius: 10,
        },
      }}
    >
        <Modal title="Order"
         open={isModalOpen}
         onCancel={handleOk}
         okButtonProps={{ style: { display: 'none' } }}>
        <Divider/>
               <Form
          variant="filled"
          form={form}
          onFinish={handleOk}
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
            </Modal>
       <FloatButton
        shape="circle"
        type="primary"
        onClick= {showModal}
        style={{
          width: '60px',
          height: '60px',
          position: 'absolute',
          marginRight: 20,
        }}
        icon={<PlusOutlined />}
      />
       <div style={{overflowX: 'auto'  ,display: 'flex' ,  justifyContent: 'center'}}>
      <Button
        className="button"
        style={{
          marginTop : 15,
          marginRight : 300,
          color: 'whitesmoke',
          backgroundColor: table.status === 'used' || table.status === "maintained"? 'gray' : '#e74748',
        }}
      onClick = {start}
        disabled={table.status === 'used' || table.status  === 'maintained'}
      >
        Start Service
      </Button>
      <Button
        className="button"
        style={{
          marginTop : 15,
          color: 'whitesmoke',
          backgroundColor: table.status === 'used' ? '#e74748' : 'gray',
        }}
        disabled={table.status === 'available' || table.status  === 'maintained'}
        onClick = {stop}
      >
        Stop Service
      </Button>
      </div>
      <Divider/>
        <div>
         
      <div style ={{display : "flex" , justifyContent : "right"}}>
      <Card title="Information"  style={{ width: 300  , height : 600  }}>
      <p>Table Number |  {table.number}</p>
      <p>Price per hour | {table.price} $</p>
      <p>Table Type | {table.brandname}</p>
      <Divider/>
      <p>Starting </p>
    </Card>
    </div>
    </div>
    </ConfigProvider>
    
  );
};

export default Home;
