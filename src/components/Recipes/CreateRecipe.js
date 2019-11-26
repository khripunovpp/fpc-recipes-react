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

const animatedComponents = makeAnimated();

class CreateRecipe extends Component {
    state = {
        formData: {
            title: '',
            instruction: {},
            description: '',
            ingredients: []
        },
        ingredientInputValue: '',
        loadedIngredients: [],
        hasNotify: false,
        uid: ''
    }
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
    handleInstructionChange = (e) => {
        e.preventDefault();
        const instructionStep = e.target.dataset.instructionStep;
    }
    handleWeightChange = (e) => {
        e.preventDefault();
        this.state.formData.ingredients.map((ingredient)=>{
            return (ingredient.value === e.target.name) && (ingredient.weight = e.target.value)
        })
    }
    handleChangeIngredients = (o, e) => {
        const {action, name} = e;

        switch(action) {
            case 'select-option':
                this.setState({...this.state.formData.ingredients.push({...e.option})})
                break;
            case 'remove-value':
                const {value: removedValue} = e.removedValue;
                this.setState((state) => {
                    let tState = {
                        ...state
                    };
                    tState.formData[name] = tState.formData[name].filter((ingredient)=>{
                        return ingredient.value !== removedValue;
                    })
                    return tState;
                })
                break;
            default:
                return false;
        }
    }
    handleCreateOption = (newIngredient) => {
        this.props.addIngredient({name: newIngredient}).then((uid) => {
            this.setState({...this.state.formData.ingredients.push({value: uid, label: newIngredient})})
        });
    }
    handleIngredientTyping = (newValue) => this.setState({ ingredientInputValue: newValue })
    showNotify = (recipe) => {
        this.setState({
            uid: recipe.uid,
            hasNotify: true
        })
    }
    render() {
        const ingredients = this.state.formData.ingredients;
        console.log(this.state);
        return (
            <div className="main">
                <div className="container">
                    <h1 className="main__title">Add new recipe</h1>
                    <Helmet>
                        <title>Add new recipe</title>
                    </Helmet>
                    <div className="row">
                        <div className="col-md-12">
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
                                {this.state.loadedIngredients.length > 0 && 
                                    <div className="form-group form__group">
                                        <label>Ingredients</label>
                                        <Select 
                                            components={animatedComponents} 
                                            name="ingredients" 
                                            isMulti 
                                            options={this.state.loadedIngredients}
                                            cacheOptions 
                                            onInputChange={this.handleIngredientTyping}
                                            onChange={this.handleChangeIngredients}
                                            ref={this.selectRef}/>
                                        {ingredients && ingredients.map((data, i)=> {
                                            return <IngredientWeight 
                                                key={data.value} 
                                                data={data} 
                                                onWeightChange={this.handleWeightChange}>{i+1}</IngredientWeight>
                                        })}
                                    </div>
                                }
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
    componentDidMount = () => {
        this.props.fetchIngredients().then((fetchedIngredients) => {
            fetchedIngredients &&
                this.setState({loadedIngredients: Object.keys(fetchedIngredients).map((uid)=>(
                    {
                        value: uid,
                        label: fetchedIngredients[uid].name
                    }
                ))})
        })
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