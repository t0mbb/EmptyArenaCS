import React, { useState } from 'react';
import { useEffect } from 'react';
import { Space, Table, Tag, type FormProps, Button } from 'antd';
import { getListAcc } from '../../services/account.service';

import type { TableProps } from 'antd';

const { Column, ColumnGroup } = Table;


interface DataType {
  key: React.Key;
  firstName: string;
  lastName: string;
  age: number;
  address: string;
}
const Home = () => {

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
        <Button> <a>Details</a></Button>
       <Button> <a>Update {record.lastName}</a> </Button>
       <Button> <a>Delete</a></Button>
      </Space>
    )}
  />
</Table>;
};

export default Home;





