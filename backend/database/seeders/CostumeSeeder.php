<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Costume;

class CostumeSeeder extends Seeder
{
    public function run(): void
    {
        $costumes = [
            [
                'name' => 'Batman',
                'description' => 'Costume complet de Batman avec cape noire, masque et ceinture utilitaire. Idéal pour les fêtes, Halloween et événements costumés.',
                'price_per_day' => 25.00,
                'image' => 'bat.jpg',
                'category' => 'Super-héros',
                'size' => 'M',
                'available' => true
            ],
            [
                'name' => 'Chevalier Médiéval',
                'description' => 'Armure de chevalier complète avec épée et bouclier. Parfait pour les événements médiévaux et reconstitutions historiques.',
                'price_per_day' => 35.00,
                'image' => 'chev.jpg',
                'category' => 'Médiéval',
                'size' => 'L',
                'available' => true
            ],
            [
                'name' => 'Chevalier Royal',
                'description' => 'Costume de chevalier royal avec cape et couronne. Idéal pour les mariages médiévaux.',
                'price_per_day' => 38.00,
                'image' => 'chevalier.jpg',
                'category' => 'Médiéval',
                'size' => 'L',
                'available' => true
            ],
            [
                'name' => 'Chevalier Noir',
                'description' => 'Armure noire de chevalier avec épée longue. Style sombre et élégant.',
                'price_per_day' => 40.00,
                'image' => 'chevalierr.jpg',
                'category' => 'Médiéval',
                'size' => 'L',
                'available' => true
            ],
            [
                'name' => 'Chef Cuisinier',
                'description' => 'Tenue complète de chef avec toque blanche, tablier et ustensiles. Parfait pour les soirées à thème.',
                'price_per_day' => 15.00,
                'image' => 'cuisine.jpg',
                'category' => 'Métiers',
                'size' => 'M',
                'available' => true
            ],
            [
                'name' => 'Costume Deluxe',
                'description' => 'Costume élégant deluxe avec accessoires premium. Pour les occasions spéciales.',
                'price_per_day' => 45.00,
                'image' => 'delu.jpg',
                'category' => 'Classique',
                'size' => 'M',
                'available' => true
            ],
            [
                'name' => 'Comte Dracula',
                'description' => 'Costume de vampire élégant avec cape noire et rouge, dents de vampire incluses. Parfait pour Halloween.',
                'price_per_day' => 30.00,
                'image' => 'drac.jpg',
                'category' => 'Halloween',
                'size' => 'L',
                'available' => true
            ],
            [
                'name' => 'Princesse Elsa',
                'description' => 'Robe bleue scintillante de la Reine des Neiges avec cape et accessoires. Pour les petites princesses.',
                'price_per_day' => 28.00,
                'image' => 'elsa.jpg',
                'category' => 'Princesses',
                'size' => 'S',
                'available' => true
            ],
            [
                'name' => 'Fée Magique',
                'description' => 'Costume de fée avec ailes scintillantes, baguette magique et couronne de fleurs.',
                'price_per_day' => 22.00,
                'image' => 'fee.jpg',
                'category' => 'Fantaisie',
                'size' => 'S',
                'available' => true
            ],
            [
                'name' => 'Gentleman Victorien',
                'description' => 'Costume élégant style victorien avec chapeau haut-de-forme, canne et montre à gousset.',
                'price_per_day' => 32.00,
                'image' => 'gentel.jpg',
                'category' => 'Classique',
                'size' => 'M',
                'available' => true
            ],
            [
                'name' => 'Jack Sparrow',
                'description' => 'Costume de pirate complet inspiré de Pirates des Caraïbes avec bandana, épée et accessoires.',
                'price_per_day' => 35.00,
                'image' => 'jack.jpg',
                'category' => 'Pirates',
                'size' => 'M',
                'available' => true
            ],
            [
                'name' => 'Super Mario',
                'description' => 'Costume du célèbre plombier avec casquette rouge, moustache et salopette bleue.',
                'price_per_day' => 20.00,
                'image' => 'mario.jpg',
                'category' => 'Jeux Vidéo',
                'size' => 'M',
                'available' => true
            ],
            [
                'name' => 'Médecin',
                'description' => 'Blouse blanche de médecin avec stéthoscope, badge et accessoires médicaux.',
                'price_per_day' => 18.00,
                'image' => 'med.jpg',
                'category' => 'Métiers',
                'size' => 'L',
                'available' => true
            ],
            [
                'name' => 'Petit Prince',
                'description' => 'Costume royal pour enfant avec couronne dorée, cape et épée en mousse.',
                'price_per_day' => 25.00,
                'image' => 'petit.jpg',
                'category' => 'Royauté',
                'size' => 'XS',
                'available' => true
            ],
            [
                'name' => 'Pilote Aviateur',
                'description' => 'Combinaison de pilote avec lunettes d\'aviateur, badges et casque.',
                'price_per_day' => 28.00,
                'image' => 'pilote.jpg',
                'category' => 'Métiers',
                'size' => 'M',
                'available' => true
            ],
            [
                'name' => 'Harry Potter',
                'description' => 'Robe de sorcier Gryffondor avec baguette magique, lunettes et écharpe aux couleurs de la maison.',
                'price_per_day' => 30.00,
                'image' => 'poter.jpg',
                'category' => 'Fantaisie',
                'size' => 'M',
                'available' => true
            ],
            [
                'name' => 'Reine Médiévale',
                'description' => 'Robe royale somptueuse avec couronne, bijoux et cape en velours.',
                'price_per_day' => 40.00,
                'image' => 'queen.jpg',
                'category' => 'Royauté',
                'size' => 'M',
                'available' => true
            ],
            [
                'name' => 'Spider-Man',
                'description' => 'Combinaison complète de l\'homme-araignée avec masque. Tissu élastique confortable.',
                'price_per_day' => 25.00,
                'image' => 'spid.jpg',
                'category' => 'Super-héros',
                'size' => 'M',
                'available' => true
            ],
            [
                'name' => 'Wonder Woman',
                'description' => 'Costume de super-héroïne avec bouclier, tiare dorée et bracelets de force.',
                'price_per_day' => 28.00,
                'image' => 'wom.jpg',
                'category' => 'Super-héros',
                'size' => 'S',
                'available' => true
            ],
            [
                'name' => 'Zombie',
                'description' => 'Costume effrayant de zombie avec vêtements déchirés et kit de maquillage inclus.',
                'price_per_day' => 22.00,
                'image' => 'zom.jpg',
                'category' => 'Halloween',
                'size' => 'L',
                'available' => true
            ]
        ];

        foreach ($costumes as $costume) {
            Costume::create($costume);
        }
    }
}
