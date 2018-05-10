App.RollGlobals = function($scope)
{
$scope.maxWidth=Math.max(600,Math.min(window.innerWidth,window.innerHeight)-50);

$scope.outerRadius = ($scope.maxWidth / 2),
$scope.innerRadius = $scope.outerRadius - 100,
$scope.monthWidth=Math.max(400,($scope.innerRadius*2)-250);

$scope.iText,$scope.iChords,$scope.eText,$scope.eChords;

$scope.angleRange=340,
$scope.baseYear=1,
$scope.maxMonth=1,
$scope.maxYear=20,
$scope.monthOffset=($scope.monthWidth)/($scope.maxYear*12+$scope.maxMonth),
$scope.countries,
$scope.e_labels=[],
$scope.e_chords=[],
$scope.i_labels=[],
$scope.i_chords=[],
$scope.topCountryCount=20,
$scope.e_buf_indexByName={},
$scope.e_indexByName = {},
$scope.e_nameByIndex = {},
$scope.i_indexByName = {},
$scope.i_nameByIndex = {},
$scope.i_buf_indexByName={},
$scope.export_countries=[],
$scope.import_countries=[],
$scope.e_colorByName={},
$scope.i_colorByName={},
$scope.months=[],
$scope.monthlyExports=[],
$scope.monthlyImports=[],
$scope.countriesGrouped,
$scope.delay=5000,
$scope.refreshIntervalId,
$scope.year= 0,
$scope.month=-1,
$scope.running=true,
$scope.formatNumber = d3.format(",.0f"),
$scope.formatCurrency = function(d) { return "$" + $scope.formatNumber(d)},
$scope.eTextUpdate,
$scope.eChordUpdate,
$scope.TextUpdate,
$scope.iChordUpdate;

var toolTip = d3.select(document.getElementById("toolTip"));
var header = d3.select(document.getElementById("head"));
var header1 = d3.select(document.getElementById("header1"));
var header2 = d3.select(document.getElementById("header2"));

$scope.e_fill= d3.scale.ordinal().range(["#00AC6B","#20815D","#007046","#35D699","#60D6A9"]);
$scope.i_fill= d3.scale.ordinal().range(["#EF002A","#B32D45","#9B001C","#F73E5F","#F76F87"]);

$scope.monthsMap=["Pisces","Aries","Taurus","Sagittarius","Gemini","Scorpio", "Leo", "Virgo", "Cancer", "Libra", "Capricorn", "Aquarius"];
d3.select(document.getElementById("bpg"))
    .style("min-width",($scope.outerRadius*2 + 150) + "px");


$scope.playPause=d3.select(document.getElementById("playPause"));

d3.select(document.getElementById("imgDiv"))
    .style("left",(($scope.outerRadius-$scope.monthWidth/2))+"px");

$scope.svg = d3.select(document.getElementById("svgDiv"))
    .style("width", ($scope.outerRadius*2) + "px")
    .style("height", ($scope.outerRadius*2+100) + "px")
    .append("svg")
    .attr("id","svg")
    .style("width", ($scope.outerRadius*2) + "px")
    .style("height", ($scope.outerRadius*2+100) + "px");


$scope.export_chord = d3.layout.arc_chord()
    .padding(.05)
    .sortSubgroups(d3.descending)
    .sortChords(d3.descending)
    .yOffsetFactor(-0.8);

$scope.import_chord = d3.layout.arc_chord()
    .padding(.05)
    .yOffsetFactor(0.7)
    .sortSubgroups(d3.descending)
    .sortChords(d3.descending);

$scope.arc = d3.svg.arc()
    .innerRadius($scope.innerRadius)
    .outerRadius($scope.innerRadius + 5);


$scope.dGroup = $scope.svg.append("g")
    .attr("class","mainLabel")
    .attr("transform", "translate(" + (($scope.outerRadius + $scope.innerRadius *.7/2)-($scope.outerRadius-($scope.innerRadius *.8/2))-180) + ","  + 0 +")")

$scope.dGroup.append("text")
    .attr("class","mainLabel")
    .attr("transform", "translate(" + ($scope.outerRadius - 20) + ","  + ($scope.outerRadius + 30) +")")
    .style("font-size","0px");

$scope.dGroup.append("text")
    .attr("class","secondLabel")
    .attr("transform", "translate(" + ($scope.outerRadius - 60) + ","  + ($scope.outerRadius * 1.15) +")")
    .text("*Person joined and in counting")
    .style("font-size","0px");

$scope.dGroup.append("text")
.attr("class","thirdLabel")
.attr("transform", "translate(" + ($scope.outerRadius - 60) + ","  + ($scope.outerRadius * 1.05) +")")
.text("*By Accenture corporation")
.style("font-size","0px");

$scope.gY=($scope.outerRadius-($scope.innerRadius *.8/2));

$scope.gradientGroup =$scope.svg.append("g")
    .attr("class","gradient")
    .attr("transform","translate(" + ($scope.outerRadius-6) + "," + ($scope.gY+70)  + ")" );

$scope.gradientGroup.append("rect")
    .attr("height",(($scope.outerRadius + $scope.innerRadius *.7/2)-$scope.gY))
    .attr("width",0)
    .style("fill","url(#gradient1)");

$scope.mGroup=$scope.svg.append("g")
    .attr("class","months")
    .style("cursor","pointer")
    .attr("transform", "translate(" + ($scope.outerRadius-$scope.monthWidth/2-20) + ","  + 20 + ")");

$scope.eGroup=$scope.svg.append("g")
    .attr("class","exports")
    .attr("transform", "translate(" + $scope.outerRadius + "," + ($scope.outerRadius+70) + ")");

$scope.iGroup=$scope.svg.append("g")
    .attr("class","imports")
    .attr("transform", "translate(" + $scope.outerRadius + "," + ($scope.outerRadius+70) + ")");

}