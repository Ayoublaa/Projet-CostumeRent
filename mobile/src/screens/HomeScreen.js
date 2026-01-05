import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  FlatList,
  Dimensions,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useCart } from '../context/CartContext';
import { costumeService, getImageUrl } from '../services/api';

const { width } = Dimensions.get('window');

const HomeScreen = ({ navigation }) => {
  const [costumes, setCostumes] = useState([]);
  const [currentTime, setCurrentTime] = useState(new Date());
  const { getCartCount } = useCart();

  useEffect(() => {
    fetchCostumes();
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const fetchCostumes = async () => {
    try {
      const response = await costumeService.getAll();
      setCostumes(response.data);
    } catch (error) {
      console.log('API non disponible, mode démo');
      // Données de démonstration
      setCostumes([
        { id: 1, name: 'Batman', price_per_day: 25, image: 'bat.jpg', category: 'Super-héros', available: true },
        { id: 2, name: 'Spider-Man', price_per_day: 25, image: 'spid.jpg', category: 'Super-héros', available: true },
        { id: 3, name: 'Elsa', price_per_day: 28, image: 'elsa.jpg', category: 'Princesses', available: true },
        { id: 4, name: 'Harry Potter', price_per_day: 30, image: 'poter.jpg', category: 'Fantaisie', available: true },
        { id: 5, name: 'Jack Sparrow', price_per_day: 35, image: 'jack.jpg', category: 'Pirates', available: true },
        { id: 6, name: 'Mario', price_per_day: 20, image: 'mario.jpg', category: 'Jeux Vidéo', available: true },
      ]);
    }
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' });
  };

  const categories = [
    { name: 'Super-héros', icon: 'flash', color: '#EF4444' },
    { name: 'Princesses', icon: 'sparkles', color: '#EC4899' },
    { name: 'Halloween', icon: 'skull', color: '#8B5CF6' },
    { name: 'Pirates', icon: 'boat', color: '#F59E0B' },
  ];

  const renderFeaturedItem = ({ item }) => (
    <TouchableOpacity
      style={styles.featuredCard}
      onPress={() => navigation.navigate('Costumes', { 
        screen: 'CostumeDetail', 
        params: { costume: item } 
      })}
    >
      <Image
        source={{ uri: getImageUrl(item.image) }}
        style={styles.featuredImage}
      />
      <View style={styles.featuredOverlay}>
        <View style={styles.featuredBadge}>
          <Text style={styles.featuredBadgeText}>POPULAIRE</Text>
        </View>
      </View>
      <View style={styles.featuredInfo}>
        <Text style={styles.featuredName}>{item.name}</Text>
        <View style={styles.featuredPriceRow}>
          <Text style={styles.featuredPrice}>{item.price_per_day}€</Text>
          <Text style={styles.featuredPriceLabel}>/jour</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Bienvenue 👋</Text>
            <Text style={styles.time}>{formatTime(currentTime)}</Text>
            <Text style={styles.date}>{formatDate(currentTime)}</Text>
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

        {/* Hero Banner */}
        <View style={styles.heroBanner}>
          <View style={styles.heroContent}>
            <Text style={styles.heroTitle}>Location de{'\n'}Costumes Premium</Text>
            <Text style={styles.heroSubtitle}>
              Plus de 100 costumes disponibles pour vos événements
            </Text>
            <TouchableOpacity 
              style={styles.heroButton}
              onPress={() => navigation.navigate('Costumes')}
            >
              <Text style={styles.heroButtonText}>Explorer</Text>
              <Ionicons name="arrow-forward" size={18} color="#0F0F23" />
            </TouchableOpacity>
          </View>
          <View style={styles.heroDecor}>
            <Ionicons name="shirt" size={100} color="rgba(255,255,255,0.1)" />
          </View>
        </View>

        {/* Categories */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Catégories</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {categories.map((cat, index) => (
              <TouchableOpacity 
                key={index} 
                style={styles.categoryCard}
                onPress={() => navigation.navigate('Categories')}
              >
                <View style={[styles.categoryIcon, { backgroundColor: cat.color + '20' }]}>
                  <Ionicons name={cat.icon} size={26} color={cat.color} />
                </View>
                <Text style={styles.categoryName}>{cat.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Featured Costumes */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Costumes Populaires</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Costumes')}>
              <Text style={styles.seeAll}>Voir tout</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={costumes.slice(0, 6)}
            renderItem={renderFeaturedItem}
            keyExtractor={(item) => item.id.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.featuredList}
          />
        </View>

        {/* Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>500+</Text>
            <Text style={styles.statLabel}>Clients satisfaits</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>100+</Text>
            <Text style={styles.statLabel}>Costumes</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>4.9</Text>
            <Text style={styles.statLabel}>Note moyenne</Text>
          </View>
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F0F23',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  greeting: {
    fontSize: 28,
    fontWeight: '800',
    color: '#FFF',
  },
  time: {
    fontSize: 15,
    color: '#8B5CF6',
    fontWeight: '600',
    marginTop: 4,
  },
  date: {
    fontSize: 13,
    color: '#9CA3AF',
    textTransform: 'capitalize',
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
  heroBanner: {
    marginHorizontal: 20,
    backgroundColor: '#8B5CF6',
    borderRadius: 24,
    padding: 24,
    overflow: 'hidden',
    position: 'relative',
  },
  heroContent: {
    maxWidth: '70%',
  },
  heroTitle: {
    fontSize: 26,
    fontWeight: '800',
    color: '#FFF',
    lineHeight: 32,
  },
  heroSubtitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
    marginTop: 8,
    lineHeight: 20,
  },
  heroButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
    alignSelf: 'flex-start',
    marginTop: 16,
    gap: 6,
  },
  heroButtonText: {
    color: '#0F0F23',
    fontSize: 15,
    fontWeight: '600',
  },
  heroDecor: {
    position: 'absolute',
    right: -20,
    bottom: -20,
  },
  section: {
    marginTop: 28,
    paddingHorizontal: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFF',
    marginBottom: 16,
  },
  seeAll: {
    color: '#8B5CF6',
    fontSize: 14,
    fontWeight: '600',
  },
  categoryCard: {
    alignItems: 'center',
    marginRight: 16,
  },
  categoryIcon: {
    width: 64,
    height: 64,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  categoryName: {
    fontSize: 12,
    color: '#9CA3AF',
    fontWeight: '500',
  },
  featuredList: {
    paddingRight: 20,
  },
  featuredCard: {
    width: width * 0.42,
    marginRight: 14,
    backgroundColor: '#1A1A2E',
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(139, 92, 246, 0.2)',
  },
  featuredImage: {
    width: '100%',
    height: 140,
    backgroundColor: '#252542',
  },
  featuredOverlay: {
    position: 'absolute',
    top: 10,
    left: 10,
  },
  featuredBadge: {
    backgroundColor: '#8B5CF6',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  featuredBadgeText: {
    color: '#FFF',
    fontSize: 9,
    fontWeight: '700',
  },
  featuredInfo: {
    padding: 14,
  },
  featuredName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#FFF',
    marginBottom: 6,
  },
  featuredPriceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  featuredPrice: {
    fontSize: 18,
    fontWeight: '800',
    color: '#10B981',
  },
  featuredPriceLabel: {
    fontSize: 12,
    color: '#9CA3AF',
    marginLeft: 2,
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: '#1A1A2E',
    marginHorizontal: 20,
    marginTop: 28,
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(139, 92, 246, 0.2)',
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: '800',
    color: '#8B5CF6',
  },
  statLabel: {
    fontSize: 12,
    color: '#9CA3AF',
    marginTop: 4,
  },
  statDivider: {
    width: 1,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
});

export default HomeScreen;
