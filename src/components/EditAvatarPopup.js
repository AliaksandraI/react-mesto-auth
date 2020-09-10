import React from 'react';
import PopupWithForm from './PopupWithForm';



function EditAvatarPopup(props) {

    const avatar = React.useRef();
    

    function handleSubmit(event) {
        event.preventDefault();
        props.onUpdateAvatar({
           avatar: avatar.current.value,
        });
    }
    
   

    return (
        <PopupWithForm name="avatar" title="Обновить аватар" buttonName="Сохранить" isSubmitActive={true} isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit}>
                    <input id="url-input" type="url" required placeholder="Ссылка на аватар"
                            className="popup__text popup__text_type_link form__input" 
                            ref={avatar}></input>
                    <span id="url-input-error" className="form__input-error"></span>
        </PopupWithForm>
    )

}

export default EditAvatarPopup;