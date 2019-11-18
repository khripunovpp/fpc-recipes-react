import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Link, Redirect} from "react-router-dom";
import Select from 'react-select/async';
import makeAnimated from 'react-select/animated';
import IngredientWeight from './IngredientWeight';
import addRecipe from '../../store/actions/recipe/addRecipe';
import fetchIngredients from '../../store/actions/recipe/fetchIngredients';

const animatedComponents = makeAnimated();

class CreateRecipe extends Component {
    initialState = {
        recipe: {
            title: '',
            instruction: '',
            description: '',
            ingredients: []
        },
        hasNotify: false,
        uid: ''
    }
    state = this.initialState;
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.addRecipe(this.state.recipe).then(this.showNotify);
    }
    handleChange = (e) => {
        e.preventDefault();
        this.setState({
            ...this.state,
            recipe: {
                ...this.state.recipe,
                [e.target.name]: e.target.value
            }
        })
    }
    handleWeightChange = (e) => {
        e.preventDefault();
        this.state.recipe.ingredients.map((ingredient)=>{
            return (ingredient.value === e.target.name) && (ingredient.weight = e.target.value)
        })
    }
    handleChangeIngredients = (o, e) => {
        const {action, name} = e;

        switch(action) {
            case 'select-option':
                const {value, label} = e.option;
                let tState = {
                    ...this.state
                };
                tState.recipe[name].every((ingredient)=>(ingredient.value !== value)) && tState.recipe[name].push({value, label});
                this.setState(tState)
                break;
            case 'remove-value':
                const {value: removedValue} = e.removedValue;
                this.setState((state) => {
                    let tState = {
                        ...state
                    };
                    tState.recipe[name] = tState.recipe[name].filter((ingredient)=>{
                        return ingredient.value !== removedValue;
                    })
                    return tState;
                })
                break;
            default:
                return false;
        }
    }
    handleLoadIngredients =  inputValue => {
        new Promise(resolve => {
            this.props.fetchIngredients.then((ingredients)=>{
                resolve(ingredients);
            })
        });
    }
    showNotify = (recipe) => {
        this.setState({
            uid: recipe.uid,
            hasNotify: true
        })
    }
    render() {
        const ingredients = this.state.recipe.ingredients;
        return (
            <div className="main">
                <div className="container">
                    <h1 className="main__title">Add new recipe</h1>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="form">
                                <div className="form-group form__group">
                                    <label>Title</label>
                                    <input type="text" name="title" onChange={this.handleChange} className="form-control" value={this.state.recipe.title}/>
                                </div>
                                <div className="form-group form__group">
                                    <label>Description</label>
                                    <textarea className="form-control" name="description" onChange={this.handleChange}></textarea>
                                </div>
                                <div className="form-group form__group">
                                    <label>Ingredients</label>
                                    <Select 
                                        components={animatedComponents} 
                                        noOptionsMessage={() => <Link to="/create/ingredient" target="_blank">Добавить новый ингредиент</Link>} 
                                        name="ingredients" 
                                        isMulti 
                                        placeholder="Start typing"
                                        cacheOptions
                                        defaultValue={[...this.state.recipe.ingredients]} 
                                        onChange={this.handleChangeIngredients}
                                        loadOptions={this.handleLoadIngredients}/>
                                    {ingredients && ingredients.map((data, index)=> {
                                        return <IngredientWeight key={index} value={data.value} onWeightChange={this.handleWeightChange} />
                                    })}
                                </div>
                                <div className="form-group form__group">
                                    <label>Instruction</label>
                                    <textarea className="form-control" name="instruction" onChange={this.handleChange}></textarea>
                                </div>
                                {this.state.hasNotify && <Redirect to={`/recipes/${this.state.uid}`} /> }
                                <button type="button" className="btn btn-primary" onClick={this.handleSubmit}>Add recipe</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    recipes: state.recipes
})

const mapDispatchToProps = {
    addRecipe,
    fetchIngredients
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CreateRecipe)