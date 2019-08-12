// users reducer
export default function users(state = {}, action) {
  const authUser = action.data;

  switch (action.type) {
    case 'USER_SIGNED_IN':
      return {
        ...state,
        authUser,
      };

    case 'USER_SET_REDUX':
      return {
        ...state,
        authUser: {
          ...state.authUser,
          ...action.payload.user,
        },
      };

    case 'USER_SIGNED_OUT':
      return {
        redirectTo: authUser.redirectTo,
      };

    // initial state
    default:
      return state;
  }
}