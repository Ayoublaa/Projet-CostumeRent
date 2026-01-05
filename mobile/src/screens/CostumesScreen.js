import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useCart } from '../context/CartContext';
import { costumeService, getImageUrl } from '../services/api';

const CostumesScreen = ({ navigation }) => {
  const [costumes, setCostumes] = useState([]);
  const [filteredCostumes, setFilteredCostumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { getCartCount } = useCart();

  const demoData = [
    { id: 1, name: 'Batman', description: 'Costume complet de Batman avec cape noire, masque et ceinture.', price_per_day: 25, image: 'bat.jpg', category: 'Super-héros', size: 'M', available: true },
    { id: 2, name: 'Spider-Man', description: 'Combinaison complète de l\'homme-araignée avec masque.', price_per_day: 25, image: 'spid.jpg', category: 'Super-héros', size: 'M', available: true },
    { id: 3, name: 'Wonder Woman', description: 'Costume de super-héroïne avec bouclier et tiare.', price_per_day: 28, image: 'wom.jpg', category: 'Super-héros', size: 'S', available: true },
    { id: 4, name: 'Princesse Elsa', description: 'Robe bleue scintillante de la Reine des Neiges.', price_per_day: 28, image: 'elsa.jpg', category: 'Princesses', size: 'S', available: true },
    { id: 5, name: 'Harry Potter', description: 'Robe de sorcier Gryffondor avec baguette et lunettes.', price_per_day: 30, image: 'poter.jpg', category: 'Fantaisie', size: 'M', available: true },
    { id: 6, name: 'Jack Sparrow', description: 'Costume de pirate complet avec bandana et épée.', price_per_day: 35, image: 'jack.jpg', category: 'Pirates', size: 'M', available: true },
    { id: 7, name: 'Super Mario', description: 'Costume du célèbre plombier avec casquette et moustache.', price_per_day: 20, image: 'mario.jpg', category: 'Jeux Vidéo', size: 'M', available: true },
    { id: 8, name: 'Comte Dracula', description: 'Costume de vampire avec cape noire et rouge.', price_per_day: 30, image: 'drac.jpg', category: 'Halloween', size: 'L', available: true },
    { id: 9, name: 'Chevalier Médiéval', description: 'Armure de chevalier avec épée et bouclier.', price_per_day: 35, image: 'chevalier.jpg', category: 'Médiéval', size: 'L', available: true },
    { id: 10, name: 'Fée Magique', description: 'Costume de fée avec ailes et baguette magique.', price_per_day: 22, image: 'fee.jpg', category: 'Fantaisie', size: 'S', available: true },
    { id: 11, name: 'Zombie', description: 'Costume effrayant de zombie avec maquillage inclus.', price_per_day: 22, image: 'zom.jpg', category: 'Halloween', size: 'L', available: true },
    { id: 12, name: 'Chef Cuisinier', description: 'Tenue de chef avec toque et tablier blanc.', price_per_day: 15, image: 'cuisine.jpg', category: 'Métiers', size: 'M', available: true },
    { id: 13, name: 'Médecin', description: 'Blouse blanche de médecin avec stéthoscope.', price_per_day: 18, image: 'med.jpg', category: 'Métiers', size: 'L', available: true },
    { id: 14, name: 'Pilote Aviateur', description: 'Combinaison de pilote avec lunettes et badges.', price_per_day: 28, image: 'pilote.jpg', category: 'Métiers', size: 'M', available: true },
    { id: 15, name: 'Reine Médiévale', description: 'Robe royale avec couronne et bijoux.', price_per_day: 40, image: 'queen.jpg', category: 'Royauté', size: 'M', available: true },
    { id: 16, name: 'Petit Prince', description: 'Costume royal pour enfant avec couronne.', price_per_day: 25, image: 'petit.jpg', category: 'Royauté', size: 'XS', available: true },
    { id: 17, name: 'Gentleman Victorien', description: 'Costume élégant avec chapeau haut-de-forme.', price_per_day: 32, image: 'gentel.jpg', category: 'Classique', size: 'M', available: true },
    { id: 18, name: 'Costume Deluxe', description: 'Costume élégant deluxe avec accessoires premium.', price_per_day: 45, image: 'delu.jpg', category: 'Classique', size: 'M', available: true },
    { id: 19, name: 'Chevalier Royal', description: 'Costume de chevalier royal avec cape.', price_per_day: 38, image: 'chev.jpg', category: 'Médiéval', size: 'L', available: true },
    { id: 20, name: 'Chevalier Noir', description: 'Armure noire de chevalier avec épée longue.', price_per_day: 40, image: 'chevalierr.jpg', category: 'Médiéval', size: 'L', available: true },
  ];

  const fetchCostumes = async () => {
    try {
      const response = await costumeService.getAll();
      setCostumes(response.data);
      setFilteredCostumes(response.data);
    } catch (error) {
      setCostumes(demoData);
      setFilteredCostumes(demoData);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchCostumes();
  }, []);

  useEffect(() => {
    if (searchQuery) {
      const filtered = costumes.filter(
        (costume) =>
          costume.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          costume.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredCostumes(filtered);
    } else {
      setFilteredCostumes(costumes);
    }
  }, [searchQuery, costumes]);

  const renderCostumeCard = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('CostumeDetail', { costume: item })}
    >
      <Image
        source={{ uri: getImageUrl(item.image) }}
        style={styles.cardImage}
      />
      {item.available && (
        <View style={styles.availableBadge}>
          <Ionicons name="checkmark-circle" size={12} color="#FFF" />
          <Text style={styles.availableText}>Dispo</Text>
        </View>
      )}
      <View style={styles.cardContent}>
        <Text style={styles.cardCategory}>{item.category}</Text>
        <Text style={styles.cardTitle} numberOfLines={1}>{item.name}</Text>
        <View style={styles.cardFooter}>
          <View style={styles.priceContainer}>
            <Text style={styles.cardPrice}>{item.price_per_day}€</Text>
            <Text style={styles.priceLabel}>/jour</Text>
          </View>
          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={14} color="#F59E0B" />
            <Text style={styles.ratingText}>4.8</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#8B5CF6" />
        <Text style={styles.loadingText}>Chargement...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>Tous les Costumes</Text>
          <Text style={styles.headerSubtitle}>{filteredCostumes.length} disponibles</Text>
        </View>
        <TouchableOpacity 
          style={styles.cartButton}
          onPress={() => navigation.navigate('Cart')}
        >
          <Ionicons name="cart" size={24} color="#FFF" />
          {getCartCount() > 0 && (
            <View style={styles.cartBadge}>
              <Text style={styles.cartBadgeText}>{getCartCount()}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      {/* Search */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#6B7280" />
        <TextInput
          style={styles.searchInput}
          placeholder="Rechercher un costume..."
          placeholderTextColor="#6B7280"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        {searchQuery ? (
          <TouchableOpacity onPress={() => setSearchQuery('')}>
            <Ionicons name="close-circle" size={20} color="#6B7280" />
          </TouchableOpacity>
        ) : null}
      </View>

      {/* Costumes Grid */}
      <FlatList
        data={filteredCostumes}
        renderItem={renderCostumeCard}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.listContent}
        refreshControl={
          <RefreshControl 
            refreshing={refreshing} 
            onRefresh={() => { setRefreshing(true); fetchCostumes(); }}
            tintColor="#8B5CF6"
          />
        }
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="search" size={60} color="#4B5563" />
            <Text style={styles.emptyText}>Aucun costume trouvé</Text>
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
  loadingText: {
    color: '#9CA3AF',
    marginTop: 12,
    fontSize: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: '800',
    color: '#FFF',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#8B5CF6',
    marginTop: 2,
  },
  cartButton: {
    width: 50,
    height: 50,
    borderRadius: 16,
    backgroundColor: '#1A1A2E',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(139, 92, 246, 0.3)',
  },
  cartBadge: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: '#EF4444',
    width: 22,
    height: 22,
    borderRadius: 11,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartBadgeText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '700',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1A1A2E',
    marginHorizontal: 20,
    marginBottom: 16,
    paddingHorizontal: 16,
    borderRadius: 14,
    height: 52,
    borderWidth: 1,
    borderColor: 'rgba(139, 92, 246, 0.2)',
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: '#FFF',
  },
  listContent: {
    paddingHorizontal: 14,
    paddingBottom: 100,
  },
  row: {
    justifyContent: 'space-between',
    paddingHorizontal: 6,
  },
  card: {
    width: '48%',
    backgroundColor: '#1A1A2E',
    borderRadius: 20,
    marginBottom: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(139, 92, 246, 0.2)',
  },
  cardImage: {
    width: '100%',
    height: 150,
    backgroundColor: '#252542',
  },
  availableBadge: {
    position: 'absolute',
    top: 10,
    right: 10,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#10B981',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    gap: 4,
  },
  availableText: {
    color: '#FFF',
    fontSize: 10,
    fontWeight: '600',
  },
  cardContent: {
    padding: 14,
  },
  cardCategory: {
    fontSize: 11,
    color: '#8B5CF6',
    fontWeight: '600',
    marginBottom: 4,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#FFF',
    marginBottom: 10,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  cardPrice: {
    fontSize: 18,
    fontWeight: '800',
    color: '#10B981',
  },
  priceLabel: {
    fontSize: 11,
    color: '#6B7280',
    marginLeft: 2,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  ratingText: {
    fontSize: 12,
    color: '#F59E0B',
    fontWeight: '600',
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

export default CostumesScreen;
