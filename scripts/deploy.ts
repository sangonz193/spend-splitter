var ghpages = require("gh-pages");

ghpages.publish("dist", function(err: any) {
    console.log(err);
});
