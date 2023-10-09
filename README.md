<img src="./src/images/logo.svg" align="right" width="60px">

# movies-explorer-frontend

Данный проект выполнен в рамках обучения в Яндекс.Практикум в качестве дипломной работы.

*В приложении доступен следующий функционал:*
* На главной странице доступна информация о проекте, сроках выполнения и авторе работы
* Для работы с приложением необходимо зерегистрироваться, а если ранее пользователь регистрировался, то войти под своими учетными данными
* Для авторизованного пользователя доступна страница с просмотром и и изменением своих данных
* Во вкладке "Фильмы" можно найти карточку с фильмом по ключевому слову из названия, также можно фильтровать фильмы по длительности с помощью переключателя "Короткометражки". Во вкладке "Фильмы" поиск осуществляется из общей базы (100 карточек), во вкладке "Сохраненные фильмы" поиск осуществляется из базы сохраненных пользователем карточек
* Клик по изображению перенаправляет пользователя на канал Ютуб с трейлером к фильму. Сайт открывается в отдельной вкладке
* Понравившийся фильм можно добавить во вкладку "Сохраненные фильмы" по кнопке "Сохранить". При повторном нажатии на кнопку фильм будет удален из закладок. Также фильм можно удалить непосредственно во вкладке "Сохраненные фильмы"
* Для удобства работы с приложением во время поиска фильмов из общей базы отображается прелоадер, если фильма по ключевому слову не оказалось, выйдет соответсвующее сообщение.
* При заполнении полей форм Регистрации, аутентификации, изменения данных пользователя идет проверка на валидность данных. Данные можно отправить только при отсутствии ошибок, в случае неверно введённых данных пользователь получит сообщение о типе ошибки

***

**Используемые технологии**

<div>
  <img src="https://img.shields.io/badge/HTML5-202020?style=for-the-badge&logo=html5&logoColor=3DDC84">
  <img src="https://img.shields.io/badge/CSS3-202020?style=for-the-badge&logo=css3&logoColor=3DDC84">
  <img src="https://img.shields.io/badge/JavaScript-202020?style=for-the-badge&logo=javascript&logoColor=3DDC84">
  <img src="https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=3DDC84">
  <img src="https://img.shields.io/badge/React_Router-202020?style=for-the-badge&logo=react-router&logoColor=3DDC84">
  <img src="https://img.shields.io/badge/express_js-202020?style=for-the-badge&logo=nodedotjs&logoColor=3DDC84">
  <img src="https://img.shields.io/badge/mongoDB-202020?style=for-the-badge&logo=mongodb&logoColor=3DDC84">
</div>

***

## Ссылки на проект

Ссылка на макет в figma https://disk.yandex.ru/d/PHb_Kpshd81_iA

Ссылка на пул-реквест https://github.com/NataBr1/movies-explorer-frontend/pull/2

IP 51.250.19.226

Frontend https://movies.nomoredomains.xyz

Адрес репозитория https://github.com/NataBr1/movies-explorer-frontend

Backend https://movies.nb.nomoredomains.work

Адрес репозитория https://github.com/NataBr1/movies-explorer-api

***

## Инструкция по развертыванию приложения

1. Клонируйте репозиторий с бэкендом

    `git clone https://github.com/NataBr1/movies-explorer-api.git`

2. Установите зависимости

    `npm install`

3. Запустите сервер

    `npm run dev`

4. Клонируйте репозиторий с фрондендом

    `git clone https://github.com/NataBr1/movies-explorer-frontend.git`

5. Установите зависимости

    `npm install`

6. Запустите приложние на 3001 порту

    `npm start`
