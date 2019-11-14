import React, {Component, Fragment} from 'react';
import { connect } from 'react-redux';
import fetchRecipes from '../../store/actions/recipe/fetchRecipes';

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
                    : recipes.map((recipe)=>(
                        <div key={recipe.id}>{recipe.title}</div>
                    ))}
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