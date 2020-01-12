import React from 'react';
import Menu from './MenuComponent';
import Home from './HomeComponent'
import DishDetail from './DishDetailComponent';
import { DISHES } from '../shared/dishes';
import Header from './HeaderComponent'
import Footer from './FooterComponent'
import {Switch, Route, Redirect} from 'react-router-dom'

export default class Main extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        dishes: DISHES,
    };
  }

  onDishSelect(dishId) {
    this.setState({ selectedDish: dishId});
  }

  renderDish(dish){
    if(dish != null){
        return(
           <DishDetail dish={dish}/>
        )
    }else{
        return(
            <div></div>
        )
    }
}

  render() {
    const HomePage = () =>  {
        return(
            <Home/>
        )
    }

    return (
      <div>
         <Header/>
            <Switch>
                <Route path='/home' component={HomePage} />
                <Route exact path='/menu' component={() => <Menu dishes={this.state.dishes}/>}/>
                <Redirect to='/home'/>
            </Switch>
          <Footer/>
      </div>
    );
  }
}

