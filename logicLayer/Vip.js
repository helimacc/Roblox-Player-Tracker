// #region ========== [ Requires ] ===========

// #endregion


/**
 * Class representing a Roblox player that is being tracked.
 */
class VIP {
    //#region ========== [ Attributes ] ===========
    _userId;
    _username;
    _rankName;
    _rankId;
    //#endregion


    //#region ========== [ Properties ] ===========
    /**
        * Gets the user's unique ID.
        * @returns {number} The user ID.
        */
    get UserId() {
        return this._userId;
    }


    /**
     * Gets the username.
     * @returns {string} The username.
     */
    get Username() {
        return this._username;
    }


    /**
     * Sets the username.
     * @param {string} username - The username to set.
     */
    set Username(username) {
        this._username = username;
    }


    /**
     * Gets the rank name of the user.
     * @returns {string} The rank name.
     */
    get RankName() {
        return this._rankName;
    }


    /**
     * Sets the rank name of the user.
     * @param {string} rankName - The rank name to set.
     */
    set RankName(rankName) {
        this._rankName = rankName;
    }


    /**
     * Gets the rank ID associated with the user.
     * @returns {number} The rank ID.
     */
    get RankId() {
        return this._rankId;
    }
    //#endregion


    //#region ========== [ Constructors ] ===========
    /**
     * Instanciates our VIP.
     * 
     * @param {int} id 
     * @param {string} username 
     */
    constructor(id, username) {
        this._userId = id;
        this._username = username;
    }
    //#endregion

}

module.exports = VIP;