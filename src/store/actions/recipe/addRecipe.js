import axios from "axios";
import {firebaseUrl} from "../../firebaseUrl.js";

export default function(recipe) {
    return (dispatch) => {
        dispatch({ type: "ADD_RECIPE_LOADING"});
        recipe.thumbnail = 'https://firebasestorage.googleapis.com/v0/b/recipes-619a5.appspot.com/o/epic-summer-salad.jpg?alt=media&token=f51d9e15-25c3-4a8a-85a6-78fe29be2a6c';
        return axios.post(`${firebaseUrl}/recipes.json`, recipe).then(({data})=>{
            const payload = {...recipe, uid: data.name};
            dispatch({ type: "ADD_RECIPE", recipe: payload});
            return payload;
        }, (error) => {
            dispatch({ type: "ADD_RECIPE_ERROR", error});
            return error;
        })
    }
}