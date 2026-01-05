# 🚀 Guide d'Installation Complet

## Prérequis

- PHP 8.1+
- Composer
- Node.js 18+
- MySQL (XAMPP/WAMP)
- Expo Go sur votre téléphone

---

## Étape 1: Configuration de la Base de Données (PHPMyAdmin)

1. **Démarrez XAMPP/WAMP** et lancez MySQL et Apache

2. **Ouvrez PHPMyAdmin**: http://localhost/phpmyadmin

3. **Importez la base de données**:
   - Cliquez sur "Importer"
   - Sélectionnez le fichier `database/costume_rental.sql`
   - Cliquez sur "Exécuter"

**OU créez manuellement:**
   - Créez une base `costume_rental`
   - Exécutez le SQL du fichier

---

## Étape 2: Backend Laravel

### Option A: Utiliser un projet Laravel existant

```bash
# Naviguez vers le dossier backend
cd prjtmbl/backend

# Copiez les fichiers créés dans votre projet Laravel existant:
# - app/Models/*.php
# - app/Http/Controllers/Api/*.php
# - database/migrations/*.php
# - database/seeders/*.php
# - routes/api.php
# - config/cors.php
```

### Option B: Créer un nouveau projet Laravel

```bash
# Créez un nouveau projet Laravel
composer create-project laravel/laravel backend

cd backend

# Copiez les fichiers depuis prjtmbl/backend/
# vers ce nouveau dossier
```

### Configuration commune

```bash
# 1. Configurer .env
# Copiez .env.example vers .env et modifiez:
DB_DATABASE=costume_rental
DB_USERNAME=root
DB_PASSWORD=

# 2. Générer la clé
php artisan key:generate

# 3. Migrations (si vous n'avez pas utilisé le SQL)
php artisan migrate

# 4. Seeder (si vous n'avez pas utilisé le SQL)
php artisan db:seed

# 5. Copier les images
# Copiez les images depuis:
# C:\Users\Windows\Desktop\projetDevMobile\backend\public\images
# vers: backend/public/images/

# 6. Démarrer le serveur (IMPORTANT: avec l'IP)
php artisan serve --host=0.0.0.0 --port=8000
```

---

## Étape 3: Frontend React Native (Expo)

```bash
# Naviguez vers le dossier mobile
cd prjtmbl/mobile

# Installez les dépendances
npm install

# Trouvez votre IP locale
ipconfig    # Windows
# Cherchez "IPv4 Address" (ex: 192.168.1.100)

# Modifiez src/services/api.js
# Remplacez l'IP par la vôtre:
const API_URL = 'http://VOTRE_IP:8000/api';
```

---

## Étape 4: Lancement

### Terminal 1 - Backend
```bash
cd backend
php artisan serve --host=0.0.0.0 --port=8000
```

### Terminal 2 - Frontend
```bash
cd mobile
npx expo start
```

### Sur votre téléphone
1. Installez **Expo Go** depuis Play Store/App Store
2. Scannez le QR code affiché dans le terminal
3. L'application se lance!

---

## ⚠️ Problèmes Courants

### "Network Error" sur l'app mobile
- Vérifiez que votre téléphone est sur le même WiFi que votre PC
- Vérifiez l'IP dans `api.js`
- Vérifiez que le serveur Laravel est lancé avec `--host=0.0.0.0`

### Images non affichées
- Vérifiez que les images sont dans `backend/public/images/`
- L'URL doit être `http://VOTRE_IP:8000/images/nom_image.jpg`

### Erreur de base de données
- Vérifiez que MySQL est démarré
- Vérifiez les identifiants dans `.env`

---

## 📱 Test de l'API

Testez dans votre navigateur:
```
http://localhost:8000/api/costumes
```

Vous devriez voir la liste des costumes en JSON.

---

## 🎉 C'est prêt!

Votre application de location de costumes est maintenant fonctionnelle!




