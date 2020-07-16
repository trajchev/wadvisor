const { Team } = require('../../models');
const { read, update, upload, resize } = require('../../services');

const uploadTeamLogo = upload.single('photo');
const getTeams = read.readAll(Team);
const getTeam = read.read(Team);
const updateTeam = update.update(Team);
const resezeTeamPhoto = resize.resizeTeamPhoto()

module.exports = {
    getTeams,
    getTeam,
    updateTeam,
    uploadTeamLogo,
    resezeTeamPhoto
};
