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

import '../../../assets/css/table.css';

import imageSrc from '../../../assets/image/pool.jpg'
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
      <h1 style={{ display: "flex",
  justifyContent  : "center", color : "whitesmoke"}}>Welcome   {user.fullname} !!!!</h1>
      <img src={imageSrc} style={{width: '1000px',  
 marginLeft :"280px",
  marginTop:"35px",
          height: '650px',
          borderRadius: '25px', 
          boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)', }} alt="Description of the image" />
   

    </ConfigProvider>
   /</div>
  );
};

export default Home;
