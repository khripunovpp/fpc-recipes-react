import React, {Component} from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';
import IngredientWieghts from './IngredientWieghts';
import creatingRecipeAddIngredient from '../../store/actions/ingredients/creatingRecipeAddIngredient';
import creatingRecipeRemoveIngredient from '../../store/actions/ingredients/creatingRecipeRemoveIngredient';

const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
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
    handleChange = (e) => {
        e.preventDefault();
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    handleWeightsChange = (e) => {
        console.log(e.target.name, e.target.value)
    }
    handleChangeIngredients = (o, event) => {
        switch(event.action) {
            case 'select-option':
                this.setState((state) => {
                    return {
                        ...state,
                        [event.name]: [
                            ...state[event.name],
                            {
                                value: event.option.value,
                                label: event.option.label
                            }
                        ]
                    }
                })
                break;
            case 'remove-value':
                this.setState((state) => {
                    const tState = {
                        ...state
                    }
                    delete tState[event.name][event.removedValue.value]
                    return tState;
                })
                break;
            default:
                return false;
                break;
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
                    <Select name="ingredients" options={options} isMulti onChange={this.handleChangeIngredients}/>
                    {this.state.ingredients.map((data, index)=> {
                        return <IngredientWieghts key={index} value={data.value} onWeightsChange={this.handleWeightsChange} />
                    })}
                </div>
                <div className="form__group">
                    <label>Instruction</label>
                    <textarea name="instruction" onChange={this.handleChange}></textarea>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
      ingredients: state
    }
  }
  
const mapDispatchToProps = {
    creatingRecipeAddIngredient, 
    creatingRecipeRemoveIngredient
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CreateRecipe)