import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Sign from './sign';
import Signup from './signup';
import Welcome from './welcome';


function App() {
  return (
    <BrowserRouter>
      <Switch>
          <Route exact path='/' component={Sign} />
          <Route exact path='/signup' component={Signup} />
          <Route exact path='/welcome' component={Welcome} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
