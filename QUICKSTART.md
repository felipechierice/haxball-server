# 🚀 Quick Start Guide

## ⚡ Início Rápido (Matchmaking 3x3)

O jeito mais rápido de começar com o sistema de matchmaking automático:

```bash
# 1. Instalar dependências
npm install

# 2. Obter token
# Acesse: https://www.haxball.com/headlesstoken
# Copie o token gerado

# 3. Editar sala
# Abra src/rooms/matchmaking-3v3.js
# Cole o token na linha: token: ""

# 4. Executar servidor
npm start
```

**🎮 Pronto!** Sua sala de matchmaking 3x3 automático está rodando!

📚 **Guia Completo:** [MATCHMAKING-GUIDE.md](MATCHMAKING-GUIDE.md)

---

## 📋 Outras Salas Disponíveis

### Sala Simples (Teste Rápido)
```bash
node src/index.js src/rooms/simple-room.js
```

### Sala Completa (Exemplo)
```bash
npm run example
```

### Sistema de Admin Avançado
```bash
npm run admin
```

### Sala Profissional
```bash
npm run pro
```

## Instalação Rápida

```bash
# 1. Instalar dependências
npm install

# 2. Obter token
# Acesse: https://www.haxball.com/headlesstoken
# Copie o token gerado

# 3. Editar sala
# Abra src/rooms/example-room.js
# Cole o token na linha: token: ""

# 4. Executar servidor
npm start
```

## 📁 Estrutura de Arquivos

```
haxball-server/
├── src/
│   ├── index.js                    # Servidor principal (Puppeteer)
│   ├── config.example.js           # Exemplo de configuração
│   ├── rooms/
│   │   ├── example-room.js         # Sala completa com comandos
│   │   ├── simple-room.js          # Sala simples para testes
│   │   ├── admin-system.js         # Sistema avançado de admin
│   │   └── professional-room.js    # Sala profissional completa
│   └── utils/
│       └── helpers.js              # Funções auxiliares
├── package.json
├── README.md                       # Documentação completa
└── .gitignore
```

## 🎮 Exemplos de Uso

### Sala Simples (Teste Rápido)
```bash
node src/index.js src/rooms/simple-room.js
```

### Sala Completa (Recomendado)
```bash
node src/index.js src/rooms/example-room.js
```

### Sala com Admin System
```bash
node src/index.js src/rooms/admin-system.js
```

### Sala Profissional
```bash
node src/index.js src/rooms/professional-room.js
```

## ⚙️ Configuração Básica

Edite qualquer arquivo em `src/rooms/` e modifique:

```javascript
const roomConfig = {
    roomName: "Seu Nome Aqui",      // Nome da sala
    maxPlayers: 16,                  // Máximo de jogadores
    public: false,                   // true = aparece na lista
    token: "SEU_TOKEN_AQUI"          // Token do Haxball
};
```

## 🔑 Obtendo Token

1. Acesse: https://www.haxball.com/headlesstoken
2. Resolva o reCAPTCHA
3. Copie o token
4. Cole no arquivo da sala
5. Execute o servidor

**Importante:** Tokens expiram após alguns minutos!

## 📋 Comandos Disponíveis (example-room.js)

### Jogadores
- `!help` - Lista de comandos
- `!afk` - Vai para espectadores
- `!bb` - Sair da sala

### Admins
- `!reset` - Reinicia o jogo
- `!pause` - Pausa o jogo

## 🐛 Problemas Comuns

### "Token inválido ou expirado"
→ Gere um novo token em: https://www.haxball.com/headlesstoken

### "Unable to connect"
→ Verifique sua conexão com a internet

### Sala não abre
→ Confirme que o token está correto no arquivo da sala

### Chrome/Puppeteer não encontrado
→ Execute: `npm install` novamente

## 📚 Documentação Completa

Veja `README.md` para documentação completa da API Haxball.

## 🎯 Próximos Passos

1. ✅ Instale as dependências: `npm install`
2. ✅ Obtenha um token: https://www.haxball.com/headlesstoken
3. ✅ Edite uma sala e adicione o token
4. ✅ Execute: `npm start`
5. ✅ Compartilhe o link da sala com amigos!

## 💡 Dicas

- Tokens expiram rápido - gere um novo sempre que iniciar
- Use `simple-room.js` para testes rápidos
- Use `example-room.js` para sala completa
- Personalize os comandos e eventos conforme necessário
- Veja `helpers.js` para funções úteis

## 🤝 Suporte

- Documentação oficial: https://github.com/haxball/haxball-issues/wiki/Headless-Host
- Issues Haxball: https://github.com/haxball/haxball-issues

---

**Bom jogo! ⚽**
