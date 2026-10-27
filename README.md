# OWL — Landing page SIAMAC

Página mobile first em HTML, CSS e JavaScript puro. O conteúdo publicável está em `dist/`, sem framework. O build gera as versões minificadas de CSS e JavaScript.

## Sequência visual

O texto fica centralizado acima da animação, sem quebras de linha, e acompanha seis etapas: “Controle cada pesagem.”, “Peso direto da balança.”, “Informação no OWL.”, “Identifique o veículo.”, “Confirme a pesagem.” e “Pesagem registrada.”. A descrição também muda, inclusive ao voltar na rolagem. O espaço do botão com a logo do OWL permanece reservado dentro da tela durante a sequência. O enquadramento dos equipamentos se ajusta à altura disponível.

O caminhão entra e desacelera sobre a balança, sem inclinação de subida. A pequena rampa da extremidade traseira foi removida; a rampa frontal permanece. Os sete aros usam recortes fotográficos calibrados e o balanço da cabine na frenagem continua independente.

Uma seta azul reta sai da balança e chega ao indicador. A câmera acompanha o trajeto e revela o indicador apenas na chegada. Depois acompanha um cabo que sai por trás do indicador, com ponta USB visível durante o trajeto. O notebook aparece com a porta vazia antes da aproximação final; o conector se alinha e entra na porta. O cabo usa uma máscara para não atravessar a carcaça do indicador. A geometria e a posição da porta são recalculadas conforme o layout. A tela recebe uma reconstrução em alta resolução da interface do OWL, com leitura ilustrativa crescente. A tela se aproxima do notebook e passa à interface do OWL. Dois pop-ups recriados a partir das capturas enviadas mostram a digitação da placa e do reboque, a identificação do veículo, os pesos e o clique de confirmação. A sequência termina no ticket de 32.840 kg. Essa demonstração acompanha a rolagem nos dois sentidos e não executa operações reais no software. Após aparecer por inteiro, o ticket permanece fixo por um trecho adicional de rolagem equivalente à altura da área fixa, com mínimo de 480 px. Só depois a página avança para os clientes; a distância das etapas anteriores é preservada, sem bloquear a rolagem nativa.

O ticket reproduz em HTML o modelo SIAMAC enviado pelo usuário, sem a marca diagonal de pesagem manual. Campos de veículo, motorista, transportadora, produto, empresas, nota fiscal, observações e registros foram preenchidos com dados de exemplo, identificados discretamente no rodapé. A pesagem inicial é 28.840 kg, a final é 32.840 kg e o líquido é 4.000 kg, usando os mesmos dados da animação; o fator de correção é 1,0000. A folha inteira se ajusta ao espaço da animação. “Ampliar ticket” abre uma janela com texto em tamanho original, navegação por rolagem e fechamento pelo botão ou Escape.

O mesmo notebook é usado na apresentação do produto. Sua tela é posicionada por transformação de perspectiva, usando a mesma reconstrução da interface exibida na animação. Os equipamentos e o caminhão são uma composição ilustrativa em camadas, sem conexão real ou simulação física 3D. A representação USB não define a compatibilidade de indicadores; a SIAMAC avalia a instalação.

As animações continuam ativas independentemente da preferência de redução de movimento do sistema, conforme solicitado. A narrativa acompanha a rolagem nativa. Os controles visuais de etapas, o link para pular, as indicações de rolagem e simulação e a nota de teste abaixo dos botões principais foram removidos. Os 20 clientes apresentados no site original passam em uma linha contínua da direita para a esquerda, no celular e no computador, com cópia duplicada oculta para leitores de tela. A faixa mostra apenas os logos; o texto de apresentação e o botão de pausa foram removidos.

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
