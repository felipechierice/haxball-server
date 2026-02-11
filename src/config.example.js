// ============================================================================
// Arquivo de configuração de exemplo
// Copie este arquivo e personalize conforme necessário
// ============================================================================

module.exports = {
    // Configuração da sala
    room: {
        name: "Minha Sala Personalizada",
        maxPlayers: 16,
        public: false,
        password: null,
        geo: {
            code: "BR",
            lat: -23.5505,
            lon: -46.6333
        }
    },

    // Configuração do jogo
    game: {
        stadium: "Classic", // Classic, Easy, Small, Big, Rounded, Hockey, BigHockey, BigEasy, BigRounded, Huge
        scoreLimit: 3,
        timeLimit: 5, // em minutos
        teamsLocked: false
    },

    // Configuração de administração
    admin: {
        superAdmins: [
            // Adicione auth IDs aqui
            // "auth_id_1",
            // "auth_id_2"
        ],
        autoAdminFirstPlayer: true,
        maxAdmins: 5
    },

    // Configuração de AFK
    afk: {
        enabled: true,
        timeout: 60, // segundos
        kickInactive: false, // Se true, expulsa ao invés de mover para spec
        warningTime: 45 // Avisa X segundos antes de mover
    },

    // Configuração de chat
    chat: {
        maxLength: 140,
        spamProtection: true,
        spamInterval: 1000, // ms entre mensagens
        allowLinks: false
    },

    // Comandos personalizados
    commands: {
        prefix: "!",
        enabled: [
            "help",
            "afk",
            "bb",
            "stats",
            "admin",
            "kick",
            "ban",
            "clear",
            "reset",
            "swap"
        ]
    },

    // Configuração de estatísticas
    stats: {
        enabled: true,
        trackGoals: true,
        trackAssists: false, // Requer implementação customizada
        trackWins: true,
        saveToFile: false
    },

    // Cores dos times
    teams: {
        red: {
            angle: 60,
            textColor: 0xFFFFFF,
            colors: [0xE56E56, 0xC03C3C, 0x9E2727]
        },
        blue: {
            angle: 180,
            textColor: 0xFFFFFF,
            colors: [0x5689E5, 0x3C5FC0, 0x27459E]
        }
    },

    // Mensagens personalizadas
    messages: {
        welcome: "👋 Bem-vindo, {player}! Digite !help para ver os comandos.",
        goodbye: "👋 {player} saiu da sala.",
        afk: "💤 {player} está AFK.",
        goal: "⚽ GOL! {team} marcou!",
        victory: "🏆 {team} venceu!",
        gameStart: "🎮 Jogo iniciado! Boa sorte!",
        gameStop: "🛑 Jogo encerrado!"
    }
};
