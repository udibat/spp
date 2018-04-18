self.addEventListener("message", function(c) {
    var b = c.data;
    var a = {
        ok: false,
        data: {}
    };
    if (b.fetch) {
        var d = new XMLHttpRequest();
        d.open("GET", b.endpoint, false);
        d.setRequestHeader("Content-Type", "application/json");
        d.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                a.ok = true;
                a.refresh = b.refresh;
                a.data = JSON.parse(this.responseText)
            } else {
                a.ok = false;
                a.refresh = b.refresh;
                a.data = {}
            }
        };
        d.send();
        self.postMessage(a)
    } else {
        self.postMessage(a)
    }
});