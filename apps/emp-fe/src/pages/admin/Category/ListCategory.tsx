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
  getListCategory,
  deleteCategory,
} from '../../../services/product.service';

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
    const res = await getListCategory();
    console.log(res);
    setListAcc(res.data.category);
  };

  useEffect(() => {
    getListFromBE();
  }, []);

  const confirm = async (_id: string) => {
  
      const res = await deleteCategory(_id);
      console.log(res.data);
      message.info(res.data.message);
  
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
      <FloatButton
        shape="circle"
        type="primary"
        onClick={() => navigate(`/category/createCategory`)}
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
          title="Category"
          dataIndex="name"
          key="name"
          onCell={(record: DataType) => ({
            onClick: () => navigate(`/category/detailCategory/${record._id}`),
          })}
          render={(name: string) => {
            let tagColor = '';
            let textColor = '';
            if (name === 'bronze') {
              tagColor = '#CD7F32';
          
            } else if (name === 'food') {
              tagColor = 'red';
        
            } else if (name === 'drink') {
              tagColor = 'cyan';
              textColor = 'black';
            } else if (name === 'cues') {
              tagColor = 'pink';
              textColor = 'black';
            } else if (name === 'gloves') {
              tagColor = '#facfd9';
              textColor = 'black';
            } else {
              tagColor = 'black';
              textColor = 'white';
            }

            return (
              <Tag
                style={{
                  backgroundColor: tagColor,
                  borderRadius: '10px',
                  padding: '5px 10px',
                  color: textColor,
                }}
              >
                {name.toUpperCase()}
              </Tag>
            );
          }}
        />

        
        <Column
          title="Action"
          key="action"
          render={(_: any, record: DataType) => (
            <Space size="middle">
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
    </ConfigProvider>
  );
};

export default Home;
