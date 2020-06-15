import React, { Fragment } from "react";
import Homepage from "./pages/Homepage";
import { ToastContainer } from 'react-toastify';

import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'

library.add(fas)

const App = () => {
    return (
        <Fragment>
            <ToastContainer />
            <Homepage />
        </Fragment>
    );
};

export default App;
