module.exports = function(mongoose){
    return new mongoose.Schema({
        title: String,
        content: String,
        author: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
        c_date: { type: Date, default: Date.now }
    });
};