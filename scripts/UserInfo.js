import {
   profileTitle,
   profileSubtitle,
   professionInput,
   nameInput
} from "./index.js";

export default class UserInfo {
   constructor({ item }) {

      this._profileName = item.name;
      this._profileProfession = item.profession;
   }

   setUserInfo() {

      profileTitle.textContent = this._profileName;
      profileSubtitle.textContent = this._profileProfession;
   };

   getUserInfo() {
      return  userInfo =
      {nameInput.textContent = this._profileName.bind(this),
      professionInput.textContent = this._profileProfession.bind(this)}
   }

}