# ⚽ Sistema de Matchmaking 3x3 Automático - Guia Completo

## 📋 Visão Geral

Este é um sistema completo de matchmaking automático para Haxball que gerencia partidas 3x3 de forma totalmente automática, incluindo balanceamento de times, sistema de votação e ranking de jogadores.

## 🚀 Como Usar

### Instalação e Execução

```bash
# 1. Obter token
# Acesse: https://www.haxball.com/headlesstoken

# 2. Adicionar token no arquivo
# Edite: src/rooms/matchmaking-3v3.js
# Linha: token: "SEU_TOKEN_AQUI"

# 3. Executar o servidor
npm start
# ou
npm run matchmaking
# ou
node src/index.js src/rooms/matchmaking-3v3.js
```

## ⚙️ Funcionalidades

### 1. 🎲 Matchmaking Automático

- **Início Automático**: Quando 2+ jogadores entram, o sistema inicia automaticamente
- **Times Aleatórios**: Distribui jogadores aleatoriamente entre os times (máx 3 por time)
- **Mínimo de Jogadores**: Pode começar com apenas 2 jogadores (1 em cada time)
- **Máximo por Time**: 3 jogadores por time (3x3)

### 2. ⚖️ Balanceamento Automático Durante Partida

#### Jogador Sai da Partida

Quando um jogador sai e os times ficam desbalanceados:

1. **Jogo é Pausado Automaticamente**
2. **Verifica Espectadores**:
   - Se houver espectadores suficientes → Adiciona automaticamente ao time com menos jogadores
   - Se não houver espectadores → Aguarda 10 segundos por novos jogadores

#### Tempo de Espera (10 segundos)

Durante os 10 segundos:
- Mostra contagem regressiva
- Se jogadores entrarem → Adiciona automaticamente e despausa
- Se o tempo acabar sem jogadores → Inicia votação

#### Caso Especial: Time Vazio

Se um time ficar completamente vazio (0 jogadores):
- Partida é finalizada imediatamente
- Novo matchmaking é iniciado automaticamente

### 3. 🗳️ Sistema de Votação

Ativado quando não há jogadores suficientes para balancear após 10 segundos.

#### Como Funciona

1. **Votação Iniciada**: Duração de 10 segundos
2. **Opções**:
   - `!sim` ou `!continuar` = Continuar com times desbalanceados
   - `!nao` ou `!finalizar` = Finalizar a partida
3. **Regras**:
   - Apenas jogadores em campo podem votar
   - Não votar = voto para continuar
   - Se **pelo menos 1 jogador** votar para finalizar → Partida é finalizada
   - Caso contrário → Partida continua

#### Resultado

- **Continuar**: Jogo despausa com times desbalanceados
- **Finalizar**: Jogo termina e novo matchmaking é iniciado

### 4. ➕ Adição de Jogadores Durante Partida

O sistema adiciona novos jogadores automaticamente **SEM PAUSAR** quando:

- Times estão balanceados (ex: 2x2)
- Times não estão completos (menos de 3 por time)
- Há pelo menos 2 espectadores disponíveis
- Adiciona 1 jogador para cada time simultaneamente

**Exemplo**: 
- Jogo 2x2 em andamento
- 2 jogadores entram como espectadores
- Sistema adiciona 1 para cada time → 3x3
- Jogo continua sem pausa

### 5. 🏆 Sistema de Ranking

#### Estatísticas Rastreadas

Para cada jogador:
- ⚽ **Gols marcados**
- 🎮 **Partidas jogadas**
- 🏆 **Vitórias**
- 💔 **Derrotas**
- 📈 **Taxa de vitória** (%)
- ⚡ **Média de gols por partida**

#### Detecção de Gols

O sistema detecta automaticamente quem fez o gol:
- Rastreia o último jogador que chutou a bola
- Atribui o gol ao jogador correto
- Exibe o nome do jogador ao anunciar o gol

### 6. 🤖 Sistema sem Admin Humano

- **Bot Admin**: Um jogador bot (`🤖 AutoRef`) é criado automaticamente
- **Admin Automático**: O bot tem permissões de admin para gerenciar a sala
- **Totalmente Automático**: Nenhuma intervenção humana necessária
- **Bot como Espectador**: O bot fica sempre como espectador, não participa dos jogos

## 📋 Comandos Disponíveis

### Comandos Gerais

```bash
!help          # Mostra lista de comandos
!top           # Top 10 artilheiros
!stats         # Suas estatísticas pessoais
!rank [nome]   # Estatísticas de um jogador específico
```

### Comandos de Votação

```bash
!sim           # Vota para continuar (durante votação)
!continuar     # Mesmo que !sim
!nao           # Vota para finalizar (durante votação)
!finalizar     # Mesmo que !nao
```

## 📊 Exemplos de Uso

### Exemplo 1: Início Normal

1. 4 jogadores entram na sala
2. Sistema sorteia: 2 para RED, 2 para BLUE
3. Jogo inicia automaticamente
4. Partida acontece normalmente

### Exemplo 2: Jogador Sai (com Espectadores)

1. Jogo 3x3 em andamento
2. 1 jogador do RED sai → 2x3
3. Sistema pausa o jogo
4. Há 1 espectador disponível
5. Sistema adiciona o espectador ao RED → 3x3
6. Jogo despausa automaticamente

### Exemplo 3: Jogador Sai (sem Espectadores)

1. Jogo 3x3 em andamento
2. 1 jogador do BLUE sai → 3x2
3. Sistema pausa o jogo
4. Não há espectadores
5. Sistema aguarda 10 segundos
6. Nenhum jogador entra
7. Votação é iniciada
8. Jogadores decidem continuar ou finalizar

### Exemplo 4: Adição Durante Jogo

1. Jogo 2x2 em andamento
2. 2 jogadores entram como espectadores
3. Sistema detecta que pode adicionar
4. Adiciona 1 para RED e 1 para BLUE → 3x3
5. Jogo continua sem pausa

### Exemplo 5: Ranking

```
Jogador: !top

━━━━━━━━━━━━━━━━━━━━━━━━━━
🏆 TOP 10 ARTILHEIROS
━━━━━━━━━━━━━━━━━━━━━━━━━━
🥇 João - 15 gols (10 jogos, 70% vitórias)
🥈 Maria - 12 gols (8 jogos, 62% vitórias)
🥉 Pedro - 10 gols (12 jogos, 50% vitórias)
4. Ana - 8 gols (6 jogos, 66% vitórias)
━━━━━━━━━━━━━━━━━━━━━━━━━━

Jogador: !stats

━━━━━━━━━━━━━━━━━━━━━━━━━━
📊 Estatísticas de João
━━━━━━━━━━━━━━━━━━━━━━━━━━
⚽ Gols: 15
🎮 Partidas: 10
🏆 Vitórias: 7
💔 Derrotas: 3
📈 Taxa de vitória: 70.0%
⚡ Gols/partida: 1.5
━━━━━━━━━━━━━━━━━━━━━━━━━━
```

## ⚙️ Configurações

Você pode ajustar as configurações editando o arquivo `matchmaking-3v3.js`:

```javascript
const CONFIG = {
    PLAYERS_PER_TEAM: 3,      // Jogadores por time (padrão: 3x3)
    MIN_PLAYERS_TO_START: 2,  // Mínimo para começar (padrão: 2)
    WAIT_TIMEOUT: 10000,      // Tempo de espera em ms (padrão: 10s)
    VOTE_TIMEOUT: 10000,      // Tempo de votação em ms (padrão: 10s)
    GOALS_TO_WIN: 3,          // Gols para vencer (padrão: 3)
    TIME_LIMIT: 5,            // Limite de tempo em minutos (padrão: 5)
    STADIUM: "Classic"        // Estádio padrão
};
```

## 🎯 Fluxograma Simplificado

```
INÍCIO
  ↓
2+ Jogadores entram
  ↓
Matchmaking Automático
  ↓
Times sorteados (até 3x3)
  ↓
JOGO INICIA
  ↓
┌─────────────────────────────────────┐
│ Durante o Jogo                       │
├─────────────────────────────────────┤
│ • Jogador sai?                      │
│   → Times desbalanceados?           │
│     → SIM: Pausa e balanceia        │
│     → NÃO: Continua                 │
│                                      │
│ • Novos jogadores (2+)?             │
│   → Times balanceados?              │
│   → Times incompletos?              │
│     → Adiciona sem pausar           │
└─────────────────────────────────────┘
  ↓
TIME VENCE
  ↓
Atualiza estatísticas
  ↓
Novo matchmaking (3s)
  ↓
VOLTA AO INÍCIO
```

## 🐛 Troubleshooting

### Jogo não inicia

- Verifique se há pelo menos 2 jogadores
- Confirme que o token está correto e não expirou

### Bot não aparece

- O bot aparece automaticamente como `🤖 AutoRef`
- Ele fica sempre como espectador
- Se não aparecer, reinicie o servidor

### Votação não funciona

- Apenas jogadores em campo podem votar
- Use `!sim` ou `!nao` durante os 10 segundos
- Não votar = voto para continuar

### Estatísticas não aparecem

- Estatísticas são salvas apenas na memória
- Se reiniciar o servidor, as stats são perdidas
- Para persistência, implemente salvamento em arquivo

## 🎮 Dicas de Uso

1. **Token**: Sempre gere um novo token antes de iniciar
2. **Público**: Configure `public: true` para sala aparecer na lista
3. **Teste Local**: Use `public: false` para testes privados
4. **Máximo de Jogadores**: Configure `maxPlayers` para controlar tamanho da sala
5. **Stats Persistentes**: Implemente salvamento em JSON se quiser manter stats

## 📚 Recursos Adicionais

- [API Haxball Headless](https://github.com/haxball/haxball-issues/wiki/Headless-Host)
- [Token Generator](https://www.haxball.com/headlesstoken)
- [Exemplos de Scripts](https://github.com/haxball/haxball-issues/tree/master/headless/examples)

---

**Desenvolvido com ❤️ para a comunidade Haxball**
