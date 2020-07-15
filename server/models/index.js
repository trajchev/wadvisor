const H2H = require('./odds/H2H');
const Spreads = require('./odds/Spreads');
const Totals = require('./odds/Totals');
const BetMatch = require('./BetMatch');
const FAQ = require('./FAQ');
const Group = require('./Group');
const Match = require('./Match');
const Page = require('./Page');
const Site = require('./Site');
const Sport = require('./Sport');
const Team = require('./Team');
const Ticket = require('./Ticket');
const User = require('./User');

// Defining the relationships
Sport.hasMany(Match);
User.hasMany(Ticket);
BetMatch.belongsTo(User, { foreignKey: "user_id", targetKey: "id" });
BetMatch.belongsTo(Ticket, { foreignKey: "ticket_id", targetKey: "id" });
BetMatch.belongsTo(Match, {foreignKey: "match_id", targetKey: "id"});

Match.hasMany(BetMatch);
Ticket.hasMany(BetMatch);

Ticket.belongsTo(User, { foreignKey: "user_id", targetKey: "id" });
Sport.hasMany(Team);
Group.hasMany(Sport);
Sport.belongsTo(Group, { foreignKey: "group_title", targetKey: "title" });
Match.belongsTo(Sport, { foreignKey: "sport_key", targetKey: "key" });
Team.belongsTo(Sport, { foreignKey: "sport_key", targetKey: "key" });
Page.belongsTo(User, {foreignKey: "user_id", targetKey: "id"})

// Odd types relationships
Match.hasMany(Totals);
Match.hasMany(Spreads);
Match.hasMany(H2H);
Site.hasMany(Totals);
Site.hasMany(Spreads);
Site.hasMany(H2H);
Totals.belongsTo(Match, { foreignKey: "match_id", targetKey: "id" });
Totals.belongsTo(Site, { foreignKey: "site_id", targetKey: "id" });
Spreads.belongsTo(Match, { foreignKey: "match_id", targetKey: "id" });
Spreads.belongsTo(Site, { foreignKey: "site_id", targetKey: "id" });
H2H.belongsTo(Match, { foreignKey: "match_id", targetKey: "id" });
H2H.belongsTo(Site, { foreignKey: "site_id", targetKey: "id" });

module.exports = {
  H2H, Spreads, Totals, BetMatch, FAQ, Group, Match, Page, Site, Sport, Team, Ticket, User
}
