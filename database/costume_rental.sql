-- =====================================================
-- Base de données: costume_rental
-- Application de Location de Costumes
-- =====================================================

-- Créer la base de données
CREATE DATABASE IF NOT EXISTS costume_rental CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE costume_rental;

-- Table des costumes
CREATE TABLE IF NOT EXISTS costumes (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    price_per_day DECIMAL(10, 2) NOT NULL,
    image VARCHAR(255) NOT NULL,
    category VARCHAR(255) NOT NULL,
    size VARCHAR(50) NOT NULL,
    available TINYINT(1) DEFAULT 1,
    created_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Table des clients
CREATE TABLE IF NOT EXISTS clients (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    phone VARCHAR(50) NOT NULL,
    address TEXT NULL,
    created_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Table des réservations
CREATE TABLE IF NOT EXISTS reservations (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    client_id BIGINT UNSIGNED NOT NULL,
    costume_id BIGINT UNSIGNED NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    total_price DECIMAL(10, 2) NOT NULL,
    status ENUM('pending', 'confirmed', 'completed', 'cancelled') DEFAULT 'pending',
    created_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (client_id) REFERENCES clients(id) ON DELETE CASCADE,
    FOREIGN KEY (costume_id) REFERENCES costumes(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insertion des costumes
INSERT INTO costumes (name, description, price_per_day, image, category, size, available) VALUES
('Batman', 'Costume complet de Batman avec cape et masque. Idéal pour les fêtes et Halloween.', 25.00, 'bat.jpg', 'Super-héros', 'M', 1),
('Chevalier Médiéval', 'Armure de chevalier avec épée et bouclier. Parfait pour les événements médiévaux.', 35.00, 'chevalier.jpg', 'Médiéval', 'L', 1),
('Chef Cuisinier', 'Tenue complète de chef avec toque et tablier blanc.', 15.00, 'cuisine.jpg', 'Métiers', 'M', 1),
('Comte Dracula', 'Costume de vampire élégant avec cape noire et rouge.', 30.00, 'drac.jpg', 'Halloween', 'L', 1),
('Princesse Elsa', 'Robe bleue scintillante de la Reine des Neiges.', 28.00, 'elsa.jpg', 'Princesses', 'S', 1),
('Fée Magique', 'Costume de fée avec ailes et baguette magique.', 22.00, 'fee.jpg', 'Fantaisie', 'S', 1),
('Gentleman Victorien', 'Costume élégant style victorien avec chapeau haut-de-forme.', 32.00, 'gentel.jpg', 'Classique', 'M', 1),
('Jack Sparrow', 'Costume de pirate complet inspiré de Pirates des Caraïbes.', 35.00, 'jack.jpg', 'Pirates', 'M', 1),
('Super Mario', 'Costume du célèbre plombier avec casquette et moustache.', 20.00, 'mario.jpg', 'Jeux Vidéo', 'M', 1),
('Médecin', 'Blouse blanche de médecin avec stéthoscope.', 18.00, 'med.jpg', 'Métiers', 'L', 1),
('Petit Prince', 'Costume royal pour enfant avec couronne dorée.', 25.00, 'petit.jpg', 'Royauté', 'XS', 1),
('Pilote Aviateur', 'Combinaison de pilote avec lunettes et badges.', 28.00, 'pilote.jpg', 'Métiers', 'M', 1),
('Harry Potter', 'Robe de sorcier Gryffondor avec baguette et lunettes.', 30.00, 'poter.jpg', 'Fantaisie', 'M', 1),
('Reine Médiévale', 'Robe royale avec couronne et bijoux.', 40.00, 'queen.jpg', 'Royauté', 'M', 1),
('Spider-Man', 'Combinaison complète de l\'homme-araignée.', 25.00, 'spid.jpg', 'Super-héros', 'M', 1),
('Wonder Woman', 'Costume de super-héroïne avec bouclier et tiare.', 28.00, 'wom.jpg', 'Super-héros', 'S', 1),
('Zombie', 'Costume effrayant de zombie avec maquillage inclus.', 22.00, 'zom.jpg', 'Halloween', 'L', 1);

-- Afficher les données insérées
SELECT * FROM costumes;




