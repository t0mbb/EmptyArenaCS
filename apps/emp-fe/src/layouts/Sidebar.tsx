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
    const checkChildren = (menuItems: MenuItem[]): React.ReactNode[] => {
        return menuItems.map(item => {
            if (item.children) {
                  if(item.key === "/Faculty")
                  return(
                    <RoleProtected allowedRole={[RoleName.ADMIN]} >
                    <Menu.SubMenu key={item.key} title={item.label} icon={item.icon}>
                        {checkChildren(item.children)}
                    </Menu.SubMenu>
                    </RoleProtected>)
                    else {
                        return (<Menu.SubMenu key={item.key} title={item.label} icon={item.icon}>
                            {checkChildren(item.children)}
                        </Menu.SubMenu>)
                    }
            } else {
                return (
                    <Menu.Item key={item.key} icon={item.icon}>
                        {item.label}
                    </Menu.Item>
                );
            }
        });
    };

    

    return ( 
        <Sider trigger={null} collapsible collapsed={collapsed} style={{backgroundColor: "#141414" }}>
            <div className="demo-logo-vertical" />
            <ConfigProvider theme={{ token: {  colorText: '#e84749' , colorBgContainer : "#fac8c3"}}} >   
            <Menu className =" menu-side-bar" mode="inline" defaultSelectedKeys={['1']} onClick={onClick}>
                {checkChildren(items)}
            </Menu>
            </ConfigProvider>
        </Sider>
    );
};

export default Sidebar;
