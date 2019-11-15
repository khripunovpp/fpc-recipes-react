import axios from "axios";
import {firebaseUrl} from "../../firebaseUrl.js";

export default function(uid) {
    return async (dispatch, getState) => {
        const state = getState();
        let cahsedRecipe = {};
        const cashed = state.recipes.recipes.some( recipe => {
            if (recipe.uid === uid) {
               return cahsedRecipe = recipe;
            }
        })

        if(cashed) {
            await dispatch({ type: "FETCH_SINGLE_RECIPE", recipe: cahsedRecipe})
            return cahsedRecipe
        }
       
        return axios.get(`${firebaseUrl}/recipes/${uid}.json`).then(({data})=>{
            data && dispatch({ type: "FETCH_SINGLE_RECIPE", recipe: {...data, uid}})
            return data
        })
    }
}