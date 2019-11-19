import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import fetchRecipes from '../../store/actions/recipe/fetchRecipes';
import fetchIngredients from '../../store/actions/recipe/fetchIngredients';
import RecipesContainer from './RecipesContainer';
import Spinner from '../layout/Spinner';
import Sidebar from '../layout/Sidebar';

class Dashboard extends Component {
    componentDidMount = () => {
        this.props.fetchRecipes();
        this.props.fetchIngredients();
    }
    render = () => {
        const {recipes: recipesObj, ingredients: ingredientsObj} = this.props.state;
        return (
            <div className="main">
                <div className="container">
                    <h1 className="main__title">Recipes</h1>
                    <div className="row">
                        <div className="main__recipes recipe col-md-8">
                            {recipesObj.loading 
                                ? <Spinner />
                                : <RecipesContainer recipes={recipesObj.recipes}></RecipesContainer>}
                        </div>
                        <div className="col-md-4">
                            <Sidebar>
                                <div className="list-group">
                                    <Link to="/recipes" className="list-group-item d-flex justify-content-between align-items-center list-group-item-action">
                                        All recipes
                                        <span className="badge badge-dark badge-pill">{recipesObj.recipes.length}</span>
                                    </Link>
                                    <Link to="/ingredients" className="list-group-item d-flex justify-content-between align-items-center list-group-item-action">
                                        Ingredients base
                                        <span className="badge badge-dark badge-pill">{ingredientsObj.ingredients.length}</span>
                                    </Link>
                                </div>
                            </Sidebar>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = {
    fetchRecipes,
    fetchIngredients
}

const mapStateToProps = (state) => ({
    state: {...state}
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Dashboard)