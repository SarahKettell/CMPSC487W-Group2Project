const db = require('../persistence');

// TODO: Needs to be customized to work with the pizza-parlor DB
module.exports = async (req, res) => {
    const hours_info = (req.params.id, {
        mon_beg: req.body.mon_beg,
        mon_end: req.body.mon_end,
        tue_beg: req.body.tue_beg,
        tue_end: req.body.tue_end,
        wed_beg: req.body.wed_beg,
        wed_end: req.body.wed_end,
        thu_beg: req.body.thu_beg,
        thu_end: req.body.thu_end,
        fri_beg: req.body.fri_beg,
        fri_end: req.body.fri_end,
        sat_beg: req.body.sat_beg,
        sat_end: req.body.sat_end,
        sun_beg: req.body.sun_beg,
        sun_end: req.body.sun_end,
        test: req.body.test,
    });
    
    await db.updateHoursInfo(hours_info);
    res.send(hours_info);
};



