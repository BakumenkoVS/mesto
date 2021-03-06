//Класс реализует изменение имени и профессии 
export default class UserInfo {
   constructor({ name, profession: about, avatar}) {

      this._profileName = document.querySelector(name);
      this._profileProfession = document.querySelector(about);
      this._profileAvatar = document.querySelector(avatar);
   }

   giveUserId(userId) {
      this._id = userId
   }

   getUserId() {
      return this._id
   }


   //Метод для реализации записи значения имени и профессии используется в событии открытия формы 
   getUserInfo() {
      const inputText = {
         inputName: this._profileName.textContent,
         inputProfession: this._profileProfession.textContent
      }

      return inputText;
   }
   //Метод получает объект со значениями имени и профессии и записывает их в  title и subtitle
   setUserInfo(formData) {

      this._profileName.textContent = formData.name;
      this._profileProfession.textContent = formData.about;
      this._profileAvatar.src = formData.avatar;

   };
};
