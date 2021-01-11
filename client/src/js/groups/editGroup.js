const api = require('../covida-api.js');
const auth = require('../auth.js');
const global = require('../global.js');
const { create } = require('handlebars');

const handlers = global.handlebars;

module.exports = {

    getView: () => {
        
        let currentUser = auth.getCurrentUser();
        return `<h1> Edit ${currentUser}'s Groups</h1>
            <div id='editGroup'>
               
            </div>
            <div class="form-group row">
                        <label for="groupName" class="col-sm-2 col-form-label">Name</label>
                        <div class="col-sm-10">
                            <input type="text" class="form-control" id="newGroupName" placeholder="Enter Group Name" required>
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="groupDesc" class="col-sm-2 col-form-label">Description</label>
                        <div class="col-sm-10">
                            <input type="text" class="form-control" id="newGroupDesc" placeholder="Enter Group Description" required>
                        </div>
                    </div>
                    <div class="form-group row">
                        <div class="col text-center">
                            <button id="editButton" class="btn btn-primary">Edit</button>
                        </div>
                    </div>
            `},

    authenticationRequired: true,

    run: (req) => {
        const newtxtName = document.querySelector('#newGroupName');
        const newtxtDescription = document.querySelector('#newGroupDesc');
        const editButton = document.querySelector('#editButton');
        
        editButton.onclick= () => 
        {
            const groupName = newtxtName.value;
            const groupDesc = newtxtDescription.value;
            if (groupName.length === 0) {
                alert('Group Name invalid');
                return;
            }
            if (groupDesc.length === 0) {
                alert('Group Description is empty');
                return;
            }
            console.log(req.args[0]);
            return api.editGroup(req.args[0],groupName,groupDesc)
            .then(response => {
                if (!response.error) {

                    alert(`Update Group ${groupName} successfully created`)
                    location.assign(`#groups`)
                } else {
                    return Promise.reject(response.error);
                }
            }).catch(error => {
                alert(error);
            })
    
        }
    }
}
