import React, { useState } from 'react';

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

import '../../assets/css/table.css';

import imageSrc from '../../assets/image/background3.jpg'
const Home = () => {

    const user = JSON.parse(sessionStorage.getItem('userData') || '{}');
    
  return (
    <div style={{ overflowX: 'auto' }}> 
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
     

    </ConfigProvider>
   </div>
  );
};

export default Home;
