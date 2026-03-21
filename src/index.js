const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

/**
 * Inicializa um servidor Haxball headless usando Puppeteer
 * @param {string} roomScriptFile - Caminho para o arquivo do script da sala
 * @param {object} options - Opções adicionais de configuração
 */
async function initHaxballServer(roomScriptFile, options = {}) {
    const {
        headless = 'new',
        devtools = false,
        args = ['--no-sandbox', '--disable-setuid-sandbox']
    } = options;

    console.log('🚀 Iniciando servidor Haxball...');

    const getRoomLinkFromContext = async (context) => {
        const selectors = ['#roomlink a', '#roomlink'];

        for (const selector of selectors) {
            try {
                const link = await context.$eval(selector, el => {
                    if (el.tagName === 'A') {
                        return el.getAttribute('href') || el.textContent;
                    }

                    const anchor = el.querySelector('a');
                    if (anchor) {
                        return anchor.getAttribute('href') || anchor.textContent;
                    }

                    return el.textContent;
                });

                if (link && typeof link === 'string' && link.includes('haxball.com/play?c=')) {
                    return link.trim();
                }
            } catch (err) {
                // Selector não disponível nesse contexto, tenta o próximo.
            }
        }

        return null;
    };

    const waitForRoomLink = async (page) => {
        const deadline = Date.now() + 20000;

        while (Date.now() < deadline) {
            const frames = page.frames();

            for (const frame of frames) {
                const roomLink = await getRoomLinkFromContext(frame);
                if (roomLink) {
                    return roomLink;
                }
            }

            const pageRoomLink = await getRoomLinkFromContext(page);
            if (pageRoomLink) {
                return pageRoomLink;
            }

            await page.waitForTimeout(500);
        }

        return null;
    };
    
    const browser = await puppeteer.launch({
        headless,
        devtools,
        args
    });
    
    const page = await browser.newPage();
    
    // Logs do console do navegador
    page.on('console', msg => {
        const type = msg.type();
        const text = msg.text();
        
        if (type === 'error') {
            console.error('❌ [Console Error]:', text);
        } else if (type === 'warning') {
            console.warn('⚠️  [Console Warning]:', text);
        } else if (text.includes('Room link:') || text.includes('🔗')) {
            console.log('✅', text);
        } else {
            console.log('📝 [Console]:', text);
        }
    });

    // Tratamento de erros de página
    page.on('pageerror', error => {
        console.error('❌ [Page Error]:', error.message);
    });

    try {
        console.log('🌐 Conectando ao Haxball headless...');
        await page.goto('https://www.haxball.com/headless', {
            waitUntil: 'networkidle2',
            timeout: 30000
        });
        
        console.log('📄 Carregando script da sala...');
        
        // Lê o script da sala
        const roomScript = fs.readFileSync(roomScriptFile, { encoding: 'utf-8' });
        
        // Injeta o script no navegador
        await page.evaluate(roomScript);
        
        // Aguarda o iframe carregar
        console.log('⏳ Aguardando inicialização da sala...');
        await page.waitForTimeout(2000);

        // Verifica se há recaptcha (token inválido/expirado)
        const elementHandle = await page.$('iframe');
        if (elementHandle) {
            const frame = await elementHandle.contentFrame();

            if (frame) {
                try {
                    const recaptcha = await frame.$('#recaptcha');
                    if (recaptcha) {
                        const recaptchaContent = await frame.$eval('#recaptcha', e => e.innerHTML);
                        if (recaptchaContent && recaptchaContent.trim()) {
                            throw new Error('Token inválido ou expirado. Obtenha um novo token em: https://www.haxball.com/headlesstoken');
                        }
                    }
                } catch (err) {
                    // Se não encontrar recaptcha, continua normalmente
                }
            }
        }

        const roomLink = await waitForRoomLink(page);
        if (roomLink) {
            console.log('\n✅ Sala aberta com sucesso!');
            console.log('🔗 Link da sala:', roomLink);
            console.log('\n💡 A sala está rodando. Pressione Ctrl+C para encerrar.\n');
        } else {
            console.log('⚠️  Sala iniciada, mas não foi possível obter o link automaticamente.');
        }

        // Mantém o processo rodando
        return { browser, page };
        
    } catch (error) {
        console.error('❌ Erro ao inicializar servidor:', error.message);
        await browser.close();
        throw error;
    }
}

/**
 * Função principal
 */
async function main() {
    const args = process.argv.slice(2);
    
    if (args.length < 1) {
        console.error('❌ Uso: node src/index.js <arquivo-script-sala.js>');
        console.error('📝 Exemplo: node src/index.js src/rooms/example-room.js');
        process.exit(1);
    }

    const roomScriptFile = path.resolve(args[0]);
    
    if (!fs.existsSync(roomScriptFile)) {
        console.error(`❌ Arquivo não encontrado: ${roomScriptFile}`);
        process.exit(1);
    }

    try {
        const { browser, page } = await initHaxballServer(roomScriptFile, {
            headless: 'new',
            devtools: false
        });

        // Tratamento de sinais para encerramento gracioso
        process.on('SIGINT', async () => {
            console.log('\n\n🛑 Encerrando servidor...');
            await browser.close();
            console.log('✅ Servidor encerrado com sucesso.');
            process.exit(0);
        });

        process.on('SIGTERM', async () => {
            console.log('\n\n🛑 Encerrando servidor...');
            await browser.close();
            console.log('✅ Servidor encerrado com sucesso.');
            process.exit(0);
        });

    } catch (error) {
        console.error('❌ Falha ao iniciar servidor:', error.message);
        process.exit(1);
    }
}

// Executa apenas se for o arquivo principal
if (require.main === module) {
    main();
}

module.exports = { initHaxballServer };
