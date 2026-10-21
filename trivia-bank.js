// Trivia bank: ~1100 bilingual questions. Each: {id, topic:{es,he}, q:{es,he}, o:{es:[4],he:[4]}} — o[0] is correct.
const TOPICS = {
  g: { es: 'Cultura general', he: 'ידע כללי' },
  f: { es: 'Fútbol', he: 'כדורגל' },
  m: { es: 'Películas y series', he: 'סרטים וסדרות' },
  geo: { es: 'Geografía', he: 'גאוגרפיה' },
  ai: { es: 'Argentina / Israel', he: 'ארגנטינה / ישראל' },
  mu: { es: 'Música', he: 'מוזיקה' }
};

// [es, he, capEs, capHe, continent, curEs, curHe]
const C = [
  ['Argentina','ארגנטינה','Buenos Aires','בואנוס איירס','SA','peso argentino','פסו ארגנטינאי'],
  ['Israel','ישראל','Jerusalén','ירושלים','AS','nuevo séquel','שקל חדש'],
  ['Uruguay','אורוגוואי','Montevideo','מונטווידאו','SA','peso uruguayo','פסו אורוגוואי'],
  ['Chile','צ׳ילה','Santiago','סנטיאגו','SA','peso chileno','פסו צ׳יליאני'],
  ['Brasil','ברזיל','Brasilia','ברזיליה','SA','real brasileño','ריאל ברזילאי'],
  ['Paraguay','פרגוואי','Asunción','אסונסיון','SA','guaraní','גוארני'],
  ['Bolivia','בוליביה','Sucre','סוקרה','SA','boliviano','בוליביאנו'],
  ['Perú','פרו','Lima','לימה','SA','sol','סול'],
  ['Ecuador','אקוודור','Quito','קיטו','SA','dólar estadounidense','דולר אמריקאי'],
  ['Colombia','קולומביה','Bogotá','בוגוטה','SA','peso colombiano','פסו קולומביאני'],
  ['Venezuela','ונצואלה','Caracas','קראקס','SA','bolívar','בוליבר'],
  ['México','מקסיקו','Ciudad de México','מקסיקו סיטי','NA','peso mexicano','פסו מקסיקני'],
  ['Estados Unidos','ארצות הברית','Washington D. C.','וושינגטון','NA','dólar estadounidense','דולר אמריקאי'],
  ['Canadá','קנדה','Ottawa','אוטווה','NA','dólar canadiense','דולר קנדי'],
  ['Cuba','קובה','La Habana','הוואנה','NA','peso cubano','פסו קובני'],
  ['Guatemala','גואטמלה','Ciudad de Guatemala','גואטמלה סיטי','NA','quetzal','קצל'],
  ['Costa Rica','קוסטה ריקה','San José','סן חוזה','NA','colón','קולון'],
  ['Panamá','פנמה','Ciudad de Panamá','פנמה סיטי','NA','balboa','בלבואה'],
  ['Honduras','הונדורס','Tegucigalpa','טגוסיגלפה','NA','lempira','למפירה'],
  ['Jamaica','ג׳מייקה','Kingston','קינגסטון','NA','dólar jamaiquino','דולר ג׳מייקני'],
  ['República Dominicana','הרפובליקה הדומיניקנית','Santo Domingo','סנטו דומינגו','NA','peso dominicano','פסו דומיניקני'],
  ['El Salvador','אל סלוודור','San Salvador','סן סלבדור','NA','dólar estadounidense','דולר אמריקאי'],
  ['Nicaragua','ניקרגואה','Managua','מנגואה','NA','córdoba','קורדובה'],
  ['Haití','האיטי','Puerto Príncipe','פורט או פרנס','NA','gourde','גורד'],
  ['España','ספרד','Madrid','מדריד','EU','euro','אירו'],
  ['Francia','צרפת','París','פריז','EU','euro','אירו'],
  ['Italia','איטליה','Roma','רומא','EU','euro','אירו'],
  ['Alemania','גרמניה','Berlín','ברלין','EU','euro','אירו'],
  ['Portugal','פורטוגל','Lisboa','ליסבון','EU','euro','אירו'],
  ['Reino Unido','הממלכה המאוחדת','Londres','לונדון','EU','libra esterlina','לירה שטרלינג'],
  ['Irlanda','אירלנד','Dublín','דבלין','EU','euro','אירו'],
  ['Países Bajos','הולנד','Ámsterdam','אמסטרדם','EU','euro','אירו'],
  ['Bélgica','בלגיה','Bruselas','בריסל','EU','euro','אירו'],
  ['Suiza','שווייץ','Berna','ברן','EU','franco suizo','פרנק שווייצרי'],
  ['Austria','אוסטריה','Viena','וינה','EU','euro','אירו'],
  ['Grecia','יוון','Atenas','אתונה','EU','euro','אירו'],
  ['Suecia','שוודיה','Estocolmo','שטוקהולם','EU','corona sueca','כתר שוודי'],
  ['Noruega','נורווגיה','Oslo','אוסלו','EU','corona noruega','כתר נורווגי'],
  ['Dinamarca','דנמרק','Copenhague','קופנהגן','EU','corona danesa','כתר דני'],
  ['Finlandia','פינלנד','Helsinki','הלסינקי','EU','euro','אירו'],
  ['Polonia','פולין','Varsovia','ורשה','EU','esloti','זלוטי'],
  ['Hungría','הונגריה','Budapest','בודפשט','EU','forinto','פורינט'],
  ['República Checa','צ׳כיה','Praga','פראג','EU','corona checa','כתר צ׳כי'],
  ['Rumania','רומניה','Bucarest','בוקרשט','EU','leu rumano','ליי רומני'],
  ['Croacia','קרואטיה','Zagreb','זאגרב','EU','euro','אירו'],
  ['Serbia','סרביה','Belgrado','בלגרד','EU','dinar serbio','דינר סרבי'],
  ['Ucrania','אוקראינה','Kiev','קייב','EU','grivna','הריבניה'],
  ['Rusia','רוסיה','Moscú','מוסקבה','EU','rublo ruso','רובל רוסי'],
  ['Islandia','איסלנד','Reikiavik','רייקיאוויק','EU','corona islandesa','כתר איסלנדי'],
  ['Bulgaria','בולגריה','Sofía','סופיה','EU','lev','לב בולגרי'],
  ['Eslovaquia','סלובקיה','Bratislava','ברטיסלבה','EU','euro','אירו'],
  ['Lituania','ליטא','Vilna','וילנה','EU','euro','אירו'],
  ['Letonia','לטביה','Riga','ריגה','EU','euro','אירו'],
  ['Estonia','אסטוניה','Tallin','טאלין','EU','euro','אירו'],
  ['Albania','אלבניה','Tirana','טירנה','EU','lek','לק'],
  ['Eslovenia','סלובניה','Liubliana','ליובליאנה','EU','euro','אירו'],
  ['Malta','מלטה','La Valeta','ולטה','EU','euro','אירו'],
  ['Bielorrusia','בלארוס','Minsk','מינסק','EU','rublo bielorruso','רובל בלארוסי'],
  ['Moldavia','מולדובה','Chisináu','קישינב','EU','leu moldavo','ליי מולדובני'],
  ['Egipto','מצרים','El Cairo','קהיר','AF','libra egipcia','לירה מצרית'],
  ['Marruecos','מרוקו','Rabat','רבאט','AF','dírham marroquí','דירהם מרוקאי'],
  ['Sudáfrica','דרום אפריקה','Pretoria','פרטוריה','AF','rand','ראנד'],
  ['Nigeria','ניגריה','Abuya','אבוג׳ה','AF','naira','נאירה'],
  ['Kenia','קניה','Nairobi','ניירובי','AF','chelín keniano','שילינג קנייתי'],
  ['Etiopía','אתיופיה','Adís Abeba','אדיס אבבה','AF','birr','ביר'],
  ['Ghana','גאנה','Acra','אקרה','AF','cedi','סדי'],
  ['Senegal','סנגל','Dakar','דקר','AF','franco CFA','פרנק CFA'],
  ['Túnez','תוניסיה','Túnez','תוניס','AF','dinar tunecino','דינר תוניסאי'],
  ['Argelia','אלג׳יריה','Argel','אלג׳יר','AF','dinar argelino','דינר אלג׳ירי'],
  ['Tanzania','טנזניה','Dodoma','דודומה','AF','chelín tanzano','שילינג טנזני'],
  ['Angola','אנגולה','Luanda','לואנדה','AF','kwanza','קואנזה'],
  ['Madagascar','מדגסקר','Antananarivo','אנטננריבו','AF','ariary','אריארי'],
  ['Camerún','קמרון','Yaundé','יאונדה','AF','franco CFA','פרנק CFA'],
  ['Libia','לוב','Trípoli','טריפולי','AF','dinar libio','דינר לובי'],
  ['Sudán','סודן','Jartum','חרטום','AF','libra sudanesa','לירה סודנית'],
  ['Mozambique','מוזמביק','Maputo','מאפוטו','AF','metical','מטיקל'],
  ['Uganda','אוגנדה','Kampala','קמפלה','AF','chelín ugandés','שילינג אוגנדי'],
  ['Ruanda','רואנדה','Kigali','קיגלי','AF','franco ruandés','פרנק רואנדי'],
  ['Zimbabue','זימבבואה','Harare','הררה','AF',null,null],
  ['Japón','יפן','Tokio','טוקיו','AS','yen','ין'],
  ['China','סין','Pekín','בייג׳ינג','AS','yuan','יואן'],
  ['India','הודו','Nueva Delhi','ניו דלהי','AS','rupia india','רופי הודי'],
  ['Corea del Sur','דרום קוריאה','Seúl','סיאול','AS','won surcoreano','וון דרום קוריאני'],
  ['Tailandia','תאילנד','Bangkok','בנגקוק','AS','baht','באט'],
  ['Vietnam','וייטנאם','Hanói','האנוי','AS','dong','דונג'],
  ['Indonesia','אינדונזיה','Yakarta','ג׳קרטה','AS','rupia indonesia','רופיה אינדונזית'],
  ['Filipinas','הפיליפינים','Manila','מנילה','AS','peso filipino','פסו פיליפיני'],
  ['Malasia','מלזיה','Kuala Lumpur','קואלה לומפור','AS','ringgit','רינגיט'],
  ['Pakistán','פקיסטן','Islamabad','איסלאמבאד','AS','rupia pakistaní','רופי פקיסטני'],
  ['Irán','איראן','Teherán','טהרן','AS','rial iraní','ריאל איראני'],
  ['Irak','עיראק','Bagdad','בגדד','AS','dinar iraquí','דינר עיראקי'],
  ['Arabia Saudita','ערב הסעודית','Riad','ריאד','AS','riyal saudí','ריאל סעודי'],
  ['Emiratos Árabes Unidos','איחוד האמירויות','Abu Dabi','אבו דאבי','AS','dírham emiratí','דירהם אמירותי'],
  ['Jordania','ירדן','Amán','עמאן','AS','dinar jordano','דינר ירדני'],
  ['Líbano','לבנון','Beirut','ביירות','AS','libra libanesa','לירה לבנונית'],
  ['Nepal','נפאל','Katmandú','קטמנדו','AS','rupia nepalí','רופי נפאלי'],
  ['Mongolia','מונגוליה','Ulán Bator','אולן בטור','AS','tugrik','טוגריק'],
  ['Catar','קטאר','Doha','דוחה','AS','riyal catarí','ריאל קטארי'],
  ['Afganistán','אפגניסטן','Kabul','קאבול','AS','afgani','אפגני'],
  ['Kazajistán','קזחסטן','Astaná','אסטנה','AS','tenge','טנגה'],
  ['Uzbekistán','אוזבקיסטן','Taskent','טשקנט','AS','som','סום'],
  ['Bangladés','בנגלדש','Daca','דאקה','AS','taka','טאקה'],
  ['Turquía','טורקיה','Ankara','אנקרה','AS','lira turca','לירה טורקית'],
  ['Australia','אוסטרליה','Canberra','קנברה','OC','dólar australiano','דולר אוסטרלי'],
  ['Nueva Zelanda','ניו זילנד','Wellington','ולינגטון','OC','dólar neozelandés','דולר ניו זילנדי'],
  ['Fiyi','פיג׳י','Suva','סובה','OC','dólar fiyiano','דולר פיג׳י'],
  ['Papúa Nueva Guinea','פפואה גינאה החדשה','Port Moresby','פורט מורסבי','OC','kina','קינה']
];
const CONT = { SA:['América del Sur','דרום אמריקה'], NA:['América del Norte y Central','צפון ומרכז אמריקה'], EU:['Europa','אירופה'], AS:['Asia','אסיה'], AF:['África','אפריקה'], OC:['Oceanía','אוקיאניה'] };

// [es, he, symbol]
const EL = [['hidrógeno','מימן','H'],['helio','הליום','He'],['litio','ליתיום','Li'],['carbono','פחמן','C'],['nitrógeno','חנקן','N'],['oxígeno','חמצן','O'],['flúor','פלואור','F'],['neón','ניאון','Ne'],['sodio','נתרן','Na'],['magnesio','מגנזיום','Mg'],['aluminio','אלומיניום','Al'],['silicio','צורן','Si'],['fósforo','זרחן','P'],['azufre','גופרית','S'],['cloro','כלור','Cl'],['argón','ארגון','Ar'],['potasio','אשלגן','K'],['calcio','סידן','Ca'],['hierro','ברזל','Fe'],['cobre','נחושת','Cu'],['zinc','אבץ','Zn'],['plata','כסף','Ag'],['oro','זהב','Au'],['mercurio','כספית','Hg'],['plomo','עופרת','Pb'],['estaño','בדיל','Sn'],['níquel','ניקל','Ni'],['cobalto','קובלט','Co'],['uranio','אורניום','U'],['platino','פלטינה','Pt'],['yodo','יוד','I'],['titanio','טיטניום','Ti'],['cromo','כרום','Cr'],['manganeso','מנגן','Mn'],['bromo','ברום','Br'],['radón','ראדון','Rn'],['kriptón','קריפטון','Kr'],['wolframio','טונגסטן','W'],['bario','בריום','Ba'],['plutonio','פלוטוניום','Pu']];

const TEAMS = { Uruguay:'אורוגוואי', Italia:'איטליה', Alemania:'גרמניה', Brasil:'ברזיל', Inglaterra:'אנגליה', Argentina:'ארגנטינה', Francia:'צרפת', España:'ספרד', Suiza:'שווייץ', Suecia:'שוודיה', Chile:'צ׳ילה', México:'מקסיקו', 'Estados Unidos':'ארצות הברית', Sudáfrica:'דרום אפריקה', Rusia:'רוסיה', Catar:'קטאר', 'Países Bajos':'הולנד', Hungría:'הונגריה', Croacia:'קרואטיה' };
const WC = [[1930,'Uruguay','Uruguay'],[1934,'Italia','Italia'],[1938,'Italia','Francia'],[1950,'Uruguay','Brasil'],[1954,'Alemania','Suiza'],[1958,'Brasil','Suecia'],[1962,'Brasil','Chile'],[1966,'Inglaterra','Inglaterra'],[1970,'Brasil','México'],[1974,'Alemania','Alemania'],[1978,'Argentina','Argentina'],[1982,'Italia','España'],[1986,'Argentina','México'],[1990,'Alemania','Italia'],[1994,'Brasil','Estados Unidos'],[1998,'Francia','Francia'],[2002,'Brasil',null],[2006,'Italia','Alemania'],[2010,'España','Sudáfrica'],[2014,'Alemania','Brasil'],[2018,'Francia','Rusia'],[2022,'Argentina','Catar']];

const PLANETS = [['Mercurio','כוכב חמה'],['Venus','נוגה'],['Tierra','כדור הארץ'],['Marte','מאדים'],['Júpiter','צדק'],['Saturno','שבתאי'],['Urano','אורנוס'],['Neptuno','נפטון']];

// [topic, qEs, qHe, [oEs], [oHe]]  (first option correct)
const H = [
  ['m','¿Quién dirigió "Titanic"?','מי ביים את "טיטאניק"?',['James Cameron','Steven Spielberg','Christopher Nolan','Martin Scorsese'],['ג׳יימס קמרון','סטיבן ספילברג','כריסטופר נולאן','מרטין סקורסזה']],
  ['m','¿En qué ciudad transcurre "Friends"?','באיזו עיר מתרחשת "חברים"?',['Nueva York','Los Ángeles','Chicago','Boston'],['ניו יורק','לוס אנג׳לס','שיקגו','בוסטון']],
  ['m','¿Cómo se llama el león protagonista de "El Rey León"?','איך קוראים לאריה הראשי ב"מלך האריות"?',['Simba','Mufasa','Scar','Nala'],['סימבה','מופסה','סקאר','נאלה']],
  ['ai','¿Qué película argentina ganó el Oscar en 2010?','איזה סרט ארגנטינאי זכה באוסקר ב־2010?',['El secreto de sus ojos','Relatos salvajes','Nueve reinas','Argentina, 1985'],['הסוד שבעיניהם','סיפורים פרועים','תשע מלכות','ארגנטינה, 1985']],
  ['m','¿Qué actor interpreta a Jack Sparrow?','איזה שחקן מגלם את ג׳ק ספארו?',['Johnny Depp','Orlando Bloom','Brad Pitt','Tom Cruise'],['ג׳וני דפ','אורלנדו בלום','בראד פיט','טום קרוז']],
  ['ai','¿Qué serie israelí sigue a una unidad de agentes encubiertos?','איזו סדרה ישראלית עוסקת ביחידת מסתערבים?',['Fauda','Shtisel','Teherán','Srugim'],['פאודה','שטיסל','טהרן','סרוגים']],
  ['m','¿En qué saga aparece la escuela Hogwarts?','באיזו סדרת סרטים מופיע בית הספר הוגוורטס?',['Harry Potter','El Señor de los Anillos','Narnia','Star Wars'],['הארי פוטר','שר הטבעות','נרניה','מלחמת הכוכבים']],
  ['m','¿Quién es el padre de Luke Skywalker?','מי אביו של לוק סקייווקר?',['Darth Vader','Obi-Wan Kenobi','Yoda','Han Solo'],['דארת׳ ויידר','אובי-וואן קנובי','יודה','האן סולו']],
  ['m','¿Qué película de Pixar tiene como protagonista a un pez payaso?','באיזה סרט של פיקסאר הגיבור הוא דג ליצן?',['Buscando a Nemo','Toy Story','Cars','Up'],['מוצאים את נמו','צעצוע של סיפור','מכוניות','למעלה']],
  ['ai','¿Qué actriz israelí interpretó a la Mujer Maravilla?','איזו שחקנית ישראלית גילמה את וונדר וומן?',['Gal Gadot','Natalie Portman','Ayelet Zurer','Shira Haas'],['גל גדות','נטלי פורטמן','איילת זורר','שירה האס']],
  ['m','¿Qué superhéroe es Bruce Wayne?','איזה גיבור־על הוא ברוס וויין?',['Batman','Superman','Spider-Man','Iron Man'],['באטמן','סופרמן','ספיידרמן','איירון מן']],
  ['m','¿En qué año se estrenó la primera "Toy Story"?','באיזו שנה יצא "צעצוע של סיפור" הראשון?',['1995','1999','2001','1990'],['1995','1999','2001','1990']],
  ['m','¿Qué serie trata de un profesor de química que fabrica drogas?','איזו סדרה עוסקת במורה לכימיה שמייצר סמים?',['Breaking Bad','Narcos','Ozark','The Wire'],['שובר שורות','נרקוס','אוזרק','הסמויה']],
  ['m','¿Cómo se llama el muñeco de nieve de "Frozen"?','איך קוראים לאיש השלג ב"לשבור את הקרח"?',['Olaf','Sven','Kristoff','Hans'],['אולף','סוון','קריסטוף','הנס']],
  ['m','¿Quién dirigió "Jurassic Park"?','מי ביים את "פארק היורה"?',['Steven Spielberg','George Lucas','Ridley Scott','James Cameron'],['סטיבן ספילברג','ג׳ורג׳ לוקאס','רידלי סקוט','ג׳יימס קמרון']],
  ['m','¿Qué serie española trata de un gran robo a la Casa de Moneda?','איזו סדרה ספרדית עוסקת בשוד גדול במטבעה?',['La casa de papel','Élite','Vis a vis','Las chicas del cable'],['בית הנייר','אליטה','ויס א ויס','נערות הטלפון']],
  ['m','¿Cuántas películas tiene la trilogía de "El Señor de los Anillos"?','כמה סרטים יש בטרילוגיית "שר הטבעות"?',['3','2','4','5'],['3','2','4','5']],
  ['m','¿Qué personaje dice "Hasta la vista, baby"?','איזו דמות אומרת "Hasta la vista, baby"?',['Terminator','Rocky','Rambo','Robocop'],['המחסל','רוקי','רמבו','רובוקופ']],
  ['mu','¿De qué país es la banda Soda Stereo?','מאיזו מדינה הלהקה סודה סטריאו?',['Argentina','Chile','México','España'],['ארגנטינה','צ׳ילה','מקסיקו','ספרד']],
  ['mu','¿Quién canta "Hips Don\'t Lie"?','מי שרה את "Hips Don\'t Lie"?',['Shakira','Jennifer Lopez','Thalía','Rihanna'],['שקירה','ג׳ניפר לופז','תאליה','ריהאנה']],
  ['mu','¿De qué país son The Beatles?','מאיזו מדינה הביטלס?',['Inglaterra','Estados Unidos','Irlanda','Australia'],['אנגליה','ארצות הברית','אירלנד','אוסטרליה']],
  ['ai','¿Qué cantante israelí ganó Eurovisión 2018 con "Toy"?','איזו זמרת ישראלית זכתה באירוויזיון 2018 עם "Toy"?',['Netta','Noa Kirel','Eden Golan','Dana International'],['נטע ברזילי','נועה קירל','עדן גולן','דנה אינטרנשיונל']],
  ['ai','¿Qué músico argentino era conocido como "el Flaco"?','איזה מוזיקאי ארגנטינאי כונה "אל פלאקו"?',['Luis Alberto Spinetta','Charly García','Gustavo Cerati','Fito Páez'],['לואיס אלברטו ספינטה','צ׳רלי גארסיה','גוסטבו סראטי','פיטו פאאס']],
  ['mu','¿Qué instrumento tocaba Jimi Hendrix?','על איזה כלי ניגן ג׳ימי הנדריקס?',['Guitarra','Batería','Piano','Bajo'],['גיטרה','תופים','פסנתר','בס']],
  ['mu','¿Cuántas cuerdas tiene una guitarra clásica?','כמה מיתרים יש לגיטרה קלאסית?',['6','4','5','7'],['6','4','5','7']],
  ['ai','¿Qué género musical nació en el Río de la Plata?','איזה סגנון מוזיקלי נולד באזור ריו דה לה פלטה?',['Tango','Salsa','Samba','Flamenco'],['טנגו','סלסה','סמבה','פלמנקו']],
  ['mu','¿Quién es conocido como el "Rey del Pop"?','מי מכונה "מלך הפופ"?',['Michael Jackson','Elvis Presley','Prince','Freddie Mercury'],['מייקל ג׳קסון','אלביס פרסלי','פרינס','פרדי מרקורי']],
  ['mu','¿Qué cantante colombiano canta "Mi gente"?','איזה זמר קולומביאני שר את "Mi gente"?',['J Balvin','Maluma','Juanes','Carlos Vives'],['ג׳יי באלווין','מאלומה','חואנס','קרלוס ויבס']],
  ['mu','¿Qué banda grabó "Bohemian Rhapsody"?','איזו להקה הקליטה את "Bohemian Rhapsody"?',['Queen','The Rolling Stones','Led Zeppelin','Pink Floyd'],['קווין','הרולינג סטונס','לד זפלין','פינק פלויד']],
  ['mu','¿Quién compuso "Las cuatro estaciones"?','מי הלחין את "ארבע העונות"?',['Vivaldi','Mozart','Beethoven','Bach'],['ויוואלדי','מוצרט','בטהובן','באך']],
  ['mu','¿Quién grabó "Despacito" con Daddy Yankee?','מי הקליט את "Despacito" עם דדי יאנקי?',['Luis Fonsi','Ricky Martin','Enrique Iglesias','Marc Anthony'],['לואיס פונסי','ריקי מרטין','אנריקה איגלסיאס','מארק אנתוני']],
  ['mu','¿Qué instrumento tiene 88 teclas?','לאיזה כלי יש 88 קלידים?',['Piano','Acordeón','Órgano','Arpa'],['פסנתר','אקורדיון','עוגב','נבל']],
  ['mu','¿Cuántos integrantes tenían The Beatles?','כמה חברים היו בביטלס?',['4','3','5','6'],['4','3','5','6']],
  ['mu','¿De dónde es Bad Bunny?','מאיפה באד באני?',['Puerto Rico','México','Colombia','Cuba'],['פוארטו ריקו','מקסיקו','קולומביה','קובה']],
  ['ai','¿Qué mar baña la costa de Tel Aviv?','איזה ים נמצא לחופי תל אביב?',['Mediterráneo','Rojo','Muerto','Negro'],['הים התיכון','ים סוף','ים המלח','הים השחור']],
  ['ai','¿Cuál es el punto más bajo de la superficie terrestre?','מהו המקום הנמוך ביותר על פני היבשה?',['Mar Muerto','Valle de la Muerte','Mar de Galilea','Mar Caspio'],['ים המלח','עמק המוות','הכנרת','הים הכספי']],
  ['ai','¿Qué río separa Buenos Aires de Uruguay?','איזה נהר מפריד בין בואנוס איירס לאורוגוואי?',['Río de la Plata','Paraná','Amazonas','Orinoco'],['ריו דה לה פלטה','פראנה','אמזונס','אורינוקו']],
  ['ai','¿Cuál es la montaña más alta de América?','מהו ההר הגבוה ביותר ביבשת אמריקה?',['Aconcagua','Chimborazo','Denali','Huascarán'],['אקונקגואה','צ׳ימבוראסו','דנאלי','ואסקרן']],
  ['ai','¿En qué año se fundó el Estado de Israel?','באיזו שנה הוקמה מדינת ישראל?',['1948','1956','1967','1936'],['1948','1956','1967','1936']],
  ['ai','¿Qué cataratas comparten Argentina y Brasil?','אילו מפלים משותפים לארגנטינה ולברזיל?',['Iguazú','Niágara','Victoria','Salto Ángel'],['איגואסו','ניאגרה','ויקטוריה','מפל אנחל']],
  ['ai','¿Cuál es el lago de agua dulce más grande de Israel?','מהו אגם המים המתוקים הגדול בישראל?',['Mar de Galilea','Mar Muerto','Lago Hula','Lago Ram'],['הכנרת','ים המלח','אגם החולה','ברכת רם']],
  ['ai','¿Qué infusión es típica de Argentina?','איזה משקה חם אופייני לארגנטינה?',['Mate','Té verde','Café turco','Chicha'],['מאטה','תה ירוק','קפה טורקי','צ׳יצ׳ה']],
  ['ai','¿Qué ciudad israelí es conocida como "la Ciudad Blanca"?','איזו עיר בישראל מכונה "העיר הלבנה"?',['Tel Aviv','Haifa','Eilat','Beerseba'],['תל אביב','חיפה','אילת','באר שבע']],
  ['ai','¿Qué famoso glaciar está en la Patagonia argentina?','איזה קרחון מפורסם נמצא בפטגוניה הארגנטינאית?',['Perito Moreno','Aletsch','Mer de Glace','Columbia'],['פריטו מורנו','אלץ׳','מר דה גלאס','קולומביה']],
  ['ai','¿Qué ciudad israelí está sobre el Mar Rojo?','איזו עיר בישראל שוכנת לחוף ים סוף?',['Eilat','Haifa','Asdod','Netanya'],['אילת','חיפה','אשדוד','נתניה']],
  ['ai','¿Quién fue el primer primer ministro de Israel?','מי היה ראש הממשלה הראשון של ישראל?',['David Ben-Gurión','Golda Meir','Menajem Beguin','Isaac Rabin'],['דוד בן־גוריון','גולדה מאיר','מנחם בגין','יצחק רבין']],
  ['ai','¿Qué día se celebra la independencia argentina?','באיזה תאריך חוגגים את יום העצמאות של ארגנטינה?',['9 de julio','25 de mayo','20 de junio','12 de octubre'],['9 ביולי','25 במאי','20 ביוני','12 באוקטובר']],
  ['ai','¿Qué comida israelí se hace con bolitas de garbanzo fritas?','איזה מאכל ישראלי עשוי מכדורי חומוס מטוגנים?',['Falafel','Shakshuka','Sabij','Burekas'],['פלאפל','שקשוקה','סביח','בורקס']],
  ['ai','¿Cómo se llama la comida argentina de carne a la parrilla?','איך נקראת ארוחת הבשר על האש הארגנטינאית?',['Asado','Barbacoa','Shawarma','Fondue'],['אסאדו','ברביקיו','שווארמה','פונדו']],
  ['ai','¿Qué escritor argentino escribió "El Aleph"?','איזה סופר ארגנטינאי כתב את "האלף"?',['Jorge Luis Borges','Julio Cortázar','Ernesto Sabato','Adolfo Bioy Casares'],['חורחה לואיס בורחס','חוליו קורטאסר','ארנסטו סבאטו','אדולפו ביוי קסארס']],
  ['ai','¿En qué ciudad está el Muro de los Lamentos?','באיזו עיר נמצא הכותל המערבי?',['Jerusalén','Tel Aviv','Haifa','Nazaret'],['ירושלים','תל אביב','חיפה','נצרת']],
  ['ai','¿Qué desierto ocupa gran parte del sur de Israel?','איזה מדבר משתרע על רוב דרום ישראל?',['Néguev','Sahara','Atacama','Gobi'],['הנגב','סהרה','אטקמה','גובי']],
  ['ai','¿Cuál es la provincia más austral de Argentina?','מהו המחוז הדרומי ביותר בארגנטינה?',['Tierra del Fuego','Santa Cruz','Chubut','Neuquén'],['טיירה דל פואגו','סנטה קרוס','צ׳ובוט','נאוקן']],
  ['ai','¿Qué técnica de riego se desarrolló en Israel para ahorrar agua?','איזו שיטת השקיה פותחה בישראל לחיסכון במים?',['Riego por goteo','Aspersores','Molinos de viento','Inundación'],['השקיה בטפטוף','ממטרות','טחנות רוח','הצפה']],
  ['ai','¿Qué avenida porteña es famosa por su gran ancho?','איזו שדרה בבואנוס איירס מפורסמת ברוחבה?',['9 de Julio','Corrientes','Florida','Santa Fe'],['9 ביולי','קוריינטס','פלורידה','סנטה פה']],
  ['f','¿Cuántos jugadores tiene un equipo en cancha?','כמה שחקנים יש לקבוצה על המגרש?',['11','10','9','12'],['11','10','9','12']],
  ['f','¿Qué argentino ganó 8 Balones de Oro?','איזה ארגנטינאי זכה ב־8 כדורי זהב?',['Lionel Messi','Diego Maradona','Ángel Di María','Gabriel Batistuta'],['ליונל מסי','דייגו מראדונה','אנחל די מריה','גבריאל בטיסטוטה']],
  ['f','¿Contra qué selección hizo Maradona "la mano de Dios"?','נגד איזו נבחרת כבש מראדונה את "יד האלוהים"?',['Inglaterra','Alemania','Bélgica','Italia'],['אנגליה','גרמניה','בלגיה','איטליה']],
  ['f','¿Cuál es el clásico más famoso de Argentina?','מהו הדרבי המפורסם ביותר בארגנטינה?',['Boca–River','Racing–Independiente','Central–Newell\'s','San Lorenzo–Huracán'],['בוקה–ריבר','רסינג–אינדפנדיינטה','סנטרל–ניואלס','סן לורנסו–אורקאן']],
  ['f','¿Qué club israelí juega de amarillo y azul?','איזו קבוצה ישראלית משחקת בצהוב וכחול?',['Maccabi Tel Aviv','Hapoel Tel Aviv','Beitar Jerusalén','Maccabi Haifa'],['מכבי תל אביב','הפועל תל אביב','בית"ר ירושלים','מכבי חיפה']],
  ['f','¿Cuánto dura un partido de fútbol sin alargue?','כמה זמן נמשך משחק כדורגל ללא הארכה?',['90 minutos','80 minutos','100 minutos','120 minutos'],['90 דקות','80 דקות','100 דקות','120 דקות']],
  ['f','¿Qué selección ganó más Mundiales?','לאיזו נבחרת הכי הרבה זכיות במונדיאל?',['Brasil','Alemania','Italia','Argentina'],['ברזיל','גרמניה','איטליה','ארגנטינה']],
  ['f','¿En qué club debutó Messi como profesional?','באיזו קבוצה ערך מסי את הופעת הבכורה המקצוענית שלו?',['Barcelona','Newell\'s','PSG','Inter Miami'],['ברצלונה','ניואלס','פ.ס.ז׳','אינטר מיאמי']],
  ['f','¿Qué tarjeta significa expulsión?','איזה כרטיס פירושו הרחקה?',['Roja','Amarilla','Verde','Azul'],['אדום','צהוב','ירוק','כחול']],
  ['f','¿Cómo apodan al arquero Emiliano Martínez?','מה הכינוי של השוער אמיליאנו מרטינס?',['Dibu','Mono','Pato','Chiqui'],['דיבו','מונו','פאטו','צ׳יקי']],
  ['f','¿Qué jugador portugués es conocido como CR7?','איזה שחקן פורטוגלי מכונה CR7?',['Cristiano Ronaldo','Luís Figo','Bruno Fernandes','Pepe'],['כריסטיאנו רונאלדו','לואיש פיגו','ברונו פרננדש','פפה']],
  ['g','¿Cuántos lados tiene un hexágono?','כמה צלעות יש למשושה?',['6','5','8','7'],['6','5','8','7']],
  ['g','¿Cuál es el planeta más grande del sistema solar?','מהו כוכב הלכת הגדול במערכת השמש?',['Júpiter','Saturno','Neptuno','Tierra'],['צדק','שבתאי','נפטון','כדור הארץ']],
  ['g','¿Cuántos días tiene un año bisiesto?','כמה ימים יש בשנה מעוברת (לועזית)?',['366','365','364','360'],['366','365','364','360']],
  ['geo','¿Cuál es el océano más grande?','מהו האוקיינוס הגדול ביותר?',['Pacífico','Atlántico','Índico','Ártico'],['השקט','האטלנטי','ההודי','הארקטי']],
  ['g','¿Quién pintó la Mona Lisa?','מי צייר את המונה ליזה?',['Leonardo da Vinci','Miguel Ángel','Picasso','Van Gogh'],['לאונרדו דה וינצ׳י','מיכלאנג׳לו','פיקאסו','ואן גוך']],
  ['g','¿Cuál es el animal terrestre más rápido?','מהי החיה היבשתית המהירה ביותר?',['Guepardo','León','Caballo','Antílope'],['ברדלס','אריה','סוס','אנטילופה']],
  ['g','¿Cuántos huesos tiene un adulto?','כמה עצמות יש לאדם בוגר?',['206','186','226','256'],['206','186','226','256']],
  ['g','¿Qué gas absorben las plantas para la fotosíntesis?','איזה גז קולטים הצמחים לפוטוסינתזה?',['Dióxido de carbono','Oxígeno','Nitrógeno','Helio'],['פחמן דו־חמצני','חמצן','חנקן','הליום']],
  ['geo','¿Cuál es el país más grande del mundo?','מהי המדינה הגדולה בעולם בשטחה?',['Rusia','Canadá','China','Estados Unidos'],['רוסיה','קנדה','סין','ארצות הברית']],
  ['g','¿Cuántos minutos tiene un día?','כמה דקות יש ביממה?',['1440','1240','1640','1400'],['1440','1240','1640','1400']],
  ['g','¿Quién escribió "Don Quijote"?','מי כתב את "דון קישוט"?',['Miguel de Cervantes','Lope de Vega','García Márquez','Borges'],['מיגל דה סרוונטס','לופה דה וגה','גרסיה מרקס','בורחס']],
  ['g','¿Cuál es el metal más abundante en la corteza terrestre?','מהי המתכת הנפוצה ביותר בקרום כדור הארץ?',['Aluminio','Hierro','Cobre','Oro'],['אלומיניום','ברזל','נחושת','זהב']],
  ['g','¿Cuántas patas tiene una araña?','כמה רגליים יש לעכביש?',['8','6','10','12'],['8','6','10','12']],
  ['g','¿Qué órgano bombea la sangre?','איזה איבר שואב את הדם?',['Corazón','Pulmones','Hígado','Riñones'],['הלב','הריאות','הכבד','הכליות']],
  ['g','¿En qué año llegó el ser humano a la Luna?','באיזו שנה נחת האדם על הירח?',['1969','1959','1972','1965'],['1969','1959','1972','1965']],
  ['g','¿A qué temperatura hierve el agua al nivel del mar?','באיזו טמפרטורה רותחים מים בגובה פני הים?',['100 °C','90 °C','80 °C','120 °C'],['100°C','90°C','80°C','120°C']],
  ['g','¿Qué idioma tiene más hablantes nativos?','לאיזו שפה יש הכי הרבה דוברים ילידיים?',['Chino mandarín','Inglés','Español','Hindi'],['סינית מנדרינית','אנגלית','ספרדית','הינדי']],
  ['g','¿Cuántos colores tiene el arcoíris?','כמה צבעים יש בקשת בענן?',['7','6','5','8'],['7','6','5','8']],
  ['g','¿Cuál es el animal más grande del planeta?','מהי החיה הגדולה ביותר על פני כדור הארץ?',['Ballena azul','Elefante africano','Tiburón ballena','Jirafa'],['לווייתן כחול','פיל אפריקני','כריש לווייתני','ג׳ירפה']],
  ['g','¿Quién propuso la teoría de la relatividad?','מי הציע את תורת היחסות?',['Albert Einstein','Isaac Newton','Galileo Galilei','Stephen Hawking'],['אלברט איינשטיין','אייזק ניוטון','גלילאו גליליי','סטיבן הוקינג']],
  ['geo','¿Cuál es el desierto cálido más grande del mundo?','מהו המדבר החם הגדול בעולם?',['Sahara','Gobi','Kalahari','Atacama'],['סהרה','גובי','קלהארי','אטקמה']],
  ['geo','¿Cuál es la montaña más alta del mundo?','מהו ההר הגבוה בעולם?',['Everest','K2','Aconcagua','Kilimanjaro'],['אוורסט','K2','אקונקגואה','קילימנג׳רו']],
  ['geo','¿Qué país tiene forma de bota?','לאיזו מדינה צורה של מגף?',['Italia','Grecia','Portugal','Chile'],['איטליה','יוון','פורטוגל','צ׳ילה']],
  ['geo','¿Qué océano separa América de Europa?','איזה אוקיינוס מפריד בין אמריקה לאירופה?',['Atlántico','Pacífico','Índico','Ártico'],['האטלנטי','השקט','ההודי','הארקטי']]
];

function rng(seed) { let s = seed >>> 0; return () => { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; }; }
const ROMAN = n => { const m = [[1000,'M'],[900,'CM'],[500,'D'],[400,'CD'],[100,'C'],[90,'XC'],[50,'L'],[40,'XL'],[10,'X'],[9,'IX'],[5,'V'],[4,'IV'],[1,'I']]; let r = ''; for (const [v, s] of m) while (n >= v) { r += s; n -= v; } return r; };

export function buildBank() {
  const R = rng(20261020);
  const pickN = (pool, n, avoid) => { const out = []; const seen = new Set([avoid]); let guard = 0; while (out.length < n && guard++ < 500) { const x = pool[Math.floor(R() * pool.length)]; const k = Array.isArray(x) ? x[0] : x; if (!seen.has(k)) { seen.add(k); out.push(x); } } return out; };
  const nums = (c, cands) => { const s = [...new Set(cands.filter(x => x > 0 && x !== c))].slice(0, 3); while (s.length < 3) s.push(c + s.length + 2); return [c, ...s].map(String); };
  const bank = [];
  const add = (id, t, qEs, qHe, oEs, oHe) => bank.push({ id, topic: TOPICS[t], q: { es: qEs, he: qHe }, o: { es: oEs, he: oHe || oEs } });
  const ctop = c => (c[0] === 'Argentina' || c[0] === 'Israel') ? 'ai' : 'geo';

  C.forEach((c, i) => {
    const caps = pickN(C, 3, c[0]);
    add('cap-' + i, ctop(c), `¿Cuál es la capital de ${c[0]}?`, `מהי בירת ${c[1]}?`, [c[2], ...caps.map(x => x[2])], [c[3], ...caps.map(x => x[3])]);
    if (c[2] !== c[0]) {
      const cs = pickN(C, 3, c[0]);
      add('rev-' + i, ctop(c), `¿De qué país es capital ${c[2]}?`, `${c[3]} היא בירתה של איזו מדינה?`, [c[0], ...cs.map(x => x[0])], [c[1], ...cs.map(x => x[1])]);
    }
    const others = Object.keys(CONT).filter(k => k !== c[4]).sort(() => R() - .5).slice(0, 3);
    add('cont-' + i, ctop(c), `¿En qué continente está ${c[0]}?`, `באיזו יבשת נמצאת ${c[1]}?`, [CONT[c[4]][0], ...others.map(k => CONT[k][0])], [CONT[c[4]][1], ...others.map(k => CONT[k][1])]);
    if (c[5]) {
      const pool = [...new Map(C.filter(x => x[5] && x[5] !== c[5]).map(x => [x[5], x])).values()];
      const cur = pickN(pool, 3, null);
      add('cur-' + i, ctop(c), `¿Cuál es la moneda de ${c[0]}?`, `מהו המטבע של ${c[1]}?`, [c[5], ...cur.map(x => x[5])], [c[6], ...cur.map(x => x[6])]);
    }
  });
  EL.forEach((e, i) => {
    const o = pickN(EL, 3, e[0]);
    add('el1-' + i, 'g', `¿Cuál es el símbolo químico del ${e[0]}?`, `מהו הסמל הכימי של ${e[1]}?`, [e[2], ...o.map(x => x[2])]);
    const o2 = pickN(EL, 3, e[0]);
    add('el2-' + i, 'g', `¿Qué elemento tiene el símbolo ${e[2]}?`, `לאיזה יסוד הסמל ${e[2]}?`, [e[0], ...o2.map(x => x[0])].map(s => s[0].toUpperCase() + s.slice(1)), [e[1], ...o2.map(x => x[1])]);
  });
  const teamList = Object.keys(TEAMS);
  WC.forEach(([y, w, h]) => {
    const o = pickN(teamList, 3, w);
    add('wc-' + y, 'f', `¿Qué selección ganó el Mundial ${y}?`, `איזו נבחרת זכתה במונדיאל ${y}?`, [w, ...o], [TEAMS[w], ...o.map(x => TEAMS[x])]);
    if (h) { const o2 = pickN(teamList, 3, h); add('host-' + y, 'f', `¿Qué país organizó el Mundial ${y}?`, `איזו מדינה אירחה את מונדיאל ${y}?`, [h, ...o2], [TEAMS[h], ...o2.map(x => TEAMS[x])]); }
  });
  PLANETS.forEach((p, i) => {
    const o = pickN(PLANETS, 3, p[0]);
    add('pl-' + i, 'g', `¿Qué planeta está en el lugar ${i + 1} desde el Sol?`, `איזה כוכב לכת נמצא במקום ה־${i + 1} מהשמש?`, [p[0], ...o.map(x => x[0])], [p[1], ...o.map(x => x[1])]);
  });
  const romanSet = new Set(); while (romanSet.size < 250) romanSet.add(4 + Math.floor(R() * 2996));
  [...romanSet].forEach(n => {
    const o = nums(n, [n + 1, n - 1, n + 10, n - 10, n + 100]);
    add('rom-' + n, 'g', `¿Qué número es ${ROMAN(n)} en números romanos?`, `איזה מספר הוא ${ROMAN(n)} בספרות רומיות?`, o);
  });
  for (let a = 6; a <= 19; a++) for (let b = 6; b <= 19; b++) {
    const c = a * b;
    add(`mul-${a}x${b}`, 'g', `¿Cuánto es ${a} × ${b}?`, `כמה זה ${a} × ${b}?`, nums(c, [c + a, c - b, c + 10, c - 10]));
  }
  for (let n = 4; n <= 33; n++) add('sq-' + n, 'g', `¿Cuál es la raíz cuadrada de ${n * n}?`, `מהו השורש הריבועי של ${n * n}?`, nums(n, [n + 1, n - 1, n + 2]));
  H.forEach((h, i) => add('h-' + i, h[0], h[1], h[2], h[3], h[4]));
  return bank;
}
