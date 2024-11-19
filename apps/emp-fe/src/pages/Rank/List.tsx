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
 getListRank
} from '../../services/rank.service';

import { useNavigate } from 'react-router-dom';
import RoleProtected, {
  RoleName,
} from '../../components/RoleProtected/RoleProtected';
import '../../assets/css/table.css';
import BTNProtected from '../../components/RoleProtected/BTNProtected';
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
    const res = await getListRank();
    setListAcc(res.data.result);
  };

  useEffect(() => {
    getListFromBE();
  }, []);

  const confirm = async (_id: string) => {
      
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
          padding : 30
        },
      }}
    >
      <FloatButton
        shape="circle"
        type="primary"
        onClick={() => navigate(`/rank/create`)}
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
          title="Rank"
          dataIndex="name"
          key="name"
          sorter={(a : any, b : any) => a.name.localeCompare(b.name)} 
          defaultSortOrder="descend"
          render={(name: string) => {
            let tagColor = '';
            let textColor = '';
            if (name === 'bronze') {
              tagColor = '#CD7F32';
          
            } else if (name === '1') {
              tagColor = 'red';
        
            } else if (name === '2') {
              tagColor = 'cyan';
              textColor = 'black';
            } else if (name === 'cues') {
              tagColor = 'pink';
              textColor = 'black';
            } else if (name === 'A') {
              tagColor = '#facfd9';
              textColor = 'black';
            } else {
              tagColor = '#facfd9';
              textColor = 'black';
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
          title="Min elo"
          dataIndex="min_elo"
          
          sorter={(a : any, b : any) => a.min_elo - b.min_elo} 
          key="Min elo"
          render={(min_elo: string) => (
            <Tag
              style={{
                fontSize: 14,
                backgroundColor: '#494e51',
                borderRadius: '10px',
                padding: '5px 10px',
              }}
            >
              {`${min_elo}`}
            </Tag>
          )}
        />
        
        <Column
          title="Max elo"
          dataIndex="max_elo"
          key="Max elo"
          sorter={(a : any, b : any) => a.max_elo - b.max_elo}
          render={(max_elo: string) => (
            <Tag
              style={{
                fontSize: 14,
                backgroundColor: '#494e51',
                borderRadius: '10px',
                padding: '5px 10px',
              }}
            >
              {`${max_elo}`}
            </Tag>
          )}
        />
        <Column
          title="Action"
          key="action"
          render={(_: any, record: DataType) => (
            <Space size="middle">
              <BTNProtected allowedRole={[RoleName.ADMIN]}>
              <Button
                type="primary"
                className="button"
                style={{ color: 'whitesmoke', backgroundColor: 'black' }}
                onClick={() => navigate(`/rank/update/${record._id}`)}
                
              >
                Update
              </Button>
              </BTNProtected>
            </Space>
          )}
        />
      </Table>
    </ConfigProvider>
    
  );
};

export default Home;
