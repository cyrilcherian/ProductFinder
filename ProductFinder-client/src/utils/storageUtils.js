export const saveUserDetails = (userToken, userDetails) => {
  localStorage.setItem('userToken', userToken);
  localStorage.setItem('gmailLogin', true);
  localStorage.setItem('user', JSON.stringify(userDetails));
};

export const loadUserState = () => {
  return {
    loginStatus: (JSON.parse(localStorage.getItem('gmailLogin'))) ?
      true : false,
    userDetails: JSON.parse(localStorage.getItem('user'))
  };
};

export const loadToken = () => (localStorage.getItem('userToken'));

export const removeUserDetails = () => {
  localStorage.removeItem('gmailLogin');
  localStorage.removeItem('user');
  localStorage.removeItem('userToken');
};

