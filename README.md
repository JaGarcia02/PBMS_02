# PESO BUSINESS MANAGEMENT SYSTEM v2

## MANUAL CONFIGURATIONS FOR DEVELOPING AND PRODUCTION

### TO CONNECT THE FRONTEND TO BACKEND FOLLOW THE FOLLOWING STEPS

- on Frontend **.env** change the **VITE_BUILD** to "DEV"

### FOR DEPLOYMENT

- On Frontend **.env** change the **VITE_BUILD** to "PROD" then run **npm run build**
- Then on Backend uncomment the chunk of code that indicates an instruction then save.
- then in IIS using the reverse proxy method in terminal just type **pm2 start server.js**
- Then copy the localhost:3001 then paste it to the IIS reverse proxy.
- Then Done.
- .env file was hidden due to security purposes because the JWT Secret was in there, Ask the Developer to get it.
- **REMINDER**
- Always change the link in Nodemailer to your Hosting Site so that Change password will take effect

### UPDATING THE SYSTEM

- If the user has github just git bash then command git pull the main repository.
- then following the steps above for deployment.
- In terminal just type pm2 reload all.
- Finish!

### Database Credentials are in Backend Config Folder

- You can change the Database to .9 or .59

## NOTE TO MYSELF

- When you need to update a table you need a **DATA MIGRATION**
- First you need run a command **npx sequelize-cli migration:create --name modify_users_add_new_fields**
- Then a new file was added in backend migrations then add your configurations code there.
- Every time you will migrate a migrations **npx sequelize db:migrate --env testing**

## NOTE FOR RECAPTCHA ERROR

- When you see an error in Recaptcha it means that the domain is invalid
- you need to access this Site **https://www.google.com/recaptcha/admin/create**
- then click the recaptcha v2 then add your current domain
- then copy the Site key and Site secret to yhe .env -> FRONTEND

## USER LEVEL CHART

- Superuser = 0
- Global_admin = 1
- Dept_admin = 2
- Executive = 3
- Manager = 4
- Supervisor = 5
- Rank & File = 6

## RULES FOR AUTHORIZATION

- IF YOU WILL ADD BUTTONS WITH AUTHORIZATION YOU NEED TO BASED ON AUTHORIZATION ROLE YOU NEED TO CALL THE FUNCTION IN **Hooks** and
- useAuthorized.jsx and import the function with the decoded token

## RULES OF SYSTEM LOGS

- IF YOU WILL CALL THE FUNCTION ON SYSTEM LOGS YOU NEED TO INDICATE THE LOGS FUNCTION ON UTILS FOLDER

## CURRENT PROGRESS

### 9.3 %
