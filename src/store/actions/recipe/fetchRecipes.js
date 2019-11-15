import axios from "axios";
import {firebaseUrl} from "../../firebaseUrl.js";

export default function() {
    return (dispatch, getState) => {
        return axios.get(`${firebaseUrl}/recipes.json`).then(({data: recipes})=>{
            console.log(1)
            recipes
                ? dispatch({ type: "FETCH_RECIPES", recipes: recipes})
                : dispatch({ type: "FETCH_RECIPES_EMPTY"})
        })
    }
}