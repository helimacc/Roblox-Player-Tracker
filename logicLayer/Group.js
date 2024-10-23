// #region ========== [ Requires ] ===========
const { WebhookClient } = require("discord.js");
const Noblox = require("noblox.js");
const VIP = require("./VIP");
const Game = require("./Game");
//#endregion


/**
 * Class representing a Roblox Group.
 */
class Group {

    //#region ========== [ Attributes ] ===========
    _id
    _name
    _integration
    _notify
    _pingRole
    _trackedRolesets
    _vips //Tracked players
    _trackedPlayersCache
    //#endregion


    //#region ========== [ Properties ] ===========
    /**
     * Getter for the group ID.
     * 
     * @returns {int} The ID of the group.
     */
    get Id() {
        return this._id;
    }


    /**
     * Getter for the group name.
     * 
     * @returns {string} The name of the group.
     */
    get Name() {
        return this._name;
    }


    /**
     * Getter for the notification status.
     * 
     * @returns {boolean} The notify status, which indicates if notifications are enabled or not.
     */
    get Notify() {
        return this._notify;
    }


    /**
     * Setter for the notification status.
     * 
     * @param {boolean} notifBool - The new notify status.
     */
    set Notify(notifBool) {
        this._notify = notifBool;
    }


    /**
     * Getter for the tracked role sets.
     * 
     * @returns {Array} An array of tracked role sets.
     */
    get TrackedRolesets() {
        return this._trackedRolesets;
    }


    /**
     * Setter for the tracked role sets.
     * 
     * @param {Array} rsets - The new array of tracked role sets.
     */
    set TrackedRolesets(rsets) {
        this._trackedRolesets = rsets;
    }


    /**
     * Getter for the ping role.
     * 
     * @returns {string} The ping role associated with the group.
     */
    get PingRole() {
        return this._pingRole;
    }


    /**
     * Setter for the ping role.
     * 
     * @param {string} roleId - The new ping role for the group.
     */
    set PingRole(roleId) {
        this._pingRole = roleId;
    }


    /**
     * Getter for the integration status.
     * 
     * @returns {WebhookClient} The integration (Webhook)
     */
    get Integration() {
        return this._integration;
    }


    /**
     * Setter for the integration status.
     * 
     * @param {string} webhookLink - The link of the integration (Webhook)
     */
    set Integration(webhookLink) {
        this._integration = new WebhookClient({ url: webhookLink })
    }
    //#endregion


    //#region ========== [ Constructors ] ===========
    /**
     * Constructor to create a new group.
     * 
     * @param {int} id - Id of the group.
     * @param {string} name  - Name of the group.
     */
    constructor(id, name) {
        this._id = id;
        this._name = name;
        this._vips = {};
        this._trackedPlayersCache = {};
    }
    //#endregion


    // #region ========== [ Methods ] ===========
    /**
     * Method to fetch the players and update the list of current tracked players.
     */
    async UpdateVIPs() {
        let players = await Noblox.getPlayers(this._id, this._trackedRolesets);
        players.forEach(plr => {
            let plrInstance = new VIP(plr.userId, plr.username);
            this._vips[plr.userId] = plrInstance;
        })
    }
    // #endregion


    /**
     * 
     * @param {Game} game 
     */
    async Track(game) {
        let leftPlayers = [];
        let joinedPlayers = [];

        //getting status of the users
        let plrPresences = await Noblox.getPresences(
            Object.values(this._vips).map(vip => vip.UserId)
        );

        //checking if they're playing the game
        for (let userP of plrPresences.userPresences) {
            let plr = this._vips[userP.userId];

            if (userP.rootPlaceId == game.PlaceId) { //plr is playing tracked game

                if (this._trackedPlayersCache[plr.UserId] == undefined) { //plr joined the game 
                    joinedPlayers.push(plr);
                    this._trackedPlayersCache[plr.UserId] = plr;
                } else {
                    //plr is still playing
                }
            } else { // checking if the user left the game

                if (this._trackedPlayersCache[plr.UserId] != undefined) { //plr left the game
                    leftPlayers.push(plr);
                    delete this._trackedPlayersCache[plr.UserId];
                } else {

                }
            }
        }

        console.log("Player(s) joined : " + joinedPlayers);
        console.log("Player(s) left : " + leftPlayers);
        console.log("------------------------------------------")

    }
}
module.exports = Group