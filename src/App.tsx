import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { LoginForm } from './components/auth/LoginForm';
import { SymptomForm } from './components/symptoms/SymptomForm';
import { FeedbackForm } from './components/feedback/FeedbackForm';
import { useEffect, useState } from 'react';
import { supabase } from './lib/supabase';

function App() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <Router>
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Routes>
          <Route
            path="/"
            element={
              session ? <Navigate to="/symptoms" /> : <LoginForm />
            }
          />
          <Route
            path="/symptoms"
            element={
              session ? <SymptomForm /> : <Navigate to="/" />
            }
          />
          <Route
            path="/feedback"
            element={
              session ? <FeedbackForm /> : <Navigate to="/" />
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;