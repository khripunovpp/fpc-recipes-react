import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Redirect } from "react-router-dom";
import Select from 'react-select';
import { Helmet } from "react-helmet";
import makeAnimated from 'react-select/animated';
import IngredientWeight from './IngredientWeight';
import addRecipe from '../../store/actions/recipe/addRecipe';
import fetchIngredients from '../../store/actions/ingredients/fetchIngredients';
import Popup from '../../components/layout/Popup';
import { generatorUID } from '../../utility';
import Spinner from '../layout/Spinner';
import ErrorMessage from "../layout/ErrorMessage";
import { isEmpty, errorsLabel } from '../../validations'

const animatedComponents = makeAnimated();

const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
]

class CreateRecipe extends Component {
    state = {
        formData: {
            title: '',
            instructions: {
                [generatorUID(15)]: {
                    text: ""
                }
            },
            description: '',
            ingredients: []
        },
        choisedIngredients: [],
        validForm: false,
        errors: {},
        addedId: ''
    }
    validationForm = () => {
        Object.keys(this.state.formData).map(el => {
            this.validationField(el, this.state.formData[el])
        });
    }
    validationField = (id, val) => {
        switch(id) {
            case 'title':
            case 'description':
                isEmpty(val) && this.setErrorToState(id, errorsLabel.required)
                break;
            case 'instructions':
                Object.keys(this.state.formData.instructions).map(id => {
                    isEmpty(this.state.formData.instructions[id].text) && this.setErrorToState(id, errorsLabel.required)
                })
                break;
            case 'ingredients':
                isEmpty(val) && this.setErrorToState(id, errorsLabel.oneRequired)
                this.state.formData.ingredients.map(ingredient => {
                    isEmpty(ingredient.weight) && this.setErrorToState(ingredient.value, errorsLabel.empty)
                })
                break;
            default:
                break;
        }
    }
    setErrorToState = (id, text) => {
        this.setState(state=>({
            errors: {
                ...state.errors,
                [id]: text
            }
        }));
    }
    errorClass = (id) => {
        return this.state.errors[id] ? 'has-error' : '';
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.validationForm();
        this.state.errors && this.props.addRecipe(this.state.formData).then(this.showNotify);
    }
    handleChange = (e) => {
        e.preventDefault();
        this.setState({
            ...this.state,
            errors: {},
            formData: {
                ...this.state.formData,
                [e.target.name]: e.target.value
            }
        });
    }
    handleWeightChange = (e) => {
        e.preventDefault();
        this.setState({ errors: {} });
        this.state.formData.ingredients.map((ingredient)=>{
            return (ingredient.value === e.target.id) && (ingredient.weight = e.target.value)
        });
    }
    handleChangeIngredients = (o, e) => {
        const {action} = e;

        switch(action) {
            case 'select-option':
                const {value, label} = e.option;
                this.setState({choisedIngredients: [...this.state.choisedIngredients, {value, label, weight: ''}]})
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
        this.setState({
            ...this.state,
            errors: {},
            formData: {
                ...this.state.formData,
                ingredients: [...this.state.choisedIngredients]
            }
        })
    }
    handleCancelPopup = () => {
        this.setState({choisedIngredients: [...this.state.formData.ingredients]})
    }
    handleAddInstructon = () => {
        this.setState({
            ...this.state,
            formData: {
                ...this.state.formData,
                instructions: {
                    ...this.state.formData.instructions, 
                    [generatorUID(15)]: {text: ""}
                }
            }
        })
    }
    handleInstructionChange = (e) => {
        const {id, value} = e.target;
        this.setState({
            ...this.state, 
            errors: {},
            formData: {
                ...this.state.formData,
                instructions: {
                    ...this.state.formData.instructions, 
                    [id]: {text: value}
                }
            }
        })
    }
    showNotify = (data) => {
        data.uid && this.setState({
            addedId: data.uid
        })
    }
    render() {
        const ingredients = this.state.formData.ingredients;
        console.log(this.state)
        return (
            <div className="main">
                <div className="container">
                    <h1 className="main__title">Add new recipe</h1>
                    <Helmet>
                        <title>Add new recipe</title>
                    </Helmet>
                    <div className="row">
                        <div className="col-md-12">
                            {this.state.addedId && <Redirect to={`/recipes/${this.state.addedId}`} /> }
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
                                    {this.state.errors['title'] && <ErrorMessage type="danger">{this.state.errors['title']}</ErrorMessage>}
                                </div>
                                <div className="form-group form__group">
                                    <label>Description</label>
                                    <textarea 
                                        className="form-control" 
                                        name="description" 
                                        value={this.state.formData.description} 
                                        onChange={this.handleChange}></textarea>
                                    {this.state.errors['description'] && <ErrorMessage type="danger">{this.state.errors['description']}</ErrorMessage>}
                                </div>
                                <div className="form-group form__group">
                                    <label>Ingredients</label>
                                    {ingredients && ingredients.map((ingredient, index)=> {
                                        const number = index + 1 ;
                                        return <IngredientWeight 
                                            error={() => <ErrorMessage type="danger">{this.state.errors[ingredient.value]}</ErrorMessage>} 
                                            key={index} 
                                            ingredient={ingredient} 
                                            onWeightChange={this.handleWeightChange}>
                                                {number}
                                            </IngredientWeight>
                                    })}
                                    <button className="btn btn-block btn-sm btn-outline-secondary from__addMoreOption" data-toggle="modal" data-target="#exampleModal">+ Add more ingredients</button>
                                    {this.state.errors['ingredients'] && <ErrorMessage type="danger">{this.state.errors['ingredients']}</ErrorMessage>}
                                </div>
                                <div className="form-group form__group">
                                    <label>Instructions</label>
                                    {
                                        Object.keys(this.state.formData.instructions).map(key => (
                                            <Fragment key={key}>
                                                <textarea 
                                                    className="form-control" 
                                                    name="instruction" 
                                                    id={key}
                                                    value={this.state.formData.instructions[key].text}
                                                    onChange={this.handleInstructionChange}>
                                                </textarea> 
                                                {this.state.errors[key] && <ErrorMessage type="danger">{this.state.errors[key]}</ErrorMessage>}
                                            </Fragment>
                                        ))
                                    }
                                    <button 
                                        className="btn btn-block btn-sm btn-outline-secondary from__addMoreOption"
                                        onClick={this.handleAddInstructon}>
                                        + Add next step
                                    </button>
                                </div>
                                <button 
                                    type="button" 
                                    className="btn btn-primary" 
                                    onClick={this.handleSubmit}>
                                    Add recipe
                                </button>
                                {this.props.loading && <Spinner /> }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    loading: state.recipes.loading
})

const mapDispatchToProps = {
    addRecipe,
    fetchIngredients
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CreateRecipe)