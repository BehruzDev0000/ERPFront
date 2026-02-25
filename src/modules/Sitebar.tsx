import React, { useContext } from 'react';
import {
  HomeOutlined,
  UsergroupAddOutlined,
  UserOutlined,
  DatabaseOutlined,
  CrownOutlined,
  SafetyOutlined,
  LaptopOutlined
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import { Context } from '../context/GlobalContext';
import { Path } from '../components';
import { Link } from 'react-router-dom';

type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [
  { key: Path.stacks, icon: <DatabaseOutlined />, label: <Link to={Path.stacks}>Stacks</Link> },
  { key: Path.groups, icon: <UsergroupAddOutlined />, label: <Link to={Path.groups}>Groups</Link> },
  { key: Path.rooms, icon: <HomeOutlined />, label: <Link to={Path.rooms}>Rooms</Link> },
  { key: Path.teachers, icon: <CrownOutlined />, label: <Link to={Path.teachers}>Teachers</Link> },
  { key: Path.students, icon: <UserOutlined />, label: <Link to={Path.students}>Students</Link> },
  {
    key: Path.admins,
    icon: <SafetyOutlined />,
    label: <Link to={Path.admins}>Admins</Link>,
  }
];

const Sitebar: React.FC = () => {
  const { collapsed } = useContext(Context);

 

  return (
    <div >
     <div className={`flex items-center ${collapsed ? 'gap-0! justify-center! p-0' : 'gap-3!'} p-5 border-white border-b-[1px]`}>
      <LaptopOutlined className={`text-[40px]! text-white!`} />
      {collapsed ? null : <h3 className='text-white text-[20px]! font-bold'>Admin Panel</h3>}
     </div>
     <div className='mt-2'>
       <Menu className='h-screen text-[17px]!'
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        mode="inline"
        theme="dark"
        inlineCollapsed={collapsed}
        items={items}
      />
     </div>
    </div>
  );
};

export default Sitebar;
