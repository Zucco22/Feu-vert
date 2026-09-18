// Auto-extracted from the Feu Vert prototype — all content preserved verbatim.
// Signs & scenes are SVG strings, rendered with react-native-svg <SvgXml/>.
// In each question, choices[0] is the CORRECT answer (shuffled at display time).

export const SIGN = {
    stop:'<svg viewBox="0 0 100 100"><polygon points="31,4 69,4 96,31 96,69 69,96 31,96 4,69 4,31" fill="#C4102F" stroke="#fff" stroke-width="5"/><text x="50" y="61" font-family="Barlow Condensed, sans-serif" font-weight="700" font-size="27" fill="#fff" text-anchor="middle">STOP</text></svg>',
    yield:'<svg viewBox="0 0 100 100"><polygon points="50,94 4,12 96,12" fill="#fff" stroke="#C4102F" stroke-width="9"/></svg>',
    priority:'<svg viewBox="0 0 100 100"><polygon points="50,4 96,50 50,96 4,50" fill="#F2C94C" stroke="#fff" stroke-width="5"/><polygon points="50,4 96,50 50,96 4,50" fill="none" stroke="#1B1F27" stroke-width="2"/></svg>',
    danger:'<svg viewBox="0 0 100 100"><polygon points="50,6 96,90 4,90" fill="#fff" stroke="#C4102F" stroke-width="8"/><line x1="50" y1="34" x2="50" y2="62" stroke="#1B1F27" stroke-width="7" stroke-linecap="round"/><circle cx="50" cy="75" r="4.5" fill="#1B1F27"/></svg>',
    speed:function(n){ var fs = String(n).length>2? 28:34; return '<svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="45" fill="#fff" stroke="#C4102F" stroke-width="10"/><text x="50" y="63" font-family="Barlow Condensed, sans-serif" font-weight="700" font-size="'+fs+'" fill="#1B1F27" text-anchor="middle">'+n+'</text></svg>'; },
    obligation:'<svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="46" fill="#1B4F8C"/><path d="M50 22 L50 68 M34 54 L50 70 L66 54" fill="none" stroke="#fff" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    parking:'<svg viewBox="0 0 100 100"><rect x="6" y="6" width="88" height="88" rx="12" fill="#1B4F8C"/><text x="50" y="70" font-family="Barlow Condensed, sans-serif" font-weight="700" font-size="50" fill="#fff" text-anchor="middle">P</text></svg>',
    noParking:'<svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="46" fill="#1B4F8C"/><text x="50" y="70" font-family="Barlow Condensed, sans-serif" font-weight="700" font-size="46" fill="#fff" text-anchor="middle">P</text><circle cx="50" cy="50" r="46" fill="none" stroke="#C4102F" stroke-width="9"/><line x1="16" y1="84" x2="84" y2="16" stroke="#C4102F" stroke-width="9" stroke-linecap="round"/></svg>',
    zone30:'<svg viewBox="0 0 100 100"><rect x="6" y="6" width="88" height="88" rx="12" fill="#fff" stroke="#1B1F27" stroke-width="6"/><text x="50" y="58" font-family="Barlow Condensed, sans-serif" font-weight="700" font-size="32" fill="#1B1F27" text-anchor="middle">30</text><text x="50" y="80" font-family="Barlow Condensed, sans-serif" font-weight="600" font-size="13" letter-spacing="2" fill="#1B1F27" text-anchor="middle">ZONE</text></svg>',
    pedestrian:'<svg viewBox="0 0 100 100"><rect x="6" y="6" width="88" height="88" rx="12" fill="#1B4F8C"/><circle cx="50" cy="28" r="8" fill="#fff"/><path d="M50 38 v20 l-16 28 M50 58 l16 28 M40 48 l-13 16 M60 48 l13 16" stroke="#fff" stroke-width="7" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    noOvertake:'<svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="46" fill="#fff" stroke="#C4102F" stroke-width="9"/><rect x="14" y="46" width="30" height="16" rx="4" fill="#1B1F27"/><rect x="50" y="36" width="30" height="16" rx="4" fill="#C4102F"/></svg>',
    panonceau:'<svg viewBox="0 0 100 120"><polygon points="50,4 90,62 10,62" fill="#fff" stroke="#C4102F" stroke-width="7"/><rect x="14" y="74" width="72" height="34" rx="4" fill="#fff" stroke="#1B1F27" stroke-width="5"/></svg>',
    novice:'<svg viewBox="0 0 100 100"><rect x="8" y="8" width="84" height="84" rx="10" fill="#fff" stroke="#1B1F27" stroke-width="4"/><text x="50" y="72" font-family="Barlow Condensed, sans-serif" font-weight="700" font-size="58" fill="#C4102F" text-anchor="middle">A</text></svg>',
    alcohol:'<svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="46" fill="#fff" stroke="#C4102F" stroke-width="9"/><path d="M36 24 h28 l-5 16 v30 h-18 v-30 z" fill="none" stroke="#1B1F27" stroke-width="6" stroke-linejoin="round"/><line x1="16" y1="84" x2="84" y2="16" stroke="#C4102F" stroke-width="9" stroke-linecap="round"/></svg>',
    drugs:'<svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="46" fill="#fff" stroke="#C4102F" stroke-width="9"/><rect x="30" y="40" width="40" height="20" rx="10" fill="none" stroke="#1B1F27" stroke-width="6"/><line x1="50" y1="40" x2="50" y2="60" stroke="#1B1F27" stroke-width="5"/><line x1="16" y1="84" x2="84" y2="16" stroke="#C4102F" stroke-width="9" stroke-linecap="round"/></svg>',
    seatbelt:'<svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="46" fill="#1B4F8C"/><circle cx="50" cy="34" r="10" fill="#fff"/><path d="M28 90 Q30 55 50 50 Q70 55 72 90" fill="none" stroke="#fff" stroke-width="7"/><path d="M30 40 L74 78" stroke="#F2C94C" stroke-width="9" stroke-linecap="round"/></svg>',
    phone:'<svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="46" fill="#fff" stroke="#C4102F" stroke-width="9"/><rect x="36" y="20" width="28" height="60" rx="7" fill="none" stroke="#1B1F27" stroke-width="6"/><line x1="16" y1="84" x2="84" y2="16" stroke="#C4102F" stroke-width="9" stroke-linecap="round"/></svg>',
    bike:'<svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="46" fill="#1B4F8C"/><circle cx="34" cy="66" r="12" fill="none" stroke="#fff" stroke-width="5"/><circle cx="66" cy="66" r="12" fill="none" stroke="#fff" stroke-width="5"/><path d="M34 66 L50 38 L66 66 M42 52 L58 52 M50 38 L50 30" stroke="#fff" stroke-width="5" fill="none" stroke-linecap="round"/></svg>',
    roundaboutArrow:'<svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="46" fill="#1B4F8C"/><path d="M 50 75 A 25 25 0 0 0 73.8 57.7" fill="none" stroke="#fff" stroke-width="7" stroke-linecap="round"/><polygon points="77.5 46.4 84.4 63.7 61.7 56.3" fill="#fff"/><path d="M 28.3 37.5 A 25 25 0 0 0 31.4 66.7" fill="none" stroke="#fff" stroke-width="7" stroke-linecap="round"/><polygon points="39.4 75.6 21 72.9 38.7 57" fill="#fff"/><path d="M 71.7 37.5 A 25 25 0 0 0 44.8 25.5" fill="none" stroke="#fff" stroke-width="7" stroke-linecap="round"/><polygon points="33.2 28 44.7 13.4 49.6 36.7" fill="#fff"/></svg>',
    blinker:'<svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="46" fill="#1B4F8C"/><path d="M30 50 h26 M56 38 l14 12 -14 12" fill="none" stroke="#fff" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    headlights:'<svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="46" fill="#1B1F27"/><path d="M30 40 h20 l14 10 -14 10 h-20 z" fill="#F2C94C"/><line x1="66" y1="42" x2="86" y2="34" stroke="#F2C94C" stroke-width="4" stroke-linecap="round"/><line x1="66" y1="50" x2="88" y2="50" stroke="#F2C94C" stroke-width="4" stroke-linecap="round"/><line x1="66" y1="58" x2="86" y2="66" stroke="#F2C94C" stroke-width="4" stroke-linecap="round"/></svg>',
    urgent:'<svg viewBox="0 0 100 100"><rect x="18" y="42" width="64" height="30" rx="8" fill="#C4102F"/><rect x="30" y="26" width="16" height="20" rx="4" fill="#1B4F8C"/><circle cx="30" cy="74" r="8" fill="#1B1F27"/><circle cx="70" cy="74" r="8" fill="#1B1F27"/><path d="M50 20 l6 12 h-12 z" fill="#F2C94C"/></svg>',
    stopwatch:'<svg viewBox="0 0 100 100"><circle cx="50" cy="54" r="38" fill="#fff" stroke="#1B4F8C" stroke-width="8"/><line x1="50" y1="54" x2="50" y2="30" stroke="#1B1F27" stroke-width="6" stroke-linecap="round"/><line x1="50" y1="54" x2="66" y2="54" stroke="#1B1F27" stroke-width="6" stroke-linecap="round"/><line x1="38" y1="10" x2="62" y2="10" stroke="#1B4F8C" stroke-width="8" stroke-linecap="round"/></svg>',
    wheelchair:'<svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="46" fill="#1B4F8C"/><circle cx="42" cy="30" r="8" fill="#fff"/><path d="M42 40 v18 h20" fill="none" stroke="#fff" stroke-width="6" stroke-linecap="round"/><circle cx="42" cy="74" r="16" fill="none" stroke="#fff" stroke-width="5"/></svg>',
    crossing:'<svg viewBox="0 0 100 100"><rect x="4" y="42" width="92" height="4" fill="#8b9096"/><rect x="4" y="54" width="92" height="4" fill="#8b9096"/><path d="M50 4 v92" stroke="#8b9096" stroke-width="4" stroke-dasharray="8 6"/><rect x="28" y="30" width="20" height="11" rx="2" fill="#1B4F8C"/><rect x="54" y="59" width="20" height="11" rx="2" fill="#C4102F"/></svg>',
    trafficLight:'<svg viewBox="0 0 100 100"><rect x="30" y="6" width="40" height="88" rx="10" fill="#1B1F27"/><circle cx="50" cy="26" r="11" fill="#4a1418"/><circle cx="50" cy="50" r="11" fill="#F2C94C"/><circle cx="50" cy="74" r="11" fill="#123018"/></svg>'
  };

export const SCENES = {
    INTERSECTION:'<svg viewBox="0 0 300 200">'+
      '<rect x="0" y="82" width="300" height="36" fill="#5B6068"/>'+
      '<rect x="132" y="0" width="36" height="200" fill="#5B6068"/>'+
      '<line x1="0" y1="100" x2="300" y2="100" stroke="#fff" stroke-width="2" stroke-dasharray="10 8" opacity="0.55"/>'+
      '<line x1="150" y1="0" x2="150" y2="200" stroke="#fff" stroke-width="2" stroke-dasharray="10 8" opacity="0.55"/>'+
      '<rect x="14" y="87" width="46" height="20" rx="5" fill="#1B4F8C"/><text x="37" y="101" font-size="11" fill="#fff" text-anchor="middle" font-family="Barlow Condensed, sans-serif" font-weight="700">A</text>'+
      '<rect x="140" y="150" width="20" height="46" rx="5" fill="#C4102F"/><text x="150" y="177" font-size="11" fill="#fff" text-anchor="middle" font-family="Barlow Condensed, sans-serif" font-weight="700">B</text>'+
      '<path d="M150 148 l-7 13 h14 z" fill="#C4102F"/>'+
      '<text x="150" y="130" font-size="13" font-weight="700" fill="#C4102F" text-anchor="middle" font-family="Barlow Condensed, sans-serif" letter-spacing="1">PRIORITÉ</text>'+
      '<path d="M64 97 h13 m0 -5 l7 5 -7 5" fill="none" stroke="#1B4F8C" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" opacity="0.8"/>'+
      '</svg>',
    // Vue de dessus : anneau gris, îlot central vert, 4 routes d'accès, marquages
    // blancs en pointillés, flèches de circulation dans le sens anti-horaire (France), 2 voitures.
    ROUNDABOUT:'<svg viewBox="0 0 300 200">'+
      '<rect x="0" y="0" width="300" height="200" fill="#E7ECEF"/>'+
      '<rect x="133" y="0" width="34" height="28" fill="#5B6068"/>'+
      '<rect x="133" y="172" width="34" height="28" fill="#5B6068"/>'+
      '<rect x="0" y="83" width="78" height="34" fill="#5B6068"/>'+
      '<rect x="222" y="83" width="78" height="34" fill="#5B6068"/>'+
      '<line x1="150" y1="0" x2="150" y2="28" stroke="#fff" stroke-width="2" stroke-dasharray="6 5" opacity="0.85"/>'+
      '<line x1="150" y1="172" x2="150" y2="200" stroke="#fff" stroke-width="2" stroke-dasharray="6 5" opacity="0.85"/>'+
      '<line x1="0" y1="100" x2="78" y2="100" stroke="#fff" stroke-width="2" stroke-dasharray="6 5" opacity="0.85"/>'+
      '<line x1="222" y1="100" x2="300" y2="100" stroke="#fff" stroke-width="2" stroke-dasharray="6 5" opacity="0.85"/>'+
      '<circle cx="150" cy="100" r="56" fill="none" stroke="#5B6068" stroke-width="32"/>'+
      '<circle cx="150" cy="100" r="56" fill="none" stroke="#fff" stroke-width="2" stroke-dasharray="9 8" opacity="0.8"/>'+
      '<circle cx="150" cy="100" r="72" fill="none" stroke="#3E4450" stroke-width="1.5"/>'+
      '<circle cx="150" cy="100" r="40" fill="none" stroke="#3E4450" stroke-width="1.5"/>'+
      '<circle cx="150" cy="100" r="38" fill="#6FA37A"/>'+
      '<circle cx="150" cy="100" r="38" fill="none" stroke="#4F7D5B" stroke-width="2"/>'+
      '<circle cx="150" cy="100" r="10" fill="#5C9468" opacity="0.7"/>'+
      '<polygon points="185.7,56.5 196.7,61.1 190.3,67.5" fill="#FFFFFF" opacity="0.95"/>'+
      '<polygon points="193.5,135.7 188.9,146.7 182.5,140.3" fill="#FFFFFF" opacity="0.95"/>'+
      '<polygon points="114.3,143.5 103.3,138.9 109.7,132.5" fill="#FFFFFF" opacity="0.95"/>'+
      '<polygon points="106.5,64.3 111.1,53.3 117.5,59.7" fill="#FFFFFF" opacity="0.95"/>'+
      '<g transform="translate(258 90) rotate(180)"><rect x="-10" y="-5.5" width="20" height="11" rx="3.5" fill="#E4572E" stroke="#1B1F27" stroke-width="1.2"/><rect x="2.5" y="-4" width="5.5" height="8" rx="1.5" fill="#DCEFFB" opacity="0.9"/><circle cx="-5" cy="-5.5" r="1.6" fill="#1B1F27"/><circle cx="-5" cy="5.5" r="1.6" fill="#1B1F27"/><circle cx="5" cy="-5.5" r="1.6" fill="#1B1F27"/><circle cx="5" cy="5.5" r="1.6" fill="#1B1F27"/></g>'+
      '<g transform="translate(97.4 119.2) rotate(70)"><rect x="-10" y="-5.5" width="20" height="11" rx="3.5" fill="#1B4F8C" stroke="#1B1F27" stroke-width="1.2"/><rect x="2.5" y="-4" width="5.5" height="8" rx="1.5" fill="#DCEFFB" opacity="0.9"/><circle cx="-5" cy="-5.5" r="1.6" fill="#1B1F27"/><circle cx="-5" cy="5.5" r="1.6" fill="#1B1F27"/><circle cx="5" cy="-5.5" r="1.6" fill="#1B1F27"/><circle cx="5" cy="5.5" r="1.6" fill="#1B1F27"/></g>'+
      '</svg>'
  };

export const LEVELS = [
    {min:0, name:'Apprenti code'},
    {min:80, name:'Conducteur en herbe'},
    {min:180, name:'Bonne route'},
    {min:300, name:'Presque prêt'},
    {min:450, name:"Prêt pour l'examen"},
    {min:620, name:'Futur titulaire'}
  ];

export const MODULES = [
    {id:'p1', title:'Priorités de base', sign:SIGN.stop,
     blurb:'Qui passe en premier à une intersection ? Priorité à droite, STOP, cédez-le-passage et feux.',
     scene:'INTERSECTION',
     points:[
       {s:SIGN.crossing, t:"Sans panneau ni feu, c'est la priorité à droite qui s'applique : le véhicule venant de votre droite passe avant vous."},
       {s:SIGN.stop, t:"Le panneau STOP impose un arrêt total, même si la voie paraît libre, avant de céder le passage."},
       {s:SIGN.yield, t:"Le panneau cédez-le-passage (triangle pointe en bas) n'oblige pas l'arrêt : on ralentit et on s'arrête seulement si nécessaire."},
       {s:SIGN.priority, t:"Le losange jaune signale une route à priorité ; barré de noir, il annonce la fin de cette priorité."},
       {s:SIGN.urgent, t:"Un véhicule prioritaire en intervention (pompiers, police, SAMU) passe toujours avant vous, même si vous êtes prioritaire."}
     ],
     questions:[
       {sign:SIGN.crossing, q:"En l'absence de tout panneau, à une intersection entre deux routes de même importance en agglomération, qui a la priorité ?",
        choices:["Le véhicule venant de la droite","Le véhicule le plus rapide","Le véhicule le plus gros","Celui qui arrive en premier"],
        explain:"C'est la règle de la priorité à droite : sans signalisation, le véhicule qui vient de votre droite passe avant vous."},
       {sign:SIGN.stop, q:"Un panneau STOP signifie :",
        choices:["Il faut marquer un arrêt puis céder le passage à toute circulation","Il faut ralentir seulement si nécessaire","Il faut s'arrêter uniquement s'il y a un véhicule visible"],
        explain:"Le STOP impose un arrêt complet, même si la voie semble libre, avant de céder le passage."},
       {sign:SIGN.yield, q:"Le panneau triangulaire pointe en bas à bordure rouge (cédez-le-passage) impose-t-il un arrêt obligatoire comme le STOP ?",
        choices:["Non, seulement si nécessaire pour céder le passage","Oui, toujours","Non, jamais, même avec un véhicule prioritaire"],
        explain:"Contrairement au STOP, ce panneau n'oblige pas l'arrêt : on ralentit et on s'arrête seulement si un véhicule est prioritaire."},
       {sign:SIGN.trafficLight, q:"Un feu tricolore clignotant orange signifie :",
        choices:["Prudence : franchir avec précaution en cédant si nécessaire","Passage interdit","Priorité absolue, comme un feu vert"],
        explain:"Le feu orange clignotant remplace souvent un feu éteint la nuit : on avance avec prudence, comme à une intersection sans signalisation prioritaire."},
       {sign:SIGN.urgent, q:"Un véhicule de pompiers, gyrophare et sirène activés, arrive à une intersection où vous avez la priorité. Que faites-vous ?",
        choices:["Je facilite son passage, même si j'ai la priorité","Je garde ma priorité car je suis arrivé le premier","J'accélère pour passer avant lui"],
        explain:"Les véhicules d'intérêt général prioritaires ont toujours la priorité, quels que soient les panneaux ou la position."},
       {sign:SIGN.priority, q:"Un losange jaune signale :",
        choices:["Une route à caractère prioritaire","Une route dangereuse","Une zone de stationnement"],
        explain:"Le losange jaune indique que vous circulez sur une voie à priorité ; barré de noir, il annonce la fin de cette priorité."},
       {sign:SIGN.trafficLight, q:"Un feu orange fixe signifie :",
        choices:["S'arrêter, sauf si on est trop engagé pour le faire sans danger","Accélérer pour passer avant le rouge","Continuer normalement, c'est un simple rappel"],
        explain:"Le feu orange fixe impose l'arrêt ; on ne franchit que si l'on est trop engagé pour s'arrêter en sécurité."},
       {sign:SIGN.urgent, q:"Un agent de la circulation et un feu tricolore donnent des ordres contradictoires. Vous suivez :",
        choices:["L'agent de la circulation","Le feu tricolore","Le premier des deux que vous avez vu"],
        explain:"Les indications d'un agent priment toujours sur les feux et les panneaux."},
       {sign:SIGN.stop, q:"À un panneau STOP, vous immobilisez le véhicule :",
        choices:["À la ligne d'arrêt, ou à défaut là où la visibilité est la meilleure","Au milieu de l'intersection","Seulement si un véhicule arrive"],
        explain:"Arrêt complet à la ligne d'effet du STOP ; sans ligne, juste avant l'intersection, là où l'on voit le mieux."},
       {sign:SIGN.priority, q:"Le losange jaune barré de noir signifie :",
        choices:["Fin de la route à priorité : les règles générales reprennent","Début d'une route prioritaire","Stationnement autorisé"],
        explain:"C'est la fin du caractère prioritaire ; souvent la priorité à droite s'applique de nouveau ensuite."},
       {sign:SIGN.crossing, q:"Au feu vert, vous vous engagez dans l'intersection :",
        choices:["Seulement si vous pouvez la dégager sans y rester bloqué","Toujours, le vert donne un droit absolu","Uniquement après un coup de klaxon"],
        explain:"On ne s'engage au vert que si l'on peut libérer l'intersection, pour ne pas la bloquer."}
     ]},
    {id:'p2', title:'Ronds-points & intersections', sign:SIGN.roundaboutArrow,
     blurb:"Dans la grande majorité des ronds-points français, qui a la priorité ? Et comment bien signaler sa sortie ?",
     scene:'ROUNDABOUT',
     points:[
       {s:SIGN.yield, t:"Dans la plupart des ronds-points, la priorité est à ceux qui sont déjà engagés dans l'anneau."},
       {s:SIGN.blinker, t:"Le clignotant n'est pas obligatoire en entrant, mais il est obligatoire pour signaler votre sortie."},
       {s:SIGN.roundaboutArrow, t:"Pour une sortie proche, restez sur la voie extérieure ; pour un tour plus long, prenez la voie intérieure."},
       {s:SIGN.crossing, t:"À une intersection en T, la route qui s'arrête doit céder le passage à la route continue."},
       {s:SIGN.crossing, t:"De rares ronds-points appliquent encore la priorité à droite classique : c'est le cas s'il n'y a pas de panneau cédez-le-passage à l'entrée."}
     ],
     questions:[
       {sign:SIGN.yield, q:"Dans un rond-point classique (panneau cédez-le-passage à l'entrée), qui a la priorité ?",
        choices:["Les véhicules déjà engagés dans l'anneau","Les véhicules qui entrent","Le véhicule le plus rapide"],
        explain:"Sauf signalisation contraire, celui qui est déjà dans l'anneau est prioritaire sur celui qui entre."},
       {sign:SIGN.blinker, q:"Faut-il mettre son clignotant en entrant dans un rond-point ?",
        choices:["Non, ce n'est pas obligatoire en entrant","Oui, toujours obligatoire en entrant","Seulement la nuit"],
        explain:"Le clignotant n'est obligatoire qu'en sortie, pour prévenir les autres usagers de votre changement de direction."},
       {sign:SIGN.crossing, q:"À une intersection en T, la route qui se termine (barrée par la route principale) doit :",
        choices:["Céder le passage à la route continue","Avoir la priorité car elle arrive de face","Cela dépend de la vitesse des véhicules"],
        explain:"Sans signalisation contraire, une route qui s'arrête sur une autre doit céder le passage à la route continue."},
       {sign:SIGN.crossing, q:"Certains ronds-points anciens appliquent la priorité à droite. Comment le repère-t-on ?",
        choices:["Aucun panneau cédez-le-passage n'est présent à l'entrée","Il n'en existe plus du tout en France","C'est toujours signalé en bleu"],
        explain:"Si l'entrée n'est pas marquée d'un panneau cédez-le-passage, la priorité à droite classique peut s'appliquer (rare mais existant)."},
       {sign:SIGN.roundaboutArrow, q:"Dans un rond-point à deux voies, vous devez sortir à la prochaine sortie en étant entré par la voie de droite. Que faites-vous ?",
        choices:["Je reste sur la voie de droite en surveillant les autres usagers","Je me place immédiatement sur la voie de gauche","Je m'arrête juste avant la sortie"],
        explain:"Pour une sortie proche, on reste en général sur la voie extérieure en restant attentif aux véhicules qui coupent depuis la voie intérieure."},
       {sign:SIGN.priority, q:"Sur une route prioritaire signalée par le losange jaune, à une intersection, devez-vous céder le passage ?",
        choices:["Non, vous restez prioritaire","Oui, toujours","Seulement si un panneau STOP est visible en face"],
        explain:"Le losange jaune indique justement que votre route conserve la priorité aux intersections suivantes, tant qu'il n'est pas barré."},
       {sign:SIGN.blinker, q:"Pour sortir d'un rond-point, vous signalez votre sortie :",
        choices:["Avec le clignotant droit, juste avant de sortir","Avec le clignotant gauche","Sans clignotant, ce n'est pas utile"],
        explain:"On active le clignotant droit une fois passée la sortie qui précède la sienne."},
       {sign:SIGN.roundaboutArrow, q:"À l'entrée d'un rond-point avec « cédez le passage » :",
        choices:["On ralentit et on cède aux véhicules déjà dans l'anneau","On s'arrête toujours complètement","On accélère pour s'insérer de force"],
        explain:"Le cédez-le-passage n'oblige pas l'arrêt : on s'arrête seulement si un véhicule circule déjà dans l'anneau."},
       {sign:SIGN.crossing, q:"Deux voitures arrivent en même temps à une intersection sans panneau. Qui passe ?",
        choices:["Celle qui n'a personne à sa droite","La plus rapide","La plus grosse"],
        explain:"Priorité à droite : on cède au véhicule qui vient de sa droite."},
       {sign:SIGN.blinker, q:"Rond-point à deux voies : pour prendre une sortie proche (à droite), on se place :",
        choices:["Sur la voie de droite (extérieure)","Sur la voie de gauche (intérieure)","Peu importe la voie"],
        explain:"Sortie proche = voie extérieure ; les sorties lointaines ou le demi-tour se prennent plutôt par l'intérieur."},
       {sign:SIGN.yield, q:"La grande différence entre STOP et « cédez le passage » :",
        choices:["Le STOP impose l'arrêt total, pas le cédez-le-passage","Il n'y en a aucune","Le cédez-le-passage impose l'arrêt total"],
        explain:"Au STOP, arrêt obligatoire ; au cédez-le-passage, on peut passer sans s'arrêter si la voie est libre."}
     ]},
    {id:'p3', title:'Signalisation', sign:SIGN.danger,
     blurb:"Chaque forme et couleur de panneau a un sens précis : triangle, disque rouge, disque bleu, carré...",
     points:[
       {s:SIGN.danger, t:"Triangle à bordure rouge : panneau de danger."},
       {s:SIGN.noOvertake, t:"Disque blanc à bordure rouge : panneau d'interdiction (le STOP, octogonal, fait exception)."},
       {s:SIGN.obligation, t:"Disque bleu avec symbole blanc : panneau d'obligation."},
       {s:SIGN.parking, t:"Carré ou rectangle bleu : panneau d'indication utile (parking, service, autoroute)."},
       {s:SIGN.panonceau, t:"Un panonceau, placé sous un panneau principal, précise ou restreint sa portée (distance, horaires, véhicules concernés)."}
     ],
     questions:[
       {sign:SIGN.danger, q:"Un panneau triangulaire à bordure rouge annonce en général :",
        choices:["Un danger","Une interdiction","Une obligation"],
        explain:"La forme triangulaire à bordure rouge est réservée aux panneaux de danger."},
       {sign:SIGN.noOvertake, q:"Un panneau rond à fond blanc bordé de rouge indique généralement :",
        choices:["Une interdiction","Une obligation","Une indication utile"],
        explain:"Le disque blanc à bordure rouge est la forme classique des panneaux d'interdiction (le STOP, octogonal, fait exception)."},
       {sign:SIGN.obligation, q:"Un panneau rond à fond bleu avec un symbole blanc indique :",
        choices:["Une obligation","Une interdiction","Un danger"],
        explain:"Le disque bleu signale une obligation (ex : direction obligatoire, piste cyclable obligatoire)."},
       {sign:SIGN.parking, q:"Les panneaux carrés ou rectangulaires bleus servent le plus souvent à :",
        choices:["Donner une indication (parking, autoroute, service)","Interdire une manœuvre","Annoncer un danger immédiat"],
        explain:"La forme carrée ou rectangulaire bleue est utilisée pour les indications pratiques utiles à l'usager."},
       {sign:SIGN.panonceau, q:"Un petit panneau rectangulaire placé sous un panneau principal s'appelle :",
        choices:["Un panonceau, qui apporte une précision","Un panneau de rappel obligatoire","Un doublon sans valeur légale"],
        explain:"Le panonceau précise ou restreint la portée du panneau principal (distance, catégorie de véhicules, horaires...)."},
       {sign:SIGN.stop, q:"Le panneau STOP a une forme particulière parmi les panneaux d'interdiction. Laquelle ?",
        choices:["Octogonale","Triangulaire","Carrée"],
        explain:"Le STOP est le seul panneau octogonal du code de la route, reconnaissable même sale ou vu de dos."},
       {sign:SIGN.danger, q:"Un panneau triangulaire pointe en haut, bordé de rouge, annonce :",
        choices:["Un danger à venir","Une interdiction","Une obligation"],
        explain:"Le triangle à bordure rouge prévient d'un danger (virage, passage piéton, chaussée glissante...)."},
       {sign:SIGN.obligation, q:"Une flèche blanche sur un disque bleu indique :",
        choices:["Une direction obligatoire","Une direction simplement conseillée","Une direction interdite"],
        explain:"Le disque bleu impose l'action représentée : ici, la direction à suivre est obligatoire."},
       {sign:SIGN.noOvertake, q:"Un disque blanc bordé de rouge avec deux voitures signifie :",
        choices:["Interdiction de dépasser","Fin d'interdiction de dépasser","Dépassement conseillé"],
        explain:"C'est un panneau d'interdiction : défense de dépasser les véhicules à moteur."},
       {sign:SIGN.panonceau, q:"Le petit panneau rectangulaire sous un panneau (panonceau) sert à :",
        choices:["Préciser ou limiter sa portée (distance, véhicules, horaires)","Annuler le panneau du dessus","Indiquer le fabricant du panneau"],
        explain:"Le panonceau complète le panneau : distance, catégorie de véhicules concernés, plage horaire, etc."},
       {sign:SIGN.parking, q:"Une ligne blanche continue au milieu de la chaussée :",
        choices:["Ne doit être ni franchie ni chevauchée","Peut être franchie pour dépasser","N'a aucune valeur réglementaire"],
        explain:"La ligne continue interdit de la franchir ou de la chevaucher (sauf pour contourner un obstacle imprévu)."}
     ]},
    {id:'p4', title:'Vitesses & distances', sign:SIGN.speed('80'),
     blurb:"Limitations de vitesse selon le type de route, règles du permis probatoire, et distance de sécurité.",
     facts:[{l:'Agglomération',v:'50 km/h'},{l:'Autoroute',v:'130 km/h'},{l:'Probatoire',v:'-10 km/h'}],
     points:[
       {s:SIGN.speed('50'), t:"En agglomération, la vitesse par défaut est 50 km/h, réduite à 30 km/h en zone 30 et 20 km/h en zone de rencontre."},
       {s:SIGN.speed('80'), t:"Hors agglomération, la limite par défaut est 80 km/h sur route bidirectionnelle sans séparateur (certains axes sont remontés à 90 km/h par le département)."},
       {s:SIGN.speed('130'), t:"Sur autoroute, la limite est 130 km/h, réduite à 110 km/h sous la pluie et 50 km/h si la visibilité est inférieure à 50 m."},
       {s:SIGN.novice, t:"En permis probatoire, on roule 10 km/h sous la limite générale dès qu'elle dépasse 80 km/h (donc 100 sur une voie à 110, 110 sur une autoroute à 130)."},
       {s:SIGN.stopwatch, t:"La règle des deux secondes permet d'évaluer la distance de sécurité ; comptez au moins 3 secondes par mauvais temps."}
     ],
     questions:[
       {sign:SIGN.speed('50'), q:"Quelle est la vitesse maximale par défaut en agglomération ?",
        choices:["50 km/h","30 km/h","70 km/h"],
        explain:"50 km/h est la limite par défaut en agglomération, sauf zone 30 ou zone de rencontre plus restrictive."},
       {sign:SIGN.speed('110'), q:"Sur autoroute par temps de pluie, la vitesse maximale autorisée est :",
        choices:["110 km/h","130 km/h","90 km/h"],
        explain:"La limite de 130 km/h est réduite à 110 km/h sur autoroute lorsqu'il pleut."},
       {sign:SIGN.novice, q:"Un conducteur en permis probatoire, sur une route normalement limitée à 110 km/h, doit rouler à :",
        choices:["100 km/h maximum","110 km/h comme les autres conducteurs","90 km/h maximum"],
        explain:"Les conducteurs novices roulent 10 km/h sous la limite générale dès que celle-ci dépasse 80 km/h."},
       {sign:SIGN.stopwatch, q:"La « règle des deux secondes » permet d'évaluer :",
        choices:["La distance de sécurité avec le véhicule qui précède","Le temps de freinage total du véhicule","La durée moyenne d'un dépassement"],
        explain:"En comptant deux secondes entre le passage du véhicule précédent et le vôtre devant un repère fixe, on vérifie une distance de sécurité suffisante."},
       {sign:SIGN.stopwatch, q:"Par mauvais temps ou faible visibilité, la distance de sécurité recommandée doit être :",
        choices:["Augmentée (par exemple 3 secondes ou plus)","Identique, quelle que soit la météo","Réduite pour compenser la lenteur ambiante"],
        explain:"Le temps de réaction et la distance de freinage augmentent par mauvais temps : il faut donc allonger la distance de sécurité."},
       {sign:SIGN.speed('80'), q:"Hors agglomération, sur une route à double sens sans séparateur central, la vitesse est en général limitée à :",
        choices:["80 km/h (ou 90 km/h si le département l'a signalé)","90 km/h partout, sans exception","70 km/h partout, sans exception"],
        explain:"Depuis 2018, la limite par défaut est de 80 km/h ; certains départements ont relevé à 90 km/h certains axes signalés."},
       {sign:SIGN.speed('30'), q:"Dans une zone 30, la vitesse maximale est :",
        choices:["30 km/h","20 km/h","40 km/h"],
        explain:"La zone 30 limite à 30 km/h et favorise le partage avec piétons et cyclistes."},
       {sign:SIGN.speed('130'), q:"Sur autoroute, par temps de pluie, la vitesse maximale devient :",
        choices:["110 km/h","130 km/h","90 km/h"],
        explain:"Sous la pluie, le 130 passe à 110 km/h sur autoroute (et la visibilité < 50 m impose 50 km/h)."},
       {sign:SIGN.stopwatch, q:"La distance de sécurité minimale avec le véhicule devant correspond à :",
        choices:["Au moins 2 secondes d'intervalle","1 seconde","Une demi-seconde"],
        explain:"On garde au moins 2 secondes ; on augmente par mauvais temps ou forte fatigue."},
       {sign:SIGN.novice, q:"La période probatoire du permis dure :",
        choices:["3 ans (2 ans avec la conduite accompagnée)","1 an pour tout le monde","5 ans"],
        explain:"3 ans en général, réduite à 2 ans si l'on a suivi l'apprentissage anticipé de la conduite."},
       {sign:SIGN.speed('50'), q:"La distance d'arrêt d'un véhicule, c'est :",
        choices:["La distance de réaction + la distance de freinage","Seulement la distance de freinage","Seulement la distance de réaction"],
        explain:"On ajoute la distance parcourue pendant le temps de réaction à la distance de freinage."}
     ]},
    {id:'p5', title:'Sécurité, alcool & stupéfiants', sign:SIGN.seatbelt,
     blurb:"Taux d'alcool autorisés, stupéfiants, ceinture, téléphone et équipements de sécurité obligatoires.",
     facts:[{l:'Alcool',v:'0,5 g/L'},{l:'Probatoire',v:'0,2 g/L'},{l:'Stupéfiants',v:'0 toléré'}],
     points:[
       {s:SIGN.alcohol, t:"Le taux d'alcool légal maximal est 0,5 g/L de sang (0,2 g/L en permis probatoire ou pour la conduite de transport en commun)."},
       {s:SIGN.drugs, t:"Pour les stupéfiants, la tolérance est nulle : toute trace détectée constitue une infraction."},
       {s:SIGN.seatbelt, t:"La ceinture de sécurité est obligatoire à toutes les places équipées, y compris à l'arrière."},
       {s:SIGN.phone, t:"Le téléphone tenu en main est interdit dès que le véhicule roule ou est arrêté à un feu, moteur allumé."},
       {s:SIGN.danger, t:"Le gilet de sécurité et le triangle de présignalisation sont obligatoires à bord et doivent être utilisés en cas de panne ou d'arrêt d'urgence."}
     ],
     questions:[
       {sign:SIGN.alcohol, q:"Le taux d'alcool maximal autorisé pour un permis probatoire est de :",
        choices:["0,2 g/L de sang","0,5 g/L de sang","0,8 g/L de sang"],
        explain:"Les conducteurs en période probatoire (et les conducteurs de transport en commun) sont soumis à un taux plus strict : 0,2 g/L."},
       {sign:SIGN.drugs, q:"Concernant les stupéfiants au volant, la tolérance légale est :",
        choices:["Zéro : toute trace détectée est une infraction","Identique à l'alcool, soit 0,5 g/L","Tolérée en dessous d'un certain seuil"],
        explain:"Contrairement à l'alcool, il n'existe aucun seuil toléré pour les stupéfiants : toute présence détectée constitue une infraction."},
       {sign:SIGN.seatbelt, q:"Le port de la ceinture de sécurité est obligatoire :",
        choices:["À toutes les places équipées, y compris à l'arrière","Uniquement à l'avant du véhicule","Uniquement hors agglomération"],
        explain:"Toute personne à bord doit porter sa ceinture, à l'avant comme à l'arrière, dès qu'une place en est équipée."},
       {sign:SIGN.phone, q:"Utiliser un téléphone tenu en main en conduisant est :",
        choices:["Interdit, même à l'arrêt à un feu rouge","Autorisé brièvement entre deux virages","Autorisé si le véhicule roule à faible vitesse"],
        explain:"Le téléphone tenu en main est interdit dès que le moteur tourne et que le véhicule circule, y compris arrêté à un feu."},
       {sign:SIGN.danger, q:"En cas d'arrêt d'urgence sur la chaussée ou son abord après une panne, le conducteur doit :",
        choices:["Porter le gilet de sécurité et poser le triangle de présignalisation","Se contenter d'allumer ses feux de détresse","Rester dans le véhicule sans sortir"],
        explain:"Le gilet et le triangle sont obligatoires à bord et doivent être utilisés pour signaler le danger aux autres usagers."},
       {sign:SIGN.phone, q:"Le port d'écouteurs ou d'un casque audio dans les deux oreilles en conduisant est :",
        choices:["Interdit","Autorisé si le volume est faible","Autorisé sur autoroute uniquement"],
        explain:"Porter un dispositif à son oreille (écouteurs, casque) est interdit au volant, qu'il diffuse de la musique ou un appel."},
       {sign:SIGN.alcohol, q:"Le taux d'alcool maximal pour un conducteur non novice est :",
        choices:["0,5 g/L de sang (0,25 mg/L d'air expiré)","0,8 g/L de sang","0,2 g/L de sang"],
        explain:"0,5 g/L de sang, soit 0,25 mg/L d'air expiré ; 0,2 g/L pour les conducteurs en permis probatoire."},
       {sign:SIGN.phone, q:"Tenir son téléphone en main en conduisant, c'est :",
        choices:["135 € d'amende et 3 points en moins","Une simple mise en garde","1 point en moins seulement"],
        explain:"Téléphone tenu en main : 135 € et retrait de 3 points sur le permis."},
       {sign:SIGN.seatbelt, q:"À l'arrière du véhicule, la ceinture de sécurité est :",
        choices:["Obligatoire pour tous les passagers","Facultative","Obligatoire seulement sur autoroute"],
        explain:"La ceinture est obligatoire à toutes les places équipées, à l'avant comme à l'arrière."},
       {sign:SIGN.drugs, q:"Concernant les stupéfiants au volant :",
        choices:["Tolérance zéro : toute trace détectée est une infraction","Toléré sous un certain seuil","Toléré comme l'alcool"],
        explain:"Aucun seuil n'est toléré ; les sanctions sont lourdes (amende, points, suspension, voire prison)."},
       {sign:SIGN.danger, q:"Pour faire baisser son taux d'alcool avant de conduire, on peut :",
        choices:["Seulement attendre : rien n'accélère l'élimination","Boire un café fort","Prendre une douche froide"],
        explain:"Ni café, ni douche, ni sport : seul le temps fait baisser l'alcoolémie."}
     ]},
    {id:'p6', title:'Dépassement & croisement', sign:SIGN.noOvertake,
     blurb:"Quand peut-on dépasser en toute sécurité, et comment se comporter en croisement, notamment de nuit ?",
     facts:[{l:'Cycliste (agglo)',v:'1 m'},{l:'Cycliste (hors agglo)',v:'1,5 m'}],
     points:[
       {s:SIGN.noOvertake, t:"Le dépassement est interdit dès que la ligne axiale est continue."},
       {s:SIGN.danger, t:"Il est aussi interdit dans un virage ou à l'approche d'un sommet de côte sans visibilité suffisante, ainsi qu'aux intersections en général."},
       {s:SIGN.blinker, t:"Avant de dépasser : clignotant, vérification qu'aucun véhicule ne dépasse déjà, et distance suffisante pour revenir sans danger."},
       {s:SIGN.headlights, t:"De nuit, dès qu'un autre véhicule est visible, on roule en feux de croisement (codes) pour ne pas éblouir."},
       {s:SIGN.bike, t:"La distance latérale minimale pour dépasser un cycliste est de 1 m en agglomération et 1,5 m hors agglomération."}
     ],
     questions:[
       {sign:SIGN.noOvertake, q:"Le dépassement est interdit lorsque la ligne axiale est :",
        choices:["Continue","Discontinue","Peu importe le type de ligne"],
        explain:"Une ligne continue interdit le franchissement, donc le dépassement, tant qu'elle n'est pas redevenue discontinue."},
       {sign:SIGN.danger, q:"Dépasser à l'approche d'un sommet de côte ou dans un virage sans visibilité est :",
        choices:["Interdit, sauf signalisation contraire","Autorisé si aucun véhicule n'est visible","Autorisé de nuit uniquement"],
        explain:"Le manque de visibilité empêche de vérifier que la voie est libre assez loin : le dépassement y est interdit."},
       {sign:SIGN.headlights, q:"De nuit, en présence d'un véhicule venant en face, vous devez circuler :",
        choices:["En feux de croisement (codes)","En feux de route","Sans aucun éclairage"],
        explain:"Les feux de route éblouissent les autres usagers : on passe en codes dès qu'un véhicule est visible en face ou devant."},
       {sign:SIGN.blinker, q:"Avant de dépasser un véhicule, il faut notamment :",
        choices:["Mettre son clignotant et vérifier qu'aucun véhicule ne dépasse déjà","Accélérer sans prévenir pour gagner du temps","Klaxonner obligatoirement avant chaque dépassement"],
        explain:"Le clignotant prévient les autres usagers, et il faut s'assurer qu'aucun dépassement n'est déjà en cours devant ou derrière soi."},
       {sign:SIGN.crossing, q:"Dépasser à une intersection est en général :",
        choices:["Interdit, sauf si vous êtes sur une route à priorité ou si un panneau l'autorise","Toujours autorisé si la ligne est discontinue","Autorisé seulement en agglomération"],
        explain:"Le risque d'un véhicule surgissant de la voie transversale rend le dépassement dangereux et généralement interdit aux intersections."},
       {sign:SIGN.bike, q:"Pour dépasser un cycliste hors agglomération, la distance latérale minimale à respecter est :",
        choices:["1,5 mètre","0,5 mètre","Aucune distance minimale n'est fixée"],
        explain:"Le code impose 1,5 m hors agglomération (1 m en agglomération) pour protéger les cyclistes lors d'un dépassement."},
       {sign:SIGN.headlights, q:"Par brouillard épais de jour, vous allumez :",
        choices:["Les feux de croisement (et de brouillard si équipé)","Les feux de route","Aucun feu, il fait jour"],
        explain:"Les feux de route seraient renvoyés par le brouillard et éblouiraient : on utilise croisement + brouillard."},
       {sign:SIGN.bike, q:"Pour dépasser un cycliste en agglomération, on laisse au moins :",
        choices:["1 mètre","0,5 mètre","Aucune distance imposée"],
        explain:"1 m en ville, 1,50 m hors agglomération, pour la sécurité du cycliste."},
       {sign:SIGN.blinker, q:"Après un dépassement, pour vous rabattre :",
        choices:["Clignotant droit, en laissant de la distance au véhicule dépassé","Vous vous rabattez aussitôt devant lui","Vous ne signalez rien"],
        explain:"On se rabat progressivement, clignotant droit, sans se rabattre trop tôt sur le véhicule dépassé."},
       {sign:SIGN.noOvertake, q:"Le dépassement est notamment interdit :",
        choices:["À l'approche d'un sommet de côte ou dans un virage sans visibilité","Sur une ligne droite dégagée","Quand la ligne est discontinue"],
        explain:"Là où la visibilité manque (côte, virage, passage piéton) ou quand la ligne est continue."},
       {sign:SIGN.headlights, q:"La nuit, quand un véhicule arrive en face, vous devez :",
        choices:["Passer en feux de croisement pour ne pas l'éblouir","Rester en feux de route","Éteindre tous vos feux"],
        explain:"On repasse en feux de croisement dès qu'un véhicule vient en face ou qu'on suit un autre véhicule."}
     ]},
    {id:'p7', title:'Stationnement & arrêt', sign:SIGN.parking,
     blurb:"Où peut-on s'arrêter ou stationner, et que risque-t-on en cas d'infraction ?",
     points:[
       {s:SIGN.parking, t:"L'arrêt est une immobilisation brève, conducteur présent et prêt à repartir ; le stationnement est plus prolongé."},
       {s:SIGN.noParking, t:"Le stationnement est interdit à moins de 5 m d'un passage piéton, devant une bouche d'incendie, sur un trottoir ou en double file prolongée."},
       {s:SIGN.wheelchair, t:"Se garer sur une place handicapée sans la carte adéquate est un stationnement très gênant, sanctionné plus lourdement."},
       {s:SIGN.danger, t:"Un stationnement dit dangereux (sortie de virage, passage piéton) est la catégorie la plus sévèrement sanctionnée, avec retrait de points possible."}
     ],
     questions:[
       {sign:SIGN.noParking, q:"Le stationnement est interdit à moins de :",
        choices:["5 mètres d'un passage piéton","20 mètres d'un passage piéton","1 mètre d'un passage piéton"],
        explain:"La règle des 5 mètres avant un passage piéton garantit la visibilité entre piétons et conducteurs."},
       {sign:SIGN.parking, q:"La différence entre « arrêt » et « stationnement » est que :",
        choices:["Lors d'un arrêt, le conducteur reste à bord ou proche et prêt à repartir","En arrêt, le moteur doit toujours être éteint","Un stationnement dure toujours moins de 5 minutes"],
        explain:"L'arrêt est une immobilisation brève avec conducteur présent ; le stationnement est plus prolongé, conducteur présent ou non."},
       {sign:SIGN.wheelchair, q:"Se garer sur un emplacement réservé aux personnes handicapées sans la carte adéquate est classé comme :",
        choices:["Stationnement très gênant, sanctionné plus lourdement","Une simple erreur sans sanction","Autorisé s'il reste de la place ailleurs"],
        explain:"C'est un stationnement très gênant, avec une amende nettement plus élevée qu'un stationnement gênant classique."},
       {sign:SIGN.noParking, q:"Stationner devant une bouche d'incendie est :",
        choices:["Interdit, quelle que soit la durée","Autorisé moins de 5 minutes","Autorisé si les feux de détresse sont allumés"],
        explain:"L'accès aux bouches d'incendie doit rester libre en permanence pour les secours."},
       {sign:SIGN.noParking, q:"Le stationnement en double file est :",
        choices:["Interdit, sauf arrêt très bref sans gêner la circulation","Toujours autorisé en centre-ville","Autorisé la nuit uniquement"],
        explain:"Le double file gêne fortement la circulation et n'est tolérable que pour un arrêt très bref, sans quitter son véhicule longtemps."},
       {sign:SIGN.danger, q:"Un stationnement jugé « dangereux » (ex : sur un passage piéton, en sortie de virage) peut entraîner :",
        choices:["Une amende plus élevée et un retrait de points","Seulement un avertissement oral","Aucune sanction si le véhicule reste bien visible"],
        explain:"Le stationnement dangereux est la catégorie la plus sévèrement sanctionnée, car il met directement en danger les autres usagers."},
       {sign:SIGN.noParking, q:"Le stationnement est interdit :",
        choices:["À moins de 5 mètres avant un passage piéton","À plus de 5 mètres d'un passage piéton","Uniquement la nuit"],
        explain:"Les 5 m avant un passage piéton restent libres pour la visibilité (hors emplacements deux-roues)."},
       {sign:SIGN.wheelchair, q:"Se garer sur une place handicapée sans carte, c'est :",
        choices:["Un stationnement très gênant : 135 € d'amende","Autorisé quelques minutes","Sans sanction s'il reste des places ailleurs"],
        explain:"Stationnement très gênant : 135 €, et le véhicule peut être mis en fourrière."},
       {sign:SIGN.crossing, q:"La différence entre un « arrêt » et un « stationnement » :",
        choices:["À l'arrêt, le conducteur reste présent et prêt à repartir","L'arrêt dure toujours plus longtemps","À l'arrêt, le moteur doit être coupé"],
        explain:"L'arrêt est bref, conducteur au volant ; le stationnement immobilise le véhicule, conducteur présent ou non."},
       {sign:SIGN.danger, q:"S'arrêter en haut d'une côte ou dans un virage sans visibilité :",
        choices:["Est un stationnement dangereux, lourdement sanctionné","Est autorisé si on se gare bien","Ne présente aucun risque"],
        explain:"Le stationnement dangereux met en danger les autres : forte amende et retrait de points."},
       {sign:SIGN.parking, q:"Sur une place de stationnement payant, ne pas payer expose à :",
        choices:["Un forfait post-stationnement (FPS)","Rien du tout","Une peine de prison"],
        explain:"Le non-paiement entraîne un FPS, une redevance dont le montant est fixé par la commune."}
     ]},
    {id:'p8', title:'Piétons, cyclistes & zones', sign:SIGN.pedestrian,
     blurb:"Zone 30, zone de rencontre, aire piétonne : qui a la priorité et à quelle vitesse peut-on y circuler ?",
     facts:[{l:'Zone de rencontre',v:'20 km/h'},{l:'Zone 30',v:'30 km/h'}],
     points:[
       {s:SIGN.pedestrian, t:"Un piéton engagé sur un passage piéton, avec ou sans feu, est toujours prioritaire."},
       {s:SIGN.pedestrian, t:"Dans une zone de rencontre (20 km/h), les piétons peuvent circuler sur toute la largeur de la voie et sont prioritaires."},
       {s:SIGN.zone30, t:"Dans une zone 30, la vitesse est limitée à 30 km/h, souvent avec double sens cyclable."},
       {s:SIGN.pedestrian, t:"Dans une aire piétonne, seuls les véhicules de desserte peuvent circuler, à l'allure du pas, en cédant toujours le passage."},
       {s:SIGN.bike, t:"Un panonceau « sauf vélos » sous un sens interdit autorise les cyclistes à circuler à contresens dans cette rue."}
     ],
     questions:[
       {sign:SIGN.pedestrian, q:"Face à un piéton engagé sur un passage piéton sans feu, le conducteur doit :",
        choices:["Céder le passage et le laisser traverser","Klaxonner pour qu'il accélère","Passer s'il n'y a pas de feu rouge visible"],
        explain:"Un piéton engagé sur un passage piéton est toujours prioritaire, même en l'absence de feu."},
       {sign:SIGN.pedestrian, q:"Dans une « zone de rencontre », la vitesse est limitée à :",
        choices:["20 km/h, et les piétons sont prioritaires partout","30 km/h, comme une zone 30","50 km/h avec prudence"],
        explain:"La zone de rencontre impose 20 km/h maximum ; les piétons peuvent circuler sur toute la largeur de la voie et sont prioritaires."},
       {sign:SIGN.zone30, q:"Dans une « zone 30 », la vitesse maximale autorisée est :",
        choices:["30 km/h","20 km/h","50 km/h"],
        explain:"Comme son nom l'indique, la zone 30 limite la vitesse à 30 km/h, souvent avec double sens cyclable."},
       {sign:SIGN.pedestrian, q:"Dans une aire piétonne, la circulation des véhicules est :",
        choices:["Autorisée seulement à l'allure du pas pour desserte, avec priorité aux piétons","Totalement interdite en permanence","Autorisée normalement comme une rue classique"],
        explain:"Seuls les véhicules de desserte ou de livraison peuvent y circuler, à allure de piéton, en cédant toujours le passage."},
       {sign:SIGN.bike, q:"Pour dépasser un cycliste en agglomération, la distance latérale minimale est :",
        choices:["1 mètre","1,5 mètre","2 mètres"],
        explain:"En agglomération, la distance minimale est de 1 mètre (1,5 m hors agglomération)."},
       {sign:SIGN.bike, q:"Un cycliste peut-il circuler à contresens dans une rue à sens unique signalée par un panonceau « sauf vélos » ?",
        choices:["Oui, c'est justement le sens de cette signalisation","Non, jamais, quel que soit le panneau","Seulement de nuit"],
        explain:"Le panonceau « sauf vélos » sous un sens interdit autorise justement les cyclistes à circuler à contresens dans cette rue."},
       {sign:SIGN.pedestrian, q:"Un piéton montre clairement son intention de traverser sur un passage. Vous :",
        choices:["Ralentissez et le laissez traverser","Klaxonnez pour qu'il attende","Passez, il n'est pas encore engagé"],
        explain:"Il faut céder le passage au piéton engagé OU manifestant clairement son intention de traverser."},
       {sign:SIGN.zone30, q:"Dans une zone de rencontre, la vitesse est limitée à :",
        choices:["20 km/h","30 km/h","50 km/h"],
        explain:"Zone de rencontre : priorité aux piétons et vitesse maximale de 20 km/h."},
       {sign:SIGN.bike, q:"Un « sas vélo » peint devant un feu est réservé :",
        choices:["Aux cyclistes, qui se placent devant les voitures","Aux motos","À tous les véhicules"],
        explain:"Le sas cycliste permet aux vélos de se positionner devant les voitures au feu, pour être vus et tourner en sécurité."},
       {sign:SIGN.pedestrian, q:"Dans une aire piétonne, un véhicule autorisé circule :",
        choices:["Au pas, en cédant la priorité aux piétons","À 30 km/h","Normalement, comme dans une rue"],
        explain:"Seuls certains véhicules (desserte, secours) y roulent, au pas, les piétons étant prioritaires partout."},
       {sign:SIGN.bike, q:"La nuit, hors agglomération, un cycliste doit porter :",
        choices:["Un gilet rétroréfléchissant (avec feux avant blanc et arrière rouge)","Rien de particulier","Seulement un casque"],
        explain:"Gilet rétroréfléchissant obligatoire de nuit ou par visibilité réduite hors agglomération, en plus des feux."}
     ]},
    {id:'p9', title:'Autoroute', sign:SIGN.speed('130'),
     blurb:"Entrer, circuler et sortir de l'autoroute en sécurité : vitesses, voies, distances et bande d'arrêt d'urgence.",
     facts:[{l:'Vitesse',v:'130 km/h'},{l:'Pluie',v:'110 km/h'},{l:'Visibilité < 50 m',v:'50 km/h'}],
     points:[
       {s:SIGN.blinker, t:"Sur la voie d'accélération, on adapte sa vitesse à celle du trafic et on s'insère en cédant le passage aux véhicules déjà sur l'autoroute."},
       {s:SIGN.speed('130'), t:"La vitesse est limitée à 130 km/h par temps sec, 110 km/h sous la pluie, et 50 km/h si la visibilité est inférieure à 50 m."},
       {s:SIGN.stopwatch, t:"À haute vitesse, les distances de sécurité sont grandes : la règle des 2 secondes (ou les plots de recul) aide à les respecter."},
       {s:SIGN.danger, t:"La bande d'arrêt d'urgence (BAU) est réservée aux arrêts d'urgence : on s'y gare à droite, on met le gilet, on sort côté sécurité et on se réfugie derrière la glissière."},
       {s:SIGN.blinker, t:"On roule sur la voie de droite ; les voies de gauche servent à dépasser, puis on se rabat."}
     ],
     questions:[
       {sign:SIGN.blinker, q:"Sur la voie d'insertion (accélération), vous devez :",
        choices:["Adapter votre vitesse au trafic et céder le passage aux véhicules déjà sur l'autoroute","Vous arrêter en bout de voie pour attendre","Forcer le passage, aux autres de freiner"],
        explain:"On accélère pour s'insérer à la vitesse du flux, en cédant le passage : les véhicules déjà sur l'autoroute sont prioritaires."},
       {sign:SIGN.speed('130'), q:"Par temps de pluie, la vitesse maximale sur autoroute est :",
        choices:["110 km/h","130 km/h","90 km/h"],
        explain:"130 → 110 km/h sous la pluie ; 50 km/h si la visibilité tombe sous 50 m."},
       {sign:SIGN.danger, q:"La bande d'arrêt d'urgence sert :",
        choices:["Uniquement en cas d'urgence (panne, malaise)","À doubler par la droite","À faire une pause quand on est fatigué"],
        explain:"La BAU est réservée aux arrêts d'urgence ; y rouler ou s'y arrêter sans raison est dangereux et sanctionné."},
       {sign:SIGN.urgent, q:"En panne, arrêté sur la BAU, vous :",
        choices:["Mettez le gilet, faites sortir tout le monde côté droit et attendez derrière la glissière","Restez assis dans la voiture","Réparez côté circulation"],
        explain:"On se met en sécurité derrière la glissière avec le gilet ; jamais dans le véhicule ni côté circulation."},
       {sign:SIGN.blinker, q:"Après un dépassement sur autoroute, vous devez :",
        choices:["Vous rabattre sur la voie de droite","Rester sur la voie de gauche","Ralentir brusquement"],
        explain:"La voie de gauche sert à dépasser : on se rabat à droite dès que c'est possible sans danger."},
       {sign:SIGN.speed('130'), q:"Un panneau de fin d'autoroute signifie :",
        choices:["Les règles de l'autoroute (vitesses, BAU...) ne s'appliquent plus","Que la vitesse reste à 130 km/h","Qu'il faut s'arrêter"],
        explain:"On retrouve alors les règles et limitations des routes classiques."}
     ]},
    {id:'p10', title:'Conditions météo & visibilité', sign:SIGN.headlights,
     blurb:"Pluie, brouillard, neige, nuit : adapter sa vitesse, son éclairage et ses distances quand les conditions se dégradent.",
     facts:[{l:'Visibilité < 50 m',v:'50 km/h'},{l:'Pluie (autoroute)',v:'110 km/h'}],
     points:[
       {s:SIGN.headlights, t:"Par brouillard, pluie forte ou neige, on allume les feux de croisement ; les feux de brouillard s'utilisent quand la visibilité est vraiment réduite."},
       {s:SIGN.speed('50'), t:"Quand la visibilité est inférieure à 50 mètres, la vitesse est limitée à 50 km/h sur toutes les routes."},
       {s:SIGN.stopwatch, t:"Sur route mouillée ou verglacée, la distance de freinage augmente fortement : on double la distance de sécurité."},
       {s:SIGN.danger, t:"Le feu de brouillard arrière éblouit les suiveurs : on l'éteint dès que la visibilité s'améliore."},
       {s:SIGN.headlights, t:"La nuit, feux de route quand la voie est dégagée, feux de croisement dès qu'un véhicule est proche ou arrive en face."}
     ],
     questions:[
       {sign:SIGN.speed('50'), q:"Quand la visibilité est inférieure à 50 mètres, la vitesse est limitée à :",
        choices:["50 km/h sur toutes les routes","90 km/h","30 km/h"],
        explain:"Brouillard, neige ou pluie réduisant la visibilité sous 50 m : 50 km/h maximum partout."},
       {sign:SIGN.headlights, q:"Par brouillard, vous utilisez :",
        choices:["Les feux de croisement (et de brouillard si équipé)","Les feux de route","Les feux de position seuls"],
        explain:"Les feux de route sont renvoyés par le brouillard et éblouissent : croisement + brouillard."},
       {sign:SIGN.danger, q:"Le feu de brouillard arrière doit être éteint :",
        choices:["Dès que la visibilité redevient correcte","Jamais, on le garde la nuit","Seulement en ville"],
        explain:"Très puissant, il éblouit les véhicules derrière : on l'éteint dès que le brouillard se lève."},
       {sign:SIGN.stopwatch, q:"Sur chaussée mouillée, la distance de sécurité doit être :",
        choices:["Augmentée (environ doublée)","Identique qu'au sec","Réduite"],
        explain:"Le freinage est plus long sur sol mouillé : on allonge nettement la distance de sécurité."},
       {sign:SIGN.headlights, q:"En cas de forte pluie de jour, vous devez :",
        choices:["Allumer vos feux de croisement pour être vu","Rouler sans feux","Allumer les pleins phares"],
        explain:"Les feux de croisement rendent visible ; les pleins phares gêneraient les autres usagers."},
       {sign:SIGN.danger, q:"Sur une plaque de verglas, la bonne réaction est :",
        choices:["Lever le pied en douceur, sans freiner ni braquer brusquement","Freiner à fond","Accélérer pour passer vite"],
        explain:"Sur le verglas, tout geste brusque fait déraper : on ralentit très progressivement, sans à-coups."}
     ]},
    {id:'p11', title:'Secours & accident', sign:SIGN.urgent,
     blurb:"Que faire face à un accident : protéger, alerter, secourir — et bien remplir un constat.",
     facts:[{l:'Urgences (UE)',v:'112'},{l:'SAMU',v:'15'},{l:'Pompiers',v:'18'}],
     points:[
       {s:SIGN.urgent, t:"Face à un accident, on applique P.A.S. : Protéger, Alerter, Secourir."},
       {s:SIGN.danger, t:"Protéger : baliser la zone (feux de détresse, gilet, triangle) pour éviter un suraccident, sans se mettre en danger."},
       {s:SIGN.phone, t:"Alerter : appeler le 112 (urgence européenne), le 15 (SAMU) ou le 18 (pompiers) en indiquant le lieu, le nombre de victimes et leur état."},
       {s:SIGN.seatbelt, t:"Secourir : ne pas déplacer une victime sauf danger immédiat, la couvrir et lui parler en attendant les secours."},
       {s:SIGN.panonceau, t:"En cas d'accrochage matériel, on remplit un constat amiable, signé par les deux conducteurs."}
     ],
     questions:[
       {sign:SIGN.urgent, q:"Face à un accident, la bonne séquence est :",
        choices:["Protéger, Alerter, Secourir","Secourir, Protéger, Alerter","Alerter, Secourir, Protéger"],
        explain:"P.A.S. : d'abord protéger la zone, puis alerter les secours, enfin porter secours."},
       {sign:SIGN.phone, q:"Le numéro d'urgence européen, valable dans toute l'UE, est :",
        choices:["Le 112","Le 15","Le 17"],
        explain:"Le 112 joint les secours dans toute l'Europe ; en France 15 = SAMU, 18 = pompiers, 17 = police."},
       {sign:SIGN.danger, q:"« Protéger » les lieux d'un accident, c'est d'abord :",
        choices:["Baliser et signaler le danger (feux de détresse, gilet, triangle)","Déplacer les blessés","Prendre des photos"],
        explain:"On sécurise la zone pour éviter un suraccident, en restant soi-même hors de danger."},
       {sign:SIGN.seatbelt, q:"Une victime consciente, coincée, sans danger immédiat : vous :",
        choices:["Ne la déplacez pas, la rassurez et attendez les secours","La sortez tout de suite","La faites marcher"],
        explain:"On ne déplace pas une victime sauf danger imminent (incendie...), pour ne pas aggraver d'éventuelles lésions."},
       {sign:SIGN.panonceau, q:"Après un accrochage sans blessé, le constat amiable :",
        choices:["Doit être rempli et signé par les deux conducteurs","Est facultatif si les dégâts sont petits","Se remplit seul, sans l'autre conducteur"],
        explain:"Le constat, signé des deux parties, décrit les faits et sert à l'assurance."},
       {sign:SIGN.danger, q:"Témoin d'un accident sur autoroute, vous vous arrêtez :",
        choices:["Sur la bande d'arrêt d'urgence, puis à l'abri derrière la glissière","Sur la voie de droite","N'importe où pour faire vite"],
        explain:"On se gare sur la BAU, gilet enfilé, et on se met en sécurité derrière la glissière avant d'agir."}
     ]}
  ];

export const EXAM_SIZE = 40;
export const EXAM_PASS = 35;

// Builds a synthetic "module" made only of the questions the user has
// previously gotten wrong (see mistakeId/addMistake/removeMistake in
// storage.js), oldest first, so it can be fed straight into the existing
// Lesson quiz component.
export function buildReviewModule(mistakes) {
  const sorted = [...(mistakes || [])].sort((a, b) => a.addedAt - b.addedAt);
  const questions = sorted
    .map((m) => {
      const mod = MODULES.find((mm) => mm.id === m.modId);
      const qd = mod && mod.questions[m.qIndex];
      if (!qd) return null;
      return { ...qd, _modId: m.modId, _qIndex: m.qIndex };
    })
    .filter(Boolean);

  return {
    id: '__review__',
    title: 'Révise tes erreurs',
    sign: SIGN.stopwatch,
    blurb: 'Reprends uniquement les questions que tu as ratées, en commençant par les plus anciennes.',
    points: [],
    questions,
  };
}
