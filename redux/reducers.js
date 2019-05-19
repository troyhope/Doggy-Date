
export default reducers = (state = {
  loggedIn: false,
  cards: [],
  verifiedCards: [],
  user: {
    id: '',
    photoUrl: '',
    name: '',
    aboutMe: ' ',
    chats: ' ',
    geocode: ' ',
    images: [],
    notification: false,
    show: false,
    report: false,
    swipes: [],
    token: ' ',
    interested: '',
    runVerify: false
  }
}, action) => {
  switch (action.type) {
    case 'LOGIN': {
      return { ...state, user: action.user, loggedIn: action.loggedIn }
    }
    case 'LOGOUT': {
      return { ...state, loggedIn: action.loggedIn }
    }
    case 'UPLOAD_IMAGES': {
      return { ...state, user: { ...state.user, images: action.payload } }
    }
    case 'UPDATE_ABOUT':
      return {
        ...state, user: { ...state.user, aboutMe: action.payload }
      }
    case 'GET_CARDS':
      return {
        ...state, cards: action.payload, runVerify: true
      }
      case 'VERIFY_CARDS':
      return {
        ...state, verifiedCards: action.payload, runVerify: false
      }
      case 'GET_INTEREST':
      return {
        ...state, interested: action.payload
      }
      case 'UPDATE_INTEREST':
      return {
        ...state, interested: action.payload
      }
    case 'GET_LOCATION':
      return {
        ...state, user: { ...state.user, geocode: action.payload }
      }
      case 'ALLOW_NOTIFICATIONS':      
        return { ...state, user: { ...state.user, token : action.payload } 
      }
  }
  return state;
} 