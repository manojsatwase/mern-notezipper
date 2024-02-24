import { createBrowserRouter,Outlet } from "react-router-dom";

import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import LandingPage from './pages/LandingPage/LandingPage';
import MyNotes from "./pages/MyNotes/MyNotes";

const AppLayout = () => {
  return (
   <>
    <Header/>
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
      path:"mynotes",
      element:<MyNotes/>
    }
  ]
},
])
