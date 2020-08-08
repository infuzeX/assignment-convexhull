Steps to deploy MERN app to heroku


step 1 add proxy in client package.json just before the last curly bracket

"proxy":"http://localhost:3001"

by adding proxy in package.json we can directly access apis


step 2 create .env file

add MONGOURI=YOUR_MONGODB_AtlAs_DB_URL
then install dontenv in server and configure .env file

require('dotenv').config()

then add this line 
const db = process.env.MONGOURI || your://localhost:port


step 3 login to heroku using heroku cli

run heroku login cmd in terminal
then run heroku create it will create project repository on heroku



step 4 add heroku-postbuild in server package.json file inside scripts field

"heroku-postbuild": "NPM_CONFIG_PRODUCTION=false npm install --prefix client && npm run build --prefix client"

it will automatically run npm install & build script to install required dependencies and build 



step 5 add static folder in server.js file

if (process.env.NODE_ENV === "production") {
    
    app.use(express.static('client/build/'))
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname , 'client','build','index.html'));
    });

}


step 6 push code to heroku 
run following commands in terminal
1. git init

2. git add .

3  git commit -m"your msg"

4  heroku git:remote -a your-project-name
 
5  git push heroku master

