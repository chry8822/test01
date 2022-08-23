import React from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '../../redux/store';
import App from './App'
import Modal from '../../container/modal/modal';

const Root: React.FC = () => {
    return(
        <>
            <Provider store={store}>
                <BrowserRouter>
                    <Routes>
                        <Route path='/' element={<App/>}>

                        </Route>
                    </Routes>
                    <Modal />
                </BrowserRouter>
            </Provider>
        </>
    )
}

export default Root;