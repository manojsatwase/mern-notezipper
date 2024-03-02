import { createBrowserRouter,Outlet, useNavigate } from "react-router-dom";
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import LandingPage from './pages/LandingPage/LandingPage';
import MyNotes from "./pages/MyNotes/MyNotes";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import CreateNote from "./pages/CreateNote/CreateNote";
import SingleNote from "./pages/UpdatedNote/SingleNote";
import { useEffect, useState } from "react";
import ProfilePage from "./pages/ProfilePage/ProfilePage";

const AppLayout = () => {
  const navigate = useNavigate();
  const userInfo = JSON.parse(localStorage.getItem("userInfo"))
  useEffect(() => {
    if (!userInfo) {
      navigate("/");
    }
  }, [userInfo, navigate]);
  return (
   <>
    <Header />
     <main>
     <Outlet />
     </main>
    <Footer/>
    </>
  )
}

export const AppRouter = createBrowserRouter([{
  path: "/",
  element:<AppLayout />,
  children:[
    {
      path:"/",
      element:<LandingPage/>
    },{
      path:"login",
      element:<LoginPage/>
    },{
      path:"register",
      element:<RegisterPage/>
    },{
      path:"mynotes/createnote",
      element:<CreateNote/>
    },{
      path:"mynotes",
      element:<MyNotes/>
    },{
      path:"/notes/:id",
      element:<SingleNote />
    },
    {
      path:"/myprofile",
      element:<ProfilePage/>
    }
  ]
},
])
