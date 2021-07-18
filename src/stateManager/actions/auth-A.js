export const LOADING = 'LOADING';
export const SUCCESS = 'SUCCESS';
export const FAILURE = 'FAILURE';
export const UPDATEUSER = 'UPDATEUSER';
export const LOGOUT = 'LOGOUT';

export const authAction = {
  loading: () => ({ type: LOADING }),
  success: () => ({ type: SUCCESS }),
  logOut: () => ({ type: LOGOUT }),
  failure: errorMessage => ({ type: FAILURE, payload: errorMessage }),
  // this paylaod is obj containing any thing we want to add/update exp: {name:"salah", phone:"5555"}
  updateUser: payload => ({
    type: UPDATEUSER,
    payload,
  }),
};
