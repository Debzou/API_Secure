Config file : ./env

```sh
npm install
npm start
```

localhost:8080/signup

```sh
curl --location --request POST 'localhost:8080/signup' \
--header 'Content-Type: application/json' \
--data-raw '{
    "username": "",
    "password" : "",
    "email" : ""
}'
```

localhost:8080/login

```sh
curl --location --request GET 'localhost:8080/login' \
--header 'Authorization: Basic YOUR_AUTH_ENCODED'
```

localhost:8080/proveAnthentication

```sh
curl --location --request GET 'localhost:8080/proveAnthentication' \
--header 'Authorization: Bearer YOUR_TOKEN
```
