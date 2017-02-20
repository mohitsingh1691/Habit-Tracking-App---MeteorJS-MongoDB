

Router.map(function() {

this.route('charts', {path: '/charts'});
this.route('layout', {path: '/layout'});
this.route('addhabit', {path: '/addhabit'});
this.route('loginform', {path: '/login'});
this.route('recommended', {path: '/recommended'});
this.route('home', {path: '/'});
this.route('progress', {path: '/progress'});

this.route('edithabit', {path: '/edithabit/:id'});


});
