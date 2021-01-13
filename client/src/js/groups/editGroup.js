const api = require('../covida-api.js');
const global = require('../global.js');

module.exports = {

    getView: () => {
        return `<h1 id='titleEdit'></h1>
            <div id='editGroup'>
                <div class="col-lg-6 offset-lg-3">
                    <div class="form-group row">
                        <label for="groupName" class="col-sm-2 col-form-label">Name:</label>
                        <input type="text" class="form-control" id="newGroupName" placeholder="Enter A New Name" required><br><br><br>
                        <label for="groupDesc" class="col-sm-2 col-form-label">Description:</label>
                        <input type="text" class="form-control" id="newGroupDesc" placeholder="Enter A New Description" required><br><br><br>
                        <button id="editButton" class="btn btn-primary">Edit</button>
                    </div>
                </div>
            </div>`
    },

    authenticationRequired: true,

    run: (req) => {
        const titleEdit = document.querySelector('#titleEdit');
        const name = global.formatName("Editing Group " + req.args[0]);
        titleEdit.innerHTML = name;

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
            return api.editGroup(req.args[1], groupName, groupDesc)
            .then(response => {
                if (!response.error) {
                    alert(`Group ${groupName} successfully updated`)
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
