var ghpages = require("gh-pages");

ghpages.publish("dist", (err: any) => {
	if (err) console.log(err);
});
