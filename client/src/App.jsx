import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createGlobalStyle } from 'styled-components';
import { selectTheme } from './features/theme/themeSlice';
import theme from './theme';
import { setWindowSize } from './features/window/windowSlice';
import { loadNumCards, loadFavoriteCards, loadMyCards } from './features/cards/cardsSlice';
import { selectUser } from './features/user/userSlice';
import useAutoLogin from './hooks/useAutoLogin';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Home from './pages/Home';
import About from './pages/About';
import FavoriteCards from './pages/FavoriteCards';
import MyCards from './pages/MyCards';
import ManageCards from './pages/ManageCards';
import EditCard from './pages/EditCard';
import NewCard from './pages/NewCard';
import Login from './pages/Login';
import Register from './pages/Register';
import Business from './pages/Business';
import ManageUsers from './pages/ManageUsers';
import Toast from './components/Toast/Toast';
import Profile from './pages/Profile';
import EditProfile from './pages/EditProfile';
import Search from './pages/Search';

const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${({ theme }) => theme.background.primary};
    color: ${({ theme }) => theme.text.primary};
    transition: all 0.25s linear;
  }
`;

function App() {
  const dispatch = useDispatch();
  const activeTheme = useSelector(selectTheme);
  const user = useSelector(selectUser);
  useAutoLogin();
  useEffect(() => {
    const handleResize = () => {
      dispatch(setWindowSize({ width: window.innerWidth, height: window.innerHeight }));
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  useEffect(() => {
    if (user) {
      dispatch(loadFavoriteCards());
    }
  }, [user]);
  return (
    <ThemeProvider theme={theme[activeTheme]}>
      <GlobalStyle />
      <Router>
        <div className="App">
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/About" element={<About />} />
              <Route path="/FavoriteCards" element={<FavoriteCards />} />
              <Route path="/MyCards" element={<MyCards />} />
              <Route path="/ManageCards" element={<ManageCards />} />
              <Route path="/EditCard/:id" element={<EditCard />} />
              <Route path="/NewCard" element={<NewCard />} />
              <Route path="/Login" element={<Login />} />
              <Route path="/Register" element={<Register />} />
              <Route path="/Business/:id" element={<Business />} />
              <Route path="/ManageUsers" element={<ManageUsers />} />
              <Route path="/Profile" element={<Profile />} />
              <Route path="/EditProfile" element={<EditProfile />} />
              <Route path="/Search" element={<Search />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
      <Toast />
    </ThemeProvider>
  );
}

export default App;
