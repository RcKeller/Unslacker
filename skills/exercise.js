// UUID package if you have issues w/ id props
// import uuid from 'uuid/v4'

/*
Exercise feature for Unslacker.
PLEASE NOTE: JSON-file has many limitations -
*/

const Exercise = (controller) => {
  // const store = controller.storage.teams
  const store = require('botkit-promise-storage')(controller).teams
  const commands = {
    create: ['create (.*)'],
    answer: ['answer (.*)'],
    vote: ['vote (.*)'],
    start_vote: ['start vote'],
    end: ['end']
  }
  const triggers = {
    create: 'direct_message',
    answer: 'direct_message',
    vote: 'direct_message',
    start_vote: 'direct_message',
    end: 'direct_message'
  }
  const extractTitleAndCode = (message = { match: [] }) => {
    let [title, code] = message.match[1].split('```')
    return { title, code }
  }
  var mainChannel = ""
  var state = 1
  
  function isAdmin(bot, user) {
    bot.api.users.info({user}, (err, results) => {
      return results.user.is_admin
    })
  }
  
  /*
  CREATE AN EXERCISE
  Sets the current channel exercise

  @bot create <title> ```code```
  */
  controller.hears(commands.create, triggers.create, (bot, message) => {
    if(state == 1) {
      //  Extract props and destructure
      const { user, channel, ts: timestamp } = message
      const { title, code } = extractTitleAndCode(message)
      const exercise = { title, code }
      bot.api.channels.list({}, (err, results) => {
        for(let channel of results.channels) {
          if(channel.name == "general") {
              mainChannel = channel.id
          }
        }
        bot.api.users.info({ user }, (err, results) => {
        //  Make sure the person is an admin
        //  Remove the ! before finishing
          if (!results.user.is_admin) {
            store.get(message.team)
              .then(data => {
                data.exercise = exercise
                data.answers = {}
                data.user_votes = {}
                store.save(data)
                  .then(saved => {
                    state = 2
                    bot.say({
                      text: ` ###############################
  New exercise: ${title}
  \`\`\`${code}\`\`\`
  Submit answers to this exercise by direct messaging me with the following syntax: \`\`\`answer <your_title> \`\`\`<your_solution>\`\`\`\`\`\`
  ###############################`,
                      channel: mainChannel
                    })
                  })
                  .catch(err => bot.reply(message, `Sorry! I couldn't start this exercise - ${err}`))
              })
              .catch(err => bot.reply(message.team, `Sorry! I couldn't find data for your team - ${err}`))
          }
        })
      })
    } else {
      bot.reply(message, "I'm sorry you can't use that command right now")
    }
  })

  // /*
  // ANSWER AN EXERCISE
  // Submit your answer to the channel exercise
  // @bot answer <title> ```code```
  // */
  controller.hears(commands.answer, triggers.answer, (bot, message) => {
    if(state == 2) {
      //  Extract props and destructure
      const { user, channel, ts: timestamp } = message
      const { title, code } = extractTitleAndCode(message)
      const answer = { title, code }
      store.get(message.team)
      .then(data => {
        data.answers = { [user]: answer }
        store.merge(data)
          .then(saved => {
            bot.reply(message, `Answer Saved!`)
          })
          .catch(err => bot.reply(message, `Sorry! I couldn't submit this answer - ${err}`))
      })
      .catch(err => bot.reply(message.team, `Sorry! I couldn't find data for your team - ${err}`))
    } else {
      bot.reply(message, "I'm sorry you can't use that command right now")
    }
  })

  /*
  VOTE FOR AN ANSWER
  Vote on a "best" answer to a quiz.
  You may not vote for multiples, or your own
  @bot vote <answer title>
  */
  controller.hears(commands.vote, 'direct_message', (bot, message) => {
    if(state == 3) {
      //  Extract props and destructure
      var voteNum = message.event.text.split(" ")[1]
      const { user, channel, ts: timestamp } = message
      const vote = { user, approve: true }
      store.get(message.team)
        .then(data => {
          var voters = data.user_votes.voters
          if(voters.indexOf(user) == -1 && (Object.keys(data.user_votes).length - 1) > parseInt(voteNum) && parseInt(voteNum) >= 0) {
            voters.push(user)
            var voteTotal = data.user_votes[voteNum].votes + 1
            data.user_votes[voteNum].votes = voteTotal
            data.user_votes.voters = voters
            store.merge(data)
              .then(saved => {
                bot.reply(message, `Vote Saved!`)
              })
              .catch(err => bot.reply(message, `Sorry! I couldn't submit this vote - ${err}`))
          } else {
            if(parseInt(voteNum) < 0 || (Object.keys(data.user_votes).length - 1) < parseInt(voteNum)) {
              bot.reply(message, 'the value you entered is not valid')
            } else {
              bot.reply(message, 'You have already voted')
            }
          }
        })
        .catch(err => bot.reply(message.team, `Sorry! I couldn't find data for your team - ${err}`))
    } else {
      bot.reply(message, "I'm sorry you can't use that command right now")
    }
  })

  controller.hears(commands.start_vote, triggers.start_vote, (bot, message) => {
    if(state == 2 && !isAdmin(bot, message.user)) {
      const { user, channel, ts: timestamp } = message
      console.log('main ' + mainChannel)
      bot.say({
        text: `Quiz answers will be posted in reply to this message. Vote on the best answer by direct messaging me with the following syntax: \`\`\`vote <number_of_answer>\`\`\``,
        channel: mainChannel}, (err, response) => {
        store.get(message.team)
        .then(data => {
          let it = 0
          data.user_votes = {
            voters: []
          }
          for (let key in data.answers) {
            if (data.answers[key]['code']) {
              const reply = `Answer: ${it}\r\`\`\`${data.answers[key]['code']}\`\`\``
              data.user_votes[it] = {
                user: key,
                code: data.answers[key].code,
                votes: 0
              }
              bot.replyInThread(response, reply)
              it++
            }
          }
          store.save(data)
          state = 3
        })
        .catch(err => bot.reply(message.team, `I couldn't find the answers :(`))
      })
    } else {
      bot.reply(message, "I'm sorry you can't use that command right now")
    }
  })

  controller.hears(commands.end, triggers.end, (bot, message) => {
    if(state == 3 && !isAdmin(bot, message.user)) {
      store.get(message.team)
      .then(data => {
        var votes = data.user_votes
        var best = ""
        for(let key in votes) {
          if(best == "") {
            best = votes[key]
          }
          if(votes[key].votes > best.votes) {
            best = votes[key]
          }
        }
        bot.api.users.info({user: best.user}, (err, results) => {
          bot.say({
            text: `${results.user.name} had the most popular answer with the following code: \r \`\`\` ${best.code}\`\`\``,
            channel: mainChannel})
          })
          state = 1
        })
    } else {
      bot.reply(message, "I'm sorry you can't use that command right now")
    }
  })
}

module.exports = Exercise
