import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import Highcharts from 'highcharts';

import { Tasks } from '../api/tasks.js';
import './task.js';
import './layout.html';
import './addhabit.js';
import './recommended.js';
import './edithabit.js';
import './progress.html';
import './progress.js';



Template.layout.onCreated(function bodyOnCreated() {
  this.state = new ReactiveDict();
  Meteor.subscribe('tasks');

});


Template.layout.helpers({
  tasks() {
    const instance = Template.instance();
    var currentUserId = Meteor.userId();
  //  if (instance.state.get('hideCompleted')) {
      // If hide completed is checked, filter tasks
  //    return Tasks.find({ createdBy: currentUserId, checked: { $ne: true } }, { sort: { createdAt: -1 } });
  //  }
/*
     if(!Session.get("singleDate")) {
      var date1 = new Date();
    var next1 = new Date();
      next1.setUTCDate(next1.getUTCDate() + 1)
    //  console.log(next)
      return Tasks.find({ createdBy: currentUserId, checkedAt:{$gte: date1, $lt:next1}}, { sort: { createdAt: -1 }})

    }
*/
    // Otherwise, return all of the tasks
    //return Tasks.find({}, { sort: { createdAt: -1 } }, { createdBy: currentUserId});

    return Tasks.find({ createdBy: currentUserId}, { sort: { createdAt: -1 }});
  },


lessthan:function (a, b)
  {
  return (a <= b);
},



  incompleteCount() {
    return Tasks.find({ checked: { $ne: true } }).count();
  },





/*total daily score
totalscore() {
var total= 0;
//this.total = new ReactiveVar(0);
var yesterday = new Date();
yesterday.setUTCDate(yesterday.getDate() - 1);

yesterday.setHours(4,0);

//console.log(yesterday);
var today = new Date();
//var newDatetdy = new Date(today.getTime() + 240*60000);
today.setHours(4,0);
var nextday = new Date();
nextday.setUTCDate(nextday.getDate() + 1);
nextday.setHours(4,0);
console.log(today);
//console.log(newDatetdy);
  Tasks.find({checkedAt:{$gt: yesterday, $lte: today}}).map(function(doc)
{
console.log("you got this");
//console.log(n1);
 total+=Number(doc.val);

});
return total;

},
*/

displaytodaydate()
{
var tt = new Date();
tt.setHours(0,0,0,0);
if(Session.get("singleDate")  !== 2 && (Session.get("singleDate").getTime() === tt.getTime()))
    {
      return("Today")
    }
      else {
      if(Session.get("singleDate") === 2)
      {
        return("Today")
      }
        else{
          return("")
        }
      }


},


totalscore1() {
var total1= 0;

var currentUserId = Meteor.userId();

if((Session.get("singleDate")) === 2)
{
//  var mm = moment();
  var todaysdate = new Date();
  todaysdate.setHours(0,0,0,0);

  console.log(Session.get("singleDate"));
Tasks.find({createdBy: currentUserId}).forEach(function(doc)
  {
  var arr1 = doc.checkedAt;
  arr1.some(function(val1){
   if(val1.getTime() === todaysdate.getTime()){
  total1+=Number(doc.val);
  console.log(val1);
  console.log(doc.val);
   }

   });

  });
  return total1;
}
else {

var sel_date = Session.get("singleDate");
sel_date.setHours(0);
sel_date.setMinutes(0);
sel_date.setSeconds(0);
var nextday = new Date();
nextday.setDate(sel_date.getDate()+1);
nextday.setHours(0);
nextday.setMinutes(0);
nextday.setSeconds(0);
//var nextday = new Date(nextday1.toISOString());

//nextday.setHours(4,0) ;
//console.log(sel_date);
//console.log(newDatetdy);
//var record1 = Tasks.find({createdBy: currentUserId}, {checkedAt:{$gte: sel_date, $lt: nextday}}, {'checkedAt.$': 1});
//console.log("totaltotal");
console.log(sel_date);
console.log(nextday);
//var chc1 = Tasks.findOne({createdBy: currentUserId}, {checkedAt: { $elemMatch: sel_date}});
//console.log(chc1);
//console.log(nextday);
//var start = moment().startOf('sel_date');
//var start_next = moment().startOf('nextday');


//var chc2 = Tasks.find({createdBy: currentUserId},{
//    checkedAt.getTime: sel_date.getTime
//});

//console.log(chc2);

//var arr1 = record1.checkedAt;
Tasks.find({createdBy: currentUserId}).forEach(function(doc)
{
var arr1 = doc.checkedAt;
arr1.some(function(val1){
 if(val1.getTime() === sel_date.getTime()){
total1+=Number(doc.val);
console.log(val1);
console.log(doc.val);
 }

 });

});
return total1;
}
},


avgdayscore() {
  var avg=0;
  var currentUserId = Meteor.userId();
  var today = new Date();
  today.setHours(0,0,0,0);
  var weekAgoDate = new Date();
  var yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  var nextday = new Date();
  nextday.setDate(nextday.getDate() + 1);

  weekAgoDate.setDate(weekAgoDate.getDate() - 7);
  weekAgoDate.setHours(0,0,0,0);

  Tasks.find({createdBy: currentUserId}).forEach(function(doc)
  {
  var arr1 = doc.checkedAt;
  arr1.forEach(function(val1){
  if((val1.getTime() < today.getTime()) && (val1.getTime() >= weekAgoDate.getTime())){
  avg+=Number(doc.val);
   }

   });

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




//chart 2
createChart2() {
 // Gather data:
 //get all dates
 var seriesDate = [];
 var today = new Date();
 today.setHours(4,0);
 var tenAgoDate = new Date();
 tenAgoDate.setUTCDate(tenAgoDate.getDate() - 10);
 tenAgoDate.setHours(4,0);

  Tasks.find({checkedAt:{$gte: tenAgoDate, $lt: today}}).map(function(x)
 {
      var dataPoint = x.checkedAt;
      seriesDate.push(dataPoint);

   });
 //


//Get the score values
var scoreData = [];
Tasks.find({checkedAt:{$gte: tenAgoDate, $lt: today}}).map(function(y)
{
   var dataPoint1 = Number(y.val);
   scoreData.push(dataPoint1);

});


var spd = [];

for(var i = 0; i <= 10; i++) {
  spd.push(0);
}

for(var i = 0; i < seriesDate.length; i++) {
var dtdy = new Date();
dtdy.setHours(4,0);
  var day = 10 - (dtdy.getDate() - seriesDate[i].getDate());
  var amount = scoreData[i];
  //console.log(day)
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

for(var i = 0; i < 10; i++) {
  var d = new Date();

  d.setDate(d.getDate() - (9  - i));
  dates.push(d);
}

 // Use Meteor.defer() to create chart after DOM is ready:
 Meteor.defer(function() {
   // Create standard Highcharts chart with options:
   if(seriesDate.length > 0)
   {
   Highcharts.chart('chart', {

     xAxis: {

     categories: dates,
     labels: {
                formatter: function () {
                   return Highcharts.dateFormat('%a %e %b', this.value);
                 }
               }
       },
     series: [{

       type: 'bar',
       data: spd
     }]

   });
 }
 else
 console.log("dummy")

 });

},
//


/*
//dummy
createChart1() {
 // Gather data:



/*
function genDate() {
  var startDate = new Date();
  startDate.setUTCDate(startDate.getDate() - 7);
  var count1=0;
  var d = new Date(+startDate),
      dates = [d];
  for (var i=0; i<count1; i++) {
    d = new Date(+d);
    d.setHours(d.getHours() + 10);
    dates.push(d);
  }
  return dates;
};
*/
//



/*

var work = Tasks.find({createdAt:{$gte: weekAgoDate, $lt: today}, createdAt: 1, val: 1}).fetch().map(function(x)
{
  {return [x.createdAt, x.val]}
});

*/

/*
 var allTasks = Tasks.find({}).count(),
       incompleteTask = Tasks.find({checked: {$ne: true}}).count(),
   tasksData = [{
           y: incompleteTask ,
           name: "Incomplete"

        },{

            y: [seriesData],
//     y: filterdate,
            name: "date"
        }];


 // Use Meteor.defer() to craete chart after DOM is ready:
 Meteor.defer(function() {
   // Create standard Highcharts chart with options:
   Highcharts.chart('chart', {
    /*
     plotBackgroundColor: null,
           plotBorderWidth: null,
     xAxis: {
       /*type: 'datetime',
             dateTimeLabelFormats: {
                day: '%d %b %Y'    //ex- 01 Jan 2016
             }

type: 'datetime',
    labels: {
        formatter: function() {
            var monthStr = Highcharts.dateFormat('%d %b', this.value);
            return monthStr;
        }
    }
    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
},
     series: [{

       type: 'column',
       data: tasksData

     }]

     //dummyyyy
     title: {
            text: this.userId + "'s views"
        },
      xAxis: {

//categories: seriesData,

  //  type: 'datetime',
  //  dateTimeLabelFormats: {
  //           day: '%d %b %Y'    //ex- 01 Jan 2016
  //        }
  categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
       'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        },


  //  xAxis: {
  //  type: 'datetime',
  //  labels: {
  //      formatter: function() {
    //        var monthStr = Highcharts.dateFormat(' %d %b',today);
    //        return monthStr;
    //    }
  //  }
//},

//xAxis: {
//      text: 'Days'
//  },

  //type: 'datetime',
  //      dateTimeLabelFormats: {
  //         day: '%d %b %Y'    //ex- 01 Jan 2016
    //    }
  //  labels: {
    //           formatter: function () {
    //               return Highcharts.dateFormat('%a %e %b', this.value);
    //           }
  //           }

//},

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
    //    data: scoreData
    //    },
      //  {
    //    data: work
  //        pointStart: Date.UTC(2016, 0, 1),
    //      pointInterval: 3 * 24 * 3600 * 1000
//data: [seriesData]

        }]

   });

 });

},
*/






/*


datetimepicker(){
    var picker = new Pikaday({
        field: document.getElementById('datepicker'),
        format: 'D MMM YYYY',
        inline: true,
        sideBySide: true

        onSelect: function() {
            console.log(this.getMoment().format('Do MMMM YYYY'));
        var capturedate = this.getMoment().format('Do MMMM YYYY');
        console.log(capturedate);
        }

//    });

},
*/

//changing colors

});

Template.layout.events({
// 'click .pickaday' (){
//   console.log("pcdvdgsdfg")
//   var picker = new Pikaday(
//       {
//           field: document.getElementById('datepicker'),
//           firstDay: 1,
//           minDate: new Date(2016, 0, 1),
//           maxDate: new Date(2017, 12, 31),
//           yearRange: [2016,2017],
//          onSelect: function() {
//               var date = document.createTextNode(this.getMoment().format('Do MMMM YYYY') + ' ');
//              document.getElementById('selected').appendChild(date);
//           }
//       });
//
//     //  picker.setMoment(moment().dayOfYear(366));
//   },

  'input #datepicker' : () => {
    console.log("picked")
  },



});

Template.layout.rendered = function() {
//var todaysdate = moment().toDate();
//  todaysdate.setHours(0);
//  todaysdate.setMinutes(0);
//  todaysdate.setSeconds(0);

var xyz = 2;
  Session.set("singleDate", xyz);
  //console.log("whats is today's date");
  //console.log(todaysdate);
  var picker = new Pikaday(
       {
         field: document.getElementById('datepicker'),
    //    trigger: document.getElementById('datepicker-button'),
            firstDay: 0,
            minDate: new Date(2016, 1, 1),
            maxDate: new Date(2018, 12, 31),
            yearRange: [2016,2018],
          //  setdefaultDate: todaysdate,




           onSelect: function() {
          //   console.log(this.getMoment()._d)
                //var date = document.createTextNode(this.getMoment().format('Do MMMM YYYY') + ' ');
                //console.log(date);
               //document.getElementById('selected').appendChild(date);

              var tr =  Session.set("singleDate", this.getMoment()._d);
               console.log(new Date());


            }

        });



      //  picker.setMoment(moment().dayOfYear(366));
}
