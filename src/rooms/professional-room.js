// ============================================================================
// Sala Profissional com Sistema Completo
// Utiliza os helpers para criar uma sala com todos os recursos
// ============================================================================

// Nota: Em um ambiente de browser, você pode carregar este arquivo
// diretamente no script. Em Node.js com Puppeteer, ele será injetado.

// Simula import dos helpers (em produção, estes seriam carregados)
// Para usar este exemplo, copie o conteúdo de helpers.js aqui ou carregue-o antes

const roomConfig = {
    roomName: "⚡ Sala Profissional v2.0",
    maxPlayers: 20,
    public: false,
    noPlayer: true,
    token: "thr1.AAAAAGk3CempOo2dcy7r7w.viZtagoKM9c" // https://www.haxball.com/headlesstoken
};

const room = HBInit(roomConfig);

// ============================================================================
// CONSTANTES (Copie de helpers.js se necessário)
// ============================================================================

const Colors = {
    SUCCESS: 0x00FF00,
    ERROR: 0xFF0000,
    WARNING: 0xFFFF00,
    INFO: 0x00FFFF,
    WHITE: 0xFFFFFF
};

const Teams = {
    SPECTATORS: 0,
    RED: 1,
    BLUE: 2
};

// ============================================================================
// CONFIGURAÇÃO
// ============================================================================

const CONFIG = {
    SUPER_ADMINS: [], // Auth IDs de super admins
    AFK_TIMEOUT: 60, // segundos
    GOALS_TO_WIN: 3,
    TIME_LIMIT: 5, // minutos
    STADIUM: "Classic"
};

// ============================================================================
// ESTADO DA SALA
// ============================================================================

const state = {
    stats: new Map(),
    afkTimers: new Map(),
    chatLimiter: new Map(),
    gameStartTime: null,
    totalGames: 0
};

// ============================================================================
// FUNÇÕES AUXILIARES
// ============================================================================

function sendAnnouncement(msg, target = null, color = Colors.WHITE, style = "normal", sound = 0) {
    room.sendAnnouncement(msg, target, color, style, sound);
}

function getTeamName(teamId) {
    switch (teamId) {
        case Teams.RED: return "🔴 Time Vermelho";
        case Teams.BLUE: return "🔵 Time Azul";
        case Teams.SPECTATORS: return "👥 Espectadores";
        default: return "Desconhecido";
    }
}

function initPlayerStats(playerId, playerName) {
    if (!state.stats.has(playerId)) {
        state.stats.set(playerId, {
            name: playerName,
            goals: 0,
            wins: 0,
            losses: 0,
            gamesPlayed: 0
        });
    }
}

function updateAdmins() {
    const players = room.getPlayerList();
    if (players.length === 0) return;
    
    const hasAdmin = players.some(p => p.admin);
    if (!hasAdmin) {
        room.setPlayerAdmin(players[0].id, true);
        sendAnnouncement(`👑 ${players[0].name} é o novo admin!`, null, Colors.SUCCESS, "bold", 2);
    }
}

function isSuperAdmin(player) {
    return player.auth && CONFIG.SUPER_ADMINS.includes(player.auth);
}

function checkChatSpam(playerId) {
    const now = Date.now();
    const lastMessage = state.chatLimiter.get(playerId) || 0;
    
    if (now - lastMessage < 1000) { // 1 segundo entre mensagens
        return true; // É spam
    }
    
    state.chatLimiter.set(playerId, now);
    return false;
}

function updateAFK(playerId) {
    state.afkTimers.set(playerId, Date.now());
}

function checkAFK() {
    const now = Date.now();
    const players = room.getPlayerList().filter(p => p.team !== Teams.SPECTATORS);
    
    players.forEach(player => {
        const lastActivity = state.afkTimers.get(player.id);
        if (lastActivity && (now - lastActivity) > CONFIG.AFK_TIMEOUT * 1000) {
            room.setPlayerTeam(player.id, Teams.SPECTATORS);
            sendAnnouncement(
                `💤 ${player.name} foi movido para espectadores por inatividade.`,
                null,
                Colors.WARNING
            );
            state.afkTimers.delete(player.id);
        }
    });
}

// ============================================================================
// SISTEMA DE COMANDOS
// ============================================================================

const commands = {
    help: (player, args) => {
        const msgs = [
            "━━━━━━━━━━━━━━━━━━━━━━━━━━",
            "📋 COMANDOS DISPONÍVEIS",
            "━━━━━━━━━━━━━━━━━━━━━━━━━━",
            "!help - Mostra este menu",
            "!afk - Vai para espectadores",
            "!stats - Suas estatísticas",
            "!top - Top jogadores",
            "!bb - Sair da sala"
        ];
        
        if (player.admin) {
            msgs.push("━━━━━━━━━━━━━━━━━━━━━━━━━━");
            msgs.push("👑 COMANDOS ADMIN");
            msgs.push("!admin #id - Dá admin");
            msgs.push("!kick #id - Expulsa jogador");
            msgs.push("!reset - Reinicia jogo");
            msgs.push("!clear - Limpa bans");
        }
        
        msgs.push("━━━━━━━━━━━━━━━━━━━━━━━━━━");
        
        msgs.forEach((msg, i) => {
            setTimeout(() => {
                sendAnnouncement(msg, player.id, Colors.INFO, "small", 0);
            }, i * 50);
        });
    },
    
    afk: (player, args) => {
        room.setPlayerTeam(player.id, Teams.SPECTATORS);
        sendAnnouncement(`💤 ${player.name} está AFK.`, null, Colors.INFO);
    },
    
    bb: (player, args) => {
        sendAnnouncement(`👋 ${player.name} saiu da sala.`, null, Colors.INFO);
        room.kickPlayer(player.id, "Até logo!", false);
    },
    
    stats: (player, args) => {
        const stats = state.stats.get(player.id);
        
        if (!stats || stats.gamesPlayed === 0) {
            sendAnnouncement("📊 Você ainda não jogou nenhuma partida!", player.id, Colors.INFO);
            return;
        }
        
        const winRate = ((stats.wins / stats.gamesPlayed) * 100).toFixed(1);
        const goalsPerGame = (stats.goals / stats.gamesPlayed).toFixed(1);
        
        sendAnnouncement("━━━━━━━━━━━━━━━━━━━━━━━━━━", player.id, Colors.INFO, "small");
        sendAnnouncement(`📊 Estatísticas de ${player.name}`, player.id, Colors.INFO, "bold");
        sendAnnouncement("━━━━━━━━━━━━━━━━━━━━━━━━━━", player.id, Colors.INFO, "small");
        sendAnnouncement(`⚽ Gols: ${stats.goals}`, player.id, Colors.WHITE, "small");
        sendAnnouncement(`🎮 Partidas: ${stats.gamesPlayed}`, player.id, Colors.WHITE, "small");
        sendAnnouncement(`🏆 Vitórias: ${stats.wins}`, player.id, Colors.SUCCESS, "small");
        sendAnnouncement(`💔 Derrotas: ${stats.losses}`, player.id, Colors.ERROR, "small");
        sendAnnouncement(`📈 Taxa de vitória: ${winRate}%`, player.id, Colors.WARNING, "small");
        sendAnnouncement(`⚡ Gols/partida: ${goalsPerGame}`, player.id, Colors.INFO, "small");
        sendAnnouncement("━━━━━━━━━━━━━━━━━━━━━━━━━━", player.id, Colors.INFO, "small");
    },
    
    top: (player, args) => {
        const sortedStats = Array.from(state.stats.values())
            .filter(s => s.gamesPlayed > 0)
            .sort((a, b) => b.goals - a.goals)
            .slice(0, 5);
        
        if (sortedStats.length === 0) {
            sendAnnouncement("📊 Ainda não há estatísticas!", player.id, Colors.INFO);
            return;
        }
        
        sendAnnouncement("━━━━━━━━━━━━━━━━━━━━━━━━━━", player.id, Colors.INFO, "small");
        sendAnnouncement("🏆 TOP ARTILHEIROS", player.id, Colors.WARNING, "bold");
        sendAnnouncement("━━━━━━━━━━━━━━━━━━━━━━━━━━", player.id, Colors.INFO, "small");
        
        sortedStats.forEach((s, i) => {
            const medal = i === 0 ? "🥇" : i === 1 ? "🥈" : i === 2 ? "🥉" : `${i + 1}.`;
            sendAnnouncement(
                `${medal} ${s.name}: ${s.goals} gols`,
                player.id,
                Colors.WHITE,
                "small"
            );
        });
        
        sendAnnouncement("━━━━━━━━━━━━━━━━━━━━━━━━━━", player.id, Colors.INFO, "small");
    },
    
    admin: (player, args) => {
        if (!player.admin) {
            sendAnnouncement("❌ Apenas admins podem usar este comando.", player.id, Colors.ERROR);
            return;
        }
        
        if (!args[0]) {
            sendAnnouncement("❌ Use: !admin #id", player.id, Colors.ERROR);
            return;
        }
        
        const targetId = parseInt(args[0].replace('#', ''));
        const target = room.getPlayer(targetId);
        
        if (!target) {
            sendAnnouncement("❌ Jogador não encontrado!", player.id, Colors.ERROR);
            return;
        }
        
        room.setPlayerAdmin(targetId, true);
        sendAnnouncement(`👑 ${target.name} agora é admin!`, null, Colors.SUCCESS, "bold", 2);
    },
    
    kick: (player, args) => {
        if (!player.admin) {
            sendAnnouncement("❌ Apenas admins podem usar este comando.", player.id, Colors.ERROR);
            return;
        }
        
        if (!args[0]) {
            sendAnnouncement("❌ Use: !kick #id", player.id, Colors.ERROR);
            return;
        }
        
        const targetId = parseInt(args[0].replace('#', ''));
        const target = room.getPlayer(targetId);
        
        if (!target) {
            sendAnnouncement("❌ Jogador não encontrado!", player.id, Colors.ERROR);
            return;
        }
        
        if (isSuperAdmin(target)) {
            sendAnnouncement("❌ Não pode expulsar super admin!", player.id, Colors.ERROR);
            return;
        }
        
        const reason = args.slice(1).join(' ') || "Expulso por um admin";
        room.kickPlayer(targetId, reason, false);
        sendAnnouncement(`🚫 ${target.name} foi expulso.`, null, Colors.WARNING);
    },
    
    reset: (player, args) => {
        if (!player.admin) {
            sendAnnouncement("❌ Apenas admins podem usar este comando.", player.id, Colors.ERROR);
            return;
        }
        
        room.stopGame();
        room.startGame();
        sendAnnouncement("🔄 Jogo reiniciado!", null, Colors.SUCCESS, "bold", 2);
    },
    
    clear: (player, args) => {
        if (!player.admin) {
            sendAnnouncement("❌ Apenas admins podem usar este comando.", player.id, Colors.ERROR);
            return;
        }
        
        room.clearBans();
        sendAnnouncement("✅ Todos os bans foram removidos!", null, Colors.SUCCESS, "bold", 1);
    }
};

function handleCommand(player, message) {
    const parts = message.substring(1).trim().split(/\s+/);
    const cmdName = parts[0].toLowerCase();
    const args = parts.slice(1);
    
    const cmd = commands[cmdName];
    
    if (cmd) {
        try {
            cmd(player, args);
        } catch (error) {
            console.error(`Erro no comando ${cmdName}:`, error);
            sendAnnouncement("❌ Erro ao executar comando.", player.id, Colors.ERROR);
        }
        return false;
    }
    
    return true;
}

// ============================================================================
// EVENTOS DA SALA
// ============================================================================

room.setDefaultStadium(CONFIG.STADIUM);
room.setScoreLimit(CONFIG.GOALS_TO_WIN);
room.setTimeLimit(CONFIG.TIME_LIMIT);

room.onPlayerJoin = function(player) {
    console.log(`➕ ${player.name} entrou [ID: ${player.id}]`);
    
    initPlayerStats(player.id, player.name);
    updateAFK(player.id);
    
    sendAnnouncement(
        `━━━━━━━━━━━━━━━━━━━━━━━━━━`,
        player.id,
        Colors.INFO,
        "small"
    );
    sendAnnouncement(
        `👋 Bem-vindo, ${player.name}!`,
        player.id,
        Colors.SUCCESS,
        "bold",
        1
    );
    sendAnnouncement(
        `Digite !help para ver os comandos`,
        player.id,
        Colors.INFO,
        "small"
    );
    sendAnnouncement(
        `━━━━━━━━━━━━━━━━━━━━━━━━━━`,
        player.id,
        Colors.INFO,
        "small"
    );
    
    if (isSuperAdmin(player)) {
        room.setPlayerAdmin(player.id, true);
        sendAnnouncement(`⚡ Super Admin ${player.name} entrou!`, null, Colors.WARNING, "bold", 2);
    }
    
    updateAdmins();
};

room.onPlayerLeave = function(player) {
    console.log(`➖ ${player.name} saiu [ID: ${player.id}]`);
    state.afkTimers.delete(player.id);
    state.chatLimiter.delete(player.id);
    updateAdmins();
};

room.onPlayerChat = function(player, message) {
    console.log(`💬 [${player.name}]: ${message}`);
    
    if (checkChatSpam(player.id)) {
        sendAnnouncement("❌ Você está enviando mensagens muito rápido!", player.id, Colors.ERROR);
        return false;
    }
    
    if (message.startsWith("!")) {
        return handleCommand(player, message);
    }
    
    return true;
};

room.onPlayerActivity = function(player) {
    updateAFK(player.id);
};

room.onTeamGoal = function(team) {
    const scores = room.getScores();
    const teamName = getTeamName(team);
    
    sendAnnouncement(
        `⚽ GOOOOL! ${teamName}!`,
        null,
        team === Teams.RED ? 0xFF0000 : 0x0000FF,
        "bold",
        2
    );
    
    sendAnnouncement(
        `📊 Placar: 🔴 ${scores.red} x ${scores.blue} 🔵`,
        null,
        Colors.WHITE,
        "normal",
        0
    );
    
    // Atualiza estatísticas (aqui você pode adicionar lógica para detectar quem fez o gol)
};

room.onTeamVictory = function(scores) {
    const winner = scores.red > scores.blue ? Teams.RED : Teams.BLUE;
    const loser = winner === Teams.RED ? Teams.BLUE : Teams.RED;
    const winnerName = getTeamName(winner);
    
    state.totalGames++;
    
    sendAnnouncement("━━━━━━━━━━━━━━━━━━━━━━━━━━", null, Colors.WARNING, "bold", 2);
    sendAnnouncement(`🏆 ${winnerName} VENCEU!`, null, Colors.WARNING, "bold", 2);
    sendAnnouncement(`📊 Placar final: ${scores.red} x ${scores.blue}`, null, Colors.WHITE, "bold", 2);
    sendAnnouncement("━━━━━━━━━━━━━━━━━━━━━━━━━━", null, Colors.WARNING, "bold", 2);
    
    // Atualiza estatísticas dos jogadores
    const players = room.getPlayerList();
    players.forEach(p => {
        if (p.team === winner) {
            const stats = state.stats.get(p.id);
            if (stats) {
                stats.wins++;
                stats.gamesPlayed++;
            }
        } else if (p.team === loser) {
            const stats = state.stats.get(p.id);
            if (stats) {
                stats.losses++;
                stats.gamesPlayed++;
            }
        }
    });
};

room.onGameStart = function(byPlayer) {
    console.log('🎮 Jogo iniciado!');
    state.gameStartTime = Date.now();
    
    sendAnnouncement("🎮 Jogo iniciado! Boa sorte a todos!", null, Colors.SUCCESS, "bold", 2);
};

room.onGameStop = function(byPlayer) {
    console.log('🛑 Jogo encerrado!');
    state.gameStartTime = null;
};

room.onGameTick = function() {
    // Verifica AFK a cada 5 segundos (300 ticks = 5 segundos a 60 FPS)
    if (state.gameStartTime && Date.now() - state.gameStartTime > 5000) {
        const tick = Math.floor((Date.now() - state.gameStartTime) / 1000);
        if (tick % 5 === 0) {
            checkAFK();
        }
    }
};

room.onRoomLink = function(url) {
    console.log(`🔗 Link da sala: ${url}`);
};

console.log("✅ Sala Profissional carregada com sucesso!");
console.log(`📋 Configuração: ${CONFIG.GOALS_TO_WIN} gols, ${CONFIG.TIME_LIMIT} min`);
