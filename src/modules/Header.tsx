import { Button } from "antd"
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons'
import { useContext } from "react";
import { Context } from "../context/GlobalContext";

const Header = () => {

  const { collapsed, setCollapsed } = useContext(Context);
   const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };
  return (
    <div >


       <Button type="primary" onClick={toggleCollapsed} style={{ marginBottom: 16 }}>
        {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </Button>


    </div>
  )
}

export default Header