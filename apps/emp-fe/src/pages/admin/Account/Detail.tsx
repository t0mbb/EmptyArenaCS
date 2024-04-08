import React, { useState } from 'react';
import { useEffect } from 'react';
import {
  Space,
  Table,
  Tag,
  type FormProps,
  Button,
  ConfigProvider,
} from 'antd';
import { accDetails } from '../../../services/account.service';
import '../../../assets/css/table.css';
import { useParams } from 'react-router-dom';
const { Column } = Table;

const Detail = () => {
  let { id } = useParams();
  const [listAcc, setDetail] = useState();
  const getListAccFromBE = async () => {
    const res = await accDetails(id);
    setDetail(res.data.Result);
  };

  useEffect(() => {
    getListAccFromBE();
  }, []);

  if (!listAcc) {
    return <div>Loading...</div>;
  }

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
      <div className="Outlet">
        {' '}
        <Table dataSource={[listAcc]}>
          <Column title="Email" dataIndex="email" key="firstName" />
          <Column title="Phone" dataIndex="phone" key="age" />
          <Column title="Full Name" dataIndex="fullname" key="fullname" />
          <Column
          title="Role"
          dataIndex="role"
          key="role"
          render={(role: string) => <Tag style={{ backgroundColor : "#ff0000"  ,borderRadius: '10px'  ,padding: '5px 10px'}}> {role.toUpperCase()} </Tag>}
        />
          <Column title="Address" dataIndex="address" key="address" />
          <Column title="Date of Birth" dataIndex="dob" key="dob" render={(text) => new Date(text).toLocaleDateString()}/>
        </Table>

      </div>
    </ConfigProvider>
  );
};

export default Detail;
