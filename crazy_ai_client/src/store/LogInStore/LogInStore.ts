import { makeObservable, observable, action, computed } from "mobx";
import { ILocalStore } from "../../utils/useLocalStore";

type PrivateFields = "_validator";

export class LogInStore implements ILocalStore {
    private _validator = {
        emailInvalid: false,
        emailMessage: "",
        passwordInvalid: false,
        passwordMessage: "",
    }

    constructor() {
        makeObservable<LogInStore, PrivateFields>(this, {
            _validator: observable,
            validator: computed,
            handleBlur: action,
        })
    }

    get validator() {
        return this._validator;
    }

    handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
        const fieldName = event.target.name;
        const fieldValue = event.target.value;

        if (fieldName === "email") {

            if (fieldValue === "") {
                this._validator[`${fieldName}Invalid`] = true;
                this._validator.emailMessage="Email не может быть пустым";
            } else if (!fieldValue.match(/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]/)) {
                this._validator[`${fieldName}Invalid`] = true;
                this._validator.emailMessage="Email должен содержать только символы латинского алфавита, @, . и цифры";
            } else {
                this._validator[`${fieldName}Invalid`] = false;
                this._validator.emailMessage="";
            }

        } else if (fieldName === "password") {
            
            if (fieldValue === "") {
                this._validator[`${fieldName}Invalid`] = true;
                this._validator.passwordMessage="Пароль не может быть пустым";
            } else if (fieldValue.length < 6) {
                this._validator[`${fieldName}Invalid`] = true;
                this._validator.passwordMessage="Пароль должен содержать не менее 7 символов";
            } else {
                this._validator[`${fieldName}Invalid`] = false;
                this._validator.passwordMessage="";
            }

        }
    }

    handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
          email: data.get('email'),
          password: data.get('password'),
          remember: data.get('remember')
        });
      };
    
    destroy() {}
}