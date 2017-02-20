//import { Accounts } from '../api/tasks.js';

import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import './loginform.html';
if (Meteor.isClient) {

Template.loginform.events({

'click .toggle': function () {
      $('.container').stop().addClass('active');
    },


'click .close': function(){
  $('.container').stop().removeClass('active');
},

'submit .signup'(event) {

      event.preventDefault();

      var emailVar = event.target.email.value;
    var passwordVar = event.target.password.value;
    var nameVar = event.target.name1.value;

    console.log("u r here");


//  email: emailVar, password: passwordVar

      Accounts.createUser({email: emailVar, password: passwordVar, username: nameVar}, function(err) {
  if (err)
    console.log(err);
  else
    console.log('success!');
  //  return user;
});



      console.log("u r in register");
      Router.go('/');
    },

'submit .login'(event) {
        event.preventDefault();
        var emailVar = event.target.email.value;
      var passwordVar = event.target.password.value;
    Meteor.loginWithPassword(emailVar, passwordVar);
console.log("u r in login");
Router.go('/');
    },

});

Template.settings.events({
    'click .logout': function(event) {
      event.preventDefault();
      Meteor.logout();
    }
  });


}
