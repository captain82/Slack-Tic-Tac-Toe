'use strict';

const sendMessage = require('../helpers/messenger').default;
const constants = require('../constants');

/**
* Handles userId's move if they are the current player
*
* @param gameManager {Object}
* @param channelId {string}
* @param userId {string}
* @param cmdParams {[]string} - params passed with `/ttt move` command
* @param res {Object} - the response object to post back to channel
*/
function move (gameManager, channelId, userId, position) {
  // if (!gameManager.hasGame(channelId)) {
  //   sendMessage(res, constants.NO_GAME_EXISTS, []);
  //   return;
  // }

  const game = gameManager.getGame(channelId);

   if (!game.validPlayer(userId)) {
     sendMessage(res, constants.INVALID_PLAYER, []);
     return;
   }

   if (userId !== game.getCurrentPlayer()) {
     sendMessage(res, constants.INVALID_TURN, []);
     return;
   }

  // if (cmdParams.length !== 2) {
  //   sendMessage(res, constants.INVALID_MOVE, []);
  //   return;
  // }

  // if (isNaN(position) || !Number.isInteger(Number(position))) {
  //   sendMessage(res, constants.INVALID_MOVE, []);
  //   return;
  // }

  // if (!game.validMove(position)) {
  //   sendMessage(res, constants.INVALID_MOVE, []);
  //   return;
  // }

   

  console.log(position);
  game._addMove(position);

  if (game.isWinner()) {
    const attachments = buildAttachments([game.getWinMsg()]);
    const message = buildMessage('',attachments);
    //sendMessage(res, '', [board, game.getWinMsg()]);
    gameManager.removeGame(channelId);
    console.log(message);
    return message;
  }

  const board = game._buildTicTacMessage();
  game.toggleCurrentPlayer();
  return board;

  // if (game.isWinner()) {
  //   sendMessage(res, '', [board, game.getWinMsg()]);
  //   gameManager.removeGame(channelId);
  //   return;
  // }

  // if (game.isBoardFull()) {
  //   sendMessage(res, '', [board, constants.DRAW_MESSAGE]);
  //   gameManager.removeGame(channelId);
  //   return;
  // }


  //sreturn board;
  //sendMessage(res, '', [board, game.getCurrentPlayerMsg()]);
}

function buildAttachments(attachmentMessages){
  let attachments = [];
  for(const message of attachmentMessages){
      attachments.push({
          'text':message
      });
  }
  return attachments;
}

function buildMessage(mainMessage,attachments){
  return{
      'response_type':'in_channel',
      'text': mainMessage,
      'attachments':attachments
  };
}

module.exports = move;
