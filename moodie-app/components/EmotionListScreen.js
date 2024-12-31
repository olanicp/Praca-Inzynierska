import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import GradientButton from './GradientButton';

export default function EmotionsScreen({ navigation }) {
  const [selectedItems, setSelectedItems] = useState(['3']); // Domyślnie zaznaczona emocja "lost"
  const [lastSelectedEmotion, setLastSelectedEmotion] = useState("the feeling of being unable to find your way"); // Domyślny opis dla "lost"

  const emotions = [
    { id: '1', label: 'trapped', desc: "description 1" },
    { id: '2', label: 'disconnected', desc: "description 1" },
    { id: '3', label: 'lost', desc: "the feeling of being unable to find your way" },
    { id: '4', label: 'insecure', desc: "description 1" },
    { id: '5', label: 'worried', desc: "description 1" },
    {id: '6', label: 'trapped', desc: "description 1" },
    { id: '7', label: 'disconnected', desc: "description 1" },
    { id: '8', label: 'lost', desc: "the feeling of being unable to find your way" },
    { id: '9', label: 'insecure', desc: "description 1" },
    { id: '10', label: 'worried', desc: "description 1" }
  ];

  const handleSelect = (id) => {
    const isSelected = selectedItems.includes(id);
    setSelectedItems((prev) =>
      isSelected ? prev.filter((item) => item !== id) : [...prev, id]
    );

    if (!isSelected) {
      const selectedEmotion = emotions.find((emotion) => emotion.id === id);
      setLastSelectedEmotion(selectedEmotion.desc);
    }
  };

  const handleNext = () => {
    console.log('Selected emotions:', selectedItems);
    navigation.navigate('FeelingsScreen');
  };

  const renderEmotion = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.emotionBlock,
        selectedItems.includes(item.id) && styles.emotionBlockSelected,
      ]}
      onPress={() => handleSelect(item.id)}
    >
      <Text style={styles.emotionText}>{item.label}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Based on your selection, these emotions are likely accurate:
      </Text>
      <Text style={styles.subtitle}>select all that resonate with you</Text>

      <View style={styles.listWrapper}>
        <FlatList
          data={emotions}
          renderItem={renderEmotion}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
        />
      </View>

      <Text style={styles.description}>
        {lastSelectedEmotion || 'Select an emotion to see its description'}
      </Text>

        <View>
            <TouchableOpacity onPress={handleNext}>
            <GradientButton text={"next"}/>
            </TouchableOpacity>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff6fb',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  title: {
    fontFamily: "Quicksand-Regular",
    color: "#474146",
    fontSize: 30,
    textAlign: 'center',
    marginBottom: 30
  },
  subtitle: {
    fontFamily: "Quicksand-Regular",
    color: "#474146",
    fontSize: 14,
    marginBottom: 10,
  },
  listWrapper: {
    flex: 1,
    width: '70%',
    position: 'relative',
  },
  emotionBlock: {
    backgroundColor: '#e0f7fa',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginVertical: 10,
    width: '100%',
    alignItems: 'center',
  },
  emotionBlockSelected: {
    backgroundColor: '#b2ebf2',
  },
  emotionText: {
    fontFamily: "Quicksand-Regular",
    color: "#474146",
    fontSize: 20,
  },
  description: {
    fontFamily: "Quicksand-Regular",
    color: "#474146",
    fontSize: 20,
    textAlign: 'center',
    marginVertical: 30,
  }
});