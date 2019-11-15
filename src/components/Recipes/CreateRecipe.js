import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import Select from 'react-select';
import IngredientWeight from './IngredientWeight';
import addRecipe from '../../store/actions/recipe/addRecipe';

const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
    { value: 'vvvv', label: 'vvv' }
]

const groupedOptions = [
    {
        label: 'Flavours',
        options: options,
    }
];

class CreateRecipe extends Component {
    state = {
        recipe: {
            title: '',
            instruction: '',
            ingredients: []
        },
        hasNotify: false,
        uid: ''
    }
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
    showNotify = (recipe) => {
        this.setState({
            uid: recipe.uid,
            hasNotify: true
        }, function(e){console.log(this.state)})
    }
    render() {
        return (
            <div className="form">
                <div className="form__group">
                    <label>Title</label>
                    <input type="text" name="title" onChange={this.handleChange}/>
                </div>
                {this.state.hasNotify && <Link to={`/recipes/${this.state.uid}`}>Show your recipe</Link>}
                <div className="form__group">
                    <label>Ingredients</label>
                    <hr/>
                    <Select noOptionsMessage={() => <Link to="/create/ingredient" target="_blank">Добавить новый ингредиент</Link>} name="ingredients" options={groupedOptions} isMulti onChange={this.handleChangeIngredients}/>
                    {this.state.recipe.ingredients.map((data, index)=> {
                        return <IngredientWeight key={index} value={data.value} onWeightChange={this.handleWeightChange} />
                    })}
                </div>
                <div className="form__group">
                    <label>Instruction</label>
                    <textarea name="instruction" onChange={this.handleChange}></textarea>
                </div>
                <button onClick={this.handleSubmit}>Add recipe</button>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    recipes: state.recipes
})

const mapDispatchToProps = {
    addRecipe
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CreateRecipe)