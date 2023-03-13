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
                        or: 'or',
                        signInGoogle: 'Sign in with Google',
                        signInGitHub: 'Sign in with GitHub'
                    },
                    signUp: {
                        username: 'Name',
                        signUp: 'Sign Up',
                        email: 'Email',
                        password: 'Password',
                    },
                    sidebar: {
                        home: 'Home',
                        collection: 'My CollectionsList',
                        admin: 'Admin Panel',
                    },
                    admin: {
                        name: 'Name',
                        email: 'Email',
                        admin: 'Admin',
                        block: 'Blocked',
                        collections: 'CollectionsList',
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
                        fields: 'Optional fields',
                        dragInfo: 'Click or drag image to this area to upload',
                        all: 'All',
                        selected: 'Selected'
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
                        newTag: 'New tag',
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
                    comment: {
                        title: 'Comments',
                        placeholder: 'Comment...',
                        button: 'New comment',
                    },
                    main: {
                        tags: 'Tags',
                        collectionsInfo: 'CollectionsList with the most items',
                        itemsInfo: 'Latest added items',
                        itemCount: 'Item count',
                        likeCount: 'Likes',
                        commentCount: 'Comments',
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
                        or: 'или',
                        signInGoogle: 'Войти с помощью Google',
                        signInGitHub: 'Войти с помощью GitHub'
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
                        fields: 'Поля',
                        dragInfo: 'Кликните или перетащите обложку в область загрузки',
                        all: 'Все',
                        selected: 'Выбранные'
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
                        newTag: 'Новый тег',
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
                    comment: {
                        title: 'Комментарии',
                        placeholder: 'Комментарий...',
                        button: 'Новый комментарий',
                    },
                    main: {
                        tags: 'Тэги',
                        collectionsInfo: 'Коллекции с наибольшим числом элементов',
                        itemsInfo: 'Последние добавленные элементы',
                        itemCount: 'К-во элементов',
                        likeCount: 'К-во лайков',
                        commentCount: 'К-во комментариев',
                    },
                }
            },
        }
    })
export default i18n


