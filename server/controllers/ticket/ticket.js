const { Ticket, BetMatch, Match } = require("../../models");
const { create, read, update, remove } = require('../../services');

const createTicket = create.create(Ticket);
const deleteTicket = remove.remove(Ticket);
const getTicket = read.read(Ticket, [
  {
    model: BetMatch,
    as: "betmatches",
    include: {model: Match}
  }
]);
const getTicketsLight = read.readAllProprietary(Ticket);
const getTickets = read.readAllProprietary(Ticket, [
  {
    model: BetMatch,
    as: "betmatches",
    include: {model: Match}
  }
]);
const updateTicket = update.update(Ticket);

module.exports = {
  createTicket,
  deleteTicket,
  getTicket,
  getTickets,
  getTicketsLight,
  updateTicket,
};
