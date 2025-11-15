import type { DayIdentifier } from './types';
import { WEEKDAY_DATA } from './spiritualMeanings';

export interface PrayerSuggestion {
  text: string;
  verse: string;
}

const allPrayerSuggestions: Record<string, PrayerSuggestion[]> = {
  'Création': [
    { text: "Seigneur, inspire-moi de ta créativité divine pour mes projets et mon travail.", verse: "Exode 31:3" },
    { text: "Père, fais une chose nouvelle dans ma vie et ouvre un chemin là où il n'y en a pas.", verse: "Ésaïe 43:19" },
    { text: "Je déclare que je suis ton ouvrage. Affermis l'œuvre de mes mains aujourd'hui.", verse: "Éphésiens 2:10" },
    { text: "Que l'Esprit de Dieu qui planait sur les eaux au commencement plane sur ma situation.", verse: "Genèse 1:2" },
    { text: "Donne-moi des idées divines et la sagesse pour les manifester pour ta gloire.", verse: "Proverbes 8:12" },
    { text: "Dieu Créateur, insuffle une vie nouvelle dans les domaines stagnants de mon existence.", verse: "Ézéchiel 37:5" },
    { text: "Je te consacre mon imagination, utilise-la pour bâtir ton Royaume.", verse: "1 Chroniques 28:19" },
    { text: "Père, que ma vie devienne une toile sur laquelle tu peins ta gloire et ta beauté.", verse: "Psaume 19:1" },
    { text: "Aide-moi à être un bon intendant de la création que tu m'as confiée, à commencer par mon propre corps.", verse: "1 Corinthiens 6:19-20" },
    { text: "Seigneur, ordonne à la lumière de briller dans mes ténèbres et de clarifier ma vision.", verse: "2 Corinthiens 4:6" },
  ],
  'Justice': [
    { text: "Éternel, notre Justice, revêts-moi de ta droiture et que mes actions te glorifient.", verse: "2 Corinthiens 5:21" },
    { text: "Seigneur, que la justice coule comme un fleuve dans ma vie et dans ma nation.", verse: "Amos 5:24" },
    { text: "Aide-moi à haïr le mal, à aimer le bien et à pratiquer l'équité en toutes choses.", verse: "Michée 6:8" },
    { text: "Père, interviens dans les situations d'injustice autour de moi. Sois la voix de ceux qui n'en ont pas.", verse: "Proverbes 31:8-9" },
    { text: "Sanctifie mon cœur pour que je recherche ta justice avant toute chose.", verse: "Matthieu 6:33" },
    { text: "Ô Juge de l'univers, défends ma cause contre les accusations injustes et les mensonges de l'ennemi.", verse: "Psaume 43:1" },
    { text: "Donne-moi un cœur qui pleure sur l'injustice et des mains qui agissent pour la droiture.", verse: "Ésaïe 1:17" },
    { text: "Que la balance de la justice divine penche en faveur de ma famille et de ma destinée.", verse: "Proverbes 11:1" },
    { text: "Seigneur, pardonne-moi pour les fois où j'ai été partial ou injuste. Purifie mon jugement.", verse: "Jacques 2:9" },
    { text: "Je me tiens dans la brèche pour mon pays, demandant pardon pour l'injustice systémique.", verse: "Ézéchiel 22:30" },
  ],
  'Provision': [
    { text: "Yahvé Yireh, je te fais confiance pour pourvoir à tous mes besoins financiers et matériels.", verse: "Philippiens 4:19" },
    { text: "Ouvre les écluses des cieux sur ma vie, ma famille et mon travail.", verse: "Malachie 3:10" },
    { text: "Seigneur, apprends-moi à être un bon intendant de tes bénédictions et à donner avec joie.", verse: "2 Corinthiens 9:7" },
    { text: "Je déclare que je ne manquerai de rien car l'Éternel est mon berger.", verse: "Psaume 23:1" },
    { text: "Père, donne-moi aujourd'hui mon pain quotidien et libère-moi de l'esprit d'inquiétude.", verse: "Matthieu 6:11, 34" },
    { text: "Je te demande la sagesse pour gérer mes finances et la prospérité pour être une bénédiction.", verse: "Deutéronome 8:18" },
    { text: "Multiplie le peu que j'ai, comme tu as multiplié les pains et les poissons, pour ta gloire.", verse: "Matthieu 14:19-20" },
    { text: "Seigneur, enseigne-moi le secret d'être content en toute situation, dans l'abondance comme dans le besoin.", verse: "Philippiens 4:12" },
    { text: "Que ma maison soit un lieu de provision et d'abondance, un refuge pour les nécessiteux.", verse: "Proverbes 3:9-10" },
    { text: "Je brise tout esprit de pauvreté et de manque au nom de Jésus, et je reçois ta pleine provision.", verse: "2 Corinthiens 8:9" },
  ],
  'Guérison': [
    { text: "Yahvé Rapha, par tes meurtrissures, je déclare la guérison sur mon corps, mon âme et mon esprit.", verse: "Ésaïe 53:5" },
    { text: "Seigneur, guéris ceux qui ont le cœur brisé et panse les blessures de mon passé.", verse: "Psaume 147:3" },
    { text: "Je prie pour une guérison divine pour un être cher et je crois en ta puissance de restauration.", verse: "Jacques 5:15" },
    { text: "Que ta parole de guérison, envoyée du ciel, apporte la vie là où il y a la maladie.", verse: "Psaume 107:20" },
    { text: "Père, que ta santé divine se manifeste dans chaque cellule de mon corps.", verse: "3 Jean 1:2" },
    { text: "Je pardonne à ceux qui m'ont blessé, libérant ainsi le chemin pour ma propre guérison émotionnelle.", verse: "Matthieu 6:14" },
    { text: "Restaure les années que les sauterelles ont dévorées dans ma vie et ma santé.", verse: "Joël 2:25" },
    { text: "Seigneur, que ta joie soit ma force et mon remède en ce jour.", verse: "Néhémie 8:10" },
    { text: "Je brise toute parole de maladie prononcée sur ma vie et je déclare que je vivrai et ne mourrai pas.", verse: "Psaume 118:17" },
    { text: "Fais de moi un canal de ta guérison pour les autres, que mes mains apportent le réconfort.", verse: "Marc 16:18" },
  ],
  'Paix': [
    { text: "Yahvé Shalom, que ta paix qui surpasse toute intelligence garde mon cœur et mes pensées.", verse: "Philippiens 4:7" },
    { text: "Seigneur Jésus, Prince de la Paix, règne dans mon foyer et dans mes relations.", verse: "Ésaïe 9:6" },
    { text: "Aide-moi à être un artisan de paix, à pardonner comme tu m'as pardonné.", verse: "Matthieu 5:9" },
    { text: "Je te remets mes fardeaux et je choisis de demeurer dans ton repos parfait.", verse: "Matthieu 11:28" },
    { text: "Que la paix du Christ règne dans mon cœur et chasse toute anxiété et toute peur.", verse: "Colossiens 3:15" },
    { text: "Je commande à la tempête dans mon âme de se calmer au nom de Jésus.", verse: "Marc 4:39" },
    { text: "Père, fais de moi un instrument de ta paix là où il y a la discorde.", verse: "Prière de St François" },
    { text: "Je brise les murs de division dans ma famille et je prie pour la réconciliation et l'harmonie.", verse: "Éphésiens 2:14" },
    { text: "Que mon sommeil soit doux et paisible, car tu me gardes en sécurité.", verse: "Psaume 4:8" },
    { text: "Je déclare la paix sur ma ville et ma nation, et je prie pour ses dirigeants.", verse: "Jérémie 29:7" },
  ],
  'Vision': [
    { text: "El-Roi, Dieu qui me vois, ouvre les yeux de mon cœur pour que je voie tes plans pour ma vie.", verse: "Éphésiens 1:18" },
    { text: "Seigneur, donne-moi une vision claire pour mon avenir, ma famille et mon ministère.", verse: "Proverbes 29:18" },
    { text: "Révèle-moi les choses cachées et les trésors que tu as en réserve pour moi.", verse: "Jérémie 33:3" },
    { text: "Que ta parole soit une lampe à mes pieds et une lumière sur mon sentier pour me guider.", verse: "Psaume 119:105" },
    { text: "Saint-Esprit, guide-moi dans toute la vérité et parle à mon cœur.", verse: "Jean 16:13" },
    { text: "Je rejette toute confusion et je reçois un esprit de clarté et de sagesse divine.", verse: "2 Timothée 1:7" },
    { text: "Donne-moi de voir les gens comme tu les vois, avec compassion et amour.", verse: "Matthieu 9:36" },
    { text: "Écris ta vision sur les tables de mon cœur, afin que je puisse courir avec elle.", verse: "Habacuc 2:2" },
    { text: "Je prie pour le don de discernement des esprits pour ne pas être trompé.", verse: "1 Corinthiens 12:10" },
    { text: "Seigneur, montre-moi la prochaine étape que je dois franchir. Je ne veux avancer qu'avec toi.", verse: "Psaume 25:4" },
  ],
  'Salut': [
    { text: "Yeshua, merci pour le don inestimable de mon salut. Que ma vie soit un témoignage de ta grâce.", verse: "Éphésiens 2:8" },
    { text: "Je prie pour le salut de ma famille et de mes amis, qu'ils te rencontrent comme leur Sauveur.", verse: "Actes 16:31" },
    { text: "Seigneur, que la joie de mon salut soit ma force aujourd'hui.", verse: "Néhémie 8:10" },
    { text: "Je me revêts du casque du salut pour protéger mes pensées contre les mensonges de l'ennemi.", verse: "Éphésiens 6:17" },
    { text: "Père, aide-moi à marcher d'une manière digne de l'appel que j'ai reçu en Christ.", verse: "Éphésiens 4:1" },
    { text: "Aujourd'hui, je choisis de me réjouir dans le Rocher de mon salut, quelles que soient les circonstances.", verse: "Psaume 95:1" },
    { text: "Que ma bouche proclame avec audace la bonne nouvelle du salut à ceux qui m'entourent.", verse: "Romains 1:16" },
    { text: "Seigneur, rappelle-moi constamment l'œuvre accomplie à la croix et la liberté que j'ai en toi.", verse: "Galates 5:1" },
    { text: "Je prie pour que l'Église se réveille et accomplisse la Grande Commission avec passion.", verse: "Matthieu 28:19-20" },
    { text: "Merci, Père, de m'avoir choisi avant la fondation du monde pour être saint et irrépréhensible devant toi.", verse: "Éphésiens 1:4" },
  ],
};

/**
 * Sélectionne 5 suggestions de prières uniques de manière déterministe pour une date donnée.
 * @param dayId - L'identifiant complet du jour (jour, mois, année, index du jour de la semaine)
 * @returns Un tableau de 5 suggestions de prières.
 */
export const getPrayerSuggestionsForDay = (dayId: DayIdentifier): PrayerSuggestion[] => {
    // Détermine l'attribut spirituel pour le jour donné
    const weekdayInfo = WEEKDAY_DATA.find(wd => wd.attribute === WEEKDAY_DATA[dayId.weekdayIndex].attribute);
    if (!weekdayInfo) return [];

    const attribute = weekdayInfo.attribute;
    const suggestionPool = allPrayerSuggestions[attribute] || [];
    if (suggestionPool.length === 0) return [];

    const suggestions: PrayerSuggestion[] = [];
    const usedIndexes = new Set<number>();
    
    // Crée une "graine" unique et déterministe à partir des composants de la date
    const seed = dayId.year * 365 + dayId.monthIndex * 31 + dayId.dayOfMonth;

    // Sélectionne 5 suggestions uniques du groupe
    for (let i = 0; i < 5; i++) {
        // Arrête si nous avons épuisé tout le groupe de suggestions
        if (suggestions.length >= suggestionPool.length) break;

        // Crée un index varié pour chacune des 5 suggestions
        let index = (seed + i * 7) % suggestionPool.length;

        // Gère les collisions pour garantir l'unicité
        while (usedIndexes.has(index)) {
            index = (index + 1) % suggestionPool.length;
        }

        suggestions.push(suggestionPool[index]);
        usedIndexes.add(index);
    }

    return suggestions;
};
