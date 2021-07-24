export const LOADING = 'LOADING';
export const SUCCESS = 'SUCCESS';
export const FAILURE = 'FAILURE';
export const LOGOUT = 'LOGOUT';

export const UPDATEUSER = 'UPDATEUSER';

export const ADDEVENT = 'ADDEVENT';
export const DELETEEVENT = 'DELETEEVENT';

export const DELETEEVENTGROUP = 'DELETEEVENTGROUP';
export const ADDEVENTGROUP = 'ADDEVENTGROUP';

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

  removeEvent: payload => ({ type: DELETEEVENT, payload }),
  addEvent: payload => ({ type: ADDEVENT, payload }),

  removeEventGroup: payload => ({ type: DELETEEVENTGROUP, payload }),
  addEventGroup: payload => ({ type: ADDEVENTGROUP, payload }),
};
