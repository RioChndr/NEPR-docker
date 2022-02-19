# Readme

## Introduction

this is NEPR (Nuxtjs-ExpressJs-Postgres-Redis) Web Development Stack using docker

- Frontend : Nuxtjs
- Backend / API : ExpressJs
- DB : Postgre and Redis (Token Cache Session)

## Instalation


```bash
docker-compose up
```

## Documentation

### Route Backend/API (Express Js)

locate: `localhost:3000`

- `/login` : POST, params : `[email, password]`
- `/register` : POST, params: `[username, email, password]`
- `/users/me` : GET
  To get users data
- `/logout` : GET

### Route Front-end (Nuxt Js)

locate: `localhost:8000`

- `/` : Home
- `/login` : Login
- `/register` : register
- `/logout` : logout
- `/profile`: Users profile's page to edit profile
- `/private` : Private page that only for logged in user

### User

there is no default user, for the first time use this needs to create/register new user.

### How NEPR Work

1. User register from frontend (**NuxtJs**) and calls API to backend (**ExpressJs**).
2. Backend create new user and save to **Postgres**
3. User login and also calls API to backend
4. Backend create new token and send it to front-end as a token that use everytime request to backend
5. When creating token, backend also save that token to **redis** cache
6. When user login for next time, backend will check to **redis** if there is a token saved in there, if not will create new token, if yes will return that token
7. When user are doing request, the token needs to validate with a few steps
   1. Is the token valid ?, if not, return with error
   2. Is token available in **redis** ?, if not, return error
   3. Is token in redis (same with request's token) is not expired ?, if not, return error
   4. if all validation passed, the request will continue to process, if not request will rejected.
8. When users logout, backend just delete the token in redis. so, even if there are attacker use the token (not expired) but not available in redis, cannot access the account.

## Todo

- [ ] Build an authentication **API with oAuth Facebook and Google  functionality**. 
  - [x] Also include normal email and password authentication.  
  - [ ] User should be able to 
    - [x] log in, register
    - [x] update their password, 
    - [ ] forgot password  and 
    - [x] updates their information. 
- [x] Use the following tools; **nodejs, expressjs, typescript, postgresql,  redis and docker** 
- [x] Database **table; user** 
- [x] Redis: **store session/refresh token** 
- [x] Ready to deploy using Docker 
- [x] Need to write the code in **Typescript Frontend** 
  - [x] Create home, login, signup and profile page. 
  - [x] Tools: NuxtJS 
  - [x] Profile page must be protected and can only be access when login 
  - [x] Clean design and you can use any UI library

