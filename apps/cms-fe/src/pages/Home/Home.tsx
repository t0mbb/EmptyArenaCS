import React, { useState } from 'react';
import { useEffect } from 'react';
import { Space, Table, Tag, type FormProps } from 'antd';
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
const columns = [
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
  },
  {
    title: 'RoleName',
    dataIndex: 'fullname',
    key: 'fullname',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  },
];

const Home = () => {

  const [listAcc, setListAcc] = useState();

  const getListAccFromBE = async () => {
    const res = await getListAcc();
    setListAcc(res.data.accounts);
  };

  useEffect(() => {
    getListAccFromBE();
  }, []);

  return   <Table dataSource={listAcc}>
  <Column title="Email" dataIndex="email" key="firstName" />
  <Column title="Phone" dataIndex="phone" key="age" />
  <Column title="Full Name" dataIndex="fullname" key="fullname" />
  {/* <Column
    title="Role" /// fix role 
    dataIndex="role_id"
    key="role_id"
    render={(role_id: string[]) => (
      <>
        {role_id.map((tag) => {
          let color = tag.length > 5 ? 'geekblue' : 'green';
          if (tag === 'loser') {
            color = 'volcano';
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </>
    )}
  /> */}
  <Column
    title="Action"
    key="action"
    render={(_: any, record: DataType) => (
      <Space size="middle">
        <a>Update {record.lastName}</a>
        <a>Delete</a>
      </Space>
    )}
  />
</Table>;
};

export default Home;





