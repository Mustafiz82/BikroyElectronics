import React, { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import Nav from '../Shared/Nav';
import Footer from '../Shared/Footer';
import { onAuthStateChanged } from 'firebase/auth';
import auth from '../../firebase.config';
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/features/user/userSlice';
import { Toaster } from 'react-hot-toast';
import TopNav from '../Shared/NavForMobile/TopNav';
import BottomNav from '../Shared/NavForMobile/BottomNav';
import BottomNav3 from '../Shared/NavForMobile/BottomNav3';

const MainLayout = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {pathname} = useLocation()
    const pathname2 = pathname.split("/")
  
    console.log(pathname2[1])

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
                // navigate('/')
            }
        })
    }, []);

    return (
        <div className=''>
            <div className='hidden lg:block'> <Nav></Nav></div>
            <div className={`${pathname2[1] == "Dashboard" ? "hidden" : "sticky lg:hidden z-[999] bg-white top-0 p-2"}`} > <TopNav></TopNav></div>
            <Outlet></Outlet>
            <Footer></Footer>
            <div className='fixed flex  w-full   bottom-0 z-[999]'>
                {/* <BottomNav></BottomNav> */}
                <div className='bg-primary w-5  flex-1'></div>
                <div><BottomNav3></BottomNav3></div>
                <div className='bg-primary  w-5 flex-1 '></div>
            </div>
            <Toaster
                position="top-center"
                reverseOrder={false}
            />
        </div>
    );
};

export default MainLayout;