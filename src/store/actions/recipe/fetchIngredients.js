import axios from "axios";
import {firebaseUrl} from "../../firebaseUrl.js";

export default function() {
    return (dispatch) => {
        return axios.get(`${firebaseUrl}/ingredients.json`).then(({data: ingredients})=>{
            ingredients
                ? dispatch({ type: "FETCH_INGREDIENTS", ingredients})
                : dispatch({ type: "FETCH_INGREDIENTS_EMPTY"})
        })
    }
}