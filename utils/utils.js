function openCardPreview(popup) {
    openPopup(popup);
  }
  
  function openPopup(popup) {
    popup.classList.add('popup_is-opened');
    document.addEventListener('keydown', escapeListener);
  }
  
  function closePopup(popup) {
    popup.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', escapeListener);
  }
  
  function escapeListener(evt) {
    if (evt.key === 'Escape') {
      const popupIsOpened = document.querySelector('.popup_is-opened');
      closePopup(popupIsOpened);
    }
  }
  
  export { openPopup, closePopup, openCardPreview };