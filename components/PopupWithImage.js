import Popup from "./Popup.js";
import {
   popupPictureImg,
   popupPictureSubtitle
} from '../utils/constants.js';

//Класс наследуемый от родительского класса Popup реализует открытие pupup большой картинки 
export default class PopupWithImage extends Popup {

   open(name, link) {
      popupPictureSubtitle.textContent = name;
      popupPictureImg.src = link;
      popupPictureImg.alt = name;
      super.open();
      super.setEventListeners();
   }
}