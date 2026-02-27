import { Path } from "../components"
import {Login,AuthHome} from "../pages/Auth"
import { Route, Routes } from 'react-router-dom'

const AuthRoute = () => {
  const AuthRouteList=[
    {id:1,path:Path.home,element:<AuthHome/>},
    {id:2,path:Path.login,element:<Login/>},

]

  return (
    <Routes>
        {AuthRouteList.map((route)=>(<Route key={route.id} path={route.path} element={route.element} />))}
    </Routes>
  )
}

export default AuthRoute
