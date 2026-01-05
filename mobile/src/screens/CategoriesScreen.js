import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { costumeService } from '../services/api';

const categoryConfig = {
  'Super-héros': { icon: 'flash', color: '#EF4444' },
  'Médiéval': { icon: 'shield', color: '#8B5CF6' },
  'Métiers': { icon: 'briefcase', color: '#3B82F6' },
  'Halloween': { icon: 'skull', color: '#F97316' },
  'Princesses': { icon: 'sparkles', color: '#EC4899' },
  'Fantaisie': { icon: 'star', color: '#F59E0B' },
  'Classique': { icon: 'glasses', color: '#6366F1' },
  'Pirates': { icon: 'boat', color: '#14B8A6' },
  'Jeux Vidéo': { icon: 'game-controller', color: '#10B981' },
  'Royauté': { icon: 'ribbon', color: '#A855F7' },
};

// Données de démo avec les bons comptages par catégorie
const demoCategoriesData = [
  { name: 'Super-héros', count: 3, icon: 'flash', color: '#EF4444' },
  { name: 'Princesses', count: 1, icon: 'sparkles', color: '#EC4899' },
  { name: 'Fantaisie', count: 2, icon: 'star', color: '#F59E0B' },
  { name: 'Pirates', count: 1, icon: 'boat', color: '#14B8A6' },
  { name: 'Jeux Vidéo', count: 1, icon: 'game-controller', color: '#10B981' },
  { name: 'Halloween', count: 2, icon: 'skull', color: '#F97316' },
  { name: 'Médiéval', count: 3, icon: 'shield', color: '#8B5CF6' },
  { name: 'Métiers', count: 3, icon: 'briefcase', color: '#3B82F6' },
  { name: 'Royauté', count: 2, icon: 'ribbon', color: '#A855F7' },
  { name: 'Classique', count: 2, icon: 'glasses', color: '#6366F1' },
];

const CategoriesScreen = ({ navigation }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await costumeService.getAll();
      const costumes = response.data;
      
      const categoryMap = {};
      costumes.forEach((costume) => {
        if (categoryMap[costume.category]) {
          categoryMap[costume.category]++;
        } else {
          categoryMap[costume.category] = 1;
        }
      });

      const categoryList = Object.entries(categoryMap).map(([name, count]) => ({
        name,
        count,
        icon: categoryConfig[name]?.icon || 'pricetag',
        color: categoryConfig[name]?.color || '#8B5CF6',
      }));

      setCategories(categoryList);
    } catch (error) {
      // Utiliser les données de démo
      setCategories(demoCategoriesData);
    } finally {
      setLoading(false);
    }
  };

  const renderCategoryCard = ({ item, index }) => (
    <TouchableOpacity
      style={[styles.card, { marginTop: index % 2 === 1 ? 20 : 0 }]}
      onPress={() => navigation.navigate('CategoryCostumes', { category: item.name })}
    >
      <View style={[styles.iconContainer, { backgroundColor: item.color + '20' }]}>
        <Ionicons name={item.icon} size={32} color={item.color} />
      </View>
      <Text style={styles.cardTitle}>{item.name}</Text>
      <Text style={styles.cardCount}>{item.count} costume{item.count > 1 ? 's' : ''}</Text>
      <View style={[styles.cardAccent, { backgroundColor: item.color }]} />
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
        <Text style={styles.headerTitle}>Catégories</Text>
        <Text style={styles.headerSubtitle}>Trouvez le costume parfait</Text>
      </View>

      <FlatList
        data={categories}
        renderItem={renderCategoryCard}
        keyExtractor={(item) => item.name}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
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
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#FFF',
  },
  headerSubtitle: {
    fontSize: 15,
    color: '#9CA3AF',
    marginTop: 4,
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
    width: '47%',
    backgroundColor: '#1A1A2E',
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(139, 92, 246, 0.2)',
    overflow: 'hidden',
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 14,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFF',
    marginBottom: 4,
  },
  cardCount: {
    fontSize: 13,
    color: '#9CA3AF',
  },
  cardAccent: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 3,
  },
});

export default CategoriesScreen;
