const api = require('./covida-api');
const handlebars = require('handlebars');

const loggedInTemplate = 
    handlebars.compile(
        `<span class='userInfo'>
            <a class="text-white p-4" href="#account"><i class="fas fa-user"></i> {{this}}</a>
			<a href='#logout'><button class="btn btn-danger" type="button"><i class="fas fa-sign-out-alt"></i> Log Out</button></a>
		</span>`
    );

const loggedOut = 
    `<span class='userInfo'>
		<a class="text-white p-4" href='#signIn'>Sign In</a>
		<a href='#signUp'<button class="btn btn-primary" type="button">Sign Up</button></a>
	</span>`;