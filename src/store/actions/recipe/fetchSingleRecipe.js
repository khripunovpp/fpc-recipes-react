import axios from "axios";
import {firebaseUrl} from "../../firebaseUrl.js";

export default function(uid) {
    return (dispatch) => {
        return axios.get(`${firebaseUrl}/recipes/${uid}.json`).then(({data})=>{
            data && dispatch({ type: "FETCH_SINGLE_RECIPE", recipe: data})
            return data
        })
    }
}