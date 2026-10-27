# OWL — Landing page SIAMAC

Página mobile first em HTML, CSS e JavaScript puro. O conteúdo publicável está em `dist/`, sem framework. O build gera as versões minificadas de CSS e JavaScript.

## Sequência visual

O texto fica centralizado acima da animação, sem quebras de linha, e acompanha seis etapas: “Controle cada pesagem.”, “Peso direto da balança.”, “Informação no OWL.”, “Identifique o veículo.”, “Confirme a pesagem.” e “Pesagem registrada.”. A descrição também muda, inclusive ao voltar na rolagem. O espaço do botão com a logo do OWL permanece reservado dentro da tela durante a sequência. O enquadramento dos equipamentos se ajusta à altura disponível.

O caminhão entra e desacelera sobre a balança, sem inclinação de subida. A pequena rampa da extremidade traseira foi removida; a rampa frontal permanece. Os sete aros usam recortes fotográficos calibrados e o balanço da cabine na frenagem continua independente.

Uma seta azul reta sai da balança e chega ao indicador. A câmera acompanha o trajeto e revela o indicador apenas na chegada. Depois acompanha um cabo que sai por trás do indicador, com ponta USB visível durante o trajeto. O notebook aparece com a porta vazia antes da aproximação final; o conector se alinha e entra na porta. O cabo usa uma máscara para não atravessar a carcaça do indicador. A geometria e a posição da porta são recalculadas conforme o layout. A tela recebe uma reconstrução em alta resolução da interface do OWL, com leitura ilustrativa crescente. A tela se aproxima do notebook e passa à interface do OWL. Dois pop-ups recriados a partir das capturas enviadas mostram a digitação da placa e do reboque, a identificação do veículo, os pesos e o clique de confirmação. A sequência termina no ticket de 32.840 kg. Essa demonstração acompanha a rolagem nos dois sentidos e não executa operações reais no software. Após aparecer por inteiro, o ticket permanece fixo por um trecho curto de rolagem de 96 a 144 px, ajustado à altura disponível. Só depois a página avança para os clientes. A sequência inteira usa 19,15% menos rolagem que a distância original (ajuste mais recente: aumento de 5% sobre a escala de 0,77), mantendo todas as etapas e a pausa final separada, sem bloquear a rolagem nativa.

O ticket foi adaptado em HTML a partir do PDF com fotos enviado pelo usuário. A folha inteira do hero reúne os dados de exemplo, os três pesos e quatro fotos de entrada e saída, usando somente a marca SIAMAC no cabeçalho. A pesagem inicial é 28.840 kg, a final é 32.840 kg e o líquido é 4.000 kg, sincronizados com a animação. O produto demonstrado é cimento a granel. As fotos são ilustrativas, preservam suas datas originais e não representam os dados fictícios preenchidos. “Ampliar ticket” mostra a folha principal e dois anexos com as oito fotos originais do PDF, em 1280 × 720 px. Esses originais só recebem `src` quando o visitante abre a janela; as quatro prévias em WebP são carregadas com as mídias adiadas da animação, depois da primeira pintura. O enquadramento do papel, a rolagem e a pausa final permanecem os mesmos.

O mesmo notebook é usado na apresentação do produto. Sua tela é posicionada por transformação de perspectiva, usando a mesma reconstrução da interface exibida na animação. Os equipamentos e o caminhão são uma composição ilustrativa em camadas, sem conexão real ou simulação física 3D. A representação USB não define a compatibilidade de indicadores; a SIAMAC avalia a instalação.

A narrativa acompanha a rolagem nativa e oferece seis etapas clicáveis abaixo da animação: Balança, Indicador, OWL, Veículo, Pesagem e Ticket. A etapa atual acompanha o conteúdo exibido. Os cliques percorrem a sequência com aceleração e desaceleração suaves; uma nova escolha substitui a anterior, e a rolagem manual, o toque ou as teclas de navegação interrompem o percurso. Os destinos finais aguardam o carregamento das mídias e o ticket termina antes da pausa final, mantendo a folha inteira e o botão principal visíveis. Com redução de movimento, o clique chega diretamente à etapa escolhida. O link para pular, as indicações de rolagem e simulação e a nota de teste abaixo dos botões principais continuam removidos. Os 20 clientes apresentados no site original e a Lactalis Brasil, adicionada a pedido do usuário, passam em uma linha contínua da direita para a esquerda, no celular e no computador, com cópia duplicada oculta para leitores de tela. A faixa mostra apenas os logos; o texto de apresentação e o botão de pausa foram removidos.

## Contato e conteúdo

A seção `#automacao` inclui o vídeo da operação na CERBRAS, quatro etapas em um fluxo responsivo e acesso ao formulário. O vídeo usa o player do YouTube sem reprodução automática. A seção de contato é a última, seguida diretamente pelo rodapé.

O formulário valida nome, empresa e telefone e abre o WhatsApp comercial **55 11 91851-2948** com a solicitação preenchida. O visitante revisa e envia a mensagem; a página não possui banco de leads ou backend. Um evento `owl:lead-intent`, sem dados pessoais, permite futura integração de métricas.

Clientes, recursos e cinco perguntas frequentes vieram do material SIAMAC. Não foram criados depoimentos ou resultados quantitativos. Demonstração de até 100 pesagens e compatibilidade dependem da confirmação comercial/técnica.

Fontes do conteúdo original:
- https://siamac.com.br/software-de-pesagem-owl/
- https://siamac.com.br/wp-content/uploads/2021/02/Apresentacao-OWL.pdf

## Arquivos e imagens

`dist/index.html` contém a página; `dist/assets/styles.css` define o layout; `dist/assets/app.js` controla a narrativa e o formulário. A fonte Manrope e sua licença SIL OFL estão incluídas. Os logos pertencem às respectivas marcas.

Ativos atuais da sequência: `weighbridge-flatend.webp`, `truck-layer.webp`, `indicator.webp`, `owl-laptop-unplugged.webp`, `usb-connector-perspective.webp` e `owl-interface-hd.webp`. A apresentação do produto também usa o notebook sem cabo. A versão da interface foi reconstruída com IA para apresentação. Originais e versões antigas ficam em `source-assets/`, fora da publicação. Os prompts e a origem dos ativos estão em `ASSETS.md`; as otimizações sem perda de pixels e o carregamento do vídeo estão em `docs/performance.md`. A verificação e seus limites estão em `QA.md`.

## Executar localmente

Após editar `dist/assets/app.js` ou `dist/assets/styles.css`, gere novamente os arquivos `.min` usados pela página. O GitHub Actions executa esse mesmo build antes de publicar. Não edite os arquivos minificados diretamente.

```sh
npm ci --ignore-scripts --no-audit --no-fund
npm run build
```

```sh
python -m http.server 8000 --directory dist
```

Abra http://127.0.0.1:8000/.

## GitHub Pages

O workflow `.github/workflows/pages.yml` publica somente `dist/` a cada envio para `main`. Também pode ser executado manualmente pela aba Actions. Nas configurações de Pages do repositório, a origem da publicação deve ser **GitHub Actions**.

Endereço do site: https://jobvictorfern-cmd.github.io/owl-siamac/
