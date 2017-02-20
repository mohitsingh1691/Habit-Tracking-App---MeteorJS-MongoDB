Template.chart.onCreated(function() {
  chart1 = this.subscribe('chart1');
});

  /*global drawchart */
  drawchart = function(datavalues,datalabels){

     var data = {
    labels: datalabels,
    datasets: [
        {
            label: "My First dataset",
            fillColor: "rgba(220,220,0,0.2)",
            strokeColor: "rgba(220,220,220,1)",
            pointColor: "rgba(220,220,220,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(220,220,220,1)",
            data: datavalues,

        },

    ]
};
   var ctx = $("#myChart").get(0).getContext("2d");
    new Chart(ctx).Line(data);
  };


Template.chart.rendered = function(){

      Tracker.autorun(function () {
          if (chart1.ready()) {
                var budgetdata = Budget.find();
                var datavalues=[];
                var datalabels=[];
                budgetdata.forEach(function(option) {

                    datavalues.push(option.value);
                    datalabels.push(option.itemname)
                });

                drawchart(datavalues,datalabels);
         }

        });

    };
