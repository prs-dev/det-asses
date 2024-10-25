## Simple Comments
### This is a nextjs + mysql assesment simple live comments web app
For Backend:

Packages used:
* axios
* socket.io
* dotenv
* cors
* express
* mysql2
* uuid

To start the backend: 
1. Rename the .env.sample file to .env and fill the env variable values in that file,
```
env contains following variables:
HOST = #your db host
USER = #your db username
PASSWORD = #your db password
DB = #your db name
```

2. Start the server using `npm run server` from the root of the app

For frontend:
Packages used:
* axios
* socket.io-client
* mui

To start the frontend:
1. Run `npm i` from the client folder
2. Start the frontend using command `npm run client` from root or `npm run dev` from client folder
