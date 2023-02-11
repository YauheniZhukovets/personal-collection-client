import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        debug: true,
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false,
        },
        resources: {
            en: {
                translation: {
                    header: {
                        search: 'Search...',
                        signIn: 'Sign In',
                        signUp: 'Sign Up',
                        logout: 'Logout',
                        admin: 'Admin panel',
                        home: 'Home'
                    },
                    signIn: {
                        signIn: 'Sign In',
                        email: 'Email',
                        password: 'Password',
                    },
                    signUp: {
                        username: 'Name',
                        signUp: 'Sign Up',
                        email: 'Email',
                        password: 'Password',
                    },
                    admin: {
                        username: 'Username',
                        email: 'Email'
                    },
                }
            },
            ru: {
                translation: {
                    header: {
                        search: 'Поиск...',
                        signIn: 'Войти',
                        signUp: 'Регистрация',
                        logout: 'Выйти',
                        admin: 'Админка',
                        home: 'Главная'
                    },
                    signIn: {
                        signIn: 'Войти',
                        email: 'Почта',
                        password: 'Пароль',
                    },
                    signUp: {
                        username: 'Имя',
                        signUp: 'Зарегистрироваться',
                        email: 'Почта',
                        password: 'Пароль',
                    },
                    admin: {
                        username: 'Имя пользователя',
                        email: 'Почта',

                    },
                }
            },
        }
    })
export default i18n


