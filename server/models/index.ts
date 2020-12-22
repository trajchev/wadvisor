import H2H from './odds/H2H';
import Spread from './odds/Spreads';
import Total from './odds/Totals';
import BetMatch from './BetMatch';
import FAQ from './FAQ';
import Group from './Group';
import Match from './Match';
import Page from './Page';
import Site from './Site';
import Sport from './Sport';
import Team from './Team';
import Ticket from './Ticket';
import User from './User';

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
Match.hasMany(Total);
Match.hasMany(Spread);
Match.hasMany(H2H);
Site.hasMany(Total);
Site.hasMany(Spread);
Site.hasMany(H2H);
Total.belongsTo(Match, { foreignKey: "match_id", targetKey: "id" });
Total.belongsTo(Site, { foreignKey: "site_id", targetKey: "id" });
Spread.belongsTo(Match, { foreignKey: "match_id", targetKey: "id" });
Spread.belongsTo(Site, { foreignKey: "site_id", targetKey: "id" });
H2H.belongsTo(Match, { foreignKey: "match_id", targetKey: "id" });
H2H.belongsTo(Site, { foreignKey: "site_id", targetKey: "id" });

export {
  H2H, Spread, Total, BetMatch, FAQ, Group, Match, Page, Site, Sport, Team, Ticket, User
}
