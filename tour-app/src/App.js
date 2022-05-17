
import React, { useReducer, createContext } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './layout/header';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './components/home';
import Login from './components/login';
import myReducer from './reducers/UserReducer';
import Footer from './layout/footer';
import News from './components/news';
import Tour from './components/tour';
import Tourdetail from './components/tourdetail';
import Signup from './components/signup';

export const UserContext = createContext()

function App() {

  const [user, dispatch] = useReducer(myReducer)

  return (
    <BrowserRouter>
      <UserContext.Provider value={[user, dispatch]}>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/tours" element={<Tour />}></Route>
          <Route path="/news" element={<News />}></Route>
          <Route path="/tours/:tourId" element={<Tourdetail />} />
        </Routes>
        <Footer/>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
