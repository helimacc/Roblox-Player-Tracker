// #region ========== [ Requires ] ===========
const Discord = require("discord.js");
const Data = require("./data.json");
const Group = require("./logicLayer/Group");
const Noblox = require("noblox.js");
const Game = require("./logicLayer/Game");

//const FS = require('fs');
require("dotenv").config();

//const EXPRESS = require('express');
//const APP = EXPRESS();
//const PORT = 3596;
//#endregion


// #region ========== [ Variables ] ===========
let registeredGroups = [];
let registeredGames = [];
let trackingInterval = 30 * 1000; // 30 seconds
let updateInterval = 30 * 10000 // 5 minutes
// #endregion



// #region ========== [ Main cycle ] ===========
if (LoginToRoblox()){ //Will run only if connected to the account.

    InitGroups();
    InitGames();
    UpdateAllVIPs();
    
        
    //Checking for players every : trackingInterval
    setInterval(()=>{
        Track();
    },trackingInterval)
    
    //Updating tracked players every : updateInterval
    setInterval(()=>{
        UpdateAllVIPs();
    },updateInterval)
    // #endregion
}







// #region ========== [ Init Functions ] ===========
/** 
 * Inits tracked groups.
*/
function InitGroups(){
    for(group in Data.groups){
        let groupData = Data.groups[group];
        let groupInstance = new Group(groupData.id, groupData.name);
        groupInstance.Notify = groupData.notify;
        groupInstance.Integration = groupData.integration;
        groupInstance.PingRole = groupData.pingRole;
        groupInstance.TrackedRolesets = groupData.trackedRolesets;

        registeredGroups.push(groupInstance);
    }
}

/** 
 * Inits tracked games.
*/
function InitGames(){
    for(game in Data.trackedGames){
        let gameData = Data.trackedGames[game];
        let gameInstance = new Game(gameData.id,gameData.name);
        registeredGames.push(gameInstance);
    }
}

/**
 * Function updating the list of tracked players accross all groups.
 */
function UpdateAllVIPs(){
    for(i in registeredGroups){ 
        registeredGroups[i].UpdateVIPs();
    }
}


/**
 * Function that uses our groups and games to start tracking.
 * 
 */
function Track(){
    let gameToTrackOn = registeredGames[0]; //ONLY DOING ONE GAME FOR NOW

    for(i in registeredGroups){ 
        registeredGroups[i].Track(gameToTrackOn);
    }
}



/**
 * 
 * @returns bool - If successfully connected to Roblox using the provided cookie.
 */
async function LoginToRoblox(){
    let success = true;
    try{
        await Noblox.setCookie(process.env.ROBLOX_COOKIE);
    }catch{
        success = false;
    }
    success ? console.log("[ROBLOX LOGIN] : Success") : console.log("[ROBLOX LOGIN] : Something went wrong, try again.")

    return success;
}
//#region 






