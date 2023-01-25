// REDUX
import { Provider } from "react-redux";
import store from "./redux/store";

// STYLES
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./sass/style.scss";

// ROUTES
import AppRoutes from "./Routes";

// ALERT
import { positions, transitions, Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import axios from "axios";

const options = {
  timeout: 5000,
  position: positions.BOTTOM_CENTER,
  transition: transitions.SCALE,
};

function App() {
  axios.defaults.baseURL = "http://localhost:8000/";

  return (
    <Provider store={store}>
      <AlertProvider template={AlertTemplate} {...options}>
        <AppRoutes />
      </AlertProvider>
    </Provider>
  );
}

export default App;
