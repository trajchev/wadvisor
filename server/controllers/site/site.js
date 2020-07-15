const { Site } = require('../../models');
const { read, update } = require('../../services');

const getSites = read.readAll(Site);
const getSite = read.read(Site);
const updateSite = update.update(Site);

module.exports = {
    getSites,
    getSite,
    updateSite
};
