// ============================================================================
// Script de exemplo de sala Haxball com eventos e comandos básicos
// ============================================================================

// Configuração da sala
const roomConfig = {
    roomName: "🎮 Sala Exemplo Haxball",
    playerName: "Bot",
    maxPlayers: 16,
    public: false, // true para aparecer na lista pública
    noPlayer: true, // Recomendado: remove o player host
    token: "thr1.AAAAAGm-4TE1vTJJENeBtQ.Mb4Ws65iXx4" // Obtenha em: https://www.haxball.com/headlesstoken
};

// Inicializa a sala
const room = HBInit(roomConfig);

// ============================================================================
// CONFIGURAÇÕES INICIAIS DA SALA
// ============================================================================

room.setDefaultStadium("Classic");
room.setScoreLimit(3);
room.setTimeLimit(3); // 3 minutos

// ============================================================================
// VARIÁVEIS GLOBAIS
// ============================================================================

const admins = []; // Lista de IDs de jogadores administradores
const teamColors = {
    red: { angle: 0, textColor: 0xFFFFFF, colors: [0xE56E56] },
    blue: { angle: 0, textColor: 0xFFFFFF, colors: [0x5689E5] }
};

// ============================================================================
// FUNÇÕES AUXILIARES
// ============================================================================

/**
 * Verifica se há pelo menos um admin na sala
 * Se não houver, promove o primeiro jogador disponível
 */
function updateAdmins() {
    const players = room.getPlayerList();
    
    if (players.length === 0) return;
    
    const hasAdmin = players.some(player => player.admin);
    
    if (!hasAdmin) {
        room.setPlayerAdmin(players[0].id, true);
        room.sendAnnouncement(
            `👑 ${players[0].name} agora é administrador!`,
            null,
            0x00FF00,
            "bold",
            2
        );
    }
}

/**
 * Envia mensagem de boas-vindas para o jogador
 */
function sendWelcomeMessage(player) {
    room.sendAnnouncement(
        `👋 Bem-vindo, ${player.name}!`,
        player.id,
        0x00FFFF,
        "bold",
        1
    );
    
    room.sendAnnouncement(
        "📋 Digite !help para ver os comandos disponíveis.",
        player.id,
        0xFFFFFF,
        "normal",
        0
    );
}

/**
 * Processa comandos do chat
 */
function handleCommand(player, message) {
    const args = message.substring(1).trim().split(/\s+/);
    const command = args[0].toLowerCase();
    
    switch (command) {
        case 'help':
            room.sendAnnouncement(
                "📋 Comandos disponíveis:",
                player.id,
                0xFFFF00,
                "bold",
                0
            );
            room.sendAnnouncement(
                "!help - Mostra esta mensagem",
                player.id,
                0xFFFFFF,
                "small",
                0
            );
            room.sendAnnouncement(
                "!bb - Sair da sala",
                player.id,
                0xFFFFFF,
                "small",
                0
            );
            room.sendAnnouncement(
                "!afk - Move para espectadores",
                player.id,
                0xFFFFFF,
                "small",
                0
            );
            
            if (player.admin) {
                room.sendAnnouncement(
                    "!reset - Reinicia o jogo (admin)",
                    player.id,
                    0xFF8800,
                    "small",
                    0
                );
                room.sendAnnouncement(
                    "!pause - Pausa o jogo (admin)",
                    player.id,
                    0xFF8800,
                    "small",
                    0
                );
            }
            return false; // Bloqueia a mensagem de comando
            
        case 'bb':
        case 'bye':
            room.sendAnnouncement(
                `👋 ${player.name} saiu da sala!`,
                null,
                0xFFFF00,
                "normal",
                1
            );
            room.kickPlayer(player.id, "Até logo!", false);
            return false;
            
        case 'afk':
            room.setPlayerTeam(player.id, 0); // Move para espectadores
            room.sendAnnouncement(
                `💤 ${player.name} está AFK.`,
                null,
                0xFFFFFF,
                "normal",
                0
            );
            return false;
            
        case 'reset':
            if (player.admin) {
                room.stopGame();
                room.startGame();
                room.sendAnnouncement(
                    "🔄 Jogo reiniciado!",
                    null,
                    0x00FF00,
                    "bold",
                    2
                );
            } else {
                room.sendAnnouncement(
                    "❌ Apenas administradores podem usar este comando.",
                    player.id,
                    0xFF0000,
                    "normal",
                    1
                );
            }
            return false;
            
        case 'pause':
            if (player.admin) {
                const scores = room.getScores();
                if (scores) {
                    room.pauseGame(true);
                    room.sendAnnouncement(
                        "⏸️ Jogo pausado!",
                        null,
                        0xFFFF00,
                        "bold",
                        2
                    );
                }
            } else {
                room.sendAnnouncement(
                    "❌ Apenas administradores podem usar este comando.",
                    player.id,
                    0xFF0000,
                    "normal",
                    1
                );
            }
            return false;
    }
    
    return true; // Permite a mensagem normal
}

// ============================================================================
// EVENTOS DA SALA
// ============================================================================

/**
 * Evento: Jogador entra na sala
 */
room.onPlayerJoin = function(player) {
    console.log(`🔗 Room link: Aguardando URL da sala...`);
    console.log(`➕ ${player.name} entrou na sala [ID: ${player.id}]`);
    
    sendWelcomeMessage(player);
    updateAdmins();
};

/**
 * Evento: Jogador sai da sala
 */
room.onPlayerLeave = function(player) {
    console.log(`➖ ${player.name} saiu da sala [ID: ${player.id}]`);
    
    room.sendAnnouncement(
        `👋 ${player.name} saiu da sala.`,
        null,
        0xFFFFFF,
        "normal",
        0
    );
    
    updateAdmins();
};

/**
 * Evento: Mensagem de chat
 */
room.onPlayerChat = function(player, message) {
    console.log(`💬 [${player.name}]: ${message}`);
    
    // Processa comandos (mensagens que começam com !)
    if (message.startsWith("!")) {
        return handleCommand(player, message);
    }
    
    return true; // Permite a mensagem
};

/**
 * Evento: Jogador chuta a bola
 */
room.onPlayerBallKick = function(player) {
    // console.log(`⚽ ${player.name} chutou a bola`);
};

/**
 * Evento: Gol marcado
 */
room.onTeamGoal = function(team) {
    const scores = room.getScores();
    const teamName = team === 1 ? "🔴 Time Vermelho" : "🔵 Time Azul";
    
    room.sendAnnouncement(
        `⚽ GOOOOL! ${teamName} marcou!`,
        null,
        team === 1 ? 0xFF0000 : 0x0000FF,
        "bold",
        2
    );
    
    console.log(`⚽ Gol do time ${team}! Placar: ${scores.red} x ${scores.blue}`);
};

/**
 * Evento: Jogo inicia
 */
room.onGameStart = function(byPlayer) {
    console.log('🎮 Jogo iniciado!');
    
    room.sendAnnouncement(
        "🎮 Jogo iniciado! Boa sorte!",
        null,
        0x00FF00,
        "bold",
        2
    );
};

/**
 * Evento: Jogo termina
 */
room.onGameStop = function(byPlayer) {
    console.log('🛑 Jogo encerrado!');
};

/**
 * Evento: Vitória de um time
 */
room.onTeamVictory = function(scores) {
    const winner = scores.red > scores.blue ? "🔴 Time Vermelho" : "🔵 Time Azul";
    const winnerColor = scores.red > scores.blue ? 0xFF0000 : 0x0000FF;
    
    room.sendAnnouncement(
        `🏆 ${winner} venceu! Placar: ${scores.red} x ${scores.blue}`,
        null,
        winnerColor,
        "bold",
        2
    );
    
    console.log(`🏆 ${winner} venceu! Placar: ${scores.red} x ${scores.blue}`);
};

/**
 * Evento: Mudança de time
 */
room.onPlayerTeamChange = function(changedPlayer, byPlayer) {
    const teamNames = ['Espectadores', 'Time Vermelho', 'Time Azul'];
    console.log(`🔄 ${changedPlayer.name} mudou para ${teamNames[changedPlayer.team]}`);
};

/**
 * Evento: Mudança de admin
 */
room.onPlayerAdminChange = function(changedPlayer, byPlayer) {
    if (changedPlayer.admin) {
        room.sendAnnouncement(
            `👑 ${changedPlayer.name} agora é administrador!`,
            null,
            0xFFFF00,
            "bold",
            2
        );
        console.log(`👑 ${changedPlayer.name} agora é admin`);
    }
};

/**
 * Evento: Jogador é expulso
 */
room.onPlayerKicked = function(kickedPlayer, reason, ban, byPlayer) {
    console.log(`🚫 ${kickedPlayer.name} foi expulso. Razão: ${reason}`);
};

/**
 * Evento: Jogo é pausado
 */
room.onGamePause = function(byPlayer) {
    console.log('⏸️  Jogo pausado');
};

/**
 * Evento: Jogo é despausado
 */
room.onGameUnpause = function(byPlayer) {
    console.log('▶️  Jogo despausado');
    
    room.sendAnnouncement(
        "▶️ Jogo retomado!",
        null,
        0x00FF00,
        "bold",
        1
    );
};

/**
 * Evento: Link da sala obtido
 */
room.onRoomLink = function(url) {
    console.log(`🔗 Link da sala: ${url}`);
};

// ============================================================================
// INICIALIZAÇÃO
// ============================================================================

console.log("✅ Script da sala carregado com sucesso!");
console.log(`📝 Nome da sala: ${roomConfig.roomName}`);
console.log(`👥 Máximo de jogadores: ${roomConfig.maxPlayers}`);
