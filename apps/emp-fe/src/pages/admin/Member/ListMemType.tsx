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
            if (name === 'bronze') {
              tagColor = '#CD7F32';
          
            } else if (name === 'silver') {
              tagColor = 'silver';
        
            } else if (name === 'gold') {
              tagColor = 'yellow';
              textColor = 'black';
            } else if (name === 'platinum') {
              tagColor = '#00FFFF';
              textColor = 'black';
            } else if (name === 'diamond') {
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
    </ConfigProvider>
  );
};

export default Home;
