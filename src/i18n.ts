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
                        collection: 'My Collections',
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
                        submit: 'Create',
                        update: 'Update',
                        titleUpdate: 'Update collection',
                        fields: 'Optional fields'
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
                    },
                    item: {
                        create: 'Create item',
                        title: 'Create new item',
                        name: 'Name',
                        action: 'Action',
                        submit: 'Create',
                        update: 'Update',
                        titleUpdate: 'Edit item',
                        tags: 'Tags',
                        string1: 'Weight',
                        string2: 'Price',
                        string3: 'Sizes',
                        text1: 'Description',
                        text2: 'About author',
                        text3: 'History',
                        number1: 'Count',
                        number2: 'Total count release',
                        number3: 'Power',
                        boolean1: 'Has damage',
                        boolean2: 'New',
                        boolean3: 'Limited edition',
                        date1: 'Release start date',
                        date2: 'Release date',
                        date3: 'Release end date',
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
                    sidebar: {
                        home: 'Главная',
                        collection: 'Моя коллекция',
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
                        title: 'Создание новой коллекциии',
                        name: 'Название',
                        theme: 'Тема',
                        choiceTheme: 'Пожалуйста, выберите тему коллекции!',
                        image: 'Обложка',
                        description: 'Описание',
                        submit: 'Создать',
                        update: 'Обновить',
                        titleUpdate: 'Изменение каллекции',
                        fields: 'Поля'
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
                    },
                    item: {
                        create: 'Создать элемент',
                        title: 'Создание новый элемент',
                        name: 'Название',
                        action: 'Дейсвия',
                        submit: 'Создать',
                        update: 'Обновить',
                        titleUpdate: 'Изменение элемента',
                        tags: 'Тэги',
                        string1: 'Вес',
                        string2: 'Цена',
                        string3: 'Размер',
                        text1: 'Описание',
                        text2: 'Об авторе',
                        text3: 'История',
                        number1: 'Кол-во',
                        number2: 'Всего выпущено',
                        number3: 'Мощность',
                        boolean1: 'Повреждено',
                        boolean2: 'Новое',
                        boolean3: 'Специальная серия',
                        date1: 'Дата старта релиза',
                        date2: 'Дата релиза',
                        date3: 'Дата завершения релиза',
                    },
                }
            },
        }
    })
export default i18n


