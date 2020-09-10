import React from 'react';
import PopupWithForm from './PopupWithForm';


function AddPlacePopup(props) {
    
    const [name, setName] = React.useState('');
    const [link, setLink] = React.useState('');


    function handleNameChange(event) {
        setName(event.target.value);
    }

    function handlelinkChange(event) {
        setLink(event.target.value);
    }

    function handleSubmit(event) {
        event.preventDefault();
        props.onUpdatePlace(
            name,
            link,
          );
    }

    function onCloseProfilePopup() {
        props.onClose();
        setName('');
        setLink('');
    }
   

    return(
        <PopupWithForm name="card" title="Новое место" buttonName="Сохранить" isSubmitActive={true} isOpen={props.isOpen} onClose={onCloseProfilePopup} onSubmit={handleSubmit}>
            <input id="picture-input" type="text" required minLength="1" maxLength="30" placeholder="Название"
                className="popup__text popup__text_type_picture form__input" onChange={handleNameChange}></input>
            <span id="picture-input-error" className="form__input-error"></span>
            <input id="url-input" type="url" required placeholder="Ссылка на картинку"
                className="popup__text popup__text_type_link form__input" onChange={handlelinkChange}></input>
            <span id="url-input-error" className="form__input-error"></span>
        </PopupWithForm>
    )


}

export default AddPlacePopup;