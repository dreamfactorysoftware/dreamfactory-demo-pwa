# Demo PWA
## Project setup

### Setup database:
1. Open docker-compose.yaml and change data for database if you need it. 
2. Open "database" folder path in shell.
3. Execute next command for running mysql in docker
    ```
    docker-compose up -d
    ```
   '-d' for detached mode. 
4. Unzip archive mysql-employee-example-database.zip that contains database.
5. Copy database into container with database
    ```
     docker cp mysql-employee-example-database/ <DATABASE CONTAINER NAME>:home/
    ```
6. Open container in bash
    ```
     docker exec -it <DATABASE CONTAINER NAME> bash
    ```   
7. Go inside folder with database.
8. Execute the next command for creating employees database
    ```
    mysql -u <DATABASE USERNAME> -p -t < employees.sql
    ```
Now you have employees database in you docker container.

**If you dont want install mysql you can just use 4, 7 and 8 commands.**   

### Environment:
There is a **.env.example** file in the root of the app. You would need to copy it and name it **.env** (for development) and **.env.production** (for production).
Then open them and fill all env variables with respective values.

### Setup in dev mode:
1. Install all modules for app:
    ```
    npm install
    ```

2. Run app with compiles and hot-reloads:
    ```
    npm run serve
    ```

#### ESLint
Run ```eslint --ext .js,.vue src``` to see lint problems

Add ```--fix``` flag to fix problems

### Setup in Production mode:

##### Be attention. For properly register Service Worker app must be served over HTTPS in production.

#### First way - using serve package

1. Build app
    ```
    npm run build
    ```
2. Run using serve package
    ```
    serve -s dist
    ```
#### Second way - using docker  

1.  Build docker image
    ```
    docker build . -t my-app
    ```

2. Run app
    ```
    docker run -d -p 8080:80 my-app
    ```

