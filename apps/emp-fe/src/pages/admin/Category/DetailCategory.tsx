import React, { useState } from 'react';
import { useEffect } from 'react';
import {
  Space,
  Table,
  Tag,
  type FormProps,
  Button,
  ConfigProvider,
  FloatButton,
  Popconfirm,
  message,
} from 'antd';
import {
  getListProduct,
  deleteProduct,
} from '../../../services/product.service';
import { getListAcc } from '../../../services/account.service';
import '../../../assets/css/table.css';
import { useNavigate, useParams } from 'react-router-dom';
import { PlusOutlined } from '@ant-design/icons';
import RoleProtected, {
  RoleName,
} from '../../../components/RoleProtected/RoleProtected';
const { Column } = Table;
interface DataType {
  key: React.Key;
  firstName: string;
  email: string;
  age: number;
  address: string;
  _id: string;
}

const Detail = () => {
  const navigate = useNavigate();
  let { id } = useParams();
  const [listProduct, setList] = useState();
  const getListFromBE = async () => {
    const res = await getListProduct(id);
    console.log(res);
    setList(res.data.product);
  };

  const confirm = async (_id: string) => {
   const res = await deleteProduct(_id);
    message.info(res.data.message);
    await getListFromBE();
  };

  const cancel = (e?: React.MouseEvent<HTMLElement>) => {
    message.error('Cancel Delete');
  };

  useEffect(() => {
    getListFromBE();
  }, []);

  if (!listProduct) {
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
      <FloatButton
        shape="circle"
        type="primary"
        onClick={() => navigate(`/category/createProduct/${id}`)}
        style={{
          width: '60px',
          height: '60px',
          position: 'absolute',
          marginRight: 20,
        }}
        icon={<PlusOutlined />}
      />
      <Table dataSource={listProduct}>
        <Column
          title="Name"
          dataIndex="name"
          render={(name : string) => (
            <Tag
              style={{
                backgroundColor: 'green',
                borderRadius: '10px',
                padding: '5px 10px',
              }}
            > {name}</Tag>
          )}
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
          title="Quantity"
          dataIndex="quantity_in_stock"
          key="quantity_in_stock"
          render={(price: string) => (
            <Tag
              style={{
                fontSize: 13,
                backgroundColor: 'red',
                borderRadius: '10px',
                padding: '7px 14px',
              }}
            >
              {`${price}`}
            </Tag>
          )}
        />
        <Column
          title="Description"
          dataIndex="description"
          key="description"
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

export default Detail;
