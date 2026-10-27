# Ativos visuais do OWL

## Ticket com fotos — 27/10/2026

Referência fornecida pelo usuário: `siamacret145653030720246383.pdf`, três páginas. O HTML adapta o modelo para uma folha de resumo com quatro fotos no hero e dois anexos com todas as oito fotos em “Ampliar ticket”. Cabeçalhos usam exclusivamente `siamac-logo.webp`; os dados textuais foram substituídos por exemplos, com os mesmos pesos e veículo da animação. Fotos e datas impressas nas imagens são ilustrativas, conforme aviso nas páginas.

As imagens JPEG G3–G6 e G8–G11 do PDF foram extraídas sem recodificação, preservadas byte a byte em `dist/assets/ticket-entrada-1.jpg` a `ticket-entrada-4.jpg` e `ticket-saida-1.jpg` a `ticket-saida-4.jpg`. Dimensões: 1280 × 720. As versões `*-preview.webp` das câmeras 1 e 2 foram redimensionadas para 640 × 360 e codificadas em WebP sem perdas adicionais, mantendo a proporção; as quatro prévias totalizam 1.078.182 bytes. Os originais só são inseridos no diálogo ao abrir a ampliação, com carregamento preguiçoso.

## Lactalis Brasil — 27/10/2026

Logo adicionado à faixa de clientes a pedido do usuário. Origem oficial: https://www.lactalis.com.br/wp-content/themes/lactalis/assets/images/logo.svg (site https://www.lactalis.com.br/). Arquivo publicado: `dist/assets/client-lactalis.svg`, com as proporções e o enquadramento do SVG oficial preservados. A imagem PNG embutida foi recodificada em WebP sem perdas, com igualdade exata dos pixels RGBA verificada: o SVG passou de 72.254 para 25.003 bytes. O perfil de cor foi preservado. O original está em `source-assets/client-lactalis-original.svg`.

## Conector USB fotorealista — 27/10/2026

`dist/assets/usb-connector-photo.png` substitui o plugue desenhado em SVG. Ativo gerado com a ferramenta nativa `image_gen.imagegen`, 1774 × 887 px, com canal alfa verificado. A imagem apresenta borracha texturizada, símbolo em baixo-relevo e carcaça metálica. A composição SVG recorta somente o excesso de cabo reto; o PNG original permanece intacto. A ponta mantém o trajeto, rotação, máscara atrás do indicador e movimento de encaixe. A espessura do fio é recalculada com base no diâmetro da fotografia, evitando descontinuidade na junção. O acabamento e a sombra do fio foram suavizados para combinar com o novo ativo.

Prompt final (geração nativa, sem CLI):

> Use case: product-mockup. Create one exceptionally photorealistic macro product photograph of a standard USB-A male connector on a black data cable, isolated on a genuinely transparent alpha background. This is a website animation asset that must look like a real photographed industrial USB cable, not an icon, cartoon, vector or 3D illustration. Landscape canvas, ideally 1536x1024. Axis perfectly horizontal, cable enters from the LEFT, exposed silver USB-A metal tip points to the RIGHT. Slight top view showing the broad top face and a narrow side edge, orthographic-like telephoto perspective with almost no foreshortening; keep the whole cable and plug centerline horizontal. Include a short perfectly STRAIGHT black cable tail to the left, ending cleanly inside the canvas; all of the object must fit with generous transparent margins. The cable is a round 4 mm matte black PVC jacket with very fine natural texture. Physically correct molded connector: tapered black rubber strain relief with 4-5 shallow real grooves, a modest rectangular black grip with softly chamfered edges and fine grained molding texture, an extremely subtle BLACK embossed USB trident (no white printed symbol), and an exposed brushed stainless steel rectangular USB-A male shell with the correct two retention holes, rolled edges, tiny manufacturing marks and a dark internal tongue. Use credible real proportions: grip about 25 mm long x 12 mm broad, exposed metal about 12 mm long x 12 mm broad, straight tail about 18 mm long. Avoid an oversized puffy grip. Photographic microdetail and restrained diffuse studio reflections, black material should stay deep charcoal, not light gray or shiny plastic; silver real metal, not white. Light from upper-left consistent with a laptop product photo. Sharp focus across the whole connector; no bloom, no vignette, no artificial drop shadow, no cast shadow detached from the object. No background, ground, laptop, other connectors, labels, brand names or watermark. One real-looking cable connector only, clean transparent cutout.

## Interface em alta resolução — 27/10/2026

Ativo atual: `dist/assets/owl-interface-hd.png`, 1616 × 973 px. Reconstrução com a ferramenta nativa `image_gen.imagegen`, usando como alvo a captura `codex-clipboard-45f023ea-3743-4382-a0d4-ca1d990ae63d.png` enviada pelo usuário. A área útil anterior tinha cerca de 821 × 495 px, dentro da fotografia do monitor. A nova imagem contém apenas a interface e substitui esse recorte no notebook, na transição para tela plana e na apresentação do produto. A leitura de peso continua sendo texto HTML sincronizado à animação. O arquivo original `owl-official.webp` foi preservado.

É uma reconstrução ilustrativa, não uma nova captura oficial: tipografia, ícones e pequenos caracteres podem variar em relação à fonte. Prompt utilizado: restaurar e ampliar a captura preservando os painéis, cores, tabela e dados; tornar letras e bordas nítidas; remover apenas o cursor fotografado; produzir somente a interface plana, sem monitor ou margens. Foram especificados os rótulos, valores e linhas da tabela. O prompt completo acompanha a imagem entregue como `owl-interface-prompt.txt`. Dimensão solicitada no prompt: 3744 × 2256; dimensão efetivamente entregue pela ferramenta: 1616 × 973.

## Ativos atuais — seta e notebook USB

O ativo anterior da balança foi substituído por `dist/assets/weighbridge-flatend.webp`: edição localizada com `image_gen.imagegen`, fundo transparente. O notebook é `dist/assets/owl-laptop.webp`, gerado com a mesma ferramenta nativa e canal alfa. Os PNGs originais foram otimizados em WebP para a página. A tela do OWL é aplicada por HTML/CSS usando `owl-official.webp`; o cabo vetorial encontra a ponta do cabo fotografado. A rampa pequena traseira foi removida, mantendo a frontal.

### Prompt da edição da balança

> Use case: precise-object-edit. EDIT TARGET image 1 is the transparent isolated road weighbridge, 1536x1024. Image 2 is ONLY a location guide: the red rectangle marks the SMALL TRIANGULAR CONCRETE RAMP AT THE FAR RIGHT END that must be removed. Remove only that small far-right concrete wedge and its narrow yellow sloping curb, beyond the final vertical black steel end of the weighing deck. End the flat steel deck cleanly at its existing right vertical end. Make the removed wedge area genuinely transparent. Preserve the large lower-left foreground approach ramp, all remaining concrete supports, the entire long deck, its yellow edges, all exact positions, size, perspective, materials, lighting, transparency and framing. Do not rotate, rescale, reposition or redesign the weighbridge. Output only the weighbridge cutout, no truck, no cable, no annotation, no red rectangle, no new background. Match the original canvas and photographic detail. Exact localized deletion, everything else unchanged.

### Prompt do notebook

> Use case: product-mockup. Create a highly photorealistic premium generic Windows business notebook computer, open about 105 degrees, isolated on a genuinely transparent alpha background, landscape 1536x1024 canvas. Low, nearly frontal three-quarter view from slightly front-left, so the LEFT side USB-A port and the keyboard are visible, with only mild perspective distortion. Real charcoal aluminum chassis, thin black screen bezel, crisp keyboard keys, broad trackpad, subtle realistic material wear, no visible brand or logo. The display is BLANK uniform dark charcoal, with no UI, no text, no graphics and minimal reflections; the exact software will be composited onto it by code. Important USB detail: a physically accurate black USB-A data plug is ALREADY INSERTED into the notebook's LEFT side USB-A port, with realistic molded strain relief and a short black round cable tail curving left for about 100 source-image pixels; the free end of this short tail stops inside the image at least 60 pixels from the left border so a longer cable can be joined by code. Cable thickness around 10–12 source-image pixels, no glowing cable or floating parts. Show the complete laptop, base, feet, keyboard and inserted connector; leave at least 6% transparent padding around all edges. Center the whole device within the canvas, laptop fills roughly 85% width; display upper area large enough for a readable industrial desktop application. Soft neutral daylight, restrained contact shadow directly beneath device, transparent elsewhere. No ground scene, no table, no people, no decorations, no extra devices, no watermark. Real commercial hardware photography, not illustration.



## Histórico: imagem anterior da balança

Arquivo da revisão anterior: `dist/assets/weighbridge-complete.webp`.

Modo: edição com a ferramenta nativa `image_gen.imagegen`, com `transparent_background: true`. A balança original foi usada como alvo e a fotografia do caminhão como referência de perspectiva. O caminhão não foi incorporado ao novo ativo; continua em camada separada. A imagem selecionada foi otimizada em WebP, preservando o canal alfa.

Prompt final utilizado:

> Use case: precise-object-edit. Edit image 1, the isolated weighbridge, fixing ONLY its incomplete approach ramps and framing. Image 2 is a perspective reference for a truck that will be composited by code; output NO truck. CRITICAL geometry: retain the very shallow receding angle of image 1. The near long yellow deck rail rises ONLY about 65 pixels from left to right across approximately 1000 pixels of length, roughly 4 degrees, NOT a steep diagonal. The black steel supports stay vertical. Make the FLAT LOAD-BEARING DECK EXTRA LONG, about 18 metres, and BOTH concrete ramps SHORT, about 3 metres each: each ramp's projected length less than one quarter of the main deck. Do not make a huge wide foreground ramp. Show the ENTIRE lower-left concrete ramp and the ENTIRE upper-right ramp, all outer edges, with at least 5 percent genuinely transparent padding on every side. Concrete, black steel beams and yellow curbs same realistic materials as image 1. Suggested photographic image coordinates on a 1536x1024 landscape transparent canvas: long NEAR yellow deck edge from roughly (470,740) to (1380,680), FAR deck edge from (280,680) to (1240,620); complete short near concrete ramp ends around x100 to x330, y800, not beyond the canvas. The image should be a low three-quarter industrial product photo, viewed from near/front left, matching the truck reference's low camera and shallow perspective. Keep the deck around the lower third of the image with transparent space above for the truck. Crisp realistic steel/concrete detail, soft neutral daylight, only restrained contact shadow immediately under the structure. ACTUAL TRANSPARENT ALPHA, no black background, no ground plane, no scenery, no vehicle, no cable, no text, no logo.

Os valores métricos no prompt orientam a aparência da ilustração e não representam dimensões verificadas de um produto SIAMAC. O ativo não deve ser apresentado como uma fotografia documental de instalação real.



## Logos dos clientes — 27/10/2026

Os 20 logos foram obtidos da seção de clientes de https://siamac.com.br/software-de-pesagem-owl/ e conferidos com a referência enviada. Os PNGs originais são servidos localmente, com cores e proporções preservadas. A segunda sequência é decorativa e oculta para leitores de tela.

| Cliente | Arquivo local | Origem |
| --- | --- | --- |
| Cerbras | `dist/assets/client-cerbras.png` | https://siamac.com.br/wp-content/uploads/2020/06/lg-5.png |
| MARS | `dist/assets/client-mars.png` | https://siamac.com.br/wp-content/uploads/2024/02/logoo.png |
| DOIS A | `dist/assets/client-doisa.png` | https://siamac.com.br/wp-content/uploads/2024/02/log-2.png |
| Kerry | `dist/assets/client-kerry.png` | https://siamac.com.br/wp-content/uploads/2024/02/log-3.png |
| RHI Magnesita | `dist/assets/client-rhi-magnesita.png` | https://siamac.com.br/wp-content/uploads/2024/02/lkogo-3.png |
| Yamana Gold | `dist/assets/client-yamana-gold.png` | https://siamac.com.br/wp-content/uploads/2024/02/lg-9.png |
| CBAA Asfaltos | `dist/assets/client-cba.png` | https://siamac.com.br/wp-content/uploads/2024/02/lg-8.png |
| Roca | `dist/assets/client-roca.png` | https://siamac.com.br/wp-content/uploads/2020/06/lg-2.png |
| Carapreta | `dist/assets/client-carapreta.png` | https://siamac.com.br/wp-content/uploads/2024/02/lkogo-1.png |
| Ream Refinaria da Amazônia | `dist/assets/client-ream.png` | https://siamac.com.br/wp-content/uploads/2020/06/lg-4.png |
| MG Óxidos | `dist/assets/client-mg-oxidos.png` | https://siamac.com.br/wp-content/uploads/2020/06/logo-9.png |
| JCB | `dist/assets/client-jcb.png` | https://siamac.com.br/wp-content/uploads/2020/06/lg-7.png |
| Eternit | `dist/assets/client-eternit.png` | https://siamac.com.br/wp-content/uploads/2020/06/lg-6.png |
| Petrobras | `dist/assets/client-petrobras.png` | https://siamac.com.br/wp-content/uploads/2024/02/lkogo-2.png |
| Laticínios Davaca | `dist/assets/client-davaca.png` | https://siamac.com.br/wp-content/uploads/2020/06/logo-4.png |
| Massa Fort | `dist/assets/client-massa-fort.png` | https://siamac.com.br/wp-content/uploads/2020/06/logo-5.png |
| PepsiCo | `dist/assets/client-pepsico.png` | https://siamac.com.br/wp-content/uploads/2020/06/pepsico.png |
| Prefeitura de Salvador | `dist/assets/client-salvador.png` | https://siamac.com.br/wp-content/uploads/2020/06/logo-6.png |
| ArcelorMittal | `dist/assets/client-arcelormittal.png` | https://siamac.com.br/wp-content/uploads/2020/06/logo-1.png |
| Grupo Bauminas | `dist/assets/client-bauminas.png` | https://siamac.com.br/wp-content/uploads/2024/02/log-1.png |

## Modelo de ticket SIAMAC — 27/10/2026

Layout baseado na imagem de ticket enviada pelo usuário (`codex-clipboard-d69caa63-ff96-4198-883d-53768ede391f.png`). Recriado em HTML/CSS em `dist/index.html`, com o logo SIAMAC já existente, sem editar ou incorporar a imagem raster. A marca diagonal foi omitida conforme solicitado. Os campos novos são exemplos fictícios; CPF mascarado. Os pesos foram ajustados aos da animação: inicial de 28.840 kg, final de 32.840 kg e líquido de 4.000 kg.

## Pop-ups da finalização no OWL — 27/10/2026

As capturas `codex-clipboard-94e57d6f-ad3e-48d2-bc38-232650ad7b2e.png` e `codex-clipboard-1ac35932-6017-4823-9d73-6da1a4ceaf56.png`, fornecidas pelo usuário, orientaram a reconstrução dos pop-ups em HTML/CSS. Não são imagens editadas nem uma conexão com o programa. Placas, pesos e cadastro correspondem ao ticket demonstrativo. O fundo é a interface oficial já utilizada no notebook, sem novo ativo raster. A transição projeta os quatro cantos da tela do notebook até a interface plana.

## Cabo com ponta USB e encaixe — 27/10/2026

Ativo da animação: `dist/assets/owl-laptop-unplugged.png`, 1536 × 1024 px, editado com a ferramenta nativa `image_gen.imagegen`, fundo transparente. Foram removidos apenas o plugue e o cabo fotografados; o notebook manteve o enquadramento e passou a ter uma porta vazia. O ativo anterior permanece na apresentação do produto. A tela continua em camada independente.

O cabo é desenhado em SVG; a ponta utiliza uma fotografia com fundo transparente. A máscara da carcaça oculta a origem do cabo por trás do indicador. A sequência é reversível pela rolagem.

Prompt da edição do notebook:

> Use case: precise-object-edit. EDIT TARGET: supplied transparent photograph of a dark gray laptop, blank dark screen, 1536x1024. Remove ONLY the black USB plug and its short curving cable at the left side, approximately x25–278 y726–800. Reconstruct the tiny left side edge of the laptop where the plug was inserted, leaving an EMPTY realistic USB-A socket there. Keep the separate existing empty port just below/right of it. Make removed plug/cable pixels genuinely transparent, preserving the subtle natural contact shadow beneath the computer. CRITICAL: preserve the EXACT 1536x1024 canvas, all laptop pixel positions, silhouette, screen corners, viewing angle, perspective, keyboard, trackpad, lighting, material, and existing transparency. Do not shift, rescale, rotate or redesign anything. The laptop screen must remain blank and dark, no screen content, UI, text, new logos or watermark. Output the identical laptop hardware with no USB cable or connector attached. This is a tightly localized object removal, not a new laptop design. The source image's screen corner coordinates and frame proportions will be used by a website perspective projection, so retaining them exactly is essential.

## Perspectiva e inserção na porta USB — 27/10/2026

Ativo atual: `dist/assets/usb-connector-perspective.png`, 1774 × 887 px, gerado com `image_gen.imagegen`, com transparência. A fotografia já contém a vista superior e a lateral espessa do conector, na orientação do notebook. A perspectiva transversal é alinhada à porta sem reduzir a altura do plugue. A rotação acompanha o cabo, preservando o relevo e a espessura da fotografia.

A âncora traseira corresponde a (450, 500) e o centro do ombro a (1380, 431) na fotografia. O ombro termina no centro da porta, (248, 754) no notebook de 1536 × 1024. A máscara de oclusão fica fixa no notebook, nos pontos (239, 738) e (256, 755) da abertura. Ela oculta somente a parte do plugue que entra na carcaça; o recorte não acompanha o conector. O corpo de borracha e um pequeno colar metálico permanecem visíveis. O conector passa em camada própria acima do notebook, enquanto a origem continua atrás do indicador. A inserção ocorre entre 72% e 86% do trecho USB; a câmera se afasta após 88%.

O prompt completo está em `docs/usb-connector-prompt.txt`; o ativo está em `dist/assets/usb-connector-perspective.png`.

## Vídeo da automação — 27/10/2026

Vídeo fornecido pelo usuário: https://www.youtube.com/watch?v=2ng8tgBNU6s — automação de balanças rodoviárias na CERBRAS com SIAMAC. Incorporado na seção `automacao` pelo player `youtube-nocookie.com`, sem reprodução automática, com controles e tela cheia. A proporção 16:9 se adapta à largura disponível. O arquivo não foi baixado nem reeditado.

## Ícone do WhatsApp — 27/10/2026

Desenho SVG do Bootstrap Icons: https://github.com/twbs/icons/blob/main/icons/whatsapp.svg. Incorporado ao símbolo `i-chat`, com preenchimento sólido e sem contorno adicional. Licença MIT preservada em `dist/assets/bootstrap-icons-LICENSE.txt`. Também utilizado no botão flutuante do WhatsApp.

## Otimização para publicação — 27/10/2026

Os PNGs citados acima foram preservados em `source-assets/`. O site utiliza suas versões WebP sem perda de pixels. Ativos antigos sem uso também foram preservados nessa pasta, fora da publicação. A fonte Manrope usa WOFF2. Detalhes da conversão, da capa do vídeo e do carregamento sob demanda estão em `docs/performance.md`.
