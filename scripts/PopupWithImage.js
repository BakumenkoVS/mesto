import Popup from "./Popup.js";
import { popupPictureImg, popupPictureSubtitle } from './index.js';

export default class PopupWithImage extends Popup {
   
   open(name, link) {
      popupPictureSubtitle.textContent = name;
      popupPictureImg.src = link;
      popupPictureImg.alt = name;
      super.open();
      super.setEventListeners();
      debugger
   }
}