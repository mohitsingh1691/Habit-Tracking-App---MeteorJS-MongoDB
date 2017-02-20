
import { Tasks } from '../api/tasks.js';

import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import './addhabit.html';






Template.addhabit.events({

    'submit .new-task'(event) {
      // Prevent default browser form submit
      event.preventDefault();
var currentUserId = Meteor.userId();
      // Get value from form element
      var target = event.target;


  var text = target.text.value;

//var existing1 = findOne({createdBy:currentUserId}, {text: text})
 //if(existing1)
 //{

 //}

     var val = target.myRadio.value;
//sweetAlert("Good job!", "You clicked the button!", "success");
      // Insert a task into the collection
      Meteor.call('tasks.insert',this._id, text, val, currentUserId);

      // Clear form
      target.text.value = '';
Router.go('/');

},

'submit .reco'(event) {

  event.preventDefault();


Router.go('/recommended');

},

})
