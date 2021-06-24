import React, { FC } from 'react';
import { connect } from 'react-redux';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Switch, Route } from 'react-router';
import Login from '../auth/login';
import Dashboard from '../dashboard';

import 'antd/dist/antd.css';
import { IGlobalReducerState } from '../../store/base/interface/IGlobalReducerState';
import ShellHost from '../../components/shellHost';
import { COOKIENAME_DEVICEID } from '../../store/auth/Auth.constants';
import Cookies from 'universal-cookie/es6';

interface IApp {
  isAuthenticated: boolean;
}

const App: FC = () => {

  if (process.env.REACT_APP_AMBIENTE == 'PRODUCTION' && window.location.origin.indexOf('integracao.rbrltda.com.br') == -1) {
    window.location.href = 'https://integracao.rbrltda.com.br';
  }

  const cookies = new Cookies();
  var deviceId = cookies.get(COOKIENAME_DEVICEID)

  if (deviceId == undefined || deviceId == "") {
    var d = new Date();
    deviceId = d.getDate() + "" + d.getMonth() + "" + d.getFullYear() + "" + d.getHours() + "" + d.getMinutes() + "" + d.getSeconds();
    deviceId += "-" + Math.floor((Math.random()) * 0x10000)
    cookies.set(COOKIENAME_DEVICEID, deviceId, { path: '/' });
  }

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
      {true ?
        <ShellHost>
          <Switch>
            <Route path='/' component={Dashboard} />
          </Switch>
        </ShellHost>
        :
        <Switch>
          {/* <Route path='/login' component={Login} /> */}
          {/* <Route path='/' component={Login} /> */}
        </Switch>
      }
    </>
  );
}

// const mapStateProps = (state: IGlobalReducerState) => {
//   return {
//     isAuthenticated: isAuthenticatedSelector(state),
//   };
// };

// export default connect(mapStateProps)(App);

export default App;
