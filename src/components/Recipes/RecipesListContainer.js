import React, { Component } from 'react';
import RecipesList from "./RecipesList";
import { connect } from 'react-redux';
import Spinner from '../Others/Spinner';
import fetchRecipes from '../../store/actions/recipe/fetchRecipes';

class RecipesListContainer extends Component {
    state = {
        loading: true
    }
    render = () => {
        return (
            this.props.data.loading 
                ? <Spinner />
                : <RecipesList recipes={this.props.data.recipes}></RecipesList>
        )
    }
    componentDidMount = () => {
        this.props.fetchRecipes();
    }
}
const mapDispatchToProps = {
    fetchRecipes
}

const mapStateToProps = (state) => ({
    data: {...state.recipes}
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RecipesListContainer)