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
	var serviceRate = 100;
	var entranceRate=0;
	for(var k=0;k<dashboardEvent.length;k++){
		for(var j=0;j<dashboardDoors.length;j++){
			if(dashboardDoors[j]._id===dashboardEvent[k].doorID && dashboardDoors[j].entrance_exit){
				entranceRate++;
			}
		}
	}
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
			gateDiv += "</div> <div class=\"row gateStyle\">";
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
	$('#time').html("Wait Time: "+Math.round(w*60,0)+"mins<br />");
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
			responsive: true
		}
	});
}
