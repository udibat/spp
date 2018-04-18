$(function() {
    var c = new Worker("js/chart.worker.js"),
        g = $("#chartTitle"),
        d = $("#forecastVsActualChart"),
        a = $("#resetChartZoom");
    var b = function(h) {
        e(h)
    };
    var e = function(h) {
        c.postMessage({
            fetch: true,
            refresh: h,
            endpoint: chartConfigs.endpoints.loadForecast
        })
    };
    c.addEventListener("message", function(k) {
        console.log("load forecast data recieved.");
        var j = k.data;
        if (j.ok) {
            var i = j.data;
            chartConfigs.loadForecast.data.labels = i.response.labels;
            chartConfigs.loadForecast.data.datasets = i.response.datasets;
            var h = "MM/DD/YYYY HH:mm:ss";
            chartConfigs.createChartTitle(chartConfigs.titles.loadForecast, i.response.labels, g, h);
            f(j.refresh)
        }
    }, false);
    var f = function(h) {
        if (!h) {
            window.forecastVsActualChart = new Chart(d, chartConfigs.loadForecast)
        } else {
            window.forecastVsActualChart.update()
        }
    };
    a.on("click", function() {
        window.forecastVsActualChart.resetZoom()
    });
    b(false);
    setInterval(function() {
        e(true)
    }, chartConfigs.refreshIntervals.loadForecast)
});