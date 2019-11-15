import axios from "axios";
import {firebaseUrl} from "../../firebaseUrl.js";

export default function(recipe) {
    return (dispatch) => {
        return axios.post(`${firebaseUrl}/recipes.json`, recipe).then(({data})=>{
            const payload = {...recipe, uid: data.name};
            dispatch({ type: "ADD_RECIPE", recipe: payload});
            return payload;
        })
    }
}