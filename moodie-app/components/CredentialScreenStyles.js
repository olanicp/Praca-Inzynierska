import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: 900,
  },
  header: {
    alignItems: "center",
    paddingHorizontal: 15,
  },
  title: {
    fontFamily: "PlayfairDisplay-Regular",
    color: "#474146",
    fontSize: 42,
    textAlign: "center",
  },
  caption: {
    fontFamily: "Quicksand-Regular",
    color: "#474146",
    fontSize: 18,
    padding: 15,
    textAlign: "center",
  },
  inputBox: {
    fontFamily: "Quicksand-Regular",
    marginVertical: 10,
    paddingLeft: 30,
    width: 300,
    height: 50,
    borderRadius: 50,
    borderColor: "#474146",
    borderWidth: 1,
    backgroundColor: "white",
  },
  inputBoxName: {
    fontFamily: "Quicksand-Regular",
    color: "#474146",
    fontSize: 18,
    paddingTop: 15,
    paddingLeft: 15,
  },
  clickableText: {
    fontFamily: "Quicksand-Regular",
    color: "#474146",
    textAlign: "center",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
    height: 65,
    width: 300,
  },
  codeFieldRoot: { paddingHorizontal: 35, paddingBottom: 55, width: "100%" },
  cell: {
    width: 64,
    height: 64,
    lineHeight: 52,
    fontSize: 24,
    borderWidth: 1,
    borderRadius: 50,
    borderColor: "#474146",
    color: "#474146",
    backgroundColor: "white",
    textAlign: "center",
    fontFamily: "Quicksand-Regular",
  },
});