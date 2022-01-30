//Класс реализует изменение имени и профессии 
export default class UserInfo {
   constructor({ name, profession }) {

      this._profileName = document.querySelector(name);
      this._profileProfession = document.querySelector(profession);
   }
   //Метод для реализации записи значения имени и профессии используется в событии открытия формы 
   getUserInfo() {

      // formData.name = this._profileName.textContent;
      // formData.profession = this._profileProfession.textContent;

      const inputText = {
         inputName: this._profileName.textContent ,
         inputProfession: this._profileProfession.textContent
      }

      return inputText;
   }
   //Метод получает объект со значениями имени и профессии и записывает их в  title и subtitle
   setUserInfo(formData) {

      this._profileName.textContent = formData.name;
      this._profileProfession.textContent = formData.profession;

   };
};