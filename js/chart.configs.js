if(typeof moment==="undefined") {
    throw new Error("Page requires moment library")
}

var chartRootUrl="proxy.php?a=all";
var chartConfigs= {
    createChartTitle:function(e, f, d) {
        var b=f.pop();
        var a="YYYY-MM-DD HH:mm:ss";
        var c="{0} for {1} (Central Time)".replace("{0}", e).replace("{1}", moment(b).tz("America/Chicago").format(a));
        d.text("");
        d.addClass("red");
        d.text(c)
    }
    ,
    titles: {
        ace: "Ace Chart", loadForecast: "Forecast vs. Actual", genMix: "Generation Mix", genMix365: "Generation Mix Rolling 365", genMixYTD: "Generation Mix YTD", lmpTrend: "RTBM LMP Trend", interchangeTrend: "Interchange Trend",
    }
    ,
    refreshIntervals: {
        ace: 60000, genMix: 300000, genMix365: 300000, genMixYTD: 300000, loadForecast: 300000, interchangeTrend: 300000, lmpTrend: 300000,
    }
    ,
    endpoints: {
        ace: chartRootUrl+"/ace/asChart", genMix: "proxygen.php", genMix365: chartRootUrl+"/gen-mix-365/asChart", genMixYTD: chartRootUrl+"/gen-mix-ytd/asChart", loadForecast: "proxyfva.php", interchangeTrend: chartRootUrl+"/interchange-trend/asChart", lmpTrend: chartRootUrl+"/lmp-trend/asChart",
    }
    ,
    genMix: {
        type:"pie",
        data: {
            datasets:[ {
                data: [], backgroundColor: ["cornflowerblue", "olive", "mediumpurple", "firebrick", "indianred", "aqua", "chocolate", "forestgreen", "darkorange", "orchid", "maroon"], label: "Generation Mix"
            }
            ],
            labels:["Coal Market",
            "Coal Self",
            "Diesel Fuel Oil",
            "Hydro",
            "Natural Gas",
            "Nuclear",
            "Solar",
            "Waste Disposal Services",
            "Wind",
            "Waste Heat",
            "Other"]
        }
        ,
        options: {
            tooltips: {
                callbacks: {
                    label:function(e, g) {
                        var d=g.datasets[e.datasetIndex].data;
                        var b=g.labels[e.index];
                        var f=d[e.index];
                        var c=0;
                        for(var a in d) {
                            c+=d[a]
                        }
                        var h=(f/c)*100;
                        return b+": ("+h.toFixed(4)+"%)"
                    }
                }
            }
            ,
            responsive:true,
            maintainAspectRatio:false,
            legend: {
                position:"left",
                labels: {
                    generateLabels:function(b) {
                        var e=b.data;
                        var d=e.datasets[0].data;
                        var c=0;
                        for(var a in d) {
                            c+=d[a]
                        }
                        if(e.labels.length&&e.datasets.length) {
                            return e.labels.map(function(n, l) {
                                var s=b.getDatasetMeta(0);
                                var j=e.datasets[0];
                                var g=s.data[l];
                                var f=g&&g.custom|| {}
                                ;
                                var h=Chart.helpers.getValueAtIndexOrDefault;
                                var k=b.options.elements.arc;
                                var r=f.backgroundColor?f.backgroundColor: h(j.backgroundColor, l, k.backgroundColor);
                                var q=f.borderColor?f.borderColor: h(j.borderColor, l, k.borderColor);
                                var m=f.borderWidth?f.borderWidth: h(j.borderWidth, l, k.borderWidth);
                                var o=b.config.data.datasets[g._datasetIndex].data[g._index];
                                var p=(o/c)*100;
                                return {
                                    text: n+": ("+p.toFixed(4)+"%)", fillStyle: r, strokeStyle: q, lineWidth: m, hidden: isNaN(j.data[l])||s.data[l].hidden, index: l
                                }
                            }
                            )
                        }
                        return[]
                    }
                }
            }
        }
    }
    ,
    genMix365: {
        type:"line",
        data: {
            labels: [], datasets: []
        }
        ,
        options: {
            zoom: {
                enabled: true, drag: true, mode: "x",
            }
            ,
            responsive:true,
            legend: {
                position: "top"
            }
            ,
            tooltips: {
                mode: "index", intersect: false
            }
            ,
            scales: {
                xAxes:[ {
                    type:"time",
                    time: {
                        displayFormats: {
                            minute: "HH:MM MMM/DD",
                        }
                    }
                }
                ]
            }
        }
    }
    ,
    genMixYTD: {
        type:"line",
        data: {
            labels: [], datasets: []
        }
        ,
        options: {
            zoom: {
                enabled: true, drag: true, mode: "x",
            }
            ,
            responsive:true,
            legend: {
                position: "top"
            }
            ,
            tooltips: {
                mode: "index", intersect: false
            }
            ,
            scales: {
                xAxes:[ {
                    type:"time",
                    time: {
                        displayFormats: {
                            minute: "HH:MM MMM/DD",
                        }
                    }
                }
                ]
            }
        }
    }
    ,
    ace: {
        type:"line",
        data: {
            labels: [], datasets: []
        }
        ,
        options: {
            zoom: {
                enabled: true, drag: true, mode: "x",
            }
            ,
            responsive:true,
            legend: {
                position: "top"
            }
            ,
            tooltips: {
                mode: "index", intersect: false
            }
            ,
            scales: {
                xAxes:[ {
                    type:"time",
                    time: {
                        displayFormats: {
                            minute: "HH:MM MMM/DD",
                        }
                    }
                }
                ]
            }
        }
    }
    ,
    loadForecast: {
        type:"line",
        data: {
            labels: [], datasets: []
        }
        ,
        options: {
            zoom: {
                enabled: true, drag: true, mode: "x",
            }
            ,
            responsive:true,
            legend: {
                position: "top"
            }
            ,
            tooltips: {
                mode: "index", intersect: false
            }
            ,
            scales: {
                xAxes:[ {
                    type:"time",
                    time: {
                        displayFormats: {
                            minute: "HH:MM MMM/DD",
                        }
                    }
                }
                ],
                yAxes:[ {
                    scaleLabel: {
                        display: true, labelString: "MW"
                    }
                }
                ]
            }
        }
    }
    ,
    interchangeTrend: {
        type:"line",
        data: {
            labels: [], datasets: []
        }
        ,
        options: {
            zoom: {
                enabled: true, drag: true, mode: "x",
            }
            ,
            responsive:true,
            legend: {
                position: "top"
            }
            ,
            tooltips: {
                mode: "index", intersect: false
            }
            ,
            scales: {
                xAxes:[ {
                    type:"time",
                    time: {
                        displayFormats: {
                            minute: "HH:MM MMM/DD",
                        }
                    }
                }
                ]
            }
        }
    }
    ,
    lmpTrend: {
        type:"line",
        data: {
            labels: [], datasets: []
        }
        ,
        options: {
            zoom: {
                enabled: true, drag: true, mode: "x",
            }
            ,
            responsive:true,
            legend: {
                position: "top"
            }
            ,
            tooltips: {
                mode: "index", intersect: false
            }
            ,
            scales: {
                xAxes:[ {
                    type:"time",
                    time: {
                        displayFormats: {
                            minute: "HH:MM MMM/DD",
                        }
                    }
                }
                ]
            }
        }
    }
}

;