module.exports.config = {
    name: 'uid',
    version: '1.1.1',
    hasPermssion: 0,
    credits: 'leak cc dm',
    description: 'Lấy thời gian người dùng tạo tài khoản Facebook!',
    commandCategory: 'Tiện ích',
    usages: '[...|reply|tag|url]'
};
const {get} = require('axios');
module.exports.run = function({ api, event, args }){
  const uid = event.type == 'message_reply' ? event.messageReply.senderID: !!Object.keys(event.mentions)[0] ? Object.keys(event.mentions)[0]: !!args[0] ? args[0]: event.senderID;
  get(`https://api-caochungdat.bokdepzai.repl.co/facebook/act?user=${uid}`).then(response => {
      var txt;
      if (response.data.status == 404) txt = `Die acc or khóa wall`;
      if (response.data.status == 200) txt = `${response.data.data.date}\n${response.data.data.uid}\n${response.data.data.time}`;
      api.sendMessage(txt, event.threadID, event.messageID);
  }).catch(e => api.sendMessage(e, event.threadID, event.messageID));
};
