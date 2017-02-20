
import { Tasks } from '../api/tasks.js';

import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';


/*import './addhabit.js';*/
import './recommended.html';


Template.recommended.events({


    'submit .new-task1'(event) {
      // Prevent default browser form submit
      event.preventDefault();

      // Get value from form element
      const target = event.target;
      const text = target.text.value;
     const val = 5;
var currentUserId = Meteor.userId();
      // Insert a task into the collection
      Meteor.call('tasks.insert',this._id, text,val, currentUserId);

      // Clear form
      target.text.value = '';
    target.style.display="none";


},



})
