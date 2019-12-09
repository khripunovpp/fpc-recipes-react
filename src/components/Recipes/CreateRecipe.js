import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from "react-router-dom";
import Select from 'react-select';
import { Helmet } from "react-helmet";
import makeAnimated from 'react-select/animated';
import IngredientWeight from './IngredientWeight';
import addRecipe from '../../store/actions/recipe/addRecipe';
import fetchIngredients from '../../store/actions/ingredients/fetchIngredients';
import addIngredient from "../../store/actions/ingredients/addIngredient";
import Popup from '../../components/layout/Popup';

const animatedComponents = makeAnimated();

const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
]

class CreateRecipe extends Component {
    initialState = {
        formData: {
            title: '',
            instruction: '',
            description: '',
            ingredients: []
        },
        choisedIngredients: [],
        hasNotify: false,
        uid: ''
    }
    state = this.initialState;
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.addRecipe(this.state.formData).then(this.showNotify);
    }
    handleChange = (e) => {
        e.preventDefault();
        this.setState({
            ...this.state,
            formData: {
                ...this.state.formData,
                [e.target.name]: e.target.value
            }
        })
    }
    handleWeightChange = (e) => {
        e.preventDefault();
        this.state.formData.ingredients.map((ingredient)=>{
            return (ingredient.value === e.target.name) && (ingredient.weight = e.target.value)
        })
    }
    handleChangeIngredients = (o, e) => {
        const {action} = e;

        switch(action) {
            case 'select-option':
                const {value, label} = e.option;
                this.setState({choisedIngredients: [...this.state.choisedIngredients, {value, label}]})
                break;
            case 'clear':
                this.setState({choisedIngredients: []})
                break;
            case 'remove-value':
                this.setState({choisedIngredients: this.state.choisedIngredients.filter((ingredient)=>{
                    return ingredient.value !== e.removedValue.value;
                })})
                break;
            default:
                return false;
        }
    }
    handleSubmitPopup = () => {
        console.log(this.state)
        this.setState({
            ...this.state,
            formData: {
                ...this.state.formData,
                ingredients: [...this.state.choisedIngredients]
            }
        })
    }
    handleCancelPopup = () => {
    
    }
    showNotify = (recipe) => {
        this.setState({
            uid: recipe.uid,
            hasNotify: true
        })
    }
    render() {
        const ingredients = this.state.formData.ingredients;
        return (
            <div className="main">
                <div className="container">
                    <h1 className="main__title">Add new recipe</h1>
                    <Helmet>
                        <title>Add new recipe</title>
                    </Helmet>
                    <div className="row">
                        <div className="col-md-12">
                            <Popup 
                                id="exampleModal" 
                                aria-labelledby="exampleModalLabel"
                                title="Choise ingredients"
                                onSubmit={this.handleSubmitPopup} 
                                onCancel={this.handleCancelPopup}>  
                                <Select 
                                    components={animatedComponents} 
                                    name="ingredients" 
                                    isMulti 
                                    cacheOptions
                                    options={options}
                                    value={this.state.choisedIngredients}
                                    onChange={this.handleChangeIngredients}/>
                            </Popup>
                            <div className="form">
                                <div className="form-group form__group">
                                    <label>Title</label>
                                    <input 
                                        type="text" 
                                        name="title" 
                                        onChange={this.handleChange} 
                                        className="form-control" 
                                        value={this.state.formData.title}/>
                                </div>
                                <div className="form-group form__group">
                                    <label>Description</label>
                                    <textarea 
                                        className="form-control" 
                                        name="description" 
                                        value={this.state.formData.description} 
                                        onChange={this.handleChange}></textarea>
                                </div>
                                <div className="form-group form__group">
                                    <label>Ingredients</label>
                                    {ingredients && ingredients.map((ingredient, index)=> {
                                        return <IngredientWeight key={index} ingredient={ingredient} onWeightChange={this.handleWeightChange}>{index+1}</IngredientWeight>
                                    })}
                                    <a href="#" className="form__link" data-toggle="modal" data-target="#exampleModal">+ Добавить ингредиент</a>
                                </div>
                                <div className="form-group form__group">
                                    <label>Instruction</label>
                                    <textarea 
                                        className="form-control" 
                                        name="instruction" 
                                        data-instruction-step="1"
                                        onChange={this.handleInstructionChange}>
                                    </textarea>
                                    <button 
                                        className="btn btn-lg btn-block btn-sm btn-outline-secondary mt-1"
                                        onClick={this.handleAddInstructon}>
                                        + Add next step
                                    </button>
                                </div>
                                {this.state.hasNotify && <Redirect to={`/recipes/${this.state.uid}`} /> }
                                <button 
                                    type="button" 
                                    className="btn btn-primary" 
                                    onClick={this.handleSubmit}>
                                    Add recipe
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = {
    addRecipe,
    fetchIngredients,
    addIngredient
}

export default connect(
    null,
    mapDispatchToProps
)(CreateRecipe)