# Otimização de mídia e animação

- Os PNGs do conteúdo foram convertidos para WebP lossless, mantendo dimensões e transparência. A conversão foi verificada por igualdade dos pixels RGBA decodificados, incluindo pixels transparentes. O favicon permanece PNG.
- A fonte variável Manrope foi convertida de TTF para WOFF2, preservando glifos e eixos.
- As 24 imagens convertidas e a fonte passaram de 4.656.660 para 2.963.560 bytes: redução de 36,4%. Isso compara os arquivos, não o tempo de carregamento.
- Originais e alternativas antigas ficam em `source-assets/`, fora de `dist/` e do artefato publicado.
- A capa do vídeo vem da miniatura pública da SIAMAC (`https://i.ytimg.com/vi/2ng8tgBNU6s/maxresdefault.jpg`), convertida sem perda dos pixels decodificados para WebP de 1280 × 720. O vídeo original não foi baixado, reeditado ou recomprimido.
- O iframe do YouTube só é criado ao clicar em reproduzir. O player mantém controles, tela cheia e qualidade adaptativa; sem JavaScript, o link abre o vídeo no YouTube.
- Imagens da faixa de clientes e a capa do vídeo usam carregamento adiado; as imagens iniciais prioritárias permanecem antecipadas.
- A animação usa rolagem nativa e `requestAnimationFrame`, medidas de layout guardadas após redimensionamento, reaproveitamento de geometria e interrupção das atualizações quando a posição não muda. A faixa de clientes pausa fora da tela e quando a aba fica oculta.
- Em telas baixas na horizontal, cabeçalho, título e botões se ajustam para manter espaço para a animação. As unidades `svh` evitam saltos da barra do navegador, com alternativa `vh`.
- A preferência por movimento reduzido apresenta as seis etapas sem deslocamento da câmera entre elas. A faixa de clientes fica disponível para rolagem manual.

O botão flutuante abre `https://wa.me/5511918512948` com uma mensagem sobre teste do OWL e automação. O visitante revisa e envia a mensagem no WhatsApp.

## Prioridade de carregamento — PageSpeed, 27/10/2026

- A balança, elemento principal da primeira tela, recebe prioridade alta também no preload.
- Notebook, interface e conector USB das cenas seguintes começam a carregar depois da decodificação das imagens iniciais e de dois quadros de renderização, em uma tarefa ociosa. Se o visitante rolar antes disso, o carregamento começa imediatamente.
- As imagens são carregadas diretamente nos elementos finais, evitando uma segunda transferência em respostas sem cache. A animação só avança além do indicador depois de todas estarem prontas, continuando da posição de rolagem atual. A reconexão tenta novamente os recursos que falharam.
- As medidas da animação são recalculadas somente quando as dimensões mudam. O evento `pageshow` mede novamente ao restaurar a página do cache de navegação, sem refazer o layout ao terminar cada carregamento inicial.
- CSS e JavaScript são minificados no build; os fontes legíveis permanecem disponíveis. Nenhuma imagem, resolução, transparência, frame da sequência ou qualidade do vídeo foi reduzida.
- O teste inicial oficial do PageSpeed registrou 69 no celular (LCP 8,5 s) e 95 no computador (LCP 1,5 s). Após a priorização, registrou 97 e 100, respectivamente, com LCP de 2,5 s e 0,5 s. [Relatório inicial](https://pagespeed.web.dev/analysis/https-jobvictorfern-cmd-github-io-owl-siamac/q15fapob9r?form_factor=mobile) · [Primeiro reteste](https://pagespeed.web.dev/analysis/https-jobvictorfern-cmd-github-io-owl-siamac/szsyfwh75w?form_factor=mobile).
- São medições de laboratório do Lighthouse 13.5.0, com celular Moto G Power emulado e rede 4G lenta. Não havia dados de usuários reais no relatório. Os resultados variam entre execuções.
- Os avisos de payload e cache permanecem: os arquivos lossless são preservados e o GitHub Pages controla o tempo de cache HTTP. A melhoria vem principalmente da prioridade da primeira tela, não da remoção de mídia.
