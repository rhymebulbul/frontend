
import DomainAndFactorPage from './components/Page/DomainAndFactor/DomainAndFactorPage';
import Home from './components/Page/Home/Home';
import ReviewPage from './components/Page/Review/ReviewPage';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import NarrativedPersonaPage from './components/Page/Persona/NarrativePersonaPage';
import DimensionPage from './components/Page/Dimension/DimensionPage';
import BulletPointPersonaPage from './components/Page/Persona/BulletPointPersonaPage';
import SignInPage from './components/Page/Sign-In/SignIn';

const router = createBrowserRouter([
  { path: '/', element: <Home /> },
  { path: '/review', element: <ReviewPage /> },
  { path: '/domainAndFactor', element: <DomainAndFactorPage /> },
  { path: '/narrativePersona', element: <NarrativedPersonaPage  /> },
  { path: '/dimension', element: <DimensionPage /> },
  { path: '/bulletPointPersona', element: <BulletPointPersonaPage /> },
  { path: '/signin', element: <SignInPage /> },

]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;