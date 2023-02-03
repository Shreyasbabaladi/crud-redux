import React from 'react';
import { Container } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

// importing components 
import Eventes from './components/Eventes';
import EventForm from './components/EventForm';
import store from './store';

//redux
import { Provider } from 'react-redux';


function App() {

  return (
    <Provider store={store}>
      <Container fluid>
        <Eventes />
        <EventForm />
      </Container>
    </Provider>
  );
}

export default App;
