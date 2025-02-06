# Weather Station - Frontend

## Description
Application web pour visualiser et analyser les données météorologiques collectées par un capteur BME680 installé sur un ESP32.

## Prérequis

* Node.js (version 18+)
* npm (version 9+)

## Installation

## Clonage du projet
```
bash
git clone https://github.com/votre-username/weather-station.git
cd weather-station
```


## Installation des dépendances
```
bash
npm install
```

## Dépendances Principales

## Développement

* React 18
* TypeScript
* Vite

## Gestion d'État

* Redux Toolkit (@reduxjs/toolkit)
* React Redux (react-redux)

## Routing

* React Router Dom (react-router-dom)

## Requêtes API

* Axios (axios)

## Visualisation de Données

* Recharts (recharts)

## Styles

* Tailwind CSS (tailwindcss)
* PostCSS (postcss)
* Autoprefixer (autoprefixer)

## Utilitaires

* Date-fns (date-fns)
* Lucide React (lucide-react)
* React Hot Toast (react-hot-toast)

## Scripts Disponibles

* npm run dev : Démarre le serveur de développement
* npm run build : Construit l'application pour la production
* npm run preview : Prévisualise l'application construite
* npm run test : Lance les tests

## Structure du Projet

```
Copyweather-station/
│
├── public/                 # Ressources statiques
├── src/
│   ├── components/         # Composants React réutilisables
│   │   ├── common/         # Composants génériques
│   │   ├── layout/         # Composants de mise en page
│   │   └── charts/         # Composants de graphiques
│   │
│   ├── pages/              # Composants de pages
│   ├── services/           # Services API et logique métier
│   ├── store/              # Configuration Redux
│   │   ├── slices/         # Slices Redux
│   │   └── hooks.ts        # Hooks Redux personnalisés
│   │
│   ├── types/              # Définitions de types TypeScript
│   ├── utils/              # Utilitaires et helpers
│   ├── App.tsx             # Composant racine de l'application
│   └── main.tsx            # Point d'entrée
│
├── tailwind.config.js      # Configuration Tailwind
└── vite.config.ts          # Configuration Vite
```

## Configuration Environnement

Créez un fichier .env à la racine du projet avec les variables suivantes :

```
VITE_API_BASE_URL=http://[IP_ESP32]:17777
```
## Déploiement

### Build de Production

```
bash
npm run build
```

## Prévisualisation

```
bash
npm run preview
```

## Contact
* Anthony Di Persio - dipersio.a@gmail.com
* Projet Link: https://github.com/petitvulcan/weather-station