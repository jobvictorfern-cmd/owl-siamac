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
