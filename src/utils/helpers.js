// ============================================================================
// Utilitários para desenvolvimento de salas Haxball
// ============================================================================

/**
 * Converte cores hexadecimais para inteiros
 */
const Colors = {
    // Cores básicas
    RED: 0xFF0000,
    GREEN: 0x00FF00,
    BLUE: 0x0000FF,
    YELLOW: 0xFFFF00,
    CYAN: 0x00FFFF,
    MAGENTA: 0xFF00FF,
    WHITE: 0xFFFFFF,
    BLACK: 0x000000,
    TRANSPARENT: -1,
    
    // Cores Haxball
    HAXBALL_RED: 0xE56E56,
    HAXBALL_BLUE: 0x5689E5,
    
    // Cores de mensagem
    SUCCESS: 0x00FF00,
    ERROR: 0xFF0000,
    WARNING: 0xFFFF00,
    INFO: 0x00FFFF,
    
    /**
     * Converte cor RGB para inteiro
     */
    rgb: (r, g, b) => {
        return (r << 16) | (g << 8) | b;
    },
    
    /**
     * Converte hex string para inteiro
     */
    fromHex: (hex) => {
        return parseInt(hex.replace('#', ''), 16);
    }
};

/**
 * Estilos de anúncio
 */
const Styles = {
    NORMAL: "normal",
    BOLD: "bold",
    ITALIC: "italic",
    SMALL: "small",
    SMALL_BOLD: "small-bold",
    SMALL_ITALIC: "small-italic"
};

/**
 * Sons de anúncio
 */
const Sounds = {
    NONE: 0,
    CHAT: 1,
    NOTIFICATION: 2
};

/**
 * IDs dos times
 */
const Teams = {
    SPECTATORS: 0,
    RED: 1,
    BLUE: 2
};

/**
 * Estádios padrão
 */
const Stadiums = {
    CLASSIC: "Classic",
    EASY: "Easy",
    SMALL: "Small",
    BIG: "Big",
    ROUNDED: "Rounded",
    HOCKEY: "Hockey",
    BIG_HOCKEY: "BigHockey",
    BIG_EASY: "BigEasy",
    BIG_ROUNDED: "BigRounded",
    HUGE: "Huge"
};

/**
 * Classe para gerenciar anúncios formatados
 */
class Announcer {
    constructor(room) {
        this.room = room;
    }
    
    send(msg, targetId = null, color = Colors.WHITE, style = Styles.NORMAL, sound = Sounds.NONE) {
        this.room.sendAnnouncement(msg, targetId, color, style, sound);
    }
    
    success(msg, targetId = null) {
        this.send(msg, targetId, Colors.SUCCESS, Styles.BOLD, Sounds.NOTIFICATION);
    }
    
    error(msg, targetId = null) {
        this.send(msg, targetId, Colors.ERROR, Styles.BOLD, Sounds.NOTIFICATION);
    }
    
    warning(msg, targetId = null) {
        this.send(msg, targetId, Colors.WARNING, Styles.BOLD, Sounds.CHAT);
    }
    
    info(msg, targetId = null) {
        this.send(msg, targetId, Colors.INFO, Styles.NORMAL, Sounds.NONE);
    }
    
    broadcast(msg, color = Colors.WHITE) {
        this.send(msg, null, color, Styles.BOLD, Sounds.NOTIFICATION);
    }
}

/**
 * Classe para gerenciar comandos
 */
class CommandManager {
    constructor(room, prefix = "!") {
        this.room = room;
        this.prefix = prefix;
        this.commands = new Map();
    }
    
    register(name, callback, options = {}) {
        const {
            adminOnly = false,
            description = "Sem descrição",
            aliases = [],
            minArgs = 0
        } = options;
        
        const command = {
            name,
            callback,
            adminOnly,
            description,
            minArgs
        };
        
        this.commands.set(name, command);
        aliases.forEach(alias => this.commands.set(alias, command));
    }
    
    handle(player, message) {
        if (!message.startsWith(this.prefix)) {
            return true;
        }
        
        const parts = message.substring(this.prefix.length).trim().split(/\s+/);
        const cmdName = parts[0].toLowerCase();
        const args = parts.slice(1);
        
        const command = this.commands.get(cmdName);
        
        if (!command) {
            return true;
        }
        
        if (command.adminOnly && !player.admin) {
            this.room.sendAnnouncement(
                "❌ Apenas admins podem usar este comando.",
                player.id,
                Colors.ERROR
            );
            return false;
        }
        
        if (args.length < command.minArgs) {
            this.room.sendAnnouncement(
                `❌ Use: ${this.prefix}${command.name}`,
                player.id,
                Colors.ERROR
            );
            return false;
        }
        
        try {
            command.callback(player, args, this.room);
        } catch (error) {
            console.error(`Erro no comando ${cmdName}:`, error);
            this.room.sendAnnouncement(
                "❌ Erro ao executar comando.",
                player.id,
                Colors.ERROR
            );
        }
        
        return false;
    }
    
    getHelp(player) {
        const lines = ["📋 Comandos Disponíveis:"];
        
        for (const [name, cmd] of this.commands) {
            if (name !== cmd.name) continue; // Pula aliases
            
            if (cmd.adminOnly && !player.admin) continue;
            
            const prefix = cmd.adminOnly ? "[ADMIN] " : "";
            lines.push(`${prefix}${this.prefix}${name} - ${cmd.description}`);
        }
        
        return lines;
    }
}

/**
 * Classe para rastrear estatísticas
 */
class StatsTracker {
    constructor() {
        this.playerStats = new Map();
        this.gameStats = {
            totalGames: 0,
            totalGoals: 0,
            redWins: 0,
            blueWins: 0
        };
    }
    
    initPlayer(playerId, playerName) {
        if (!this.playerStats.has(playerId)) {
            this.playerStats.set(playerId, {
                name: playerName,
                goals: 0,
                assists: 0,
                wins: 0,
                losses: 0,
                gamesPlayed: 0
            });
        }
    }
    
    addGoal(playerId) {
        const stats = this.playerStats.get(playerId);
        if (stats) {
            stats.goals++;
            this.gameStats.totalGoals++;
        }
    }
    
    addWin(playerId) {
        const stats = this.playerStats.get(playerId);
        if (stats) {
            stats.wins++;
            stats.gamesPlayed++;
        }
    }
    
    addLoss(playerId) {
        const stats = this.playerStats.get(playerId);
        if (stats) {
            stats.losses++;
            stats.gamesPlayed++;
        }
    }
    
    getPlayerStats(playerId) {
        return this.playerStats.get(playerId) || null;
    }
    
    getTopScorers(limit = 5) {
        return Array.from(this.playerStats.values())
            .sort((a, b) => b.goals - a.goals)
            .slice(0, limit);
    }
}

/**
 * Função para calcular distância entre dois pontos
 */
function distance(p1, p2) {
    const dx = p1.x - p2.x;
    const dy = p1.y - p2.y;
    return Math.sqrt(dx * dx + dy * dy);
}

/**
 * Função para formatar tempo
 */
function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
}

/**
 * Função para obter nome do time
 */
function getTeamName(teamId) {
    switch (teamId) {
        case Teams.SPECTATORS: return "Espectadores";
        case Teams.RED: return "Time Vermelho";
        case Teams.BLUE: return "Time Azul";
        default: return "Desconhecido";
    }
}

/**
 * Função para validar auth
 */
function isValidAuth(auth) {
    return auth && typeof auth === 'string' && auth.length > 0;
}

/**
 * Classe para debouncing
 */
class Debouncer {
    constructor(delay = 1000) {
        this.delay = delay;
        this.timers = new Map();
    }
    
    execute(key, callback) {
        if (this.timers.has(key)) {
            clearTimeout(this.timers.get(key));
        }
        
        const timer = setTimeout(() => {
            callback();
            this.timers.delete(key);
        }, this.delay);
        
        this.timers.set(key, timer);
    }
    
    canExecute(key) {
        return !this.timers.has(key);
    }
}

/**
 * Classe para rate limiting
 */
class RateLimiter {
    constructor(maxRequests = 5, timeWindow = 10000) {
        this.maxRequests = maxRequests;
        this.timeWindow = timeWindow;
        this.requests = new Map();
    }
    
    isAllowed(key) {
        const now = Date.now();
        const requests = this.requests.get(key) || [];
        
        // Remove requests antigas
        const validRequests = requests.filter(time => now - time < this.timeWindow);
        
        if (validRequests.length >= this.maxRequests) {
            return false;
        }
        
        validRequests.push(now);
        this.requests.set(key, validRequests);
        
        return true;
    }
    
    reset(key) {
        this.requests.delete(key);
    }
}

// Exporta tudo
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        Colors,
        Styles,
        Sounds,
        Teams,
        Stadiums,
        Announcer,
        CommandManager,
        StatsTracker,
        distance,
        formatTime,
        getTeamName,
        isValidAuth,
        Debouncer,
        RateLimiter
    };
}
