import {
    collection,
    deleteDoc,
    doc,
    onSnapshot,
    updateDoc,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { FlatList, Pressable, Text, View } from "react-native";
import { db } from "../firebase";

export default function List() {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "appointments"), (snap) => {
      const items = snap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setData(items);
    });

    return () => unsub();
  }, []);

  const handleDelete = async (id: string) => {
    await deleteDoc(doc(db, "appointments", id));
  };

  const updateStatus = async (id: string, status: string) => {
    await updateDoc(doc(db, "appointments", id), {
      status: status,
    });
  };

  return (
    <View style={{ flex: 1, padding: 20, backgroundColor: "#f5f7fb" }}>
      <Text style={{ fontSize: 22, fontWeight: "bold", marginBottom: 10 }}>
        📋 Appointments
      </Text>

      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View
            style={{
              backgroundColor: "white",
              padding: 15,
              marginBottom: 10,
              borderRadius: 10,
            }}
          >
            <Text>👤 {item.name}</Text>
            <Text>🧼 {item.service}</Text>
            <Text>⚖️ {item.kilo} kg</Text>
            <Text>📍 {item.address}</Text>
            <Text>💰 ₱{item.price}</Text>

            <Text
              style={{
                fontWeight: "bold",
                color:
                  item.status === "Completed"
                    ? "green"
                    : item.status === "Ongoing"
                    ? "orange"
                    : "gray",
              }}
            >
              Status: {item.status}
            </Text>

            {/* STATUS BUTTONS */}
            <View style={{ flexDirection: "row", marginTop: 10 }}>
              <Pressable
                onPress={() => updateStatus(item.id, "Ongoing")}
                style={{
                  backgroundColor: "orange",
                  padding: 8,
                  borderRadius: 6,
                  marginRight: 5,
                }}
              >
                <Text style={{ color: "white" }}>Ongoing</Text>
              </Pressable>

              <Pressable
                onPress={() => updateStatus(item.id, "Completed")}
                style={{
                  backgroundColor: "green",
                  padding: 8,
                  borderRadius: 6,
                }}
              >
                <Text style={{ color: "white" }}>Completed</Text>
              </Pressable>
            </View>

            {/* DELETE */}
            <Pressable
              onPress={() => handleDelete(item.id)}
              style={{
                marginTop: 10,
                backgroundColor: "red",
                padding: 8,
                borderRadius: 6,
              }}
            >
              <Text style={{ color: "white", textAlign: "center" }}>
                Delete
              </Text>
            </Pressable>
          </View>
        )}
      />
    </View>
  );
}