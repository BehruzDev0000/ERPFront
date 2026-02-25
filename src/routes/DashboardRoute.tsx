import { Route, Routes } from "react-router-dom";
import { Path } from "../components";
import { Teachers, Home, Stacks, Groups, Students, Admins, Rooms, StacksMore, StacksCrud } from "../pages/Dashboard";
import Sitebar from "../modules/Sitebar";
import Header from "../modules/Header";
import { useContext } from "react";
import { Context } from "../context/GlobalContext";

const DashboardRoute = () => {
  const DashboardRouteList = [
    { id: 1, path: Path.home, element: <Home /> },
    { id: 2, path: Path.stacks, element: <Stacks /> },
    { id: 3, path: Path.stacksMore, element: <StacksMore /> },
    { id: 4, path: Path.stacksUpdate, element: <StacksCrud /> },
    { id: 5, path: Path.stacksCreate, element: <StacksCrud /> },
    { id: 6, path: Path.teachers, element: <Teachers /> },
    { id: 7, path: Path.groups, element: <Groups /> },
    { id: 8, path: Path.students, element: <Students /> },
    { id: 9, path: Path.admins, element: <Admins /> },
    { id: 10, path: Path.rooms, element: <Rooms /> },
  ];

  const { collapsed } = useContext(Context);

  return (
    <div className="flex w-full items-start h-screen overflow-hidden">
      <div 
        className={`transition-all duration-300 ease-in-out h-screen  bg-[#001529] ${
          collapsed ? "w-[83px]" : "w-[250px]"
        }`}
      >
        <Sitebar />
      </div>

      <div className="flex-1 transition-all duration-300 ease-in-out h-screen overflow-y-auto">
        <Header />
        
        <div className="p-5">
          <Routes>
            {DashboardRouteList.map((route) => (
              <Route key={route.id} path={route.path} element={route.element} />
            ))}
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default DashboardRoute;