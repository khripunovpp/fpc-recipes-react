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

const options = [
    {value: 'fbfradfnzgfmzgn', label: 'Banana'},
    {value: 'erb6hi6umnv7n5y', label: 'Yogurt'},
    {value: 'ewfnd4y3hn45u4h', label: 'Cucumber'},
    {value: 'mfgn76jwn45hn7t', label: 'Milk'},
    {value: 'gtjetyns463grvy', label: 'Flour'},
];

class CreateRecipe extends Component {
    initialState = {
        recipe: {
            title: '',
            instruction: '',
            description: '',
            ingredients: []
        },
        ingredientInputValue: '',
        loadedIngredients: [],
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
                this.setState({...this.state.recipe.ingredients.push({...e.option})})
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
    handleCreateOption = (newIngredient) => {
        this.props.addIngredient({name: newIngredient}).then((uid) => {
            this.setState({...this.state.recipe.ingredients.push({value: uid, label: newIngredient})})
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
        const ingredients = this.state.recipe.ingredients;
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
                                    <input type="text" name="title" onChange={this.handleChange} className="form-control" value={this.state.recipe.title}/>
                                </div>
                                <div className="form-group form__group">
                                    <label>Description</label>
                                    <textarea className="form-control" name="description" onChange={this.handleChange}></textarea>
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
                                            onChange={this.handleChangeIngredients}/>
                                        {ingredients && ingredients.map((data, i)=> {
                                            return <IngredientWeight key={data.value} data={data} onWeightChange={this.handleWeightChange}>{i+1}</IngredientWeight>
                                        })}
                                    </div>
                                }
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

const mapStateToProps = (state) => ({
    state
})

const mapDispatchToProps = {
    addRecipe,
    fetchIngredients,
    addIngredient
}

export default connect(
    null,
    mapDispatchToProps
)(CreateRecipe)