import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import store from "./store/store.jsx";
import { Provider } from "react-redux";

// const router = createBrowerRouter(
//   createRoutesFromElement(
//     <Route path="/" element={<Layout />}>
//       <Route path="dashboard" element={<DashBoard />} />
//       <Route path="tasks" element={<Task />}/>
//       <Route path="completed" element={<Completed />}/>
//       <Route path="progressive" element={<Progressive />}/>
//       <Route path="todo" element={<Todo />} />
//     </Route>
//   )
// );

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
