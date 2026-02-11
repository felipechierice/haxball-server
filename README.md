# 🎮 Haxball Server com Node.js e Puppeteer

Servidor Haxball headless implementado com Node.js e Puppeteer, permitindo executar salas de Haxball automatizadas em um VPS ou servidor local.

## 📋 Sobre o Projeto

Este projeto implementa um servidor Haxball usando a API Headless oficial do Haxball. O servidor utiliza Puppeteer para automatizar um navegador headless que se conecta ao endpoint oficial do Haxball (`https://www.haxball.com/headless`), injeta o script da sala e mantém a conexão ativa.

## 🌟 Características

- ✅ Servidor Haxball headless totalmente funcional
- ✅ Implementado com Node.js e Puppeteer
- ✅ **Sistema de Matchmaking 3x3 Automático** 🆕
  - Organização automática de partidas 3x3
  - Balanceamento inteligente de times
  - Sistema de votação para jogadores
  - Ranking com top artilheiros
- ✅ Exemplo completo com eventos e comandos
- ✅ Sistema de comandos de chat (!help, !bb, !afk, etc.)
- ✅ Gerenciamento automático de administradores
- ✅ Logs detalhados de eventos
- ✅ Tratamento de erros robusto
- ✅ Fácil personalização e extensão

## 📦 Pré-requisitos

- Node.js >= 14.0.0
- npm ou yarn

## 🚀 Instalação

1. Clone ou baixe este repositório:
```bash
git clone <url-do-repositorio>
cd haxball-server
```

2. Instale as dependências:
```bash
npm install
```

## 🔑 Obtendo Token

Para criar uma sala sem resolver o reCAPTCHA manualmente, você precisa de um token:

1. Acesse: https://www.haxball.com/headlesstoken
2. Copie o token gerado
3. Cole o token no arquivo `src/rooms/example-room.js` na propriedade `token`

**Nota:** Os tokens expiram após alguns minutos. Se o servidor não iniciar, gere um novo token.

## 🎯 Como Usar

### Sala de Matchmaking 3x3 Automático (Recomendado) 🆕

```bash
npm start
# ou
npm run matchmaking
```

**📚 Guia completo:** Veja [MATCHMAKING-GUIDE.md](MATCHMAKING-GUIDE.md) para documentação detalhada do sistema de matchmaking.

### Outras Salas Disponíveis

```bash
# Sala de exemplo com comandos
npm run example

# Sistema avançado de administração
npm run admin

# Sala profissional completa
npm run pro
```

Ou especifique um arquivo de script customizado:

```bash
node src/index.js src/rooms/example-room.js
```

### Criar sua própria sala

1. Crie um novo arquivo JavaScript em `src/rooms/`
2. Use o arquivo `example-room.js` como base
3. Customize as configurações e eventos conforme necessário
4. Execute o servidor apontando para seu arquivo

## 🆕 Sistema de Matchmaking 3x3 Automático

O sistema mais avançado incluído no projeto! Características principais:

### ✨ Funcionalidades

- **🎲 Matchmaking Automático**: Organiza partidas 3x3 automaticamente
- **⚖️ Balanceamento Inteligente**: Ajusta times automaticamente quando jogadores saem
- **🗳️ Sistema de Votação**: Jogadores decidem se continuam ou finalizam quando desbalanceado
- **➕ Adição Dinâmica**: Adiciona novos jogadores durante a partida sem pausar
- **🏆 Ranking Completo**: Top artilheiros, estatísticas individuais, histórico de vitórias
- **🤖 100% Automático**: Nenhum admin humano necessário

### 📋 Comandos do Matchmaking

- `!help` - Lista de comandos
- `!top` - Top 10 artilheiros
- `!stats` - Suas estatísticas
- `!rank [nome]` - Stats de outro jogador
- `!sim` / `!nao` - Votar durante votação

### 📚 Documentação Completa

Veja o guia completo em [MATCHMAKING-GUIDE.md](MATCHMAKING-GUIDE.md) para:
- Como funciona o balanceamento
- Sistema de votação detalhado
- Exemplos de uso
- Configurações avançadas
- Troubleshooting

## 📖 API do Haxball Headless

### Configuração da Sala (RoomConfig)

```javascript
const roomConfig = {
    roomName: "Nome da Sala",      // Nome da sala
    playerName: "Bot",              // Nome do host (ignorado se noPlayer: true)
    maxPlayers: 16,                 // Número máximo de jogadores
    public: false,                  // true = sala aparece na lista pública
    noPlayer: true,                 // Recomendado: remove o player host
    password: "",                   // Senha da sala (opcional)
    token: "",                      // Token para pular reCAPTCHA
    geo: {                          // Geolocalização (opcional)
        code: "BR",
        lat: -23.5505,
        lon: -46.6333
    }
};
```

### Principais Métodos do Room Object

#### Gerenciamento de Jogadores
```javascript
room.getPlayerList()                          // Retorna lista de jogadores
room.getPlayer(playerId)                      // Retorna jogador específico
room.kickPlayer(playerId, reason, ban)        // Expulsa jogador
room.setPlayerAdmin(playerId, admin)          // Define admin
room.setPlayerTeam(playerId, team)            // Move jogador (0=spec, 1=red, 2=blue)
room.setPlayerAvatar(playerId, avatar)        // Define avatar customizado
```

#### Controle de Jogo
```javascript
room.startGame()                              // Inicia o jogo
room.stopGame()                               // Para o jogo
room.pauseGame(pauseState)                    // Pausa/despausa
room.setScoreLimit(limit)                     // Define limite de pontuação
room.setTimeLimit(limitInMinutes)             // Define limite de tempo
room.setDefaultStadium(stadiumName)           // Define estádio padrão
room.setCustomStadium(stadiumFileContents)    // Define estádio customizado
```

#### Comunicação
```javascript
room.sendChat(message, targetId)              // Envia mensagem de chat
room.sendAnnouncement(msg, targetId, color, style, sound)  // Envia anúncio
```

#### Informações de Jogo
```javascript
room.getScores()                              // Retorna placar atual
room.getBallPosition()                        // Retorna posição da bola
room.getDiscProperties(discIndex)             // Propriedades de um disco
room.getPlayerDiscProperties(playerId)        // Propriedades do disco do jogador
```

### Principais Eventos

```javascript
// Eventos de Jogadores
room.onPlayerJoin = function(player) { }
room.onPlayerLeave = function(player) { }
room.onPlayerChat = function(player, message) { }
room.onPlayerAdminChange = function(changedPlayer, byPlayer) { }
room.onPlayerTeamChange = function(changedPlayer, byPlayer) { }
room.onPlayerKicked = function(kickedPlayer, reason, ban, byPlayer) { }
room.onPlayerActivity = function(player) { }

// Eventos de Jogo
room.onGameStart = function(byPlayer) { }
room.onGameStop = function(byPlayer) { }
room.onGamePause = function(byPlayer) { }
room.onGameUnpause = function(byPlayer) { }
room.onGameTick = function() { }  // 60 vezes por segundo
room.onPositionsReset = function() { }

// Eventos de Pontuação
room.onTeamGoal = function(team) { }
room.onTeamVictory = function(scores) { }
room.onPlayerBallKick = function(player) { }

// Outros Eventos
room.onRoomLink = function(url) { }
room.onStadiumChange = function(newStadiumName, byPlayer) { }
room.onTeamsLockChange = function(locked, byPlayer) { }
room.onKickRateLimitSet = function(min, rate, burst, byPlayer) { }
```

## 📝 Exemplo de Script da Sala

Veja o arquivo completo em `src/rooms/example-room.js`. Aqui está um exemplo básico:

```javascript
const roomConfig = {
    roomName: "Minha Sala",
    maxPlayers: 12,
    public: false,
    noPlayer: true,
    token: "seu-token-aqui"
};

const room = HBInit(roomConfig);

room.setDefaultStadium("Classic");
room.setScoreLimit(3);
room.setTimeLimit(3);

room.onPlayerJoin = function(player) {
    room.sendAnnouncement(`Bem-vindo, ${player.name}!`, player.id, 0x00FF00);
};

room.onPlayerChat = function(player, message) {
    if (message === "!help") {
        room.sendAnnouncement("Comandos: !help, !bb, !afk", player.id);
        return false; // Bloqueia a mensagem
    }
    return true; // Permite a mensagem
};

room.onTeamGoal = function(team) {
    const scores = room.getScores();
    room.sendAnnouncement(`Gol! ${scores.red} x ${scores.blue}`);
};
```

## 🎮 Comandos Disponíveis (Sala Exemplo)

- `!help` - Mostra lista de comandos
- `!bb` ou `!bye` - Sair da sala
- `!afk` - Move para espectadores

### Comandos de Admin:
- `!reset` - Reinicia o jogo
- `!pause` - Pausa o jogo

## 🛠️ Estrutura do Projeto

```
haxball-server/
├── src/
│   ├── index.js                 # Inicializador principal do servidor
│   └── rooms/
│       └── example-room.js      # Script de exemplo da sala
├── package.json
├── README.md
└── .gitignore
```

## 🔧 Configurações Avançadas

### Executar com DevTools (Debug)

Edite `src/index.js` e altere as opções:

```javascript
const { browser, page } = await initHaxballServer(roomScriptFile, {
    headless: false,  // Mostra o navegador
    devtools: true    // Abre DevTools automaticamente
});
```

### Customizar argumentos do Chrome

```javascript
const { browser, page } = await initHaxballServer(roomScriptFile, {
    args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-features=WebRtcHideLocalIpsWithMdns'
    ]
});
```

## 🐛 Troubleshooting

### Erro: "Token inválido ou expirado"
- Gere um novo token em: https://www.haxball.com/headlesstoken
- Os tokens expiram após alguns minutos

### Erro: "Unable to connect"
- Verifique sua conexão com a internet
- Confirme que o site do Haxball está acessível

### Chrome 78+ WebRTC
Se estiver usando Chrome 78 ou superior em um VPS, desabilite o recurso:
```javascript
args: ['--disable-features=WebRtcHideLocalIpsWithMdns']
```

## 📚 Recursos Adicionais

- [Documentação Oficial da API Headless](https://github.com/haxball/haxball-issues/wiki/Headless-Host)
- [Haxball Headless Manager (HHM)](https://github.com/saviola777/haxball-headless-manager)
- [Exemplos de Scripts](https://github.com/haxball/haxball-issues/tree/master/headless/examples)

## 📄 Licença

MIT

## 👤 Autor

Desenvolvido com base na API oficial do Haxball Headless Host.

## 🤝 Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para:

1. Fork o projeto
2. Criar uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abrir um Pull Request

## ⭐ Agradecimentos

- Equipe do Haxball pela API Headless
- Comunidade Haxball pelos exemplos e documentação
