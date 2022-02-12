import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import {io} from 'socket.io-client'

const App = () => {
  const socket = io('http://localhost:3000')

  socket.on('connect', () => console.log(socket.id))
  
  socket.on('transverse', (gql) => {

    console.log('GQL Object from server..', gql)
  
    
});
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
