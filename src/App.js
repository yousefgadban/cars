import './App.css';
import { BrowserRouter, Route } from "react-router-dom";
import {Home} from './home/Home'
import {Header} from './Header/header'
import { Employees } from './employees/Employees';
import { Cars } from './cars/Cars';
import { NewCar } from './cars/NewCar';

function App() {
  return (
    <div >   
        <BrowserRouter>
            <div>
                <Header /> 
                <Route path="/" exact component={Home} />
                <Route path="/employees" exact component={Employees} />
                <Route path="/cars" exact component={Cars} />
                <Route path="/newCar" exact component={NewCar} />
            </div>
        </BrowserRouter>
    </div>
);
}

export default App;
