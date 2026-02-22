import { useCookies } from "react-cookie";
import AuthRoute from "./routes/AuthRoute"
import DashboardRoute from "./routes/DashboardRoute";

function App() {
  const [cookies, , ] = useCookies(['token']);
  return cookies.token ? <DashboardRoute /> : <AuthRoute />;
}

export default App
