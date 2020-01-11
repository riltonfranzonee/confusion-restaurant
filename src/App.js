import React from 'react';
import logo from './logo.svg';
import {Navbar, NavbarBrand} from 'reactstrap'
import './App.css';
import { from } from 'rxjs';
import Menu from './components/MenuComponent'
import {DISHES} from './shared/dishes'
import { tsConstructorType } from '@babel/types';

export default class App extends React.Component {
state ={
  dishes: DISHES
}

render(){
  return (
    <div>
        <Navbar dark color='primary'>
            <div className="container">
                <NavbarBrand href='/'>Ristorante Con Fusion</NavbarBrand>
            </div>
        </Navbar>
        <Menu dishes={this.state.dishes}/>
    </div>
  )}
}

