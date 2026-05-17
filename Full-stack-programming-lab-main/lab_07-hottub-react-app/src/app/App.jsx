/*
  HOTSPRING Lab 07 React Conversion
  Team credits:
  - M Ehtisham Amjad (231996): app shell, routing strategy, architecture
  - M Abdullah Fawad (232052): UI components and styling polish
  - Aman Mir (233002): form behavior and state integration
*/
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AppRouter from './AppRouter';
import MainLayout from '../components/layout/MainLayout';

function App() {
  return (
    <BrowserRouter>
      <MainLayout>
        <AppRouter />
      </MainLayout>
      <ToastContainer
        position="top-right"
        autoClose={2800}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        theme="light"
      />
    </BrowserRouter>
  );
}

export default App;
