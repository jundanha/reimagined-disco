# Reimagined Disco

## Description

Simple backend webapp created using [Nest](https://github.com/nestjs/nest) framework TypeScript.

## Installation

Copy the file `.env.example` and rename it to `.env` and then fill the value based on your mysql info. 
Run this command on terminal.

```bash
$ npm install
```

## Running the app
Run this command on terminal.
```bash
$ npm run start
```

## Using Docker
You can also use docker to run the app.
Run this command on the terminal.

```bash
$ docker-compose up --build
```

## Testing The API

This app is consist of 7 endpoints:

#### 1. Create User / Register
Method : POST
URL : `http://localhost:3000/`
Body (Raw JSON) :
```
{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "password": "password123"
}
```

#### 2. Login
Method : POST
URL : `http://localhost:3000/auth/login`
Body (Raw JSON) :
```
{
  "email": "john.doe@example.com",
  "password": "password123"
}
```
This endpoint will return an `access_token`. Save the `access_token` to used other endpoints.

#### 3. Get All Posts
Method : GET  
URL : `http://localhost:3000/posts`  

#### 4. Get Post by ID
Method : GET  
URL : `http://localhost:3000/posts/:id`  

#### 5. Create A New Post
Method : POST  
URL : `http://localhost:3000/posts`  
Header (Authorization) : Bearer `access_token`  
Body (Raw JSON) :
```
{
  "content": "Hello this is a new post",
}
```

#### 6. Edit A Post
Method : POST  
URL : `http://localhost:3000/posts/:id`  
Header (Authorization) : Bearer `access_token`  
Body (Raw JSON) :
```
{
  "content": "Hello this is a new post",
}
```


#### 7. Delete A Post
Method : GET  
Header (Authorization) : Bearer `access_token`  
URL : `http://localhost:3000/posts/:id`  