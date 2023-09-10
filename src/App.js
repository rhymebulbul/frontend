import DomainAndFactorPage from './components/Page/DomainAndFactor/DomainAndFactorPage';
import Home from './components/Page/Home/Home';
import ReviewPage from './components/Page/Review/ReviewPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NarrativedPersonaPage from './components/Page/Persona/NarrativePersonaPage';
import DimensionPage from './components/Page/Dimension/DimensionPage';
import BulletPointPersonaPage from './components/Page/Persona/BulletPointPersonaPage';
import SignIn from './components/Page/SignIn/SignIn';
import SignUp from './components/Page/SignUp/SignUp'
import { AuthContext } from './shared/context/Auth-context';
import { useAuth } from './shared/hooks/auth-hook';

function App() {
  const { token, login, logout, userId } = useAuth();
  const isLoggedIn = !!token;  // Convert token to boolean to determine if user is logged in

  return (
    <AuthContext.Provider value={{ isLoggedIn, userId, token, login, logout }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/review" element={<ReviewPage />} />
          <Route path="/domainAndFactor" element={<DomainAndFactorPage />} />
          <Route path="/narrativePersona" element={<NarrativedPersonaPage />} />
          <Route path="/dimension" element={<DimensionPage />} />
          <Route path="/bulletPointPersona" element={<BulletPointPersonaPage />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
