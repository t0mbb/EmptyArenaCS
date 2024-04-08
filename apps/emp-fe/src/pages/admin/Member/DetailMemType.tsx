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
  getListMemberCard,
  deleteMemberCard,
} from '../../../services/membercard.service';
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
  const [listMem, setList] = useState();
  const getListAccFromBE = async () => {
    const listMem = await getListMemberCard(id);
    console.log(listMem.data.membershipCardList);
    setList(listMem.data.membershipCardList);
  };

  const confirm = async (_id: string) => {
    deleteMemberCard(_id);
    message.success('Delete Success');
  };

  const cancel = (e?: React.MouseEvent<HTMLElement>) => {
    message.error('Cancel Delete');
  };

  useEffect(() => {
    getListAccFromBE();
  }, []);

  if (!listMem) {
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
        onClick={() => navigate(`/membership/createMemberCard/${id}`)}
        style={{
          width: '60px',
          height: '60px',
          position: 'absolute',
          marginRight: 20,
        }}
        icon={<PlusOutlined />}
      />
      <Table dataSource={listMem}>
        <Column
          title="Account"
          dataIndex="account_id"
          key="account_id"
          render={(name: DataType) => name.email}
        />
        <Column
          title="Start Date"
          dataIndex="start_date"
          key="start_date"
          render={(text) => (
            <Tag
              style={{
                backgroundColor: 'green',
                borderRadius: '10px',
                padding: '5px 10px',
              }}
            >
              {new Date(text).toLocaleDateString()}
            </Tag>
          )}
        />
        <Column
          title="End Date"
          dataIndex="end_date"
          key="end_date"
          render={(text) => (
            <Tag
              style={{
                backgroundColor: 'green',
                borderRadius: '10px',
                padding: '5px 10px',
              }}
            >
              {' '}
              {new Date(text).toLocaleDateString()}
            </Tag>
          )}
        />
        <Column
          title="|Active status|"
          dataIndex="active"
          key="active"
          render={(active: boolean) => {
            let tagColor = '';
            let status = '';
            if (active) {
              tagColor = 'green';
              status = 'ACTIVE';
            } else {
              tagColor = 'red';
              status = 'DEACTIVE';
            }
            return (
              <Tag
                style={{
                  backgroundColor: tagColor,
                  borderRadius: '10px',
                  padding: '5px 10px',
                }}
              >
                {status}
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
                onClick={() => navigate(`/membership/updatememCard/${record._id}`)}
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

export default Detail;
