import { MONTH_NAMES, WEEKDAY_NAMES, ADORIS_HOUR_NAMES } from './constants';

export const MONTH_DATA = [
  { // ELOHIM
    name: MONTH_NAMES[0],
    options: [
      { meaning: "Mois du Dieu Créateur. C'est un temps pour de nouveaux commencements, pour l'innovation et pour reconnaître la puissance souveraine de Dieu sur toute chose.", verse: "Genèse 1:1 - Au commencement, Dieu créa les cieux et la terre." },
      { meaning: "Période pour manifester la créativité que Dieu a placée en vous. Chaque jour est une toile vierge pour peindre avec foi et audace.", verse: "Éphésiens 2:10 - Car nous sommes son ouvrage, ayant été créés en Jésus Christ pour de bonnes oeuvres..." },
    ]
  },
  { // TSIDKENU
    name: MONTH_NAMES[1],
    options: [
      { meaning: "Mois de l'Éternel, notre Justice. Période de réalignement, de repentance et de recherche de la droiture de Dieu dans tous les aspects de la vie.", verse: "2 Corinthiens 5:21 - Celui qui n'a point connu le péché, il l'a fait devenir péché pour nous, afin que nous devenions en lui justice de Dieu." },
      { meaning: "Temps pour examiner son coeur et s'aligner sur les standards divins. La vraie justice est un don qui transforme nos actions.", verse: "Proverbes 21:3 - La pratique de la justice et de l'équité, Voilà ce que l'Éternel préfère aux sacrifices." },
    ]
  },
  { // YIREH
    name: MONTH_NAMES[2],
    options: [
      { meaning: "Mois de l'Éternel qui pourvoit. Un temps pour faire confiance à la provision divine, pour la générosité et pour reconnaître que Dieu est notre source.", verse: "Philippiens 4:19 - Et mon Dieu pourvoira à tous vos besoins selon sa richesse, avec gloire, en Jésus Christ." },
      { meaning: "Période pour cultiver un coeur reconnaissant. Chaque bénédiction est une preuve de la fidélité de Dieu, notre Pourvoyeur.", verse: "Matthieu 6:26 - Regardez les oiseaux du ciel: ils ne sèment ni ne moissonnent... et votre Père céleste les nourrit." },
    ]
  },
  { // RAPHA
    name: MONTH_NAMES[3],
    options: [
      { meaning: "Mois de l'Éternel qui guérit. Consacré à la guérison physique, émotionnelle et spirituelle. Un temps pour prier pour la restauration.", verse: "Ésaïe 53:5 - ...c'est par ses meurtrissures que nous sommes guéris." },
      { meaning: "Temps pour rechercher la guérison holistique que Dieu offre. Il restaure non seulement le corps, mais aussi l'âme brisée.", verse: "Psaume 147:3 - Il guérit ceux qui ont le coeur brisé, Et il panse leurs blessures." },
    ]
  },
  { // SHALOM
    name: MONTH_NAMES[4],
    options: [
      { meaning: "Mois de l'Éternel, notre Paix. Période pour cultiver la paix intérieure, la réconciliation et pour être un artisan de paix dans notre entourage.", verse: "Jean 14:27 - Je vous laisse la paix, je vous donne ma paix. Je ne vous donne pas comme le monde donne." },
      { meaning: "La paix de Dieu surpasse toute compréhension. Ce mois-ci, ancrez votre âme en Celui qui est le Prince de la Paix.", verse: "Ésaïe 26:3 - À celui qui est ferme dans ses sentiments Tu assures la paix, la paix, Parce qu'il se confie en toi." },
    ]
  },
  { // EL-ROI
    name: MONTH_NAMES[5],
    options: [
      { meaning: "Mois du Dieu qui voit. Un temps pour prendre conscience de l'omniprésence de Dieu et pour chercher Sa vision pour notre vie.", verse: "Psaume 139:7-8 - Où irais-je loin de ton esprit, Et où fuirais-je loin de ta face ?" },
      { meaning: "Dans les moments où vous vous sentez invisible, rappelez-vous qu'El-Roi vous voit. Il connaît vos luttes et vos espoirs.", verse: "Genèse 16:13 - Alors Agar appela l'Éternel qui lui avait parlé: Tu es le Dieu qui me voit." },
    ]
  },
  { // YESHUA
    name: MONTH_NAMES[6],
    options: [
      { meaning: "Mois du Salut en Jésus. Le point culminant de l'année, centré sur le sacrifice, la rédemption et la grâce offerts par Yeshua (Jésus).", verse: "Jean 3:16 - Car Dieu a tant aimé le monde qu'il a donné son Fils unique, afin que quiconque croit en lui ne périsse point, mais qu'il ait la vie éternelle." },
      { meaning: "Période pour célébrer la liberté trouvée en Christ. La rédemption est le plus grand des dons, une invitation à une vie nouvelle.", verse: "Actes 4:12 - Il n'y a de salut en aucun autre; car il n'y a sous le ciel aucun autre nom qui ait été donné parmi les hommes, par lequel nous devions être sauvés." },
    ]
  },
  { // NISSI
    name: MONTH_NAMES[7],
    options: [
      { meaning: "Mois de l'Éternel, ma Bannière. Un temps pour déclarer la victoire en Christ sur les défis et pour se rassembler sous l'étendard de Sa protection.", verse: "Exode 17:15 - Moïse bâtit un autel, et lui donna pour nom: l'Éternel ma bannière." },
      { meaning: "Levez l'étendard de la foi. En Christ, la victoire est déjà acquise. Marchez avec l'assurance de celui qui combat sous la bannière du Roi.", verse: "1 Corinthiens 15:57 - Mais grâces soient rendues à Dieu, qui nous donne la victoire par notre Seigneur Jésus Christ!" },
    ]
  },
  { // SABAOTH
    name: MONTH_NAMES[8],
    options: [
      { meaning: "Mois de l'Éternel des Armées. Période pour reconnaître la puissance et l'autorité de Dieu sur les armées célestes et pour s'engager dans le combat spirituel.", verse: "Éphésiens 6:12 - Car nous n'avons pas à lutter contre la chair et le sang, mais contre les dominations..." },
      { meaning: "Rappelez-vous que les armées célestes combattent pour vous. Vous n'êtes pas seul dans vos batailles. L'Éternel Sabaoth est votre force.", verse: "Romains 8:37 - ...dans toutes ces choses nous sommes plus que vainqueurs par celui qui nous a aimés." },
    ]
  }
];

export const WEEKDAY_DATA = [
  { // Elohim
    name: WEEKDAY_NAMES[0],
    attribute: 'Création',
    options: [
      { meaning: "Le jour de la puissance créatrice. Méditez sur la capacité de Dieu à faire du neuf dans votre vie. C'est un jour d'initiative et de foi.", verse: "Ésaïe 43:19 - Voici, je vais faire une chose nouvelle... Je mettrai un chemin dans le désert, et des fleuves dans la solitude." },
      { meaning: "Jour pour initier des projets sous le regard de Dieu. Consacrez vos efforts et laissez le Souffle divin inspirer vos actions.", verse: "Psaume 90:17 - Que la grâce de l'Éternel, notre Dieu, soit sur nous! Affermis l'ouvrage de nos mains..." },
    ]
  },
  { // Tsidkenu
    name: WEEKDAY_NAMES[1],
    attribute: 'Justice',
    options: [
      { meaning: "Le jour du réalignement avec la volonté parfaite de Dieu. C'est un temps pour l'intégrité, l'honnêteté et pour agir avec droiture.", verse: "Michée 6:8 - On t'a fait connaître, ô homme, ce qui est bien; Et ce que l'Éternel demande de toi..." },
      { meaning: "Jour pour pratiquer l'équité dans toutes vos relations. Que vos décisions reflètent le coeur juste de Dieu.", verse: "Amos 5:24 - Mais que la droiture soit comme un courant d'eau, Et la justice comme un torrent qui jamais не se dessèche." },
    ]
  },
  { // Yireh
    name: WEEKDAY_NAMES[2],
    attribute: 'Provision',
    options: [
      { meaning: "Le jour de la reconnaissance de la bonté de Dieu. Remerciez-le pour ses bienfaits et partagez avec ceux qui sont dans le besoin.", verse: "Matthieu 6:31-33 - Ne vous inquiétez donc point... Votre Père céleste sait que vous en avez besoin." },
      { meaning: "Un jour pour se souvenir que Dieu est notre berger. Il nous conduit vers de verts pâturages et ne nous laisse manquer de rien.", verse: "Psaume 23:1 - L'Éternel est mon berger: je ne manquerai de rien." },
    ]
  },
  { // Rapha
    name: WEEKDAY_NAMES[3],
    attribute: 'Guérison',
    options: [
      { meaning: "Le jour de la restauration divine. Priez pour la guérison des corps, des âmes et des esprits. Offrez le réconfort à ceux qui souffrent.", verse: "Jérémie 17:14 - Guéris-moi, Éternel, et je serai guéri; Sauve-moi, et je serai sauvé; Car tu es ma gloire." },
      { meaning: "Jour pour être un canal de la guérison de Dieu pour les autres, par une parole, une prière ou un acte de compassion.", verse: "Proverbes 12:18 - Tel, qui parle légèrement, blesse comme un glaive; Mais la langue des sages apporte la guérison." },
    ]
  },
  { // Shalom
    name: WEEKDAY_NAMES[4],
    attribute: 'Paix',
    options: [
      { meaning: "Le jour de la paix de Christ. Recherchez la tranquillité de l'âme, pardonnez et demandez pardon. Soyez un instrument de paix.", verse: "Colossiens 3:15 - Et que la paix de Christ, à laquelle vous avez été appelés pour former un seul corps, règne dans vos coeurs." },
      { meaning: "Jour pour apaiser les conflits et semer l'harmonie. La paix n'est pas l'absence de problèmes, mais la présence de Dieu au milieu d'eux.", verse: "Matthieu 5:9 - Heureux ceux qui procurent la paix, car ils seront appelés fils de Dieu!" },
    ]
  },
  { // El-Roi
    name: WEEKDAY_NAMES[5],
    attribute: 'Vision',
    options: [
      { meaning: "Le jour de la perspective divine. Demandez à Dieu de vous montrer les choses comme Il les voit. Un temps pour la prière et l'écoute.", verse: "Proverbes 29:18 - Quand il n'y a pas de révélation, le peuple est sans frein; Heureux s'il observe la loi." },
      { meaning: "Ouvrez les yeux de votre coeur pour discerner les plans de Dieu. La vision divine donne un but et une direction à nos vies.", verse: "Habacuc 2:2 - L'Éternel m'adressa la parole, et il dit: Écris la prophétie: Grave-la sur des tables, Afin qu'on la lise couramment." },
    ]
  },
  { // Yeshua
    name: WEEKDAY_NAMES[6],
    attribute: 'Salut',
    options: [
      { meaning: "Le jour du repos et de la célébration du salut en Yeshua. C'est un temps de joie, de communion et de méditation sur l'oeuvre de la croix.", verse: "Psaume 95:1 - Venez, chantons avec allégresse à l'Éternel! Poussons des cris de joie vers le rocher de notre salut." },
      { meaning: "Un jour pour se reposer dans l'oeuvre accomplie de Christ. Le salut n'est pas gagné par nos efforts, mais reçu par la foi.", verse: "Éphésiens 2:8-9 - Car c'est par la grâce que vous êtes sauvés, par le moyen de la foi. Et cela не vient pas de vous, c'est le don de Dieu." },
    ]
  }
];

export const HOUR_DATA = ADORIS_HOUR_NAMES.map((name, index) => {
    const meanings = [
        [{ name: ADORIS_HOUR_NAMES[0], meaning: "L'heure du Souffle Divin (Ruach). Le moment où le Père insuffle la vie. Idéal pour la prière matinale et la réception de la vision pour la journée.", verse: "Genèse 2:7 - L'Éternel Dieu... souffla dans ses narines un souffle de vie." }, { name: ADORIS_HOUR_NAMES[0], meaning: "Moment de l'inspiration première. Ouvrez votre esprit pour recevoir les pensées de Dieu qui donnent vie à votre journée.", verse: "Job 33:4 - L'esprit de Dieu m'a créé, Et le souffle du Tout Puissant m'anime." }],
        [{ name: ADORIS_HOUR_NAMES[1], meaning: "L'heure du Décret (Dabar). La puissance de la Parole déclarée. Parlez la vie sur votre journée, déclarez les promesses de Dieu.", verse: "Psaume 33:9 - Car il dit, et la chose arrive; Il ordonne, et elle existe." }, { name: ADORIS_HOUR_NAMES[1], meaning: "Activez votre foi en proclamant la Parole. Vos mots, alignés sur ceux de Dieu, ont le pouvoir de changer les circonstances.", verse: "Proverbes 18:21 - La mort et la vie sont au pouvoir de la langue..." }],
        [{ name: ADORIS_HOUR_NAMES[2], meaning: "L'heure de la Source (Mekor). Reconnaissez Dieu comme la source de tout bien. C'est un temps de gratitude.", verse: "Jérémie 2:13 - ...ils m'ont abandonné, moi qui suis une source d'eau vive." }, { name: ADORIS_HOUR_NAMES[2], meaning: "Puisez votre force à la source intarissable. Ne vous appuyez pas sur vos propres ressources, mais sur l'abondance divine.", verse: "Jean 4:14 - ...celui qui boira de l'eau que je lui donnerai n'aura jamais soif..." }],
        [{ name: ADORIS_HOUR_NAMES[3], meaning: "L'heure de l'Alliance (Berit). Souvenez-vous des alliances de Dieu avec Son peuple. Un temps pour la fidélité et la confiance.", verse: "Hébreux 8:10 - ...je mettrai mes lois dans leur esprit, Je les écrirai dans leur coeur..." }, { name: ADORIS_HOUR_NAMES[3], meaning: "Reposez-vous sur les promesses immuables de Dieu. Son alliance avec vous est éternelle et inébranlable.", verse: "2 Samuel 23:5 - N'en est-il pas ainsi de ma maison devant Dieu, Puisqu'il a fait avec moi une alliance éternelle..." }],
        [{ name: ADORIS_HOUR_NAMES[4], meaning: "L'heure de la Sagesse (Chokmah). Demandez la sagesse divine pour vos décisions. Méditez sur la Parole.", verse: "Proverbes 2:6 - Car l'Éternel donne la sagesse; De sa bouche sortent la connaissance et l'intelligence." }, { name: ADORIS_HOUR_NAMES[4], meaning: "Face à un choix, faites une pause et demandez la sagesse d'en haut. Elle est plus précieuse que l'or.", verse: "Jacques 1:5 - Si quelqu'un d'entre vous manque de sagesse, qu'il la demande à Dieu, qui donne à tous simplement et sans reproche..." }],
        [{ name: ADORIS_HOUR_NAMES[5], meaning: "L'heure de la Forme (Yatsar). Dieu façonne et forme. C'est un temps pour se soumettre à Son oeuvre de sanctification en nous.", verse: "Ésaïe 64:8 - ...nous sommes l'argile, et c'est toi qui nous as formés, Nous sommes tous l'ouvrage de tes mains." }, { name: ADORIS_HOUR_NAMES[5], meaning: "Acceptez le processus de façonnage divin, même s'il est inconfortable. Le Potier sait ce qu'il fait.", verse: "Jérémie 18:6 - Ne puis-je pas agir envers vous comme ce potier, maison d'Israël? Oracle de l'Éternel. Voici, comme l'argile est dans la main du potier, Ainsi vous êtes dans ma main..." }],
        [{ name: ADORIS_HOUR_NAMES[6], meaning: "L'heure du Repos du Père (Shabbat). Contemplez l'oeuvre achevée de la création. C'est un avant-goût du repos céleste.", verse: "Genèse 2:2 - Dieu acheva au septième jour son oeuvre, qu'il avait faite; et il se reposa..." }, { name: ADORIS_HOUR_NAMES[6], meaning: "Entrez dans le repos de Dieu. Cessez de vous agiter et confiez-lui vos fardeaux. La vraie force se trouve dans le calme.", verse: "Hébreux 4:9-10 - Il y a donc un repos de sabbat réservé au peuple de Dieu. Car celui qui entre dans le repos de Dieu se repose de ses oeuvres..." }],
        [{ name: ADORIS_HOUR_NAMES[7], meaning: "L'heure de l'Incarnation (Basar). Méditez sur le mystère de Dieu fait chair en Jésus. L'humilité et l'amour divin manifestés.", verse: "Jean 1:14 - Et la parole a été faite chair, et elle a habité parmi nous, pleine de grâce et de vérité." }, { name: ADORIS_HOUR_NAMES[7], meaning: "Contemplez l'amour incroyable d'un Dieu qui s'est fait homme pour être proche de vous. L'éternité a touché le temps.", verse: "Philippiens 2:7 - ...mais s'est dépouillé lui-même, en prenant une forme de serviteur, en devenant semblable aux hommes." }],
        [{ name: ADORIS_HOUR_NAMES[8], meaning: "L'heure du Chemin (Derech). Jésus est le seul chemin vers le Père. Réaffirmez votre engagement à le suivre.", verse: "Jean 14:6 - Jésus lui dit: Je suis le chemin, la vérité, et la vie. Nul ne vient au Père que par moi." }, { name: ADORIS_HOUR_NAMES[8], meaning: "Assurez-vous que vous marchez sur le bon sentier. Chaque pas avec Jésus est un pas vers la maison.", verse: "Psaume 119:105 - Ta parole est une lampe à mes pieds, Et une lumière sur mon sentier." }],
        [{ name: ADORIS_HOUR_NAMES[9], meaning: "L'heure de la Parole (Logos). Nourrissez-vous de la Parole vivante. La Bible n'est pas juste un livre, c'est une personne.", verse: "Hébreux 4:12 - Car la parole de Dieu est vivante et efficace..." }, { name: ADORIS_HOUR_NAMES[9], meaning: "Prenez le temps de lire et de méditer les Écritures. Laissez la Parole transformer votre pensée et votre coeur.", verse: "2 Timothée 3:16 - Toute Écriture est inspirée de Dieu, et utile pour enseigner, pour convaincre, pour corriger, pour instruire dans la justice..." }],
        [{ name: ADORIS_HOUR_NAMES[10], meaning: "L'heure de la Croix (Stauros). Le moment central de l'histoire. Méditez sur le sacrifice de Christ, le pardon des péchés.", verse: "1 Corinthiens 1:18 - Car la prédication de la croix est une folie pour ceux qui périssent; mais pour nous qui sommes sauvés, elle est une puissance de Dieu." }, { name: ADORIS_HOUR_NAMES[10], meaning: "Revenez au pied de la croix. C'est là que la dette a été payée, que la grâce a triomphé et que l'amour a tout conquis.", verse: "Galates 2:20 - J'ai été crucifié avec Christ; et si je vis, ce n'est plus moi qui vis, c'est Christ qui vit en moi..." }],
        [{ name: ADORIS_HOUR_NAMES[11], meaning: "L'heure de la Résurrection (Anastasis). Célébrez la victoire sur la mort. C'est l'heure de l'espérance et de la vie nouvelle.", verse: "Romains 6:4 - ...de même que Christ est ressuscité des morts par la gloire du Père, de même nous aussi nous marchions en nouveauté de vie." }, { name: ADORIS_HOUR_NAMES[11], meaning: "Vivez comme une personne ressuscitée. La puissance qui a ramené Christ d'entre les morts agit en vous aujourd'hui.", verse: "Éphésiens 1:19-20 - ...et quelle est envers nous qui croyons l'infinie grandeur de sa puissance, se manifestant avec efficacité par la vertu de sa force. Il l'a déployée en Christ..." }],
        [{ name: ADORIS_HOUR_NAMES[12], meaning: "L'heure de l'Ascension (Analepsis). Jésus règne à la droite du Père. Il intercède pour nous. C'est l'heure de l'autorité.", verse: "Actes 1:9 - Après avoir dit cela, il fut élevé pendant qu'ils le regardaient, et une nuée le déroba à leurs yeux." }, { name: ADORIS_HOUR_NAMES[12], meaning: "Rappelez-vous que votre avocat est auprès du Père. Priez avec l'assurance que vous êtes entendu grâce à son intercession.", verse: "Hébreux 7:25 - C'est aussi pour cela qu'il peut sauver parfaitement ceux qui s'approchent de Dieu par lui, étant toujours vivant pour intercéder en leur faveur." }],
        [{ name: ADORIS_HOUR_NAMES[13], meaning: "L'heure du Trône du Fils (Kisse). Reconnaissez la souveraineté de Jésus sur toute la création. C'est un temps d'adoration.", verse: "Apocalypse 5:13 - ...À celui qui est assis sur le trône, et à l'agneau, soient la louange, l'honneur, la gloire, et la force..." }, { name: ADORIS_HOUR_NAMES[13], meaning: "Courbez-vous devant le Roi des rois. Soumettez tous les domaines de votre vie à son autorité aimante.", verse: "Philippiens 2:10-11 - ...afin qu'au nom de Jésus tout genou fléchisse dans les cieux, sur la terre et sous la terre, et que toute langue confesse que Jésus Christ est Seigneur..." }],
        [{ name: ADORIS_HOUR_NAMES[14], meaning: "L'heure du Souffle intérieur (Pneuma). Le Saint-Esprit habite en nous. C'est un temps d'intimité et d'écoute de sa voix.", verse: "1 Corinthiens 6:19 - Ne savez-vous pas que votre corps est le temple du Saint Esprit qui est en vous...?" }, { name: ADORIS_HOUR_NAMES[14], meaning: "Soyez attentif aux murmures de l'Esprit. Il vous guide, vous console et vous révèle le coeur du Père.", verse: "Romains 8:14 - Car tous ceux qui sont conduits par l'Esprit de Dieu sont fils de Dieu." }],
        [{ name: ADORIS_HOUR_NAMES[15], meaning: "L'heure du Conseil (Parakletos). Le Saint-Esprit est notre Consolateur et Conseiller. Cherchez sa direction et son réconfort.", verse: "Jean 14:26 - Mais le consolateur, l'Esprit Saint, que le Père enverra en mon nom, vous enseignera toutes choses..." }, { name: ADORIS_HOUR_NAMES[15], meaning: "Avant de prendre une décision, consultez votre Conseiller divin. Il vous éclairera et vous donnera la paix.", verse: "Ésaïe 30:21 - Tes oreilles entendront derrière toi la voix qui dira: Voici le chemin, marchez-y!" }],
        [{ name: ADORIS_HOUR_NAMES[16], meaning: "L'heure du Feu (Pur). Le feu du Saint-Esprit purifie et passionne. C'est un temps pour le zèle et la consécration.", verse: "Matthieu 3:11 - ...lui, il vous baptisera du Saint Esprit et de feu." }, { name: ADORIS_HOUR_NAMES[16], meaning: "Demandez au Saint-Esprit de consumer tout ce qui est impur en vous et de raviver la flamme de votre premier amour.", verse: "Hébreux 12:29 - ...car notre Dieu est aussi un feu dévorant." }],
        [{ name: ADORIS_HOUR_NAMES[17], meaning: "L'heure du Mystère (Mysterion). L'Esprit nous révèle les profondeurs de Dieu. Un temps pour la contemplation et l'émerveillement.", verse: "1 Corinthiens 2:10 - Dieu nous les a révélées par l'Esprit. Car l'Esprit sonde tout, même les profondeurs de Dieu." }, { name: ADORIS_HOUR_NAMES[17], meaning: "Adorez Dieu pour les choses que vous ne comprenez pas encore. Il y a une beauté dans le mystère de sa grandeur.", verse: "Romains 11:33 - O profondeur de la richesse, de la sagesse et de la science de Dieu! Que ses jugements sont insondables, et ses voies incompréhensibles!" }],
        [{ name: ADORIS_HOUR_NAMES[18], meaning: "L'heure de l'Unité (Henotes). L'Esprit unit le corps de Christ. Priez pour l'unité des croyants.", verse: "Éphésiens 4:3 - ...efforcez-vous de conserver l'unité de l'esprit par le lien de la paix." }, { name: ADORIS_HOUR_NAMES[18], meaning: "Posez un acte de réconciliation ou d'encouragement envers un autre croyant. L'unité glorifie Dieu.", verse: "Psaume 133:1 - Voici, oh! qu'il est agréable, qu'il est doux Pour des frères de demeurer ensemble!" }],
        [{ name: ADORIS_HOUR_NAMES[19], meaning: "L'heure de la Gloire (Doxa). L'Esprit manifeste la gloire de Dieu. Un temps pour l'adoration et l'anticipation de la gloire à venir.", verse: "2 Corinthiens 3:18 - Nous tous qui... contemplons comme dans un miroir la gloire du Seigneur, nous sommes transformés en la même image..." }, { name: ADORIS_HOUR_NAMES[19], meaning: "Reflétez la gloire de Dieu dans vos paroles et vos actions. Que votre vie soit un témoignage de sa magnificence.", verse: "1 Corinthiens 10:31 - Soit donc que vous mangiez, soit que vous buviez, soit que vous fassiez quelque autre chose, faites tout pour la gloire de Dieu." }],
        [{ name: ADORIS_HOUR_NAMES[20], meaning: "L'heure du Silence sacré (Sigao). Faites silence et écoutez. C'est dans le calme que Dieu parle souvent.", verse: "Psaume 46:10 - Arrêtez, et sachez que je suis Dieu..." }, { name: ADORIS_HOUR_NAMES[20], meaning: "Éteignez les distractions du monde et offrez à Dieu le cadeau de votre attention silencieuse. L'écoute est une forme d'adoration.", verse: "1 Rois 19:12 - ...et après le feu, un murmure doux et léger." }],
    ];
    return { name, options: meanings[index] };
});

/**
 * Sélectionne une signification spirituelle de manière déterministe pour une année donnée.
 * @param data - Le tableau de données (par ex. MONTH_DATA)
 * @param year - L'année utilisée comme graine pour la randomisation
 * @param index - L'index de l'élément (par ex. mois, jour de la semaine)
 * @returns Un objet contenant le nom, la signification et le verset pour l'année donnée.
 */
export const getMeaningForYear = <T extends { name: string; attribute?: string; options: { meaning: string; verse: string }[] }>(
  data: T[],
  year: number,
  index: number
): { name: string; attribute?: string; meaning: string; verse: string } => {
  const item = data[index];
  if (!item || !item.options || item.options.length === 0) {
    return { name: 'Inconnu', meaning: 'Signification non disponible.', verse: 'Verset non disponible.' };
  }
  
  const randomIndex = (year + index) % item.options.length;
  const selectedOption = item.options[randomIndex];
  
  return {
    name: item.name,
    attribute: item.attribute,
    ...selectedOption,
  };
};
