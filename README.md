# KR_KP Project

## Описание

Проект представляет собой настройку и администрирование деплоя в производственных средах банковских систем. Он включает в себя создание контейнерной платформы с использованием Docker, реализацию кластерной архитектуры, настройку CI/CD, сетевого взаимодействия, а также использование React для фронтенда и FastAPI для бэкенда.

Проект содержит 3 основных сервиса:
1. **Frontend** - Реализован на React.
2. **Backend** - Реализован с использованием FastAPI.
3. **Nginx** - Используется как балансировщик нагрузки.

## Структура проекта

/backend: Содержит код бэкенда, написанный на FastAPI.
/frontend: Содержит код фронтенда, написанный на React.
/nginx: Конфигурационные файлы для Nginx, используемого как балансировщик нагрузки.
docker-compose.yml: Конфигурационный файл для Docker Compose, который запускает все сервисы проекта.
Dockerfile.backend: Файл для создания Docker-образа для бэкенда.
Dockerfile.frontend: Файл для создания Docker-образа для фронтенда.
nginx.conf: Конфигурация для Nginx.

markdown

## Требования

- Docker
- Docker Compose

## Установка

1. Клонируйте репозиторий:

   ```bash
   git clone <URL_ВАШЕГО_РЕПОЗИТОРИЯ>
   cd KR_KP
Построение и запуск контейнеров:

Для запуска проекта с одним экземпляром бэкенда:

bash

docker-compose up --build

Для масштабирования бэкенда до 3-х экземпляров:

bash

docker-compose up --build --scale backend=3

Перейдите по адресу для фронтенда: http://localhost:8081

В случае необходимости остановите контейнеры:

bash

docker-compose down

Примечания
Все компоненты системы (фронтенд, бэкенд и Nginx) работают в рамках одной сети Docker для обеспечения взаимодействия между сервисами.
Nginx используется для балансировки нагрузки между экземплярами бэкенда.