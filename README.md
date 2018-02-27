
## Company Dashboard

Prerequisite:

- [Install NodeJS](https://nodejs.org/en/)
- [Install composer](https://getcomposer.org/)
- [Install yarn or npm](https://yarnpkg.com/en/)
- [Install xampp](https://www.apachefriends.org/index.html)

Tools:

- [eslint](http://eslint.org/) (*automatically check for code & style errors*)
- [webpack](https://webpack.github.io/) (*bundle javascript/css files & minification*)
- [Circle-CI](https://circleci.com/) (*continuous integration, runs tests & deploys code to webserver*)

## Installation Front-end
1. Clone the repository into an empty folder:

		git clone git@github.com:ZHoiton/company_dashboard.git [FOLDER NAME]

2. Navigate to the front-end folder

3. Install dependencies with yarn or npm:

		yarn

		or 

		npm i

4.  Start the Project

		yarn start

		or 

		npm start

## Installation Back-end (Setup Pending)
1. Clone the repository into an empty folder:

		git clone git@github.com:ZHoiton/company_dashboard.git [FOLDER NAME]

2. Navigate to the back-end folder

2. Install the dependencies with composer

		composer install
	
	or

		php composer.phar install

4. Create a .env file inside your project root and fill the database information. (windows wont let you do it, so you have to open your console cd your project root directory)

	- Change DB_DATABASE to a name that you want for your local database
	- Change DB_USERNAME to 'root' (no quotes)
	- Change DB_PASSWORD to '' (empty field with no quotes)

5. Open the console and cd your project root directory (dont close this you will need it for step 11)
6. Generate a new key for laravel 

		php artisan key:generate

7. Start Xammp 

	- apache
	- Mysql

8. Navigate in the browser to [localhost](http://localhost/phpmyadmin/)

9. Create a DB with the name from you .env file

10. Migrate your db from laravel:

		php artisan migrate

12. Populate the Database with:
	
		php artisan db:seed to run seeders, if any.

13. Start the application:
	
		php artisan serve

