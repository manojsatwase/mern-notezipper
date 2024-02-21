import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import LandingPage from './pages/LandingPage/LandingPage';

const App = () => {
  return (
   <>
    <Header/>
     <main>
        <LandingPage/>
     </main>
    <Footer/>
   </>
  )
}

export default App;