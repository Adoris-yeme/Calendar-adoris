import React from 'react';
import { BookOpenIcon } from './icons';

interface InfoModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const InfoModal: React.FC<InfoModalProps> = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 bg-black/60 z-40 flex items-center justify-center p-4"
            onClick={onClose}
            role="dialog"
            aria-modal="true"
            aria-labelledby="info-modal-title"
        >
            <div
                className="bg-white/95 dark:bg-slate-800/95 backdrop-blur-md border border-gray-200 dark:border-slate-700 rounded-lg shadow-xl w-full max-w-lg text-gray-800 dark:text-gray-200 flex flex-col"
                onClick={e => e.stopPropagation()}
            >
                <div className="p-5 border-b border-gray-200 dark:border-slate-700 text-center">
                    <BookOpenIcon className="h-8 w-8 mx-auto text-indigo-500 mb-2" />
                    <h2 id="info-modal-title" className="text-xl font-bold text-indigo-600 dark:text-indigo-400">
                        Le Temps Divin ADORIS
                    </h2>
                </div>

                <div className="p-6 max-h-[60vh] overflow-y-auto space-y-4 text-gray-600 dark:text-gray-300">
                    <p>
                        Le calendrier <strong>ADORIS</strong> n'est pas seulement un système de mesure du temps ; il est conçu comme un outil spirituel pour vous aider à vous aligner sur le rythme de Dieu. Basé sur le chiffre <strong>7</strong>, symbole biblique de la perfection et de l'accomplissement divin, chaque élément de ce calendrier a une signification profonde.
                    </p>
                    <div>
                        <h3 className="font-semibold text-lg text-gray-700 dark:text-gray-200 mb-2">Comment l'utiliser pour votre croissance spirituelle ?</h3>
                        <ul className="list-disc list-inside space-y-2">
                            <li>
                                <strong>Méditez sur le "Sens du Jour" :</strong> Chaque jour, prenez un moment pour ouvrir la fenêtre de signification. Laissez les thèmes du mois, du jour et de l'heure inspirer vos prières et vos réflexions.
                            </li>
                            <li>
                                <strong>Utilisez les requêtes de prière :</strong> Confiez vos fardeaux et vos espoirs à Dieu en les inscrivant. Cochez-les comme "exaucées" pour cultiver un cœur reconnaissant et témoigner de la fidélité de Dieu.
                            </li>
                             <li>
                                <strong>Vivez chaque heure consciemment :</strong> L'horloge de 21 heures vous rappelle que votre journée est divisée en cycles sous le regard du Père, du Fils et du Saint-Esprit. Chaque heure est une invitation à une communion spécifique.
                            </li>
                        </ul>
                    </div>
                    <p>
                        L'objectif est de transformer notre perception du temps, de ne plus le voir comme une contrainte, mais comme un chemin sacré, un pèlerinage où chaque instant est une occasion de marcher plus près de notre Créateur.
                    </p>
                </div>

                <div className="p-4 bg-gray-50/50 dark:bg-slate-900/50 border-t border-gray-200 dark:border-slate-700 flex flex-col sm:flex-row gap-3 justify-between items-center">
                    <a 
                      href="mailto:yemeadoridane@gmail.com?subject=Contact%20depuis%20le%20Calendrier%20ADORIS&body=Bonjour,"
                      className="text-indigo-600 dark:text-indigo-400 font-semibold hover:underline"
                    >
                      Nous écrire
                    </a>
                    <button onClick={onClose} className="bg-gray-200 dark:bg-slate-600 text-gray-700 dark:text-gray-200 font-bold py-2 px-4 rounded-md hover:bg-gray-300 dark:hover:bg-slate-500 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 dark:focus:ring-offset-slate-800 focus:ring-gray-400 dark:focus:ring-slate-500">
                        Fermer
                    </button>
                </div>
            </div>
        </div>
    );
};
