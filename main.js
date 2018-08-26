var Discord = require("discord.js");
var prefix = "t!";
var client = new Discord.Client();

client.on("ready", () => {
  console.log("ready to rumble!");
});

var bannedwords = "FDP,fdp,fils de pute,NTM,ntm,nique,nique ta mère,PD,pd,chien,chienne,pute,salope,merde,ornithorinque".split(",");

client.on("message", msg => {
  if (msg.guild === null) return;

  for (i=0;i<bannedwords.length;i++) {
    if (msg.content.toLowerCase().includes(bannedwords[i])) {
      msg.delete();
      msg.reply("Stp mek ne soi pa vulguerre!");
      return;
    }
  }

  if (msg.author.bot) return;
  if (!msg.member.hasPermission("ADMINISTRATOR")) return;

  if (!msg.content.toLowerCase().startsWith(prefix)) return;
  msg.delete();
  if (msg.content.toLowerCase().startsWith(prefix + "kick")) {
    var mem = msg.mentions.members.first();
    mem.kick().then(() => {
      msg.channel.send(mem.displayName + " a été kick par " + msg.author.username + "!");
    }).catch(e => {
      msg.channel.send("Une erreur est survenue");
    });
  }
  if (msg.content.toLowerCase().startsWith(prefix + "ban")) {
    var mem = msg.mentions.members.first();
    var mc = msg.content.split(" ")[2];
    mem.ban(mc).then(() => {
      msg.channel.send(mem.displayName + " a été ban par " + msg.author.username + " pour " + mc + " jours!");
    }).catch(e => {
      msg.channel.send("Une erreur est survenue");
    });
  }
  if (msg.content.toLowerCase().startsWith(prefix + "mute")) {
    var mem = msg.mentions.members.first();
    if (msg.guild.roles.find("name", "Mute")) {
      mem.addRole(msg.guild.roles.find("name", "Mute")).then(() => {
        msg.channel.send(mem.displayName + " a été mute!");
      }).catch(e => {
        msg.channel.send("Une erreur est survenue");
        console.log(e);
      });

    }
  }
  if (msg.content.toLowerCase().startsWith(prefix + "unmute")) {
    var mem = msg.mentions.members.first();
    if (msg.guild.roles.find("name", "Mute")) {
      mem.removeRole(msg.guild.roles.find("name", "Mute")).then(() => {
        msg.channel.send(mem.displayName + " a été unmute!");
      }).catch(e => {
        msg.channel.send("Une erreur est survenue");
        console.log(e);
      });

    }
  }
  if (msg.content.toLowerCase().startsWith(prefix + "purge")) {
    var mc = msg.content.split(" ")[1];
    msg.channel.bulkDelete(mc);
  }
  if (msg.content.toLowerCase().startsWith(prefix + "eval")) {
    var sc = msg.content.substring(msg.content.indexOf(" "));
    eval(sc);
  }
  if (msg.content.toLowerCase().startsWith(prefix + "calc")) {
    var ca = msg.content.substring(msg.content.indexOf(" "));
    msg.reply(ca + " fait " + eval(ca).toFixed(2));
  }
});

client.login('NDgzMDI2NjgyODQ5MDAxNDcz.DmNhAg.vnzPoVXJFQsQeCnoqeqFlEjyAjc');