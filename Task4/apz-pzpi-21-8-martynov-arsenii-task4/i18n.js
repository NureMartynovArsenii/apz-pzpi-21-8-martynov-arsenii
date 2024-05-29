import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources: {
            en: {
                translation: {
                    "ChildClimaCare": "ChildClimaCare",
                    "Registration": "Registration",
                    "Authorization": "Authorization",
                    "Main": "Main",
                    "Ukrainian": "Ukrainian",
                    "English": "English",
                    "Username": "Username",
                    "FirstName": "First Name",
                    "LastName": "Last Name",
                    "Email": "Email",
                    "Password": "Password",
                    "Phone": "Phone",
                    "SelectRole": "Select Role",
                    "Employee": "Employee",
                    "Parent": "Parent",
                    "Register": "Register",
                    "LoginAsAdmin": "Login as Admin",
                    "Login": "Login",
                    "SuccessfulRegistration": "Successful registration",
                    "RegistrationError": "Registration error",
                    "SuccessfulAuthorization": "Successful authorization",
                    "AuthorizationError": "Authorization error",
                    "InvalidLoginOrPassword": "Invalid login or password",
                    "AdminRightsRequired": "Admin rights required",
                    "Close": "Close",
                    "Welcome to Gardens": "Welcome to Gardens",
                    "Name": "Name",
                    "Location": "Location",
                    "Director": "Director",
                    "Actions": "Actions",
                    "Rooms": "Rooms",
                    "Rooms in Garden": "Rooms in Garden",
                    "Room Number": "Room Number",
                    "Quantity children": "Quantity children",
                    "Equipment": "Equipment",
                    "Equipment in Room": "Equipment in Room",
                    "Status": "Status",
                    "Measurements": "Measurements",
                    "Measurements for Equipment": "Measurements for Equipment",
                    "Measurement Type": "Measurement Type",
                    "Value": "Value"
                }
            },
            ua: {
                translation: {
                    "ChildClimaCare": "ChildClimaCare",
                    "Registration": "Реєстрація",
                    "Authorization": "Авторизація",
                    "Main": "Головна",
                    "Ukrainian": "Українська",
                    "English": "Англійська",
                    "Username": "Ім'я користувача",
                    "FirstName": "Ім'я",
                    "LastName": "Прізвище",
                    "Email": "Електронна пошта",
                    "Password": "Пароль",
                    "Phone": "Телефон",
                    "SelectRole": "Виберіть роль",
                    "Employee": "Працівник",
                    "Parent": "Батько/Мати",
                    "Register": "Зареєструватися",
                    "LoginAsAdmin": "Увійти як Адміністратор",
                    "Login": "Увійти",
                    "SuccessfulRegistration": "Успішна реєстрація",
                    "RegistrationError": "Помилка реєстрації",
                    "SuccessfulAuthorization": "Успішна авторизація",
                    "AuthorizationError": "Помилка авторизації",
                    "InvalidLoginOrPassword": "Невірний логін або пароль",
                    "AdminRightsRequired": "У вас немає прав адміністратора",
                    "Close": "Закрити",
                    "Welcome to Gardens": "Ласкаво просимо до садочків",
                    "Name": "Назва",
                    "Location": "Розташування",
                    "Director": "Директор",
                    "Actions": "Дії",
                    "Rooms": "Кімнати",
                    "Rooms in Garden": "Кімнати в садочку",
                    "Room Number": "Номер кімнати",
                    "Quantity children": "Кількість дітей",
                    "Equipment": "Обладнання",
                    "Equipment in Room": "Обладнання в кімнаті",
                    "Status": "Статус",
                    "Measurements": "Вимірювання",
                    "Measurements for Equipment": "Вимірювання для обладнання",
                    "Measurement Type": "Тип вимірювання",
                    "Value": "Значення"
                }
            }
        },
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false
        }
    });

export default i18n;
