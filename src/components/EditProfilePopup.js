import React from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';


function EditProfilePopup(props) {

    const currentUser = React.useContext(CurrentUserContext);
    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');



    React.useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser]);



    function handleNameChange(event) {
        setName(event.target.value);
    }

    function handleDescriptionChange(event) {
        setDescription(event.target.value);
    }

    function handleSubmit(event) {
        event.preventDefault();
        props.onUpdateUser({
            name,
            about: description,
          });
    }

    function onCloseProfilePopup() {
        props.onClose();
        setName(currentUser.name);
        setDescription(currentUser.about);
    }

    return (
        <PopupWithForm name="profile" title="Редактировать профиль" buttonName="Сохранить" isSubmitActive={true} isOpen={props.isOpen} onClose={onCloseProfilePopup} onSubmit={handleSubmit}>
            <input id="name-input" type="text" required minLength="2" maxLength="40"
                pattern="[A-Za-zА-Яа-яЁё\s\-]+$" placeholder="Имя"
                className="popup__text popup__text_type_name form__input"
                onChange={handleNameChange}
                value={name}></input>
            <span id="name-input-error" className="form__input-error"></span>
            <input id="profession-input" type="text" required minLength="2" maxLength="200"
                pattern="[A-Za-zА-Яа-яЁё\s\-,]+$" placeholder="О себе"
                className="popup__text popup__text_type_profession form__input"
                onChange={handleDescriptionChange}
                value={description}></input>
            <span id="profession-input-error" className="form__input-error"></span>
        </PopupWithForm>
    )

}


export default EditProfilePopup;
