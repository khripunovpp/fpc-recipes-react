const initialState = localStorage.getItem('recipes') || [];

export default function recipe(state = initialState, action) {
  switch (action.type) {
    case 'ADD_RECIPE':
      console.log(action.recipe)
      return [
        ...state,
        {d:1}
      ]
    default:
      return state
  }
}