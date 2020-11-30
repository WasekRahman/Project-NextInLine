/* ---------------------------------------------------
   Navigation bar
----------------------------------------------------- */
$(document).ready(function () {

    $('#sidebarCollapse').on('click', function () {
        $('#sidebar').toggleClass('active');
    });

});
/* ---------------------------------------------------
   header
----------------------------------------------------- */

var dashboardInfo;
var dashboardEvent;
var dashboardDoors;

function initDropdown(initValues)
{
    var  buildingDropdown = document.getElementById('buildingName');
    for(var i=0; i<initValues.length; i++){
        var cname = document.createElement("BUTTON");
        cname.className = "dropdown-item dropdown-list";
        cname.innerHTML = initValues[i].name;
		cname.id = i;
		cname.onclick = function(){callInitDashBoardInfo(event)};
        buildingDropdown.appendChild(cname);
	}
	//$('#0').click("", 0);
	initDashboardInfo(0);
}
function callInitDashBoardInfo(event)
{
	var n = event.target.id;
	initDashboardInfo(n);
}
function initDashboardInfo(n)
{
	var serviceRate = dashboardInfo[n].maxthroughput;
	var entranceRate=0;
	var hoursDist=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
	for(var k=0;k<dashboardEvent.length;k++){
		for(var j=0;j<dashboardDoors.length;j++){
			if(dashboardDoors[j]._id===dashboardEvent[k].doorID && dashboardDoors[j].entrance_exit && dashboardInfo[n]._id===dashboardDoors[j].buildingID){
				entranceRate++;
				hoursDist[new Date(dashboardEvent[k].timestamp).getHours()]++;
			}
		}
	}
	console.log(hoursDist);
	var rho = entranceRate / serviceRate;
	var l = (rho*rho)/(1-rho);
	var wq = l / entranceRate;
	var w = wq + 1/serviceRate;

	var gateDiv = "";

	for(var j=0;j<dashboardDoors.length;j++){
		if(dashboardDoors[j].buildingID===dashboardInfo[n]._id){
			gateDiv += "<div class=\"col dashboardBox m-1\"><div class=\"row gateStyle pl-0 justify-content-center \">";
			gateDiv += dashboardDoors[j].name+(dashboardDoors[j].entrance_exit?":&nbsp &nbspEntrance":":&nbsp &nbspExit");
			gateDiv += "</div> <div class=\"row gateStyle\">";
			gateDiv += "Sensor1 :&nbsp &nbsp &nbsp"+dashboardDoors[j].sensor1comport;
			gateDiv += "</div> <div class=\"row gateStyle\">";
			gateDiv += "Sensor2 :&nbsp &nbsp &nbsp"+dashboardDoors[j].sensor2comport;
			gateDiv += "</div> <div class=\"row gateStyle pb-5\">";
			var eventTotal=0;
			for(var k=0;k<dashboardEvent.length;k++){
				if(dashboardEvent[k].doorID===dashboardDoors[j]._id){
					eventTotal++;
				}
			}
			gateDiv += "Events :&nbsp &nbsp &nbsp &nbsp"+eventTotal;
			gateDiv += "</div> </div>";
			$('#gates').html(gateDiv);
		}
	}
	$('#companyName').html(dashboardInfo[n].name);
	createChart(dashboardInfo[n].capacity, dashboardInfo[n].occupancy);
	//$('#doughnutChart').data[1] = dashboardInfo[n].capacity;
	$('#status').html("Status: " + (dashboardInfo[n].capacity<dashboardInfo[n].occupancy ? "Over capacity" : (dashboardInfo[n].capacity-dashboardInfo[n].occupancy+" additional people may fit.") + "<br />"));
	$('#max').html("Max Throughput: " + serviceRate + " customers/hour<br />");
	$('#arrivalrate').html("Avg Arrival Rate: "+entranceRate+" customers/hour<br />");
	$('#time').html("Estimated Wait Time: "+Math.round(w*60,0)+"mins<br />");
	$('#capacity').html("Capacity: "+dashboardInfo[n].capacity+"<br />");
	$('#occupancy').html("Occupancy: "+dashboardInfo[n].occupancy+"<br />");
	var logbyhour="<small><ul>";
	for(var h=8;h<17;h++){
		logbyhour+="<li>"+h+":00 - "+hoursDist[h]+" entrances";
	}
	logbyhour+="</ul></small>"
	$('#logbyhour').html(logbyhour);
}
$(document).ready(function(){
	$.ajax({url: "https://project-next-in-line.herokuapp.com/event/"}).done(function (events){
		$.ajax({url: "https://project-next-in-line.herokuapp.com/door/"}).done(function (doors){
			$.ajax({url: "https://project-next-in-line.herokuapp.com/dashboard/"}).done(function (data){
				dashboardEvent = events;
				dashboardDoors = doors;
                dashboardInfo = data;
                console.log(dashboardInfo);
                initDropdown(data);
                // initDashboardInfo(data[0]);

			});
		});
	});
});
/* ---------------------------------------------------
  Plug in to show tooltip on the chart
----------------------------------------------------- */
Chart.pluginService.register({
	beforeRender: function(chart) {
	  if (chart.config.options.showAllTooltips) {
		// create an array of tooltips
		// we can't use the chart tooltip because there is only one tooltip per chart
		chart.pluginTooltips = [];
		chart.config.data.datasets.forEach(function(dataset, i) {
		  chart.getDatasetMeta(i).data.forEach(function(sector, j) {
			chart.pluginTooltips.push(new Chart.Tooltip({
			  _chart: chart.chart,
			  _chartInstance: chart,
			  _data: chart.data,
			  _options: chart.options.tooltips,
			  _active: [sector]
			}, chart));
		  });
		});

		// turn off normal tooltips
		chart.options.tooltips.enabled = false;
	  }
	},
	afterDraw: function(chart, easing) {
	  if (chart.config.options.showAllTooltips) {
		// we don't want the permanent tooltips to animate, so don't do anything till the animation runs atleast once
		if (!chart.allTooltipsOnce) {
		  if (easing !== 1)
			return;
		  chart.allTooltipsOnce = true;
		}

		// turn on tooltips
		chart.options.tooltips.enabled = true;
		Chart.helpers.each(chart.pluginTooltips, function(tooltip) {
		  tooltip.initialize();
		  tooltip.update();
		  // we don't actually need this since we are not animating tooltips
		  tooltip.pivot();
		  tooltip.transition(easing).draw();
		});
		chart.options.tooltips.enabled = false;
	  }
	}
  });
/* ---------------------------------------------------
  Plug in to show tooltip on the chart
----------------------------------------------------- */
Chart.pluginService.register({
	beforeRender: function(chart) {
	  if (chart.config.options.showAllTooltips) {
		// create an array of tooltips
		// we can't use the chart tooltip because there is only one tooltip per chart
		chart.pluginTooltips = [];
		chart.config.data.datasets.forEach(function(dataset, i) {
		  chart.getDatasetMeta(i).data.forEach(function(sector, j) {
			chart.pluginTooltips.push(new Chart.Tooltip({
			  _chart: chart.chart,
			  _chartInstance: chart,
			  _data: chart.data,
			  _options: chart.options.tooltips,
			  _active: [sector]
			}, chart));
		  });
		});

		// turn off normal tooltips
		chart.options.tooltips.enabled = false;
	  }
	},
	afterDraw: function(chart, easing) {
	  if (chart.config.options.showAllTooltips) {
		// we don't want the permanent tooltips to animate, so don't do anything till the animation runs atleast once
		if (!chart.allTooltipsOnce) {
		  if (easing !== 1)
			return;
		  chart.allTooltipsOnce = true;
		}

		// turn on tooltips
		chart.options.tooltips.enabled = true;
		Chart.helpers.each(chart.pluginTooltips, function(tooltip) {
		  tooltip.initialize();
		  tooltip.update();
		  // we don't actually need this since we are not animating tooltips
		  tooltip.pivot();
		  tooltip.transition(easing).draw();
		});
		chart.options.tooltips.enabled = false;
	  }
	}
  });
/* ---------------------------------------------------
   Doughnut chart
----------------------------------------------------- */
function createChart(capacityData, occupancyData)
{
	var ctxD = document.getElementById("doughnutChart").getContext('2d');
	var myLineChart = new Chart(ctxD, {
		type: 'doughnut',
		data: {
			datasets: [{
				data: [capacityData, occupancyData],
				backgroundColor: ["#F7464A", "#46BFBD"],
				hoverBackgroundColor: ["#FF5A5E", "#5AD3D1"]
			}],
			labels: ["Capacity", "Occupancy"],
		},
		options: {
			responsive: true,
			aspectRatio: 1.4,
			showAllTooltips: true
		}
	});
}
