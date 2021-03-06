function UserServiceClient() {
    this.createUser = createUser;
    this.findAllUsers = findAllUsers;
    this.deleteUser = deleteUser;
    this.findUserById = findUserById;
    this.updateUser = updateUser;
    this.register = register;
    this.loadProfile = loadProfile;
    this.logout = logout;
    this.login = login;
    this.findByUsername = findByUsername;
    this.url = '/api/';
    var self = this;

    function logout(){
        return fetch('/api/logout', {
            method: 'post',
            credentials: 'same-origin'});
    }

    function findUserById(userId) {
        return fetch(self.url + 'user/' + userId)
            .then(function (response) {
                return response.json();
            });
    }

    function login(username, password) {
        return fetch('/api/login', {
            method: 'post',
            credentials: 'same-origin',
            body: JSON.stringify({username: username, password: password}),
            headers: {'content-type': 'application/json'}
        }).then(function(response){
            if (!response.ok) {
                throw Error(response.statusText);
            }
            window.location.href= "/jquery/components/profile/profile.template.client.html"
        }).catch(function(error) {
            console.log(error);
            alert("Login Failed!")
        });
    }

    function findAllUsers() {
        return fetch(self.url + 'user/').then(function (response) {
            return response.json();
        });
    }

    function findByUsername(username) {
        return fetch('/api/user?username=' + username).then(function (response) {
            return response.json();
        });
    }

    function createUser(user) {
        return fetch(self.url + 'user/', {
            method: 'post',
            body: JSON.stringify(user),
            headers: {'content-type': 'application/json'}
        });
    }

    function register(user) {
        return fetch('/api/register' , {
            method: 'post',
            credentials: 'same-origin',
            body: JSON.stringify(user),
            headers: {'content-type': 'application/json'}
        }).then(function(response){
            if (!response.ok) {
                throw Error(response.statusText);
            }
            window.location.href= "../profile/profile.template.client.html"
        }).catch(function(error) {
            console.log(error);
            alert("Username taken!")
        });
        }

    function loadProfile() {
        return fetch('/api/profile', {credentials: 'same-origin'})
            .then(function (response) {
                return response.json();
            });
    }

    function deleteUser(userId) {
        return fetch(self.url + 'user/' + userId, {
            method: 'delete'
        })
    }

    function updateUser(userId, user) {
        return fetch(self.url + 'user/' + userId, {
            method: 'put',
            body: JSON.stringify(user),
            headers: {'content-type': 'application/json'}
        }).then(function(response) {
            if (!response.ok) {
                throw new Error('Network response was not ok.');
            }
            alert("Update Completed!");
        }).catch(function(error) {
            alert("Wrong user ID!");
        });
    }


}
