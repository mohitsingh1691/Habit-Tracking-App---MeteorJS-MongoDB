import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

//import Highcharts from 'highcharts';

import { Tasks } from '../api/tasks.js';
import './task.js';
import './layout.html';
import './addhabit.js';
import './recommended.js';
import './edithabit.js';


Template.layout.onCreated(function bodyOnCreated() {
  this.state = new ReactiveDict();
  Meteor.subscribe('tasks');

});


Template.layout.helpers({
  tasks() {
    const instance = Template.instance();
    if (instance.state.get('hideCompleted')) {
      // If hide completed is checked, filter tasks
      return Tasks.find({ checked: { $ne: true } }, { sort: { createdAt: -1 } });
    }
    // Otherwise, return all of the tasks
    return Tasks.find({}, { sort: { createdAt: -1 } });
  },


  incompleteCount() {
    return Tasks.find({ checked: { $ne: true } }).count();
  },


totalscore(){
var total=0;
  Tasks.find({checked: { $ne: false } }).map(function(doc)
{

 total+=Number(doc.val);

});
return total;

},



avgdayscore() {
  var avg=0;
  var today = new Date();
  var weekAgoDate = new Date();
  weekAgoDate.setUTCDate(weekAgoDate.getDate() - 7);
  Tasks.find({createdAt:{$gte: weekAgoDate, $lt: today},checked:{ $ne: false }}).map(function(doc)
{

 avg+=Number(doc.val);

});
return (Math.ceil((avg/7)*10)/10);

},


last7dayscore(){
  var tot=0;
  var today = new Date();
  var weekAgoDate = new Date();
  weekAgoDate.setUTCDate(weekAgoDate.getDate() - 7);
  Tasks.find({createdAt:{$gte: weekAgoDate, $lt: today},checked:{ $ne: false }}).map(function(doc)
{
 tot+=Number(doc.val);
});
return tot;
},


filterdate() {
var today = new Date();
var weekAgoDate = new Date();
weekAgoDate.setUTCDate(weekAgoDate.getDate() - 7);
return Tasks.find({ createdAt:{$gte: weekAgoDate, $lt: today}});
},

filterdate1() {
var today = new Date();
var weekAgoDate = new Date();
weekAgoDate.setUTCDate(weekAgoDate.getDate() - 7);
return Tasks.find({ createdAt:{$gte: weekAgoDate, $lt: today}},{createdAt:1});
},



filterdateDiv(){
        return Session.get('filterd')
},


  createChart() {
   // Gather data:
   var allTasks = Tasks.find().count(),
         incompleteTask = Tasks.find({checked: {$ne: true}}).count(),
         tasksData = [{
             y: incompleteTask,
             name: "Incomplete"
          }, {
              y: allTasks - incompleteTask,
  //     y: filterdate,
              name: "Complete"
          }];
   // Use Meteor.defer() to craete chart after DOM is ready:
   Meteor.defer(function() {
     // Create standard Highcharts chart with options:
     Highcharts.chart('chart', {
       series: [{
         type: 'bar',
         data: tasksData
       }]
     });
   });
 },




//dummy
createChart1() {
 // Gather data:

//
var seriesDate = [];
var today = new Date();
var weekAgoDate = new Date();
weekAgoDate.setUTCDate(weekAgoDate.getDate() - 10);
//  var reportData = Tasks.find({});
  var reportData = Tasks.find({createdAt:{$gte: weekAgoDate, $lt: today}}).getdate();
reportData.forEach(function(x) {
     var dataPoint = [x.createdAt];
     seriesData.push(dataPoint);

  });

var scoreData = [];
var capture_score = Tasks.find({createdAt:{$gte: weekAgoDate, $lt: today}});
capture_score.forEach(function(x) {
   var dataPoint1 = [x.val];
   scoreData.push(dataPoint1);
});


 // Use Meteor.defer() to craete chart after DOM is ready:
 Meteor.defer(function() {
   // Create standard Highcharts chart with options:
   Highcharts.chart('chart', {

     //dummyyyy
     title: {
            text: this.userId + "'s views"
        },
      xAxis: {
         categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
              'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
             },

        yAxis: {

            plotLines: [{
                value: 0,
                width: 1,
                color: '#808080'
            }]
        },
        legend: {
            enabled: true,
            floating: true,
            verticalAlign: 'bottom',
            align:'center',
            y:40
        },
        series: [{
            name: 'Habits',
        data: [3.9, 4.2, 5.7, 8.5, 11.9, 15.2, 17.0, 16.6, 14.2, 10.3, 6.6, 4.8]
                 }]

   });

 });

},



});
