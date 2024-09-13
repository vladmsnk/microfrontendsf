import React from 'react';
import { CurrentUserContext } from '../../../shared/contexts/CurrentUserContext';

// компонент PopupWithForm загружается динамически
const PopupWithForm = React.lazy(() => import('shared/PopupWithForm'));


function EditProfilePopup({ isOpen, onUpdateUser, onClose }) {
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }

  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    if (currentUser) {
      setName(currentUser.name);
      setDescription(currentUser.about);
    }
  }, [currentUser]);

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PopupWithForm
        isOpen={isOpen} onSubmit={handleSubmit} onClose={onClose} title="Редактировать профиль" name="edit"
      >
        <label className="popup__label">
          <input type="text" name="userName" id="owner-name"
                className="popup__input popup__input_type_name" placeholder="Имя"
                required minLength="2" maxLength="40" pattern="[a-zA-Zа-яА-Я -]{1,}"
                value={name || ''} onChange={handleNameChange} />
          <span className="popup__error" id="owner-name-error"></span>
        </label>
        <label className="popup__label">
          <input type="text" name="userDescription" id="owner-description"
                className="popup__input popup__input_type_description" placeholder="Занятие"
                required minLength="2" maxLength="200"
                value={description || ''} onChange={handleDescriptionChange} />
          <span className="popup__error" id="owner-description-error"></span>
        </label>
      </PopupWithForm>
    </Suspense>
  );
}

export default EditProfilePopup;
