const PHONES_LIST_REQUEST = 'PHONES_LIST_REQUEST'
const PHONES_LIST_ERROR = 'PHONES_LIST_ERROR'
const PHONES_LIST_SUCCESS = 'PHONES_LIST_SUCCESS'


export const phoneList = () => (dispatch) => {
  dispatch({
    type: PHONES_LIST_REQUEST
  });
  fetch('https://api.github.com/gists')
    .then(
      res => res.json(), 
      error => dispatch({ 
        type: PHONES_LIST_ERROR,
        error
      })
    )
    .then(data => dispatch({
      type: PHONES_LIST_SUCCESS,
      phones: data
    }));
}

export const phonesReducer = (state = { phones: [], loading: false, error: null}, action) => {
  switch (action.type) {
    case PHONES_LIST_REQUEST:
      return Object.assign({}, state, { loading : true })
    case PHONES_LIST_ERROR:
      return Object.assign({}, state, { loading: false, error: action.error })
    case PHONES_LIST_SUCCESS:
      return Object.assign({}, state, { phones: action.phones, loading: false, error: null })
    default:
      return state;
  }
}
