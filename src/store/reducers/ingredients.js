const initialState = {
    loading: true,
    ingredients: []
  };
  
  export default function recipes(state = initialState, action) {
    switch (action.type) {
        case 'FETCH_INGREDIENTS':
            const ingredients = Object.keys(action.ingredients).map((uid)=>(
                {
                uid,
                ...action.ingredients[uid]
                }
            ))
            return {loading: false, ingredients};
        case 'FETCH_INGREDIENTS_EMPTY':
            return {loading: false, ingredients: [...state.ingredients]};
        default:
            return state
    }
  }