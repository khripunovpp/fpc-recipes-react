import axios from "axios";
import {firebaseUrl} from "../../firebaseUrl.js";

export default function(ingredient) {
    return (dispatch) => {
        return axios.post(`${firebaseUrl}/ingredients.json`, ingredient).then(({data})=>{
            const payload = {...ingredient, uid: data.name};
            dispatch({ type: "ADD_INGREDIENT", ingredient: payload});
            return payload;
        })
    }
}