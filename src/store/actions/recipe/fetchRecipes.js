import axios from "axios";
import {firebaseUrl} from "../../firebaseUrl.js";

export default function() {
    return (dispatch) => {
        axios.get(`${firebaseUrl}/recipes.json`).then(({data})=>{
            console.log(data)
            data && dispatch({ type: "FETCH_RECIPES", recipes: data})
        })
    }
}