const initialState = {
  loading: true,
  recipes: []
};

export default function recipes(state = initialState, action) {
  switch (action.type) {
    case 'FETCH_RECIPES':
      const recipes = Object.keys(action.recipes).map((uid)=>(
        {
          uid,
          ...action.recipes[uid]
        }
      ))
      return {loading: false, recipes};
    case 'FETCH_RECIPES_EMPTY':
        return {loading: false, recipes: [...state.recipes]};
    case 'FETCH_SINGLE_RECIPE':
        let tmpState = {loading: false, recipes: [...state.recipes]};
        const hasInState = tmpState.recipes.some((recipe)=> recipe.uid === action.recipe.uid);
        !hasInState && tmpState.recipes.push(action.recipe)
        return tmpState;
    case 'ADD_RECIPE_ERROR':
      return {loading: false, error: [...action.error]};
    case 'ADD_RECIPE':
      return {...state, loading: false};
    case 'ADD_RECIPE_LOADING':
      return {...state};
    default:
      return state
  }
}