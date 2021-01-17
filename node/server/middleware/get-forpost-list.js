
module.exports = (req, res, next) => {
    res.for_post_list = ['foo'];
    next();
};