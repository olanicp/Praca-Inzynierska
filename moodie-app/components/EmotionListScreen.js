import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { styles } from "./MainAppStyles";

export default function EmotionListScreen({ emotions, onValueChange }) {
  const [selectedItems, setSelectedItems] = useState([]);
  const [lastSelectedEmotion, setLastSelectedEmotion] = useState("");
  const emotionColor = (f, i) => {
    if (f < 0 && i < 0) {
      return `hsl(${202 - 16 * f}, ${72 - 16 * i}%, ${88 + 24 * f}%)`;
    } else if (f < 0 && i > 0) {
      return `hsl(${8 + 24 * f}, ${84 + 16 * i}%, ${84 - 16 * i}%)`;
    } else if (f > 0 && i < 0) {
      return `hsl(${160 - 24 * f}, 62%, ${88 + 32 * i}%)`;
    } else {
      return `hsl(${24 + 32 * f}, ${84 + 16 * i}%, 72%)`;
    }
  };

  const handleSelect = (item) => {
    const isSelected = selectedItems.includes(item.emotion);
    if (!isSelected && selectedItems.length >= 3) {
      alert("You can select up to 3 emotions.");
      return;
    }
    setSelectedItems((prev) =>
      isSelected
        ? prev.filter((elem) => elem !== item.emotion)
        : [...prev, item.emotion]
    );
    if (!isSelected) {
      const selectedEmotion = emotions.find(
        (emotion) => emotion.id === item.id
      );
      setLastSelectedEmotion(selectedEmotion.description);
    } else {
      setLastSelectedEmotion("select all that resonate with you");
    }
  };

  useEffect(() => {
    onValueChange(selectedItems);
  }, [selectedItems]);

  const renderEmotion = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.emotionBlock,
        selectedItems.includes(item.emotion) && styles.emotionBlockSelected,
        { backgroundColor: emotionColor(item.pleasantness, item.energy) },
      ]}
      onPress={() => {
        handleSelect(item);
      }}
    >
      <Text style={styles.boxText}>{item.emotion}</Text>
    </TouchableOpacity>
  );

  return (
    <View
      style={[
        styles.container,
        {
          alignItems: "center",
          justifyContent: "space-between",
          paddingTop: 60,
          paddingBottom: 120,
          paddingHorizontal: 20,
        },
      ]}
    >
      <Text style={[styles.regularText, { fontSize: 24 }]}>
        Based on your selection, these emotions are likely accurate:
      </Text>

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
        {lastSelectedEmotion || "Select an emotion to see its description"}
      </Text>

      {/* <View>
        <TouchableOpacity onPress={handleNext}>
          <GradientButton text={"next"} />
        </TouchableOpacity>
      </View> */}
    </View>
  );
}
