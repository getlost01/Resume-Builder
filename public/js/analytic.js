var ChartData = document.querySelector('#visitorDataJson');

if(JSON.parse(ChartData.value)){
var visitorData = JSON.parse(ChartData.value);

document.querySelector('#totalVis').innerHTML = visitorData.count;
document.querySelector('#uniVis').innerHTML = visitorData. uniqueCount;


// ---------------------- OS Chart ---------------------
{
var osData = JSON.parse(visitorData.os);
var xValues = ["MacOS", "Windows", "Linux", "OtherOS"];
var yValues = [osData.MacOS, osData.Windows, osData.Linux, osData.OtherOS];
var barColors = [
  "#ff8566",
  "#34a2ea",
  "#ffce56",
  "#cd1770"
];

new Chart("myChart", {
  type: "pie",
  data: {
    labels: xValues,
    datasets: [{
      backgroundColor: barColors,
      data: yValues
    }]
  },
  options: {
    title: {
      display: true,
      text: "The operating system usage distribution of visitor."
    }
  }
});
}
// ---------------------- registered / unregistered ---------------------
{
var xValues = ["Registered Visitor", "Unregistered Visitor"];
var yValues = [visitorData.regCount, visitorData.unregCount];
var barColors = [
  "#34a2ea",
  "#ffce56"
];

new Chart("myChart1", {
  type: "pie",
  data: {
    labels: xValues,
    datasets: [{
      backgroundColor: barColors,
      data: yValues
    }]
  },
  options: {
    title: {
      display: true,
      text: "The registered / unregistered distribution of visitor."
    }
  }
});
}
// ---------------------- Visitors ---------------------
{
var visCount = JSON.parse(visitorData.weekCount);

var xValues = [];
var xDisplay = [];
var yValues = [];
for(let i=29 ; i>=0 ; --i){
   xDisplay.push(`${new Date(new Date().getTime()-i*24*60*60*1000).getDate()}-${new Date(new Date().getTime()-i*24*60*60*1000).getMonth()}`);
   xValues.push(new Date(new Date().getTime()-i*24*60*60*1000).toISOString().slice(0, 10));
}
for(let i=0 ; i<30 ; ++i){
  yValues.push((visCount[xValues[i]])?visCount[xValues[i]]:0);
}
document.querySelector('#todayVis').innerHTML = visCount[xValues[29]];
new Chart("myChart2", {
  type: "line",
  data: {
    labels: xDisplay,
    label: 'Daily visitor',
    datasets: [{
      fill: false,
      lineTension: 0.3,
      backgroundColor: "#0d6efd",
      borderColor: "#0d6efd",
      data: yValues
    }]
  },
  options: {
    legend: {display: false},
    title: {
      display: true,
      text: "The daily visitor distribution."
    }
  }
});

}
// ---------------------- unique vistors / day ---------------------
{
var unqVisCount = JSON.parse(visitorData.weeklyUniqueVistors);

var xValues = [];
var xDisplay = [];
var yValues = [];
for(let i=29 ; i>=0 ; --i){
  xDisplay.push(`${new Date(new Date().getTime()-i*24*60*60*1000).getDate()}-${new Date(new Date().getTime()-i*24*60*60*1000).getMonth()}`);
  xValues.push(new Date(new Date().getTime()-i*24*60*60*1000).toISOString().slice(0, 10));
}
for(let i=0 ; i<30 ; ++i){
  yValues.push((unqVisCount[xValues[i]])?unqVisCount[xValues[i]]:0);
}

new Chart("myChart3", {
  type: "line",
  data: {
    labels: xDisplay,
    label: 'Daily unique visitors',
    datasets: [{
      fill: false,
      lineTension: 0.3,
      backgroundColor: "#0d6efd",
      borderColor: "#0d6efd",
      data: yValues
    }]
  },
  options: {
    legend: {display: false},
    title: {
      display: true,
      text: "The unique visitor distribution."
    }
  }
});
}
}
else{
  console.log("here");
  document.querySelector('#nothing').classList.remove('hidden');
}

