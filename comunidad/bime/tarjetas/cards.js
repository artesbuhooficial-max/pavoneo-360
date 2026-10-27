"use strict";
const series = [
  {
    id: "BIME-01", area: "Conexiones", title: "De una caña a una red organizada",
    q: "¿Y si en BIME pescamos con una red organizada, en vez de ir cada uno con su caña?",
    purpose: "Convertir los encuentros individuales en colaboración y seguimiento.",
    focus: "Metáfora → coordinación entre artistas → acción después de la feria.",
    beats: ["Gancho: una caña llega a un punto; una red coordinada abre más conversaciones.", "Propuesta: crear un grupo de WhatsApp entre artistas, repartir intereses y compartir oportunidades y contactos profesionales públicos o autorizados.", "Acción: BIME empieza en la feria y continúa las dos semanas siguientes. Escribir, llamar cuando proceda, hacer seguimiento y desarrollar relaciones con empresas."],
    rescue: "¿Qué harías con ese grupo en las primeras 48 horas y durante las dos semanas siguientes?",
    guard: "La red es una propuesta de colaboración, no una garantía de resultados. Acordar qué se comparte y no divulgar datos privados de terceros.",
    resource: "Grupo ficticio de WhatsApp, mapa de intereses y agenda de seguimiento sin datos reales.",
    cta: "¿Con quién podrías coordinarte para aprovechar mejor la feria?"
  },
  {
    id: "BIME-02", area: "Mercado", title: "Qué necesita el mercado en 2026",
    q: "Román, ¿cuáles son las necesidades del mercado para la temporada 2026?",
    purpose: "Identificar qué necesitan resolver compradores y programadores concretos.",
    focus: "Una necesidad detectada en reuniones, un ejemplo y una respuesta posible del artista.",
    beats: ["Idea: ¿qué están pidiendo los compradores o programadores con los que te has reunido?", "Ejemplo: una necesidad concreta, sin identificar una reunión confidencial. ¿Qué te hace pensar que existe?", "Acción: ¿qué material, formato o propuesta puede preparar un artista para comprobar si encaja?"],
    rescue: "¿Puedes contar una petición concreta que hayas escuchado y cómo podría responder un artista?",
    guard: "Pregunta abierta para Román. No dar por hechos datos actuales ni generalizar una reunión a todo el mercado. Aquí hablamos de necesidades de compra; las tendencias van en el vídeo 6.",
    resource: "Lista ficticia de necesidades y propuesta artística, sin nombres de clientes.",
    cta: "¿Qué necesidad concreta resuelve hoy tu propuesta?"
  },
  {
    id: "BIME-03", area: "Booking", title: "Lo que puede valorar un festival",
    q: "¿Qué va a valorar un festival para contratarte?",
    purpose: "Traducir los criterios de contratación en pruebas que el artista pueda preparar.",
    focus: "Una señal concreta, cómo se demuestra y para qué tipo de festival tiene sentido.",
    beats: ["Idea: ¿qué señal te ayuda a valorar un proyecto para un festival concreto?", "Ejemplo: ¿qué prueba te permitiría comprobarla y qué contexto necesitarías?", "Acción: ¿qué puede preparar el artista antes de contactar con ese programador?"],
    rescue: "Si solo pudiera enviar una prueba, ¿cuál elegirías y qué tendría que mostrar?",
    guard: "Los festivales y sus criterios varían. Pedir contexto; no presentar una lista universal ni prometer contratación.",
    resource: "Fragmento de directo propio o autorizado y dossier ficticio.",
    cta: "¿Qué prueba de tu proyecto enviarías a un festival?"
  },
  {
    id: "BIME-04", area: "Discográficas", title: "Antes de pedir financiación a un sello",
    q: "¿Qué va a valorar una discográfica para financiar tu trabajo?",
    purpose: "Entender qué necesita conocer un sello para estudiar una propuesta.",
    focus: "Un criterio según el sello, un ejemplo y una acción de preparación.",
    beats: ["Idea: ¿qué tendría que ver una discográfica para empezar a valorar el proyecto?", "Ejemplo: ¿cómo se demuestra ese criterio en un caso concreto o hipotético, señalado como tal?", "Acción: ¿qué prepararía el artista antes de pedir una reunión o presentar su trabajo?"],
    rescue: "¿Qué dato o material pedirías primero para poder valorar esa propuesta?",
    guard: "La respuesta se recogerá al grabar. Los acuerdos dependen del sello y del proyecto; preparar una propuesta no garantiza financiación.",
    resource: "Presentación ficticia de un lanzamiento y escucha de música propia autorizada.",
    cta: "¿Qué necesitas explicar mejor antes de presentar tu trabajo a un sello?"
  },
  {
    id: "BIME-05", area: "Presentación", title: "Tu música también tiene que entrar en la conversación",
    q: "¿Y si el recurso que no estás usando en una feria es tu propia música?",
    purpose: "Pasar de contar únicamente la trayectoria a mostrar la propuesta artística.",
    focus: "La música como carta de presentación, con permiso y en el momento adecuado.",
    beats: ["Gancho: vienes buscando management o discográfica y cuentas tu trayectoria… ¿has dejado escuchar tu música?", "Propuesta: si el contexto lo permite, preguntar «¿te puedo enseñar unos segundos de una canción?»; mostrarla o cantar brevemente.", "Acción: llevar preparado un fragmento y una alternativa con enlace. Si no es el momento o la persona no quiere, respetarlo y cerrar con amabilidad."],
    rescue: "¿Cómo pedirías permiso para mostrar una canción sin invadir la conversación?",
    guard: "Es una propuesta para la grabación, no un testimonio atribuido a Román. No interrumpir actividades ni insistir ante un no.",
    resource: "Demostración breve con música propia y una conversación recreada con permiso.",
    cta: "¿Qué fragmento elegirías para presentar tu música?"
  },
  {
    id: "BIME-06", area: "Tendencias", title: "Qué está cambiando esta temporada",
    q: "¿Cuáles son las tendencias que estás observando para esta temporada?",
    purpose: "Explorar cambios en industria, formatos o público y cómo contrastarlos.",
    focus: "Un cambio observado, sus señales y una forma de comprobar si afecta al proyecto.",
    beats: ["Idea: ¿qué cambio estás observando en la industria, los formatos o el público?", "Ejemplo: ¿dónde lo has visto y con qué otras señales o fuentes lo contrastarías?", "Acción: ¿qué pequeña prueba puede hacer un artista antes de adaptar todo su proyecto?"],
    rescue: "¿Cómo distinguirías una tendencia de una impresión aislada o una moda puntual?",
    guard: "No completar la respuesta con tendencias supuestas. Diferenciar observación, interpretación y evidencia. Las necesidades concretas de compradores van en el vídeo 2.",
    resource: "Román explicando una observación; añadir datos o gráficos solo después de verificarlos.",
    cta: "¿Qué cambio estás observando tú y cómo lo estás comprobando?"
  },
  {
    id: "BIME-07", area: "Estrategia", title: "Ir a BIME con objetivos concretos",
    q: "¿Qué objetivos te planteas para BIME 2026 y cómo sabrás si has avanzado?",
    purpose: "Llevar objetivos propios claros, medibles, realizables y con plazo.",
    focus: "Elegir UN objetivo para esta toma: objetivo → prueba de avance → siguiente paso con fecha.",
    beats: ["Idea: escoger uno de los tres objetivos declarados por David: acuerdos con artistas estelares; festivales para sus artistas; conocer nuevos artistas con buenos perfiles.", "Ejemplo: concretar destinatario y propuesta. ¿Qué avance realista podrías comprobar? Definir una medida y una fecha sin inventar cifras ya alcanzadas.", "Acción: atreverse a presentarse, generar interés con credibilidad y propuesta artística, y acordar un próximo paso sin resultar pesado."],
    extra: ["Objetivo 1 · Cerrar acuerdos con artistas estelares: concretar qué acuerdo se busca y con quién tiene sentido hablar.", "Objetivo 2 · Cerrar festivales para sus artistas: elegir encaje, prueba de directo y siguiente conversación.", "Objetivo 3 · Conocer nuevos artistas con buenos perfiles: definir qué perfil se busca y qué permitiría valorarlo.", "Para cada objetivo: resultado deseado + medida de avance + acción viable + fecha de revisión. Las cantidades y plazos los concreta David.", "«Ley de 100 contra uno»: usarla solo como metáfora de constancia ante el rechazo; no es una estadística ni una tasa de conversión garantizada. Constancia también significa respetar un no."],
    rescue: "Elige uno: ¿qué harás, qué señal de avance medirás y en qué fecha lo revisarás?",
    guard: "Los tres objetivos son de David. No presentarlos como logros ni atribuirlos automáticamente a Román. Ampliar en otra toma si no caben en 45 segundos.",
    resource: "Una tarjeta con objetivo, medida y fecha aún por concretar; preparación de una presentación breve.",
    cta: "¿Cuál es tu objetivo concreto y cuándo vas a revisarlo?"
  },
  {
    id: "BIME-08", area: "Actitud", title: "Dar el primer paso aunque cueste venderte",
    q: "¿Cómo dar el primer paso cuando te da miedo presentar y vender tu proyecto?",
    purpose: "Reconocer el miedo al rechazo y proponer una acción pequeña y practicable.",
    focus: "Empatía → comunicar también es parte del trabajo → un paso pequeño hoy.",
    beats: ["Empatía: exponer algo en lo que has trabajado y recibir un no puede doler. Reconocerlo sin juzgar.", "Idea: crear no termina al acabar la obra. Comunicarla y ofrecerla también forma parte del trabajo y honra el esfuerzo dedicado.", "Acción: preparar dos frases y presentarte hoy a una persona adecuada, preguntando si tiene un minuto. Buscar una conversación, escuchar y respetar su respuesta."],
    rescue: "¿Qué paso de un minuto podría dar hoy alguien que se está bloqueando?",
    guard: "Tono cálido, directo y práctico. Sin insultos, humillación ni presión. Un rechazo no define el valor de la persona ni de su obra.",
    resource: "Ensayo de una presentación de dos frases y un primer saludo recreado.",
    cta: "¿A quién podrías presentarte hoy con dos frases sencillas?"
  },
  {
    id: "BIME-09", area: "Actitud", title: "Una conversación cotidiana puede abrir una puerta",
    q: "¿Qué es BIME y qué oportunidad puede abrir si vas con intención?",
    purpose: "No pasar por la feria de paso: reconocer conversaciones que merece la pena cuidar.",
    focus: "Un momento cotidiano → una conversación con intención → seguimiento.",
    beats: ["Gancho propuesto: los momentos determinantes pueden parecer cotidianos. Pedir a Román que explique qué es BIME desde su experiencia.", "Ejemplo: ¿qué conversación podría abrir una oportunidad? Si cuenta una experiencia, pedir una real y anonimizarla cuando corresponda.", "Acción: acudir con intención, iniciar una conversación relevante y acordar un seguimiento. Dar continuidad puede abrir posibilidades profesionales."],
    rescue: "¿Qué harías para que una conversación de pasillo no se quedara solo en un saludo?",
    guard: "No prometer un antes y un después ni inventar experiencias. La oportunidad depende de lo que ocurra y del trabajo posterior.",
    resource: "Entrada al recinto, conversación consentida y anotación de un próximo paso sin datos privados.",
    cta: "¿Qué conversación te gustaría abrir y cómo le darías continuidad?"
  }
].map(c => ({...c, collection: "series", priority: false}));
const cards = [...series, ...bank.map(c => ({...c, collection: "bank", beats: [c.focus, "Pide un ejemplo concreto y termina con una acción que el artista pueda probar."], guard: "Las propuestas son guías de entrevista. Ajustar títulos y textos a lo que se grabe realmente."}))];
