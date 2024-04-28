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
  Divider,
  Modal,
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
import tablepool from '../../../assets/image/table_pool.png';
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

  const [listTable, setList] = useState([]);
  console.log(listTable);
  const getListTableFromBE = async () => {
    const res = await getListPoolTable();

    setList(res.data.pool_Table);
  };

  useEffect(() => {
    getListTableFromBE();
  }, []);

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
      <div style={{}}>
        {listTable.map((table: any) => (
          <Button
            style={{
              flex: '1',
              border: 'none',
              padding: 0,
              marginBottom: 200,
              background: 'none',
            }}
            key={table._id}
            onClick={() => navigate(`/order/${table._id}`)}
          >
            <img
              src={tablepool}
              style={{}}
              alt={`Table ${table._id}`}
              width={200}
            />
            <div style={{ marginTop: '10px', color: 'white' }}>
              Table {table.number}
            </div>

            <Tag
              style={{
                marginLeft: '10px',
                marginTop: '10px',
                color: 'white',
                fontSize : 10,
                backgroundColor:
                  table.status === 'available'
                    ? 'green'
                    : table.status === 'maintained'
                    ? 'gray'
                    : 'red',
              }}
            >
              {table.status}
            </Tag>
          </Button>
        ))}
      </div>
    </ConfigProvider>
  );
};

export default Home;
