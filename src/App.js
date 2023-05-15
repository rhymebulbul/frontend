
import DomainPage from './components/Page/Domain/DomainPage';
import FactorPage from './components/Page/Factor/FactorPage';
import Home from './components/Page/Home/Home';
import ReviewPage from './components/Page/Review/ReviewPage';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
  {path: '/', element: <Home/>},
  {path: '/review', element: <ReviewPage/>},
  {path: '/domain', element: <DomainPage/>},
  {path: '/factor', element: <FactorPage/>}
]);

function App() {
  return <RouterProvider router={router}/>;
}

export default App;