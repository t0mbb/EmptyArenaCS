import React, { useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';

import type { MenuProps } from 'antd';
import { Breadcrumb, Button, Layout, Menu, theme } from 'antd';
import { Outlet, useNavigate } from 'react-router-dom';
import '../assets/css/dash.css';
import ForwardTable from 'antd/es/table/Table';
const { Header, Sider, Content, Footer } = Layout;

const App: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const nav = useNavigate();

  const onClick = ({ key }: { key: string }) => {
    if (key === '/logout') {
      sessionStorage.removeItem('accessToken');
      sessionStorage.removeItem('userData');

      return nav('/login');
    }

    return nav(key);
  };
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          onClick={onClick}
          items={[
            {
              key: '/dashboard',
              icon: <UserOutlined />,
              label: 'nav 1',
            },
            {
              key: '/dashboard/update',
              icon: <VideoCameraOutlined />,
              label: 'Update',
            },
            {
              key: '/dashboard/123',
              icon: <UploadOutlined />,
              label: 'nav 3',
            },
            {
              key: '/logout',
              icon: <UploadOutlined />,
              label: 'logout',
            },
          ]}
        />
      </Sider>
      <Layout style={{}}>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
      <Footer></Footer>
    </Layout>
  );
};

export default App;
