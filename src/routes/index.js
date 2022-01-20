const router = require("express").Router();

router.get("/", (req, res) => {
    const queries = req.query;
    for (let q in queries) {
        if(q[0] === "_") {
            delete req.query[q];
        }
    }
    // let queries = {};
    // for (const [key, value] of Object.entries(req.query)) {
    //     if(key.startsWith('_')) {
    //         continue;
    //     } else {
    //         queries[key] = value;
    //     }
    // }
    res.status(200).json({query: queries});
    console.log(req.query);
});

module.exports = router;