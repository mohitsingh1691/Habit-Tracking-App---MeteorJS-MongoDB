



Template.charts.onRendered(function() {
    // Get the context of the canvas element we want to select

    var ctx5 = document.getElementById("myChart5").getContext("2d");
/*
    var data6 = {
        labels: ["January", "February", "March", "April", "May", "June", "July"],
        datasets: [{
            data: [28, 48, 40, 19, 86, 27, 90]
        }]
      };



    var cur = Tasks.find();

    collData = [];
    cur.forEach(function(cat){
        collData.push([cat.score]);
    });

    collLabel = [];
    cur.forEach(function(cat){
        collLabel.push([cat.score]);
    });

    var data4 = {
        labels: collLabel,
        datasets: [{
            data: collData
        }]
    };







    // Set the options
    var options = {

        ///Boolean - Whether grid lines are shown across the chart
        scaleShowGridLines: true,

        //String - Colour of the grid lines
        scaleGridLineColor: "rgba(0,0,0,.05)",

        //Number - Width of the grid lines
        scaleGridLineWidth: 1,

        //Boolean - Whether to show horizontal lines (except X axis)
        scaleShowHorizontalLines: true,

        //Boolean - Whether to show vertical lines (except Y axis)
        scaleShowVerticalLines: true,

        //Boolean - Whether the line is curved between points
        bezierCurve: true,

        //Number - Tension of the bezier curve between points
        bezierCurveTension: 0.4,

        //Boolean - Whether to show a dot for each point
        pointDot: true,

        //Number - Radius of each point dot in pixels
        pointDotRadius: 4,

        //Number - Pixel width of point dot stroke
        pointDotStrokeWidth: 1,

        //Number - amount extra to add to the radius to cater for hit detection outside the drawn point
        pointHitDetectionRadius: 20,

        //Boolean - Whether to show a stroke for datasets
        datasetStroke: true,

        //Number - Pixel width of dataset stroke
        datasetStrokeWidth: 2,

        //Boolean - Whether to fill the dataset with a colour
        datasetFill: true,

        //String - A legend template
        legendTemplate: "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].strokeColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>"

    };

    var options2 = {
        //Boolean - Whether to show lines for each scale point
        scaleShowLine: true,

        //Boolean - Whether we show the angle lines out of the radar
        angleShowLineOut: true,

        //Boolean - Whether to show labels on the scale
        scaleShowLabels: false,

        // Boolean - Whether the scale should begin at zero
        scaleBeginAtZero: true,

        //String - Colour of the angle line
        angleLineColor: "rgba(0,0,0,.1)",

        //Number - Pixel width of the angle line
        angleLineWidth: 1,

        //String - Point label font declaration
        pointLabelFontFamily: "'Arial'",

        //String - Point label font weight
        pointLabelFontStyle: "normal",

        //Number - Point label font size in pixels
        pointLabelFontSize: 10,

        //String - Point label font colour
        pointLabelFontColor: "#666",

        //Boolean - Whether to show a dot for each point
        pointDot: true,

        //Number - Radius of each point dot in pixels
        pointDotRadius: 3,

        //Number - Pixel width of point dot stroke
        pointDotStrokeWidth: 1,

        //Number - amount extra to add to the radius to cater for hit detection outside the drawn point
        pointHitDetectionRadius: 20,

        //Boolean - Whether to show a stroke for datasets
        datasetStroke: true,

        //Number - Pixel width of dataset stroke
        datasetStrokeWidth: 2,

        //Boolean - Whether to fill the dataset with a colour
        datasetFill: true,

        //String - A legend template
        legendTemplate: "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].strokeColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>"

    }
*/

    var data5 = [
    {
        value: random(),
        color:"#F7464A",
        highlight: "#FF5A5E",
        label: "Monday"
    },
    {
        value: random(),
        color: "#46BFBD",
        highlight: "#5AD3D1",
        label: "Tuesday"
    },
    {
        value: random(),
        color: "#46BFBD",
        highlight: "#5AD3D1",
        label: "Wednesday"
    },
    {
        value: random(),
        color: "#46BFBD",
        highlight: "#5AD3D1",
        label: "Thursday"
    },
    {
        value: random(),
        color: "#FDB45C",
        highlight: "#FFC870",
        label: "Friday"
    }
    ]



    // And for a doughnut chart
    var myDoughnutChart = new Chart(ctx5).Doughnut(data5,{
        animateScale: true
    });
});




function random() {
   return Math.floor((Math.random() * 100) + 1);

}
