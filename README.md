# Readme

## About this

this is NEPR (Nuxtjs-ExpressJs-Postgres-Redis) Stack web development

- Nuxtjs as frontend
- ExpressJs as backend
- Postgres as database
- Redis as cache token session

## Instalation

The architecture has wrapped in docker-compose, first thing first you need to install `docker`. To run this file type this :

```bash
docker-compose up
```

## Documentation

### Route API (Express Js)

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

