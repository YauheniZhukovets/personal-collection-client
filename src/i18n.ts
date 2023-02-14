import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
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
                    sidebar: {
                        home: 'Home',
                        collection: 'Collections',
                        admin: 'Admin Panel',
                    },
                    admin: {
                        name: 'Name',
                        email: 'Email',
                        admin: 'Admin',
                        block: 'Blocked',
                        collections: 'Collections',
                        onBlock: 'Block',
                        onUnBlock: 'Unblock',
                        onDelete: 'Delete',
                        onMakeAdmin: 'Add Admin',
                        onRemoveAdmin: 'Remove Admin',
                    },
                    collections: {
                        create: 'Create Collection',
                        title: 'Create new collection',
                        name: 'Name',
                        theme: 'Theme',
                        choiceTheme: 'Please select your theme!',
                        image: 'Image',
                        description: 'Description',
                        submit: 'Create'
                    },
                    themes: {
                        stamp: 'Stamp',
                        money: 'Money',
                        drink: 'Drink',
                        weapon: 'Weapon',
                        car: 'Cars',
                        move: 'Move',
                        pictures: 'Pictures',
                        books: 'Books',
                        crockery: 'Crockery',
                        technics: 'Technics',
                    }
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
                    sidebar: {
                        home: 'Главная',
                        collection: 'Коллекции',
                        admin: 'Панель админа',
                    },
                    admin: {
                        name: 'Имя',
                        email: 'Email',
                        admin: 'Админ',
                        block: 'Блокирован',
                        collections: 'К-во колекций',
                        onBlock: 'Блокировать',
                        onUnBlock: 'Разблокировать',
                        onDelete: 'Удалить',
                        onMakeAdmin: 'Сделать админом',
                        onRemoveAdmin: 'Сделать юзером',
                    },
                    collections: {
                        create: 'Создать коллекцию',
                        title: 'Создать новую коллекцию',
                        name: 'Название',
                        theme: 'Тема',
                        choiceTheme: 'Пожалуйста, выберите тему коллекции!',
                        image: 'Обложка',
                        description: 'Описание',
                        submit: 'Создать'
                    },
                    themes: {
                        stamp: 'Марки',
                        money: 'Денеги',
                        drink: 'Алкаголь',
                        weapon: 'Оружие',
                        car: 'Автомобили',
                        move: 'Фильмы',
                        pictures: 'Картины',
                        books: 'Книги',
                        crockery: 'Посуда',
                        technics: 'Техника',
                    }
                }
            },
        }
    })
export default i18n


