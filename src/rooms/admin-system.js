// ============================================================================
// Sistema de Administração Avançado
// ============================================================================

const roomConfig = {
    roomName: "🛡️ Sala com Admin System",
    maxPlayers: 20,
    public: false,
    noPlayer: true,
    token: "thr1.AAAAAGk3CempOo2dcy7r7w.viZtagoKM9c" // https://www.haxball.com/headlesstoken
};

const room = HBInit(roomConfig);

// ============================================================================
// CONFIGURAÇÕES
// ============================================================================

const CONFIG = {
    SUPER_ADMIN_AUTH: [], // Adicione auth IDs de super admins aqui
    AUTO_ADMIN_FIRST_PLAYER: true,
    AFK_TIMEOUT: 60 * 60, // 60 segundos em ticks (60 ticks/segundo)
    MAX_CHAT_LENGTH: 140
};

// ============================================================================
// DADOS DA SALA
// ============================================================================

const roomData = {
    superAdmins: new Set(CONFIG.SUPER_ADMIN_AUTH),
    adminList: new Set(),
    afkTracker: new Map(), // playerId -> last activity tick
    gameTick: 0,
    bannedPlayers: new Set(),
    stats: {
        totalGoals: { red: 0, blue: 0 },
        totalGames: 0
    }
};

// ============================================================================
// FUNÇÕES AUXILIARES
// ============================================================================

function isSuperAdmin(player) {
    return player.auth && roomData.superAdmins.has(player.auth);
}

function updateAdmins() {
    const players = room.getPlayerList();
    
    if (players.length === 0) return;
    
    // Verifica se há super admin
    const hasSuperAdmin = players.some(p => isSuperAdmin(p));
    
    if (hasSuperAdmin) {
        // Se há super admin, garante que ele seja admin
        players.forEach(p => {
            if (isSuperAdmin(p) && !p.admin) {
                room.setPlayerAdmin(p.id, true);
            }
        });
        return;
    }
    
    // Verifica se há admin
    const hasAdmin = players.some(p => p.admin);
    
    if (!hasAdmin && CONFIG.AUTO_ADMIN_FIRST_PLAYER) {
        room.setPlayerAdmin(players[0].id, true);
        roomData.adminList.add(players[0].id);
    }
}

function checkAFK() {
    const players = room.getPlayerList().filter(p => p.team !== 0);
    const currentTick = roomData.gameTick;
    
    players.forEach(player => {
        const lastActivity = roomData.afkTracker.get(player.id);
        
        if (lastActivity && (currentTick - lastActivity) > CONFIG.AFK_TIMEOUT) {
            room.setPlayerTeam(player.id, 0);
            room.sendAnnouncement(
                `💤 ${player.name} foi movido para espectadores por inatividade.`,
                null,
                0xFFAAAA,
                "normal",
                0
            );
            roomData.afkTracker.delete(player.id);
        }
    });
}

function getPlayerStats(player) {
    return {
        id: player.id,
        name: player.name,
        team: player.team,
        admin: player.admin,
        position: player.position
    };
}

// ============================================================================
// COMANDOS
// ============================================================================

const commands = {
    help: {
        description: "Mostra comandos disponíveis",
        adminOnly: false,
        execute: (player) => {
            const msgs = [
                "📋 Comandos Disponíveis:",
                "!help - Esta mensagem",
                "!afk - Vai para espectadores",
                "!bb - Sair da sala",
                "!stats - Estatísticas da sala"
            ];
            
            if (player.admin) {
                msgs.push("--- Comandos Admin ---");
                msgs.push("!admin <#id> - Dá admin a jogador");
                msgs.push("!kick <#id> [razão] - Expulsa jogador");
                msgs.push("!ban <#id> [razão] - Bane jogador");
                msgs.push("!clear - Limpa bans");
                msgs.push("!reset - Reinicia jogo");
                msgs.push("!swap - Troca times");
            }
            
            msgs.forEach(msg => {
                room.sendAnnouncement(msg, player.id, 0xFFFFFF, "small", 0);
            });
        }
    },
    
    afk: {
        description: "Move para espectadores",
        adminOnly: false,
        execute: (player) => {
            room.setPlayerTeam(player.id, 0);
            room.sendAnnouncement(
                `💤 ${player.name} está AFK.`,
                null,
                0xFFFFFF,
                "normal",
                0
            );
        }
    },
    
    bb: {
        description: "Sair da sala",
        adminOnly: false,
        execute: (player) => {
            room.sendAnnouncement(
                `👋 ${player.name} saiu.`,
                null,
                0xFFFF00,
                "normal",
                0
            );
            room.kickPlayer(player.id, "Até logo!", false);
        }
    },
    
    stats: {
        description: "Mostra estatísticas",
        adminOnly: false,
        execute: (player) => {
            const stats = roomData.stats;
            room.sendAnnouncement(
                `📊 Estatísticas da Sala`,
                player.id,
                0x00FFFF,
                "bold",
                0
            );
            room.sendAnnouncement(
                `Partidas: ${stats.totalGames} | Gols: ${stats.totalGoals.red + stats.totalGoals.blue}`,
                player.id,
                0xFFFFFF,
                "small",
                0
            );
            room.sendAnnouncement(
                `🔴 ${stats.totalGoals.red} x ${stats.totalGoals.blue} 🔵`,
                player.id,
                0xFFFFFF,
                "small",
                0
            );
        }
    },
    
    admin: {
        description: "Dá admin a um jogador",
        adminOnly: true,
        execute: (player, args) => {
            if (!args[0]) {
                room.sendAnnouncement("Use: !admin #id", player.id, 0xFF0000);
                return;
            }
            
            const targetId = parseInt(args[0].replace('#', ''));
            const target = room.getPlayer(targetId);
            
            if (!target) {
                room.sendAnnouncement("Jogador não encontrado!", player.id, 0xFF0000);
                return;
            }
            
            room.setPlayerAdmin(targetId, true);
            roomData.adminList.add(targetId);
            room.sendAnnouncement(
                `👑 ${target.name} agora é admin!`,
                null,
                0xFFFF00,
                "bold",
                1
            );
        }
    },
    
    kick: {
        description: "Expulsa um jogador",
        adminOnly: true,
        execute: (player, args) => {
            if (!args[0]) {
                room.sendAnnouncement("Use: !kick #id [razão]", player.id, 0xFF0000);
                return;
            }
            
            const targetId = parseInt(args[0].replace('#', ''));
            const target = room.getPlayer(targetId);
            
            if (!target) {
                room.sendAnnouncement("Jogador não encontrado!", player.id, 0xFF0000);
                return;
            }
            
            if (isSuperAdmin(target)) {
                room.sendAnnouncement("Não pode expulsar super admin!", player.id, 0xFF0000);
                return;
            }
            
            const reason = args.slice(1).join(' ') || "Expulso por um admin";
            room.kickPlayer(targetId, reason, false);
        }
    },
    
    ban: {
        description: "Bane um jogador",
        adminOnly: true,
        execute: (player, args) => {
            if (!args[0]) {
                room.sendAnnouncement("Use: !ban #id [razão]", player.id, 0xFF0000);
                return;
            }
            
            const targetId = parseInt(args[0].replace('#', ''));
            const target = room.getPlayer(targetId);
            
            if (!target) {
                room.sendAnnouncement("Jogador não encontrado!", player.id, 0xFF0000);
                return;
            }
            
            if (isSuperAdmin(target)) {
                room.sendAnnouncement("Não pode banir super admin!", player.id, 0xFF0000);
                return;
            }
            
            const reason = args.slice(1).join(' ') || "Banido por um admin";
            roomData.bannedPlayers.add(target.auth || target.conn);
            room.kickPlayer(targetId, reason, true);
        }
    },
    
    clear: {
        description: "Limpa todos os bans",
        adminOnly: true,
        execute: (player) => {
            room.clearBans();
            roomData.bannedPlayers.clear();
            room.sendAnnouncement("✅ Todos os bans foram removidos!", null, 0x00FF00, "bold", 1);
        }
    },
    
    reset: {
        description: "Reinicia o jogo",
        adminOnly: true,
        execute: (player) => {
            room.stopGame();
            room.startGame();
            room.sendAnnouncement("🔄 Jogo reiniciado!", null, 0x00FF00, "bold", 1);
        }
    },
    
    swap: {
        description: "Troca os times",
        adminOnly: true,
        execute: (player) => {
            const players = room.getPlayerList();
            players.forEach(p => {
                if (p.team === 1) {
                    room.setPlayerTeam(p.id, 2);
                } else if (p.team === 2) {
                    room.setPlayerTeam(p.id, 1);
                }
            });
            room.sendAnnouncement("🔄 Times trocados!", null, 0x00FF00, "bold", 1);
        }
    }
};

function handleCommand(player, message) {
    const parts = message.substring(1).trim().split(/\s+/);
    const cmdName = parts[0].toLowerCase();
    const args = parts.slice(1);
    
    const cmd = commands[cmdName];
    
    if (!cmd) {
        room.sendAnnouncement("❌ Comando não encontrado. Use !help", player.id, 0xFF0000);
        return false;
    }
    
    if (cmd.adminOnly && !player.admin) {
        room.sendAnnouncement("❌ Apenas admins podem usar este comando.", player.id, 0xFF0000);
        return false;
    }
    
    try {
        cmd.execute(player, args);
    } catch (error) {
        console.error(`Erro ao executar comando ${cmdName}:`, error);
        room.sendAnnouncement("❌ Erro ao executar comando.", player.id, 0xFF0000);
    }
    
    return false;
}

// ============================================================================
// EVENTOS
// ============================================================================

room.setDefaultStadium("Classic");
room.setScoreLimit(3);
room.setTimeLimit(5);

room.onPlayerJoin = function(player) {
    console.log(`➕ ${player.name} entrou [ID: ${player.id}]`);
    
    // Verifica se está banido
    if (player.auth && roomData.bannedPlayers.has(player.auth)) {
        room.kickPlayer(player.id, "Você está banido!", true);
        return;
    }
    
    room.sendAnnouncement(
        `👋 Bem-vindo, ${player.name}! Digite !help para ver os comandos.`,
        player.id,
        0x00FFFF,
        "bold",
        1
    );
    
    // Configura tracking de AFK
    roomData.afkTracker.set(player.id, 0);
    
    updateAdmins();
};

room.onPlayerLeave = function(player) {
    console.log(`➖ ${player.name} saiu [ID: ${player.id}]`);
    roomData.afkTracker.delete(player.id);
    roomData.adminList.delete(player.id);
    updateAdmins();
};

room.onPlayerChat = function(player, message) {
    console.log(`💬 [${player.name}]: ${message}`);
    
    if (message.length > CONFIG.MAX_CHAT_LENGTH) {
        room.sendAnnouncement("❌ Mensagem muito longa!", player.id, 0xFF0000);
        return false;
    }
    
    if (message.startsWith("!")) {
        return handleCommand(player, message);
    }
    
    return true;
};

room.onPlayerActivity = function(player) {
    roomData.afkTracker.set(player.id, roomData.gameTick);
};

room.onTeamGoal = function(team) {
    const scores = room.getScores();
    const teamName = team === 1 ? "🔴 Time Vermelho" : "🔵 Time Azul";
    
    if (team === 1) {
        roomData.stats.totalGoals.red++;
    } else {
        roomData.stats.totalGoals.blue++;
    }
    
    room.sendAnnouncement(
        `⚽ GOOOOL! ${teamName}! | ${scores.red} x ${scores.blue}`,
        null,
        team === 1 ? 0xFF0000 : 0x0000FF,
        "bold",
        2
    );
};

room.onTeamVictory = function(scores) {
    const winner = scores.red > scores.blue ? "🔴 Time Vermelho" : "🔵 Time Azul";
    
    roomData.stats.totalGames++;
    
    room.sendAnnouncement(
        `🏆 ${winner} venceu! | ${scores.red} x ${scores.blue}`,
        null,
        0xFFFF00,
        "bold",
        2
    );
};

room.onGameTick = function() {
    roomData.gameTick++;
    
    // Verifica AFK a cada 5 segundos (300 ticks)
    if (roomData.gameTick % 300 === 0) {
        checkAFK();
    }
};

room.onRoomLink = function(url) {
    console.log(`🔗 Link da sala: ${url}`);
};

console.log("✅ Sistema avançado de administração carregado!");
