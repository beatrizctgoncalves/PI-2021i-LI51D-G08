const api = require('./covida-api.js');
const auth = require('./auth.js');

module.exports = {
    getView: () => {
        let currentUser = auth.getCurrentUser();
        return `<h1>${currentUser}'s Account</h1>
            <div class="container">
            <div class="row h-100 justify-content-center align-items-center"">
            <div class="col-sm">
               <div class="card">
                    <h5 class="card-header text-center bg-primary ">Account Statistics</h5>
                    <div class="card-body">                    
                        <h5 class="card-title"><i class="fas fa-lock"></i> Groups</h5>
                        <p class="card-text" id="groupsCounter"></p>
                        <h5 class="card-title"><i class="fas fa-tv"></i> Games</h5>
                        <p class="card-text" id="gamesCounter"></p>
                    </div>
               </div>
            </div>
            <div class="col-sm">
               <h5 class="text-center mb-4">Not Enough? Create A New Group!</h5>
                    <div class="form-group row">
                        <label for="groupName" class="col-sm-2 col-form-label">Name</label>
                        <div class="col-sm-10">
                            <input type="text" class="form-control" id="groupName" placeholder="Enter Group Name" required>
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="groupDesc" class="col-sm-2 col-form-label">Description</label>
                        <div class="col-sm-10">
                            <input type="text" class="form-control" id="groupDesc" placeholder="Enter Group Description" required>
                        </div>
                    </div>
                    <div class="form-group row">
                        <div class="col text-center">
                            <button id="createButton" class="btn btn-primary">Create</button>
                        </div>
                    </div>
               </div>
            </div>
            <div class="row">
               <div class="col-sm">
                    <div class = "mx-auto">
                        <a href="#groups" class="btn btn-primary btn-lg btn-block mt-5">My Groups</a>
                    </div>
                </div>
            </div>`
    },

    authenticationRequired: true,

    run: () => {
        let currentUser = auth.getCurrentUser();
        api.listGroups()
        .then(allGroups => {
            if (!allGroups.error) {       
                let groupsField = document.getElementById("groupsCounter");
                let gamesField = document.getElementById("gamesCounter");

                let groupsCounter = 0;
                let gamesCounter = 0;
                if(allGroups.body) {
                    if(allGroups.body.length) {
                        groupsCounter = allGroups.body;
                        allGroups.body.forEach((group) => gamesCounter += group.games.length);
                        groupsField.innerHTML = `<b>${groupsCounter.length}</b> Group Registered`
                    } else {
                        groupsField.innerHTML = `<b>0</b> Group Registered`
                    }
                }
                gamesField.innerHTML = `Watched <b>${gamesCounter}</b> Games`
            } else {
                return Promise.reject(allGroups.error);
            }
        })
        .catch(error => alert(error));

        const txtName = document.querySelector('#groupName');
        const txtDescription = document.querySelector('#groupDesc');
        const createButton = document.querySelector('#createButton');
        createButton.onclick = () => {
            const groupName = txtName.value;
            const groupDesc = txtDescription.value;
            if (groupName.length === 0 || groupName.length >= 10) {
                alert('Group Name invalid');
                return;
            }
            if (groupDesc.length === 0) {
                alert('Group Description is empty');
                return;
            }
            return api.createGroup(groupName, groupDesc, currentUser)
            .then(response => {
                if (!response.error) {
                    alert(`New Group ${groupName} successfully created`)
                    run(); //error
                } else {
                    return Promise.reject(response.error);
                }
            }).catch(error => {
                alert(error);
            })
        }
    }
}
