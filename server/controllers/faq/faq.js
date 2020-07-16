const { FAQ } = require('../../models');
const { create, read, update, remove } = require('../../services');

const getFAQs = read.readAll(FAQ);
const getFAQ = read.read(FAQ);
const updateFAQ = update.update(FAQ);
const createFAQ = create.create(FAQ);
const deleteFAQ = remove.remove(FAQ);

module.exports = {

    getFAQ,
    getFAQs,
    createFAQ,
    updateFAQ,
    deleteFAQ

};
