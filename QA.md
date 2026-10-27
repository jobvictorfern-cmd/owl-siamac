# Verificação da landing page OWL

## Saída mais curta do ticket — 27/10/2026

- A pausa extra após a impressão passou de uma tela inteira (mínimo de 480 px) para 16% da área fixa, limitada a 96–144 px. O trecho das etapas anteriores permanece igual.
- Em 1280 × 720, a pausa caiu de 634 para 101 px, mantendo a narrativa em 3344,625 px. Ticket inteiro no progresso 1; após mais 216 px de rolagem, a faixa de clientes já está visível e a área fixa foi liberada.
- Em 390 × 700, pausa de 100 px, ticket inteiro ao concluir e clientes visíveis após mais 210 px. Console sem erros; build e sintaxe JavaScript conferidos.

## Prioridade da primeira tela — 27/10/2026

- PageSpeed oficial executado na URL publicada com os perfis celular e computador, antes e depois das alterações. Links e condições em `docs/performance.md`.
- Revisão visual em computador e em 390 × 700 px: cenas físicas, conexão, confirmação e ticket completo; botão principal visível, sem transbordamento horizontal e sem erros de console.
- Servidor temporário com atraso de 15 segundos por imagem pesada e resposta sem cache: rolagem rápida manteve o indicador completo enquanto as imagens carregavam. Depois, todos os quatro elementos adiados ficaram prontos e a sequência continuou. O servidor foi encerrado após a verificação.
- Build, sintaxe do JavaScript fonte e minificado, referências de mídia (incluindo `data-story-src`) e âncoras locais conferidos. Arquivos de imagem preservados sem alterações.

## WhatsApp, mídia e responsividade — 27/10/2026

- Verificação visual no navegador Chromium integrado em 1280 × 900, 768 × 1024, 390 × 844, 320 × 568 e 844 × 390. Sem rolagem horizontal; botão principal visível e separado do botão flutuante. Rotação entre retrato e paisagem recalculou a geometria.
- Conferidos conexão USB, expansão da tela do notebook, seleção de veículo, confirmação e ticket completo. Em 320 × 568, o ticket também abriu no diálogo ampliado e fechou normalmente.
- Miniatura local de 1280 × 720 carregada, sem iframe antes da interação. Clique abriu o player e iniciou o vídeo em 390 × 700; pausa funcionou. Nenhum erro de console observado.
- Faixa de clientes pausada quando fora da tela. Modo de movimento reduzido exercitado em uma cópia local de teste com a preferência ativada: etapas acessíveis, faixa estática e ticket final completo. A cópia de teste não integra a publicação.
- 24 conversões PNG → WebP verificadas por igualdade exata dos pixels RGBA. Fonte WOFF2 e 32 referências locais verificadas; 16 âncoras válidas; sintaxe JavaScript válida.
- Destino do botão flutuante conferido: `5511918512948`, com mensagem sobre teste do OWL e automação. Nenhuma mensagem foi enviada durante o teste.
- A verificação responsiva simula tamanhos de tela no navegador; não equivale a teste físico de todos os aparelhos, versões de sistema, Safari ou Firefox.

## Correção: permanência do ticket completo — 27/10/2026

A animação agora termina antes da liberação da seção fixa. Em 962 × 884, a distância das etapas permaneceu em 1934 px e foi acrescentada uma faixa final de 806 px. Em dois pontos dessa faixa, separados por 442 px de rolagem, título, ticket e botão mantiveram exatamente suas posições; o papel estava totalmente revelado. Após a faixa, a página seguiu normalmente para os clientes. Também verificados título, ticket e botão integralmente visíveis em 320 × 568, com faixa final de 490 px. Ajustado o espaço abaixo da saída da impressora para não cobrir o topo do papel. Sintaxe JavaScript validada e console sem erros.

## Atualização: texto centralizado e sincronizado — 27/10/2026

Título e descrição ficam acima da animação e mudam nas quatro etapas, com altura reservada para o botão. Conferidos os quatro estados em 962 × 884, além do enquadramento em 1440 × 900. Em 390 × 844 e 320 × 568, título e descrição permanecem em uma linha, sem rolagem horizontal, e o botão fica integralmente dentro da tela. A câmera reduz o zoom quando a altura disponível é menor. Sintaxe JavaScript validada e nenhuma mensagem de erro encontrada no console durante a verificação. Os controles de etapas e pausa mencionados nos registros históricos abaixo foram removidos em revisões posteriores.

## Registros anteriores

- Sintaxe JavaScript: passou com `node --check`.
- Referências locais e âncoras: todos os arquivos e destinos encontrados; sem IDs duplicados.
- Conteúdo: cinco perguntas frequentes; 20 marcas de clientes presentes na referência SIAMAC.
- Navegador: navegação direta pelas quatro etapas, rolagem de avanço e retorno e leitura coerente entre indicador, OWL e ticket verificadas.
- Frenagem: cabine em camada independente com inclinação e retorno amortecido; o veículo para antes do início da leitura.
- Transmissão: rastros no primeiro e no segundo cabo inspecionados durante a transferência; estados de chegada e retorno conferidos.
- Responsividade: viewport desktop e quadros responsivos de 320, 390 e 768 px inspecionados; nenhuma rolagem horizontal observada. Também inspecionada altura de 620 px.
- Formulário: campos vazios e telefone/e-mail inválidos bloqueados; dados válidos geraram o endereço correto do WhatsApp, com mensagem preenchida e alternativa de abertura. Nenhuma mensagem foi enviada.
- Menu mobile: abertura e fechamento com Escape verificados.
- Redução de movimento: fallback implementado e código inspecionado; preferência de sistema não emulada nesta rodada.
- Não foram realizados teste com leitor de tela, campanha de conversão, ensaio em aparelho físico ou validação em Safari/Firefox.

As imagens e a física do caminhão são uma composição ilustrativa em camadas. Não são uma filmagem documental ou uma simulação física 3D. Os números do hero são dados de demonstração.

## Revisão de conteúdo do hero

Título encurtado para “Controle cada pesagem.”, descrição simplificada e ação principal posicionada após a animação e seus controles. Removidos a narração visual repetida, o contador redundante e os prefixos numéricos das etapas. Anúncios acessíveis mantidos. Verificados o posicionamento do botão abaixo dos controles, a ausência de corte e o layout em 320/390 px, incluindo altura reduzida de 620 px.

## Ampliação da animação

Enquadramento da narrativa ampliado em 16%, com área visual ocupando toda a largura no celular e uma coluna maior no desktop. Mantidos os cabos e pulsos no mesmo espaço de coordenadas, a frenagem e o botão abaixo dos controles. Indicador, computador e ticket conferidos em 390 px; layout compacto de 320 × 620 px e desktop inspecionados sem rolagem horizontal. Ajustada a altura do ticket para acomodar o conteúdo. Sintaxe JavaScript e referências locais passaram novamente.

## Refinamento das conexões

Substituído o ponto isolado por quatro camadas de luz sobre a trajetória real do cabo, com entrada e saída graduais, reflexo discreto nos conectores e iluminação progressiva dos visores. Câmera com aceleração e desaceleração contínuas, leve recuo durante a transmissão e acompanhamento do sinal. Amortecimento da rolagem independente da frequência de quadros; atualizações param ao atingir o destino.

Verificadas ambas as conexões em 390 px, retorno à primeira conexão em 320 px sem rolagem horizontal e enquadramento no desktop. Navegação por teclado executada. Nenhum erro da aplicação registrado no console durante a inspeção; houve aviso de erro da extensão do navegador. Fallback de redução de movimento mantido e inspecionado no código; preferência de sistema e aparelho físico não emulados nesta rodada.

## Percurso guiado pelo fio

Ampliado o espaço entre balança, indicador e monitor. A câmera acompanha as coordenadas do cabo em dois eixos, aproxima o percurso e abre o enquadramento na chegada. Cada equipamento seguinte permanece invisível até o fim da conexão; o equipamento anterior sai de cena durante a partida. O cabo é revelado progressivamente e o rastro acompanha sua ponta.

Conferidos em 390 px: no meio de ambas as viagens, as três estações têm opacidade zero; na etapa do indicador apenas ele está visível; na etapa OWL apenas o monitor está visível. Leitura crescente confirmada no indicador e no OWL. Conferidos em 320 × 620 px: ausência de rolagem horizontal, botão abaixo dos controles e ticket de 32.480 kg. Navegação até o ticket por teclado executada. Sintaxe JavaScript e referências locais passaram. Correção de amortecimento para usar o intervalo real entre quadros, inclusive após suspensão da aba.

## Faixa de clientes no celular e no computador — 27/10/2026

Conferidos os 20 logos com a seção de clientes original e a referência enviada. Inspecionadas telas de 1080 e 390 px: faixa única, sem rolagem horizontal da página e com os 40 elementos de imagem carregados (20 marcas e uma cópia decorativa). As duas sequências mediram 4000 px no computador e 2800 px no celular; a animação desloca -50% da faixa em ciclos de 100 e 70 segundos, respectivamente. Movimento para a esquerda observado em leituras consecutivas; pausa manteve exatamente a mesma posição e retomada voltou ao estado de execução. A cópia está oculta para leitores de tela, que recebem apenas os 20 nomes. Sequências e arquivos locais conferidos, página respondeu HTTP 200 e sintaxe JavaScript passou. A continuidade foi verificada pela igualdade das sequências e de suas larguras, sem aguardar um ciclo inteiro.

## Rampa, apoio e rodas

- Imagem com as duas rampas completas; enquadramento desktop inspecionado e limites do arquivo inteiro contidos no viewport (x 574–1283 dentro de 563–1294; y 177–650 dentro de 173–660 no quadro capturado).
- Posição final do pneu dianteiro: (631,12; 668,20) no plano de calibração 1536 × 1024. Contatos visuais conferidos sobre a plataforma, entre as bordas.
- Sete aros reconhecidos e calibrados na foto. Teste geométrico executou cinco ângulos em todos os sete aros, verificando eixo fixo e elipse invariável; passou.
- Em 7% da narrativa: inclinação de rampa 2,196° e fase de roda 818,38°. Em 14%: inclinação zero e fase 192,59°. Em 20%: rodas paradas e cabine inclinada -0,7941°. Em 25%: sete matrizes dos aros iguais à identidade, preservando a foto final.
- Layouts de 390 px, 320 × 620 px e desktop inspecionados. Na tela compacta, rampas inteiras, sem rolagem horizontal e botão abaixo dos controles.
- Continuidade até o OWL verificada em 320 × 620 px, leitura 30.480 kg na etapa demonstrativa de 83%.
- Sintaxe JavaScript e referências locais passaram. Fallback de redução de movimento inspecionado no código, sem emulação da preferência do sistema. Não testado em dispositivo físico, Safari ou Firefox.

## Animações sempre ativas

Removidas as consultas JavaScript e as regras CSS que desativavam ou encurtavam animações por preferência de redução de movimento. Hero, rodas, cabos, ticket e faixa de clientes seguem o mesmo comportamento em qualquer configuração dessa preferência. A pausa manual da faixa continua disponível. Verificação estática confirmou ausência dessas condicionais no código publicável; sintaxe JavaScript passou. Isso não garante execução em todo hardware ou em navegadores que bloqueiem JavaScript, CSS ou suspendam a página.

## Revisão atual: seta reta e notebook USB

- Removida da fotografia apenas a pequena rampa da extremidade direita. A rampa frontal e o alinhamento da plataforma foram preservados.
- Retirados o cálculo de altura de rampa e o ângulo variável de subida. Em 7% da narrativa foi confirmado ângulo de subida 0,000°, com a frenagem independente da cabine preservada.
- Primeira conexão: trajeto horizontal `M790 280 H1550`. No meio do percurso (35%), a ponta manteve y=280 e os equipamentos seguintes ficaram ocultos.
- Segunda conexão: cabo USB com três camadas de material, unido à ponta do cabo fotografado no notebook. O ponto de união é recalculado após mudanças de largura/altura; o próximo equipamento continua oculto no trecho central.
- Notebook com interface oficial projetada sobre quatro cantos da tela; leitura 30.480 kg em 83% da narrativa. Não há interface gerada dentro da imagem do hardware.
- Inspecionados hero em 390 px, layout de 320 × 620 px e desktop. Na tela compacta, leitura separada da base, botão abaixo dos controles e largura do documento igual à largura disponível, sem rolagem horizontal.
- Apresentação do produto também conferida com o notebook e a mesma composição da tela.
- Sintaxe JavaScript, arquivos referenciados, âncoras e unicidade dos IDs passaram. Nenhuma condição de redução de movimento foi reintroduzida.
- Limites: sem ensaio em aparelho físico ou Safari/Firefox; realismo avaliado como composição fotográfica, sem alegação de física 3D.

Conclusão da sequência atual em 320 × 620 px: progresso 99,5%, etapa 4, ticket com opacidade 1 e peso 32.480 kg; largura 305 px igual à área útil, sem transbordamento lateral.

## Ticket baseado no comprovante enviado — 27/10/2026

- Modelo recriado em HTML/CSS com as mesmas seções do comprovante, sem marca diagonal. Campos preenchidos com exemplos; CPF mascarado e identificação discreta no rodapé.
- Pesos conferidos: 32.840 − 10.000 = 22.840 kg; fator 1,0000. Leitura final do indicador, OWL, apresentação do produto e ticket alinhada em 32.840 kg.
- Em 962 × 884, 390 × 844 e 320 × 568 px, a folha inteira cabe na área da animação, o botão principal permanece visível e não existe transbordamento horizontal da página.
- Ampliação verificada no computador e celular: texto em tamanho original, rolagem interna para alcançar toda a folha, botão de fechamento e Escape funcionais. A abertura por clique nativo manteve a rolagem da página em 1.605 px antes e depois.
- Janela ampliada completa conferida em 1440 × 1000 px. Nenhum campo dd excedeu a largura disponível. Console sem erros, JavaScript válido, referências locais existentes e IDs únicos.
- O trecho de rolagem que mantém o ticket final fixo permanece ativo. A ampliação aparece somente após a impressão terminar.

## Pesos do ticket sincronizados com a animação — 27/10/2026

A inicial passou para 28.840 kg, mantendo a final de 32.840 kg e recalculando o líquido e a quantidade da nota para 4.000 kg. Ticket e animação compartilham os mesmos valores no JavaScript. Conferidos no navegador: em progresso 0,600, indicador e pesagem inicial mostram 28.840 kg; no final, OWL e ticket mostram 32.840 kg, e as três referências ao líquido mostram 4.000 kg. Sintaxe JavaScript válida.

## Seção de automação da balança — 27/10/2026

- Nova seção #automacao antes do contato, com texto baseado na página SIAMAC fornecida e link direto para a fonte. Sem promessas absolutas de compatibilidade ou resultados quantitativos.
- Fluxo de quatro etapas em linha no computador e vertical no celular; ícones vetoriais decorativos, sem carregar novas imagens ou bibliotecas.
- Link Automação verificado nos menus: navegação por âncora no computador e menu móvel fechado após a seleção. CTA leva a #demonstracao.
- Revisão visual em 1440 × 900, 390 × 844 e 320 × 568 px. Sem rolagem horizontal, textos cortados ou botão excedendo a largura. Console sem erros; IDs únicos, âncoras válidas e ativos locais existentes.

## Simulação de finalização no OWL — 27/10/2026

- A tela do notebook se transforma em uma interface plana por projeção dos quatro cantos, evitando texto duplicado durante o zoom. O notebook desaparece gradualmente, mantendo a tela visível.
- Seis etapas de texto sincronizadas: chegada, indicador, OWL, identificação, confirmação e ticket. Trecho adicional reservado para os pop-ups, preservando a distância das cenas físicas e a permanência final do ticket.
- Primeiro pop-up: placa ABC1D23 e reboque DEF4G56 digitados pela rolagem, seguidos do cadastro. Segundo: inicial 28.840 kg, final 32.840 kg, líquido 4.000 kg, operação CARGA e ID 5, coerentes com o ticket. Cursor, clique e confirmação também acompanham a rolagem.
- Conferidos no navegador os dois pop-ups no computador e em 390 × 844 e 320 × 568 px. Layout móvel reorganizado para leitura vertical, sem cortar campos, pesos ou botão principal. A área de informações do veículo não apresenta transbordamento.
- Confirmação em verde verificada antes do ticket. Em 320 × 568 px, ticket inteiro e botão Ampliar ticket visíveis no trecho final. No retorno a 0,87 da linha narrativa, campos e confirmação são limpos, a tela original do notebook volta e a simulação fica oculta.
- Console sem erros, JavaScript válido, IDs únicos e referências locais/âncoras existentes. A interface representada é demonstrativa; não cria pesagens reais nem captura dados.

## Nitidez da interface — 27/10/2026

- Três imagens da interface carregadas no navegador em 1616 × 973 px. O CSS agora exibe o ativo inteiro, sem ampliar o recorte do monitor anterior.
- Conferidos visualmente o notebook em perspectiva e a tela plana. No notebook, a leitura variável mostrou 32.180 kg; na etapa seguinte, 32.840 kg, sem sobreposição com o valor da imagem.
- Botão principal visível; enquadramento da tela preservado. A alteração é visual e não modifica a linha do tempo ou os dados da pesagem.
- A imagem foi reconstruída por IA; não é uma captura oficial de maior resolução nem uma fonte documental para os caracteres pequenos da tabela.

## USB saindo de trás e conectando ao notebook — 27/10/2026

- Antes da transferência (0,57 da narrativa), cabo completamente oculto, sem o pequeno trecho sobre o pé do indicador.
- Em 0,62, conector emerge por trás da lateral direita; em 0,68, ponta USB acompanha a extremidade do cabo.
- Em 0,7415, notebook visível e conector diante da porta, com inserção 0; em 0,775, inserção 1 e corpo junto à porta, ponta metálica oculta pela carcaça.
- Conferidos desktop 962 × 884 e celular 390 × 700; enquadramento preservado e botão principal visível. No celular, documento sem transbordamento horizontal.
- Ao voltar para 0,57, conexão e inserção são limpas e o cabo fica oculto. A sequência não depende de temporizadores nem de rolagem automática.
- Sintaxe JavaScript válida e console sem erros durante a verificação. Sem ensaio em aparelho físico.

## Conector USB fotorealista — 27/10/2026

- Plugue geométrico substituído por PNG transparente de 1774 × 887 px; alfa verificado e dimensões preservadas. PNG servido localmente.
- Em 962 × 884, ponta fotográfica acompanha o cabo no trajeto; em 0,775 da narrativa, conexão completa, com metal escondido pela carcaça e corpo junto à porta.
- União e proporções conferidas em 390 × 700: diâmetro do fio acompanha a escala da fotografia, sem transbordamento horizontal.
- Movimento de encaixe e máscara traseira preservados; botão principal visível. Sintaxe JavaScript válida e console sem erros.

## Correção do encaixe USB — 27/10/2026

- Revisão da porta na imagem fonte confirmou centro em (248, 754). Ao conectar, o ombro do plugue coincide com esse ponto: diferença visual calculada menor que 0,03 px em 962 × 884 e 390 × 700.
- Entrada parcial conferida em 0,731 da narrativa (inserção 0,562): metal visível apenas até o plano da abertura. Em 0,745, inserção completa e corpo encostado na porta, ainda com câmera próxima.
- A porta fica visível antes do encaixe. A câmera só começa a se afastar depois da conexão completa.
- Retorno a 0,57 restaura o recorte integral e oculta cabo e conector; estado conectado volta a falso. Máscara traseira preservada.
- Sintaxe JavaScript válida, console sem erros durante a revisão e botão principal visível nos dois tamanhos.

## Volume do USB e perspectiva fotográfica — 27/10/2026

- Substituída a foto frontal por uma vista com topo e parede lateral visíveis. Removida a deformação que achatava o conector; no encaixe, a matriz utiliza escala uniforme de 0,7, sem cisalhamento.
- Conferidas aproximação em 0,717, inserção em 0,731 e conexão completa em 0,745. A máscara diagonal deixa o corpo do plugue fora do notebook.
- Revisão visual em 962 × 884 e 390 × 700, com botão principal visível. Ao voltar antes da conexão, cabo e ponta ficam com opacidade zero e o estado conectado volta a falso.
- JavaScript passou na verificação de sintaxe; console do navegador sem erros. Prévia salva em `outputs/usb-volume-e-encaixe.png` no diretório da conversa.

## Oclusão da conexão USB — 27/10/2026

- O limite de entrada agora pertence à porta do notebook, fixo nas coordenadas da imagem, em vez de se deslocar com o plugue. Isso elimina o metal desenhado por cima da carcaça.
- A borda transversal foi alinhada à abertura preservando a altura do conector. Conferência ampliada da junção, seguida de inspeção no site em aproximação (0,717), inserção parcial (0,731) e conexão completa (0,745).
- Em 390 × 700, conexão completa com botão visível; ao voltar a 0,57, cabo e plugue têm opacidade zero e conexão falsa. Conferência também em 962 × 884.
- Sintaxe JavaScript válida e console sem erros. O servidor local temporário de inspeção foi encerrado após a revisão.
