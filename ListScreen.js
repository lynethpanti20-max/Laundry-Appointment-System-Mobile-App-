import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";
import { db } from "../firebase";

export default function ListScreen() {
  const [bookings, setBookings] = useState([]);

  const fetchBookings = async () => {
    const data = await getDocs(collection(db, "appointments"));
    setBookings(data.docs.map(doc => ({ ...doc.data(), id: doc.id })));
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 20, marginBottom: 10 }}>
        All Bookings
      </Text>

      <FlatList
        data={bookings}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={{ marginBottom: 10, padding: 10, borderWidth: 1 }}>
            <Text>Name: {item.name}</Text>
            <Text>Service: {item.service}</Text>
            <Text>Date: {item.date}</Text>
            <Text>Time: {item.time}</Text>
            <Text>Status: {item.status}</Text>
          </View>
        )}
      />
    </View>
  );
}