import React, { useState } from 'react';
import { useEffect } from 'react';
import {

  Modal,
  ConfigProvider,
 Card,
  message,
  FloatButton,
  TreeSelect,
  Form,
  Menu
} from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import {
 getListRank
} from '../../services/rank.service';

import { useNavigate } from 'react-router-dom';
import { TreeNode } from 'antd/es/tree-select';
import '../../assets/css/table.css';
import { getListOppo } from '../../services/match/match.service';


interface DataType {
  key: React.Key;
  firstName: string;
  age: number;
  address: string;
  _id: string;
}

const Home = () => {
  const navigate = useNavigate();

  const [listAcc, setListAcc] = useState<any[]>([]);
  const [selectedAcc, setSelectedAcc] = useState<any>(null);

  const user = JSON.parse(sessionStorage.getItem('userData') || '{}'); 
  const id = user._id;
  const getListFromBE = async () => {

      const res = await getListOppo(id);
      setListAcc(res.data.listOppo.filter((acc: any) => acc._id !== user._id));
  };


  useEffect(() => {
    getListFromBE();
  }, []);
  const [isModalItemOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setSelectedAcc(null);
  };

  const handleSelect = (value: any) => {
    const account = listAcc.find(acc => acc._id === value);
    setSelectedAcc(account); 
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
      <FloatButton
        shape="circle"
        type="primary"
        onClick={showModal}
        style={{
          width: '60px',
          height: '60px',
          position: 'absolute',
          top: '30%',
          left: '35%',
          transform: 'translate(-50%, -50%)',
        }}
        icon={<SearchOutlined />}
      />
      <Modal 
        open={isModalItemOpen} onCancel={handleCancel} okButtonProps={{style: { display: "none" }}}
        cancelButtonProps={{style : { display : "none"}}}
       >
        <Form>
         <div style={{ display: 'flex' }}>
         
          <div style={{ flex: 1 }}>
            <TreeSelect 
              className='dropaccount' 
              onSelect={handleSelect}
              style={{ width: '100%' }}
            >
              {listAcc.map((acc) => (
                <TreeSelect.TreeNode
                  key={acc._id}
                  title={acc.fullname}
                  value={acc._id}
                />
              ))}
            </TreeSelect>
          </div>

          <div style={{ flex: 1, marginLeft: '20px' }}>
  {selectedAcc ? (
    <Card 
      title={selectedAcc.fullname} 
      style={{ 
        background: "transparent", 
        borderRadius: '30px',
        color: 'white',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
      }}
    >
      <p>Email: {selectedAcc.email}</p>
      <p>Phone: {selectedAcc.phone}</p>
      <p>Address: {selectedAcc.address}</p>
      <p>Gender: {selectedAcc.gender}</p>
    </Card>
  ) : (
    <Card 
      style={{ 
        background: "transparent", 
        borderRadius: '30px', 
        color: 'white',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
      }}
    >
      <p>Select an account to view details</p>
    </Card>
  )}
</div>
        </div>
        </Form>
      </Modal>
     
    
    </ConfigProvider>
    
  );
};

export default Home;
