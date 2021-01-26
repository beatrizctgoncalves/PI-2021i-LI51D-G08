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
    
let currUsername = null;
let userInfoBox;

function setCurrentUser(username) {
	currUsername = username;
	userInfoBox.innerHTML = username ? loggedInTemplate(username) : loggedOut;
}

module.exports = {
    initialize: async(userinfo) => {
        userInfoBox = userinfo;
        try {
            setCurrentUser(await api.getUserById());
        } catch(err){
            setCurrentUser(null);
        }
    },

    getCurrentUser: () => currUsername,

    signIn: {
        getView: () => 
            `<h1>Sign In</h1>
            <div class="col-lg-6 offset-lg-3">
                <div class="form-group">
                    <label for='txtUsername'>Username: </label>
                    <input type='text' class="form-control" id='txtUsername' placeholder="Enter Username" required><br>
                    <label for='txtPassword'>Password : </label>
                    <input type='password' class="form-control" id='txtPassword' placeholder="Enter Password" required><br>
                    <button type="submit" class="btn btn-primary" id='butSignIn'>Sign In</button>
                </div>
            </div>`,

        run: (req) => {
            const buttonText = 'Sign In';
            const txtUsername = document.querySelector('#txtUsername');
            const txtPassword = document.querySelector('#txtPassword');
            const butSignIn = document.querySelector('#butSignIn');

            butSignIn.onclick = () => {
                const username = txtUsername.value;
                if (username.length === 0) {
                    alert('Username is empty.');
                    return;
                }
                const password = txtPassword.value;
                if (password.length === 0) {
                    alert('Password is empty.');
                    return;
                }
                butSignIn.innerHTML = `<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> ${butSignIn.innerHTML}`
                return api.signIn(username, password)
                .then(loginResponse => {
                   if(!loginResponse.error) {
                        alert(`Welcome ${loginResponse}`);
                        setCurrentUser(loginResponse);
                        location.assign(`#${(req.args && req.args[0]) || 'home'}`);
                    } else return Promise.reject(loginResponse.error)
                })
                .catch(error => {
                    console.log(error.body)
                    alert(error);
                    txtUsername.value = "";
                    txtPassword.value = "";
                    butSignIn.innerHTML = buttonText;
                })
            }
        }
    },

    logout: {
        getView: () => ``,

        run: () => {
            api.logout()
            .then(() => {
                alert(`See you soon ${currUsername}. Bye!`);
                setCurrentUser(null);
                location.assign('#home');
            })
            .catch(error => {
                alert(error);
            })
        }
    },

    signUp: {
        getView: () => 
            `<h1>Sign Up</h1>
            <div class= "col-lg-6 offset-lg-3">
                <div class="form-group">
                    <label for='txtUsername'>Username: </label>
                    <input type='text' class="form-control" id='txtUsername' placeholder="Enter Username" required><br>
                    <label for='txtPassword'>Password: </label>
                    <input type='password' class="form-control" id='txtPassword' placeholder="Enter Password" required><br>
                    <button type="submit" class="btn btn-primary" id='butSignUp'>Sign Up</button>
                </div>
            </div>`,

        run: (req) => {
            const buttonText = 'Sign Up';
            const txtUsername = document.querySelector('#txtUsername');
            const txtPassword = document.querySelector('#txtPassword');
            const butSignUp = document.querySelector('#butSignUp');

            butSignUp.onclick = () => {
                const username = txtUsername.value;
                if (username.length === 0) {
                    alert('Username is empty.');
                    return;
                }
                const password = txtPassword.value;
                if (password.length === 0) {
                    alert('Password is empty.');
                    return;
                }
                butSignUp.innerHTML = `<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> ${butSignUp.innerHTML}`
                console.log(username)
                return api.signUp(username, password)
                .then(createResponse => {
                    if(!createResponse.error) {
                        return api.signIn(username, password)
                        .then(loginResponse => {
                            if(!loginResponse.error) {
                                setCurrentUser(loginResponse);
                                alert(`Thanks ${username} for joining COVIDA`);
                                location.assign(`#${(req.args && req.args[0]) || 'home'}`);
                            } else return Promise.reject(loginResponse.error);
                        })
                    } else return Promise.reject(createResponse.error);
                })
                .catch(errorMsg => {
                    alert(errorMsg.body);
                    txtUsername.value = "";
                    txtPassword.value = "";
                    butSignUp.innerHTML = buttonText;
                })
            }
        }
    }
}
