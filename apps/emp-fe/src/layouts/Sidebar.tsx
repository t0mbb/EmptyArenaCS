import React from 'react';
import { ConfigProvider, Layout, Menu } from 'antd';
import { MenuInfo } from 'rc-menu/lib/interface';
import RoleProtected , {RoleName} from '../components/RoleProtected/RoleProtected';

const { Sider } = Layout;

interface SidebarProps {
    collapsed: boolean;
    items: MenuItem[];
    onClick: (info: MenuInfo) => void;
}

type MenuItem = {
    key: string;
    label: React.ReactNode;
    icon?: React.ReactNode;
    children?: MenuItem[];
};

export const Sidebar: React.FC<SidebarProps> = ({ collapsed, items, onClick }) => {
    const menuItem = (menuItems: MenuItem[]) => {
        return menuItems.map(item => {
                  if(item.key ==="/account"){
                  return(
                    <RoleProtected allowedRole={[RoleName.ADMIN]} {...item}>
                    <Menu.Item  >
                    {item.label}
                    </Menu.Item>
                    </RoleProtected>)}
                  else if (item.key === "/pooltable"){
                    return(
                        <RoleProtected allowedRole={[RoleName.ADMIN]} {...item}>
                        <Menu.Item  >
                        {item.label}
                        </Menu.Item>
                        </RoleProtected>)
                  }
                    else {
                        return (<Menu.Item key={item.key} title={item.label} icon={item.icon}>
                          {item.label}
                        </Menu.Item>)
                    }
            } 
        );
    };

    

    return ( 
        <Sider trigger={null} collapsible collapsed={collapsed} style={{backgroundColor: "#141414" }}>
            <div className="demo-logo-vertical" />
            <ConfigProvider theme={{ token: {  colorText: '#e84749' , colorBgContainer : "#fac8c3"}}} >   
            <Menu className =" menu-side-bar" mode="inline" defaultSelectedKeys={['1']} onClick={onClick}>
            {menuItem(items)}
            </Menu>
            </ConfigProvider>
        </Sider>
    );
};

export default Sidebar;
