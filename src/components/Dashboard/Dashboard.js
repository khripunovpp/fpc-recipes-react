import React, {Component} from 'react';
import { connect } from 'react-redux';
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
        const {recipes: recipesObj, loading, ingredients: ingredientsObj} = this.props.state;
        return (
            <div className="main">
                <div className="container">
                    <h1 className="main__title">Recipes</h1>
                    <div className="row">
                        <div className="main__recipes recipe col-md-8">
                            {loading 
                                ? <Spinner />
                                : <RecipesContainer recipes={recipesObj.recipes}></RecipesContainer>}
                        </div>
                        <div className="col-md-4">
                            <Sidebar>
                                <ul className="list-group">
                                <li className="list-group-item d-flex justify-content-between align-items-center">
                                        All recipes
                                        <span className="badge badge-primary badge-pill">{recipesObj.recipes.length}</span>
                                    </li>
                                    <li className="list-group-item d-flex justify-content-between align-items-center">
                                        Ingredients base
                                        <span className="badge badge-primary badge-pill">{ingredientsObj.ingredients.length}</span>
                                    </li>
                                </ul>
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