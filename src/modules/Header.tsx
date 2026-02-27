import { Button, Modal } from "antd"
import { MenuUnfoldOutlined, MenuFoldOutlined, LogoutOutlined } from '@ant-design/icons'
import { useContext, useState } from "react";
import { Context } from "../context/GlobalContext";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { Path } from "../components";
import toast from "react-hot-toast";

const Header = () => {
  const [LogOutModal, setLogOutModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const { collapsed, setCollapsed } = useContext(Context);
   const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };
  const [,, removeCookie] = useCookies(['token']);
  const navigate=useNavigate()

  const LogOut=()=>{
setLoading(true)
   setTimeout(()=>{
     removeCookie('token',{path: '/'});
     navigate(Path.login);
     setLoading(false)
     setLogOutModal(false)
     toast.success("Logged out successfully")
   },1000)

  }
  return (
    <div className="bg-[#001529] flex items-center justify-between px-7 py-5 sticky top-0 z-50">
       <Button size="large" onClick={toggleCollapsed} className="bg-[#001529]">
        {collapsed ? <MenuUnfoldOutlined className="bg-transparent"  /> : <MenuFoldOutlined className="bg-transparent" />}
      </Button>
    <Button type="primary" size="large" icon={<LogoutOutlined />} onClick={() => setLogOutModal(true)}>
      Log Out
    </Button>
<Modal title="Can you sure you want to log out?"  open={LogOutModal} confirmLoading={loading} onOk={LogOut} onCancel={() => setLogOutModal(false)}></Modal>
    </div>
  )
}

export default Header