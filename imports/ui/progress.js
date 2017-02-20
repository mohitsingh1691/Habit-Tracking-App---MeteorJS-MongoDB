import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import Highcharts from 'highcharts';

import { Tasks } from '../api/tasks.js';
import './task.js';
import './layout.js';
import './progress.html';

Template.progress.onCreated(function bodyOnCreated() {
  //this.state = new ReactiveDict();
  Meteor.subscribe('tasks');


});


Template.progress.helpers({

createChart2() {
 // Gather data:
 //get all dates
 var seriesDate = [];
 var today = new Date();
 today.setHours(0,0,0,0);
 var twentyAgoDate = new Date();
 var twentyAgoDate1 = new Date(today.getTime() - 1728000000);
 console.log(twentyAgoDate1);
 twentyAgoDate.setDate(today.getDate() - 20);
 twentyAgoDate.setDate(today.getDate() - 20);
 twentyAgoDate.setHours(0,0,0,0);
 var currentUserId = Meteor.userId();

 Tasks.find({createdBy: currentUserId}).forEach(function(doc)
 {
   var arr2 = doc.checkedAt;
   arr2.forEach(function(val2){
    if((val2.getTime() <= today.getTime()) && (val2.getTime() > twentyAgoDate1.getTime())){
      var dataPoint = val2;
      console.log(val2.getTime());
      seriesDate.push(dataPoint);
    }

    });
 });

 /*
  Tasks.find({createdBy: currentUserId, checkedAt:{$gte: tenAgoDate, $lt: today}}).map(function(x)
 {
      var dataPoint = x.checkedAt;
      seriesDate.push(dataPoint);

   });
 //

*/
//Get the score values
var scoreData = [];
/*
Tasks.find({createdBy: currentUserId, checkedAt:{$gte: tenAgoDate, $lt: today}}).map(function(y)
{
   var dataPoint1 = Number(y.val);
   scoreData.push(dataPoint1);

});
*/

Tasks.find({createdBy: currentUserId}).forEach(function(doc)
{
  var arr1 = doc.checkedAt;
  arr1.forEach(function(val1){
   if((val1.getTime() <= today.getTime()) && (val1.getTime() > twentyAgoDate1.getTime())){
     var dataPoint1 = Number(doc.val);
     console.log(doc.val);
     scoreData.push(dataPoint1);
   }

   });
});







var spd = [];

for(var i = 0; i <= 20; i++) {
  spd.push(0);
}

for(var i = 0; i < seriesDate.length; i++) {
var dtdy = new Date();
//dtdy.setHours(4,0);
  var day = 20 - (dtdy.getDate() - seriesDate[i].getDate());
  var amount = scoreData[i];
  console.log(day)
  if(spd[day]) {
    spd[day] += amount;
  } else
  spd[day] = amount;
}

spd = spd.slice(1);


//
//console.log(scoreData, seriesDate);

       tasksData = [{
           y: seriesDate,
           name: "date"
        }, {
            y: scoreData,
//     y: filterdate,
            name: "score"
        }];
//console.log(spd)

var dates = []

for(var i = 0; i < 20; i++) {
  var d = new Date();

  d.setDate(d.getDate() - (19  - i));
  dates.push(d);
}

 // Use Meteor.defer() to create chart after DOM is ready:
 Meteor.defer(function() {
   // Create standard Highcharts chart with options:
   if(seriesDate.length > 0)
   {
   Highcharts.chart('chartcontainer', {
      chart:{
                 type: 'column',

},
     title: {
                 text: 'HabitU Last 20 Days Progress'
             },
             credits: {
            enabled: false
        },
     xAxis: {
       title: {
                           text: 'Date',
                       },

     categories: dates,
     labels: {
                formatter: function () {
                   return Highcharts.dateFormat('%a %e %b', this.value);
                 }
               }
       },
yAxis: {
  title: {
                      text: 'Score',
                  },
},
     series: [{

name: 'Day Score',


       data: spd
     }],

   });
 }
 else
 console.log("dummy")

 });

},

});

Template.progress.events({

  'click .back-to-layout'(event) {

    event.preventDefault();


  Router.go('/');

  },



});
