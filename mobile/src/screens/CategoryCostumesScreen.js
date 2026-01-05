import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { costumeService, getImageUrl } from '../services/api';

const allCostumes = [
  // Super-héros
  { id: 1, name: 'Batman', description: 'Costume complet de Batman avec cape noire, masque et ceinture.', price_per_day: 25, image: 'bat.jpg', category: 'Super-héros', size: 'M', available: true },
  { id: 2, name: 'Spider-Man', description: 'Combinaison complète de l\'homme-araignée avec masque.', price_per_day: 25, image: 'spid.jpg', category: 'Super-héros', size: 'M', available: true },
  { id: 3, name: 'Wonder Woman', description: 'Costume de super-héroïne avec bouclier et tiare.', price_per_day: 28, image: 'wom.jpg', category: 'Super-héros', size: 'S', available: true },
  
  // Princesses
  { id: 4, name: 'Princesse Elsa', description: 'Robe bleue scintillante de la Reine des Neiges.', price_per_day: 28, image: 'elsa.jpg', category: 'Princesses', size: 'S', available: true },
  
  // Fantaisie
  { id: 5, name: 'Harry Potter', description: 'Robe de sorcier Gryffondor avec baguette et lunettes.', price_per_day: 30, image: 'poter.jpg', category: 'Fantaisie', size: 'M', available: true },
  { id: 10, name: 'Fée Magique', description: 'Costume de fée avec ailes et baguette magique.', price_per_day: 22, image: 'fee.jpg', category: 'Fantaisie', size: 'S', available: true },
  
  // Pirates
  { id: 6, name: 'Jack Sparrow', description: 'Costume de pirate complet avec bandana et épée.', price_per_day: 35, image: 'jack.jpg', category: 'Pirates', size: 'M', available: true },
  
  // Jeux Vidéo
  { id: 7, name: 'Super Mario', description: 'Costume du célèbre plombier avec casquette et moustache.', price_per_day: 20, image: 'mario.jpg', category: 'Jeux Vidéo', size: 'M', available: true },
  
  // Halloween
  { id: 8, name: 'Comte Dracula', description: 'Costume de vampire avec cape noire et rouge.', price_per_day: 30, image: 'drac.jpg', category: 'Halloween', size: 'L', available: true },
  { id: 11, name: 'Zombie', description: 'Costume effrayant de zombie avec maquillage inclus.', price_per_day: 22, image: 'zom.jpg', category: 'Halloween', size: 'L', available: true },
  
  // Médiéval
  { id: 9, name: 'Chevalier Médiéval', description: 'Armure de chevalier avec épée et bouclier.', price_per_day: 35, image: 'chevalier.jpg', category: 'Médiéval', size: 'L', available: true },
  { id: 19, name: 'Chevalier Royal', description: 'Costume de chevalier royal avec cape.', price_per_day: 38, image: 'chev.jpg', category: 'Médiéval', size: 'L', available: true },
  { id: 20, name: 'Chevalier Noir', description: 'Armure noire de chevalier avec épée longue.', price_per_day: 40, image: 'chevalierr.jpg', category: 'Médiéval', size: 'L', available: true },
  
  // Métiers
  { id: 12, name: 'Chef Cuisinier', description: 'Tenue de chef avec toque et tablier blanc.', price_per_day: 15, image: 'cuisine.jpg', category: 'Métiers', size: 'M', available: true },
  { id: 13, name: 'Médecin', description: 'Blouse blanche de médecin avec stéthoscope.', price_per_day: 18, image: 'med.jpg', category: 'Métiers', size: 'L', available: true },
  { id: 14, name: 'Pilote Aviateur', description: 'Combinaison de pilote avec lunettes et badges.', price_per_day: 28, image: 'pilote.jpg', category: 'Métiers', size: 'M', available: true },
  
  // Royauté
  { id: 15, name: 'Reine Médiévale', description: 'Robe royale avec couronne et bijoux.', price_per_day: 40, image: 'queen.jpg', category: 'Royauté', size: 'M', available: true },
  { id: 16, name: 'Petit Prince', description: 'Costume royal pour enfant avec couronne.', price_per_day: 25, image: 'petit.jpg', category: 'Royauté', size: 'XS', available: true },
  
  // Classique
  { id: 17, name: 'Gentleman Victorien', description: 'Costume élégant avec chapeau haut-de-forme.', price_per_day: 32, image: 'gentel.jpg', category: 'Classique', size: 'M', available: true },
  { id: 18, name: 'Costume Deluxe', description: 'Costume élégant deluxe avec accessoires premium.', price_per_day: 45, image: 'delu.jpg', category: 'Classique', size: 'M', available: true },
];

const CategoryCostumesScreen = ({ route, navigation }) => {
  const { category } = route.params;
  const [costumes, setCostumes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCostumes();
  }, []);

  const fetchCostumes = async () => {
    try {
      const response = await costumeService.getByCategory(category);
      setCostumes(response.data);
    } catch (error) {
      // Filtrer les données de démo par catégorie
      const filtered = allCostumes.filter(c => c.category === category);
      setCostumes(filtered);
    } finally {
      setLoading(false);
    }
  };

  const renderCostumeCard = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('CostumeDetail', { costume: item })}
    >
      <Image
        source={{ uri: getImageUrl(item.image) }}
        style={styles.cardImage}
      />
      <View style={styles.cardContent}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle} numberOfLines={1}>{item.name}</Text>
          {item.available && (
            <View style={styles.availableBadge}>
              <Ionicons name="checkmark" size={12} color="#FFF" />
            </View>
          )}
        </View>
        <Text style={styles.cardDescription} numberOfLines={2}>{item.description}</Text>
        <Text style={styles.cardSize}>Taille {item.size}</Text>
        <View style={styles.cardFooter}>
          <View style={styles.priceContainer}>
            <Text style={styles.cardPrice}>{item.price_per_day}€</Text>
            <Text style={styles.priceLabel}>/jour</Text>
          </View>
          <TouchableOpacity 
            style={styles.addButton}
            onPress={() => navigation.navigate('CostumeDetail', { costume: item })}
          >
            <Ionicons name="add" size={20} color="#FFF" />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#8B5CF6" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#FFF" />
        </TouchableOpacity>
        <View>
          <Text style={styles.headerTitle}>{category}</Text>
          <Text style={styles.headerSubtitle}>{costumes.length} costume(s)</Text>
        </View>
      </View>

      <FlatList
        data={costumes}
        renderItem={renderCostumeCard}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="shirt-outline" size={60} color="#4B5563" />
            <Text style={styles.emptyText}>Aucun costume dans cette catégorie</Text>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F0F23',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0F0F23',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: '#1A1A2E',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#FFF',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#8B5CF6',
    marginTop: 2,
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#1A1A2E',
    borderRadius: 18,
    marginBottom: 14,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(139, 92, 246, 0.2)',
  },
  cardImage: {
    width: 120,
    height: 150,
    backgroundColor: '#252542',
  },
  cardContent: {
    flex: 1,
    padding: 14,
    justifyContent: 'space-between',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  cardTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#FFF',
    flex: 1,
  },
  availableBadge: {
    backgroundColor: '#10B981',
    width: 22,
    height: 22,
    borderRadius: 11,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardDescription: {
    fontSize: 12,
    color: '#9CA3AF',
    marginTop: 4,
    lineHeight: 18,
  },
  cardSize: {
    fontSize: 12,
    color: '#8B5CF6',
    fontWeight: '600',
    marginTop: 4,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  cardPrice: {
    fontSize: 20,
    fontWeight: '800',
    color: '#10B981',
  },
  priceLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginLeft: 2,
  },
  addButton: {
    backgroundColor: '#8B5CF6',
    width: 36,
    height: 36,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 60,
  },
  emptyText: {
    color: '#6B7280',
    marginTop: 16,
    fontSize: 16,
  },
});

export default CategoryCostumesScreen;
