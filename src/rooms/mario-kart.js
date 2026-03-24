let maps = []

var mapSpain = ``
maps.push({ name: "Circuito de Catalunya - Espanha", map: mapSpain, finishLine: { x: 0, y1: 145, y2: 265 } })

var mapArgentina = ``
maps.push({ name: "Autódromo Termas de Río Hondo - Argentina", map: mapArgentina, finishLine: { x: 0, y1: -300, y2: -180 } })

// var mapBritain = ``
// maps.push({name: "Circuito de Silverstone - Grã-Bretanha", map: mapBritain, finishLine: {x:0, y1:-300, y2:-180}})

var mapGermany = ``;
maps.push({ name: "Nürburgring Strecke - Alemanha", map: mapGermany, finishLine: { x: 435, y1: 145, y2: 265 } })


//_________________________________________________________________________________________________________________________________________________

var room = HBInit({
    roomName: "🌟 𝗛𝗮𝘅𝗜𝗗 🏆 𝗠𝗮𝗿𝗶𝗼 𝗞𝗮𝗿𝘁 🍄 𝗕𝗘𝗧𝗔",
    maxPlayers: 14,
    noPlayer: true,
    public: false,
    geo: { "code": "BR", "lat": -23.533300399780273, "lon": -46.633201599121094 },
    token: "thr1.AAAAAGnCk5rgGWxXKno-uA.Bv5mfnjPzM8"
});

//_________________________________________________________________________________________________________________________________________________

var senha = "!eventoadm"
var purplecolor = 0xA700C3;
var cyancolor = 0xbfeeee;
var yellowcolor = 0xdddd00;
var redcolor = 0xbb0000;
var orangecolor = 0xff8800;
var bluecolor = 0x1e90ff;
var whitecolor = 0xFFFFFF;
var graycolor = 0xa0a0a0;
var greencolor = 0x00A838;
var gameStarted = false;
var gamePaused = false
var cf = room.CollisionFlags
var safeLap = 0
var discord = "discord.gg"
var priceShield = 10;
var price1st = 5;
var priceFila = 5;
var bot = true
var race = false
var use1st = null
var safePlayer
var startCountdown
var dontCallAgain = false
let connections = [] //All time connections
let admlist = [] //List of admins
let modlist = [] //List of moderators
let viplist = [] //List of VIPs
let players = []
let pauseId = []
let cars = [1, 2, 3, 4, 5, 6, 7, 8]

let powers = [];
for (var i = 0; i < 8; i++) {
    powers[powers.length] = "speed"
}
for (var i = 0; i < 4; i++) {
    powers[powers.length] = "slowAll"
}
for (var i = 0; i < 0; i++) {
    powers[powers.length] = "star"
}
for (var i = 0; i < 0; i++) {
    powers[powers.length] = "ghost"
}
for (var i = 0; i < 0; i++) {
    powers[powers.length] = "flower"
}
for (var i = 0; i < 10; i++) {
    powers[powers.length] = "heavy"
}
for (var i = 0; i < 10; i++) {
    powers[powers.length] = "turtleGreen"
}
for (var i = 0; i < 4; i++) {
    powers[powers.length] = "turtleBlue"
}
for (var i = 0; i < 10; i++) {
    powers[powers.length] = "banana"
}
for (var i = 0; i < 10; i++) {
    powers[powers.length] = "small"
}

let probability = []
probability.speed = parseFloat((powers.filter(a => a == "speed").length / powers.length * 100).toFixed(2))
probability.heavy = parseFloat((powers.filter(a => a == "heavy").length / powers.length * 100).toFixed(2))
probability.turtleGreen = parseFloat((powers.filter(a => a == "turtleGreen").length / powers.length * 100).toFixed(2))
probability.turtleBlue = parseFloat((powers.filter(a => a == "turtleBlue").length / powers.length * 100).toFixed(2))
probability.banana = parseFloat((powers.filter(a => a == "banana").length / powers.length * 100).toFixed(2))
probability.slowAll = parseFloat((powers.filter(a => a == "slowAll").length / powers.length * 100).toFixed(2))
probability.small = parseFloat((powers.filter(a => a == "small").length / powers.length * 100).toFixed(2))
probability.star = parseFloat((powers.filter(a => a == "star").length / powers.length * 100).toFixed(2))
probability.ghost = parseFloat((powers.filter(a => a == "ghost").length / powers.length * 100).toFixed(2))
probability.flower = parseFloat((powers.filter(a => a == "flower").length / powers.length * 100).toFixed(2))
probability

let activePower = []
let inactiveDisc = []
let activeTurtle = []
let activeBanana = []
let lockedPlayer = []
var minStartPlayers = 4;
var allowMapChange = false
var mapNumber = 0
let storage = []
let finishLine = []


//_________________________________________________________________________________________________________________________________________________


function joined(player) {
    player.auth = player.auth
    player.conn = player.conn

    player.money = 0
    player.stats1st = 0
    player.stats2nd = 0
    player.stats3rd = 0
    player.statsRaces = 0
    player.statsLaps = 0

    player.statsPodiums = player.stats1st + player.stats2nd + player.stats3rd
    if (player.statsRaces != 0) {
        player.statsPodiumRate = player.statsPodiums / player.statsRaces
    } else {
        player.statsPodiumRate = 0
    }
    player.afk = false
    player.role = "player"
    player.lap = null
    player.place = null
    player.car = null
    player.power = "none"
    player.turtle = null
    player.banana = null
    player.shield = false
    player.locked = false
    player.kickAbuse = 0
    player.troll = false
    players.push(player)
    connections.push(player)

}


function uploadToDatabase(player) {
    var player = players[players.findIndex(a => a.id == player.id)]
    return player
}

function updateAdmins() {
    var players = room.getPlayerList()
    if (players.length == 0) return; //No players left, do nothing.
    if (players.find((player) => player.admin) != null) return; // There's an admin left, do nothing.
    room.setPlayerAdmin(players[0].id, true); // Give admin to the first non admin player in the list
    players[players.findIndex(a => a.id == players[0].id)].admin = true
}


//Unpauses the game
function resetPause() {
    room.pauseGame(false)
}


//Set player for race
function setRace(player, bool) {
    var player = players[players.findIndex(a => a.id == player.id)]
    if (!bool) {
        player.lap = null
        player.place = null
        if (player.car != null) {
            cars.push(player.car)
            cars.sort()
        }
        player.car = null
        player.lastNode = null
        player.nextNode = null
        player.lastPowerNode = null
        player.power = "none"
        player.turtle = null
        player.banana = null
        player.lock = null
        player.locked = false
        player.troll = false
        if (race && player.shield == true) {
            player.shield = false
            room.sendAnnouncement("Voce perdeu: ESCUDO", player.id, greencolor, "bold")
        }
        players = players.filter(a => a.id != player.id)
        players.push(player)
    }
    if (bool) {
        redPlayers = players.filter(a => a.team == 1)
        player.lap = 0
        player.car = cars[0]
        cars = cars.filter(a => a != player.car)
        player.lastNode = 3
        player.nextNode = 0
        player.lastPowerNode = null
        player.place = player.car
        player.power = "none"
        player.turtle = 9 + player.car * 2 - 1
        player.banana = 9 + player.car * 2
        player.kickAbuse = 0
        player.lock = 23 + 3 * player.car
        player.locked = false
        player.troll = false
        players = players.filter(a => a.id != player.id)
        players.push(player)
        var avatar = player.car.toString()
        if (player.shield == true) {
            avatar = "🔰️"
        }
        room.setPlayerAvatar(player.id, avatar);
    }
}


//Starts the race
function startRace() {
    room.setDiscProperties(0, { x: 0, y: -0.1, yspeed: 0.001, radius: 100000 })
    var redPlayers = players.filter(a => a.team == 1)
    for (var i = 0; i < redPlayers.length; i++) {
        room.setPlayerDiscProperties(redPlayers[i].id, { cGroup: cf.c2 })
    }
    room.setDiscProperties(50, { color: greencolor })
    room.sendAnnouncement("É DADA A LARGADA e comeeeeeeça a corrida!!!", null, greencolor, "bold")

}


//Sets the grid
function setGrid() {
    if (bot) {
        var onPlayers = players.filter(a => a.afk == false)
        if (onPlayers.length >= minStartPlayers) {
            if (!race) {
                dontCallAgain = true
                room.stopGame()
                var specOnPlayers = onPlayers.filter(a => a.team != 1)
                for (var i = 0; i < specOnPlayers.length; i++) {
                    if (players.filter(a => a.team == 1).length < 8) {
                        room.setPlayerTeam(specOnPlayers[i].id, 1)
                        players[players.findIndex(a => a.id == specOnPlayers[i].id)].team = 1
                    }
                }
                race = true
                if (!allowMapChange) {
                    room.startGame()
                }
            }
            if (race && !gameStarted) {
                var specOnPlayers = onPlayers.filter(a => a.team != 1)
                for (var i = 0; i < specOnPlayers.length; i++) {
                    if (players.filter(a => a.team == 1).length < 8) {
                        room.setPlayerTeam(specOnPlayers[i].id, 1)
                        players[players.findIndex(a => a.id == specOnPlayers[i].id)].team = 1
                    }
                }
                if (!allowMapChange) {
                    room.startGame()
                }
            }
        } else {
            if (!race) {
                if (!gameStarted) {
                    for (var i = 0; i < onPlayers.filter(a => a.team == 1).length; i++) {
                        room.sendAnnouncement("Estamos esperando " + minStartPlayers + " jogadores para começar a partida. Você pode andar pela pista enquanto isso", onPlayers.filter(a => a.team == 1)[i].id, yellowcolor)
                    }
                }
                for (var i = 0; i < onPlayers.filter(a => a.team != 1 && a.kickAbuse < 4).length; i++) {
                    room.setPlayerTeam(onPlayers.filter(a => a.team != 1 && a.kickAbuse < 4)[i].id, 1)
                    room.sendAnnouncement("Estamos esperando " + minStartPlayers + " jogadores para começar a partida. Você pode andar pela pista enquanto isso", onPlayers.filter(a => a.team != 1 && a.kickAbuse < 4)[i].id, yellowcolor)
                }
                if (!allowMapChange) {
                    room.startGame()
                }
            }
        }
    }
}


//Check for lap change
function lapRace(player) {
    var playerDisc = room.getPlayerDiscProperties(player.id)
    var player = players.filter(a => a.id == player.id)[0]
    if (Math.abs(finishLine.x - playerDisc.x) <= playerDisc.radius + 2) {
        if (playerDisc.y > finishLine.y1 && playerDisc.y < finishLine.y2) {
            if (player.lastNode >= 2) {
                //Reset player nodes and update player race position
                players[players.findIndex(a => a.id == player.id)].lastNode = 0
                players[players.findIndex(a => a.id == player.id)].nextNode = 0
                players[players.findIndex(a => a.id == player.id)].lastPowerNode = null
                players[players.findIndex(a => a.id == player.id)].lap = player.lap + 1
                players[players.findIndex(a => a.id == player.id)].place = players.filter(a => a.lap >= player.lap).length
                if (players[players.findIndex(a => a.id == player.id)].place == 1) {
                    room.sendAnnouncement(player.name + " abriu a " + player.lap + "º volta 🏁", null, orangecolor, "bold")
                }
                if (player.power == "none") {
                    var avatar = player.car.toString()
                    if (player.shield == true) {
                        avatar = "🔰️"
                    }
                    room.setPlayerAvatar(player.id, avatar);
                }
                room.setPlayerDiscProperties(player.id, { cGroup: cf.red, invMass: playerDisc.invMass / 1000 })

                //Remove last players			
                var removeLast = players.filter(a => a.lap < player.lap && a.team == 1)
                if (removeLast.length == 1 && player.lap - 1 != safeLap) {
                    room.setPlayerTeam(removeLast[0].id, 0)
                    room.sendAnnouncement(removeLast[0].name + " foi removido por ser o último colocado", null, yellowcolor)
                    if (players.filter(a => a.team == 1).length == 2) {
                        safePlayer = removeLast[0].id
                        players[players.findIndex(a => a.id == removeLast[0].id)].stats2nd += 1
                        players[players.findIndex(a => a.id == removeLast[0].id)].statsPodiums += 1

                    }
                    if (players.filter(a => a.team == 1).length == 3) {
                        players[players.findIndex(a => a.id == removeLast[0].id)].stats3rd += 1
                        players[players.findIndex(a => a.id == removeLast[0].id)].statsPodiums += 1
                    }
                    return
                }
                var removeLast = players.filter(a => a.lap < player.lap - 1 && a.team == 1)
                for (var i = 0; i < removeLast.length; i++) {
                    room.setPlayerTeam(removeLast[i].id, 0)
                }
                if (removeLast.length > 0 && redPlayers.length > 2) {
                    room.sendAnnouncement("Os jogadores foram removidos por tomar uma volta do líder", null, yellowcolor)
                }

                //Add lap do stats
                players[players.findIndex(a => a.id == player.id)].statsLaps += 1
            }
            if (players[players.findIndex(a => a.id == player.id)].lastPowerNode == 0) {
                players[players.findIndex(a => a.id == player.id)].troll = true
                safeLap = player.lap
                room.sendAnnouncement("Todos os jogadores na volta " + player.lap + " estão seguros da eliminação", null, yellowcolor)
                room.setPlayerTeam(player.id, 0)
            }
        }
    }
}


//Randomize next map
function changeMap() {
    room.stopGame()
    mapNumber = Math.floor(Math.random() * maps.length)
    room.setCustomStadium(maps[mapNumber].map)
    finishLine = maps[mapNumber].finishLine
    room.startGame()
}


//Calculate distances
function distance(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
}


//Calculates direction
function direction(xspeed, yspeed) {
    var speed = Math.sqrt(Math.pow(xspeed, 2) + Math.pow(yspeed, 2))
    if (speed == 0) {
        return { xdir: 0, ydir: 0, speed: 0 };
    }
    return { xdir: xspeed / speed, ydir: yspeed / speed, speed: speed };
}



//Checks player collision with turtle and banana
function collision(player) {
    var playerDisc = room.getPlayerDiscProperties(player.id)
    var player = players.filter(a => a.id == player.id)[0]
    if (player.locked == true) return;
    if (player.shield == true) return;
    if (playerDisc.radius > 15) return;
    for (var i = 0; i < activeTurtle.length; i++) {
        if (activeTurtle[i].id == player.id) continue;
        var turtleDisc = room.getDiscProperties(activeTurtle[i].turtle)
        if (distance(playerDisc.x, playerDisc.y, turtleDisc.x, turtleDisc.y) <= playerDisc.radius + turtleDisc.radius) {
            if (turtleDisc.color == greencolor) {
                var speed = 9;
                var color = "verde 🟢"
            }
            if (turtleDisc.color == bluecolor) {
                var speed = -2;
                var color = "azul 🔵"
            }
            var message = " foi atingido por um casco " + color
            room.sendAnnouncement("Você" + message, player.id, cyancolor, "bold")
            var others = players.filter(a => a.id != player.id)
            for (var j = 0; j < others.length; j++) {
                room.sendAnnouncement(player.name + message, others[j].id, cyancolor)
            }

            lock(player)
            setTimeout(resetLock, 500)
            if (direction(playerDisc.xspeed, playerDisc.yspeed).speed == 0) continue;
            var turtleRadius = 10;
            var turtleDamping = 1;
            var safeDistance = 2;
            var x = playerDisc.x + (playerDisc.radius + turtleRadius + 2) * direction(playerDisc.xspeed, playerDisc.yspeed).xdir
            var y = playerDisc.y + (playerDisc.radius + turtleRadius + 2) * direction(playerDisc.xspeed, playerDisc.yspeed).ydir
            var xspeed = speed * direction(playerDisc.xspeed, playerDisc.yspeed).xdir
            var yspeed = speed * direction(playerDisc.xspeed, playerDisc.yspeed).ydir

            if (activeTurtle[i] == undefined) continue
            room.setDiscProperties(activeTurtle[i].turtle, { x: x + safeDistance * direction(playerDisc.xspeed, playerDisc.yspeed).xdir, y: y + safeDistance * direction(playerDisc.xspeed, playerDisc.yspeed).ydir, xspeed: xspeed, yspeed: yspeed, radius: turtleRadius, damping: turtleDamping })
            //			var size = activePower.filter(a => a.power == "turtle" && a.id == activeTurtle[i].turtle).length
            //			for(var j = 0; j < size; j++) {
            //				activePower[activePower.findIndex(a => a.power == "turtle" && a.id == activeTurtle[i].turtle)].id = null
            //			}
            //			activePower.push({power: "turtle", id: activeTurtle[i].turtle})
            //			setTimeout(resetPower, 2500)			
        }
    }
    for (var i = 0; i < activeBanana.length; i++) {
        var bananaDisc = room.getDiscProperties(activeBanana[i].banana)
        if (distance(playerDisc.x, playerDisc.y, bananaDisc.x, bananaDisc.y) <= playerDisc.radius + bananaDisc.radius) {

            var message = " pisou na banana 🍌"
            room.sendAnnouncement("Você" + message, player.id, cyancolor, "bold")
            var others = players.filter(a => a.id != player.id)
            for (var j = 0; j < others.length; j++) {
                room.sendAnnouncement(player.name + message, others[j].id, cyancolor)
            }

            lock(player)
            setTimeout(resetLock, 500)
            if (activeBanana[i] == undefined) continue;

            room.setDiscProperties(activeBanana[i].banana, { x: storage.x, y: storage.y, xspeed: 0, yspeed: 0, radius: 0.001 })
            activeBanana = activeBanana.filter(a => a.banana != activeBanana[i].banana)
        }
    }
}



//Locks player in place
function lock(player) {
    players[players.findIndex(a => a.id == player.id)].locked = true
    var playerDisc = room.getPlayerDiscProperties(player.id)
    var player = players.filter(a => a.id == player.id)[0]
    room.setPlayerDiscProperties(player.id, { x: playerDisc.x, y: playerDisc.y, xspeed: playerDisc.xspeed, yspeed: playerDisc.yspeed, cGroup: cf.c2 })
    room.setDiscProperties(player.lock, { x: playerDisc.x, y: playerDisc.y - playerDisc.radius, xspeed: playerDisc.xspeed, yspeed: playerDisc.yspeed, invMass: 1e-300, radius: 0.001, damping: playerDisc.damping })
    room.setDiscProperties(player.lock + 1, { x: playerDisc.x + (playerDisc.radius * Math.cos(30 / 57.3)), y: playerDisc.y + (playerDisc.radius * Math.sin(30 / 57.3)), xspeed: playerDisc.xspeed, yspeed: playerDisc.yspeed, invMass: 1e-300, radius: 0.001, damping: playerDisc.damping })
    room.setDiscProperties(player.lock + 2, { x: playerDisc.x - (playerDisc.radius * Math.cos(30 / 57.3)), y: playerDisc.y + (playerDisc.radius * Math.sin(30 / 57.3)), xspeed: playerDisc.xspeed, yspeed: playerDisc.yspeed, invMass: 1e-300, radius: 0.001, damping: playerDisc.damping })
    lockedPlayer.push({ id: player.id, lock: player.lock, x: playerDisc.x, y: playerDisc.y })
}



//Reset locked player after time
function resetLock() {
    if (lockedPlayer.length > 0) {
        var playerDisc = room.getPlayerDiscProperties(lockedPlayer[0].id)
        var player = players.filter(a => a.id == lockedPlayer[0].id)[0]
        if (player == undefined) return;
        room.setPlayerDiscProperties(lockedPlayer[0].id, { cGroup: cf.red })
        players[players.findIndex(a => a.id == player.id)].locked = false
        room.setDiscProperties(lockedPlayer[0].lock, { x: storage.x, y: storage.y, xspeed: 0, yspeed: 0 })
        room.setDiscProperties(lockedPlayer[0].lock + 1, { x: storage.x, y: storage.y, xspeed: 0, yspeed: 0 })
        room.setDiscProperties(lockedPlayer[0].lock + 2, { x: storage.x, y: storage.y, xspeed: 0, yspeed: 0 })
        lockedPlayer = lockedPlayer.splice(1)
    }
}


//Reset power after time
function resetPower() {
    if (activePower.length > 0) {
        if (activePower[0].id != null) {
            switch (activePower[0].power) {

                case "heavy":
                    var multiplier1 = 1 / 1.5;
                    var multiplier2 = 10;
                    var playerDisc = room.getPlayerDiscProperties(activePower[0].id)
                    var player = players.filter(a => a.id == activePower[0].id)[0]
                    if (playerDisc == null) break
                    if (player.locked == true) {
                        room.setPlayerDiscProperties(activePower[0].id, { radius: multiplier1 * playerDisc.radius, invMass: multiplier2 * playerDisc.invMass })
                        room.setDiscProperties(player.lock, { x: playerDisc.x, y: playerDisc.y - multiplier1 * playerDisc.radius, xspeed: playerDisc.xspeed, yspeed: playerDisc.yspeed, invMass: 0, radius: 0.001, damping: playerDisc.damping })
                        room.setDiscProperties(player.lock + 1, { x: playerDisc.x + (multiplier1 * playerDisc.radius * Math.cos(30 / 57.3)), y: playerDisc.y + (multiplier1 * playerDisc.radius * Math.sin(30 / 57.3)), xspeed: playerDisc.xspeed, yspeed: playerDisc.yspeed, invMass: 0, radius: 0.001, damping: playerDisc.damping })
                        room.setDiscProperties(player.lock + 2, { x: playerDisc.x - (multiplier1 * playerDisc.radius * Math.cos(30 / 57.3)), y: playerDisc.y + (multiplier1 * playerDisc.radius * Math.sin(30 / 57.3)), xspeed: playerDisc.xspeed, yspeed: playerDisc.yspeed, invMass: 0, radius: 0.001, damping: playerDisc.damping })
                    } else {
                        room.setPlayerDiscProperties(activePower[0].id, { radius: multiplier1 * playerDisc.radius, invMass: multiplier2 * playerDisc.invMass })
                    }
                    break;

                case "small":
                    var multiplier = 1.5;
                    var playerDisc = room.getPlayerDiscProperties(activePower[0].id)
                    var player = players.filter(a => a.id == activePower[0].id)[0]
                    if (playerDisc == null) break;
                    if (player.locked == true) {
                        room.setDiscProperties(player.lock, { x: playerDisc.x, y: playerDisc.y - multiplier * playerDisc.radius, xspeed: playerDisc.xspeed, yspeed: playerDisc.yspeed, invMass: 0, radius: 0.001, damping: playerDisc.damping })
                        room.setDiscProperties(player.lock + 1, { x: playerDisc.x + (multiplier * playerDisc.radius * Math.cos(30 / 57.3)), y: playerDisc.y + (multiplier * playerDisc.radius * Math.sin(30 / 57.3)), xspeed: playerDisc.xspeed, yspeed: playerDisc.yspeed, invMass: 0, radius: 0.001, damping: playerDisc.damping })
                        room.setDiscProperties(player.lock + 2, { x: playerDisc.x - (multiplier * playerDisc.radius * Math.cos(30 / 57.3)), y: playerDisc.y + (multiplier * playerDisc.radius * Math.sin(30 / 57.3)), xspeed: playerDisc.xspeed, yspeed: playerDisc.yspeed, invMass: 0, radius: 0.001, damping: playerDisc.damping })
                    }
                    room.setPlayerDiscProperties(activePower[0].id, { radius: multiplier * playerDisc.radius })
                    break;

                case "turtle":
                    room.setDiscProperties(activePower[0].id, { x: storage.x, y: storage.y, xspeed: 0, yspeed: 0, radius: 0.001 })
                    activeTurtle = activeTurtle.filter(a => a.turtle != activePower[0].id)
                    break;

                default:
                    break;
            }
        }
        activePower = activePower.splice(1)
    }
}


//Reset disc after time
function resetDisc() {
    if (inactiveDisc.length > 0) {
        room.setDiscProperties(inactiveDisc[0].id, { color: 0x303030 })
        inactiveDisc = inactiveDisc.splice(1)
    }
}


//Check if gives powerup to player
function checkPower(player) {
    var playerDisc = room.getPlayerDiscProperties(player.id)
    var player = players.filter(a => a.id == player.id)[0]
    for (var j = 0; j < 3; j++) {
        if (distance(playerDisc.x, playerDisc.y, room.getDiscProperties(2 + 3 * j).x, room.getDiscProperties(2 + 3 * j).y) < 60 + playerDisc.radius) {

            //Get player node			
            if (j == player.lastPowerNode) {
                break;
            }
            if (j != player.nextNode && j != player.lastNode && race) {
                players[players.findIndex(a => a.id == player.id)].troll = true
                safeLap = player.lap
                room.sendAnnouncement("Todos os jogadores na volta " + player.lap + " estão seguros da eliminação", null, yellowcolor)
                room.setPlayerTeam(player.id, 0)
                break;
            }
            players[players.findIndex(a => a.id == player.id)].lastNode = j
            players[players.findIndex(a => a.id == player.id)].nextNode = j + 1
            if (j == 2) {
                players[players.findIndex(a => a.id == player.id)].nextNode = 0
            }

            // Give power if allowed			
            if (player.power != "none") {
                break
            }
            for (var k = 0; k < 3; k++) {
                if (room.getDiscProperties(3 * j + k + 1).color != -1) {
                    if (distance(playerDisc.x, playerDisc.y, room.getDiscProperties(3 * j + k + 1).x, room.getDiscProperties(3 * j + k + 1).y) <= room.getDiscProperties(3 * j + k + 1).radius + playerDisc.radius + 2) {
                        givePower(player)
                        room.setDiscProperties(3 * j + k + 1, { color: -1 })
                        players[players.findIndex(a => a.id == player.id)].lastPowerNode = j
                        inactiveDisc.push({ id: 3 * j + k + 1 })
                        setTimeout(resetDisc, 750)
                        break;
                    }
                }
            }
            break;
        }
    }
}


//Change player powerup
function changePower(player) {
    var player = players.filter(a => a.id == player.id)[0]
    if (player.locked == true) return
    var playerDisc = room.getPlayerDiscProperties(player.id)
    if (player.power == "none") {
        return false
    }
    for (var j = 0; j < 3; j++) {
        if (distance(playerDisc.x, playerDisc.y, room.getDiscProperties(2 + 3 * j).x, room.getDiscProperties(2 + 3 * j).y) < 60 + playerDisc.radius) {
            if (j == player.lastPowerNode) {
                break;
            }
            for (var k = 0; k < 3; k++) {
                if (room.getDiscProperties(3 * j + k + 1).color != -1) {
                    if (distance(playerDisc.x, playerDisc.y, room.getDiscProperties(3 * j + k + 1).x, room.getDiscProperties(3 * j + k + 1).y) <= room.getDiscProperties(3 * j + k + 1).radius + playerDisc.radius + 2) {
                        room.sendAnnouncement("Você trocou o seu poder", player.id, cyancolor, "bold")
                        givePower(player)
                        room.setDiscProperties(3 * j + k + 1, { color: -1 })
                        players[players.findIndex(a => a.id == player.id)].lastPowerNode = j
                        inactiveDisc.push({ id: 3 * j + k + 1 })
                        setTimeout(resetDisc, 750)
                        return true
                        break;
                    }
                }
            }
            break;
        }
    }
    return false;
}


//Give powerup to player
function givePower(player) {
    var player = players.filter(a => a.id == player.id)[0]
    var powersaux = powers.filter(a => a != player.power)
    var random = Math.floor(Math.random() * powersaux.length)
    var power = powersaux[random]
    players[players.findIndex(a => a.id == player.id)].power = power
    switch (power) {
        case "speed":
            room.setPlayerAvatar(player.id, "💨");
            room.sendAnnouncement("Você pegou o boost de velocidade 💨. Pressione X para usar", player.id, cyancolor, "bold")
            break;

        case "heavy":
            room.setPlayerAvatar(player.id, "🍄");
            room.sendAnnouncement("Você pegou o cogumelo gigante 🍄. Pressione X para usar", player.id, cyancolor, "bold")
            break;

        case "slowAll":
            room.setPlayerAvatar(player.id, "🐌");
            room.sendAnnouncement("Você pegou a lesma retardante 🐌. Pressione X para usar", player.id, cyancolor, "bold")
            break;

        case "small":
            room.setPlayerAvatar(player.id, "🤏");
            room.sendAnnouncement("Você pegou o encolhedor de tamanho 🤏. Pressione X para usar", player.id, cyancolor, "bold")
            break;

        case "turtleGreen":
            room.setPlayerAvatar(player.id, "🟢");
            room.sendAnnouncement("Você pegou o casco verde 🟢. Pressione X para usar", player.id, cyancolor, "bold")
            break;

        case "turtleBlue":
            room.setPlayerAvatar(player.id, "🔵");
            room.sendAnnouncement("Você pegou o casco azul 🔵. Pressione X para usar", player.id, cyancolor, "bold")
            break;

        case "banana":
            room.setPlayerAvatar(player.id, "🍌");
            room.sendAnnouncement("Você pegou a banana 🍌. Pressione X para usar", player.id, cyancolor, "bold")
            break;

        default:
            break;
    }
}


//Uses powerup
function usePower(player) {
    var player = players.filter(a => a.id == player.id)[0]
    if (player.power != "none") { players[players.findIndex(a => a.id == player.id)].kickAbuse = 0; }
    var playerDisc = room.getPlayerDiscProperties(player.id)
    switch (player.power) {
        case "speed":
            var sum = 5;
            if (direction(playerDisc.xspeed, playerDisc.yspeed).speed == 0) {
                room.sendAnnouncement("Você precisa estar em movimento para utilizar este poder", player.id, yellowcolor)
                return;
            }

            var message = " usou o boost de velocidade 💨"
            room.sendAnnouncement("Você" + message, player.id, cyancolor, "bold")
            var others = players.filter(a => a.id != player.id)
            for (var i = 0; i < others.length; i++) {
                room.sendAnnouncement(player.name + message, others[i].id, cyancolor)
            }

            room.setPlayerDiscProperties(player.id, { xspeed: playerDisc.xspeed + sum * direction(playerDisc.xspeed, playerDisc.yspeed).xdir, yspeed: playerDisc.yspeed + sum * direction(playerDisc.xspeed, playerDisc.yspeed).ydir })
            break;

        case "heavy":
            var multiplier1 = 1.5;
            var multiplier2 = 1 / 10;

            var message = " ficou gigante 🍄"
            room.sendAnnouncement("Você" + message, player.id, cyancolor, "bold")
            var others = players.filter(a => a.id != player.id)
            for (var i = 0; i < others.length; i++) {
                room.sendAnnouncement(player.name + message, others[i].id, cyancolor)
            }

            if (player.locked == true) {
                room.setPlayerDiscProperties(player.id, { cGroup: cf.red })
                players[players.findIndex(a => a.id == player.id)].locked = false
                room.setDiscProperties(player.lock, { x: storage.x, y: storage.y, xspeed: 0, yspeed: 0 })
                room.setDiscProperties(player.lock + 1, { x: storage.x, y: storage.y, xspeed: 0, yspeed: 0 })
                room.setDiscProperties(player.lock + 2, { x: storage.x, y: storage.y, xspeed: 0, yspeed: 0 })
            }

            room.setPlayerDiscProperties(player.id, { radius: multiplier1 * playerDisc.radius, invMass: multiplier2 * playerDisc.invMass })
            activePower.push({ power: player.power, id: player.id })
            setTimeout(resetPower, 2500)
            break;

        case "slowAll":
            var redPlayers = players.filter(a => a.team == 1 && a.id != player.id && a.shield == false)
            for (var i = 0; i < redPlayers.length; i++) {
                var sum = -3.5;
                var playerDisc = room.getPlayerDiscProperties(redPlayers[i].id)
                if (direction(playerDisc.xspeed, playerDisc.yspeed).speed < -sum / 1.05) {
                    sum = -direction(playerDisc.xspeed, playerDisc.yspeed).speed * 1.05
                }
                room.setPlayerDiscProperties(redPlayers[i].id, { xspeed: playerDisc.xspeed + sum * direction(playerDisc.xspeed, playerDisc.yspeed).xdir, yspeed: playerDisc.yspeed + sum * direction(playerDisc.xspeed, playerDisc.yspeed).ydir })
            }

            var message = " retardou seus adversários 🐌"
            room.sendAnnouncement("Você" + message, player.id, cyancolor, "bold")
            var others = players.filter(a => a.id != player.id)
            for (var i = 0; i < others.length; i++) {
                room.sendAnnouncement(player.name + message, others[i].id, cyancolor)
            }

            break;

        case "small":
            var multiplier = 1 / 1.5;
            var playerDisc = room.getPlayerDiscProperties(player.id)

            var message = " ficou minúsculo 🤏"
            room.sendAnnouncement("Você" + message, player.id, cyancolor, "bold")
            var others = players.filter(a => a.id != player.id)
            for (var i = 0; i < others.length; i++) {
                room.sendAnnouncement(player.name + message, others[i].id, cyancolor)
            }

            if (player.locked == true) {
                room.setPlayerDiscProperties(player.id, { cGroup: cf.red })
                players[players.findIndex(a => a.id == player.id)].locked = false
                room.setDiscProperties(player.lock, { x: storage.x, y: storage.y, xspeed: 0, yspeed: 0 })
                room.setDiscProperties(player.lock + 1, { x: storage.x, y: storage.y, xspeed: 0, yspeed: 0 })
                room.setDiscProperties(player.lock + 2, { x: storage.x, y: storage.y, xspeed: 0, yspeed: 0 })
            }

            room.setPlayerDiscProperties(player.id, { radius: multiplier * playerDisc.radius })
            activePower.push({ power: player.power, id: player.id })
            setTimeout(resetPower, 2500)
            break;

        case "turtleGreen":
            if (direction(playerDisc.xspeed, playerDisc.yspeed).speed == 0) {
                room.sendAnnouncement("Você precisa estar em movimento para utilizar este poder", player.id, yellowcolor)
                return;
            }
            var speed = 9;
            var turtleRadius = 10;
            var turtlebCoeff = 1;
            var turtleDamping = 1;
            var safeDistance = 2;
            var turtleColor = greencolor;
            var x = playerDisc.x
            var y = playerDisc.y
            var xspeed = speed * direction(playerDisc.xspeed, playerDisc.yspeed).xdir
            var yspeed = speed * direction(playerDisc.xspeed, playerDisc.yspeed).ydir
            room.setDiscProperties(player.turtle, { x: x + safeDistance * direction(playerDisc.xspeed, playerDisc.yspeed).xdir, y: y + safeDistance * direction(playerDisc.xspeed, playerDisc.yspeed).ydir, xspeed: xspeed, yspeed: yspeed, radius: turtleRadius, bCoeff: turtlebCoeff, damping: turtleDamping, color: turtleColor })

            var message = " lançou um casco verde 🟢"
            room.sendAnnouncement("Você" + message, player.id, cyancolor, "bold")
            var others = players.filter(a => a.id != player.id)
            for (var i = 0; i < others.length; i++) {
                room.sendAnnouncement(player.name + message, others[i].id, cyancolor)
            }

            activeTurtle = activeTurtle.filter(a => a.turtle != player.turtle)
            activeTurtle.push({ turtle: player.turtle, id: player.id })
            var size = activePower.filter(a => a.id == player.turtle && a.power == "turtle").length
            for (var j = 0; j < size; j++) {
                activePower[activePower.findIndex(a => a.id == player.turtle && a.power == "turtle")].id = null
            }
            activePower.push({ power: "turtle", id: player.turtle })
            setTimeout(resetPower, 2500)
            break;

        case "turtleBlue":
            if (direction(playerDisc.xspeed, playerDisc.yspeed).speed == 0) {
                room.sendAnnouncement("Você precisa estar em movimento para utilizar este poder", player.id, yellowcolor)
                return;
            }
            var speed = -2;
            var turtleRadius = 10;
            var turtlebCoeff = 1;
            var turtleDamping = 1;
            var turtleColor = bluecolor;
            var x = playerDisc.x
            var y = playerDisc.y
            var xspeed = speed * direction(playerDisc.xspeed, playerDisc.yspeed).xdir
            var yspeed = speed * direction(playerDisc.xspeed, playerDisc.yspeed).ydir
            room.setDiscProperties(player.turtle, { x: x, y: y, xspeed: xspeed, yspeed: yspeed, radius: turtleRadius, bCoeff: turtlebCoeff, damping: turtleDamping, color: turtleColor })

            var message = " lançou um casco azul 🔵"
            room.sendAnnouncement("Você" + message, player.id, cyancolor, "bold")
            var others = players.filter(a => a.id != player.id)
            for (var i = 0; i < others.length; i++) {
                room.sendAnnouncement(player.name + message, others[i].id, cyancolor)
            }

            activeTurtle = activeTurtle.filter(a => a.turtle != player.turtle)
            activeTurtle.push({ turtle: player.turtle, id: player.id })
            var size = activePower.filter(a => a.id == player.turtle && a.power == "turtle").length
            for (var j = 0; j < size; j++) {
                activePower[activePower.findIndex(a => a.id == player.turtle && a.power == "turtle")].id = null
            }
            activePower.push({ power: "turtle", id: player.turtle })
            setTimeout(resetPower, 2500)
            break;

        case "banana":
            if (direction(playerDisc.xspeed, playerDisc.yspeed).speed == 0) {
                room.sendAnnouncement("Você precisa estar em movimento para utilizar este poder", player.id, yellowcolor)
                return;
            }
            var bananaRadius = 5;
            var bananaDamping = 0.96;
            var bananaColor = yellowcolor;
            var x = playerDisc.x - 1.5 * (playerDisc.radius + bananaRadius) * direction(playerDisc.xspeed, playerDisc.yspeed).xdir
            var y = playerDisc.y - 1.5 * (playerDisc.radius + bananaRadius) * direction(playerDisc.xspeed, playerDisc.yspeed).ydir
            room.setDiscProperties(player.banana, { x: x, y: y, xspeed: playerDisc.xspeed, yspeed: playerDisc.yspeed, radius: bananaRadius, damping: bananaDamping, color: bananaColor })

            var message = " deixou uma banana pela pista 🍌"
            room.sendAnnouncement("Você" + message, player.id, cyancolor, "bold")
            var others = players.filter(a => a.id != player.id)
            for (var i = 0; i < others.length; i++) {
                room.sendAnnouncement(player.name + message, others[i].id, cyancolor)
            }

            activeBanana = activeBanana.filter(a => a.banana != player.banana)
            activeBanana.push({ banana: player.banana, id: player.id })
            break;

        default:
            players[players.findIndex(a => a.id == player.id)].kickAbuse += 1;
            //			player = players.filter(a => a.id == player.id)[0]
            if (players[players.findIndex(a => a.id == player.id)].kickAbuse >= 4) {
                if (players.filter(a => a.lap < player.lap && a.team == 1).length == 0 && players.filter(a => a.team == 1).length > 2 && gameStarted && race) {
                    safeLap = player.lap
                    room.sendAnnouncement("Todos os jogadores na volta " + player.lap + " estão seguros da eliminação", null, yellowcolor)
                }
                room.setPlayerTeam(player.id, 0);
                room.sendAnnouncement(player.name + " foi removido da partida por chutar a bola para fazer barulho", null, yellowcolor);
                if (!race) {
                    room.sendAnnouncement("Você terá que esperar o início da partida no Spectators", player.id, yellowcolor);
                }
                break;
            }
            room.sendAnnouncement("⚠️ Você não possui poderes no momento. Evite chutar a bola ou você será removido. Aviso nº " + player.kickAbuse + " ⚠️", player.id, redcolor, "bold", 2);
            break;
    }
    players[players.findIndex(a => a.id == player.id)].power = "none"
    var avatar = player.car.toString()
    if (player.shield == true) {
        avatar = "🔰️"
    }
    room.setPlayerAvatar(player.id, avatar);
}


//_________________________________________________________________________________________________________________________________________________


room.onPlayerJoin = function (player) {
    joined(player)
    setRace(player, false);
    //	updateAdmins()
    room.sendAnnouncement("", player.id, bluecolor, "bold", 0)
    room.sendAnnouncement("", player.id, bluecolor, "bold", 0)
    room.sendAnnouncement("Seja bem-vindo ao Mario Kart HaxID, " + player.name, player.id, bluecolor, "bold", 0)
    room.sendAnnouncement("Para acessar o menu de comandos digite !menu", player.id, bluecolor)
    if (race) {
        room.sendAnnouncement("Uma corrida está em andamento. Você jogará após a finalização da corrida", player.id, yellowcolor)
    }
    room.sendAnnouncement("", player.id, bluecolor, "bold", 0)
    setGrid()
}


room.onPlayerLeave = function (player) {
    var player = players.filter(a => a.id == player.id)[0]
    player.statsPodiumRate = 0
    if (player.statsRaces != 0) {
        player.statsPodiumRate = player.statsPodiums / player.statsRaces
    }
    uploadToDatabase(player)
    if (player.team == 1) {
        room.sendAnnouncement(player.name + " abandonou a corrida", null, yellowcolor)
        if (players.filter(a => a.lap < player.lap && a.team == 1).length == 0 && players.filter(a => a.team == player.team).length > 2 && gameStarted && race) {
            safeLap = player.lap
            room.sendAnnouncement("Todos os jogadores na volta " + player.lap + " estão seguros da eliminação", null, yellowcolor)
        }
    }
    if (player.car != null) {
        cars.push(player.car)
        cars.sort()
    }
    players = players.filter(a => a.id != player.id)
    setGrid()
    //	updateAdmins()

}



room.onPlayerTeamChange = function (changedPlayer, byPlayer) {
    players[players.findIndex(a => a.id == changedPlayer.id)].team = changedPlayer.team
    if (players[players.findIndex(a => a.id == changedPlayer.id)].afk && changedPlayer.team != 0) {
        room.setPlayerTeam(changedPlayer.id, 0)
        room.sendAnnouncement(changedPlayer.name + " está AFK", null, graycolor, "bold")
    }
    if (changedPlayer.team == 2) {
        room.setPlayerTeam(changedPlayer.id, 0)
        room.sendAnnouncement("Não é permitido jogadores no time Blue", null, greencolor, "bold")
        return
    }
    if (gameStarted && changedPlayer.team != 0 && race) {
        room.setPlayerTeam(changedPlayer.id, 0)
        room.sendAnnouncement("Não é permitido entrar numa partida em andamento", null, greencolor, "bold")
        return
    }
    var redPlayers = players.filter(a => a.team == 1)
    if (redPlayers.length > 8) {
        room.setPlayerTeam(changedPlayer.id, 0)
        room.sendAnnouncement("O limite máximo de corredores é 8", null, greencolor, "bold")
        return
    }
    if (players[players.findIndex(a => a.id == changedPlayer.id)].troll == true) {
        room.sendAnnouncement(changedPlayer.name + " foi removido por tentativa de trollar", null, yellowcolor)
    }
    setRace(changedPlayer, changedPlayer.team);
    var changedPlayer = players.filter(a => a.id == changedPlayer.id)[0]
    if (byPlayer != null) {
        var byPlayer = players.filter(a => a.id == byPlayer.id)[0]
    }
}


room.onPlayerBallKick = function (player) {
    if (bot) {
        if (!changePower(player)) {
            usePower(player)
        }
    }
}


room.onPlayerAdminChange = function (changedPlayer, byPlayer) {
    players[players.findIndex(a => a.id == changedPlayer.id)].admin = changedPlayer.admin
}


room.onGamePause = function (byPlayer) {
    gamePaused = true
}


room.onGameUnpause = function (byPlayer) {
    gamePaused = false
}


room.onGameStart = function (byPlayer) {
    storage = { x: room.getDiscProperties(10).x, y: room.getDiscProperties(10).y }
    safeLap = 0
    activePower = []
    inactiveDisc = []
    activeBanana = []
    activeTurtle = []
    lockedPlayer = []
    pauseId = []
    safePlayer = null
    cars = [1, 2, 3, 4, 5, 6, 7, 8]
    gameStarted = true;
    gamePaused = false
    allowMapChange = false
    var redPlayers = players.filter(a => a.team == 1)
    for (var i = 0; i < redPlayers.length; i++) {
        setRace(redPlayers[i], 1)
        var avatar = redPlayers[i].car.toString()
        if (redPlayers[i].shield == true) {
            avatar = "🔰"
        }
        room.setPlayerAvatar(redPlayers[i].id, avatar);
    }
    if (race) {
        for (var i = 0; i < redPlayers.length; i++) {
            room.setPlayerDiscProperties(redPlayers[i].id, { cGroup: cf.red | cf.c0 })
            players[players.findIndex(a => a.id == redPlayers[i].id)].statsRaces += 1
        }
        startCountdown = setTimeout(startRace, 5000)
        if (redPlayers.length > 1) {
            room.sendAnnouncement("", null, greencolor, "bold", 0)
            room.sendAnnouncement("", null, greencolor, "bold", 0)
            room.sendAnnouncement("", null, greencolor, "bold", 0)
            room.sendAnnouncement("", null, greencolor, "bold", 0)
            if (use1st != null) {
                var others = players.filter(a => a.id != use1st.id)
                for (var i = 0; i < others.length; i++) {
                    room.sendAnnouncement(use1st.name + " comprou: 1st Lugar", others[i].id, yellowcolor, "bold", 0)
                }
                room.sendAnnouncement("Você comprou: 1st Lugar - " + price1st + " $", use1st.id, yellowcolor, "bold", 0)
                room.sendAnnouncement("Saldo restante: " + use1st.money + " $", use1st.id, yellowcolor, "bold", 0)
                use1st = null
            }
            room.sendAnnouncement("Circuito: " + maps[mapNumber].name, null, greencolor, "bold", 0)
            room.sendAnnouncement("PREPAREM-SE, a corrida irá começar em 5 segundos", null, greencolor, "bold", 2)
        }
    }
}


room.onGameStop = function (byPlayer) {
    gameStarted = false;
    gamePaused = true
    clearTimeout(startCountdown)
    if (dontCallAgain) {
        dontCallAgain = false
        return
    }
    for (var i = 0; i < players.length; i++) {
        players[players.findIndex(a => a.id == players[i].id)].kickAbuse = 0
    }
    if (race) {
        var redPlayers = players.filter(a => a.team == 1)
        if (redPlayers.length == 1) {
            room.sendAnnouncement("🏁 " + redPlayers[0].name + " é o VENCEDOR 🏁", null, purplecolor, "bold")
            players[players.findIndex(a => a.id == redPlayers[0].id)].stats1st += 1
            players[players.findIndex(a => a.id == redPlayers[0].id)].statsPodiums += 1
            allowMapChange = true
        }
        if (redPlayers.length == 0) {
            room.sendAnnouncement("Não houve vencedor", null, redcolor)
            allowMapChange = true
        }
    }
    race = false
    if (byPlayer == null) {
        room.setPlayerTeam(safePlayer, 1)
        if (safePlayer != null) {
            players[players.findIndex(a => a.id == safePlayer)].team = 1
        }
        setGrid()
        dontCallAgain = false
    } else {
        room.sendAnnouncement(byPlayer.name + " encerrou a corrida. Não há vencedores", null, redcolor, "bold", 2)
        room.sendAnnouncement("Modo RACE desativado. Será necessário ativamento manual", null, greencolor, "bold", 0)
    }
    if (allowMapChange) {
        setTimeout(changeMap, 3000)
    }
    room.setScoreLimit(0);
    room.setTimeLimit(0);
    room.setTeamsLock(true);
}


room.onStadiumChange = function (newStadiumName, byPlayer) {
    if (byPlayer != null) {
        room.setCustomStadium(maps[mapNumber].map);
        room.sendAnnouncement("O mapa não pode ser alterado", null, greencolor, "bold", 2)
    }
}


room.onGameTick = function () {
    if (bot) {
        var redPlayers = players.filter(a => a.team == 1)
        for (var i = 0; i < redPlayers.length; i++) {
            collision(redPlayers[i])
            checkPower(redPlayers[i])
            if (race) {
                lapRace(redPlayers[i])
            }
        }
        if (race) {
            if (redPlayers.length <= 1) {
                room.stopGame();
                return;
            }
        }
    }
}


room.onPlayerChat = function (player, message) {
    var player = players.filter(a => a.id == player.id)[0]
    switch (message) {
        case "!1":
            if (player.money >= price1st) {
                if (race && gameStarted) {
                    if (player.team == 1) {
                        if (players.filter(a => a.lap > 0).length > 0) {
                            room.sendAnnouncement("ERRO. O tempo para compra do item expirou. Você deve comprar antes da largada acontecer", player.id, yellowcolor)
                        } else {
                            var onPlayers = players.filter(a => a.afk == false)
                            if (onPlayers.length >= minStartPlayers) {
                                room.reorderPlayers(player.id, true)
                                room.stopGame()
                                room.startGame()
                                player.money = player.money - price1st
                                players[players.findIndex(a => a.id == player.id)].money = player.money
                                use1st = player
                            } else {
                                room.sendAnnouncement("ERRO. Não foi possivel comprar o item. Quantidade de jogadores insuficiente", player.id, yellowcolor)
                            }
                        }
                    } else {
                        room.sendAnnouncement("ERRO. Você deve estar no time Red para a compra deste item", player.id, yellowcolor)
                    }
                } else {
                    room.sendAnnouncement("A corrida ainda não começou. Espere o grid e compre o item antes da largada acontecer", player.id, greencolor)
                }
            } else {
                room.sendAnnouncement("Saldo insuficiente", player.id, yellowcolor)
            }
            return false;
            break;

        case "!escudo":
            if (player.money >= priceShield) {
                if (players[players.findIndex(a => a.id == player.id)].shield == false) {
                    players[players.findIndex(a => a.id == player.id)].shield = true
                    room.sendAnnouncement("Você comprou: Escudo - " + priceShield + " $", player.id, greencolor, "bold")
                    player.money = player.money - priceShield
                    room.sendAnnouncement("Saldo restante: " + player.money + " $", player.id, greencolor, "bold")
                    players[players.findIndex(a => a.id == player.id)].money = player.money
                    room.setPlayerAvatar(player.id, "🔰")

                    var others = players.filter(a => a.id != player.id)
                    for (var j = 0; j < others.length; j++) {
                        room.sendAnnouncement(player.name + " comprou: Escudo", others[j].id, greencolor)
                    }

                } else {
                    room.sendAnnouncement("Você já possui o item", player.id, greencolor)
                }
            } else {
                room.sendAnnouncement("Saldo insuficiente", player.id, yellowcolor)
            }
            return false;
            break;

        case "!fila":
            if (player.money >= priceFila) {
                if (player.team == 0) {
                    room.reorderPlayers(player.id, true)
                    room.sendAnnouncement("Você comprou: Furar fila - " + priceFila + " $", player.id, greencolor, "bold")
                    player.money = player.money - priceFila
                    room.sendAnnouncement("Saldo restante: " + player.money + " $", player.id, greencolor, "bold")
                    players[players.findIndex(a => a.id == player.id)].money = player.money

                    var others = players.filter(a => a.id != player.id)
                    for (var j = 0; j < others.length; j++) {
                        room.sendAnnouncement(player.name + " comprou: Furar fila", others[j].id, greencolor)
                    }
                } else {
                    room.sendAnnouncement("ERRO. Você deve estar no time Spectators para a compra deste item", player.id, yellowcolor)
                }
            } else {
                room.sendAnnouncement("Saldo insuficiente", player.id, yellowcolor)
            }
            return false;
            break;

        case "!bot":
            if (player.admin) {
                race = false
                bot = !bot
                if (bot) {
                    var status = "Ativado"
                    room.stopGame()
                } else {
                    var status = "Desativado"
                    room.stopGame()

                }
                room.sendAnnouncement("O BOT foi " + status + " por " + player.name, null, greencolor, "bold", 2)
            } else {
                room.sendAnnouncement("Você não é admin", player.id, greencolor)
            }
            return false;
            break;

        case "!race":
            if (player.admin) {
                if (!bot) {
                    room.sendAnnouncement("O BOT está desativado. Ative-o primeiro", player.id, greencolor, "bold", 2)
                    return false
                }
                if (players.filter(a => a.afk == false).length >= minStartPlayers) {

                    race = !race
                    if (race) {
                        var status = "Ativada"
                        room.stopGame()
                    } else {
                        var status = "Desativada"
                    }
                    room.sendAnnouncement("O modo RACE foi " + status + " por " + player.name, null, greencolor, "bold", 2)
                } else {
                    room.sendAnnouncement("O modo RACE não pode ser ativado. Quantidade mínima de jogadores não atingida", player.id, greencolor, "bold")
                    return false
                }
            } else {
                room.sendAnnouncement("Você não é admin", player.id, greencolor)
            }
            return false;
            break;

        case "!status":
            if (bot) {
                var statusBot = "Ativado"
                if (race) {
                    var statusRace = "Ativada"
                } else {
                    var statusRace = "Desativada"
                }
            } else {
                var statusBot = "Desativado"
                var statusRace = "Desativada"
            }
            room.sendAnnouncement("BOT: " + statusBot, player.id, greencolor, "bold")
            room.sendAnnouncement("RACE: " + statusRace, player.id, greencolor, "bold")
            return false;
            break;

        case "!help":
            message = "!menu"

        case "!menu":
            room.sendAnnouncement("", player.id, bluecolor, "bold", 0)
            room.sendAnnouncement("_________ MENU _________", player.id, bluecolor, "bold", 0)
            room.sendAnnouncement("!comandos", player.id, bluecolor)
            room.sendAnnouncement("!loja", player.id, bluecolor, "normal", 0)
            room.sendAnnouncement("!stats", player.id, bluecolor, "normal", 0)
            room.sendAnnouncement("", player.id, bluecolor, "normal", 0)
            return false;
            break;

        case "!comandos":
            room.sendAnnouncement("", player.id, bluecolor, "bold", 0)
            room.sendAnnouncement("_______ COMANDOS _______", player.id, bluecolor, "bold", 0)
            room.sendAnnouncement("p, !afk, !afks, !bb, !discord", player.id, bluecolor)
            room.sendAnnouncement("", player.id, bluecolor, "bold", 0)
            return false;
            break;

        case "p":
            if (player.team == 1) {
                if (race) {
                    if (!pauseId.includes(player.id)) {
                        if (!gamePaused) {
                            room.pauseGame(true)
                            room.sendAnnouncement(player.name + " solicitou um pause. Em 10 segundos o pause será removido", null, greencolor, "bold", 2)
                            setTimeout(resetPause, 10000)
                            pauseId.push(player.id)
                        } else {
                            room.sendAnnouncement("A corrida já está pausada", player.id, greencolor)
                        }
                    } else {
                        room.sendAnnouncement("Você ja solicitou o pause", player.id, greencolor)
                    }
                } else {
                    room.sendAnnouncement("A corrida não começou ainda", player.id, greencolor)
                }
            } else {
                room.sendAnnouncement("Você precisa estar no time Red para solicitar um pause", player.id, greencolor)
            }
            return true
            break;

        case "!afk":
            var afk = players[players.findIndex(a => a.id == player.id)].afk
            players[players.findIndex(a => a.id == player.id)].afk = !afk
            if (!afk) {
                var message = player.name + " ficou ausente 💤"
            } else {
                var message = player.name + " não está mais ausente 🏎️"
            }
            room.sendAnnouncement(message, null, graycolor)
            if (player.team == 1) {
                if (players.filter(a => a.lap < player.lap && a.team == 1).length == 0 && players.filter(a => a.team == player.team).length > 2 && gameStarted && race) {
                    safeLap = player.lap
                    room.sendAnnouncement("Todos os jogadores na volta " + player.lap + " estão seguros da eliminação", null, yellowcolor)
                }
            }
            room.setPlayerTeam(player.id, 0)
            setGrid()
            return false
            break;

        case "!afks":
            var afklist = players.filter(a => a.afk == true)
            if (afklist.length > 0) {
                var afks = "AFKs: " + afklist[0].name
            } else {
                var afks = "Não há ninguem afk"
            }
            for (var j = 1; j < afklist.length; j++) {
                afks += ", " + afklist[j].name
            }
            room.sendAnnouncement(afks, player.id, graycolor)
            return false
            break;

        case "!bb":
            room.kickPlayer(player.id, "Bye!")
            return false;
            break;

        case "!discord":
            room.sendAnnouncement(discord, player.id, bluecolor, "bold")
            return false;
            break;

        case "!loja":
            room.sendAnnouncement("", player.id, bluecolor, "bold", 0)
            room.sendAnnouncement("________________ LOJA ________________", player.id, bluecolor, "bold", 0)
            room.sendAnnouncement("Digite !escudo para ficar invencível - " + priceShield + " $", player.id, bluecolor, "normal", 0)
            room.sendAnnouncement("Digite !1 para roubar a primeira posição do grid - " + price1st + " $", player.id, bluecolor, "normal", 0)
            room.sendAnnouncement("Digite !fila para roubar a primeira posição da fila - " + priceFila + " $", player.id, bluecolor, "normal", 0)
            room.sendAnnouncement("Seu saldo: " + player.money + " $", player.id, bluecolor)
            room.sendAnnouncement("", player.id, bluecolor, "bold", 0)
            return false;
            break;

        case "!stats":
            room.sendAnnouncement("", player.id, bluecolor, "bold", 0)
            room.sendAnnouncement("________ STATS ________", player.id, bluecolor, "bold")
            room.sendAnnouncement("Seus stats: !me", player.id, bluecolor, "normal", 0)
            room.sendAnnouncement("Stats de outro player: !stats #(id do jogador)", player.id, bluecolor, "normal", 0)
            room.sendAnnouncement("", player.id, bluecolor, "bold", 0)
            return false;
            break;

        case "!me":
            player.statsPodiumRate = 0
            if (player.statsRaces != 0) {
                player.statsPodiumRate = player.statsPodiums / player.statsRaces
            }
            room.sendAnnouncement(player.name + " → 🥇 " + player.stats1st + " ᚌ  🥈 " + player.stats2nd + " ᚌ  🥉 " + player.stats3rd + " ᚌ  🏎️ ᴄ:  " + player.statsRaces + " ᚌ  🏁 🇻:  " + player.statsLaps + " ᚜ 🏆 " + player.statsPodiums + " (" + player.statsPodiumRate.toFixed(2) + ") ᚛ marioKart", player.id, whitecolor)
            return false;
            break;


        case senha:
            room.setPlayerAdmin(player.id, true)
            return false;
            break;

        default:
            if (message.indexOf("!stats #") == 0) {
                if (message.length > 8) {
                    var playerT = parseInt(message.slice(8, message.length))
                    if (!isNaN(playerT)) {
                        playerT = players.filter(a => a.id == playerT)[0]
                        if (playerT != null) {
                            playerT.statsPodiumRate = 0
                            if (playerT.statsRaces != 0) {
                                playerT.statsPodiumRate = playerT.statsPodiums / playerT.statsRaces
                            }
                            room.sendAnnouncement(playerT.name + " → 🥇 " + playerT.stats1st + " ᚌ  🥈 " + playerT.stats2nd + " ᚌ  🥉 " + playerT.stats3rd + " ᚌ  🏎️ ᴄ:  " + playerT.statsRaces + " ᚌ  🏁 🇻:  " + playerT.statsLaps + " ᚜ 🏆 " + playerT.statsPodiums + " (" + playerT.statsPodiumRate.toFixed(2) + ") ᚛ marioKart", player.id, whitecolor)
                        } else {
                            room.sendAnnouncement("ID não reconhecido", player.id, whitecolor)
                        }
                    } else {
                        room.sendAnnouncement("ID não reconhecido", player.id, whitecolor)
                    }
                } else {
                    room.sendAnnouncement("Um ID deve ser informado", player.id, whitecolor)
                }
                return false
            }
            if (message.charAt(0) == "!") {
                room.sendAnnouncement("O comando [ " + message + " ] não foi identificado", player.id, whitecolor)
                return false;
            }
            room.sendAnnouncement(player.name + ": " + message, null, whitecolor)
            return false;
            break;
    }
}


//_________________________________________________________________________________________________________________________________________________

//Starting commands
room.setCustomStadium(maps[mapNumber].map);
finishLine = maps[mapNumber].finishLine
room.setScoreLimit(0);
room.setTimeLimit(0);
room.setTeamsLock(true);