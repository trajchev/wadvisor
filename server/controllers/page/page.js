const { Page } = require('../../models');
const { create, read, update } = require('../../services');

const getPages = read.readAllPages(Page);
const getPage = read.readBySlug(Page);
const createPage = create.create(Page)
const updatePage = update.update(Page);

module.exports = {
    getPages,
    getPage,
    createPage,
    updatePage
};
