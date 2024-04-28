import React from 'react';
import { Avatar, Button, ConfigProvider } from 'antd';
import {  theme as antTheme } from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined  ,LogoutOutlined , UserOutlined} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import '../assets/css/dash.css';
import avatar from '../assets/image/tooc.jpg';
interface HeaderProps {
  collapsed: boolean;
  toggleCollapsed: () => void;
}

export const Header: React.FC<HeaderProps> = ({ collapsed, toggleCollapsed }) => {
  const nav = useNavigate();

  const user = JSON.parse(sessionStorage.getItem('userData') || '{}');
  const toggleMenu = () => {
    toggleCollapsed();
  };
  const handleLogout = () => {
    sessionStorage.removeItem('accessToken');
    sessionStorage.removeItem('userData');
    nav('/login');
  };

  return ( <ConfigProvider theme={{ token: {colorBgContainer : "#",  colorBgBase :"#141414" , colorPrimary: '#e84749',borderRadius: 2}}}>
    <header className='header'   >
      <Button
        type="text"
        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        onClick={toggleMenu}
        style={{
            fontSize: '30px',
            width: 64,
            height: 64,
            color: 'red',
       
        }}
      />
   
      <Avatar src={avatar} size={42} icon={<UserOutlined />} style={{ position: "absolute", inset: "13px 80px auto auto" }} />
      <span style={{
            width: 42, color:"whitesmoke",
            height: 42, position: "absolute", inset: "27px 190px auto auto" }}>{user.fullname}</span>
   
      <Button
        type="text"
        icon={<LogoutOutlined />}
        onClick={handleLogout}
        style={{
            fontSize: '30px',
            width: 64,
            height: 64,
            color: 'red',
            position: "absolute", inset: "auto 15px auto auto"
          }}
        
      />
    </header>
    </ConfigProvider>
  );
};

export default Header;
