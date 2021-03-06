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

## Todo

- [ ] Build an authentication **API with oAuth Facebook and Google  functionality**. 
  - [x] Also include normal email and password authentication.  
  - [ ] User should be able to 
    - [x] log in, register
    - [ ] update their password, 
    - [ ] forgot password  and 
    - [ ] updates their information. 
- [x] Use the following tools; **nodejs, expressjs, typescript, postgresql,  redis and docker** 
- [x] Database **table; user** 
- [x] Redis: **store session/refresh token** 
- [x] Ready to deploy using Docker 
- [ ] Need to write the code in **Typescript Frontend** 
  - [x] Create home, login, signup and profile page. 
  - [x] Tools: NuxtJS 
  - [ ] Profile page must be protected and can only be access when login 
  - [x] Clean design and you can use any UI library

