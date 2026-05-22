import { useRouter } from "expo-router";
import { Pressable, Text, View } from "react-native";

export default function Home() {
  const router = useRouter();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
        backgroundColor: "#f5f7fb",
      }}
    >
      {/* TITLE */}
      <Text style={{ fontSize: 26, fontWeight: "bold", marginBottom: 10 }}>
        Laundry Appointment System
      </Text>

      <Text
        style={{
          textAlign: "center",
          color: "gray",
          marginBottom: 40,
        }}
      >
        Manage laundry bookings efficiently and systematically
      </Text>

      {/* BUTTON 1 */}
      <Pressable
        onPress={() => router.push("/add")}
        style={{
          backgroundColor: "#4f46e5",
          padding: 15,
          width: "80%",
          borderRadius: 10,
          marginBottom: 15,
        }}
      >
        <Text style={{ color: "white", textAlign: "center", fontWeight: "bold" }}>
          ➕ Add Appointment
        </Text>
      </Pressable>

      {/* BUTTON 2 */}
      <Pressable
        onPress={() => router.push("/list")}
        style={{
          backgroundColor: "#16a34a",
          padding: 15,
          width: "80%",
          borderRadius: 10,
        }}
      >
        <Text style={{ color: "white", textAlign: "center", fontWeight: "bold" }}>
          📋 View Appointment
        </Text>
      </Pressable>
    </View>
  );
}