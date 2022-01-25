import Popup from "./Popup";
import { popupPicture, popupPictureImg, popupPictureSubtitle } from './index.js';

export default class PopupWithImage extends Popup {
   
   open() {
      popupPictureSubtitle.textContent = this._name;
      popupPictureImg.src = this._link;
      popupPictureImg.alt = this._name;
      popupPicture.classList.add('popup_opened');
      document.addEventListener('keydown', this._handleEscClose);
   }
}