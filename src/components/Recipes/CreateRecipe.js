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
        title: '',
        instruction: '',
        ingredients: []
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.addRecipe(this.state);
    }
    handleChange = (e) => {
        e.preventDefault();
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    handleWeightChange = (e) => {
        e.preventDefault();
        this.state.ingredients.map((ingredient)=>{
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
                tState[name].every((ingredient)=>(ingredient.value !== value)) && tState[name].push({value, label});
                this.setState(tState)
                break;
            case 'remove-value':
                const {value: removedValue} = e.removedValue;
                this.setState((state) => {
                    let tState = {
                        ...state
                    };
                    tState[name] = tState[name].filter((ingredient)=>{
                        return ingredient.value !== removedValue;
                    })
                    return tState;
                })
                break;
            default:
                return false;
        }
    }
    render() {
        return (
            <div className="form">
                <div className="form__group">
                    <label>Title</label>
                    <input type="text" name="title" onChange={this.handleChange}/>
                </div>
                <div className="form__group">
                    <label>Ingredients</label>
                    <hr/>
                    <Select noOptionsMessage={() => <Link to="/create/ingredient" target="_blank">Добавить новый ингредиент</Link>} name="ingredients" options={groupedOptions} isMulti onChange={this.handleChangeIngredients}/>
                    {this.state.ingredients.map((data, index)=> {
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

const mapDispatchToProps = {
    addRecipe
}

export default connect(
    null,
    mapDispatchToProps
)(CreateRecipe)