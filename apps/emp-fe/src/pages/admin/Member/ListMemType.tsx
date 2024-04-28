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
import { PlusOutlined } from '@ant-design/icons';
import {
  getListMemberType,
  deleteMemberType,
} from '../../../services/membercard.service';


import gold from '../../../assets/image/gold.png';
import silver from '../../../assets/image/silver.png';
import platinum from '../../../assets/image/platinum.png';
import bronze from '../../../assets/image/bronze.png';
import diamond from '../../../assets/image/diamond.png';

import { useNavigate } from 'react-router-dom';
import RoleProtected, {
  RoleName,
} from '../../../components/RoleProtected/RoleProtected';
import '../../../assets/css/table.css';
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

  const [listTable, setListAcc] = useState();

  const getListFromBE = async () => {
    const res = await getListMemberType();
    console.log(res);
    setListAcc(res.data.memberType);
  };

  useEffect(() => {
    getListFromBE();
  }, []);

  const confirm = async (_id: string) => {
    try {
      await deleteMemberType(_id);
      message.success('Delete Success');
    } catch (error) {
      message.error('Error delete');
    }
  };

  const cancel = (e?: React.MouseEvent<HTMLElement>) => {
    message.error('Cancel Delete');
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
      <div style={{overflowX : 'auto' }}>
      <FloatButton
        shape="circle"
        type="primary"
        onClick={() => navigate(`/membership/createMemberType`)}
        style={{
          width: '60px',
          height: '60px',
          position: 'absolute',
          marginRight: 20,
        }}
        icon={<PlusOutlined />}
      />
          
      <Table dataSource={listTable}>
       
        <Column
          title="Membercard Type"
          dataIndex="name"
          key="name"
          onCell={(record: DataType) => ({
            onClick: () => navigate(`/membership/detailmemtype/${record._id}`),
          })}
          render={(name: string) => {
            let tagColor = '';
            let textColor = '';
            let imageSrc = '';
            if (name === 'bronze') {
              tagColor = '#CD7F32';
              imageSrc = bronze;
            } else if (name === 'silver') {
              tagColor = 'silver';
              imageSrc = silver;
            } else if (name === 'gold') {
              tagColor = 'yellow';
              imageSrc = gold;
            } else if (name === 'platinum') {
              tagColor = '#00FFFF';
              imageSrc = platinum;
            } else if (name === 'diamond') {
              tagColor = '#facfd9';
              imageSrc = diamond;
            } else {
              tagColor = 'black';
              textColor = 'white';
              imageSrc = diamond;
            }

            return (
              <div>
                 <img src={imageSrc} alt={name} style={{ width: 100, height: 75 , marginRight : 10}}/>
                 <Tag
                style={{
                  backgroundColor: tagColor,
                  borderRadius: '10px',
                  padding: '5px 10px',
                  color: textColor,
                }}
                onClick={() => navigate(`/membership/detailmemtype/${name}`)}
              >
                {name.toUpperCase()}
              </Tag>


              </div>
            );
          }}
        />

        <Column
          title="Price"
          dataIndex="price"
          key="price"
          render={(price: string) => (
            <Tag
              style={{
                fontSize: 14,
                backgroundColor: '#347d59',
                borderRadius: '10px',
                padding: '5px 10px',
              }}
            >
              {`${price} $`}
            </Tag>
          )}
        />

       
        <Column
          title="Durations"
          dataIndex="durations"
          key="durations"
          render={(duration: string) => (
            <Tag
              style={{
                fontSize: 14,
                backgroundColor: 'green',
                borderRadius: '10px',
                padding: '5px 10px',
              }}
            >
              {`${duration}`}
            </Tag>
          )}
        />
        <Column title="Description" dataIndex="description" key="description" />
        <Column
          title="Action"
          key="action"
          render={(_: any, record: DataType) => (
            <Space size="middle">
              <Button
                type="primary"
                className="button"
                style={{ color: 'whitesmoke', backgroundColor: 'black' }}
                onClick={() =>
                  navigate(`/membership/updatememType/${record._id}`)
                }
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
                  <Button
                    type="primary"
                    className="button"
                    style={{ color: 'red', backgroundColor: 'black' }}
                  >
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


