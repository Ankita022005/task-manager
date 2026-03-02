import Dashboard from "./Dashboard";
import Auth from "./Auth";

function App() {
  const token = localStorage.getItem("token");

  return token ? <Dashboard /> : <Auth />;
}

export default App;