
import { Tasks } from '../api/tasks.js';

import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';


import './edithabit.html';
import './task.js';



Template.edithabit.onCreated(function bodyOnCreated() {
  //this.state = new ReactiveDict();
  Meteor.subscribe('tasks');


});

Template.edithabit.events({

  'submit .edit-task'(event) {
    // Prevent default browser form submit
    event.preventDefault();

    // Get value from form element
    var target = event.target;
  var text2 = target.text1.value;
   var val = target.myRadio.value;

console.log("in the js file");
    // Insert a task into the collection
    Meteor.call('tasks.edit',Router.current().params.id, text2, val);

    // Clear form
    target.text1.value = '';
Router.go('home');
  },



    'click .delete'() {
      Meteor.call('tasks.remove', Router.current().params.id);
//Router.go('/');
    },


});

Template.edithabit.helpers({

        cur_value:() => {
          //meteor.call('')
          return Tasks.findOne(Router.current().params.id).text

        },

chec(){
var val1 =  Tasks.findOne(Router.current().params.id).val;
console.log(val1);

  console.log($("input[name=myRadio][id="+val1+"]").attr('checked', true));
  console.log($("input[name=myRadio][id="+val1+"]").attr('checked', true));
//return $("input[name=myRadio][value=" + val1 + "]").attr('checked', true)

//return $('input:radio[name=myRadio][value="5"]').attr('checked', true);
//$("input[name=myRadio][value=" + val1 + "]").prop('checked',true);


},

});
