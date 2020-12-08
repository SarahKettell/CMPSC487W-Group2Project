const db = require('../persistence');

// complete an order from the admin order view
const completeOrder = async (req, res) => {
    // get datetime completed, format: 2020-11-25 13:00:01
    let date = new Date();
    const completedTime =
        date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate() + " "
        + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
    console.log(req.params.id + " " + completedTime);
    const order = await db.updateOrderAsComplete(req.params.id, completedTime);
    res.send(order);
};

module.exports = {
    completeOrder
};