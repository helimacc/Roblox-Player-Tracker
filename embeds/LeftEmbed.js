// #region ========== [ Requires ] ===========
const { EmbedBuilder } = require('discord.js');
const Game = require("../logicLayer/Game");
const VIP = require("../logicLayer/VIP");
const Group = require("../logicLayer/Group");
// #endregion


// #region ========== [ Embed ] ===========
/**
 * Creates the embed to be send in the notification channels when a tracked player leaves the game.
 * 
 * @param {Game} game 
 * @param {VIP} player 
 * @param {Group} group
 * @param {import('noblox.js').ThumbnailData} thumbnail 
 */
module.exports = (game,player, group) => {
    const Embed = new EmbedBuilder()
    .setAuthor({name: 'VIP Tracker 📡'})
    .setTitle("A tracked player went offline!")
    .setDescription(`[${player.Username}](https://www.roblox.com/users/${player.UserId}/profile) left \`${game.Name}\``)
    .setColor("#731a0e")
    .setFooter({ text: `Success | ${group.Name}`, iconURL: 'https://th.bing.com/th/id/R.d8d2154e10f3aa36dcb4170927206c55?rik=QR1AsaPv20EQtQ&pid=ImgRaw' })
    .setTimestamp();

    return Embed;
}
// #endregion