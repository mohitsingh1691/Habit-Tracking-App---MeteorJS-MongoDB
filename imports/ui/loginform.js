import { Accounts } from '../api/tasks.js';

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
  console.log("u r here");
      event.preventDefault();

      var emailVar = event.target.email.value;
    var passwordVar = event.target.password.value;
    console.log("u r here");
    Accounts.createUser({
      var emailVar = event.target.email.value;
    var passwordVar = event.target.password.value;
      });
      console.log("u r here");
    },

'submit .login'(event) {
        event.preventDefault();
        var emailVar = event.target.email.value;
      var passwordVar = event.target.password.value;
    Meteor.loginWithPassword(emailVar, passwordVar);
console.log("u r here");
    },








});

Template.settings.events({
    'click .logout': function(event) {
      event.preventDefault();
      Meteor.logout();
    }
  });


}
