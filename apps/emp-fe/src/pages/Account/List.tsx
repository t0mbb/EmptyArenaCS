import React, { useState } from 'react';
import { useEffect } from 'react';
import {
  Space,
  Table,
  type FormProps,
  Button,
  ConfigProvider,
  Popconfirm,
  message,
  FloatButton,
  Tag,
} from 'antd';
import { PlusOutlined  } from '@ant-design/icons';
import { getListAcc, accDelete } from '../../services/account.service';

import { useNavigate } from 'react-router-dom';
import RoleProtected, {
  RoleName,
} from '../../components/RoleProtected/RoleProtected';
import '../../assets/css/table.css';
const { Column } = Table;

interface DataType {
  key: React.Key;
  firstName: string;
  age: number;
  address: string;
  _id: string;
}

const Home = () => {
  const navigate = useNavigate();

  const user = JSON.parse(sessionStorage.getItem('userData') || '{}');

  const [listAcc, setListAcc] = useState();


  const getListAccFromBE = async () => {
    const res = await getListAcc();
    setListAcc(res.data.accounts.filter((acc: any) => acc._id !== user._id));
  
  };
  

  useEffect(() => {
    getListAccFromBE();
  }, []);

  const confirm = async (_id: string) => {
    accDelete(_id);
    message.success('Delete Success');
  };

  const cancel = (e?: React.MouseEvent<HTMLElement>) => {
    message.error('Cancel Delete');
  };
  return (
    <ConfigProvider
      theme={{
        token: {
          colorBgBase: 'white',
          colorBgContainer: '',
          colorText: 'white',
          colorBorderSecondary: '#a61d24',
          borderRadius: 10,
          
        },
      }}
    >
      <div style ={{overflowX : "auto"}}>
     <FloatButton
      shape="circle"
      type="primary"
      onClick={() => navigate(`/account/createAcc`)}
      style={{width: '60px', height: '60px' , position : "absolute" , marginRight : 20  }}
      icon={<PlusOutlined />}
    />

      <Table dataSource={listAcc}>
    
        <Column title="Email" dataIndex="email" key="firstName" />
        <Column title="Phone" dataIndex="phone" key="age" />
        <Column title="Full Name" dataIndex="fullname" key="fullname"  />
        <Column
          title="Date of Birth"
          dataIndex="dob"
          key="dob"
          render={(text) => new Date(text).toLocaleDateString()}
        />
        <Column title="Address" dataIndex="address" key="address" />
        
        <Column
          title="Role"
          dataIndex="role"
          key="role"
          render={(role: string) => <Tag style={{ backgroundColor : "gray"  ,borderRadius: '10px'  ,padding: '5px 10px'}}> {role} </Tag>}
        />
         <Column
          title="Rank"
          dataIndex="rankID"
          key="rank"
  
        />
        <Column
          title="Action"
          key="action"
          render={(_: any, record: DataType) => (
            <Space size="middle">
              {/* <Button type="primary"  className="button"
                style={{backgroundColor : "black" , color : "whitesmoke"}}
                onClick={() => navigate(`/account/detail/${record._id}`)}
              >
                Details
              </Button> */}
              <Button type="primary"  className="button"
             style={{color : "whitesmoke" , backgroundColor : "black"}}
                onClick={() => navigate(`/update/${record._id}`)}
              >
                Update
              </Button>
              <RoleProtected allowedRole={[RoleName.ADMIN]}>
                <Popconfirm
                  title="Delete the task"
                  description="Are you sure to delete this task?"
                  onConfirm={() => confirm(record._id)}
                  onCancel={cancel}
                  okText="Yes"
                  cancelText="No"
                >
                  <Button  type="primary"  className="button" style={{color : "red" , backgroundColor : "black"}}>
                    Delete
                  </Button>
                </Popconfirm>
              </RoleProtected>
            </Space>
          )}
        />
      </Table>
      </div>
    </ConfigProvider>
  );
};

export default Home;
