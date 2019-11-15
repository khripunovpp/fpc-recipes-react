import React, {Component, Fragment} from 'react';
import { connect } from 'react-redux';
import fetchRecipes from '../../store/actions/recipe/fetchRecipes';
import RecipesContainer from '../Recipes/RecipesContainer';

class Dashboard extends Component {
    componentDidMount = () => {
        this.props.fetchRecipes();
    }
    render = () => {
        const {recipes, loading} = this.props.recipes;
        return (
            <Fragment>
                {loading 
                    ? <p>Loading...</p>
                    : <RecipesContainer recipes={recipes}></RecipesContainer>}
            </Fragment>
        )
    }
}

const mapDispatchToProps = {
    fetchRecipes
}

const mapStateToProps = (state) => ({
    recipes: state.recipes
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Dashboard)