import React, { Component } from 'react';
import NavBar from './components/Navbar/NavBar';
import Dashboard from './components/Dashboard/Dashboard';
import CreateRecipe from './components/Recipes/CreateRecipe';
import CreateIngredient from './components/Ingredients/CreateIngredient';
import RecipePage from './components/Recipes/RecipePage';
import IngredientsListPage from './components/Ingredients/IngredientsListPage';
import IngredientsPage from './components/Ingredients/IngredientsPage';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";


class App extends Component {
  render() {
    return (
      <div className="app">
        <Router>
          <NavBar />
          <Switch>
            <Route path="/" exact component={Dashboard}/>
            <Route path="/create/recipe" component={CreateRecipe}/>
            <Route path="/create/ingredient" component={CreateIngredient}/>
            <Route path="/recipes/:uid" component={RecipePage}/>
            <Route path="/ingredients" exact component={IngredientsListPage}/>
            <Route path="/ingredients/:uid" component={IngredientsPage}/>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
