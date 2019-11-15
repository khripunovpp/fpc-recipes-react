import React, {Component} from 'react';
import { connect } from 'react-redux';
import fetchRecipes from '../../store/actions/recipe/fetchRecipes';
import RecipesContainer from './RecipesContainer';
import Spinner from '../layout/Spinner';
import Sidebar from '../layout/Sidebar';

class Dashboard extends Component {
    componentDidMount = () => {
        this.props.fetchRecipes();
    }
    render = () => {
        const {recipes, loading} = this.props.recipes;
        return (
            <div className="main">
                <div className="container">
                    <h1 className="main__title">Recipes</h1>
                    <div className="row">
                        <div className="main__recipes recipe col-md-8">
                            {loading 
                                ? <Spinner />
                                : <RecipesContainer recipes={recipes}></RecipesContainer>}
                        </div>
                        <div className="col-md-4">
                            <Sidebar>
                                <ul className="list-group">
                                    <li className="list-group-item d-flex justify-content-between align-items-center">
                                        All recipes
                                        <span className="badge badge-primary badge-pill">{recipes.length}</span>
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
    fetchRecipes
}

const mapStateToProps = (state) => ({
    recipes: state.recipes
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Dashboard)