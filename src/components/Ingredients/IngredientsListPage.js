import React, {Component} from 'react';
import { connect } from 'react-redux';
import fetchIngredients from '../../store/actions/recipe/fetchIngredients';
import IngredientsContainer from './IngredientsContainer';
import Spinner from '../layout/Spinner';
import { Helmet } from "react-helmet";

class IngredientsListPage extends Component {
    render() {
        const {ingredients} = this.props.state;
        return (
            <div className="main">
                <div className="container">
                    <h1 className="main__title">Ingredients</h1>
                    <Helmet>
                        <title>Ingredients</title>
                    </Helmet>
                    <div className="row">
                        <div className="main__recipes recipe col-md-12">
                            <IngredientsContainer ingredients={ingredients}></IngredientsContainer>
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
