export const validationOptions = {
    formSelector: '.form',
    inputSelector: '.form__input',
    submitButtonSelector: '.form__submit',
    inactiveButtonClass: 'form__submit_inactive',
};

export const apiConfig = {
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-12',
    headers: {
      authorization: 'f4b731d6-2118-4fcc-9305-6dde1beafd26',
      'Content-Type': 'application/json'
    }
};