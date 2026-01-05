import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Alert,
  Modal,
  TextInput,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useCart } from '../context/CartContext';
import { useUser } from '../context/UserContext';
import { getImageUrl, reservationService } from '../services/api';

const CostumeDetailScreen = ({ route, navigation }) => {
  const { costume } = route.params;
  const { addToCart, getCartCount } = useCart();
  const { user } = useUser();
  const [modalVisible, setModalVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Données client
  const [clientName, setClientName] = useState('');
  const [clientPrenom, setClientPrenom] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [clientAddress, setClientAddress] = useState('');
  
  // Dates
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date(Date.now() + 3 * 24 * 60 * 60 * 1000));
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);

  const formatDisplayDate = (date) => {
    return date.toLocaleDateString('fr-FR', {
      weekday: 'short',
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  const formatApiDate = (date) => {
    return date.toISOString().split('T')[0];
  };

  const calculateDays = () => {
    const diffTime = Math.abs(endDate - startDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays || 1;
  };

  const calculateTotal = () => {
    return (calculateDays() * costume.price_per_day).toFixed(2);
  };

  const adjustDate = (type, increment) => {
    if (type === 'start') {
      const newDate = new Date(startDate);
      newDate.setDate(newDate.getDate() + increment);
      if (newDate >= new Date()) {
        setStartDate(newDate);
        if (newDate >= endDate) {
          const newEndDate = new Date(newDate);
          newEndDate.setDate(newEndDate.getDate() + 1);
          setEndDate(newEndDate);
        }
      }
    } else {
      const newDate = new Date(endDate);
      newDate.setDate(newDate.getDate() + increment);
      if (newDate > startDate) {
        setEndDate(newDate);
      }
    }
  };

  const handleAddToCart = async () => {
    if (!clientName.trim() || !clientPrenom.trim()) {
      Alert.alert('Erreur', 'Veuillez entrer votre nom et prénom');
      return;
    }
    if (!clientEmail.trim() || !clientEmail.includes('@')) {
      Alert.alert('Erreur', 'Veuillez entrer une adresse email valide');
      return;
    }
    if (!clientPhone.trim()) {
      Alert.alert('Erreur', 'Veuillez entrer votre numéro de téléphone');
      return;
    }
    if (!clientAddress.trim()) {
      Alert.alert('Erreur', 'Veuillez entrer votre adresse');
      return;
    }

    setIsSubmitting(true);

    try {
      // Envoyer la réservation à l'API
      await reservationService.create({
        user_id: user?.id || 1,
        costume_id: costume.id,
        start_date: formatApiDate(startDate),
        end_date: formatApiDate(endDate),
        client_name: `${clientPrenom} ${clientName}`,
        client_email: clientEmail,
        client_phone: clientPhone,
        client_address: clientAddress,
      });

      // Ajouter aussi au panier local
      const cartItem = addToCart(costume, formatApiDate(startDate), formatApiDate(endDate));
      cartItem.client = {
        name: `${clientPrenom} ${clientName}`,
        email: clientEmail,
        phone: clientPhone,
        address: clientAddress,
      };

      setModalVisible(false);
      resetForm();
      
      Alert.alert(
        'Réservation confirmée! 🎉',
        `${costume.name} a été réservé avec succès!\nTotal: ${calculateTotal()}€ pour ${calculateDays()} jour(s)`,
        [
          { text: 'Continuer', style: 'cancel' },
          { text: 'Mes réservations', onPress: () => navigation.navigate('Reservations') }
        ]
      );
    } catch (error) {
      console.log('Erreur réservation:', error);
      // En cas d'erreur API, ajouter quand même au panier local
      addToCart(costume, formatApiDate(startDate), formatApiDate(endDate));
      setModalVisible(false);
      resetForm();
      
      Alert.alert(
        'Ajouté au panier',
        'La réservation sera finalisée ultérieurement.',
        [{ text: 'OK' }]
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setClientName('');
    setClientPrenom('');
    setClientEmail('');
    setClientPhone('');
    setClientAddress('');
    setStartDate(new Date());
    setEndDate(new Date(Date.now() + 3 * 24 * 60 * 60 * 1000));
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Image Header */}
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: getImageUrl(costume.image) }}
            style={styles.image}
          />
          <View style={styles.imageOverlay} />
          
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color="#FFF" />
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.headerCartButton}
            onPress={() => navigation.navigate('Cart')}
          >
            <Ionicons name="cart" size={24} color="#FFF" />
            {getCartCount() > 0 && (
              <View style={styles.cartBadge}>
                <Text style={styles.cartBadgeText}>{getCartCount()}</Text>
              </View>
            )}
          </TouchableOpacity>

          <View style={[
            styles.availabilityBadge,
            { backgroundColor: costume.available ? '#10B981' : '#EF4444' }
          ]}>
            <Ionicons 
              name={costume.available ? 'checkmark-circle' : 'close-circle'} 
              size={16} 
              color="#FFF" 
            />
            <Text style={styles.availabilityText}>
              {costume.available ? 'Disponible' : 'Loué'}
            </Text>
          </View>
        </View>

        {/* Content */}
        <View style={styles.content}>
          <View style={styles.header}>
            <View>
              <Text style={styles.category}>{costume.category}</Text>
              <Text style={styles.title}>{costume.name}</Text>
            </View>
            <View style={styles.ratingContainer}>
              <Ionicons name="star" size={18} color="#F59E0B" />
              <Text style={styles.rating}>4.8</Text>
            </View>
          </View>

          {/* Price Card */}
          <View style={styles.priceCard}>
            <View>
              <Text style={styles.priceLabel}>Prix par jour</Text>
              <View style={styles.priceRow}>
                <Text style={styles.price}>{costume.price_per_day}€</Text>
                <Text style={styles.priceUnit}>/jour</Text>
              </View>
            </View>
            <View style={styles.sizeContainer}>
              <Text style={styles.sizeLabel}>Taille</Text>
              <View style={styles.sizeBadge}>
                <Text style={styles.sizeText}>{costume.size || 'M'}</Text>
              </View>
            </View>
          </View>

          {/* Description */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Description</Text>
            <Text style={styles.description}>
              {costume.description || `Ce magnifique costume ${costume.name} est parfait pour vos événements, fêtes et occasions spéciales.`}
            </Text>
          </View>

          {/* Features */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Inclus</Text>
            <View style={styles.featuresGrid}>
              <View style={styles.featureItem}>
                <Ionicons name="checkmark-circle" size={20} color="#10B981" />
                <Text style={styles.featureText}>Costume complet</Text>
              </View>
              <View style={styles.featureItem}>
                <Ionicons name="checkmark-circle" size={20} color="#10B981" />
                <Text style={styles.featureText}>Accessoires inclus</Text>
              </View>
              <View style={styles.featureItem}>
                <Ionicons name="checkmark-circle" size={20} color="#10B981" />
                <Text style={styles.featureText}>Nettoyage inclus</Text>
              </View>
              <View style={styles.featureItem}>
                <Ionicons name="checkmark-circle" size={20} color="#10B981" />
                <Text style={styles.featureText}>Retour gratuit</Text>
              </View>
            </View>
          </View>

          <View style={{ height: 120 }} />
        </View>
      </ScrollView>

      {/* Bottom Action */}
      {costume.available && (
        <View style={styles.bottomContainer}>
          <View style={styles.totalContainer}>
            <Text style={styles.totalLabel}>À partir de</Text>
            <Text style={styles.totalPrice}>{costume.price_per_day}€</Text>
          </View>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => setModalVisible(true)}
          >
            <Ionicons name="cart" size={22} color="#FFF" />
            <Text style={styles.addButtonText}>Réserver</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Reservation Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Réservation</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Ionicons name="close" size={28} color="#FFF" />
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
              {/* Costume Summary */}
              <View style={styles.costumeSummary}>
                <Image
                  source={{ uri: getImageUrl(costume.image) }}
                  style={styles.summaryImage}
                />
                <View style={styles.summaryInfo}>
                  <Text style={styles.summaryName}>{costume.name}</Text>
                  <Text style={styles.summaryPrice}>{costume.price_per_day}€/jour</Text>
                </View>
              </View>

              {/* Client Info Section */}
              <Text style={styles.sectionHeader}>Vos informations</Text>
              
              <View style={styles.inputRow}>
                <View style={styles.inputHalf}>
                  <Text style={styles.inputLabel}>Nom *</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="DUPONT"
                    placeholderTextColor="#6B7280"
                    value={clientName}
                    onChangeText={setClientName}
                    autoCapitalize="characters"
                  />
                </View>
                <View style={styles.inputHalf}>
                  <Text style={styles.inputLabel}>Prénom *</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Jean"
                    placeholderTextColor="#6B7280"
                    value={clientPrenom}
                    onChangeText={setClientPrenom}
                    autoCapitalize="words"
                  />
                </View>
              </View>

              <Text style={styles.inputLabel}>Email *</Text>
              <TextInput
                style={styles.input}
                placeholder="jean.dupont@email.com"
                placeholderTextColor="#6B7280"
                value={clientEmail}
                onChangeText={setClientEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />

              <Text style={styles.inputLabel}>Téléphone *</Text>
              <TextInput
                style={styles.input}
                placeholder="06 12 34 56 78"
                placeholderTextColor="#6B7280"
                value={clientPhone}
                onChangeText={setClientPhone}
                keyboardType="phone-pad"
              />

              <Text style={styles.inputLabel}>Adresse complète *</Text>
              <TextInput
                style={[styles.input, styles.inputMultiline]}
                placeholder="123 Rue Example, 75001 Paris"
                placeholderTextColor="#6B7280"
                value={clientAddress}
                onChangeText={setClientAddress}
                multiline
                numberOfLines={2}
              />

              {/* Date Selection */}
              <Text style={styles.sectionHeader}>Période de location</Text>

              <Text style={styles.inputLabel}>Date de début</Text>
              <View style={styles.dateSelector}>
                <TouchableOpacity 
                  style={styles.dateButton}
                  onPress={() => adjustDate('start', -1)}
                >
                  <Ionicons name="remove" size={20} color="#FFF" />
                </TouchableOpacity>
                <View style={styles.dateDisplay}>
                  <Ionicons name="calendar" size={18} color="#8B5CF6" />
                  <Text style={styles.dateText}>{formatDisplayDate(startDate)}</Text>
                </View>
                <TouchableOpacity 
                  style={styles.dateButton}
                  onPress={() => adjustDate('start', 1)}
                >
                  <Ionicons name="add" size={20} color="#FFF" />
                </TouchableOpacity>
              </View>

              <Text style={styles.inputLabel}>Date de fin</Text>
              <View style={styles.dateSelector}>
                <TouchableOpacity 
                  style={styles.dateButton}
                  onPress={() => adjustDate('end', -1)}
                >
                  <Ionicons name="remove" size={20} color="#FFF" />
                </TouchableOpacity>
                <View style={styles.dateDisplay}>
                  <Ionicons name="calendar" size={18} color="#8B5CF6" />
                  <Text style={styles.dateText}>{formatDisplayDate(endDate)}</Text>
                </View>
                <TouchableOpacity 
                  style={styles.dateButton}
                  onPress={() => adjustDate('end', 1)}
                >
                  <Ionicons name="add" size={20} color="#FFF" />
                </TouchableOpacity>
              </View>

              {/* Price Summary */}
              <View style={styles.priceSummary}>
                <View style={styles.priceRow2}>
                  <Text style={styles.priceLabel2}>Durée</Text>
                  <Text style={styles.priceValue2}>{calculateDays()} jour(s)</Text>
                </View>
                <View style={styles.priceRow2}>
                  <Text style={styles.priceLabel2}>Prix/jour</Text>
                  <Text style={styles.priceValue2}>{costume.price_per_day}€</Text>
                </View>
                <View style={styles.priceDivider} />
                <View style={styles.priceRow2}>
                  <Text style={styles.totalLabel2}>Total</Text>
                  <Text style={styles.totalValue2}>{calculateTotal()}€</Text>
                </View>
              </View>

              <TouchableOpacity
                style={[styles.confirmButton, isSubmitting && styles.confirmButtonDisabled]}
                onPress={handleAddToCart}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <ActivityIndicator color="#FFF" />
                ) : (
                  <>
                    <Ionicons name="checkmark-circle" size={22} color="#FFF" />
                    <Text style={styles.confirmButtonText}>Confirmer la réservation</Text>
                  </>
                )}
              </TouchableOpacity>

              <View style={{ height: 30 }} />
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F0F23',
  },
  imageContainer: {
    height: 320,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
    backgroundColor: '#252542',
  },
  imageOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerCartButton: {
    position: 'absolute',
    top: 50,
    right: 20,
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartBadge: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: '#EF4444',
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartBadgeText: {
    color: '#FFF',
    fontSize: 11,
    fontWeight: '700',
  },
  availabilityBadge: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
    gap: 6,
  },
  availabilityText: {
    color: '#FFF',
    fontSize: 13,
    fontWeight: '600',
  },
  content: {
    padding: 20,
    marginTop: -30,
    backgroundColor: '#0F0F23',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  category: {
    fontSize: 13,
    color: '#8B5CF6',
    fontWeight: '600',
    marginBottom: 4,
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: '#FFF',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1A1A2E',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 10,
    gap: 4,
  },
  rating: {
    fontSize: 14,
    fontWeight: '700',
    color: '#F59E0B',
  },
  priceCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#1A1A2E',
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(139, 92, 246, 0.3)',
    marginBottom: 24,
  },
  priceLabel: {
    fontSize: 13,
    color: '#9CA3AF',
    marginBottom: 4,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  price: {
    fontSize: 32,
    fontWeight: '800',
    color: '#10B981',
  },
  priceUnit: {
    fontSize: 16,
    color: '#6B7280',
    marginLeft: 2,
  },
  sizeContainer: {
    alignItems: 'center',
  },
  sizeLabel: {
    fontSize: 13,
    color: '#9CA3AF',
    marginBottom: 6,
  },
  sizeBadge: {
    backgroundColor: '#8B5CF6',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 12,
  },
  sizeText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '700',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFF',
    marginBottom: 12,
  },
  description: {
    fontSize: 15,
    color: '#9CA3AF',
    lineHeight: 24,
  },
  featuresGrid: {
    gap: 12,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  featureText: {
    fontSize: 14,
    color: '#9CA3AF',
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1A1A2E',
    padding: 20,
    paddingBottom: 34,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    borderWidth: 1,
    borderColor: 'rgba(139, 92, 246, 0.3)',
  },
  totalContainer: {
    flex: 1,
  },
  totalLabel: {
    fontSize: 13,
    color: '#9CA3AF',
  },
  totalPrice: {
    fontSize: 24,
    fontWeight: '800',
    color: '#10B981',
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#8B5CF6',
    paddingHorizontal: 28,
    paddingVertical: 16,
    borderRadius: 14,
    gap: 8,
  },
  addButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.8)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#1A1A2E',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    padding: 24,
    maxHeight: '90%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#FFF',
  },
  costumeSummary: {
    flexDirection: 'row',
    backgroundColor: '#252542',
    borderRadius: 16,
    padding: 12,
    marginBottom: 20,
  },
  summaryImage: {
    width: 70,
    height: 70,
    borderRadius: 12,
  },
  summaryInfo: {
    marginLeft: 14,
    justifyContent: 'center',
  },
  summaryName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFF',
  },
  summaryPrice: {
    fontSize: 15,
    color: '#10B981',
    fontWeight: '600',
    marginTop: 4,
  },
  sectionHeader: {
    fontSize: 16,
    fontWeight: '700',
    color: '#8B5CF6',
    marginTop: 16,
    marginBottom: 12,
  },
  inputRow: {
    flexDirection: 'row',
    gap: 12,
  },
  inputHalf: {
    flex: 1,
  },
  inputLabel: {
    fontSize: 13,
    color: '#9CA3AF',
    marginBottom: 8,
    marginTop: 12,
  },
  input: {
    backgroundColor: '#252542',
    borderRadius: 12,
    padding: 14,
    fontSize: 16,
    color: '#FFF',
    borderWidth: 1,
    borderColor: 'rgba(139, 92, 246, 0.3)',
  },
  inputMultiline: {
    height: 70,
    textAlignVertical: 'top',
  },
  dateSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#252542',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(139, 92, 246, 0.3)',
    overflow: 'hidden',
  },
  dateButton: {
    backgroundColor: '#8B5CF6',
    padding: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dateDisplay: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    gap: 8,
  },
  dateText: {
    fontSize: 15,
    color: '#FFF',
    fontWeight: '500',
  },
  priceSummary: {
    backgroundColor: '#252542',
    borderRadius: 16,
    padding: 18,
    marginTop: 20,
  },
  priceRow2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  priceLabel2: {
    fontSize: 14,
    color: '#9CA3AF',
  },
  priceValue2: {
    fontSize: 14,
    color: '#FFF',
    fontWeight: '500',
  },
  priceDivider: {
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.1)',
    marginVertical: 10,
  },
  totalLabel2: {
    fontSize: 16,
    color: '#FFF',
    fontWeight: '700',
  },
  totalValue2: {
    fontSize: 22,
    color: '#10B981',
    fontWeight: '800',
  },
  confirmButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#8B5CF6',
    borderRadius: 14,
    height: 56,
    marginTop: 20,
    gap: 10,
  },
  confirmButtonText: {
    color: '#FFF',
    fontSize: 17,
    fontWeight: '700',
  },
  confirmButtonDisabled: {
    backgroundColor: '#6B7280',
  },
});

export default CostumeDetailScreen;
