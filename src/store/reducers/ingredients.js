export default function ingredients(state = [], action) {
  switch (action.type) {
    case 'CREATING_RECIPE__ADD_INGREDIENT':
      return [
        ...state,
        {d:1}
      ]
    default:
      return state
  }
}