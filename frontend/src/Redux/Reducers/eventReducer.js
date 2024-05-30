// reducers/eventReducer.js
const eventReducer = (state = [], action) => {
    switch (action.type) {
      case 'FETCH_EVENTS':
        return action.payload;
      case 'ADD_EVENT':
        return [...state, action.payload];
      // Add cases for updating and deleting events
      default:
        return state;   
    }
  };
  
  export default eventReducer;
  