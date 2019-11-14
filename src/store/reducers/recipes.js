const initialState = {
  loading: true,
  recipes: []
};

export default function recipes(state = initialState, action) {
  switch (action.type) {
    case 'FETCH_RECIPES':
      const recipes = Object.keys(action.recipes).map((id)=>(
        {
          id,
          ...action.recipes[id]
        }
      ))
      return {loading: false, recipes};
    default:
      return state
  }
}