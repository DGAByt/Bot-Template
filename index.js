const Discord = require("discord.js");
const figlet = require("figlet");
const OS = require("os");
var cpuStat = require("cpu-stat");
const easy = require("easymaty");
const Zoro = require("zoro-api");
const utils = require("discord-utilities-js");
const Natsumi = new Discord.Client();
const config = require("./config.json");
var play = require("google-play-scraper");

Natsumi.on("ready", () => {
  console.log("Tu Bot esta en linea.");
  setInterval(() => {
    let estados = [`Viendo ${Natsumi.guilds.cache.size} servidores`];
    let chase_all = Math.floor(Math.random() * estados.length);
    Natsumi.user.setPresence({
      status: "online",
      activity: {
        name: estados[chase_all],
        type: "PLAYING",
      },
    });
  }, 15000);
});

let prefix = config.prefix;
let Developer = config.developer;
let NatsumiID = config.botid;
let color = config.color;
let nombre = config.nombre;
let invitacion = config.invitacion;
let servidor = config.servidor;

Natsumi.on("message", async (msg) => {
  const args = msg.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  if (msg.author.bot) return;

  ////////// Comandos de MessageReaction //////////

  if (msg.content.toLowerCase().startsWith("hola")) {
    msg.react("👋");
  } else if (msg.content.toLowerCase().startsWith("adios")) {
    msg.react("👋");
  } else if (msg.content === "F") {
    msg.react("🇫");
  }

  if (!msg.content.startsWith(prefix)) return;

  ////////// Comando Help //////////

  if (command === "help") {
    let selection = (args[0] || "").toLowerCase();
    let embed = new Discord.MessageEmbed().setColor(color);

    if (["botinfo"].includes(selection)) {
      embed
        .setAuthor('Ayuda detallada de "botinfo"', Natsumi.user.avatarURL())
        .addField("Categoría", "Comandos Informativos")
        .addField("Permisos de usuario", "Ninguno")
        .addField("Descripción", "Muestra información técnica del bot.")
        .addField("Uso", "n!botinfo")
        .addField("Ejemplo", "Ninguno")
        .setColor(color)
        .setFooter(
          "<> = obligatorio | [] = opcional. | No incluyas estos símbolos al momento de ejecutar el comando."
        );
      msg.channel.send(embed);
    } else if (["emojilist"].includes(selection)) {
      embed
        .setAuthor('Ayuda detallada de "emojilist"', Natsumi.user.avatarURL())
        .addField("Categoría", "Comandos de Informativos")
        .addField("Permisos de usuario", "Ninguno")
        .addField(
          "Descripción",
          "Mustra todos los emojis del servidor separados por paginas"
        )
        .addField("Uso", "n!emojilist")
        .addField("Ejemplo", "Ninguno")
        .setColor(color)
        .setFooter(
          "<> = obligatorio | [] = opcional. | No incluyas estos símbolos al momento de ejecutar el comando."
        );

      msg.channel.send(embed);
    } else if (["amongus"].includes(selection)) {
      embed
        .setAuthor('Ayuda detallada de "Amongus"', Natsumi.user.avatarURL())
        .addField("Categoría", "Comandos de Informativos")
        .addField("Permisos de usuario", "Ninguno")
        .addField(
          "Descripción",
          "Mustra todos los miembros que estan jugando AmongUs"
        )
        .addField("Uso", "n!amongus all \n n!amonus room <Codigo>")
        .addField("Ejemplo", "Ninguno")
        .setColor(color)
        .setFooter(
          "<> = obligatorio | [] = opcional. | No incluyas estos símbolos al momento de ejecutar el comando."
        );

      msg.channel.send(embed);
    } else if (["impostor"].includes(selection)) {
      embed
        .setAuthor('Ayuda detallada de "impostor"', Natsumi.user.avatarURL())
        .addField("Categoría", "Comandos Divertidos")
        .addField("Permisos de usuario", "Ninguno")
        .addField(
          "Descripción",
          "Mustra una imagen donde eres impostor de Among us"
        )
        .addField("Uso", "n!impostor [@usuario]")
        .addField("Ejemplo", "Ninguno")
        .setColor(color)
        .setFooter(
          "<> = obligatorio | [] = opcional. | No incluyas estos símbolos al momento de ejecutar el comando."
        );

      msg.channel.send(embed);
    } else if (["jumbo"].includes(selection)) {
      embed
        .setAuthor('Ayuda detallada de "jumbo"', Natsumi.user.avatarURL())
        .addField("Categoría", "Comandos Útiles")
        .addField("Permisos de usuario", "Ninguno")
        .addField(
          "Descripción",
          "Obtén la imagen más grande del emoji proporcionado. \n Nota: Los emojis de Discord no se pueden expandir."
        )
        .addField("Uso", "n!jumbo <emoji>")
        .addField(
          "Ejemplo",
          "n!jumbo :PartyCat: \n Esto enviará la imagen del emoji más grande."
        )
        .setColor(color)
        .setFooter(
          "<> = obligatorio | [] = opcional. | No incluyas estos símbolos al momento de ejecutar el comando."
        );
      msg.channel.send({ embed });
    } else if (["ascii"].includes(selection)) {
      embed
        .setAuthor('Ayuda detallada de "ascii"', Natsumi.user.avatarURL())
        .addField("Categoría", "Comandos Divertidos")
        .addField("Permisos de usuario", "Ninguno")
        .addField("Descripción", "Convierte un texto en un textart ascii")
        .addField("Uso", "n!ascii <texto>")
        .addField("Ejemplo", "n!ascii Hola")
        .setColor(color)
        .setFooter(
          "<> = obligatorio | [] = opcional. | No incluyas estos símbolos al momento de ejecutar el comando."
        );
      msg.channel.send({ embed });
    } else if (["8ball"].includes(selection)) {
      embed
        .setAuthor('Ayuda detallada de "8ball"', Natsumi.user.avatarURL())
        .addField("Categoría", "Comandos Divertidos")
        .addField("Permisos de usuario", "Ninguno")
        .addField(
          "Descripción",
          "Hazle preguntas de sí/no a Chocolat y ella te responderá. Ten en cuenta que por cuestiones de coherencia entre la pregunta y respuesta, debes preguntar algo que se pueda contestar con Sí o No"
        )
        .addField("Uso", "n!8ball <pregunta>")
        .addField(
          "Ejemplo",
          "n!8ball ¿conseguiré el amor de ella? \n Esto responderá la pregunta en diferentes formas. \n --Posiblemente me responda que no a la pregunta del ejemplo :c-- "
        )
        .setColor(color)
        .setFooter(
          "<> = obligatorio | [] = opcional. | No incluyas estos símbolos al momento de ejecutar el comando."
        );
      msg.channel.send({ embed });
    } else if (["avatar"].includes(selection)) {
      embed
        .setAuthor('Ayuda detallada de "avatar"', Natsumi.user.avatarURL())
        .addField("Categoría", "Comandos Útiles")
        .addField("Permisos de usuario", "Ninguno")
        .addField(
          "Descripción",
          "Muestra el avatar tuyo o del usuario mencionado. También puedes colocar la ID del usuario el cual quieras ver el avatar."
        )
        .addField("Uso", "n!avatar [@usuario]")
        .addField(
          "Ejemplo",
          `n!avatar | n!avatar @${Developer} \n 1. n!avatar: Muestra tu propio avatar. \n 2. n!avatar @usuario: Esto mostrará el avatar del usuario mencionado.`
        )
        .setColor(0xf7b4b4)
        .setFooter(
          "<> = obligatorio | [] = opcional. | No incluyas estos símbolos al momento de ejecutar el comando."
        );
      msg.channel.send({ embed });
    } else if (["membercount"].includes(selection)) {
      embed
        .setAuthor('Ayuda detallada de "membercount"', Natsumi.user.avatarURL())
        .addField("Categoría", "Comandos Informativos")
        .addField("Permisos de usuario", "Ninguno")
        .addField(
          "Descripción",
          "Muestra la cantidad de miembros en el servidor"
        )
        .addField("Uso", "n!membercount")
        .addField("Ejemplo", "Ninguno")
        .setColor(color)
        .setFooter(
          "<> = obligatorio | [] = opcional. | No incluyas estos símbolos al momento de ejecutar el comando."
        );
      msg.channel.send({ embed });
    } else if (["userinfo"].includes(selection)) {
      embed
        .setAuthor('Ayuda detallada de "userinfo"', Natsumi.user.avatarURL())
        .addField("Categoría", "Comandos Útiles")
        .addField("Permisos de usuario", "Ninguno")
        .addField(
          "Descripción",
          "Muestra información detallada de ti o del usuario mencionado."
        )
        .addField("Uso", "n!userinfo <@usuario>")
        .addField(
          "Ejemplo",
          "n!userinfo @DGAB#4485 \n Muestra información detallada del usuario mencionado."
        )
        .setColor(color)
        .setFooter(
          "<> = obligatorio | [] = opcional. | No incluyas estos símbolos al momento de ejecutar el comando."
        );
      msg.channel.send({ embed });
    } else if (["serverinfo"].includes(selection)) {
      embed
        .setAuthor('Ayuda detallada de "serverinfo"', Natsumi.user.avatarURL())
        .addField("Categoría", "Comandos Útiles")
        .addField("Permisos de usuario", "Ninguno")
        .addField("Descripción", "Obtén información detallada del servidor.")
        .addField("Uso", "n!serverinfo")
        .addField("Ejemplo", "Ninguno")
        .setColor(color)
        .setFooter(
          "<> = obligatorio | [] = opcional. | No incluyas estos símbolos al momento de ejecutar el comando."
        );
      msg.channel.send({ embed });
    } else if (["say"].includes(selection)) {
      embed
        .setAuthor('Ayuda detallada de "say"', Natsumi.user.avatarURL())
        .addField("Categoría", "Comandos Divertidos")
        .addField("Permisos de usuario", "Ninguno")
        .addField(
          "Descripción",
          "Chocolat repetirá lo que dices y eliminará tu mensaje"
        )
        .addField("Uso", "n!say <texto>")
        .addField(
          "Ejemplo",
          "n!say Hola \n Esto hará que repita lo que escribiste y elimine tu mensaje."
        )
        .setColor(color)
        .setFooter(
          "<> = obligatorio | [] = opcional. | No incluyas estos símbolos al momento de ejecutar el comando."
        );
      msg.channel.send({ embed });
    } else if (["playstore"].includes(selection)) {
      embed
        .setAuthor('Ayuda detallada de "playstore"', Natsumi.user.avatarURL())
        .addField("Categoría", "Comandos Utiles")
        .addField("Permisos de usuario", "Ninguno")
        .addField(
          "Descripción",
          "Muestra la informacion de una app de play store"
        )
        .addField("Uso", "n!playstore <app>")
        .addField("Ejemplo", "n!playstore PUBG")
        .setColor(color)
        .setFooter(
          "<> = obligatorio | [] = opcional. | No incluyas estos símbolos al momento de ejecutar el comando."
        );
      msg.channel.send({ embed });
    } else if (["howgay"].includes(selection)) {
      embed
        .setAuthor('Ayuda detallada de "howgay"', Natsumi.user.avatarURL())
        .addField("Categoría", "Comandos Divertidos")
        .addField("Permisos de usuario", "Ninguno")
        .addField(
          "Descripción",
          "Muestra el un porcentaje al azar de el usuario mencionado"
        )
        .addField("Uso", "n!howgay <user>")
        .addField("Ejemplo", "n!Howgay @user")
        .setColor(color)
        .setFooter(
          "<> = obligatorio | [] = opcional. | No incluyas estos símbolos al momento de ejecutar el comando."
        );
      msg.channel.send({ embed });
    } else if (["reportbug"].includes(selection)) {
      embed
        .setAuthor('Ayuda detallada de "reportbug"', Natsumi.user.avatarURL())
        .addField("Categoría", "Comandos Utiles")
        .addField("Permisos de usuario", "Ninguno")
        .addField("Descripción", "Reporta un bug o una recomnedaicon")
        .addField("Uso", "n!reportbug <bug>")
        .addField("Ejemplo", "Ninguno")
        .setColor(color)
        .setFooter(
          "<> = obligatorio | [] = opcional. | No incluyas estos símbolos al momento de ejecutar el comando."
        );
      msg.channel.send({ embed });
    }

    ////////// Comandos de Interacción //////////
    else if (["bite"].includes(selection)) {
      embed
        .setAuthor('Ayuda detallada de "bite"', Natsumi.user.avatarURL())
        .addField("Categoría", "Comandos de Interacción")
        .addField("Permisos de usuario", "Ninguno")
        .addField("Descripción", "Muerde al usuario mencionado.")
        .addField("Uso", "n!bite <@usuario>")
        .addField("Ejemplo", "n!bite @DGAB#4485")
        .setColor(color)
        .setFooter(
          "<> = obligatorio | [] = opcional. | No incluyas estos símbolos al momento de ejecutar el comando."
        );
      msg.channel.send({ embed });
    } else if (["claps"].includes(selection)) {
      embed
        .setAuthor('Ayuda detallada de "claps"', Natsumi.user.avatarURL())
        .addField("Categoría", "Comandos de Interacción")
        .addField("Permisos de usuario", "Ninguno")
        .addField(
          "Descripción",
          "Aplaude de algo o aplaude al usuario mencionado."
        )
        .addField("Uso", "n!claps [@usuario]")
        .addField(
          "Ejemplo",
          "n!claps | ch!claps @DGAB#4485 \n 1. n!claps: Esto hará que le aplaudas a algo. \n 2. n!claps @usuario: Aplaude al usuario mencionado."
        )
        .setColor(color)
        .setFooter(
          "<> = obligatorio | [] = opcional. | No incluyas estos símbolos al momento de ejecutar el comando."
        );
      msg.channel.send({ embed });
    } else if (["cookie"].includes(selection)) {
      embed
        .setAuthor('Ayuda detallada de "cookie"', Natsumi.user.avatarURL())
        .addField("Categoría", "Comandos de Interacción")
        .addField("Permisos de usuario", "Ninguno")
        .addField(
          "Descripción",
          "Come una galleta o regala una galleta al usuario mencionado."
        )
        .addField("Uso", "n!cookie [@usuario]")
        .addField(
          "Ejemplo",
          "n!cookie | ch!cookie @DGAB#4485 \n 1. n!cookie: Esto hará que comas una galleta. \n 2. n!cookie @usuario: Regala una galleta al usuario mencianado."
        )
        .setColor(color)
        .setFooter(
          "<> = obligatorio | [] = opcional. | No incluyas estos símbolos al momento de ejecutar el comando."
        );
      msg.channel.send({ embed });
    } else if (["dance"].includes(selection)) {
      embed
        .setAuthor('Ayuda detallada de "dance"', Natsumi.user.avatarURL())
        .addField("Categoría", "Comandos de Interacción")
        .addField("Permisos de usuario", "Ninguno")
        .addField(
          "Descripción",
          "Expresa tus ganas de bailar ♫ O baila con el usuario mencionado."
        )
        .addField("Uso", "n!dance [@usuario]")
        .addField(
          "Ejemplo",
          "n!dance | n!dance @DGAB#4485 \n 1. n!dance: Empezarás a bailar. \n 2. n!dance @usuario: Esto hará que bailes junto al usuario mencionado."
        )
        .setColor(color)
        .setFooter(
          "<> = obligatorio | [] = opcional. | No incluyas estos símbolos al momento de ejecutar el comando."
        );
      msg.channel.send({ embed });
    } else if (["feed"].includes(selection)) {
      embed
        .setAuthor('Ayuda detallada de "feed"', Natsumi.user.avatarURL())
        .addField("Categoría", "Comandos de Interacción")
        .addField("Permisos de usuario", "Ninguno")
        .addField("Descripción", "Dale de comer a un usuario, o come tu mismo.")
        .addField("Uso", "n!feed [@usuario]")
        .addField("Ejemplo", "n!feed | n!feed @DGAB#4485")
        .setColor(color)
        .setFooter(
          "<> = obligatorio | [] = opcional. | No incluyas estos símbolos al momento de ejecutar el comando."
        );
      msg.channel.send({ embed });
    } else if (["hi"].includes(selection)) {
      embed
        .setAuthor('Ayuda detallada de "hi"', Natsumi.user.avatarURL())
        .addField("Categoría", "Comandos de Interacción")
        .addField("Permisos de usuario", "Ninguno")
        .addField(
          "Descripción",
          "Saluda a un amigo o saluda a todos los presentes n.n/"
        )
        .addField("Uso", "n!hi [@usuario]")
        .addField("Ejemplo", "n!hi | n!hi @DGAB#4485")
        .setColor(color)
        .setFooter(
          "<> = obligatorio | [] = opcional. | No incluyas estos símbolos al momento de ejecutar el comando."
        );
      msg.channel.send({ embed });
    } else if (["hug"].includes(selection)) {
      embed
        .setAuthor('Ayuda detallada de "hug"', Natsumi.user.avatarURL())
        .addField("Categoría", "Comandos de Interacción")
        .addField("Permisos de usuario", "Ninguno")
        .addField("Descripción", "Abraza a alguien del servidor >u<")
        .addField("Uso", "ch!hug <@usuario>")
        .addField("Ejemplo", "n!hug @DGAB#4485")
        .setColor(color)
        .setFooter(
          "<> = obligatorio | [] = opcional. | No incluyas estos símbolos al momento de ejecutar el comando."
        );
      msg.channel.send({ embed });
    } else if (["kickbutts"].includes(selection)) {
      const embed = new Discord.MessageEmbed();
      embed
        .setAuthor('Ayuda detallada de "kickbutts"', Natsumi.user.avatarURL())
        .addField("Categoría", "Comandos de Interacción")
        .addField("Permisos de usuario", "Ninguno")
        .addField("Descripción", "Patéale el trasero al usuario mencionado.")
        .addField("Uso", "n!kickbutts <@usuario>")
        .addField("Ejemplo", "n!kickbutts @DGAB#4485")
        .setColor(color)
        .setFooter(
          "<> = obligatorio | [] = opcional. | No incluyas estos símbolos al momento de ejecutar el comando."
        );
      msg.channel.send({ embed });
    } else if (["kill"].includes(selection)) {
      embed
        .setAuthor('Ayuda detallada de "kill"', Natsumi.user.avatarURL())
        .addField("Categoría", "Comandos de Interacción")
        .addField("Permisos de usuario", "Ninguno")
        .addField("Descripción", "Mata al usuario mencionado D':")
        .addField("Uso", "n!kill <@usuario>")
        .addField(
          "Ejemplo",
          "ch!kill @DGAB#4485 \n Esto hará que mates al usuario mencionado."
        )
        .setColor(color)
        .setFooter(
          "<> = obligatorio | [] = opcional. | No incluyas estos símbolos al momento de ejecutar el comando."
        );
      msg.channel.send({ embed });
    } else if (["kiss"].includes(selection)) {
      embed
        .setAuthor('"Ayuda detallada de "kiss"', Natsumi.user.avatarURL())
        .addField("Categoría", "Comandos de Interacción")
        .addField("Permisos de usuario", "Ninguno")
        .addField("Descripción", "Besa al usuario mencionado o///o")
        .addField("Uso", "n!kiss <@usuario>")
        .addField(
          "Ejemplo",
          "n!kiss @DGAB#4485 \n Esto hará que beses al usuario mencionado."
        )
        .setColor(color)
        .setFooter(
          "<> = obligatorio | [] = opcional. | No incluyas estos símbolos al momento de ejecutar el comando."
        );
      msg.channel.send({ embed });
    } else if (["laugh"].includes(selection)) {
      embed
        .setAuthor('Ayuda detallada de "laugh"', Natsumi.user.avatarURL())
        .addField("Categoría", "Comandos de Interacción")
        .addField("Permisos de usuario", "Ninguno")
        .addField("Descripción", "Ríe de la diversión o ríete de alguien.")
        .addField("Uso", "n!laugh [@usuario]")
        .addField(
          "Ejemplo",
          "n!laugh | n!laugh @DGAB#4485 \n 1. n!laugh: Ríete de la diversión o de algo. \n 2. n!laugh @usuario: Ríete del usuario mencionado."
        )
        .setColor(color)
        .setFooter(
          "<> = obligatorio | [] = opcional. | No incluyas estos símbolos al momento de ejecutar el comando."
        );
      msg.channel.send({ embed });
    } else if (["pat"].includes(selection)) {
      embed
        .setAuthor('Ayuda detallada de "pat"', Natsumi.user.avatarURL())
        .addField("Categoría", "Comandos de Interacción")
        .addField("Permisos de usuario", "Ninguno")
        .addField("Descripción", "Acaricia al usuario mencionado")
        .addField("Uso", "n!pat <@usuario>")
        .addField(
          "Ejemplo",
          "n!pat @DGAB#4485 \n n!pat @usuario: Esto hará que acaricies al usuario mencionado."
        )
        .setColor(color)
        .setFooter(
          "<> = obligatorio | [] = opcional. | No incluyas estos símbolos al momento de ejecutar el comando."
        );
      msg.channel.send({ embed });
    } else if (["punch"].includes(selection)) {
      embed
        .setAuthor('Ayuda detallada de "punch"', Natsumi.user.avatarURL())
        .addField("Categoría", "Comandos de Interacción")
        .addField("Permisos de usuario", "Ninguno")
        .addField("Descripción", "Golpea al usuario mencionado D':")
        .addField("Uso", "n!punch <@usuario>")
        .addField(
          "Ejemplo",
          "n!punch @DGAB4485 \n Esto hará que golpees al usuario mencionado."
        )
        .setColor(color)
        .setFooter(
          "<> = obligatorio | [] = opcional. | No incluyas estos símbolos al momento de ejecutar el comando."
        );
      msg.channel.send({ embed });
    } else if (["run"].includes(selection)) {
      embed
        .setAuthor('Ayuda detallada de "run"', Natsumi.user.avatarURL())
        .addField("Categoría", "Comandos de Interacción")
        .addField("Permisos de usuario", "Ninguno")
        .addField(
          "Descripción",
          "Corre de cualquier enemigo, huye de la situación, escapa de la persona a quien tengas a tu lado con este maravilloso comando."
        )
        .addField("Uso", "n!run | n!run @DGAB#4485")
        .addField(
          "Ejemplo",
          "1. n!run: Sal corriendo del lugar. \n 2. n!run @usuario: Sal corriendo del usuario mencionado."
        )
        .setColor(color)
        .setFooter(
          "<> = obligatorio | [] = opcional. | No incluyas estos símbolos al momento de ejecutar el comando."
        );
      msg.channel.send({ embed });
    } else if (["slap"].includes(selection)) {
      embed
        .setAuthor('Ayuda detallada de "slap"', Natsumi.user.avatarURL())
        .addField("Categoría", "Comandos de Interacción")
        .addField("Permisos de usuario", "Ninguno")
        .addField("Descripción", "Bofetea al usuario mencionado")
        .addField(
          "Uso",
          "n!slap <@usuario> \n Esto hará que le des una bofetada al usuario mencionado."
        )
        .addField("Ejemplo", "n!slap @DGAB#4485")
        .setColor(color)
        .setFooter(
          "<> = obligatorio | [] = opcional. | No incluyas estos símbolos al momento de ejecutar el comando."
        );
      msg.channel.send({ embed });
    } else if (["sleep"].includes(selection)) {
      embed
        .setAuthor('Ayuda detallada de "sleep"', Natsumi.user.avatarURL())
        .addField("Categoría", "Comandos de Interacción")
        .addField("Permisos de usuario", "Ninguno")
        .addField(
          "Descripción",
          "Expresa que tienes sueño, o que ya te dormiste zZz"
        )
        .addField("Uso", "n!sleep")
        .addField("Ejemplo", "n!sleep \n Duérmete o expresa tu sueño.")
        .setColor(color)
        .setFooter(
          "<> = obligatorio | [] = opcional. | No incluyas estos símbolos al momento de ejecutar el comando."
        );
      msg.channel.send({ embed });
    }

    ////////// Comandos de Reacción //////////
    else if (["angry"].includes(selection)) {
      embed
        .setAuthor('Ayuda detallada de "angry"', Natsumi.user.avatarURL())
        .addField("Categoría", "Comandos de Reacción")
        .addField("Permisos de usuario", "Ninguno")
        .addField("Descripción", "Expresa que te has enfadado.")
        .addField("Uso", "n!angry")
        .addField("Ejemplo", "Ninguno")
        .setColor(color)
        .setFooter(
          "<> = obligatorio | [] = opcional. | No incluyas estos símbolos al momento de ejecutar el comando."
        );
      msg.channel.send({ embed });
    } else if (["blush"].includes(selection)) {
      embed
        .setAuthor('Ayuda detallada de "blush"', Natsumi.user.avatarURL())
        .addField("Categoría", "Comandos de Reacción")
        .addField("Permisos de usuario", "Ninguno")
        .addField("Descripción", "Expresa que estás sonrojado/a o///o")
        .addField("Uso", "n!blush")
        .addField("Ejemplo", "Ninguno")
        .setColor(color)
        .setFooter(
          "<> = obligatorio | [] = opcional. | No incluyas estos símbolos al momento de ejecutar el comando."
        );
      msg.channel.send({ embed });
    } else if (["boom"].includes(selection)) {
      embed
        .setAuthor('Ayuda detallada de "boom"', Natsumi.user.avatarURL())
        .addField("Categoría", "Comandos de Reacción")
        .addField("Permisos de usuario", "Ninguno")
        .addField(
          "Descripción",
          "¡BOOM! ¡Explota todo a tu alrededor con este comando!"
        )
        .addField("Uso", "n!boom")
        .addField("Ejemplo", "Ninguno")
        .setColor(color)
        .setFooter(
          "<> = obligatorio | [] = opcional. | No incluyas estos símbolos al momento de ejecutar el comando."
        );
      msg.channel.send({ embed });
    } else if (["bored"].includes(selection)) {
      embed
        .setAuthor('Ayuda detallada de "bored"', Natsumi.user.avatarURL())
        .addField("Categoría", "Comandos de Reacción")
        .addField("Permisos de usuario", "Ninguno")
        .addField(
          "Descripción",
          "¿Estás aburrido/a? Demúestralo con este comando."
        )
        .addField("Uso", "n!bored")
        .addField("Ejemplo", "Ninguno")
        .setColor(color)
        .setFooter(
          "<> = obligatorio | [] = opcional. | No incluyas estos símbolos al momento de ejecutar el comando."
        );
      msg.channel.send({ embed });
    } else if (["confused"].includes(selection)) {
      embed
        .setAuthor('Ayuda detallada de "confused"', Natsumi.user.avatarURL())
        .addField("Categoría", "Comandos de Reacción")
        .addField("Permisos de usuario", "Ninguno")
        .addField("Descripción", "Expresa que estás confundido/a. o.O")
        .addField("Uso", "n!confused")
        .addField("Ejemplo", "Ninguno")
        .setColor(color)
        .setFooter(
          "<> = obligatorio | [] = opcional. | No incluyas estos símbolos al momento de ejecutar el comando."
        );
      msg.channel.send({ embed });
    } else if (["cry"].includes(selection)) {
      embed
        .setAuthor("", Natsumi.user.avatarURL())
        .addField("Categoría", "Comandos de Reacción")
        .addField("Permisos de usuario", "Ninguno")
        .addField(
          "Descripción",
          "¿Quieres expresar que estás llorando? Hazlo con este comando."
        )
        .addField("Uso", "n!cry")
        .addField("Ejemplo", "Ninguno")
        .setColor(color)
        .setFooter(
          "<> = obligatorio | [] = opcional. | No incluyas estos símbolos al momento de ejecutar el comando."
        );
      msg.channel.send({ embed });
    } else if (["disgust"].includes(selection)) {
      embed
        .setAuthor('Ayuda detallada de "disgust"', Natsumi.user.avatarURL())
        .addField("Categoría", "Comandos de Reacción")
        .addField("Permisos de usuario", "Ninguno")
        .addField("Descripción", "Expresa que algo te disgusta. ¡Bleh!")
        .addField("Uso", "n!disgust")
        .addField("Ejemplo", "Ninguno")
        .setColor(color)
        .setFooter(
          "<> = obligatorio | [] = opcional. | No incluyas estos símbolos al momento de ejecutar el comando."
        );
      msg.channel.send({ embed });
    } else if (["facepalm"].includes(selection)) {
      embed
        .setAuthor('Ayuda detallada de "facepalm"', Natsumi.user.avatarURL())
        .addField("Categoría", "Comandos de Reacción")
        .addField("Permisos de usuario", "Ninguno")
        .addField("Descripción", "Expresa tu decepción...")
        .addField("Uso", "n!facepalm")
        .addField("Ejemplo", "Ninguno")
        .setColor(color)
        .setFooter(
          "<> = obligatorio | [] = opcional. | No incluyas estos símbolos al momento de ejecutar el comando."
        );
      msg.channel.send({ embed });
    } else if (["game"].includes(selection)) {
      embed
        .setAuthor('Ayuda detallada de "game"', Natsumi.user.avatarURL())
        .addField("Categoría", "Comandos de Reacción")
        .addField("Permisos de usuario", "Ninguno")
        .addField("Descripción", "¡Ponte a jugar algo!")
        .addField("Uso", "n!game")
        .addField("Ejemplo", "Ninguno")
        .setColor(color)
        .setFooter(
          "<> = obligatorio | [] = opcional. | No incluyas estos símbolos al momento de ejecutar el comando."
        );
      msg.channel.send({ embed });
    } else if (["happy"].includes(selection)) {
      embed
        .setAuthor('Ayuda detallada de "happy"', Natsumi.user.avatarURL())
        .addField("Categoría", "Comandos de Reacción")
        .addField("Permisos de usuario", "Ninguno")
        .addField("Descripción", "Expresa que estás feliz :D")
        .addField("Uso", "n!happy")
        .addField("Ejemplo", "Ninguno")
        .setColor(color)
        .setFooter(
          "<> = obligatorio | [] = opcional. | No incluyas estos símbolos al momento de ejecutar el comando."
        );
      msg.channel.send({ embed });
    } else if (["like"].includes(selection)) {
      embed
        .setAuthor('Ayuda detallada de "like"', Natsumi.user.avatarURL())
        .addField("Categoría", "Comandos de Reacción")
        .addField("Permisos de usuario", "Ninguno")
        .addField("Descripción", "Expresa que te gusta algo.")
        .addField("Uso", "n!like")
        .addField("Ejemplo", "Ninguno")
        .setColor(color)
        .setFooter(
          "<> = obligatorio | [] = opcional. | No incluyas estos símbolos al momento de ejecutar el comando."
        );
      msg.channel.send({ embed });
    } else if (["nope"].includes(selection)) {
      embed
        .setAuthor('Ayuda detallada de "nope"', Natsumi.user.avatarURL())
        .addField("Categoría", "Comandos de Reacción")
        .addField("Permisos de usuario", "Ninguno")
        .addField("Descripción", "NOPE!")
        .addField("Uso", "n!nope")
        .addField("Ejemplo", "Ninguno")
        .setColor(color)
        .setFooter(
          "<> = obligatorio | [] = opcional. | No incluyas estos símbolos al momento de ejecutar el comando."
        );
      msg.channel.send({ embed });
    } else if (["pout"].includes(selection)) {
      embed
        .setAuthor('Ayuda detallada de "pout"', Natsumi.user.avatarURL())
        .addField("Categoría", "Comandos de Reacción")
        .addField("Permisos de usuario", "Ninguno")
        .addField(
          "Descripción",
          "¿Tienes ganas de quejarte? Con este comando podrás expresar esa sensación con un puchero."
        )
        .addField("Uso", "n!pout")
        .addField("Ejemplo", "Ninguno")
        .setColor(color)
        .setFooter(
          "<> = obligatorio | [] = opcional. | No incluyas estos símbolos al momento de ejecutar el comando."
        );
      msg.channel.send({ embed });
    } else if (["shrug"].includes(selection)) {
      embed
        .setAuthor('Ayuda detallada de "shrug"', Natsumi.user.avatarURL())
        .addField("Categoría", "Comandos de Reacción")
        .addField("Permisos de usuario", "Ninguno")
        .addField("Descripción", "Expresa que no sabes algo o no te importa.")
        .addField("Uso", "n!shrug")
        .addField("Ejemplo", "Ninguno")
        .setColor(color)
        .setFooter(
          "<> = obligatorio | [] = opcional. | No incluyas estos símbolos al momento de ejecutar el comando."
        );
      msg.channel.send({ embed });
    } else if (["sing"].includes(selection)) {
      embed
        .setAuthor('Ayuda detallada de "sing"', Natsumi.user.avatarURL())
        .addField("Categoría", "Comandos de Reacción")
        .addField("Permisos de usuario", "Ninguno")
        .addField(
          "Descripción",
          "¡Canta con una gran emoción! ¡Dedícale un canto a todos!"
        )
        .addField("Uso", "n!sing")
        .addField("Ejemplo", "Ninguno")
        .setColor(color)
        .setFooter(
          "<> = obligatorio | [] = opcional. | No incluyas estos símbolos al momento de ejecutar el comando."
        );
      msg.channel.send({ embed });
    } else if (["sip"].includes(selection)) {
      embed
        .setAuthor('Ayuda detallada de "sip"', Natsumi.user.avatarURL())
        .addField("Categoría", "Comandos de Reacción")
        .addField("Permisos de usuario", "Ninguno")
        .addField(
          "Descripción",
          "Bebe un poco de té, o alguna bebida refrescante de forma atenta."
        )
        .addField("Uso", "n!sip")
        .addField("Ejemplo", "Ninguno")
        .setColor(color)
        .setFooter(
          "<> = obligatorio | [] = opcional. | No incluyas estos símbolos al momento de ejecutar el comando."
        );
      msg.channel.send({ embed });
    } else if (["smug"].includes(selection)) {
      embed
        .setAuthor('Ayuda detallada de "smug"', Natsumi.user.avatarURL())
        .addField("Categoría", "Comandos de Reacción")
        .addField("Permisos de usuario", "Ninguno")
        .addField(
          "Descripción",
          "Siéntete libre de presumir tus mejores actos."
        )
        .addField("Uso", "n!smug")
        .addField("Ejemplo", "Ninguno")
        .setColor(color)
        .setFooter(
          "<> = obligatorio | [] = opcional. | No incluyas estos símbolos al momento de ejecutar el comando."
        );
      msg.channel.send({ embed });
    } else if (["think"].includes(selection)) {
      embed
        .setAuthor('Ayuda detallada de "think"', Natsumi.user.avatarURL())
        .addField("Categoría", "Comandos de Reacción")
        .addField("Permisos de usuario", "Ninguno")
        .addField(
          "Descripción",
          "Muestra a los demás que estás pensando en algo."
        )
        .addField("Uso", "n!think")
        .addField("Ejemplo", "Ninguno")
        .setColor(color)
        .setFooter(
          "<> = obligatorio | [] = opcional. | No incluyas estos símbolos al momento de ejecutar el comando."
        );
      msg.channel.send({ embed });
    } else if (["vomit"].includes(selection)) {
      embed
        .setAuthor('Ayuda detallada de "vomit"', Natsumi.user.avatarURL())
        .addField("Categoría", "Comandos de Reacción")
        .addField("Permisos de usuario", "Ninguno")
        .addField("Descripción", "Vomita de algo desagradable.")
        .addField("Uso", "n!vomit")
        .addField("Ejemplo", "Ninguno")
        .setColor(color)
        .setFooter(
          "<> = obligatorio | [] = opcional. | No incluyas estos símbolos al momento de ejecutar el comando."
        );
      msg.channel.send({ embed });
    } else if (["drake"].includes(selection)) {
      embed
        .setAuthor('Ayuda detallada de "drake"', Natsumi.user.avatarURL())
        .addField("Categoría", "Comandos Divertidos")
        .addField("Permisos de usuario", "Ningunos")
        .addField("Descripción", "Crea una imagen con el mencionado")
        .addField("Uso", "n!drake <@usuario>")
        .addField("Ejemplo", "Ninguno")
        .setColor(color)
        .setFooter(
          "<> = obligatorio | [] = opcional. | No incluyas estos símbolos al momento de ejecutar el comando."
        );
      msg.channel.send({ embed });
    } else if (["trash"].includes(selection)) {
      embed
        .setAuthor('Ayuda detallada de "trash"', Natsumi.user.avatarURL())
        .addField("Categoría", "Comandos Divertidos")
        .addField("Permisos de usuario", "Ningunos")
        .addField("Descripción", "Crea una imagen con el mencionado")
        .addField("Uso", "n!trash [@usuario]")
        .addField("Ejemplo", "Ninguno")
        .setColor(color)
        .setFooter(
          "<> = obligatorio | [] = opcional. | No incluyas estos símbolos al momento de ejecutar el comando."
        );
      msg.channel.send({ embed });
    } else if (["admin"].includes(selection)) {
      embed
        .setAuthor('Ayuda detallada de "admin"', Natsumi.user.avatarURL())
        .addField("Categoría", "Comandos Divertidos")
        .addField("Permisos de usuario", "Ningunos")
        .addField("Descripción", "Crea una imagen con el mencionado")
        .addField("Uso", "n!admin [@usuario]")
        .addField("Ejemplo", "Ninguno")
        .setColor(color)
        .setFooter(
          "<> = obligatorio | [] = opcional. | No incluyas estos símbolos al momento de ejecutar el comando."
        );
      msg.channel.send({ embed });
    } else if (["blur"].includes(selection)) {
      embed
        .setAuthor('Ayuda detallada de "blur"', Natsumi.user.avatarURL())
        .addField("Categoría", "Comandos Divertidos")
        .addField("Permisos de usuario", "Ningunos")
        .addField("Descripción", "Crea una imagen con el mencionado")
        .addField("Uso", "n!blur [@usuario]")
        .addField("Ejemplo", "Ninguno")
        .setColor(color)
        .setFooter(
          "<> = obligatorio | [] = opcional. | No incluyas estos símbolos al momento de ejecutar el comando."
        );
      msg.channel.send({ embed });
    } else if (["bw"].includes(selection)) {
      embed
        .setAuthor('Ayuda detallada de "bw"', Natsumi.user.avatarURL())
        .addField("Categoría", "Comandos Divertidos")
        .addField("Permisos de usuario", "Ningunos")
        .addField("Descripción", "Crea una imagen con el mencionado")
        .addField("Uso", "n!bw [@usuario]")
        .addField("Ejemplo", "Ninguno")
        .setColor(color)
        .setFooter(
          "<> = obligatorio | [] = opcional. | No incluyas estos símbolos al momento de ejecutar el comando."
        );
      msg.channel.send({ embed });
    } else if (["gay"].includes(selection)) {
      embed
        .setAuthor('Ayuda detallada de "gay"', Natsumi.user.avatarURL())
        .addField("Categoría", "Comandos Divertidos")
        .addField("Permisos de usuario", "Ningunos")
        .addField("Descripción", "Crea una imagen con el mencionado")
        .addField("Uso", "n!gay [@usuario]")
        .addField("Ejemplo", "Ninguno")
        .setColor(color)
        .setFooter(
          "<> = obligatorio | [] = opcional. | No incluyas estos símbolos al momento de ejecutar el comando."
        );
      msg.channel.send({ embed });
    } else if (["jail"].includes(selection)) {
      embed
        .setAuthor('Ayuda detallada de "jail"', Natsumi.user.avatarURL())
        .addField("Categoría", "Comandos Divertidos")
        .addField("Permisos de usuario", "Ningunos")
        .addField("Descripción", "Crea una imagen con el mencionado")
        .addField("Uso", "n!jail [@usuario]")
        .addField("Ejemplo", "Ninguno")
        .setColor(color)
        .setFooter(
          "<> = obligatorio | [] = opcional. | No incluyas estos símbolos al momento de ejecutar el comando."
        );
      msg.channel.send({ embed });
    } else if (["pixel"].includes(selection)) {
      embed
        .setAuthor('Ayuda detallada de "pixel"', Natsumi.user.avatarURL())
        .addField("Categoría", "Comandos Divertidos")
        .addField("Permisos de usuario", "Ningunos")
        .addField("Descripción", "Crea una imagen con el mencionado")
        .addField("Uso", "n!pixel [@usuario]")
        .addField("Ejemplo", "Ninguno")
        .setColor(color)
        .setFooter(
          "<> = obligatorio | [] = opcional. | No incluyas estos símbolos al momento de ejecutar el comando."
        );
      msg.channel.send({ embed });
    } else if (["sepia"].includes(selection)) {
      embed
        .setAuthor('Ayuda detallada de "sepia"', Natsumi.user.avatarURL())
        .addField("Categoría", "Comandos Divertidos")
        .addField("Permisos de usuario", "Ningunos")
        .addField("Descripción", "Crea una imagen con el mencionado")
        .addField("Uso", "n!sepia [@usuario]")
        .addField("Ejemplo", "Ninguno")
        .setColor(color)
        .setFooter(
          "<> = obligatorio | [] = opcional. | No incluyas estos símbolos al momento de ejecutar el comando."
        );
      msg.channel.send({ embed });
    } else if (["invert"].includes(selection)) {
      embed
        .setAuthor('Ayuda detallada de "invert"', Natsumi.user.avatarURL())
        .addField("Categoría", "Comandos Divertidos")
        .addField("Permisos de usuario", "Ningunos")
        .addField("Descripción", "Crea una imagen con el mencionado")
        .addField("Uso", "n!invert [@usuario]")
        .addField("Ejemplo", "Ninguno")
        .setColor(color)
        .setFooter(
          "<> = obligatorio | [] = opcional. | No incluyas estos símbolos al momento de ejecutar el comando."
        );
      msg.channel.send({ embed });
    } else if (["circle"].includes(selection)) {
      embed
        .setAuthor('Ayuda detallada de "cricle"', Natsumi.user.avatarURL())
        .addField("Categoría", "Comandos Divertidos")
        .addField("Permisos de usuario", "Ningunos")
        .addField("Descripción", "Crea una imagen con el mencionado")
        .addField("Uso", "n!cricle [@usuario]")
        .addField("Ejemplo", "Ninguno")
        .setColor(color)
        .setFooter(
          "<> = obligatorio | [] = opcional. | No incluyas estos símbolos al momento de ejecutar el comando."
        );
      msg.channel.send({ embed });
    } else if (["contrast"].includes(selection)) {
      embed
        .setAuthor('Ayuda detallada de "contrast"', Natsumi.user.avatarURL())
        .addField("Categoría", "Comandos Divertidos")
        .addField("Permisos de usuario", "Ningunos")
        .addField("Descripción", "Crea una imagen con el mencionado")
        .addField("Uso", "n!contrast [@usuario]")
        .addField("Ejemplo", "Ninguno")
        .setColor(color)
        .setFooter(
          "<> = obligatorio | [] = opcional. | No incluyas estos símbolos al momento de ejecutar el comando."
        );
      msg.channel.send({ embed });
    } else if (["convolute"].includes(selection)) {
      embed
        .setAuthor('Ayuda detallada de "convolute"', Natsumi.user.avatarURL())
        .addField("Categoría", "Comandos Divertidos")
        .addField("Permisos de usuario", "Ningunos")
        .addField("Descripción", "Crea una imagen con el mencionado")
        .addField("Uso", "n!convolute [@usuario]")
        .addField("Ejemplo", "Ninguno")
        .setColor(color)
        .setFooter(
          "<> = obligatorio | [] = opcional. | No incluyas estos símbolos al momento de ejecutar el comando."
        );
      msg.channel.send({ embed });
    } else if (["triggered"].includes(selection)) {
      embed
        .setAuthor('Ayuda detallada de "triggered"', Natsumi.user.avatarURL())
        .addField("Categoría", "Comandos Divertidos")
        .addField("Permisos de usuario", "Ningunos")
        .addField("Descripción", "Crea una imagen con el mencionado")
        .addField("Uso", "n!triggered [@usuario]")
        .addField("Ejemplo", "Ninguno")
        .setColor(color)
        .setFooter(
          "<> = obligatorio | [] = opcional. | No incluyas estos símbolos al momento de ejecutar el comando."
        );
      msg.channel.send({ embed });
    } else if (["comment"].includes(selection)) {
      embed
        .setAuthor('Ayuda detallada de "comment"', Natsumi.user.avatarURL())
        .addField("Categoría", "Comandos Divertidos")
        .addField("Permisos de usuario", "Ningunos")
        .addField("Descripción", "Crea una imagen con el mencionado")
        .addField("Uso", "n!comment <@usuario> <Comnetario>")
        .addField("Ejemplo", "Ninguno")
        .setColor(color)
        .setFooter(
          "<> = obligatorio | [] = opcional. | No incluyas estos símbolos al momento de ejecutar el comando."
        );
      msg.channel.send({ embed });
    } else {
      embed
        .setTitle(`Comandos de ${nombre}`)
        .setDescription(`Hola me llamo ${nombre} y estos son mis comandos.`)
        .addField(
          "Comandos Útiles",
          " `ping` `avatar` `jumbo` `playstore` `reportbug`"
        )
        .addField(
          "Comandos Informativos",
          "`membercount` `botinfo` `userinfo` `serverinfo` `emojilist`"
        )
        .addField(
          "Comandos Divertidos",
          "`8ball` `say` `impostor` `howgay` `ascii` `drake` `trash` `blur` `bw` `gay` `jail` `pixel` `sepia` `invert` `circle` `contrast` `convolute`"
        )
        .addField(
          "Comandos de interaccion",
          "`bite` `claps` `cookie` `dance` `feed` `hi` `hug` `kickbutts` `kill` `laugh` `pat` `run` `slap` `sleep` "
        )
        .addField(
          "Comandos de Reacción",
          "`angry` `bomb` `bored` `cry` `disgust` `facepalm` `game` `happy` `like` `nope` `pout` `shrug` `sing` `sip` `smug` `think` `vomit` "
        )
        .addField(
          "Links",
          `[Invitame](${invitacion}) | [Servidor](${servidor})`
        )
        .setTimestamp()
        .setColor(color)
        .setFooter(
          "Escribe n!help [comando] para ayuda detallada. | Desarrollado por DGAB#4485"
        );
      msg.channel.send(embed);
    }
  }

  ////////// Comandos DGAB //////////

  ////////// Comandos Modedador //////////

  if (command === "purge") {
    /*
Eliminar mensajes por un numero determinado usando bulkDelete()
Limite: maximo 100 mensajes

*/
    if (!msg.guild.me.permissionsIn(msg.channel).has("MANAGE_MESSAGES")) {
      return message.channel.send("Perdon, pero no tengo permisos");
    }

    if (!msg.member.permissionsIn(msg.channel).has("MANAGE_MESSAGES")) {
      return msg.channel.send("Perdon, pero no tienes permisos");
    }

    if (!args)
      return msg.channel.send("Escriba la cantidad de mensajes a eliminar");
    let cantidad = parseInt(args[0]);

    if (!cantidad || isNaN(cantidad))
      return msg.reply("Introduce un numero por favor");

    if (cantidad > 100) {
      msg.channel.send(
        "El maximo de mensajes que puedo borrar es 100, por lo tanto lo establecere automaticamente ahi"
      );
      cantidad = 100;
    }

    msg.channel.bulkDelete(cantidad + 1).then(() => {
      msg.channel
        .send(`Se elimino ${cantidad} mensajes`)
        .then((message) => message.delete({ timeout: 3000 }));
    });
  }

  ////////// Comandos Random //////////

  //// ✅ ////

  if (command === "ping") {
    let ping = Math.floor(Natsumi.ws.ping);

    msg.channel
      .send(":ping_pong: Pong!")

      .then((m) => {
        const embed = new Discord.MessageEmbed()
          .setDescription(
            `:incoming_envelope: Envío de mensajes  **${parseInt(
              m.createdTimestamp,
              6
            )} ms** \n:satellite_orbital: Ping DiscordAPI: **${ping} ms**`
          )
          .setColor("RANDOM");
        m.edit(embed);
      });
  }
  if (command === "impostor") {
    //El comando

    const mencionado = msg.mentions.members.first(); //Definimos mencionado

    let random = ["No era el impostor", "Era el impostor"]; //Hacemos frases para ver si es o no

    if (!mencionado)
      //Si el autor no menciono a nadie

      return msg.channel.send(`. 　　　。　　　　•　 　ﾟ　　。 　　.
    
    　　　.　　　 　　.　　　　　。　　 。　. 　
    
    .　　 。　　　　　 ඞ 。 . 　　 • 　　　　•
    
    　　ﾟ　　 ${msg.author.username} ${
        random[Math.floor(Math.random() * random.length)]
      } 　 。　.
    
    　　'　　　 ${
      Math.floor(Math.random() * 3) + 1
    } Impostores restantes 　 　　。
    
    　　ﾟ　　　.　　　. ,　　　　.　 .`); //Enviamos el mensaje

    //Pero si menciona

    msg.channel.send(`. 　　　。　　　　•　 　ﾟ　　。 　　.
    
    　　　.　　　 　　.　　　　　。　　 。　. 　
    
    .　　 。　　　　　 ඞ 。 . 　　 • 　　　　•
    
    　　ﾟ　　 ${mencionado.user.username} ${
      random[Math.floor(Math.random() * random.length)]
    } 　 。　.
    
    　　'　　　 ${
      Math.floor(Math.random() * 3) + 1
    } Impostores restantes 　 　　。
    
    　　ﾟ　　　.　　　. ,　　　　.　 .`);
  }
  if (command === "amongus") {
    function toPages(list, maxPerPage = 10) {
      let newList = [];
      while (list.length) {
        newList.push(list.splice(0, maxPerPage));
      }
      return newList;
    }
    let selection = (args[0] || "").toLowerCase();
    let amongUs = "https://swiftcloud.ml/cloud-WUci.jpg";
    let embed = new Discord.MessageEmbed().setColor(color);
    let allPlaying = msg.guild.presences.cache.filter((p) => {
      let a = p.activities.find(
        (a) => a.applicationID === "477175586805252107"
      ); // Buscamos una actividad que tenga la ID de Among Us
      if (a && a.party && a.party.id) return true; // Si esta jugando y esta en partida (Esto lo sabemos porque tiene la propiedad party/id) retornamos true
    }); // Cerramos el filtro

    if (["all", "list", "lista", "listar"].includes(selection)) {
      // Si el array incluye la selección del usuario

      let allRoomsInfo = allPlaying.map((p) => {
        // Mapeamos las presencias que filtramos previamente
        let a = p.activities.find(
          (a) => a.applicationID === "477175586805252107"
        ); // Buscamos una actividad que tenga la ID de Among Us

        let host = allPlaying.find((pr) => {
          // Buscamos entre los que están jugando Among Us en el servidor
          let ac = pr.activities.find(
            (ac) => ac.applicationID === "477175586805252107"
          ); // Buscamos una actividad que tenga la ID de Among Us

          /*
           * Si el código de la sala en la que esta jugando es igual al de la que
           * declaramos previamente como a y es el host  (Eso lo sabemos por la propiedad details) retornamos true
           */
          if (ac.party.id === a.party.id && ac.details === "Hosting a game")
            return true;
        }); // Cerramos el find (Devuelve un objeto User si encontro al usuario o undefined si no)

        return {
          code: a.party.id,
          players: a.party.size.join("/"),
          host: host || {},
          state: a.state,
        }; // Devolvemos un objeto con las propiedades code, players, host y state
      }); // Cerramos el map

      let allRooms = []; // Un array vacio, lo usaremos abajo

      /*
       * No tiene mucho que ver con lo siguiente, Solo quería aclarar de que con "sala" me refiero
       * a un objeto el cual tiene las propiedades code, players, host y state.
       */
      for (room of allRoomsInfo) {
        // Un bucle for of
        if (!allRooms.find((r) => r.code === room.code)) {
          // Válidamos que no haya una sala del array allRooms que tenga el mismo código
          allRooms.push(room); // Si paso la condición pusheamos la sala al array allRooms
        } // Cerramos el if
      }

      let pages = toPages(allRooms, 15);

      let i = pages[Number(args[1]) - 1] ? args[1] - 1 : 0;

      let page = (pages[i] || []).map((r) => {
        let host = Natsumi.users.cache.get(r.host.userID);
        return `\`\`\`md\n# Among Us\n* Código: ${r.code}\n* Host: ${
          host ? host.tag : "Desconocido"
        }\n> ${r.players}\`\`\``; // Retornamos una string con info de la sala
      }); // Cerramos el map
      embed
        .setDescription(
          page.join("\n") || "No hay salas de Among Us en este servidor."
        )

        .setFooter(
          `Página ${pages.length ? i + 1 : i} de ${pages.length}.`,
          amongUs
        );

      msg.channel.send(embed); // Enviamos el embed
    } else if (["room", "sala"].includes(selection)) {
      // Si el array incluye la selección del usuario

      if (!args[1]) return msg.channel.send("Especifica el código xD"); // Si no hay argumentos retornamos

      let party = allPlaying.filter((p) => {
        // Filtramos las presencias que filtramos previamente
        let a = p.activities.find(
          (a) => a.applicationID === "477175586805252107"
        ); // Buscamos la actividad de Among Us por ID
        if (a.party.id === args[1].toUpperCase()) return true; // Si se esta jugando una partida con código igual al proporcionado por el usuario retornamos true
      }); // Cerramos el filtro

      if (!party.first()) return msg.channel.send("Código invalido."); // Si no encontro ni siquiera una partida retornamos

      let allPlayers = party.map((p, i) => {
        // Mapeamos las presencias que filtramos previamente
        let a = p.activities.find(
          (a) => a.applicationID === "477175586805252107"
        ); // Buscamos la actividad de Among Us por ID
        let host = a.details === "Hosting a game" ? "(Host)" : ""; // Verificamos si es el host (Eso lo sabemos por la propiedad details), si lo es la variable será "(Host)", si no será una string vacia

        return `<@${p.userID}> ${host}`; // Devolvemos la mención al usuario que esta jugando
      }); // Cerramos el map
      /*
       * party es una colección con presencias, entonces agarramos la primera con first, accedemos a la propiedad activities
       * y buscamos la actividad de Among Us para acceder a la propiedad party, Mucho texto ¿No?
       */
      let partyInfo = party
        .first()
        .activities.find((a) => a.applicationID === "477175586805252107").party;

      embed
        .setDescription(allPlayers) // Colocamos la descripción del embed, mencionará a todos los usuarios que estén jugando esa partida y estén en el servidor

        .setFooter(
          `${partyInfo.size[0]}/${partyInfo.size[1]} jugadores. (Solo muestra usuarios de Discord)`,
          amongUs
        ); // Ya explicado previamente

      msg.channel.send(embed); // Enviamos el embed
    } else {
      // Si no uso el comando de forma correcta

      msg.channel.send(
        "Uso incorrecto, utilice `amongus all` o `amongus room <Código>`."
      ); // Enviamos un mensaje
    }
  }
  //// ✅ ////
  if (command === "botinfo") {
    const maxMemory = OS.totalmem();
    function getMemoryUsage() {
      const free = OS.freemem();
      return {
        max: memory(maxMemory),
        free: memory(free),
        used: memory(maxMemory - free),
        usedByProcess: memory(process.memoryUsage().rss),
      };
    }
    function memory(bytes = 0) {
      const gigaBytes = bytes / 1024 ** 3;
      if (gigaBytes > 1) {
        return `${gigaBytes.toFixed(1)} Gb`;
      }
      const megaBytes = bytes / 1024 ** 2;
      if (megaBytes < 10) return `${megaBytes.toFixed(2)} Mb`;
      if (megaBytes < 100) return `${megaBytes.toFixed(1)} Mb`;
      return `${Math.floor(megaBytes)} MB`;
    }

    let totalSeconds = Natsumi.uptime / 1000;
    let days = Math.floor(totalSeconds / 86400);
    let hours = Math.floor(totalSeconds / 3600);
    totalSeconds %= 3600;
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = totalSeconds % 60;

    let memoria = getMemoryUsage();
    cpuStat.usagePercent(function (err, percent, seconds) {
      if (err) {
        return console.log(err);
      }

      var totalCores = cpuStat.totalCores();
      var avgClockMHz = cpuStat.avgClockMHz();
      const embed = new Discord.MessageEmbed()
        .setAuthor(`${nombre}`, Natsumi.user.avatarURL())
        .setThumbnail(Natsumi.user.avatarURL())
        .addField("Developer", `${Developer}`)
        .addField("Servers", ` ${Natsumi.guilds.cache.size}`)
        .addField(
          "CPU",
          ` Uso del CPU: ${parseInt(
            percent
          )}% \n  Cores: ${totalCores} \n  Frecuencia del CPU: ${parseInt(
            avgClockMHz
          )} MHZ`
        )
        .addField(
          "Ram  ",
          ` Memoria maxima: ${memoria.max} \n  Memoria usada por el bot: ${memoria.usedByProcess} `
        )
        //.addField('Memoria libre', memoria.free)
        .addField(
          "UpTime",
          ` ${days}d ${hours}h ${minutes}m ${parseInt(seconds)}s `
        )
        .addField("Lenguaje", " JavaScript")
        .addField("Libreria", " Discord.js v12.3.1")
        .setColor(color);
      msg.channel.send(embed);
    }); //que envie el embed
  }
  //// ✅ ////
  if (command === "emojilist") {
    if (msg.guild.emojis.cache.size < 1)
      return msg.channel.send("¡Este servidor no tiene emojis!");
    /* Declaramos emojis y emojis_a como arrays vaciós, emojis será para emojis normales y emojis_a para los animados */
    let emojis = [];
    let emojis_a = [];

    msg.guild.emojis.cache
      .filter((x) => !x.animated)
      .map((x) => emojis.push(`<:${x.name}:${x.id}>`));

    msg.guild.emojis.cache
      .filter((x) => x.animated)
      .map((x) => emojis_a.push(`<a:${x.name}:${x.id}>`));

    let m = await msg.channel.send({
      embed: {
        title: `Emojis de ${msg.guild.name}`,
        color: color,
        fields: [
          {
            name: "Emojis estaticos:",
            value: emojis[0]
              ? emojis.slice(0, 10).join("\n")
              : "Este servidor no tiene emojis estaticos",
          },
          {
            name: "Emojis animados:",
            value: emojis_a[0]
              ? emojis_a.slice(0, 10).join("\n")
              : "Este servidor no tiene emojis animados",
          },
        ],
        author: {
          name: `Pedido por: ${msg.author.tag}`,
          icon_url: msg.author.displayAvatarURL(),
        },
      },
    });

    await m.react("◀️");
    await m.react("⏹️");
    await m.react("▶️");

    let i = 0;
    let i2 = 10;
    let filtro = (reaction, user) =>
      ["◀️", "⏹️", "▶️"].includes(reaction.emoji.name) &&
      user.id === msg.author.id;

    let colector = m.createReactionCollector(filtro, { time: 60000, max: 10 });

    colector.on("collect", (reaction) => {
      switch (reaction.emoji.name) {
        case "◀️":
          if (i > 1) {
            i -= 10;
            i2 -= 10;
            m.edit({
              embed: {
                title: `Emojis de ${msg.guild.name}`,
                color: color,
                fields: [
                  {
                    name: "Emojis estaticos:",
                    value: emojis[0]
                      ? emojis.slice(i, i2).join("\n")
                      : "Este servidor no tiene emojis estaticos",
                  },
                  {
                    name: "Emojis animados:",
                    value: emojis_a[0]
                      ? emojis_a.slice(i, i2).join("\n")
                      : "Este servidor no tiene emojis animados",
                  },
                ],
                author: {
                  name: `Pedido por: ${msg.author.tag}`,
                  icon_url: msg.author.displayAvatarURL(),
                },
              },
            });
          }
          /* Rompemos */
          break;
        case "⏹️":
          colector.stop();
          break;
        case "▶️":
          if (
            emojis.slice(i, i2 + 1)[emojis.slice(i, i2 + 1).length - 1] !==
            emojis[emojis.length - 1]
          ) {
            /* Sumamos 10 a i y i2 */
            i += 10;
            i2 += 10;
            m.edit({
              embed: {
                title: `Emojis de ${msg.guild.name}`,
                color: color,
                fields: [
                  {
                    name: "Emojis estaticos:",
                    value: emojis[0]
                      ? emojis.slice(i, i2).join("\n")
                      : "Este servidor no tiene emojis estaticos",
                  },
                  {
                    name: "Emojis animados:",
                    value: emojis_a[0]
                      ? emojis_a.slice(i, i2).join("\n")
                      : "Este servidor no tiene emojis animados",
                  },
                ],
                author: {
                  name: `Pedido por: ${msg.author.tag}`,
                  icon_url: msg.author.displayAvatarURL(),
                },
              },
            });
          }
          break;
      }
    });
  }
  //// ✅ ////
  if (command === "jumbo") {
    if (!args[0]) return msg.channel.send("El emoji?"); //ustedes definen los args
    let emoji = msg.guild.emojis.cache.find(
      (x) => x.name === args[0].split(":")[1]
    );
    if (!emoji) return msg.reply("recuerda que solo emojis del server"); //para que diga solo personalizados
    const embed = new Discord.MessageEmbed().setImage(emoji.url);
    msg.channel.send(embed);
  }
  //// ✅ ////
  if (command === "ascii") {
    let data = args.join(" ");
    if (data.length > 15)
      return msg.reply("Solo se permite hasta 15 carácteres.");
    if (!data) return msg.reply("Escribe algo.");
    figlet(data, (err, data) =>
      msg.channel.send("" + "```" + data + "```" + "")
    );
  }
  //// ✅ ////
  if (command === "8ball") {
    var rpts = [
      "Si",
      "No",
      "Tal vez",
      "No se",
      "Claro!",
      "Si <3",
      "No >:(",
      "Por supuesto que no",
      "Claro",
      "No lo se",
      "Pregunta otra cosa, si?",
      "Eso no se pregunta",
    ]; // Las Respuestas
    const pregunt = args.join(" ");
    let author = msg.author.username;
    if (!pregunt) return msg.channel.send(":x: | Falta la pregunta.");
    const embed = new Discord.MessageEmbed()
      .setTitle(":8ball: Pregunta 8ball.")
      .addField(`${author} pregunta:`, `${pregunt}`)
      .addField(
        "Mi respuesta es:",
        rpts[Math.floor(Math.random() * rpts.length)],
        true
      )
      .setColor(color);
    msg.channel.send(embed);
  }
  //// ✅ ////
  if (command === "avatar") {
    let img = msg.mentions.users.first();
    if (!img) {
      const embed = new Discord.MessageEmbed()
        .setImage(`${msg.author.avatarURL()}`)
        .setColor(color)
        .setFooter(
          `Avatar de ${msg.author.username}#${msg.author.discriminator}`
        );
      msg.channel.send({ embed });
    } else if (img.avatarURL === null) {
      msg.channel.sendMessage(
        "El usuario (" + img.username + ") no tiene avatar!"
      );
    } else {
      const embed = new Discord.MessageEmbed()
        .setImage(`${img.avatarURL()}`)
        .setColor(color)
        .setFooter(`Avatar de ${img.username}#${img.discriminator}`);
      msg.channel.send({ embed });
    }
  }
  //// ✅ ////
  if (command === "traducir") {
    let mensaje = args.join(" ");
    let traducido = await easy.traductor(mensaje);
    if (!mensaje) {
      return msg.channel.send("Pon texto pa traducir");
    }
    msg.channel.send(`El mensaje traducido es ${traducido}`);
  }
  if (command === "membercount") {
    var server = msg.guild;
    msg.channel.send(
      `Actualmente en el servidor hay ${server.memberCount} miembros `
    );
  }
  //// ✅ ////
  if (command === "userinfo") {
    let user =
      msg.mentions.members.first() ||
      msg.guild.members.cache.get(args[0]) ||
      msg.member; // Definimos usuario, si mencionamos a alguien se obtendra su informacion, si no mencionamos a nadie se obtendra la informacion de "Nosotros"

    let status;
    switch (user.presence.status) {
      case "online":
        status = "🟢 En linea";
        break;
      case "dnd":
        status = "⛔ No molestar";
        break;
      case "idle":
        status = "🌙 Ausente";
        break;
      case "offline":
        status = "⚪ Desconectado";
        break;
    }
    const embed = new Discord.MessageEmbed() // Hacemos un nuevo embed
      .setTitle(`Informacion del usuario ${user.user.username}`) // Titulo - Recibimos el "user" y decimos su "username"
      .setColor(color) // Color para hacerlo mas bonito <3
      .setThumbnail(user.user.displayAvatarURL({ dynamic: true })) // Un Thumbnail de la foto de perfil del "user".
      .addFields(
        // Hacemos nuevas Fields
        {
          name: "Apodo: ", // Nombre - Titulo - Caso 1
          value: msg.member.nickname ? msg.member.nickname : "No tiene apodo", // Si el "user" tiene apodo se envia, si es false / no tiene Se envia diciendo que "No tiene Apodo"
          inline: true, // En linea: SI
        },
        {
          name: "#️⃣ Tag: ", // Nombre - Titulo - Caso 1
          value: `#${user.user.discriminator}`, // Del "user" sacamos su tag / discriminador
          inline: true, // En linea: SI
        },
        {
          name: "🆔 ID: ", // Nombre - Titulo - Caso 1
          value: user.user.id, // Del "user" sacamos su ID
        },
        {
          name: "Reciente Actividad: ", // Nombre - Titulo - Caso 1
          value: status, // Acá se obtiene el estado del "user" con los casos ya dichos y explicado anteriormente.
          inline: true, // En linea: SI
        },
        {
          name: "Estado: ", // Nombre - Titulo - Caso 1
          value: user.presence.activities[0]
            ? user.presence.activities[0].state
            : "Sin estado", // Si el "user" tiene actividad se envia, si no la tiene se envia "Sin Estado"
          inline: true, // En linea: SI
        },
        {
          name: "Avatar link: ", // Nombre - Titulo - Caso 1
          value: `[Pinche Aquí](${user.user.displayAvatarURL()})`, // Del "user" obtenemos su Avatar Link, Hacemos que dentro del Array se encuentre el Link y cuando se de Click te reenviara una pagina viendo el avatar del "user"
        },
        {
          name: "Dato de creacion: ", // Nombre - Titulo - Caso 1
          value: user.user.createdAt.toLocaleDateString("es-pe"), // Del "user" obtenemos su Fecha de creacion y hacemos que el dato local sea a ES-PE, Esto va en codigo segun por lenguaje - EJEMPLOS: es = español , en = english
          inline: true, // En linea: SI
        },
        {
          name: "Fecha de entrada al Servidor: ", // Nombre - Titulo - Caso 1
          value: user.joinedAt.toLocaleDateString("es-pe"), // Del "user" obtenemos su Fecha de entrada al servidor en donde se envio el mensaje y hacemos que el dato local sea a ES-PE, Esto va en codigo segun por lenguaje - EJEMPLOS: es = español , en = english
          inline: true, // En linea: SI
        },
        {
          name: "Roles del usuario: ", // Nombre - Titulo - Caso 1
          value: user.roles.cache.map((role) => role.toString()).join(" ,"), // Del "user" obtenemos sus roles del server y lo mapeamos tambien lo separamos con una coma ","
          inline: true, // En linea: SI
        }
      );
    await msg.channel.send(embed);
  }
  //// ✅ ////
  if (command === "serverinfo") {
    var server = msg.guild;
    let guild = msg.guild;
    let verifiLevels = {
      NONE: "Ninguno",
      LOW: "Bajo",
      MEDIUM: "Medio",
      HIGH: "Alto",
      VERY_HIGH: "Muy alto",
    };
    let region = {
      europe: "Europa :flag_eu:",
      brazil: "Brasil :flag_br: ",
      hongkong: "Hong Kong :flag_hk:",
      japan: "Japón :flag_jp:",
      russia: "Rusia :flag_ru:",
      singapore: "Singapur :flag_sg:",
      southafrica: "Sudáfrica :flag_za:",
      sydney: "Sydney :flag_au:",
      "us-central": "Central US :flag_us:",
      "us-east": "Este US :flag_us:",
      "us-south": "Sur US :flag_us:",
      "us-west": "Oeste US :flag_us:",
      "vip-us-east": "VIP US Este :flag_us:",
      "eu-central": "Europa Central :flag_eu:",
      "eu-west": "Europa Oeste :flag_eu:",
      london: "London :flag_gb:",
      amsterdam: "Amsterdam :flag_nl:",
      india: "India :flag_in:",
    };
    const embed = new Discord.MessageEmbed()
      .setThumbnail(server.iconURL())
      .setAuthor(server.name, server.iconURL)
      .addField("ID", server.id, true)
      .addField("Region", `${region[guild.region]}`, true)
      .addField("Creado el", server.createdAt.toDateString(), true)
      .addField(
        "Dueño del Servidor",
        server.owner.user.tag + " (" + server.owner.user.id + ")",
        true
      )
      .addField(
        "Miembros totales:" + server.memberCount,
        `Usuarios: ${
          guild.members.cache.filter((member) => !member.user.bot).size
        } \n Bots: ${
          guild.members.cache.filter((m) => m.user.bot === true).size
        } `,
        true
      )
      .addField("Roles", msg.guild.roles.cache.size, true)
      .addField(
        `Canales`,
        ` Canales de Texto: ${
          msg.guild.channels.cache.filter((x) => x.type === "text").size
        } \n Canales de Voz: ${
          msg.guild.channels.cache.filter((x) => x.type === "voice").size
        }`
      )
      .addField(`Canal AFK`, server.afkChannel || `Ninguno`)
      .addField(
        `Nivel de verificación`,
        `**${verifiLevels[msg.guild.verificationLevel]}**`,
        true
      )
      .setColor(color);
    msg.channel.send({ embed });
  }
  //// ✅ ////
  if (command === "say") {
    let texto = args.join(" ");
    if (!texto) return msg.channel.send(`Escriba un contenido pára decir.`);
    msg.channel.send(texto);
    msg.delete();
  }
  //// ✅ ////
  if (command === "playstore") {
    var busqueda = args.join("."); //creamos una variable busqueda que son los argumentos
    console.log(busqueda);
    if (msg.author.bot) {
      //para primero si el author del mensaje es un bot
      return; //returnamos nada
    } //y cerramos
    if (!busqueda) {
      //haora le decimos si no hay busqueda que ya lo definimos mas arriga
      return msg.channel.send("que quieres que busque ?"); //returnamos un mensaje
    } //y cerramos
    play
      .search({
        //haora con nuestra variable play iniciamos una busqueda
        term: busqueda, //buscamos nuestra busqueda
        num: 1, //y el primer resultado
      })
      .then((as) => {
        //haora lo optenemos
        play
          .app({ appId: as[0].appId })
          .then((res) => {
            const embed = new Discord.MessageEmbed()
              .setColor(color)
              .setThumbnail(res.icon)
              .addField("Nombre", res.title)
              .addField("funcion", res.summary)
              .addField("descargas", res.installs)
              .addField("rantings", res.ratings)
              .addField("precio", res.priceText)
              .addField("app ID", res.appId)
              .addField("genero", res.genre)
              .addField("app URL", res.url)
              .addField(
                "Creador",
                "Nombre: " +
                  res.developer +
                  "\n" +
                  "Gmail: " +
                  res.developerEmail +
                  "\n" +
                  "SitioWeb: " +
                  res.developerWebsite +
                  "\n" +
                  "direcion: " +
                  res.developerAddress +
                  "ID: " +
                  res.developerId
              ) //haora agregamos otro field pero en este sacaremos todos los datos de desarrollador
              .addField("descripcion", res.recentChanges)
              .setFooter("ejemplo practico");
            msg.channel.send(embed);
          })
          .catch((error) => {
            msg.channel.send("perdon no encontre " + busqueda);
          }); //cerramos esa funcion
      });
  }
  //// ✅ ////
  if (command === "howgay") {
    //definimos comando
    let porcentaje = [
      "1%",
      "10%",
      "12%",
      "13%",
      "14%",
      "15%",
      "16%",
      "17%",
      "18%",
      "19%",
      "20%",
      "21%",
      "22%",
      "23%",
      "24%",
      "25%",
      "26%",
      "26%",
      "27%",
      "28%",
      "29%",
      "30%",
      "31%",
      "32%",
      "33%",
      "34%",
      "35%",
      "50%",
      "51%",
      "54%",
      "53%",
      "101%",
      "81%",
      "56%",
      "78%",
      "74%",
      "79",
      "83",
      "99%",
      "99.99%",
      "100%",
      "101%",
    ]; //hacemos un let porcentaje para poner los posibles porcentajes
    var gay = porcentaje[Math.floor(Math.random() * porcentaje.length)];
    let userm = msg.mentions.users.first();
    if (!userm)
      return msg.reply("Mencione a quien medir el porcentaje gay :flushed:"); //si no ha mencionado a nadie retorna
    const embed = new Discord.MessageEmbed()
      .addField(
        `Porcentaje gay de ${userm.username}`,
        `${userm.username} Es **${gay}** gay :rainbow_flag:`
      )
      .setColor(color);
    msg.channel.send(embed);
  }
  //// ✅ ////
  if (command == "reportbug") {
    let baneados = ["ID1", "ID2", "ID3"];

    if (baneados.includes(msg.author.id))
      return msg.channel.send("Estás baneado de este comando por su mal uso!");

    let canalxd = Natsumi.channels.cache.get("768488561871683586");

    let reporte = args.join(" ");

    const embedreporte = new Discord.MessageEmbed()
      .setTitle("Hay un nuevo reporte!")
      .setThumbnail(Natsumi.user.displayAvatarURL())
      .setDescription(reporte)
      .setColor(color)
      .setFooter(
        `Reporte hecho por: ${msg.author.tag} || ID: ${msg.author.id}`,
        msg.member.user.displayAvatarURL()
      );

    if (!reporte) return message.reply("Te falta el reporte!");

    canalxd.send(embedreporte);

    msg.author.send(
      "Muchas gracias por el reporte! Recuerda que el mal uso del comando tiene consecuencias!\nTu reporte: ```" +
        reporte +
        "```"
    );

    msg.reply("Tu reporte ha sido enviado a mi equipo de soporte!");
  }

  ////////// Comandos con manipulacion de imagenes //////////

  //// ✅ ////
  if (command === "drake") {
    const mencionado = msg.mentions.members.first(); //mencionar a un user
    if (!mencionado) return msg.channel.send("Menciona a alguien"); //mensaje q devuelve si no menciona a un user
    const canvas = Canvas.createCanvas(520, 524); //el tamaño de la imagen
    const ctx = canvas.getContext("2d");

    const background = await Canvas.loadImage(
      "https://www.huevadas.net/hacer/memes-y-graficos/uploads/memes/8b3ea56e890bbc74c912be4274323e1b/5wxmYT.jpg"
    ); //cargamos la imagen de drake
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height); //establecemos esa imagen como fondo

    const avatar = await Canvas.loadImage(
      msg.author.displayAvatarURL({ format: "png" })
    ); //cargamos el avatar nuestro
    const avatar2 = await Canvas.loadImage(
      mencionado.user.displayAvatarURL({ format: "png" })
    ); //cargamos el avatar del mencionado

    ctx.drawImage(avatar2, 261, 1, 258, 258); //aqui muestra la posicion y el tamaaño del avatar del mencionado
    ctx.drawImage(avatar, 261, 261, 259, 264); //aqui muestra la posicion y el tamaaño del avatar nuestro
    const attachment = new Discord.MessageAttachment(
      canvas.toBuffer(),
      "draake.png"
    ); //creamos el attachment

    msg.channel.send(attachment); //mandamos la imagen
  }
  //// ✅ ////
  if (command === "trash") {
    let user = msg.mentions.users.first();
    if (!user) return msg.channel.send(":x: | ¡Debes mencionar a un usuario!"); //Si el usuario no menciona a otro retorna

    const imagen = Canvas.createCanvas(536, 300); //Definimos imagen
    const ctx = imagen.getContext("2d"); //ctx

    const background = await Canvas.loadImage(
      "https://cdn.discordapp.com/attachments/744987188583858267/747444180506247228/Trash.png"
    ); //Definimos la imagen de fondo
    ctx.drawImage(background, 0, 0, imagen.width, imagen.height);

    const mencionadoavatar = await Canvas.loadImage(
      user.displayAvatarURL({ format: "jpg", size: 2048, dynamic: true })
    ); //Cargamos el avatar del mencionado
    ctx.drawImage(mencionadoavatar, 86, 114, 140, 170); //Construimos la imagen (Tamaño y posicion)

    const attachment = new Discord.MessageAttachment(
      imagen.toBuffer(),
      "trash.png"
    ); //Nuevo attachment
    msg.channel.send(attachment); //Enviamos
  }
  //// ✅ ////
  if (command === "admin") {
    const Canvas = require("canvas");

    let user =
      msg.mentions.users.first() ||
      Natsumi.users.cache.get(args[0]) ||
      msg.author; // necesitaremos un usuario para tener un avatar que poner

    let avatar = user.displayAvatarURL({
      dynamic: false,
      size: 128,
      format: "png",
    }); // sacamos el avatar

    const canvas = Canvas.createCanvas(468, 415); // el canvas que quede con la imagen
    const ctx = canvas.getContext("2d"); //el contexto

    let bg = await Canvas.loadImage(
      "https://cdn.discordapp.com/attachments/750461925099307129/752473603127377961/IMG_20200907_051913_014.JPG"
    ); // la imagen, la puedes descargar :perrito:
    ctx.drawImage(bg, 0, 0); // dibujamos la imagen en todo el canvas

    ctx.beginPath(); // empezamos un path para hacer un circulo
    ctx.arc(canvas.width / 2, 70, 60, 0, Math.PI * 2); // se hace el circulo
    ctx.fillStyle = "#000"; // rellenaremos el circulo de negro
    ctx.fill(); // se rellena
    ctx.stroke(); // se hace el circulo en si
    ctx.closePath(); // se cierra el path
    ctx.clip(); // y se hace un clip.

    let imagen = await Canvas.loadImage(avatar); // cargamos la imagen en Canvas
    ctx.drawImage(imagen, 169, 10.7); // y se dibuja en la zona del circulo

    let att = new Discord.MessageAttachment(canvas.toBuffer(), "admin.png"); // el attachment con el buffer
    msg.channel.send(att); // y listo.
  }
  //// ✅ ////
  if (command === "blur") {
    let user = msg.mentions.users.first() || msg.author;
    let avatar = user.displayAvatarURL({ size: 512 }).replace(".webp", ".png");
    const alb = await msg.channel.send("Generating ...");
    let img = await Zoro.blur(avatar);
    let attachment = new Discord.MessageAttachment(img, "blur.png");
    msg.channel.send(attachment) && alb.delete();
  }
  //// ✅ ////
  if (command === "bw") {
    let user = msg.mentions.users.first() || msg.author;
    let avatar = user.displayAvatarURL({ size: 512 }).replace(".webp", ".png");
    const alb = await msg.channel.send("Generating ...");
    let img = await Zoro.bw(avatar);
    let attachment = new Discord.MessageAttachment(img, "blur.png");
    msg.channel.send(attachment) && alb.delete();
  }
  //// ✅ ////
  if (command === "gay") {
    let user = msg.mentions.users.first() || msg.author;
    let avatar = user.displayAvatarURL({ size: 512 }).replace(".webp", ".png");
    const alb = await msg.channel.send("Generating ...");
    let img = await Zoro.gay(avatar);
    let attachment = new Discord.MessageAttachment(img, "blur.png");
    msg.channel.send(attachment) && alb.delete();
  }
  //// ✅ ////
  if (command === "jail") {
    let user = msg.mentions.users.first() || msg.author;
    let avatar = user.displayAvatarURL({ size: 512 }).replace(".webp", ".png");
    const alb = await msg.channel.send("Generating ...");
    let img = await Zoro.jail(avatar);
    let attachment = new Discord.MessageAttachment(img, "blur.png");
    msg.channel.send(attachment) && alb.delete();
  }
  //// ✅ ////
  if (command === "pixel") {
    let user = msg.mentions.users.first() || msg.author;
    let avatar = user.displayAvatarURL({ size: 512 }).replace(".webp", ".png");
    const alb = await msg.channel.send("Generating ...");
    let img = await Zoro.pixel(avatar);
    let attachment = new Discord.MessageAttachment(img, "blur.png");
    msg.channel.send(attachment) && alb.delete();
  }
  //// ✅ ////
  if (command === "sepia") {
    let user = msg.mentions.users.first() || msg.author;
    let avatar = user.displayAvatarURL({ size: 512 }).replace(".webp", ".png");
    const alb = await msg.channel.send("Generating ...");
    let img = await Zoro.sepia(avatar);
    let attachment = new Discord.MessageAttachment(img, "blur.png");
    msg.channel.send(attachment) && alb.delete();
  }
  //// ✅ ////
  if (command === "invert") {
    let user = msg.mentions.users.first() || msg.author;
    let avatar = user.displayAvatarURL({ size: 512 }).replace(".webp", ".png");
    const alb = await msg.channel.send("Generating ...");
    let img = await Zoro.invert(avatar);
    let attachment = new Discord.MessageAttachment(img, "blur.png");
    msg.channel.send(attachment) && alb.delete();
  }
  //// ✅ ////
  if (command === "circle") {
    let user = msg.mentions.users.first() || msg.author;
    let avatar = user.displayAvatarURL({ size: 512 }).replace(".webp", ".png");
    const alb = await msg.channel.send("Generating ...");
    let img = await Zoro.circle(avatar);
    let attachment = new Discord.MessageAttachment(img, "blur.png");
    msg.channel.send(attachment) && alb.delete();
  }
  //// ✅ ////
  if (command === "contrast") {
    let user = msg.mentions.users.first() || msg.author;
    let avatar = user.displayAvatarURL({ size: 512 }).replace(".webp", ".png");
    const alb = await msg.channel.send("Generating ...");
    let img = await Zoro.contrast(avatar);
    let attachment = new Discord.MessageAttachment(img, "blur.png");
    msg.channel.send(attachment) && alb.delete();
  }
  //// ✅ ////
  if (command === "convolute") {
    let user = msg.mentions.users.first() || msg.author;
    let avatar = user.displayAvatarURL({ size: 512 }).replace(".webp", ".png");
    const alb = await msg.channel.send("Generando ...");
    let img = await Zoro.convolute(avatar);
    let attachment = new Discord.MessageAttachment(img, "blur.png");
    msg.channel.send(attachment) && alb.delete();
  }
  //// ✅ ////
  if (command === "triggered") {
    let user = msg.mentions.users.first() || msg.author;
    let avatar = user.displayAvatarURL({ size: 512 }).replace(".webp", ".png");
    const alb = await msg.channel.send("Generando...");
    let img = await Zoro.triggered(avatar);
    let attachment = new Discord.MessageAttachment(img, "triggered.gif");
    msg.channel.send(attachment) && alb.delete();
  }
  //// ✅ ////
  if (command === "comment") {
    let user = msg.mentions.users.first();
    if (!user)
      return msg
        .reply("Tienes que mencionar a alguien")
        .then((m) => m.delete({ timeout: 5000 }));
    let avatar = user.displayAvatarURL({ size: 512 }).replace(".webp", ".png");

    const alb = await msg.channel.send("Generando...");
    const comment = args.slice(1).join(" ");
    const username = user.username;

    let youtubecomment = await utils.youtubecomment(comment, username, avatar);

    msg.channel.send(youtubecomment) && alb.delete();
  }

  ////////// Comandos de Interacción //////////

  //// ✅ ////
  if (command === "bite") {
    let author = msg.author.username;
    const user = msg.mentions.members.first();
    var url = [
      "https://cdn.discordapp.com/attachments/399448944889036801/659834490365149184/19b60975-71f6-4217-8159-8494d79fcfb4.gif",
      "https://cdn.discordapp.com/attachments/399448944889036801/659834318327382016/dc2.gif",
    ];
    let url2 = url[Math.floor(url.length * Math.random())];
    var rpt = [
      `**${author}** mordió a **${msg.mentions.users.first().username}**`,
      `**${author}** piensa que **${
        msg.mentions.users.first().username
      }** es comida O.o`,
    ];
    var mensaje = rpt[Math.floor(url.length * Math.random())];
    if (!user)
      return msg
        .reply("Tienes que mencionar a alguien")
        .then((m) => m.delete({ timeout: 5000 }));
    if (msg.author.id == msg.mentions.users.first().id)
      return msg.channel.send("¿te vas a morder a ti mismo? o.O");
    const embed = new Discord.MessageEmbed()
      .setDescription(mensaje)
      .setColor(color)
      .setImage(url2)
      .setTimestamp();
    msg.channel.send({ embed });
  }
  //// ✅ ////
  if (command === "claps") {
    var url = [
      "https://cdn.discordapp.com/attachments/399448944889036801/702884057578602617/47a5495f775c6b673ade2484869d9ae2.gif",
      "https://cdn.discordapp.com/attachments/399448944889036801/576925143188635668/unnamed_10.gif",
      "https://cdn.discordapp.com/attachments/399448944889036801/596164319494799370/dc6n3aa-aa554e6e-7ea6-43ad-966f-7814b8ff91e9.gif",
      "https://cdn.discordapp.com/attachments/399448944889036801/576914174668439563/unnamed_1.gif",
    ];
    let url2 = url[Math.floor(url.length * Math.random())];
    let author = msg.author.username;
    const user = msg.mentions.members.first();
    if (!user) {
      const embed = new Discord.MessageEmbed()
        .setDescription(`**${author}** está aplaudiendo.`)
        .setColor(color)
        .setImage(url2)
        .setTimestamp();
      msg.channel.send({ embed });
    } else {
      const embed = new Discord.MessageEmbed()
        .setDescription(
          `**${author}** felicita a **${msg.mentions.users.first().username}**`
        )
        .setColor(color)
        .setImage(url2)
        .setTimestamp();
      msg.channel.send({ embed });
    }
  }
  //// ✅ ////
  if (command === "cookie") {
    var url = [
      "https://images-ext-1.discordapp.net/external/WtWW2maDjhZOrqak4_pWpL1fMxsRtkI3fhGM03calUA/https/cdn.weebs.cl/images/nSXTZfMp.gif",
    ];
    let url2 = url[Math.floor(url.length * Math.random())];
    let author = msg.author.username;
    const user = msg.mentions.members.first();
    if (!user) {
      const embed = new Discord.MessageEmbed()
        .setDescription(`**${author}** se comio una galleta`)
        .setColor(color)
        .setImage(url2)
        .setTimestamp();
      msg.channel.send({ embed });
    } else {
      msg.channel.send(
        `**${
          msg.mentions.users.first().username
        }**, has recibido una :cookie: de **${author}**.`
      );
    }
  }
  //// ✅ ////
  if (command === "dance") {
    var url = [
      "https://media.discordapp.net/attachments/742623599558524941/747932197217894430/tenor_1.gif",
      "https://cdn.discordapp.com/attachments/399448944889036801/570373865008660540/chikadance5.gif",
      "https://cdn.discordapp.com/attachments/399448944889036801/644551801588154398/398757aeeeda71f41e82091fcf0496f3.gif",
      "https://cdn.discordapp.com/attachments/399448944889036801/570373874391449600/chikadance6.gif",
    ];
    let url2 = url[Math.floor(url.length * Math.random())];
    let author = msg.author.username;
    const user = msg.mentions.members.first();
    if (!user) {
      const embed = new Discord.MessageEmbed()
        .setDescription(`**${author}** se puso a bailar.`)
        .setColor(color)
        .setImage(url2)
        .setTimestamp();
      msg.channel.send({ embed });
    } else {
      const embed = new Discord.MessageEmbed()
        .setDescription(
          `**${
            msg.mentions.users.first().username
          }**, parece que **${author}** quiere bailar contigo o.o`
        )
        .setColor(color)
        .setImage(url2)
        .setTimestamp();
      msg.channel.send({ embed });
    }
  }
  //// ✅ ////
  if (command === "feed") {
    var url = [
      "https://cdn.discordapp.com/attachments/399448944889036801/714431554486665236/anime-cute-gif-4.gif",
      "https://cdn.discordapp.com/attachments/399448944889036801/698947614728650832/fcd4180c-5ca8-4014-a022-98ce1c2e386e.gif",
      "https://cdn.discordapp.com/attachments/399448944889036801/698947499255398450/848fb821-d633-4319-be36-936ca2cddf8f.gif",
    ];
    let url2 = url[Math.floor(url.length * Math.random())];
    let author = msg.author.username;
    const user = msg.mentions.members.first();
    if (!user) {
      const embed = new Discord.MessageEmbed()
        .setDescription(`**${author}** está comiendo.`)
        .setColor(color)
        .setImage(url2)
        .setTimestamp();
      msg.channel.send({ embed });
    } else {
      const embed = new Discord.MessageEmbed()
        .setDescription(
          `**${author}**le da de comer a**${
            msg.mentions.users.first().username
          }**.`
        )
        .setColor(color)
        .setImage(url2)
        .setTimestamp();
      msg.channel.send({ embed });
    }
  }
  //// ✅ ////
  if (command === "hi") {
    var url = [
      "https://cdn.discordapp.com/attachments/399448944889036801/596153280845840386/tenor_4.gif",
      "https://cdn.discordapp.com/attachments/399448944889036801/640233105260806174/tumblr_pngf9vVXzN1tm1dgio4_500.gif",
      "https://cdn.discordapp.com/attachments/399448944889036801/596153281294893087/3923f5e63b610771803e0d49a6283ecfb3430f56_00.gif",
      "https://cdn.discordapp.com/attachments/399448944889036801/719567461372002344/388cc0b4-c7a7-4b9c-baf6-07200357e039.gif",
      "https://cdn.discordapp.com/attachments/399448944889036801/596153392662052885/d5f1211e39769dac1af0bd316de32185715d356e_hq.gif",
    ];
    let url2 = url[Math.floor(url.length * Math.random())];
    let author = msg.author.username;
    const user = msg.mentions.members.first();
    if (!user) {
      const embed = new Discord.MessageEmbed()
        .setDescription(`**${author}** está saludando a todos.`)
        .setColor(color)
        .setImage(url2)
        .setTimestamp();
      msg.channel.send({ embed });
    } else {
      const embed = new Discord.MessageEmbed()
        .setDescription(
          `**${author}** saluda a **${msg.mentions.users.first().username}**.`
        )
        .setColor(color)
        .setImage(url2)
        .setTimestamp();
      msg.channel.send({ embed });
    }
  }
  //// ✅ ////
  if (command === "hug") {
    var url = [
      "https://cdn.discordapp.com/attachments/399448944889036801/717887765567766580/desconocido.gif",
      "https://cdn.discordapp.com/attachments/399448944889036801/719774180207362048/19180666-0db6-484e-80ff-923a59e3e3d3.gif",
      "https://cdn.discordapp.com/attachments/399448944889036801/689268674535882754/69c9962c573362b73750cf3152b598ce.gif",
      "https://cdn.discordapp.com/attachments/399448944889036801/708686505320906762/ea72ec71-dec0-4931-9f12-876c84a164ac.gif",
    ];
    let url2 = url[Math.floor(url.length * Math.random())];
    const user = msg.mentions.members.first();
    let author = msg.author.username;
    if (!user)
      return msg
        .reply("Tienes que mencionar a alguien")
        .then((m) => m.delete({ timeout: 5000 }));
    if (msg.author.id == msg.mentions.users.first().id)
      return msg.channel
        .send("no puedes abrazarte a ti mismo. :c ")
        .then((m) => m.delete({ timeout: 5000 }));
    const embed = new Discord.MessageEmbed()
      .setDescription(
        `**${author}** abrazo a **${msg.mentions.users.first().username}**`
      )
      .setColor(color)
      .setImage(url2)
      .setTimestamp();
    msg.channel.send({ embed });
  }
  //// ✅ ////
  if (command === "kickbutts") {
    var url = [
      "https://cdn.discordapp.com/attachments/399448944889036801/541474138569834506/unnamed.gif",
    ];
    let url2 = url[Math.floor(url.length * Math.random())];
    const user = msg.mentions.members.first();
    if (!user) return msg.reply("Tienes que mencionar a alguien");
    if (msg.author.id == msg.mentions.users.first().id)
      return msg.channel.send(
        "no creo que te puedas patear a ti mismo, sería absurdo."
      );
    if (msg.mentions.users.first().id == NatsumiID)
      return msg.channel.send("N-no me hagas eso D:");
    let author = msg.author.username;
    const embed = new Discord.MessageEmbed()
      .setDescription(
        `**${author}** pateó a **${msg.mentions.users.first().username}**`
      )
      .setColor(color)
      .setImage(url2)
      .setTimestamp();
    msg.channel.send({ embed });
  }
  //// ✅ ////
  if (command === "kill") {
    var url = [
      "https://cdn.discordapp.com/attachments/758840053316714508/758864371383402556/tenor.gif",
      "https://cdn.discordapp.com/attachments/758840053316714508/762750158031028224/source.gif",
    ];
    let url2 = url[Math.floor(url.length * Math.random())];
    let author = msg.author.username;
    const user = msg.mentions.members.first();
    if (!user) return msg.reply("Tienes que mencionar a alguien");
    if (msg.author.id == msg.mentions.users.first().id)
      return msg.channel.send("No hagas eso D:");
    if (msg.mentions.users.first().id == NatsumiID)
      return msg.channel.send("N-no quiero morir...");
    const embed = new Discord.MessageEmbed()
      .setDescription(
        `**${author}** mató a **${msg.mentions.users.first().username}**`
      )
      .setColor(color)
      .setImage(url2)
      .setTimestamp();
    msg.channel.send({ embed });
  }
  //// ✅ ////
  if (command === "kiss") {
    var url = [
      "https://cdn.discordapp.com/attachments/399448944889036801/664504519572324384/63198070-51aa-4435-8b42-c8078768c9f8.gif",
      "https://cdn.discordapp.com/attachments/399448944889036801/601062382986330133/kiss.gif",
    ];
    let url2 = url[Math.floor(url.length * Math.random())];
    const user = msg.mentions.members.first();
    let author = msg.author.username;
    if (!user) return msg.reply("Tienes que mencionar a alguien");
    if (msg.author.id == msg.mentions.users.first().id)
      return msg.channel.send("¿te besarás a ti mismo? o.O");
    if (msg.mentions.users.first().id == NatsumiID)
      return msg.channel.send("n-no puedo hacerlo >u<");
    const embed = new Discord.MessageEmbed()
      .setDescription(
        `**${
          msg.mentions.users.first().username
        }** ha recibido un beso de **${author}**`
      )
      .setColor(color)
      .setImage(url2)
      .setTimestamp();
    msg.channel.send({ embed });
  }
  //// ✅ ////
  if (command === "laugh") {
    var url = [
      "https://cdn.discordapp.com/attachments/399448944889036801/615272530130763836/laugh11.gif",
      "https://cdn.discordapp.com/attachments/399448944889036801/615272494621917213/laugh9.gif",
      "https://cdn.discordapp.com/attachments/399448944889036801/650317867417337876/tumblr_ojj6neLV8B1vj5j9co1_500.gif",
      "https://cdn.discordapp.com/attachments/399448944889036801/594608754360713258/1542693744_e4e7550d5206aa77578bf68aac829580663c4f0a_hq.gif",
    ];
    let url2 = url[Math.floor(url.length * Math.random())];
    const user = msg.mentions.members.first();
    let author = msg.author.username;
    if (!user) {
      const embed = new Discord.MessageEmbed()
        .setDescription(`**${author}** está riendose.`)
        .setColor(color)
        .setImage(url2)
        .setTimestamp();
      msg.channel.send({ embed });
    } else {
      const embed = new Discord.MessageEmbed()
        .setDescription(
          `**${author}** se ríe de  **${msg.mentions.users.first().username}**.`
        )
        .setColor(color)
        .setImage(url2)
        .setTimestamp();
      msg.channel.send({ embed });
    }
  }
  //// ✅ ////
  if (command === "pat") {
    var url = [
      "https://cdn.discordapp.com/attachments/399448944889036801/698947637851717743/7c999f2c-98f8-4b0d-a9e4-2bf114caf8f9.gif",
      "https://cdn.discordapp.com/attachments/399448944889036801/662984154341965825/27baa0fed882b3b494f832c21bb5492e.gif",
      "https://cdn.discordapp.com/attachments/399448944889036801/628658545570873344/pat2.gif",
      "https://cdn.discordapp.com/attachments/399448944889036801/628658584116264960/pat7.gif",
    ];
    let url2 = url[Math.floor(url.length * Math.random())];
    const user = msg.mentions.members.first();
    let author = msg.author.username;
    if (!user) return msg.reply("Tienes que mencionar a alguien");
    if (msg.author.id == msg.mentions.users.first().id)
      return msg.channel.send("No puedes acariciarte a ti mismo :C");
    const embed = new Discord.MessageEmbed()
      .setDescription(
        `**${author}** acaricia a **${msg.mentions.users.first().username}**`
      )
      .setColor(color)
      .setImage(url2)
      .setTimestamp();
    msg.channel.send({ embed });
  }
  //// ✅ ////
  if (command === "punch") {
    var url = [
      "https://cdn.discordapp.com/attachments/399448944889036801/711618898130370641/20200517_112437_1.gif",
      "https://cdn.discordapp.com/attachments/399448944889036801/597190734302412810/f3a.gif",
    ];
    let url2 = url[Math.floor(url.length * Math.random())];
    const user = msg.mentions.members.first();
    let author = msg.author.username;
    if (!user) return msg.reply("Tienes que mencionar a alguien");
    if (msg.author.id == msg.mentions.users.first().id)
      return msg.channel.send("no creo que te puedas golpear a ti mismo.");
    if (msg.mentions.users.first().id == NatsumiID)
      return msg.channel.send("N-no me hagas eso D:");
    const embed = new Discord.MessageEmbed()
      .setDescription(
        `**${author}** golpeá a **${msg.mentions.users.first().username}**`
      )
      .setColor(color)
      .setImage(url2)
      .setTimestamp();
    msg.channel.send({ embed });
  }
  //// ✅ ////
  if (command === "run") {
    var url = [
      "https://cdn.discordapp.com/attachments/399448944889036801/699752298296901662/c9adaa5c-d218-47b4-b734-80dcf735e6c3.gif",
      "https://cdn.discordapp.com/attachments/399448944889036801/541467280391929856/tenor.gif",
    ];
    let url2 = url[Math.floor(url.length * Math.random())];
    const user = msg.mentions.members.first();
    let author = msg.author.username;
    var rpt = [
      `**${author}** corre de **${msg.mentions.users.first().username}**`,
      `**${author}** está corriendo de  **${
        msg.mentions.users.first().username
      }**`,
    ];
    var mensaje = rpt[Math.floor(url.length * Math.random())];
    if (!user) {
      const embed = new Discord.MessageEmbed()
        .setDescription(`**${author}** está corriendo.`)
        .setColor(color)
        .setImage(url2)
        .setTimestamp();
      msg.channel.send({ embed });
    } else {
      const embed = new Discord.MessageEmbed()
        .setDescription(`${mensaje}`)
        .setColor(color)
        .setImage(url2)
        .setTimestamp();
      msg.channel.send({ embed });
    }
  }
  //// ✅ ////
  if (command === "slap") {
    let url2 = url[Math.floor(url.length * Math.random())];
    var url = [
      "https://cdn.discordapp.com/attachments/399448944889036801/596763241766453248/love-lab-gif.gif",
      "https://cdn.discordapp.com/attachments/399448944889036801/591264924408479754/3cd47d7d79d0da15a7408fea69c8c64c.gif",
    ];
    const user = msg.mentions.members.first();
    let author = msg.author.username;
    if (!user) return msg.reply("Tienes que mencionar a alguien");
    const embed = new Discord.MessageEmbed()
      .setDescription(
        `**${
          msg.mentions.users.first().username
        }** ha recibido una bofetada de **${author}**`
      )
      .setColor(color)
      .setImage(url2)
      .setTimestamp();
    msg.channel.send({ embed });
  }
  //// ✅ ////
  if (command === "sleep") {
    var url = [
      "https://cdn.discordapp.com/attachments/399448944889036801/722410047791038594/23eb0f95-63e9-467f-9972-b2c731d1795b.gif",
      "https://cdn.discordapp.com/attachments/399448944889036801/573630233203310650/tenor.gif",
    ];
    let url2 = url[Math.floor(url.length * Math.random())];
    const user = msg.mentions.members.first();
    let author = msg.author.username;
    const embed = new Discord.MessageEmbed()
      .setDescription(`**${author}** está durmiendo.`)
      .setColor(color)
      .setImage(url2)
      .setTimestamp();

    msg.channel.send({ embed });
  }

  ////////// Comandos de Reacción //////////

  //// ✅ ////
  if (command === "angry") {
    var url = [
      "https://media1.tenor.com/images/cfbc067a1445d5baa5ca36cc2642a6c4/tenor.gif?itemid=5664724",
      "https://media1.tenor.com/images/3424df822494d78bc184aae3e14d84e3/tenor.gif?itemid=4675166",
      "https://cdn.discordapp.com/attachments/399448944889036801/609026412354994176/angry2.gif",
    ];
    let url2 = url[Math.floor(url.length * Math.random())];
    let author = msg.author.username;
    const embed = new Discord.MessageEmbed()
      .setDescription(`**${author}** se ha molestado mucho.`)
      .setColor(color)
      .setImage(url2)
      .setTimestamp();

    msg.channel.send({ embed });
  }
  //// ✅ ////
  if (command === "blush") {
    var url = [
      "https://cdn.discordapp.com/attachments/399448944889036801/615280157246095470/7296895b-6a3a-49b7-ac0d-69b8c72fcc73.gif",
      "https://cdn.discordapp.com/attachments/399448944889036801/600528806733676545/454f4feec7fb8b447d4c3763d39f5ee6938a88da_00.gif",
      "https://cdn.discordapp.com/attachments/399448944889036801/564139779520987146/unnamed_1.gif",
    ];
    let url2 = url[Math.floor(url.length * Math.random())];
    let author = msg.author.username;
    const embed = new Discord.MessageEmbed()
      .setDescription(`**${author}** se ha sonrojado.`)
      .setColor(color)
      .setImage(url2)
      .setTimestamp();

    msg.channel.send({ embed });
  }
  //// ✅ ////
  if (command === "boom") {
    var url = [
      "https://cdn.discordapp.com/attachments/399448944889036801/651487903998017536/35102faf-8640-4a47-bdf6-d32f1de870bc.gif",
      "https://cdn.discordapp.com/attachments/399448944889036801/550426150560595981/CapitalImpeccableKingfisher-size_restricted.gif",
      "https://cdn.discordapp.com/attachments/399448944889036801/550389012641349663/tenor.gif",
    ];
    let url2 = url[Math.floor(url.length * Math.random())];
    const embed = new Discord.MessageEmbed()
      .setDescription(`**¡BOOM!** .`)
      .setColor(color)
      .setImage(url2)
      .setTimestamp();

    msg.channel.send({ embed });
  }
  //// ✅ ////
  if (command === "bored") {
    var url = [
      "https://cdn.discordapp.com/attachments/399448944889036801/698943729276289055/image0.gif",
      "https://cdn.discordapp.com/attachments/399448944889036801/715638444793266288/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f776174747061642d6d656469612d736572766963652f53746f.gif",
      "https://cdn.discordapp.com/attachments/399448944889036801/659844219900526612/QuaintNeedyCapeghostfrog-size_restricted.gif",
    ];
    let url2 = url[Math.floor(url.length * Math.random())];
    let author = msg.author.username;
    const embed = new Discord.MessageEmbed()
      .setDescription(`**${author}** Ser aburre mucho.`)
      .setColor(color)
      .setImage(url2)
      .setTimestamp();

    msg.channel.send({ embed });
  }
  //// ✅ ////
  if (command === "confused") {
    var url = [
      "https://cdn.discordapp.com/attachments/399448944889036801/608119519151521847/0a83428471cfe28ed541434addf9421b.gif",
      "https://cdn.discordapp.com/attachments/399448944889036801/656908484931092480/9042993c-f4da-420a-ae78-1043e5a60ba4.gif",
      "https://cdn.discordapp.com/attachments/399448944889036801/709989987633987604/b3181177dac21a998054ec31aab71e721f34cfc6_hq.gif",
    ];
    let url2 = url[Math.floor(url.length * Math.random())];
    let author = msg.author.username;
    const embed = new Discord.MessageEmbed()
      .setDescription(`**${author}** No entiende nada.`)
      .setColor(color)
      .setImage(url2)
      .setTimestamp();

    msg.channel.send({ embed });
  }
  //// ✅ ////
  if (command === "cry") {
    var url = [
      "https://cdn.discordapp.com/attachments/399448944889036801/716738621838852116/Que_sad_wey.gif",
      "https://cdn.discordapp.com/attachments/399448944889036801/697473340348039248/cfcb18a3eb4ebc28c5ddc3665c83c8824e2d24be_00.gif",
      "https://cdn.discordapp.com/attachments/399448944889036801/650318672321052682/8T101PL.gif",
    ];
    let url2 = url[Math.floor(url.length * Math.random())];
    let author = msg.author.username;
    const embed = new Discord.MessageEmbed()
      .setDescription(`**${author}** ha dejado caer sus lágrimas...`)
      .setColor(color)
      .setImage(url2)
      .setTimestamp();

    msg.channel.send({ embed });
  }
  //// ✅ ////
  if (command === "disgust") {
    var url = [
      "https://media.discordapp.net/attachments/399448944889036801/518918137220038673/1504176020_perv.gif?width=400&height=225",
      "https://media.discordapp.net/attachments/399448944889036801/518917912493293568/tenor.gif?width=400&height=225",
      "https://cdn.discordapp.com/attachments/399448944889036801/601061564212183060/disgust.gif",
    ];
    let url2 = url[Math.floor(url.length * Math.random())];
    let author = msg.author.username;
    const embed = new Discord.MessageEmbed()
      .setDescription(`**${author}** se ha disgustado de eso`)
      .setColor(color)
      .setImage(url2)
      .setTimestamp();

    msg.channel.send({ embed });
  }
  //// ✅ ////
  if (command === "facepalm") {
    var url = [
      "https://cdn.discordapp.com/attachments/393558002726338561/464506153108373525/unnamed.gif",
      "https://cdn.discordapp.com/attachments/393558002726338561/464506153846439938/unnamed_2.gif",
      "https://cdn.discordapp.com/attachments/393558002726338561/464506152676491265/unnamed_1.gif",
    ];
    let url2 = url[Math.floor(url.length * Math.random())];
    let author = msg.author.username;
    const embed = new Discord.MessageEmbed()
      .setDescription(`**${author}** se ha decepcionado...`)
      .setColor(color)
      .setImage(url2)
      .setTimestamp();

    msg.channel.send({ embed });
  }
  //// ✅ ////
  if (command === "game") {
    var url = [
      "https://cdn.discordapp.com/attachments/694005107083313252/701490847333482627/19.gif",
      "https://cdn.discordapp.com/attachments/694005107083313252/701490701367771166/7.gif",
      "https://cdn.discordapp.com/attachments/694005107083313252/701490642525749288/10.gif",
    ];
    let url2 = url[Math.floor(url.length * Math.random())];
    let author = msg.author.username;
    const embed = new Discord.MessageEmbed()
      .setDescription(`**${authorcanvas}** está jugando algo divertido.`)
      .setColor(color)
      .setImage(url2)
      .setTimestamp();

    msg.channel.send({ embed });
  }
  //// ✅ ////
  if (command === "happy") {
    var url = [
      "https://cdn.discordapp.com/attachments/399448944889036801/586593020741156874/happy_ngnl_15.gif",
      "https://cdn.discordapp.com/attachments/399448944889036801/715944429202178078/a5b34e01b953b80d7877fa508263bde8.gif",
      "https://cdn.discordapp.com/attachments/399448944889036801/651510686161305630/90a4e174-527e-445f-be80-3cf49010b0bb.gif",
      "https://imgur.com/Dl9OgKn.gif",
      "https://cdn.discordapp.com/attachments/399448944889036801/600528806041747527/tumblr_ntepjt6u9i1ta7pubo2_500.gif",
    ];
    let url2 = url[Math.floor(url.length * Math.random())];
    let author = msg.author.username;
    const embed = new Discord.MessageEmbed()
      .setDescription(`**${author}** anda muy alegre.`)
      .setColor(color)
      .setImage(url2)
      .setTimestamp();

    msg.channel.send({ embed });
  }
  //// ✅ ////
  if (command === "like") {
    var url = [
      "https://cdn.discordapp.com/attachments/399448944889036801/701455116460359711/dcbe9fd2-3c2b-4ff2-877b-2815e2cef577.gif",
      "https://cdn.discordapp.com/attachments/399448944889036801/677607434109321262/1522111812_tenor.gif",
      "https://cdn.discordapp.com/attachments/399448944889036801/677210104545804307/57a68efd6d89926fb8a4d4a44131fff3.gif",
    ];
    let url2 = url[Math.floor(url.length * Math.random())];
    let author = msg.author.username;
    const embed = new Discord.MessageEmbed()
      .setDescription(`A **${author}** le gusta eso :D`)
      .setColor(color)
      .setImage(url2)
      .setTimestamp();

    msg.channel.send({ embed });
  }
  //// ✅ ////
  if (command === "nope") {
    var url = [
      "https://pa1.narvii.com/5709/283cd338d17bccabdcffe4022200bce33de9a26f_hq.gif",
      "https://cdn.discordapp.com/attachments/399448944889036801/597190816024494100/jGYMqAy.gif",
      "https://i.kym-cdn.com/photos/images/original/001/087/918/e5c.gif",
    ];
    let url2 = url[Math.floor(url.length * Math.random())];
    let author = msg.author.username;
    const embed = new Discord.MessageEmbed()
      .setDescription(`**NOPE!**`)
      .setColor(color)
      .setImage(url2)
      .setTimestamp();

    msg.channel.send({ embed });
  }
  //// ✅ ////
  if (command === "pout") {
    var url = [
      "https://cdn.discordapp.com/attachments/399448944889036801/701454589261512744/97d9b111-2796-429a-863e-86b252bffbdd.gif",
      "https://cdn.discordapp.com/attachments/399448944889036801/564137951504629781/unnamed_9.gif",
      "https://cdn.discordapp.com/attachments/399448944889036801/692934907608957018/Anime-Tsuujou-kougeki-ga-zentai-kougeki-de-ni-kai-kougeki-no-okaasan-wa-suki-desu-ka-Re-Zero-Kara-Ha.png",
    ];
    let url2 = url[Math.floor(url.length * Math.random())];
    let author = msg.author.username;
    const embed = new Discord.MessageEmbed()
      .setDescription(`**${author}** no parece estar feliz por ello e.e`)
      .setColor(color)
      .setImage(url2)
      .setTimestamp();

    msg.channel.send({ embed });
  }
  //// ✅ ////
  if (command === "shurg") {
    var url = [
      "https://cdn.discordapp.com/attachments/399448944889036801/707748897195294780/ae9a6fce1c6a83d35d85b11eb34ecddc.jpg",
      "https://i.pinimg.com/originals/83/ce/94/83ce948166a598c00b08fb558b07f224.gif",
      "https://78.media.tumblr.com/0cf5b8479cc687456e29e23287910445/tumblr_p1edjjqx7m1wn2b96o1_500.gif",
    ];
    let url2 = url[Math.floor(url.length * Math.random())];
    let author = msg.author.username;
    const embed = new Discord.MessageEmbed()
      .setDescription(`Parece que a **${author}** no le importa.`)
      .setColor(color)
      .setImage(url2)
      .setTimestamp();

    msg.channel.send({ embed });
  }
  //// ✅ ////
  if (command === "sing") {
    var url = [
      "https://cdn.discordapp.com/attachments/399448944889036801/595823457225277446/tenor_3.gif",
      "https://cdn.discordapp.com/attachments/399448944889036801/656901092872814592/d5b97fc0-34eb-4367-9b0b-541adf9d6420.gif",
      "https://cdn.discordapp.com/attachments/399448944889036801/595823181827407903/f189cf296e54467abeb1bed6034402ab03e3c12b3acbc3e1c6bf41bfe7810cd6.gif",
    ];
    let url2 = url[Math.floor(url.length * Math.random())];
    let author = msg.author.username;
    const embed = new Discord.MessageEmbed()
      .setDescription(`**${author}** está cantando`)
      .setColor(color)
      .setImage(url2)
      .setTimestamp();

    msg.channel.send({ embed });
  }
  //// ✅ ////
  if (command === "sip") {
    var url = [
      "https://cdn.discordapp.com/attachments/399448944889036801/579116795059765265/is-the-order-a-rabbit-01.gif",
      "https://cdn.discordapp.com/attachments/399448944889036801/615268654677753926/sip3.gif",
      "https://cdn.discordapp.com/attachments/399448944889036801/579117803366383636/849f3962b7b13c8e1bd0f250575c03c044fcbfc7_hq.gif",
    ];
    let url2 = url[Math.floor(url.length * Math.random())];
    let author = msg.author.username;
    const embed = new Discord.MessageEmbed()
      .setDescription(`Parece que **${author}** andaba con mucha sed...`)
      .setColor(color)
      .setImage(url2)
      .setTimestamp();

    msg.channel.send({ embed });
  }
  //// ✅ ////
  if (command === "smug") {
    var url = [
      "https://cdn.discordapp.com/attachments/399448944889036801/664076424411348992/14e462f8-22d5-4779-bb4d-675c9ce1a246.gif",
      "https://i.kym-cdn.com/photos/images/newsfeed/000/928/760/db8.gif",
      "https://cdn.discordapp.com/attachments/399448944889036801/564139289303056393/unnamed_4.gif",
    ];
    let url2 = url[Math.floor(url.length * Math.random())];
    let author = msg.author.username;
    const embed = new Discord.MessageEmbed()
      .setDescription(`**${author}** está presumiendo.`)
      .setColor(color)
      .setImage(url2)
      .setTimestamp();

    msg.channel.send({ embed });
  }
  //// ✅ ////
  if (command === "think") {
    var url = [
      "https://cdn.discordapp.com/attachments/399448944889036801/734827870161076264/c0a7c479f149011b88fe3df460d01e95.gif",
      "https://cdn.discordapp.com/attachments/399448944889036801/575804921111379968/large.gif",
      "https://cdn.discordapp.com/attachments/399448944889036801/615264368937926656/think6.gif",
    ];
    let url2 = url[Math.floor(url.length * Math.random())];
    let author = msg.author.username;
    const embed = new Discord.MessageEmbed()
      .setDescription(`**${author}** se puso a pensar. Hmm...`)
      .setColor(color)
      .setImage(url2)
      .setTimestamp();

    msg.channel.send({ embed });
  }
  //// ✅ ////
  if (command === "vomit") {
    var url = [
      "https://cdn.discordapp.com/attachments/399448944889036801/541472143481765888/unnamed_12.gif",
      "https://cdn.discordapp.com/attachments/399448944889036801/541472145805410360/unnamed_13.gif",
      "https://cdn.discordapp.com/attachments/399448944889036801/541472204886638602/unnamed_5.gif",
    ];
    let url2 = url[Math.floor(url.length * Math.random())];
    let author = msg.author.username;
    const embed = new Discord.MessageEmbed()
      .setDescription(`**${author}** no pudo contenerse y vomitó`)
      .setColor(color)
      .setImage(url2)
      .setTimestamp();

    msg.channel.send({ embed });
  }
});

Natsumi.login(config.token);
