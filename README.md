# go-todo-client

This repository contains a Web application that illustrates how to work with simple todos via Rest API.

The demo example is [here](https://vs-work.github.io/go-todo-client/)

## Functionality

1. Create a Todo
2. Set a Todo as completed
3. Change Todo's priority
4. Delete a Todo
5. Get all Todos' data

## Install and run locally.

1. `git clone git@github.com:VS-work/go-todo-client.git`
2. `cd go-todo-client`
3. `npm install`
4. `npm start`

### Important notes

* If you want to use the application locally please, run [API server](https://github.com/VS-work/go-todo-server) before. See `Important notes regarding install`, `Build`, and `Run locally`.
* In this case API will be available on http://localhost:3001
* Also, see [this](https://github.com/VS-work/go-todo-client/blob/master/.env.development) setting

## How it uses API

1. Create a Todo: POST method for `https://dry-woodland-14649.herokuapp.com/todo`. Body field is:
`content` as a string.
2. Change Todo's priority or Set a Todo as completed: PUT method for `https://dry-woodland-14649.herokuapp.com/todo/todo_id`

In case of `Change Todo's priority ` expected body field is priority as integer where `0 is Normal` priority, `1 is Low`, `2 is High`.

In case of `Set a Todo as completed` expected body field is `completed` where `0 is Not completed`, `1 is completed`
3. Delete a Todo: DELETE method for `https://dry-woodland-14649.herokuapp.com/todo/todo_id`
4. Get all Todos' data: GET method for `https://dry-woodland-14649.herokuapp.com/todos`

## Deployment

We use github as a hosting. So, the following command will deploy the application:

`npm run deploy`

Demo example will be available on [https://vs-work.github.io/go-todo-client/](https://vs-work.github.io/go-todo-client/) after that and it will use `https://dry-woodland-14649.herokuapp.com` as API. More info [here](https://github.com/VS-work/go-todo-client/blob/master/.env.production).