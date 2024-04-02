import React, { useState } from 'react';
import { useEffect } from 'react';
import { Space, Table, Tag, type FormProps, Button } from 'antd';
import { getListAcc } from '../../services/account.service';

import type { TableProps } from 'antd';
import { useNavigate } from 'react-router-dom';
import RoleProtected, { RoleName } from '../../components/RoleProtected/RoleProtected';

const { Column, ColumnGroup } = Table;


interface DataType {
  key: React.Key;
  firstName: string;
  lastName: string;
  age: number;
  address: string;
  _id: string;
}

const Home = () => {
  const navigate = useNavigate();
  const [listAcc, setListAcc] = useState();

  const getListAccFromBE = async () => {
    const res = await getListAcc();
    setListAcc(res.data.accounts);
  };

  useEffect(() => {
    getListAccFromBE();
  }, []);

  return <Table dataSource={listAcc}>
    
  <Column title="Email" dataIndex="email" key="firstName" />
  <Column title="Phone" dataIndex="phone" key="age" />
  <Column title="Full Name" dataIndex="fullname" key="fullname" />
  <Column
    title="Action"
    key="action"
    render={(_: any, record: DataType) => (
      <Space size="middle">
        <Button onClick={() => navigate('/')}>Details</Button>
        <Button onClick={() => navigate(`/Dashboard/Update/${record._id}`)}>Update</Button>
        <RoleProtected allowedRole={[RoleName.ADMIN]}>
          <Button onClick={() => navigate('/')}>Delete</Button>
        </RoleProtected>
      </Space>
    )}
  />
</Table>;
};

export default Home;





