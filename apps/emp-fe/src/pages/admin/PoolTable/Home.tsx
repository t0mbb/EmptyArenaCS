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
  getListPoolTable,
  deletePoolTable,
} from '../../../services/pooltable.service';

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

  const getListAccFromBE = async () => {
    const res = await getListPoolTable();
    setListAcc(res.data.pool_Table);
  };

  useEffect(() => {
    getListAccFromBE();
  }, []);

  const confirm = async (_id: string) => {
    deletePoolTable(_id);
    message.success('Delete Success');
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
       <div style ={{overflowX : "auto"}}>
      <FloatButton
        shape="circle"
        type="primary"
        onClick={() => navigate(`/pooltable/createTable`)}
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
          title="Table Number"
          dataIndex="number"
          key="number"
          render={(number: string) => (
            <Tag
              style={{
                fontSize: 14,
                backgroundColor: 'grey',
                borderRadius: '10px',
              }}
            >
              {`No. ${number}`}
            </Tag>
          )}
        />
        <Column
          title="Brand of Table"
          dataIndex="brandname"
          key="brandname"
          render={(brandname: string) => (
            <Tag
              style={{
                fontSize: 14,
                backgroundColor: '#347d59',
                borderRadius: '10px',
                padding: '5px 10px',
              }}
            >
              {brandname.toUpperCase()}
            </Tag>
          )}
        />
        <Column
          title="Price Per Hours"
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
                {parseFloat(price).toLocaleString()} VNĐ
            </Tag>
          )}
        />

        <Column
          title="Status"
          dataIndex="status"
          key="status"
          render={(status: string) => {
            let tagColor = '';
            if (status === 'available') {
              tagColor = 'green';
            } else if (status === 'used') {
              tagColor = 'red';
            } else if (status === 'maintain') {
              tagColor = 'yellow';
            } else {
              tagColor = 'grey';
            }

            return (
              <Tag
                style={{
                  backgroundColor: tagColor,
                  borderRadius: '10px',
                  padding: '5px 10px',
                }}
              >
                {status.toUpperCase()}
              </Tag>
            );
          }}
        />

        <Column
          title="Action"
          key="action"
          render={(_: any, record: DataType) => (
            <Space size="middle">
              <Button
                type="primary"
                className="button"
                style={{ color: 'whitesmoke', backgroundColor: 'black' }}
                onClick={() => navigate(`/pooltable/update/${record._id}`)}
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
