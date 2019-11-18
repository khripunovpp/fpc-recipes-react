import axios from "axios";
import {firebaseUrl} from "../../firebaseUrl.js";

export default function(uid) {
    return async (dispatch, getState) => {
        const state = getState();
        let cahsedIngredient = {};
        const cashed = state.ingredients.ingredients.some( ingredient => {
            if (ingredient.uid === uid) {
               return cahsedIngredient = ingredient;
            }
            return false;
        })

        if(cashed) {
            await dispatch({ type: "FETCH_SINGLE_INGREDIENT", ingredient: cahsedIngredient});
            return cahsedIngredient;
        }
       
        return axios.get(`${firebaseUrl}/ingredients/${uid}.json`).then(({data})=>{
            let payload = {...data};
            if(data) {
                payload = {...payload, uid};
                dispatch({ type: "FETCH_SINGLE_INGREDIENT", ingredient: payload})
            };
            return payload
        })
    }
}