$(function() {
    var c = new Worker("js/chart.worker.js"),
        e = $("#chartTitle"),
        f = $("#genMixChart");
    var b = function(g) {
        a(g)
    };
    var a = function(g) {
        c.postMessage({
            fetch: true,
            refresh: g,
            endpoint: chartConfigs.endpoints.genMix
        })
    };
    c.addEventListener("message", function(i) {
        console.log("gen mix data recieved.");
        var h = i.data;
        if (h.ok) {
            var g = h.data;
            chartConfigs.genMix.data.datasets[0].data = [];
            g.response.datasets.forEach(function(j) {
                chartConfigs.genMix.data.datasets[0].data.push(parseFloat(j.data.pop()))
            });
            chartConfigs.createChartTitle(chartConfigs.titles.genMix, g.response.labels, e);
            d(h.refresh)
        }
    }, false);
    var d = function(g) {
        if (!g) {
            window.genMixChart = new Chart(f, chartConfigs.genMix)
        } else {
            window.genMixChart.update()
        }
    };
    b(false);
    setInterval(function() {
        a(true)
    }, chartConfigs.refreshIntervals.genMix)
});