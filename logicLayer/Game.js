// #region ========== [ Requires ] ===========

// #endregion


/**
 * Class representing a Roblox game (experience)
 */
class Game {
    //#region ========== [ Attributes ] ===========
    _placeId
    _name
    //#endregion


    //#region ========== [ Properties ] ===========
    /**
        * Gets the place's unique ID.
        * @returns {number} The place ID.
        */
    get PlaceId() {
        return this._placeId
    }


    /**
     * Gets the name.
     * @returns {string} Name of the game.
     */
    get Name() {
        return this._name;
    }

    //#endregion


    //#region ========== [ Constructors ] ===========
    /**
     * Instanciates our Game
     * 
     * @param {int} placeId Place id of the game.
     * @param {string} name Name of the game.
     */
    constructor(placeId, name) {
        this._placeId = placeId;
        this._name = name;
    }
    //#endregion

}

module.exports = Game;