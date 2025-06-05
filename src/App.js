// App.js
import './App.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { StudentProvider } from '../src/customHooks/StudentContext'; // Import the context provider
import Headerpart from './components/header';
import SideBar from './components/sidebar';
import StudentModule from '../src/components/student-module-component/student-module';
import StudentProfileRight from './components/student-profile-right/studentprofile-right';
import NavButtons from './components/student-module-component/nav-buttons';
import MainScreen from './components/payments-module-component/payments-screen';
import PaymentSidebar from './components/student-profile-right/payment-profile';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Create a QueryClient instance
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3,
      staleTime: 5 * 60 * 1000,
      gcTime: 10 * 60 * 1000,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <StudentProvider>
        <BrowserRouter>
          <Headerpart />
          <div className="main_body" id="body_main">
            <div className="side">
              <SideBar />
            </div>
            <div className="main">
              <div className="main_left_side">
                <NavButtons />
                <Routes>
                  <Route path="/student/*" element={<StudentModule />} />
                  <Route path="/*" element={<MainScreen />} />
                </Routes>
              </div>
              <div className="main_side_right">
                <Routes>
                  <Route path="/student/*" element={<StudentProfileRight />} />
                  <Route path="/payments/*" element={<PaymentSidebar />} />
                </Routes>
              </div>
            </div>
            </div>
          </BrowserRouter>
        </StudentProvider>
    </QueryClientProvider>
  );
}

export default App;