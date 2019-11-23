import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import fetchRecipes from '../../store/actions/recipe/fetchRecipes';
import fetchIngredients from '../../store/actions/ingredients/fetchIngredients';
import RecipesContainer from '../Recipes/RecipesListContainer';
import Sidebar from '../layout/Sidebar';

class Dashboard extends Component {
    componentDidMount = () => {
        this.props.fetchRecipes();
        this.props.fetchIngredients();
    }
    render = () => {
        const {recipesData, ingredientsData} = this.props.state;
        return (
            <div className="main">
                <Helmet>
                    <title>Dashboard</title>
                </Helmet>
                <div className="container">
                    <h1 className="main__title">Recipes</h1>
                    <div className="row">
                        <div className="main__recipes recipes col-md-8">
                            <RecipesContainer recipesData={recipesData}></RecipesContainer>
                        </div>
                        <div className="col-md-4">
                            <Sidebar>
                                <div className="list-group">
                                    <Link to="/recipes" className="list-group-item d-flex justify-content-between align-items-center list-group-item-action">
                                        All recipes
                                        <span className="badge badge-dark badge-pill">{recipesData.recipes.length}</span>
                                    </Link>
                                    <Link to="/ingredients" className="list-group-item d-flex justify-content-between align-items-center list-group-item-action">
                                        Ingredients base
                                        <span className="badge badge-dark badge-pill">{ingredientsData.ingredients.length}</span>
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
    state: {
        recipesData: {...state.recipes},
        ingredientsData: {...state.ingredients}
    }
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Dashboard)