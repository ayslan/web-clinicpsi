import React, { FC, useState } from 'react';
import styles from './Dashboard.module.scss';

const Dashboard: FC = (props) => {
    // const dispatch = useDispatch();
    // const [location, setLocation] = useState<string>('');
    // const [ipClient, setIPClient] = useState<string>('');

    // if (window.location.pathname != '/' && window.location.pathname != '/login') {
    //     history.push(`/login?redirectUrl=${window.location.pathname}`);
    // }

    // $(function () {

    //     $.getJSON('https://ipapi.co/json/')
    //         .then(function (data) {
    //             setIPClient(data.ip);
    //             setLocation(data.city + ", " + data.region);
    //         })
    //         .fail(function (e) {
    //             setIPClient("ERRO");
    //         });
    // });

    // const submit = (data: ILoginRequest) => {
    //     data.ipClient = ipClient;
    //     data.location = location;
    //     dispatch(AuthActions.userLogin(data));
    // };

    return (
        <>
           
        </>
    );
};

// const mapState = (state: IGlobalReducerState) => ({
//     ...state.auth,
// });


// const connector = connect(
//     mapState,
// );

// type Props = ConnectedProps<typeof connector>;

// export default connector(Dashboard);

export default Dashboard;