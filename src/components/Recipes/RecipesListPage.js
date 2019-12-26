import React, {Component} from 'react';
import { connect } from 'react-redux';
import fetchRecipes from '../../store/actions/recipe/fetchRecipes';
import RecipesContainer from './RecipesListContainer';
import { Helmet } from 'react-helmet';
import { getRecipesDataFromState } from '../../store/selects';

class RecipesListPage extends Component {
    render = () => {
        const title = 'Recipes';
        return (
            <div className="main">
                <div className="container">
                    <h1 className="main__title">{title}</h1>
                    <Helmet>
                        <title>{title}</title>
                    </Helmet>
                    <div className="row">
                        <div className="main__recipes recipes col-md-12">
                            <RecipesContainer recipesData={this.props.recipes} />
                        </div>
                    </div>
                </div>
            </div>
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
    recipes: getRecipesDataFromState(state)
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RecipesListPage)