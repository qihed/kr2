[https://qihed.github.io/kr2/pages/index.html](https://qihed.github.io/kr2/index.html)

# Портфолио (ASCII-wireframe): тёмная тема «`_`» и «`|`»

Минималистичный шаблон личного сайта-портфолио в стиле «проводной схемы» (wireframe).
Фокус: читабельная тёмная палитра, моноширинный ритм, псевдо-ASCII-рамки и простой JS без сборщика.

## Ключевые возможности

### Страницы

* **Главная** — фото-рамка, краткое интро, кнопки действий.
* **Проекты** — карточки с категориями (фильтры по `data-category`) и модальное окно с описанием.
* **Дневник** — ASCII-прогресс-бары вида `[########--------] 40%` + чек-лист задач с сохранением состояния в `localStorage`.
* **Контакты** — форма с базовой валидацией (имя ≥ 2, корректный email, сообщение ≥ 10), тост-уведомление.

### Стиль

* Фон: `#3c3c3e`, текст/акцент: `#d9d9d9` (единый цвет для контента и акцентов).
* Псевдо-рамки: символы «`_`» и «`|`» через `border` и `::before/::after`.
* Моноширинный шрифт по умолчанию (семейство системных monospace).

### JS без зависимостей

* Подсветка активного пункта меню.
* Фильтрация карточек и модальный диалог.
* Текстовые прогресс-бары и сохранение чек-листов.

## Технологии

* HTML5, CSS (без препроцессоров), JavaScript (ES6+ без фреймворков).
* Адаптивная сетка на CSS Grid/Flex.
* Без сборщика: можно открыть `index.html` напрямую в браузере.

## Структура проекта

Удовлетворяет заявленной в требованиях.

## Структура

```text
kr2/                     — корень проекта
├─ assets/
│  └─ resume.pdf                  — резюме для кнопки «Скачать резюме» на главной
├─ images/
│  └─ placeholder.svg             — временное изображение (фото/превью) для карточек и блока героя
├─ pages/
│  ├─ contacts.html               — «Контакты»: форма, клиентская валидация, тост-уведомление
│  ├─ diary.html                  — «Дневник»: ASCII-прогресс, TODO-список, кнопка «Добавить запись» + диалог
│  └─ projects.html               — «Проекты»: карточки, фильтры по категориям, модальное окно
├─ scripts/
│  ├─ contacts.js                 — валидация формы (имя/email/сообщение), показ тоста
│  ├─ diary.js                    — рендер ASCII-прогресса; TODO с localStorage; логика диалога добавления
│  ├─ main.js                     — подсветка активного пункта меню (aria-current/is-active)
│  └─ projects.js                 — фильтры по data-category; модалка (open/close, Esc)
├─ styles/
│  └─ styles.css                  — общие стили: тёмная палитра (#3c3c3e / #d9d9d9), monospace, ASCII-рамки,
│                                   сетки/карточки/кнопки/модалки; фикс выравнивания чекбоксов
├─ favicon.svg                    — favicon сайта (SVG)
├─ index.html                     — «Главная»: шапка/навигация, блок героя с фото, CTA-кнопки
└─ README.md                      — описание проекта: запуск, деплой, настройка
```


## Кастомизация

**Цвета и ритм** — в `styles/styles.css`:

```css
:root{
  --bg:#3c3c3e;   /* фон */
  --fg:#d9d9d9;   /* текст и акцент */
  --accent:#d9d9d9;
  --muted:#b8b8b8;
  --gap: clamp(8px, 2vw, 16px);
}
```

* **ASCII-рамки** — класс `.ascii-frame`.
* **Прогресс-бар** — длина шкалы в `diary.js`: `const total = 20;`.
* **Фильтры проектов** — `data-filter` у кнопок и `data-category` у карточек (`web`, `ui`, `tools` и т. п.).
* **Модалка** — заголовок и текст берутся из `<header>` и `<p>` карточки.
* **Форма** — правила валидации правятся в `contacts.js` (`validate()`).

## Доступность (a11y)

* `:focus-visible` для контура фокуса.
* `aria-current="page"` для активного пункта меню.
* Модалка: `role="dialog"`, закрытие `Esc` и по подложке`.

---

## Для КР-3. Что сделано:

### Практика 15 — комбинированная адаптивная вёрстка

#### 1. Корректный viewport
**Файлы:** `index.html`, `pages/projects.html`, `pages/diary.html`, `pages/contacts.html`
- Добавлен `viewport-fit=cover` в мета-тег viewport для поддержки safe-area на устройствах с вырезами (iPhone X и новее)
- Формат: `content="width=device-width, initial-scale=1, viewport-fit=cover"`

#### 2. Базовый каркас страницы
**Файлы:** `styles/styles.css`
- Настроен `min-height: 100vh/100svh/100dvh` для корректной работы на разных устройствах (fallback через каскад)
- Добавлен `color-scheme: light dark` для поддержки системной темы
- Реализован flexbox layout (`display: flex; flex-direction: column`) для sticky footer

#### 3. Семантическая структура
**Файлы:** `index.html`, `pages/projects.html`, `pages/diary.html`, `pages/contacts.html`
- Использованы семантические теги: `<header>`, `<nav>`, `<main>`, `<footer>`
- Все страницы имеют корректную структуру с разделением на секции

#### 4. Герой-блок с адаптивными изображениями
**Файлы:** `index.html`, `styles/styles.css`
- Реализован `<picture>` с `srcset` и `sizes` для адаптивной загрузки изображений
- Заданы `width` и `height` у всех изображений для предотвращения CLS (Cumulative Layout Shift)
- Применён `object-fit: cover` в CSS для корректного отображения
- Пример: `srcset="images/placeholder.svg 150w, images/placeholder.svg 200w, images/placeholder.svg 300w" sizes="200px"`

#### 5. Сетка проектов на CSS Grid
**Файлы:** `index.html`, `pages/projects.html`, `styles/styles.css`
- Реализована адаптивная сетка с `grid-template-columns: repeat(auto-fit, minmax(18rem, 1fr))`
- Сетка автоматически подстраивается под размер экрана, создавая колонки минимум 18rem
- Добавлена секция "Последние проекты" на главной странице с Grid-сеткой

#### 6. Skip-link для навигации с клавиатуры
**Файлы:** `index.html`, `pages/projects.html`, `pages/diary.html`, `pages/contacts.html`, `styles/styles.css`
- Добавлена кнопка "Перейти к основному содержанию" в начале `<body>` на всех страницах
- Реализован стиль `.skip-link` с позиционированием вне экрана, появляется при фокусе
- `main` имеет `id="main"` и `tabindex="-1"` для программной установки фокуса

#### 7. Видимый фокус (:focus-visible)
**Файлы:** `styles/styles.css`
- Настроен видимый outline для всех интерактивных элементов (`a`, `button`, `input`, `textarea`, `select`)
- Используется `:focus-visible` для показа outline только при навигации с клавиатуры (Tab), а не при клике
- Стиль: `outline: 2px solid var(--fg); outline-offset: 4px`

#### 8. Зоны клика ≥ 44×44 px
**Файлы:** `styles/styles.css`
- Все интерактивные элементы имеют минимальные размеры `min-height: 44px; min-width: 44px`
- Применено к: `.btn`, `.nav-link`, `.filter-btn`, `.modal__close`
- Соответствует рекомендациям WCAG для доступности на мобильных устройствах

#### 9. Sticky-хедер с учётом safe-area
**Файлы:** `styles/styles.css`
- Реализован `position: sticky` для хедера
- Учтён `env(safe-area-inset-top)` для корректного позиционирования на устройствах с вырезами
- `top: max(0px, env(safe-area-inset-top))` и `padding-top: calc(var(--gap) + env(safe-area-inset-top))`
- Футер также учитывает `env(safe-area-inset-bottom)` через CSS-переменную `--safe-bottom`

#### 10. Responsive-изображения на всех страницах
**Файлы:** `index.html`, `pages/projects.html`
- Все изображения используют `<picture>` с `srcset` и `sizes`
- Для карточек проектов: `sizes="(min-width: 900px) 320px, (min-width: 600px) 45vw, 90vw"`
- Все изображения имеют атрибуты `width` и `height` для предотвращения CLS
- Используется `loading="lazy"` для ленивой загрузки

#### 11. Формы с корректными label и сообщениями об ошибках
**Файлы:** `pages/contacts.html`, `pages/diary.html`, `scripts/contacts.js`, `scripts/diary.js`
- Все поля форм имеют связку `<label for="id">` + `id` у input/textarea
- Сообщения об ошибках имеют `role="alert"` и `aria-live="polite"` для screen readers
- Добавлена установка `aria-invalid="true"` при ошибках валидации
- Примеры: `contact-name`, `contact-email`, `contact-message`, `task-text`, `task-done`

#### 12. Адаптивные сетки на всех страницах
**Файлы:** `pages/projects.html`, `styles/styles.css`
- Страница проектов использует Grid с `repeat(auto-fit, minmax(18rem, 1fr))`
- Все карточки адаптивно перестраиваются под размер экрана
- Используется `gap: var(--gap)` для отступов между элементами

#### 13. Дополнительные улучшения доступности
**Файлы:** `scripts/contacts.js`, `scripts/diary.js`
- Улучшена валидация форм с установкой `aria-invalid` для доступности
- Сообщения об ошибках корректно объявляются screen readers через `role="alert"`
- Все формы имеют `novalidate` для кастомной валидации с доступными сообщениями

### Результат
- ✅ Все требования практики 15 выполнены
- ✅ Сайт адаптивен на всех устройствах
- ✅ Соответствует рекомендациям WCAG по доступности
- ✅ Изображения загружаются адаптивно без CLS
- ✅ Навигация доступна с клавиатуры
- ✅ Формы корректно работают со screen readers

---

## Для КР-3. Практики 16 и 17. Что сделано:

### Практика 16 — адаптивные изображения

#### 1. Picture с WebP/JPEG форматами
**Файлы:** `index.html`, `pages/projects.html`
- Добавлены `<picture>` элементы с поддержкой WebP и JPEG форматов
- Реализованы fallback через каскад: WebP → JPEG → SVG
- Пример: `<source type="image/webp">` и `<source type="image/jpeg">`

#### 2. Разные изображения под брейкпоинты
**Файлы:** `index.html`, `pages/projects.html`
- Настроены `sizes` с брейкпоинтами: `(min-width: 1200px)`, `(min-width: 768px)`
- Разные размеры изображений загружаются в зависимости от viewport
- Пример: `sizes="(min-width: 1200px) 300px, (min-width: 768px) 200px, 150px"`

#### 3. Простые адаптивные изображения
**Файлы:** `index.html`, `styles/styles.css`
- Добавлен пример простого адаптивного изображения с `width: 100%; height: auto;`
- Демонстрация на главной странице в секции "О проекте"

#### 4. Srcset для ретина-иконок
**Файлы:** `index.html`
- Добавлен комментарий с примером ретина-иконок в `<head>`
- Формат: `srcset="icon@1x.png 1x, icon@2x.png 2x"` для поддержки высоких плотностей пикселей

#### 5. Разные object-fit примеры
**Файлы:** `styles/styles.css`
- Реализованы классы: `.photo.contain` (object-fit: contain), `.photo.fill` (object-fit: fill)
- Основной `.photo` использует `object-fit: cover` для заполнения с обрезкой
- Документированы все варианты в комментариях CSS

#### 6. Адаптивная галерея на Grid
**Файлы:** `index.html`, `pages/projects.html`, `styles/styles.css`
- Улучшена Grid-сетка с `repeat(auto-fit, minmax(18rem, 1fr))`
- Добавлен `height: auto` для изображений карточек
- Сетка автоматически перестраивается под ширину экрана

#### 7. Оптимизация изображений
**Файлы:** Все HTML файлы с изображениями
- Все изображения имеют `loading="lazy"` для ленивой загрузки
- Используются подходящие форматы: WebP для фото, SVG для иконок
- Разумные размеры под брейкпоинты для оптимизации загрузки

### Практика 17 — доступность contacts.html

#### 1. Семантика форм
**Файлы:** `pages/contacts.html`
- Добавлен `<fieldset>` для группировки полей формы
- Добавлен `<legend>` с классом `sr-only` для screen readers
- Использованы корректные HTML5-теги: `form`, `fieldset`, `legend`

#### 2. Правильная иерархия заголовков
**Файлы:** `pages/contacts.html`
- Используется `<h1>` для главного заголовка страницы
- Логичная структура документа с семантическими секциями

#### 3. Навигация с клавиатуры
**Файлы:** `index.html`, `pages/projects.html`, `pages/diary.html`, `pages/contacts.html`
- Все интерактивные элементы доступны по Tab/Shift+Tab
- Добавлен `aria-label="Основная навигация"` для всех `<nav>`
- Добавлен `aria-current="page"` для активной страницы
- Видимый стиль фокуса через `:focus-visible` настроен для всех элементов

#### 4. Формы с доступностью
**Файлы:** `pages/contacts.html`, `scripts/contacts.js`
- Каждое поле имеет связанный `<label for="id">` + `id` у input
- Обязательные поля помечены через `<abbr>` с `aria-label="обязательное поле"`
- Ошибки помечены `role="alert"` и `aria-live="polite"`
- Добавлены подсказки (hints) с `id` и `aria-describedby` для связи с полями
- Установка `aria-invalid="true"` при ошибках валидации

#### 5. Компоненты с доступностью
**Файлы:** Все страницы
- Меню: `<nav>` с `aria-label`, `aria-current="page"`
- Кнопки закрытия модалок: `aria-label="Закрыть диалог"`
- Кнопки с явными типами: `type="submit"`, `type="button"`

#### 6. Модалки/диалоги
**Файлы:** `pages/projects.html`, `pages/diary.html`, `scripts/projects.js`, `scripts/diary.js`
- Реализован `role="dialog"` и `aria-modal="true"`
- Добавлен `aria-labelledby` для связи с заголовком модалки
- Управление фокусом: сохранение предыдущего фокуса, перемещение в модалку, возврат при закрытии
- Ловушка фокуса: Tab циклически перемещается внутри модалки
- Закрытие по Escape реализовано
- Backdrop скрыт от screen readers через `aria-hidden="true"`
- Блокировка прокрутки фона при открытой модалке

#### 7. Валидация и подсказки
**Файлы:** `pages/contacts.html`, `scripts/contacts.js`, `styles/styles.css`
- Все поля имеют `aria-describedby` для связи с подсказками и ошибками
- Формат: `aria-describedby="hint-id error-id"`
- Подсказки имеют класс `.hint` со стилями
- Сообщения об ошибках имеют класс `.error` с `role="alert"`
- Добавлен класс `.sr-only` для скрытого текста (screen reader only)

#### 8. Дополнительные улучшения
**Файлы:** Все страницы
- Форма имеет `aria-label="Форма обратной связи"`
- Все обязательные поля имеют `aria-required="true"`
- Toast-уведомление имеет `hidden` атрибут для правильного скрытия