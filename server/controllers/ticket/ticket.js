const { Ticket, BetMatch, Match } = require("../../models");
const { create, read, update, remove } = require('../../services');

const createTicket = create.create(Ticket);
const deleteTicket = remove.remove(Ticket);
const getTicket = read.readAssociated(Ticket, [
  {
    model: BetMatch,
    as: "betmatches",
    include: {model: Match}
  }
]);
const getTicketsLight = read.readAll(Ticket);
const getTickets = read.readAssociatedPaginated(Ticket, [
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
