import React, { FC } from 'react';
import { connect } from 'react-redux';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Switch, Route } from 'react-router';
import Register from '../auth/register';
import Login from '../auth/login';
import Dashboard from '../dashboard';
import 'antd/dist/antd.css';
import { IGlobalReducerState } from '../../store/base/interface/IGlobalReducerState';
import ShellHost from '../../components/shellHost';
import { COOKIENAME_DEVICEID } from '../../store/auth/Auth.constants';
import Cookies from 'universal-cookie/es6';

import Clients from '../clients';
import ClientForm from '../clients/form';
import Calendar from '../calendar';
import { isAuthenticatedSelector } from '../../store/auth/Auth.selector';

interface IApp {
  isAuthenticated: boolean;
}

const App: FC<IApp> = ({ isAuthenticated }) => {

  return (
    <>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      {isAuthenticated ?
        <ShellHost>
          <Switch>
            <Route path='/' exact component={Dashboard} />
            <Route path='/clients' exact component={Clients} />
            <Route path='/clients/form' exact component={ClientForm} />
            <Route path='/calendar' exact component={Calendar} />
          </Switch>
        </ShellHost>
        :
        <Switch>
          <Route path='/register' component={Register} />
          <Route path='/login' component={Login} />
          <Route path='/' exact component={Login} />
        </Switch>
      }
    </>
  );
}

const mapStateProps = (state: IGlobalReducerState) => {
  return {
    isAuthenticated: isAuthenticatedSelector(state),
  };
};

export default connect(mapStateProps)(App);
