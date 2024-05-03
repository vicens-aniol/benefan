import { TouchableOpacity, Text, ViewBase } from "react-native";

export default function ButtonAniol({
  title,
  onPress,
}: {
  title: string;
  onPress: () => void;
}): JSX.Element {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        backgroundColor: "blue",
        padding: 10,
        borderRadius: 5,
      }}
    >
      <Text style={{ color: "white" }}>{title}</Text>
    </TouchableOpacity>
  );
}
