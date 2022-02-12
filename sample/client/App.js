import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

const App = () => {
  return (
    <Router>
      <div className='container'>
        <Routes>
          <Route exact path='/' element={<h1>Hellow World!</h1>} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
