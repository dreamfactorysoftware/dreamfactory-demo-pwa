# Demo PWA

### Setup database:
[MySQL example employee database](https://dev.mysql.com/doc/employee/en/) was used for this application, but with extra tables and fields.

To set up the database follow these steps:
1. Unzip archive mysql-employee-example-database.zip that contains database.
2. Open "database" folder path in shell.
3. Execute the next command to setup mysql in docker and see logs:
    ```
    docker-compose up -d && docker-compose logs -f
    ```
   Wait a bit for logs to full stop, then Ctrl + C and you are all set.
4. Configure the database in your DF using [this guide](https://guide.dreamfactory.com/docs/chapter03.html#generating-a-mysql-backed-api).
### Configuring Okta
To configuring Okta for your app use [this guide](https://guide.dreamfactory.com/docs/chapter04.html#authenticating-with-okta).

### Environment:
There is a **.env.example** file in the root of the app. You would need to copy it and name it **.env** (for development) and **.env.production** (for production).
Then open them and fill all env variables with respective values.

More about environment variables [here](https://cli.vuejs.org/guide/mode-and-env.html#environment-variables). 

### DF Scripts
Event Scripts are used to hide the last 4 symbols of employee's phone number and for search employees on employees by department page

First of all, go to the scripts tab in your DF.

Add scripts for the next endpoints using related scripts from a df-script folder in the root path.

1. Script that will hide the last 4 symbols of all employees phone numbers:
    ```
    mysql > mysql._table.{table_name} > mysql._table.{table_name}.get.post_process > mysql._table.employees.get.post_process
    ```
   
    Script file: **hide-last-4-phone-symbols-for-all-employees.php**.

2. Script that will hide the last 4 symbols of an employee phone number:
    ```
    mysql > mysql._table.{table_name}.{id} > mysql._table.{table_name}.{id}.get.post_process > mysql._table.employees.{id}.get.post_process
    ```     
   Script file: **hide-last-4-phone-symbols-for-one-employee.php**.
   
3. Scripts for the search feature on employees by department page:
    ```
    mysql > mysql._table.{table_name}.{id} > mysql._table.{table_name}.{id}.get.post_process > mysql._table.departments.{id}.get.post_process
    ```
   Script file: **search-employees-by-department.php**.
   
Configuration is the same for all scripts, to choose script from your desktop click "**Select file**" button in "**Import a script file**" area.   

Example:

![hide 4 symbol script config 1](readme/config-for-hiding-last-symbols-script-1.png) 

#### Note: 
In case you specify employees database DF service namespace something different from "mysql", you would need to change $related_service_name variable value to suitable service name in the **search-employees-by-department.php**. Also, you would need to change event scripts endpoints from "mysql" to your service name.

Otherwise, search on employees by department page will not work because it is [using event scripts to filter related data](https://blog.dreamfactory.com/event-scripts-filter-related-data/).

### DF Mailgun
DF Mailgun feature used to send support emails.

1. Create Mailgun account [here](https://www.mailgun.com/).
2. Create DF Mailgun connector using [this guide](http://wiki.dreamfactory.com/DreamFactory/Tutorials/Connecting_to_Email_Services#Mailgun_Email_Service).

### PWA Functions:
For PWA functionality to work, the app must be served over HTTPS.
In case you are using a Digital Ocean server, [this guide](https://www.digitalocean.com/community/tutorials/how-to-secure-nginx-with-let-s-encrypt-on-ubuntu-18-04) might come in handy.
Or if you are using a reverse proxy see [this guide](https://www.digitalocean.com/community/tutorials/how-to-configure-nginx-with-ssl-as-a-reverse-proxy-for-jenkins) (but without Jenkins redirect). You can also use [NGROK](https://ngrok.com/) for development.

### Setup in Production mode:

#### First way - using [serve](https://www.npmjs.com/package/serve) package

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
