import React, {Component} from 'react';
import { connect } from 'react-redux';
import fetchIngredients from '../../store/actions/recipe/fetchIngredients';
import IngredientsListContainer from './IngredientsListContainer';
import Spinner from '../layout/Spinner';

class IngredientsListPage extends Component {
    render() {
        const {ingredients} = this.props.state;
        return (
            <div className="main">
                <div className="container">
                    <h1 className="main__title">Ingredients</h1>
                    <div className="row">
                        <div className="main__recipes recipe col-md-12">
                            {ingredients.loading 
                                ? <Spinner />
                                : <IngredientsListContainer ingredients={ingredients.ingredients}></IngredientsListContainer>}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    componentDidMount = (e) => {
       this.props.fetchIngredients();
    }
}

const mapStateToProps = (state) => ({
    state
})

const mapDispatchToProps = {
    fetchIngredients  
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(IngredientsListPage)
