import React from 'react';
import { Avatar, Button, ConfigProvider ,Menu , Dropdown, MenuProps } from 'antd';
import {  theme as antTheme } from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined  ,LogoutOutlined , UserOutlined , SettingOutlined , MailOutlined} from '@ant-design/icons';
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

  const menuProps: MenuProps = {
    items: [
      {
        key: 'profile',
        label: 'Profile',
        onClick: () => nav('/account'),
        icon: <MenuFoldOutlined/>
      },
      {
        key: 'settings',
        label: 'Settings',
        onClick: () => console.log('Go to Settings'),
        icon: <SettingOutlined/>
      },
    ],
  };
  return ( <ConfigProvider theme={{ token: {}}}>
    <header className='header'>
      <Button
          type="text"
          icon={<MailOutlined />}
          onClick={() => nav('/schedule')}
          style={{
            fontSize: '30px',
            width: 64,
            height: 64,
            position: 'absolute',
            inset : '10px 270px auto auto '
          }}
        />
    <Button
          type="text"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={toggleMenu}
          style={{
            fontSize: '30px',
            width: 64,
            height: 64,
          }}
        />
    <div
          style={{
            display: 'flex',
            alignItems: 'center',
            border: '2px solid rgba(255, 255, 255, 0.2)', 
            borderRadius: '8px',
            padding: '5px 10px',
            position: 'absolute',
            inset: '18px 90px auto auto', 
            fontSize : "13px"
          }}
        >
      <Dropdown menu={menuProps} trigger={['click']} placement="bottomRight" >
         <div >
          <Avatar
            src={avatar}
            size={42}
            icon={<UserOutlined />}
          />
          <span
            style={{
              marginLeft: '10px',
              color: "whitesmoke",
            }}
          >
            {user.fullname}
          </span>
         </div>
       </Dropdown>
        </div>
      <Button
        type="text"
        icon={<LogoutOutlined />}
        onClick={handleLogout}
        style={{
            fontSize: '30px',
            width: 64,
            height: 64,
            color : "red",
            position: "absolute", inset: "auto 12px auto auto",
            borderRadius : "40px"
          }}
        
      />
    </header>
    </ConfigProvider>
  );
};

export default Header;
