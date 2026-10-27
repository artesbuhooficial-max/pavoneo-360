"use strict";
const bank = [
  {
    id:"MAN-01", area:"Management", priority:true,
    q:"¿Qué tendría que tener resuelto un artista antes de buscar mánager?",
    purpose:"Ayudar a reconocer el momento de pedir acompañamiento profesional.",
    focus:"Elige una señal decisiva y explica cómo comprobarla.",
    rescue:"Si solo pudieras pedirle una prueba, ¿cuál sería?",
    title:"¿Estás preparado para buscar mánager?",
    resource:"Román escuchando una propuesta; libreta sin datos de clientes.",
    cta:"¿Qué parte de tu proyecto tienes ya resuelta?"
  },
  {
    id:"MAN-02", area:"Management",
    q:"¿Qué error al presentar un proyecto hace difícil valorar su potencial?",
    purpose:"Mejorar la primera presentación a un equipo de management.",
    focus:"Un error, un ejemplo anónimo y una corrección.",
    rescue:"¿Cómo cambiarías esa presentación en una frase?",
    title:"Antes de enviar tu proyecto",
    resource:"Recrear en el móvil una presentación ficticia, sin datos personales.",
    cta:"¿Puedes explicar tu proyecto en dos frases?"
  },
  {
    id:"MAN-03", area:"Management",
    q:"¿Qué expectativa sobre un mánager aclararías en la primera reunión?",
    purpose:"Entender el reparto de responsabilidades.",
    focus:"Una expectativa habitual y qué debe acordarse entre ambas partes.",
    rescue:"¿Qué conversación tendrían que tener antes de empezar?",
    title:"La conversación antes del management",
    resource:"Conversación entre vosotros, con permiso si aparece otra persona.",
    cta:"¿Qué esperarías tú de un mánager?"
  },
  {
    id:"BOO-01", area:"Booking", priority:true,
    q:"¿Qué prueba de directo le enseñarías primero a un programador?",
    purpose:"Priorizar el material que permite valorar un concierto.",
    focus:"Elige una prueba y cuenta qué información debe transmitir.",
    rescue:"¿Qué debería poder comprobar en treinta segundos?",
    title:"Tu directo, en una primera impresión",
    resource:"Clip de directo propio o autorizado; si no, vosotros explicándolo.",
    cta:"¿Tu material muestra cómo suenas realmente en directo?"
  },
  {
    id:"BOO-02", area:"Booking",
    q:"¿Qué revisarías antes de aceptar un concierto lejos de casa?",
    purpose:"Valorar si una fecha es viable para el proyecto.",
    focus:"Un factor decisivo y un ejemplo con cifras hipotéticas, si ayuda.",
    rescue:"¿Qué dato pedirías antes de responder que sí?",
    title:"Antes de confirmar esa fecha",
    resource:"Lista ficticia de transporte, equipo y alojamiento.",
    cta:"¿Qué coste se te suele olvidar al preparar un concierto?"
  },
  {
    id:"BOO-03", area:"Booking",
    q:"¿Cómo harías seguimiento a un programador que no te ha contestado?",
    purpose:"Cuidar las relaciones sin convertir el contacto en insistencia.",
    focus:"Un ejemplo de seguimiento y el criterio para dejar de insistir.",
    rescue:"¿Qué escribirías exactamente en ese mensaje?",
    title:"Hacer seguimiento con criterio",
    resource:"Mensaje ficticio en pantalla, sin bandejas de correo reales.",
    cta:"¿Qué te cuesta más: presentarte o hacer seguimiento?"
  },
  {
    id:"AV-01", area:"Producción audiovisual", priority:true,
    q:"Si solo puedes grabar una pieza de vídeo, ¿cómo eliges cuál?",
    purpose:"Vincular la inversión audiovisual con una necesidad del artista.",
    focus:"Parte de un objetivo concreto: contratación, lanzamiento o comunidad.",
    rescue:"Para ese objetivo, ¿qué pieza harías primero y por qué?",
    title:"¿Qué vídeo necesita ahora tu proyecto?",
    resource:"Cámara, preparación de encuadre y una toma del artista.",
    cta:"¿Qué necesitas que consiga tu próximo vídeo?"
  },
  {
    id:"AV-02", area:"Producción audiovisual",
    q:"¿Qué tiene que quedar claro antes de encender la cámara?",
    purpose:"Evitar rodajes con material atractivo pero difícil de utilizar.",
    focus:"Una decisión previa y cómo cambia el rodaje.",
    rescue:"¿Qué pregunta le haces siempre al artista antes de grabar?",
    title:"La decisión que va antes del rodaje",
    resource:"Plano de estas tarjetas y preparación de la cámara.",
    cta:"¿Empiezas por la idea o por ponerte a grabar?"
  },
  {
    id:"AV-03", area:"Producción audiovisual",
    q:"¿Cómo sacas varias piezas de un rodaje sin repetir el mismo vídeo?",
    purpose:"Planificar material reutilizable con funciones distintas.",
    focus:"Un rodaje y dos piezas con objetivos diferentes.",
    rescue:"Dime dos piezas concretas que saldrían de esa sesión.",
    title:"Un rodaje, dos usos útiles",
    resource:"Plano general, detalle y conversación de una misma escena.",
    cta:"¿Qué material se queda sin usar después de tus rodajes?"
  },
  {
    id:"IND-01", area:"Formación en industria", priority:true,
    q:"¿Qué diferencia entre management y booking debería entender un artista?",
    purpose:"Saber a quién pedir ayuda y para qué.",
    focus:"Explica la diferencia mediante una situación cotidiana; matiza que los acuerdos varían.",
    rescue:"Si necesita fechas y si necesita estrategia, ¿a quién acudiría?",
    title:"Management y booking: quién hace qué",
    resource:"Dos rótulos sencillos sobre la respuesta de Román.",
    cta:"¿Qué función necesitas reforzar ahora?"
  },
  {
    id:"IND-02", area:"Formación en industria",
    q:"¿Qué pregunta debería llevar un artista a su primera reunión profesional?",
    purpose:"Convertir reuniones en decisiones y próximos pasos.",
    focus:"Una pregunta y qué permite descubrir.",
    rescue:"¿Cuál sería la pregunta literal?",
    title:"Una pregunta para tu próxima reunión",
    resource:"Vosotros entrando al recinto y tomando notas.",
    cta:"¿Con qué duda llegarías a esa reunión?"
  },
  {
    id:"IND-03", area:"Formación en industria",
    q:"¿Qué idea sobre la industria has cambiado con la experiencia?",
    purpose:"Mostrar criterio y humanidad a través de un aprendizaje real.",
    focus:"Antes pensaba esto; una experiencia me hizo cambiar; ahora hago esto.",
    rescue:"¿Qué pasó para que cambiaras de opinión?",
    title:"Lo que la experiencia nos hizo cambiar",
    resource:"Conversación natural entre vosotros, sin recursos adicionales.",
    cta:"¿Qué creencia has cambiado al desarrollar tu proyecto?"
  },
  {
    id:"MUS-01", area:"Formación musical", priority:true,
    q:"¿Qué trabajarías en el ensayo antes de buscar más conciertos?",
    purpose:"Conectar la preparación musical con la calidad del directo.",
    focus:"Una habilidad observable y un ejercicio sencillo para practicarla.",
    rescue:"¿Qué puede probar una banda en su próximo ensayo?",
    title:"El próximo concierto empieza en el ensayo",
    resource:"Ensayo propio autorizado o una demostración sencilla.",
    cta:"¿Qué vais a trabajar en vuestro próximo ensayo?"
  },
  {
    id:"MUS-02", area:"Formación musical",
    q:"¿Cómo distingues un ensayo productivo de tocar el repertorio entero?",
    purpose:"Mejorar la forma de practicar en grupo.",
    focus:"Un objetivo medible y cómo revisar si se ha conseguido.",
    rescue:"¿Qué tendría que sonar distinto al terminar?",
    title:"Ensayar con un objetivo",
    resource:"Lista de ensayo ficticia con un objetivo marcado.",
    cta:"¿Cómo decides si un ensayo ha ido bien?"
  },
  {
    id:"MUS-03", area:"Formación musical",
    q:"¿Cómo detectas qué formación te ayudaría más en este momento?",
    purpose:"Elegir aprendizaje según un bloqueo concreto del proyecto.",
    focus:"Un síntoma, una habilidad que falta y cómo empezar a trabajarla.",
    rescue:"¿Qué problema concreto ayudaría a resolver esa formación?",
    title:"Aprender lo que tu proyecto necesita",
    resource:"Román señalando un ejemplo en una libreta.",
    cta:"¿Qué habilidad te está frenando ahora?"
  }
];