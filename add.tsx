import { addDoc, collection } from "firebase/firestore";
import React, { useState } from "react";
import {
    Alert,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";
import { db } from "../firebase";

export default function Add() {
  const [name, setName] = useState("");
  const [service, setService] = useState("");
  const [address, setAddress] = useState("");
  const [kilo, setKilo] = useState("");
  const [loading, setLoading] = useState(false);

  const servicePrices: any = {
    Wash: 100,
    Dry: 100,
    Fold: 70,
    "Wash & Fold": 200,
  };

  const services = Object.keys(servicePrices);

  const getDate = () => new Date().toLocaleDateString();
  const getTime = () => new Date().toLocaleTimeString();

  const save = async () => {
    if (!name || !service || !address || !kilo) {
      Alert.alert("Error", "Please complete all fields");
      return;
    }

    setLoading(true);

    try {
      await addDoc(collection(db, "appointments"), {
        name,
        service,
        address,
        kilo,
        price: servicePrices[service],
        date: getDate(),
        time: getTime(),
        status: "Pending",
      });

      Alert.alert("Success", "Appointment Saved!");

      setName("");
      setService("");
      setAddress("");
      setKilo("");
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Failed to save");
    }

    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>➕ Add Appointment</Text>

      <TextInput
        placeholder="Customer Name"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />

      <TextInput
        placeholder="Address"
        value={address}
        onChangeText={setAddress}
        style={styles.input}
      />

      <TextInput
        placeholder="Kilo (kg)"
        value={kilo}
        onChangeText={setKilo}
        keyboardType="numeric"
        style={styles.input}
      />

      <Text style={styles.label}>Service:</Text>

      <View style={styles.row}>
        {services.map((item) => (
          <Pressable
            key={item}
            onPress={() => setService(item)}
            style={[
              styles.choice,
              service === item && styles.selected,
            ]}
          >
            <Text style={{ color: service === item ? "white" : "black" }}>
              {item} (₱{servicePrices[item]})
            </Text>
          </Pressable>
        ))}
      </View>

      <Text style={styles.preview}>📅 {getDate()}</Text>
      <Text style={styles.preview}>⏰ {getTime()}</Text>

      <Pressable
        style={[styles.button, loading && { opacity: 0.5 }]}
        onPress={save}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? "Saving..." : "Save Appointment"}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f7fb",
    justifyContent: "center",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    backgroundColor: "white",
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  label: {
    fontWeight: "bold",
    marginBottom: 10,
  },
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 15,
  },
  choice: {
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    marginRight: 10,
    marginBottom: 10,
  },
  selected: {
    backgroundColor: "#4f46e5",
    borderColor: "#4f46e5",
  },
  preview: {
    color: "gray",
    marginBottom: 5,
  },
  button: {
    backgroundColor: "#4f46e5",
    padding: 15,
    borderRadius: 10,
    marginTop: 15,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontWeight: "600",
  },
});