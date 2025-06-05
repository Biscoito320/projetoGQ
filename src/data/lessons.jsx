export const lessons = [
  {
    id: "l1",
    title: "Introdução às Mudanças Climáticas",
    description: "Entenda os conceitos básicos sobre mudanças climáticas, efeito estufa e aquecimento global.",
    points: 30,
    duration: "20 minutos",
    content: `
      <h2>O que são Mudanças Climáticas?</h2>
      <p>As mudanças climáticas referem-se a alterações significativas nos padrões climáticos globais, principalmente causadas pela atividade humana desde a era pré-industrial.</p>
      
      <h2>Efeito Estufa</h2>
      <p>O efeito estufa é um processo natural que aquece a superfície da Terra. Quando a energia do Sol atinge a atmosfera da Terra, parte é refletida de volta ao espaço e o resto é absorvido e irradiado pela Terra. Os gases de efeito estufa (GEE) na atmosfera impedem que parte desse calor escape para o espaço, mantendo a Terra aquecida o suficiente para sustentar a vida.</p>
      
      <h2>Aquecimento Global</h2>
      <p>O aquecimento global é o aumento gradual da temperatura média da superfície da Terra devido ao aumento dos níveis de gases de efeito estufa na atmosfera. Este aumento é principalmente resultado da queima de combustíveis fósseis, desmatamento e práticas agrícolas intensivas.</p>
      
      <h2>Impactos das Mudanças Climáticas</h2>
      <ul>
        <li>Aumento do nível do mar</li>
        <li>Eventos climáticos extremos mais frequentes</li>
        <li>Alterações nos padrões de precipitação</li>
        <li>Perda de biodiversidade</li>
        <li>Impactos na saúde humana</li>
        <li>Insegurança alimentar</li>
      </ul>
    `,
    quiz: [
      {
        question: "Qual é a principal causa do aquecimento global atual?",
        options: [
          "Atividade solar",
          "Atividades humanas e emissão de gases de efeito estufa",
          "Processos geológicos naturais",
          "Rotação da Terra"
        ],
        correctAnswer: 1
      },
      {
        question: "Qual destes NÃO é um gás de efeito estufa?",
        options: [
          "Dióxido de carbono (CO2)",
          "Metano (CH4)",
          "Oxigênio (O2)",
          "Óxido nitroso (N2O)"
        ],
        correctAnswer: 2
      },
      {
        question: "Qual das seguintes consequências está diretamente relacionada ao aquecimento global?",
        options: [
          "Diminuição do nível dos oceanos",
          "Aumento da camada de ozônio",
          "Derretimento das calotas polares",
          "Diminuição da temperatura global"
        ],
        correctAnswer: 2
      }
    ]
  },
  {
    id: "l2",
    title: "Pegada de Carbono",
    description: "Aprenda a calcular e reduzir sua pegada de carbono pessoal.",
    points: 40,
    duration: "25 minutos",
    content: `
      <h2>O que é Pegada de Carbono?</h2>
      <p>A pegada de carbono é a quantidade total de gases de efeito estufa (GEE) emitidos direta e indiretamente por uma pessoa, organização, evento ou produto, expressa em toneladas de dióxido de carbono equivalente (CO2e).</p>
      
      <h2>Como Calcular sua Pegada de Carbono</h2>
      <p>Sua pegada de carbono pessoal é calculada considerando diversos aspectos do seu estilo de vida:</p>
      <ul>
        <li><strong>Transporte:</strong> Uso de carro, avião, transporte público</li>
        <li><strong>Energia doméstica:</strong> Eletricidade, gás, aquecimento</li>
        <li><strong>Alimentação:</strong> Tipo de dieta, origem dos alimentos</li>
        <li><strong>Consumo:</strong> Roupas, eletrônicos, outros produtos</li>
        <li><strong>Resíduos:</strong> Quantidade gerada e destinação</li>
      </ul>
      
      <h2>Estratégias para Reduzir sua Pegada de Carbono</h2>
      <ol>
        <li><strong>Transporte:</strong> Opte por caminhada, bicicleta ou transporte público. Se precisar de carro, considere caronas compartilhadas ou veículos elétricos.</li>
        <li><strong>Energia:</strong> Use fontes renováveis, aparelhos eficientes e reduza o consumo desnecessário.</li>
        <li><strong>Alimentação:</strong> Reduza o consumo de carne, especialmente vermelha, e priorize alimentos locais e sazonais.</li>
        <li><strong>Consumo:</strong> Pratique o minimalismo, repare itens quebrados e compre produtos de segunda mão.</li>
        <li><strong>Resíduos:</strong> Siga a regra dos 5Rs: Recusar, Reduzir, Reutilizar, Reciclar e Recompor (compostar).</li>
      </ol>
    `,
    quiz: [
      {
        question: "Qual atividade geralmente contribui mais para a pegada de carbono pessoal?",
        options: [
          "Uso de eletrodomésticos",
          "Transporte, especialmente viagens aéreas e uso de carro",
          "Uso de dispositivos eletrônicos",
          "Consumo de água"
        ],
        correctAnswer: 1
      },
      {
        question: "Qual destas dietas tem a menor pegada de carbono?",
        options: [
          "Dieta rica em carne vermelha",
          "Dieta baseada em frutos do mar",
          "Dieta vegetariana",
          "Dieta vegana"
        ],
        correctAnswer: 3
      },
      {
        question: "O que significa CO2e?",
        options: [
          "Carbono dióxido extra",
          "Dióxido de carbono equivalente",
          "Composto de oxigênio duplo",
          "Carbono e oxigênio equilibrados"
        ],
        correctAnswer: 1
      }
    ]
  },
  {
    id: "l3",
    title: "Energias Renováveis",
    description: "Conheça as principais fontes de energia renovável e seu papel na mitigação das mudanças climáticas.",
    points: 35,
    duration: "30 minutos",
    content: `
      <h2>O que são Energias Renováveis?</h2>
      <p>Energias renováveis são aquelas obtidas de fontes naturais que se regeneram e são praticamente inesgotáveis na escala de tempo humana. Diferentemente dos combustíveis fósseis, as fontes renováveis geralmente emitem pouco ou nenhum gás de efeito estufa.</p>
      
      <h2>Principais Tipos de Energia Renovável</h2>
      
      <h3>Energia Solar</h3>
      <p>Obtida através da captação da luz e do calor emitidos pelo Sol. Pode ser convertida em eletricidade através de painéis fotovoltaicos ou usada diretamente como energia térmica.</p>
      
      <h3>Energia Eólica</h3>
      <p>Gerada pelo movimento das massas de ar (vento). Turbinas eólicas convertem a energia cinética do vento em energia mecânica, que é então transformada em eletricidade.</p>
      
      <h3>Energia Hidrelétrica</h3>
      <p>Produzida pelo aproveitamento do fluxo ou queda d'água. Embora renovável, grandes hidrelétricas podem causar impactos ambientais significativos.</p>
      
      <h3>Biomassa</h3>
      <p>Derivada de matéria orgânica vegetal ou animal que pode ser utilizada na produção de energia. Inclui resíduos agrícolas, florestais, urbanos e biocombustíveis.</p>
      
      <h3>Energia Geotérmica</h3>
      <p>Obtida a partir do calor proveniente do interior da Terra. Pode ser usada diretamente para aquecimento ou para gerar eletricidade.</p>
      
      <h3>Energia Maremotriz e das Ondas</h3>
      <p>Aproveita o movimento das marés e das ondas do mar para gerar eletricidade.</p>
      
      <h2>Importância das Energias Renováveis</h2>
      <ul>
        <li>Redução das emissões de gases de efeito estufa</li>
        <li>Diminuição da dependência de combustíveis fósseis</li>
        <li>Diversificação da matriz energética</li>
        <li>Geração de empregos e desenvolvimento econômico</li>
        <li>Acesso à energia em áreas remotas</li>
      </ul>
    `,
    quiz: [
      {
        question: "Qual destas NÃO é uma fonte de energia renovável?",
        options: [
          "Energia solar",
          "Energia nuclear",
          "Energia eólica",
          "Energia geotérmica"
        ],
        correctAnswer: 1
      },
      {
        question: "Qual é a principal vantagem das energias renováveis em relação às mudanças climáticas?",
        options: [
          "São mais baratas de produzir",
          "Estão disponíveis em todos os países",
          "Emitem pouco ou nenhum gás de efeito estufa",
          "Não requerem manutenção"
        ],
        correctAnswer: 2
      },
      {
        question: "Qual fonte de energia renovável depende diretamente da rotação da Terra e da gravidade da Lua?",
        options: [
          "Energia solar",
          "Energia eólica",
          "Energia maremotriz",
          "Energia geotérmica"
        ],
        correctAnswer: 2
      }
    ]
  },
  {
    id: "l4",
    title: "Economia Circular",
    description: "Entenda o conceito de economia circular e como ele pode ajudar a reduzir o impacto ambiental.",
    points: 45,
    duration: "25 minutos",
    content: `
      <h2>O que é Economia Circular?</h2>
      <p>A economia circular é um modelo econômico que visa eliminar resíduos e poluição, manter produtos e materiais em uso e regenerar sistemas naturais. Diferente do modelo linear tradicional de "extrair-produzir-descartar", a economia circular busca redesenhar processos e produtos para que os recursos possam ser continuamente reutilizados.</p>
      
      <h2>Princípios da Economia Circular</h2>
      <ol>
        <li><strong>Design sem resíduos e poluição:</strong> Considerar os impactos ambientais desde a concepção dos produtos.</li>
        <li><strong>Manter produtos e materiais em uso:</strong> Estender a vida útil dos produtos através de reparos, remanufatura e reciclagem.</li>
        <li><strong>Regenerar sistemas naturais:</strong> Devolver nutrientes ao solo e outros sistemas naturais.</li>
      </ol>
      
      <h2>Estratégias da Economia Circular</h2>
      <ul>
        <li><strong>Ecodesign:</strong> Projetar produtos duráveis, reparáveis e recicláveis.</li>
        <li><strong>Servitização:</strong> Oferecer serviços em vez de produtos (ex: compartilhamento, aluguel).</li>
        <li><strong>Simbiose industrial:</strong> Usar resíduos de uma indústria como insumos para outra.</li>
        <li><strong>Logística reversa:</strong> Retornar produtos pós-consumo para remanufatura ou reciclagem.</li>
        <li><strong>Upcycling:</strong> Transformar resíduos em produtos de maior valor.</li>
      </ul>
      
      <h2>Benefícios da Economia Circular</h2>
      <ul>
        <li><strong>Ambientais:</strong> Redução de resíduos, emissões e extração de recursos naturais.</li>
        <li><strong>Econômicos:</strong> Novas oportunidades de negócios, redução de custos e riscos.</li>
        <li><strong>Sociais:</strong> Criação de empregos, produtos mais acessíveis e duráveis.</li>
      </ul>
      
      <h2>Exemplos de Economia Circular</h2>
      <ul>
        <li>Empresas de reciclagem que transformam garrafas PET em tecidos</li>
        <li>Plataformas de compartilhamento de carros e bicicletas</li>
        <li>Fabricantes que aceitam produtos usados para remanufatura</li>
        <li>Compostagem de resíduos orgânicos para produção de adubo</li>
      </ul>
    `,
    quiz: [
      {
        question: "Qual é a principal diferença entre economia linear e economia circular?",
        options: [
          "A economia linear é mais moderna que a circular",
          "A economia circular visa manter materiais em uso, enquanto a linear segue o modelo extrair-produzir-descartar",
          "A economia linear usa apenas recursos renováveis",
          "A economia circular só se aplica a países desenvolvidos"
        ],
        correctAnswer: 1
      },
      {
        question: "O que é 'upcycling'?",
        options: [
          "Processo de reciclagem industrial",
          "Transformar resíduos em produtos de maior valor",
          "Exportação de lixo para outros países",
          "Técnica de compostagem acelerada"
        ],
        correctAnswer: 1
      },
      {
        question: "Qual destas práticas NÃO é um exemplo de economia circular?",
        options: [
          "Compartilhamento de ferramentas entre vizinhos",
          "Compostagem de resíduos orgânicos",
          "Extração contínua de novos recursos naturais",
          "Reparo de eletrodomésticos quebrados"
        ],
        correctAnswer: 2
      }
    ]
  },
  {
    id: "l5",
    title: "Ação Climática Individual e Coletiva",
    description: "Descubra como suas ações individuais e a mobilização coletiva podem impactar positivamente o clima.",
    points: 50,
    duration: "35 minutos",
    content: `
      <h2>O Poder da Ação Individual</h2>
      <p>Embora as mudanças climáticas sejam um desafio global que exige ações em larga escala, as escolhas individuais têm um papel importante. Cada pessoa pode contribuir para a redução de emissões de gases de efeito estufa e inspirar outros a fazerem o mesmo.</p>
      
      <h3>Ações Individuais Efetivas</h3>
      <ul>
        <li><strong>Transporte:</strong> Reduzir viagens de avião, usar transporte público, bicicleta ou caminhar.</li>
        <li><strong>Alimentação:</strong> Adotar uma dieta mais baseada em plantas e reduzir o desperdício de alimentos.</li>
        <li><strong>Energia:</strong> Melhorar a eficiência energética em casa e optar por fontes renováveis.</li>
        <li><strong>Consumo:</strong> Comprar menos, escolher produtos duráveis e de empresas comprometidas com a sustentabilidade.</li>
        <li><strong>Investimentos:</strong> Direcionar investimentos para empresas e fundos que priorizam práticas sustentáveis.</li>
      </ul>
      
      <h2>A Importância da Ação Coletiva</h2>
      <p>Enquanto as ações individuais são importantes, a ação coletiva tem o potencial de gerar mudanças sistêmicas mais profundas e duradouras.</p>
      
      <h3>Formas de Ação Coletiva</h3>
      <ul>
        <li><strong>Engajamento político:</strong> Votar em candidatos comprometidos com políticas climáticas, participar de consultas públicas.</li>
        <li><strong>Ativismo:</strong> Participar de movimentos, campanhas e manifestações por justiça climática.</li>
        <li><strong>Comunidade:</strong> Iniciar ou participar de projetos comunitários como hortas urbanas, cooperativas de energia renovável.</li>
        <li><strong>Educação:</strong> Compartilhar conhecimento sobre mudanças climáticas e soluções com amigos, família e comunidade.</li>
        <li><strong>Pressão sobre empresas:</strong> Exigir práticas sustentáveis das empresas através de campanhas, boicotes ou apoio a negócios responsáveis.</li>
      </ul>
      
      <h2>Superando Barreiras à Ação</h2>
      <ul>
        <li><strong>Desesperança:</strong> Focar em soluções e celebrar vitórias, mesmo pequenas.</li>
        <li><strong>Sobrecarga de informação:</strong> Concentrar-se em ações específicas e relevantes para seu contexto.</li>
        <li><strong>Falta de infraestrutura:</strong> Unir-se a outros para exigir mudanças estruturais.</li>
        <li><strong>Custo:</strong> Identificar ações que economizam dinheiro (como eficiência energética) e pressionar por políticas que tornem opções sustentáveis mais acessíveis.</li>
      </ul>
      
      <h2>Justiça Climática</h2>
      <p>A justiça climática reconhece que os impactos das mudanças climáticas não são distribuídos igualmente e que as soluções devem considerar questões de equidade e direitos humanos. Comunidades marginalizadas frequentemente sofrem mais com os impactos climáticos, apesar de terem contribuído menos para o problema.</p>
    `,
    quiz: [
      {
        question: "Qual destas ações individuais geralmente tem o maior impacto na redução da pegada de carbono pessoal?",
        options: [
          "Reciclar todo o lixo doméstico",
          "Reduzir drasticamente o consumo de carne vermelha",
          "Usar sacolas reutilizáveis para compras",
          "Desligar as luzes quando não estão em uso"
        ],
        correctAnswer: 1
      },
      {
        question: "O que é 'justiça climática'?",
        options: [
          "Leis que punem crimes ambientais",
          "Distribuição igualitária de recursos naturais",
          "Reconhecimento de que os impactos climáticos e responsabilidades não são distribuídos igualmente",
          "Sistema judicial especializado em questões ambientais"
        ],
        correctAnswer: 2
      },
      {
        question: "Por que a ação coletiva é importante para enfrentar as mudanças climáticas?",
        options: [
          "Porque as ações individuais não têm nenhum impacto",
          "Porque pode gerar mudanças sistêmicas e estruturais mais profundas",
          "Porque é mais fácil que a ação individual",
          "Porque apenas governos podem resolver o problema climático"
        ],
        correctAnswer: 1
      }
    ]
  }
];