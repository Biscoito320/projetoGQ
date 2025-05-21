
export const lessonData = [
  {
    id: "l1",
    type: "Introdução",
    title: "O Clima Está Mudando: E Agora?",
    description: "Uma introdução divertida aos mistérios das mudanças climáticas, efeito estufa e o tal do aquecimento global.",
    points: 30,
    duration: "15 minutos",
    content: `
      <div class="text-center mb-6">
        <img  alt="Planeta Terra com um termômetro gigante mostrando alta temperatura e uma expressão preocupada." class="w-1/2 mx-auto rounded-lg shadow-lg" src="https://images.unsplash.com/photo-1503627999552-863fb28ee261" />
      </div>
      <h2 class="text-2xl font-bold text-primary mb-3">Ei, Explorador(a) do Clima! 🌍🌡️</h2>
      <p class="mb-4">Você já ouviu falar que o tempo anda meio maluco? Um dia faz um calor de rachar, no outro um frio de bater o queixo... Pois é, isso tem a ver com as <strong>Mudanças Climáticas</strong>!</p>
      <p class="mb-4">Imagine que a Terra é como uma casa super legal, e ela tem um cobertor mágico chamado <strong>atmosfera</strong>. Esse cobertor tem uns ajudantes especiais, os <strong>gases de efeito estufa</strong> (tipo o CO₂, o gás que soltamos ao respirar e que os carros também soltam).</p>
      
      <h3 class="text-xl font-semibold text-secondary mt-6 mb-2">O Efeito Estufa: Um Cobertor Quentinho (Até Demais!) 🔥</h3>
      <p class="mb-4">Normalmente, esses gases são nossos amigos! Eles seguram um pouco do calor do Sol aqui na Terra, como um cobertor quentinho numa noite fria. Isso é o <strong>Efeito Estufa</strong> natural, e é ótimo porque mantém o planeta com uma temperatura boa para a gente viver.</p>
      <div class="my-6 p-4 bg-primary/10 border-l-4 border-primary rounded-md">
        <p class="font-medium text-primary">Analogia Divertida: Pense numa estufa de plantas! O vidro deixa o sol entrar e esquentar lá dentro, mas não deixa todo o calor sair. A atmosfera faz algo parecido!</p>
      </div>
      
      <h3 class="text-xl font-semibold text-secondary mt-6 mb-2">Aquecimento Global: Quando o Cobertor Engrossa 🥵</h3>
      <p class="mb-4">O problema começa quando a gente joga MUITO desses gases na atmosfera – queimando gasolina nos carros, derrubando florestas (que ajudam a limpar o ar!), e com algumas fábricas. É como se a gente colocasse um cobertor extra, bem grosso, na nossa casa Terra. Aí ela começa a esquentar demais! Isso é o <strong>Aquecimento Global</strong>.</p>
      
      <h3 class="text-xl font-semibold text-secondary mt-6 mb-2">Impactos Malucos no Planeta 🌪️🌊</h3>
      <p class="mb-2">Com o planeta mais quente, acontecem umas coisas estranhas:</p>
      <ul class="list-disc list-inside space-y-1 mb-4 pl-4 text-foreground/90">
        <li>O gelo lá dos polos começa a derreter, e o nível do mar sobe (xô, praia!).</li>
        <li>Tempestades ficam mais fortes, e secas mais longas.</li>
        <li>Alguns bichinhos e plantas podem não se adaptar e sumir. 😥</li>
        <li>Até a nossa comida e saúde podem ser afetadas!</li>
      </ul>
      <p>Mas calma! Entender o problema é o primeiro passo pra gente virar herói ou heroína do clima! 💪</p>
    `,
    quiz: [
      {
        question: "O que são os gases de efeito estufa na nossa 'casa Terra'?",
        options: [
          "Monstrinhos que sujam o ar",
          "Um tipo de nuvem colorida",
          "Ajudantes que funcionam como um cobertor quentinho",
          "Poeira cósmica"
        ],
        correctAnswer: 2
      },
      {
        question: "O Aquecimento Global acontece quando...",
        options: [
          "O Sol fica mais forte",
          "A gente coloca 'cobertores extras' (muitos gases) na Terra",
          "A Lua muda de fase",
          "Os vulcões entram em erupção todos de uma vez"
        ],
        correctAnswer: 1
      },
      {
        question: "Qual dessas coisas NÃO é um impacto doido do aquecimento global?",
        options: [
          "Derretimento do gelo polar",
          "Mais arco-íris aparecendo",
          "Tempestades mais fortes",
          "Alguns animais ficarem em perigo"
        ],
        correctAnswer: 1
      }
    ]
  },
  {
    id: "l2",
    type: "Ação Prática",
    title: "Sua Super Pegada de Carbono!",
    description: "Descubra o tamanho do seu 'rastro' no planeta e como diminuí-lo com poderes especiais!",
    points: 40,
    duration: "20 minutos",
    content: `
      <div class="text-center mb-6">
        <img  alt="Uma pegada gigante feita de elementos da natureza (folhas, galhos) com uma lupa sobre ela." class="w-1/2 mx-auto rounded-lg shadow-lg" src="https://images.unsplash.com/photo-1603224277901-6d508e0a0c12" />
      </div>
      <h2 class="text-2xl font-bold text-primary mb-3">Detetive Climático em Ação! 🕵️‍♀️👣</h2>
      <p class="mb-4">Todo mundo deixa uma "pegada" no planeta, sabia? Não é a marca do seu tênis na lama, mas sim a <strong>Pegada de Carbono</strong>! Ela mede a quantidade de gases de efeito estufa que a gente libera com nossas atividades do dia a dia.</p>
      
      <h3 class="text-xl font-semibold text-secondary mt-6 mb-2">O Que Entra na Conta da Super Pegada? 📝</h3>
      <p class="mb-2">Várias coisas que fazemos contribuem para nossa pegada:</p>
      <ul class="list-disc list-inside space-y-1 mb-4 pl-4 text-foreground/90">
        <li><strong>Transporte Poderoso:</strong> Andar de carro, ônibus ou avião.</li>
        <li><strong>Energia em Casa:</strong> Luz acesa, videogame ligado, banho quentinho.</li>
        <li><strong>Rango Delícia:</strong> O que a gente come (carne, por exemplo, tem uma pegada maior!).</li>
        <li><strong>Compras Incríveis:</strong> Roupas novas, brinquedos, eletrônicos.</li>
        <li><strong>Lixo Misterioso:</strong> Tudo que a gente joga fora.</li>
      </ul>
      <div class="my-6 p-4 bg-secondary/10 border-l-4 border-secondary rounded-md">
        <p class="font-medium text-secondary">Curiosidade: Até um simples sanduíche tem uma pegada de carbono, desde o plantio do trigo do pão até o transporte para sua casa!</p>
      </div>
      
      <h3 class="text-xl font-semibold text-secondary mt-6 mb-2">Missão: Encolher a Pegada!  shrinking ray! ✨</h3>
      <p class="mb-2">A boa notícia é que podemos usar nossos superpoderes para diminuir essa pegada:</p>
      <ol class="list-decimal list-inside space-y-2 mb-4 pl-4 text-foreground/90">
        <li><strong>Modo Eco-Transporte:</strong> Caminhar, andar de bicicleta, usar transporte público ou dividir carona. Menos carros, menos poluição!</li>
        <li><strong>Guardião da Energia:</strong> Apagar as luzes ao sair, desligar aparelhos da tomada, tomar banhos mais curtos.</li>
        <li><strong>Chef Sustentável:</strong> Comer menos carne, experimentar mais vegetais e frutas da estação, e não desperdiçar comida.</li>
        <li><strong>Consumidor Consciente:</strong> Pensar se realmente precisa de algo novo, consertar o que quebrou, doar o que não usa mais e escolher produtos que durem.</li>
        <li><strong>Mestre da Reciclagem (e dos 5Rs):</strong> <strong>R</strong>ecusar o que não precisa, <strong>R</strong>eduzir o consumo, <strong>R</strong>eutilizar embalagens, <strong>R</strong>eciclar o lixo e <strong>R</strong>ecompor (compostar) o orgânico.</li>
      </ol>
      <p>Com pequenos gestos, sua pegada pode ficar levinha como uma pluma!</p>
    `,
    quiz: [
      {
        question: "O que é a 'Pegada de Carbono'?",
        options: [
          "Uma marca de sapato ecológica",
          "A sombra que fazemos no chão",
          "A medida de gases de efeito estufa que liberamos",
          "Um tipo de dança sustentável"
        ],
        correctAnswer: 2
      },
      {
        question: "Qual dessas ações NÃO ajuda a diminuir sua pegada de carbono?",
        options: [
          "Ir de carro para a escola todos os dias sozinho",
          "Apagar a luz do quarto quando sair",
          "Comer mais frutas e verduras",
          "Reciclar o lixo"
        ],
        correctAnswer: 0
      },
      {
        question: "Os '5 Rs' da sustentabilidade são importantes para diminuir o lixo. Qual destes NÃO é um R?",
        options: [
          "Reduzir",
          "Reclamar",
          "Reutilizar",
          "Reciclar"
        ],
        correctAnswer: 1
      }
    ]
  },
  {
    id: "l3",
    type: "Aprofundamento",
    title: "Energias do Futuro: Super Fontes Limpas!",
    description: "Conheça as energias que são amigas do planeta e não soltam fumacinha suja!",
    points: 35,
    duration: "25 minutos",
    content: `
      <div class="text-center mb-6">
        <img  alt="Um sol sorridente, uma turbina eólica girando alegremente e painéis solares brilhando." class="w-2/3 mx-auto rounded-lg shadow-lg" src="https://images.unsplash.com/photo-1593314119362-e5c93c177ee6" />
      </div>
      <h2 class="text-2xl font-bold text-primary mb-3">Super-Heróis da Energia! 🦸‍♂️⚡</h2>
      <p class="mb-4">Para combater o aquecimento global, precisamos de fontes de energia que não poluam o ar, certo? Essas são as <strong>Energias Renováveis</strong>! Elas vêm de fontes que a natureza nos dá de graça e que não acabam (ou demoram muuuito pra acabar).</p>
      
      <h3 class="text-xl font-semibold text-secondary mt-6 mb-2">Conheça o Esquadrão Renovável:</h3>
      
      <div class="mb-4 p-4 border border-primary/30 rounded-lg bg-card shadow-sm">
        <h4 class="text-lg font-bold text-primary mb-1">☀️ Energia Solar: O Poder do Solzão!</h4>
        <p class="text-foreground/90">Usamos placas especiais (painéis solares) que capturam a luz do sol e transformam em eletricidade. É como se o sol nos desse um "oi" energético!</p>
      </div>
      
      <div class="mb-4 p-4 border border-primary/30 rounded-lg bg-card shadow-sm">
        <h4 class="text-lg font-bold text-primary mb-1">🌬️ Energia Eólica: A Força do Vento!</h4>
        <p class="text-foreground/90">Sabe aqueles cataventos gigantes? São turbinas eólicas! O vento faz as pás girarem, e isso gera energia. É o sopro da natureza trabalhando!</p>
      </div>
      
      <div class="mb-4 p-4 border border-primary/30 rounded-lg bg-card shadow-sm">
        <h4 class="text-lg font-bold text-primary mb-1">💧 Energia Hidrelétrica: A Mágica da Água!</h4>
        <p class="text-foreground/90">A força da água dos rios em movimento (ou caindo de uma cachoeira) pode girar turbinas e gerar eletricidade. Mas atenção: grandes hidrelétricas precisam ser construídas com cuidado para não prejudicar o rio e os bichos.</p>
      </div>
      
      <div class="mb-4 p-4 border border-primary/30 rounded-lg bg-card shadow-sm">
        <h4 class="text-lg font-bold text-primary mb-1">🌿 Biomassa: Energia das Plantas e Bichos!</h4>
        <p class="text-foreground/90">Podemos usar restos de plantas, madeira, e até o cocô de animais (eca, mas é útil!) para produzir energia. É a natureza se reciclando!</p>
      </div>
      
      <h3 class="text-xl font-semibold text-secondary mt-6 mb-2">Por que elas são Super? ✅</h3>
      <ul class="list-disc list-inside space-y-1 mb-4 pl-4 text-foreground/90">
        <li>Não soltam (ou soltam bem pouquinho) gases que esquentam o planeta.</li>
        <li>Ajudam a manter o ar mais limpo.</li>
        <li>São fontes que se renovam, ou seja, não acabam fácil!</li>
      </ul>
      <p>Usar mais dessas energias é um passo de gigante para um futuro mais verdinho e saudável!</p>
    `,
    quiz: [
      {
        question: "Qual destes NÃO é um tipo de Energia Renovável?",
        options: [
          "Energia Solar (do sol)",
          "Energia do Carvão (queimando carvão)",
          "Energia Eólica (do vento)",
          "Energia Hidrelétrica (da água)"
        ],
        correctAnswer: 1
      },
      {
        question: "As placas que capturam a luz do sol para gerar eletricidade são chamadas de...",
        options: [
          "Espelhos mágicos",
          "Janelas solares",
          "Painéis solares",
          "Guarda-sóis energéticos"
        ],
        correctAnswer: 2
      },
      {
        question: "Qual a principal vantagem das energias renováveis para o planeta?",
        options: [
          "São mais baratas de fazer em casa",
          "Fazem menos barulho que as outras",
          "Não poluem (ou poluem muito pouco) o ar",
          "Funcionam melhor à noite"
        ],
        correctAnswer: 2
      }
    ]
  },
  {
    id: "l4",
    type: "Desafio Criativo",
    title: "Detetive do Lixo: Missão Reciclagem!",
    description: "Transforme-se em um agente secreto da reciclagem e descubra como dar um novo destino ao lixo.",
    points: 45,
    duration: "30 minutos",
    content: `
      <div class="text-center mb-6">
        <img  alt="Crianças vestidas de detetives com lupas, investigando diferentes tipos de lixo reciclável." class="w-2/3 mx-auto rounded-lg shadow-lg" src="https://images.unsplash.com/photo-1635496037115-39f73079ad14" />
      </div>
      <h2 class="text-2xl font-bold text-primary mb-3">Alerta, Agente! Sua Missão: Decifrar a Reciclagem! 🕵️‍♂️♻️</h2>
      <p class="mb-4">Você já parou para pensar para onde vai o lixo que jogamos fora? Muito dele acaba em lugares chamados aterros, ocupando espaço e podendo poluir. Mas e se eu te dissesse que muito do nosso "lixo" pode virar coisa nova? Essa é a mágica da <strong>Reciclagem</strong>!</p>
      
      <h3 class="text-xl font-semibold text-secondary mt-6 mb-2">Os Suspeitos Comuns: O Que Podemos Reciclar?</h3>
      <p class="mb-2">Nossos principais alvos para a reciclagem são:</p>
      <ul class="list-none space-y-3 mb-4 pl-0">
        <li class="flex items-start p-3 bg-blue-500/10 border-l-4 border-blue-500 rounded-md">
          <span class="text-2xl mr-3">💧</span> <div><strong class="text-blue-600">Plásticos:</strong> Garrafas PET (de refri), potes de iogurte, embalagens de xampu. Lave antes de descartar!</div>
        </li>
        <li class="flex items-start p-3 bg-yellow-500/10 border-l-4 border-yellow-500 rounded-md">
          <span class="text-2xl mr-3">🥫</span> <div><strong class="text-yellow-600">Metais:</strong> Latinhas de alumínio (refri, suco), latas de aço (milho, ervilha). Amasse as latinhas!</div>
        </li>
        <li class="flex items-start p-3 bg-green-500/10 border-l-4 border-green-500 rounded-md">
          <span class="text-2xl mr-3">🍾</span> <div><strong class="text-green-600">Vidros:</strong> Potes de conserva, garrafas. Cuidado ao manusear, não quebre! E não misture com lâmpadas ou espelhos, esses são diferentes!</div>
        </li>
        <li class="flex items-start p-3 bg-gray-500/10 border-l-4 border-gray-500 rounded-md">
          <span class="text-2xl mr-3">📰</span> <div><strong class="text-gray-600">Papéis:</strong> Jornais, revistas, caixas de papelão, folhas de caderno. Não recicle papel sujo de gordura (como caixa de pizza engordurada) ou papel higiênico usado.</div>
        </li>
      </ul>
      
      <h3 class="text-xl font-semibold text-secondary mt-6 mb-2">A Investigação: Separando as Pistas 🧺</h3>
      <p class="mb-4">Para a reciclagem funcionar, o primeiro passo é separar o lixo reciclável do lixo comum (orgânico, como restos de comida, e rejeitos, como papel higiênico). Muitas cidades têm coleta seletiva, com dias específicos para buscar o lixo reciclável, ou postos onde você pode levar.</p>
      <div class="my-6 p-4 bg-primary/10 border-l-4 border-primary rounded-md">
        <p class="font-medium text-primary">Dica de Agente: Tenha lixeiras diferentes em casa! Uma para recicláveis e outra para o resto. Facilita muito!</p>
      </div>
      
      <h3 class="text-xl font-semibold text-secondary mt-6 mb-2">Por Que Ser um Detetive da Reciclagem? 🌟</h3>
      <ul class="list-disc list-inside space-y-1 mb-4 pl-4 text-foreground/90">
        <li>Economiza recursos naturais (precisamos cortar menos árvores, tirar menos minério).</li>
        <li>Diminui a quantidade de lixo nos aterros.</li>
        <li>Gera trabalho para muitas pessoas.</li>
        <li>Ajuda a manter o planeta mais limpo e saudável!</li>
      </ul>
      <p>Sua missão, caso decida aceitar, é começar a separar o lixo na sua casa hoje mesmo! O planeta agradece, agente!</p>
    `,
    quiz: [
      {
        question: "Qual destes itens geralmente NÃO é reciclável junto com os papéis comuns?",
        options: [
          "Jornal velho",
          "Caixa de pizza muito engordurada",
          "Revista antiga",
          "Folha de caderno usada"
        ],
        correctAnswer: 1
      },
      {
        question: "Para que serve a coleta seletiva?",
        options: [
          "Para deixar o lixo mais cheiroso",
          "Para separar os recicláveis do lixo comum, facilitando a reciclagem",
          "Para misturar todos os tipos de lixo",
          "Para queimar o lixo de forma organizada"
        ],
        correctAnswer: 1
      },
      {
        question: "Qual é um benefício importante da reciclagem?",
        options: [
          "Faz o lixo desaparecer magicamente",
          "Aumenta o tamanho dos aterros sanitários",
          "Economiza recursos naturais e diminui a poluição",
          "Deixa as ruas mais coloridas com lixeiras diferentes"
        ],
        correctAnswer: 2
      }
    ]
  },
  {
    id: "l5",
    type: "Missão Especial",
    title: "Guardiões da Água: Aventura Aquática!",
    description: "Descubra por que a água é tão preciosa e como podemos protegê-la com simples missões diárias.",
    points: 50,
    duration: "20 minutos",
    content: `
      <div class="text-center mb-6">
        <img  alt="Gotas de água sorridentes com capas de super-heróis, protegendo um rio limpo." class="w-1/2 mx-auto rounded-lg shadow-lg" src="https://images.unsplash.com/photo-1635665141455-a1c0e395a738" />
      </div>
      <h2 class="text-2xl font-bold text-primary mb-3">Chamando todos os Guardiões da Água! 💧🛡️</h2>
      <p class="mb-4">A água é como um superpoder para o nosso planeta e para nós! Usamos para beber, tomar banho, cozinhar, e as plantas e animais também precisam dela para viver. Mas, mesmo que pareça que tem muita água no mundo, a água limpa e potável é um tesouro que precisamos cuidar!</p>
      
      <h3 class="text-xl font-semibold text-secondary mt-6 mb-2">Por que ser um Guardião da Água? 🌍</h3>
      <ul class="list-disc list-inside space-y-1 mb-4 pl-4 text-foreground/90">
        <li><strong>Planeta Sedento:</strong> Apenas uma pequena parte da água da Terra é doce e fácil de usar.</li>
        <li><strong>Desperdício Aquático:</strong> Muitas vezes, usamos mais água do que precisamos sem perceber.</li>
        <li><strong>Poluição Perigosa:</strong> Jogar lixo nos rios ou produtos químicos no ralo suja a água, tornando-a imprópria.</li>
      </ul>
      
      <h3 class="text-xl font-semibold text-secondary mt-6 mb-2">Missões Diárias para Proteger Nosso Tesouro:</h3>
      <div class="space-y-4">
        <div class="p-4 bg-blue-500/10 border-2 border-blue-400/50 rounded-xl shadow-md hover:shadow-lg transition-shadow">
          <h4 class="text-lg font-semibold text-blue-600 mb-1">🚿 Missão Banho Veloz:</h4>
          <p class="text-foreground/90">Feche o chuveiro enquanto se ensaboa. Banhos mais curtos economizam muitos litros!</p>
        </div>
        <div class="p-4 bg-green-500/10 border-2 border-green-400/50 rounded-xl shadow-md hover:shadow-lg transition-shadow">
          <h4 class="text-lg font-semibold text-green-600 mb-1">🦷 Missão Torneira Fechada:</h4>
          <p class="text-foreground/90">Ao escovar os dentes ou lavar a louça, feche a torneira enquanto não estiver usando a água.</p>
        </div>
        <div class="p-4 bg-yellow-500/10 border-2 border-yellow-400/50 rounded-xl shadow-md hover:shadow-lg transition-shadow">
          <h4 class="text-lg font-semibold text-yellow-600 mb-1">💧 Missão Caça-Vazamentos:</h4>
          <p class="text-foreground/90">Fique de olho em torneiras pingando ou vasos sanitários com vazamento. Avise um adulto para consertar!</p>
        </div>
        <div class="p-4 bg-purple-500/10 border-2 border-purple-400/50 rounded-xl shadow-md hover:shadow-lg transition-shadow">
          <h4 class="text-lg font-semibold text-purple-600 mb-1">🗑️ Missão Lixo no Lixo:</h4>
          <p class="text-foreground/90">Nunca jogue lixo em rios, lagos ou no mar. Isso polui a casa dos peixinhos e a nossa água!</p>
        </div>
        <div class="p-4 bg-red-500/10 border-2 border-red-400/50 rounded-xl shadow-md hover:shadow-lg transition-shadow">
          <h4 class="text-lg font-semibold text-red-600 mb-1">🧼 Missão Produtos Amigos da Água:</h4>
          <p class="text-foreground/90">Peça aos adultos para usarem produtos de limpeza que não agridem tanto a natureza quando vão pelo ralo.</p>
        </div>
      </div>
      
      <div class="my-8 p-6 bg-primary/10 border-l-4 border-primary rounded-lg text-center">
        <p class="text-xl font-bold text-primary">Cada gotinha economizada faz uma onda de diferença! 🌊</p>
      </div>
      <p>Ao se tornar um Guardião da Água, você ajuda a garantir que teremos água limpa para todos, hoje e no futuro. Contamos com você nessa aventura aquática!</p>
    `,
    quiz: [
      {
        question: "Por que é importante economizar água, mesmo que pareça ter muita no planeta?",
        options: [
          "Para a conta de água vir mais barata",
          "Porque a água limpa e potável é um recurso limitado",
          "Para os peixes terem mais espaço para nadar",
          "Para não molhar muito o chão do banheiro"
        ],
        correctAnswer: 1
      },
      {
        question: "Qual destas ações é uma MISSÃO DE GUARDIÃO DA ÁGUA?",
        options: [
          "Deixar a torneira aberta enquanto escova os dentes para a água ficar fresquinha",
          "Tomar banhos bem longos para relaxar bastante",
          "Avisar um adulto se vir uma torneira pingando",
          "Jogar o papel de bala no bueiro da rua"
        ],
        correctAnswer: 2
      },
      {
        question: "O que acontece se jogarmos lixo nos rios?",
        options: [
          "O lixo vira comida de peixe",
          "A água fica mais colorida e divertida",
          "Poluímos a água, prejudicando os animais e a nós mesmos",
          "O lixo ajuda a limpar o rio"
        ],
        correctAnswer: 2
      }
    ]
  }
];
