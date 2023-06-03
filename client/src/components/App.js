import { Route, Switch } from 'react-router-dom'
import About from './About';
import Login from './Login'
import Register from './Login/register';
function App() {
  return (
    <div className="App">
      <Switch>
        <Route path='/login' component={Login} />
        <Route path='/about' component={About} />
        <Route path='/register' component={Register} />
      </Switch>
    </div>
  );
}

export default App;
