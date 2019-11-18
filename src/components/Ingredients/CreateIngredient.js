import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Link, Redirect} from "react-router-dom";
import addIngredient from "../../store/actions/recipe/addIngredient";

class CreateIngredient extends Component {
    initialState = {
        ingredient: {
            name: ''
        },
        hasNotify: false,
        uid: ''
    }
    state = this.initialState;
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.addIngredient(this.state.ingredient).then(this.showNotify);
    }
    handleChange = (e) => {
        e.preventDefault();
        this.setState({
            ...this.state,
            ingredient: {
                ...this.state.ingredient,
                [e.target.name]: e.target.value
            }
        })
    }
    showNotify = (ingredient) => {
        this.setState({
            uid: ingredient.uid,
            hasNotify: true
        })
    }
    render() {
        return (
            <div className="main">
                <div className="container">
                    <h1 className="main__title">Add new ingredient <small>or show <Link to="/ingredients">list</Link></small></h1>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="form">
                                <div className="form-group form__group">
                                    <label>Name</label>
                                    <input type="text" name="name" onChange={this.handleChange} className="form-control" value={this.state.ingredient.title}/>
                                </div>
                                {this.state.hasNotify && <Redirect to={`/ingredients/${this.state.uid}`} /> }
                                <button type="button" className="btn btn-primary" onClick={this.handleSubmit}>Add ingredient</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = {
    addIngredient
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CreateIngredient)