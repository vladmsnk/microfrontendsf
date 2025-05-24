import React from 'react';

// компонент PopupWithForm загружается динамически из микрофронтенда shared
const PopupWithForm = React.lazy(() => import('shared/PopupWithForm'));


function EditAvatarPopup({ isOpen, onUpdateAvatar, onClose }) {
  const inputRef = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar({
      avatar: inputRef.current.value,
    });
  }

  return (
    // оборачиваем компонент в Suspense, чтобы обработать задержку загрузки
    <Suspense fallback={<div>Loading...</div>}>
        <PopupWithForm
            isOpen={isOpen} onSubmit={handleSubmit} onClose={onClose} title="Обновить аватар" name="edit-avatar">

            <label className="popup__label">
                <input type="url" name="avatar" id="owner-avatar"
                    className="popup__input popup__input_type_description" placeholder="Ссылка на изображение"
                    required ref={inputRef} />
                <span className="popup__error" id="owner-avatar-error"></span>
            </label>
            </PopupWithForm>
    </Suspense>
  );
}

export default EditAvatarPopup;