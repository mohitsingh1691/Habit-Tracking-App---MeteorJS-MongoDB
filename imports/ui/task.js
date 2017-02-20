import { Tasks } from '../api/tasks.js';

import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import './task.html';
import './edithabit.html';
import './addhabit.js';


Template.task.onCreated(function bodyOnCreated() {
  //this.state = new ReactiveDict();
  Meteor.subscribe('tasks');

});




Template.task.helpers({
  isOwner() {
    return this.owner === Meteor.userId();

  },

  formatDate(date) {
    if(!date) return "";
  return moment(date).format('MM-DD-YYYY');


},



checked(){
  var currentUserId = Meteor.userId();

  var todaysdate = new Date();
    todaysdate.setHours(0,0,0,0);

  console.log(Session.get("singleDate"));
if((Session.get("singleDate")) === 2)
{
var currentUserId = Meteor.userId();
var chc = Tasks.find({checkedAt: {$not: {$size: 0}}});

  var record = Tasks.findOne({_id: this._id, createdBy: currentUserId}, {'checkedAt.$': 1});

  var arr = record.checkedAt;

   var t = arr.some(function(val3){
    console.log("here");
    if(val3.getTime() === todaysdate.getTime()){
      console.log(val3);
      return true;
    }

    });
    return t;

}
else{

  //var isCompleted = this.completed;

  var statuscheck;
  var chc = Tasks.find({checkedAt: {$not: {$size: 0}}});
  console.log(chc);

  console.log(this._id);

  var seldate = Session.get("singleDate");
  console.log(seldate);


  var record = Tasks.findOne({_id: this._id, createdBy: currentUserId}, {'checkedAt.$': 1});

  var arr = record.checkedAt;

   var t = arr.some(function(val3){
    console.log("here");
    if(val3.getTime() === seldate.getTime()){
      console.log(val3);
      return true;
    }

    });
    return t;

}
},


});


Template.task.events({

  'click .toggle-checked'() {
  event.preventDefault();

console.log("in click check");



var mm = moment();
var todaysdate = new Date();
  todaysdate.setHours(0,0,0,0);

console.log(Session.get("singleDate"));
if((Session.get("singleDate")) === 2)
{
  Meteor.call('tasks.setChecked',this._id, todaysdate);
}
else{

  var selected_date = Session.get("singleDate");
  console.log(selected_date);
  selected_date.setHours(0);
  selected_date.setMinutes(0);
  selected_date.setSeconds(0);
//Tasks.update({this._id, createdBy: currentUserId}, { $addToSet: { checkedAt: checkedwhen }, $set: { completed: false } });
Meteor.call('tasks.setChecked',this._id, selected_date);
}
},




'click .delete'(){

/*
swal({
  title: "Are you sure?",
  text: "This will delete all previous entries for this habit",
  type: "warning",
  showCancelButton: true,
  confirmButtonColor: "#DD6B55",
  confirmButtonText: "Yes, delete it!",
  cancelButtonText: "No, cancel!",
  closeOnConfirm: false,
  closeOnCancel: false
},
function(isConfirm){
if (isConfirm) {
    swal("Deleted!", "Your Habit has been deleted.", "success");

  }
else {
    swal("Cancelled", "You wanna track it more :)", "error");
  }
});
*/
Meteor.call('tasks.remove',this._id);
},

  'click .toggle-private'() {
    Meteor.call('tasks.setPrivate', this._id, !this.private);
  },

});
