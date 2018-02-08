Prerequisite
	Install composer
	Install yarn
	Install xampp
	Setup
	1. pull
	2. composer install
	3. yarn
	4. Rename .env.example file to .envinside your project root and fill the database information. (windows wont let you do it, so you have to open your console cd your project root directory and run mv .env.example .env )
	5. Open the console and cd your project root directory
	6. Run composer install or php composer.phar install
	7. Run php artisan key:generate
	8. Start Xammp apache and Mysql
	9. Navigate in the browser to http://localhost/phpmyadmin/
	10. Create a DB with the name from you .env file
	11. Run php artisan migrate
	12. (Optional) Run php artisan db:seed to run seeders, if any.
	13. Run php artisan serve
