// ============================================================================
// Script de sala simples para testes rápidos
// ============================================================================

const roomConfig = {
    roomName: "Sala de Teste",
    maxPlayers: 8,
    public: false,
    noPlayer: true,
    token: "" // Adicione seu token aqui: https://www.haxball.com/headlesstoken
};

const room = HBInit(roomConfig);

// Configuração básica
room.setDefaultStadium("Classic");
room.setScoreLimit(3);
room.setTimeLimit(3);

// Evento: Jogador entra
room.onPlayerJoin = function(player) {
    console.log(`Jogador entrou: ${player.name}`);
    room.sendAnnouncement(`Bem-vindo, ${player.name}!`, player.id, 0x00FF00);
    
    // Dá admin ao primeiro jogador
    if (room.getPlayerList().length === 1) {
        room.setPlayerAdmin(player.id, true);
    }
};

// Evento: Jogador sai
room.onPlayerLeave = function(player) {
    console.log(`Jogador saiu: ${player.name}`);
};

// Evento: Chat
room.onPlayerChat = function(player, message) {
    console.log(`[${player.name}]: ${message}`);
    return true;
};

// Evento: Gol
room.onTeamGoal = function(team) {
    const scores = room.getScores();
    console.log(`Gol! Placar: ${scores.red} x ${scores.blue}`);
};

// Evento: Link da sala
room.onRoomLink = function(url) {
    console.log(`Link da sala: ${url}`);
};

console.log("Sala de teste iniciada!");
