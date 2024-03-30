import React, { useState } from 'react';
import { useEffect } from 'react';
import { Space, Table, Tag, type FormProps } from 'antd';
import { getListAcc } from '../../services/account.service';

const columns = [
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
  },
  {
    title: 'fullname',
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

  return <Table dataSource={listAcc} columns={columns}/>;
};

export default Home;
