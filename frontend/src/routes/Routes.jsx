import { Switch, Route } from "react-router-dom";
import { Board } from "../Components/Board/Board";
import { Home } from "../Components/Home/Home";
import { Login } from "../Components/Login/Login";
import { Register } from "../Components/Register/Register";
import { PrivateRoutes } from "./PrivateRoute";
import { Navbar } from "../Components/Navbar/Navbar";

const Routes = () => {
  return (
    <Switch>
      <Route exact path='/register'>
        <Register />
      </Route>
      <Route exact path='/'>
        <Login />
      </Route>
      <PrivateRoutes
        path='/home'
        exact={true}
        component={
          <>
            <Navbar />
            <Home />
          </>
        }
      ></PrivateRoutes>
      <PrivateRoutes
        path='/board/:board_id'
        exact={true}
        component={
          <>
            <Navbar />
            <Board />
          </>
        }
      ></PrivateRoutes>
      <Route>
        <div>Page Not found</div>
      </Route>
    </Switch>
  );
};

export { Routes };
