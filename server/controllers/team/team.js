const { Team } = require('../../models');
const { read, update } = require('../../services');
const upload = require('../../utils/upload-team');

const uploadTeamLogo = upload.single('photo');
const getTeams = read.readAll(Team);
const getTeam = read.read(Team);
const updateTeam = update.update(Team);

module.exports = {
    getTeams,
    getTeam,
    updateTeam,
    uploadTeamLogo
};
