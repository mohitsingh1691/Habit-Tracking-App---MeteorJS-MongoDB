import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';


export const Tasks = new Mongo.Collection('tasks');
//export const Accounts = new Mongo.Collection('users');

Tasks.allow({
         insert: function () {
         return true;
         },
         update: function () {
         return true;
         },
         remove: function () {
         return true;
         }
         });

if (Meteor.isServer) {
  // This code only runs on the server
  // Only publish tasks that are public or belong to the current user
  Tasks.allow({
      'insert': function (userId,doc) {
        // user and doc checks ,
      //  return true to allow insert
        return true;
      },

      'update': function (userId,doc) {
        // user and doc checks ,
      //  return true to allow insert
        return true;
      }
    });


  Meteor.publish('tasks', function tasksPublication() {
    return Tasks.find({
      $or: [
        { private: { $ne: true } },
        { owner: this.userId },

      ],
    });


  });


}


Meteor.methods({

  'tasks.insert'(taskId, texti, val, currentUserId) {
    check(texti, String);




Tasks.insert({
  taskId: this._id,
      text: texti,
      createdAt: new Date(),
      user: this.userId,
      username: Meteor.user().username,
      email: Meteor.user().emails[0].address,
      score: 10,
      val: val,
      checkedAt: [],
      createdBy: currentUserId,
      completed: false,
    });


},

/* REMOVE TASK */
'tasks.remove'(taskId) {
    check(taskId, String);
var currentUserId = Meteor.userId();
    const task = Tasks.findOne(taskId);

    Tasks.remove(taskId);
  //  Router.go('/');
  },



'tasks.setChecked'(taskId, checkedwhen) {

var currentUserId = Meteor.userId();

//var record_empty = Tasks.findOne({_id: taskId, createdBy: currentUserId}, { checkedAt: { $gt: [] } });
var record = Tasks.findOne({_id: taskId, createdBy: currentUserId});
console.log(record);
var arr = record.checkedAt;
if(arr.length > 0){

console.log(arr);
console.log(checkedwhen);

arr.forEach(function(val2){
if(val2.getTime() === checkedwhen.getTime()){

  console.log("in click check pull");
  console.log(val2.getTime());
  console.log(checkedwhen.getTime());
Tasks.update({_id: taskId, createdBy: currentUserId}, { $pull: { checkedAt: checkedwhen }});
}
else{
   console.log("in click check push");
   console.log(val2.getTime());
   console.log(checkedwhen.getTime());
Tasks.update({_id: taskId, createdBy: currentUserId}, { $addToSet: { checkedAt: checkedwhen }});
 }


 });


}

else{
  Tasks.update({_id: taskId, createdBy: currentUserId}, { $addToSet: { checkedAt: checkedwhen }});
   }




},




'tasks.setPrivate'(taskId, setToPrivate) {
    check(taskId, String);
    check(setToPrivate, Boolean);


  const task = Tasks.findOne(taskId);

Tasks.update(taskId, { $set: { private: setToPrivate}});
  },


'tasks.edit'(taskId, text2, val) {
const task = Tasks.findOne(taskId);

Tasks.update(taskId, { $set: { text: text2, val: val}});


},

});
