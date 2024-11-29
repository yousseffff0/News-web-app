const {Schema, model}= require('mongoose');

const DraftSchema = new Schema({
    description:{
        type:'String',
        required: true
    },
    publishdate:{
        type:'String',
        required: true
    },
    keyword:{
        type:'String',
        required: true
    },
    imgurl:{
        type:'String'
    },
    publisherId: {
        type: Schema.Types.ObjectId,
        ref: 'publisher'
    }

});
const DraftModel= model('drafts', DraftSchema);

module.exports = DraftModel;