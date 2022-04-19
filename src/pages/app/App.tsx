import React, { FC, useEffect, useState } from 'react';
import { connect, ConnectedProps, useDispatch } from 'react-redux';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Switch, Route } from 'react-router';
import Register from '../auth/register';
import Login from '../auth/login';
import Dashboard from '../dashboard';
import 'antd/dist/antd.css';
import { IGlobalReducerState } from '../../store/base/interface/IGlobalReducerState';
import ShellHost from '../../components/shellHost';
import Clients from '../clients';
import Calendar from '../calendar';
import ClientPanel from '../clientPanel';
import { isAuthenticatedSelector } from '../../store/auth/Auth.selector';
import { SystemActions } from '../../store/system/System.actions';
import Anamnesis from '../settings/anamnesis';
import AnamnesisForm from '../settings/anamnesis/form';

interface IApp {
  isAuthenticated: boolean;
}

const App: FC<Props> = ({ isAuthenticated, cities, countries }) => {
  var dispatch = useDispatch();
  const [isSystemDataLoaded, setSystemDataLoaded] = useState(false);

  useEffect(() => {
    if (!isSystemDataLoaded) {
      if (cities.length == 0)
        dispatch(SystemActions.listCities());

      if (countries.length == 0)
        dispatch(SystemActions.listCountries());

      if (cities.length > 0 && cities.length > 0) {
        setSystemDataLoaded(true);
      }
    }
  }, [cities, countries]);

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
      {
        isAuthenticated ?
          (!isSystemDataLoaded ?
            'carregando...'
            :
            <ShellHost>
              <Switch>
                <Route path='/' exact component={Dashboard} />
                <Route path='/clients' exact component={Clients} />
                <Route path='/clients/:clientId' exact component={ClientPanel} />
                <Route path='/calendar' exact component={Calendar} />
                <Route path='/settings/anamnesis' exact component={Anamnesis} />
                <Route path='/settings/anamnesis/form/:anamnesisId' exact component={AnamnesisForm} />
                <Route path='/settings/anamnesis/form' exact component={AnamnesisForm} />
              </Switch>
            </ShellHost>)
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

const mapState = (state: IGlobalReducerState) => ({
  ...state.system,
  isAuthenticated: isAuthenticatedSelector(state)
});

const connector = connect(
  mapState,
);

type PropsFromRedux = ConnectedProps<typeof connector>;
type Props = PropsFromRedux & IApp;

export default connector(App);
