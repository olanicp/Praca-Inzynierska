import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';

export default function EmotionsScreen({ emotions }) {
  const [selectedItems, setSelectedItems] = useState([]); 
  const [lastSelectedEmotion, setLastSelectedEmotion] = useState(""); 


  const handleSelect = (id) => {
    const isSelected = selectedItems.includes(id);
    setSelectedItems((prev) =>
      isSelected ? prev.filter((item) => item !== id) : [...prev, id]
    );

    if (!isSelected) {
      const selectedEmotion = emotions.find((emotion) => emotion.id === id);
      console.log(selectedEmotion.description)
      setLastSelectedEmotion(selectedEmotion.description);
    }else{
      setLastSelectedEmotion("select all that resonate with you")
    }
  };

  

  const renderEmotion = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.emotionBlock,
        selectedItems.includes(item.id) && styles.emotionBlockSelected,
      ]}
      onPress={() => handleSelect(item.id)}
    >
      <Text style={styles.emotionText}>{item.emotion}</Text>
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

        {/* <View>
            <TouchableOpacity onPress={handleNext}>
            <GradientButton text={"next"}/>
            </TouchableOpacity>
        </View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff6fb',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 60,
    paddingBottom: 120,
    paddingHorizontal: 20,
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