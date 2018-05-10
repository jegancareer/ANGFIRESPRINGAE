App.RollUpdate = function($scope){
	
	$scope.update = function (y,m) {
	    updateMonths(y,m);
	
	    $scope.buildChords(0,0);
	
	   // mainLabel.style("font-size",innerRadius *.05);
	
	    $scope.eText = $scope.eGroup.selectAll("text")
	        .data($scope.e_labels, function (d) {
	            return d.label;
	        });
	
	    $scope.iText = $scope.iGroup.selectAll("text")
	        .data($scope.i_labels, function (d) {
	            return d.label;
	        });
	
	    $scope.eChords=$scope.eGroup.selectAll("path")
	        .data($scope.e_chords, function (d) {
	            return d.label;
	        });
	
	    $scope.iChords=$scope.iGroup.selectAll("path")
	        .data($scope.i_chords, function (d) {
	            return d.label;
	        });
	
	    var td=$scope.monthlyImports[0]
	    var fs=$scope.innerRadius *.1;
	    td=$scope.formatCurrency(td);
	
	    $scope.dGroup.select("text")
	        .transition()
	        .delay($scope.delay)
	        .text(td)
	        .attr("transform", "translate(" + ($scope.outerRadius - (td.length * fs/2)/2) + ","  + ($scope.outerRadius*1.1) +")")
	        .style("font-size", fs + "px");
	
	    $scope.eText.enter()
	        .append("text")
	        .attr("class","export")
	        .attr("dy", ".35em")
	        .attr("text-anchor", function(d) { return d.angle > Math.PI ? "end" : null; })
	        .attr("transform", function(d) {
	            return "rotate(" + (d.angle * 180 / Math.PI - 90) + ")"
	                + "translate(" + ($scope.innerRadius + 6) + ")"
	                + (d.angle > Math.PI ? "rotate(180)" : "");
	        })
	        .text(function(d) { return  (d.index+1)  + ". " + d.label; })
	        //.on("mouseover", function (d) { node_onMouseOver(d); })
	        //.on("mouseout", function (d) {node_onMouseOut(d); })
	        .attr("fill-opacity", 1e-6)
	        .transition()
	        .duration($scope.delay-10)
	        .attr("fill-opacity", 1e-6);
	
	    $scope.eText.transition()
	        .duration($scope.delay-10)
	        .attr("text-anchor", function(d) { return d.angle > Math.PI ? "end" : null; })
	        .attr("transform", function(d) {
	            return "rotate(" + (d.angle * 180 / Math.PI - 90) + ")"
	                + "translate(" + ($scope.innerRadius + 6) + ")"
	                + (d.angle > Math.PI ? "rotate(180)" : "");
	        })
	        .text(function(d) { return  (d.index+1)  + ". " + d.label; })
	        .attr("fill-opacity", 1.0);
	
	    $scope.eText.exit()
	        .transition()
	        .duration($scope.delay / 2)
	        .attr("fill-opacity", 1e-6)
	        .attr("transform", "translate(0,0)scale(0.01)")
	        .remove();
	
	    $scope.eChords.enter()
	        .append("path")
	        .attr("class","chord")
	        .style("stroke", function(d) { return d3.rgb(getExportColor(d.source.index)).darker(); })
	        .style("fill", function(d) { return getExportColor(d.source.index); })
	        .attr("d", d3.svg.arc_chord().radius($scope.innerRadius))
	        //.on("mouseover", function (d) { node_onMouseOver(d); })
	        //.on("mouseout", function (d) {node_onMouseOut(d); })
	        .style("fill-opacity", 1e-6)
	        .style("stroke-opacity", 1e-6)
	        .transition()
	        .duration($scope.delay)
	        .style("stroke-opacity", function (d,i) { return Math.max(.85*($scope.topCountryCount-d.index)/$scope.topCountryCount,.2);})
	        .style("fill-opacity", function (d,i) { return .85*($scope.topCountryCount-d.index)/$scope.topCountryCount});
	
	    $scope.eChords.transition()
	        .duration($scope.delay)
	        .attr("d", d3.svg.arc_chord().radius($scope.innerRadius))
	        .style("stroke", function(d) { return d3.rgb(getExportColor(d.source.index)).darker(); })
	        .style("fill", function(d) { return getExportColor(d.source.index); })
	        .style("stroke-opacity", function (d,i) { return Math.max(.85*($scope.topCountryCount-d.index)/$scope.topCountryCount,.2);})
	        .style("fill-opacity", function (d,i) { return .85*($scope.topCountryCount-d.index)/$scope.topCountryCount});
	
	
	    $scope.eChords.exit()
	        .transition()
	        .duration($scope.delay/2)
	        .attr("stroke-opacity", 1e-6)
	        .attr("fill-opacity", 1e-6)
	        .attr("transform", "scale(0.01)")
	        .remove();
	
	    $scope.iText.enter()
	        .append("text")
	        .attr("class","import")
	        .attr("dy", ".35em")
	        .attr("text-anchor", function(d) { return d.angle > Math.PI ? "end" : null; })
	        .attr("transform", function(d) {
	            return "rotate(" + (d.angle * 180 / Math.PI - 90) + ")"
	                + "translate(" + ($scope.innerRadius + 6) + ")"
	                + (d.angle > Math.PI ? "rotate(180)" : "");
	        })
	        .text(function(d) { return  (d.index+1)  + ". " + d.label; })
	        //.on("mouseover", function (d) { node_onMouseOver(d); })
	        //.on("mouseout", function (d) {node_onMouseOut(d); })
	        .attr("fill-opacity", 1e-6)
	        .transition()
	        .duration($scope.delay-10)
	        .attr("fill-opacity", 1.0);
	
	    $scope.iText.transition()
	        .duration($scope.delay-10)
	        .attr("text-anchor", function(d) { return d.angle > Math.PI ? "end" : null; })
	        .attr("transform", function(d) {
	            return "rotate(" + (d.angle * 180 / Math.PI - 90) + ")"
	                + "translate(" + ($scope.innerRadius + 6) + ")"
	                + (d.angle > Math.PI ? "rotate(180)" : "");
	        })
	        .text(function(d) { return  (d.index+1)  + ". " + d.label; })
	        .attr("fill-opacity", 1.0);
	
	    $scope.iText.exit()
	        .transition()
	        .duration($scope.delay / 2)
	        .attr("fill-opacity",1e-6)
	        .attr("transform", "translate(0,0)scale(0.01)")
	        .remove();
	
	    $scope.iChords.enter()
	        .append("path")
	        .attr("class","chord")
	        .style("stroke", function(d) { return d3.rgb(getImportColor(d.source.index)).darker(); })
	        .style("fill", function(d) { return getImportColor(d.source.index); })
	        .attr("d", d3.svg.arc_chord().radius($scope.innerRadius))
	        //.on("mouseover", function (d) { node_onMouseOver(d); })
	        //.on("mouseout", function (d) {node_onMouseOut(d); })
	        .style("stroke-opacity", 1e-6)
	        .style("fill-opacity", 1e-6)
	        .transition()
	        .duration($scope.delay-10)
	        .style("stroke-opacity", function (d,i) { return Math.max(.85*($scope.topCountryCount-d.index)/$scope.topCountryCount,.2);})
	        .style("fill-opacity", function (d,i) { return .7*($scope.topCountryCount- d.index)/$scope.topCountryCount});
	
	    $scope.iChords.transition()
	        .duration($scope.delay-10)
	        .attr("d", d3.svg.arc_chord().radius($scope.innerRadius))
	        .style("stroke", function(d) { return d3.rgb(getImportColor(d.source.index)).darker(); })
	        .style("fill", function(d) { return  getImportColor(d.source.index); })
	        .style("stroke-opacity", function (d,i) { return Math.max(.85*($scope.topCountryCount-d.index)/$scope.topCountryCount,.2);})
	        .style("fill-opacity", function (d,i) { return .7*($scope.topCountryCount- d.index)/$scope.topCountryCount});
	
	    $scope.iChords.exit()
	        .transition()
	        .duration($scope.delay / 2)
	        .attr("stroke-opacity", 1e-6)
	        .attr("fill-opacity", 1e-6)
	        .attr("transform", "scale(0.01)")
	        .remove();
}

function updateMonths(y,m) {

	$scope.monthAxis=$scope.mGroup.selectAll("g.month")
        .data($scope.months);

	$scope.monthEnter= $scope.monthAxis.enter()
        .append("g")
        .attr("class","month");

	$scope.monthEnter.append("line")
        .attr("x1",function (d,i) {
            return i*$scope.monthOffset;
        })
        .attr("x2",function (d,i) { return i*$scope.monthOffset; })
        .attr("y1",function (d,i) {
            var ratio=(y*12+m)-i;
            if (ratio < 0) ratio=ratio*-1;
            if (ratio==0)
                return 0;
            else if (ratio==1)
                return 4;
            else if (ratio==2)
                return 8;
            else if (ratio==3)
                return 11;
            else if (ratio==4)
                return 14;
            else if (ratio==5)
                return 15;
            else if (ratio==6)
                return 15;
            else
                return 16;

        })
        .attr("y2",22)
        .attr("shape-rendering","crispEdges")
        .style("stroke-opacity", function (d,i) {
            var ratio=(y*12+m)-i;
            if (ratio < 0) ratio=ratio*-1;
            if (ratio==0)
                return 1;
            else if (ratio==1)
                return .9;
            else if (ratio==2)
                return .8;
            else if (ratio==3)
                return .7;
            else if (ratio==4)
                return .6;
            else if (ratio==5)
                return .5;
            else if (ratio==6)
                return .4;
            else
                return .3;

        })
        .style("stroke","#000");



	$scope.monthEnter.append("text")
        .attr("transform",function (d,i) { return "translate (" + String(i*$scope.monthOffset-10) + ",-2)"; })
        .text(function(d,i) { return $scope.monthsMap[i % 12]; })
        .style("fill-opacity",function (d,i) { return (i==0) ? 1:0;});

	$scope.monthEnter.append("text")
        .attr("transform",function (d,i) { return "translate (" + String(i*$scope.monthOffset-10) + ",33)"; })
        .text(function(d,i) {
            if ((i==0) || (i % 12==0)) {
                return String($scope.baseYear + Math.floor(i/12));
            }
            else
                return "";
        })
        .on("click",function (d) {
        	$scope.year= Math.floor(d.index/12);
        	$scope.month=0;
            if (running==true) stopStart();
            update($scope.year,$scope.month);
            //          console.log("y=" + y + " m=" + m);
        });

	$scope.monthUpdate=$scope.monthAxis.transition();

	$scope.monthUpdate.select("text")
        .delay($scope.delay/2)
        .style("fill-opacity",function (d) {
            if (d.index==(y*12+m)) {
                return 1;
            }
            else
                return 0;
        });

	$scope.monthUpdate.select("line")
        .delay($scope.delay/2)
        .attr("y1",function (d,i) {
            var ratio=(y*12+m)-i;
            if (ratio < 0) ratio=ratio*-1;
            if (ratio==0)
                return 0;
            else if (ratio==1)
                return 4;
            else if (ratio==2)
                return 8;
            else if (ratio==3)
                return 11;
            else if (ratio==4)
                return 14;
            else if (ratio==5)
                return 15;
            else if (ratio==6)
                return 15;
            else
                return 16;

        })
        .style("stroke-width",function (d,i) {
            var ratio=(y*12+m)-i;
            if (ratio < 0) ratio=ratio*-1;
            if (ratio==0)
                return 1.5;
            else
                return 1;
        })
        .style("stroke-opacity", function (d,i) {
            var ratio=(y*12+m)-i;
            if (ratio < 0) ratio=ratio*-1;
            if (ratio==0)
                return 1;
            else if (ratio==1)
                return .9;
            else if (ratio==2)
                return .8;
            else if (ratio==3)
                return .7;
            else if (ratio==4)
                return .6;
            else if (ratio==5)
                return .5;
            else if (ratio==6)
                return .4;
            else
                return .3;

        })
        .style("stroke","#000");

}


function getExportColor(i) {
    var country=$scope.e_nameByIndex[i];
    if ($scope.e_colorByName[country]==undefined) {
    	$scope.e_colorByName[country]=$scope.e_fill(i);
    }

    return $scope.e_colorByName[country];
}

function getImportColor(i) {
    var country=$scope.i_nameByIndex[i];
    if ($scope.i_colorByName[country]==undefined) {
    	$scope.i_colorByName[country]=$scope.i_fill(i);
    }

    return $scope.i_colorByName[country];
}

}