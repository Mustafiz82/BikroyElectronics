import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Nav from '../Shared/Nav';
import Footer from '../Shared/Footer';
import { onAuthStateChanged } from 'firebase/auth';
import auth from '../../firebase.config';
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/features/user/userSlice';

const MainLayout = () => {

    const dispatch = useDispatch()
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                dispatch(setUser({
                    name: user?.displayName,
                    email: user?.email,
                    isInitializing: true,
                }))
            }
            else {
                console.log("user singed out")
                dispatch(setUser({
                    isInitializing: false,
                }))
            }
        })
    }, []);

    return (
        <div>
            <Nav></Nav>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default MainLayout;