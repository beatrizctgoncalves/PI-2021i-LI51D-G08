const api = require('./covida-api');

const handlebars = require('handlebars');

const loggedInTemplate = 
        handlebars.compile(`	
                <span class='userinfo'>
                    User: {{this}} | <a href='#logout'>Logout</a>
                </span>
        `);

        const loggedOut =  `
		<span class='userinfo'>
			<a href='#login'>Login</a>
			<a href = '#register'>Register</a>
		</span>
    `;
    
let currUsername = null;
let userInfoBox;

function setCurrentUser(username) {
	currUsername = username;
	userInfoBox.innerHTML = username ?
		loggedInTemplate(username) :
		loggedOut;
}

module.exports = {

        initialize: async(userinfo) => {
            userInfoBox = userinfo;

            try{
                setCurrentUser(await api.getUserById());
            }catch(err){
                setCurrentUser(null);
        }
},

getCurrentUser: () => currUsername,

login: {
    getView: (req) => `
    <div>
        <label for='txtUsername'>Username: </label>
        <input type='text' id='txtUsername'><br>
        <label for='txtPassword'>Password : </label>
        <input type='password' id='txtPassword'><br>
        <input type='button' id='butLogin' value='Login'>
    </div>
`,
    run: () => {
        const txtUsername = document.querySelector('#txtUsername');
		const txtPassword = document.querySelector('#txtPassword');
        const butLogin = document.querySelector('#butLogin');
        
        butLogin.onclick = async () => {
            const username = txtUsername.value;
            if (username.length == 0) {
                alert('Username is empty.');
                return;
            }
            const password = txtPassword.value;
            if (password.length == 0) {
                alert('Password is empty.');
                return;
            }

            try {
                const user = await api.login(username,password);
                setCurrentUser(user);
                location.assign('#home');
            }catch(err){
                alert(err);
                txtUsername.value = "";
                txtPassword.value = "";
            }
    }
}
},
logout: {
    getView: (req) => `
    `,

    run: async () => {
        try {
            await api.logout();
        } catch (err) {
            alert(err);
        }
        setCurrentUser(null);
        location.assign('#home');
    }
},
createUser: {
    getView: (req) => `
        <div>
            <label for='txtUsername'>Username: </label>
            <input type='text' id='txtUsername'><br>
            <label for='txtPassword'>Password : </label>
            <input type='password' id='txtPassword'><br>
            <input type='button' id='butReg' value='Register'>
        </div>
    `,
    run: () => {
        const txtUsername = document.querySelector('#txtUsername');
        const txtPassword = document.querySelector('#txtPassword');
        const butReg = document.querySelector('#butReg');

        butReg.onclick = async () => {
            const username = txtUsername.value;
            if (username.length == 0) {
                alert('Username is empty.');
                return;
            }
            const password = txtPassword.value;
            if (password.length == 0) {
                alert('Password is empty.');
                return;
            }

            try {
                const register = await api.createUser(username,password)
                const user = await api.login(username, password);
                setCurrentUser(user);
                location.assign('#home');
            } catch (err) {
                alert(err);
                txtUsername.value = "";
                txtPassword.value = "";
            }
        }
    }
}
}

