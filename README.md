# 👗 CostumeRent - Application de Location de Costumes

![Laravel](https://img.shields.io/badge/Laravel-12.x-FF2D20?style=for-the-badge&logo=laravel&logoColor=white)
![React Native](https://img.shields.io/badge/React_Native-0.81-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Expo](https://img.shields.io/badge/Expo-54-000020?style=for-the-badge&logo=expo&logoColor=white)
![PHP](https://img.shields.io/badge/PHP-8.2+-777BB4?style=for-the-badge&logo=php&logoColor=white)
![SQLite](https://img.shields.io/badge/SQLite-3-003B57?style=for-the-badge&logo=sqlite&logoColor=white)

Application mobile complète de gestion de location de costumes développée avec **React Native (Expo)** pour le frontend mobile et **Laravel** pour l'API backend.

---

## 📋 Table des Matières

- [Aperçu](#-aperçu)
- [Fonctionnalités](#-fonctionnalités)
- [Technologies](#-technologies)
- [Architecture](#-architecture)
- [Installation](#-installation)
- [Configuration](#-configuration)
- [API Endpoints](#-api-endpoints)
- [Structure du Projet](#-structure-du-projet)
- [Captures d'Écran](#-captures-décran)
- [Contribuer](#-contribuer)
- [Licence](#-licence)

---

## 🎯 Aperçu

**CostumeRent** est une solution complète pour la gestion de location de costumes. L'application permet aux utilisateurs de parcourir un catalogue de costumes, de les filtrer par catégorie, de consulter les détails et de procéder à des réservations.

### Cas d'utilisation

- 🎭 **Boutiques de location de costumes** - Gestion du stock et des réservations
- 🎃 **Événements spéciaux** - Halloween, Carnaval, fêtes costumées
- 🎬 **Productions théâtrales** - Location de costumes pour spectacles
- 📸 **Studios photo** - Mise à disposition de tenues pour séances photo

---

## ✨ Fonctionnalités

### Application Mobile
- 📱 Interface utilisateur moderne et intuitive (thème sombre)
- 🔍 Recherche et filtrage de costumes par nom
- 📂 Navigation par catégories (Super-héros, Princesses, Halloween, Pirates, etc.)
- 🛒 Système de panier avec gestion des quantités
- 📅 Réservation de costumes avec sélection de dates
- 👤 Authentification utilisateur (inscription/connexion)
- 📋 Historique des réservations
- 💰 Affichage des prix et calcul automatique du total

### Backend API
- 🔐 Authentification sécurisée avec Laravel Sanctum
- 📦 CRUD complet pour les costumes, clients et réservations
- 🖼️ Gestion des images de costumes
- 📊 Filtrage par disponibilité et catégorie
- ✅ Validation des données

---

## 🛠 Technologies

### Frontend Mobile
| Technologie | Version | Description |
|-------------|---------|-------------|
| React Native | 0.81.5 | Framework mobile cross-platform |
| Expo | 54.0 | Plateforme de développement React Native |
| React Navigation | 7.x | Navigation entre écrans |
| Axios | 1.6.x | Client HTTP pour les requêtes API |
| AsyncStorage | 2.2.0 | Stockage local persistant |
| Ionicons | 15.x | Bibliothèque d'icônes |

### Backend
| Technologie | Version | Description |
|-------------|---------|-------------|
| Laravel | 12.x | Framework PHP |
| PHP | 8.2+ | Langage de programmation |
| Laravel Sanctum | 4.0 | Authentification API |
| SQLite/MySQL | - | Base de données |

---

## 🏗 Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    APPLICATION MOBILE                        │
│                   (React Native + Expo)                      │
├─────────────────────────────────────────────────────────────┤
│  Screens        │  Services       │  Context                │
│  ─────────      │  ─────────      │  ─────────              │
│  HomeScreen     │  api.js         │  CartContext            │
│  CostumesScreen │  (Axios)        │  AuthContext            │
│  DetailScreen   │                 │                         │
│  CartScreen     │                 │                         │
│  ProfileScreen  │                 │                         │
└────────────────────────┬────────────────────────────────────┘
                         │ HTTP/REST
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                      API BACKEND                             │
│                       (Laravel)                              │
├─────────────────────────────────────────────────────────────┤
│  Controllers          │  Models           │  Routes         │
│  ─────────────        │  ─────────        │  ─────────      │
│  AuthController       │  User             │  /api/auth      │
│  CostumeController    │  Costume          │  /api/costumes  │
│  ClientController     │  Client           │  /api/clients   │
│  ReservationController│  Reservation      │  /api/reservat° │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                    BASE DE DONNÉES                           │
│                   (SQLite / MySQL)                           │
├─────────────────────────────────────────────────────────────┤
│  users │ costumes │ clients │ reservations                  │
└─────────────────────────────────────────────────────────────┘
```

---

## 🚀 Installation

### Prérequis

- **PHP** 8.2 ou supérieur
- **Composer** 2.x
- **Node.js** 18+ et npm
- **Expo CLI** (`npm install -g expo-cli`)
- **Expo Go** sur votre téléphone (Play Store / App Store)

### 1. Cloner le repository

```bash
git clone https://github.com/votre-username/costume-rental-app.git
cd costume-rental-app
```

### 2. Installation du Backend Laravel

```bash
# Naviguer vers le dossier backend
cd backend

# Installer les dépendances PHP
composer install

# Copier le fichier d'environnement
cp .env.example .env

# Générer la clé d'application
php artisan key:generate

# Exécuter les migrations
php artisan migrate

# (Optionnel) Peupler la base avec des données de test
php artisan db:seed

# Démarrer le serveur de développement
php artisan serve --host=0.0.0.0 --port=8000
```

### 3. Installation de l'Application Mobile

```bash
# Naviguer vers le dossier mobile
cd ../mobile

# Installer les dépendances
npm install

# Démarrer Expo
npx expo start
```

### 4. Scanner le QR Code

1. Ouvrez **Expo Go** sur votre téléphone
2. Scannez le QR code affiché dans le terminal
3. L'application se lancera automatiquement

---

## ⚙️ Configuration

### Configuration du Backend

Modifiez le fichier `backend/.env` :

```env
APP_NAME="CostumeRent"
APP_URL=http://localhost:8000

DB_CONNECTION=sqlite
# Ou pour MySQL:
# DB_CONNECTION=mysql
# DB_HOST=127.0.0.1
# DB_PORT=3306
# DB_DATABASE=costume_rental
# DB_USERNAME=root
# DB_PASSWORD=
```

### Configuration de l'Application Mobile

Modifiez `mobile/src/services/api.js` pour configurer l'adresse IP de votre serveur :

```javascript
// Remplacez par l'IP de votre ordinateur
const API_URL = 'http://VOTRE_IP_LOCALE:8000/api';
```

**Pour trouver votre IP locale :**
- **Windows** : `ipconfig` (cherchez "IPv4 Address")
- **Mac/Linux** : `ifconfig` ou `ip addr`

> ⚠️ **Important** : Votre téléphone et votre ordinateur doivent être sur le même réseau WiFi.

---

## 📡 API Endpoints

### Authentification

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| POST | `/api/register` | Inscription d'un nouvel utilisateur |
| POST | `/api/login` | Connexion utilisateur |
| GET | `/api/user/{id}` | Récupérer le profil utilisateur |
| PUT | `/api/user/{id}` | Mettre à jour le profil |

### Costumes

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| GET | `/api/costumes` | Liste tous les costumes |
| GET | `/api/costumes/{id}` | Détails d'un costume |
| GET | `/api/costumes/available` | Costumes disponibles |
| GET | `/api/costumes/category/{category}` | Costumes par catégorie |
| POST | `/api/costumes` | Créer un costume |
| PUT | `/api/costumes/{id}` | Modifier un costume |
| DELETE | `/api/costumes/{id}` | Supprimer un costume |

### Clients

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| GET | `/api/clients` | Liste tous les clients |
| GET | `/api/clients/{id}` | Détails d'un client |
| POST | `/api/clients` | Créer un client |
| PUT | `/api/clients/{id}` | Modifier un client |
| DELETE | `/api/clients/{id}` | Supprimer un client |

### Réservations

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| GET | `/api/reservations` | Liste toutes les réservations |
| GET | `/api/reservations/{id}` | Détails d'une réservation |
| GET | `/api/reservations/user/{userId}` | Réservations d'un utilisateur |
| POST | `/api/reservations` | Créer une réservation |
| PUT | `/api/reservations/{id}` | Modifier une réservation |
| DELETE | `/api/reservations/{id}` | Annuler une réservation |

---

## 📁 Structure du Projet

```
costume-rental-app/
│
├── backend/                    # API Laravel
│   ├── app/
│   │   ├── Http/
│   │   │   └── Controllers/
│   │   │       └── Api/
│   │   │           ├── AuthController.php
│   │   │           ├── CostumeController.php
│   │   │           ├── ClientController.php
│   │   │           └── ReservationController.php
│   │   └── Models/
│   │       ├── User.php
│   │       ├── Costume.php
│   │       ├── Client.php
│   │       └── Reservation.php
│   ├── database/
│   │   ├── migrations/
│   │   └── seeders/
│   ├── public/
│   │   └── images/             # Images des costumes
│   ├── routes/
│   │   └── api.php             # Routes API
│   └── .env
│
├── mobile/                     # Application React Native
│   ├── src/
│   │   ├── context/
│   │   │   ├── AuthContext.js
│   │   │   └── CartContext.js
│   │   ├── screens/
│   │   │   ├── HomeScreen.js
│   │   │   ├── CostumesScreen.js
│   │   │   ├── CostumeDetailScreen.js
│   │   │   ├── CartScreen.js
│   │   │   ├── CategoriesScreen.js
│   │   │   ├── ProfileScreen.js
│   │   │   └── ...
│   │   └── services/
│   │       └── api.js          # Configuration Axios
│   ├── App.js                  # Point d'entrée
│   └── package.json
│
├── database/
│   └── costume_rental.sql      # Script SQL d'initialisation
│
├── INSTALLATION.md             # Guide d'installation détaillé
└── README.md                   # Ce fichier
```

---

## 📸 Captures d'Écran

<div align="center">

### 🔐 Authentification
<img src="screenshots/login.png" width="250" alt="Écran de connexion">

*Écran de connexion avec email et mot de passe*

---

### 🏠 Écran d'Accueil
<img src="screenshots/home.png" width="250" alt="Écran d'accueil">

*L'écran principal affiche un message de bienvenue, les catégories de costumes et les costumes populaires*

---

### 📂 Catégories
<img src="screenshots/categories.png" width="250" alt="Écran des catégories">

*Navigation par catégories : Super-héros, Médiéval, Métiers, Halloween, Princesses, etc.*

---

### 👗 Catalogue de Costumes
<img src="screenshots/costumes.png" width="250" alt="Liste des costumes">

*Parcourez tous les costumes disponibles avec recherche et filtrage*

---

### 📝 Réservation
<img src="screenshots/reservation-form.png" width="250" alt="Formulaire de réservation">

*Formulaire de réservation avec informations client et sélection de dates*

---

### ✅ Confirmation
<img src="screenshots/reservation-confirmed.png" width="250" alt="Confirmation de réservation">

*Confirmation de réservation avec calcul automatique du prix total*

---

### 📋 Mes Réservations
<img src="screenshots/reservations.png" width="250" alt="Liste des réservations">

*Historique et suivi de toutes vos réservations*

---

### 🛒 Panier
<img src="screenshots/cart.png" width="250" alt="Panier">

*Gérez votre panier avec récapitulatif des frais*

---

### 👤 Profil
<img src="screenshots/profile.png" width="250" alt="Profil utilisateur">

*Accédez à votre profil, paramètres et historique*

</div>

---

## 🤝 Contribuer

Les contributions sont les bienvenues ! Pour contribuer :

1. **Fork** le projet
2. Créez votre branche de fonctionnalité (`git checkout -b feature/AmazingFeature`)
3. Committez vos changements (`git commit -m 'Add some AmazingFeature'`)
4. Poussez vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrez une **Pull Request**

### Standards de Code

- **PHP** : Suivez les standards PSR-12
- **JavaScript** : Utilisez ESLint avec la configuration Expo
- **Commits** : Utilisez des messages de commit descriptifs

---

## 📝 Licence

Ce projet est sous licence MIT. Voir le fichier [LICENSE](LICENSE) pour plus de détails.

---

## 👨‍💻 Auteur

Développé par Ayoub Laafar et Kaoutar Menacera pour un projet de développement mobile.

---

## 🙏 Remerciements

- [Laravel](https://laravel.com/) - Framework PHP élégant
- [React Native](https://reactnative.dev/) - Framework mobile
- [Expo](https://expo.dev/) - Plateforme de développement
- [Ionicons](https://ionic.io/ionicons) - Icônes
