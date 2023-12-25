import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
const baseUrl = "http://192.168.0.106:3000";
export const pingServer = async () => {
  try {
    const responsePromise = axios.get(`${baseUrl}/ping`);

    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => {
        reject(new Error("Fail"));
      }, 3000);
    });

    const response = await Promise.race([responsePromise, timeoutPromise]);

    if (response.status === 200) {
      const dataGet = response.data;
      console.log(dataGet);
      return Promise.resolve("Success");
    } else {
      return Promise.reject(
        new Error(`HTTP error! Status: ${response.status}`)
      );
    }
  } catch (error) {
    return Promise.reject(error);
  }
};

export const handleLogin = async (username, password) => {
  try {
    const response = await fetch(`${baseUrl}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(`Authentication failed: ${errorMessage}`);
    }
    const data = await response.json();
    yourAuthToken = data.token;
    await AsyncStorage.setItem("TOKEN", yourAuthToken);
    await AsyncStorage.setItem("ONLINEUSERNAME", username);
    console.log("Login successful. Token:", yourAuthToken);
    return true;
  } catch (error) {
    // console.error("Error during login:", error.message);
    alert(error.message);
    return false;
  }
};

export const handleRegister = async (username, password) => {
  try {
    const response = await fetch(`${baseUrl}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(`${errorMessage}`);
    }
    const data = await response.text();
    console.log(data);
    return true;
  } catch (error) {
    // console.error("Error during login:", error.message);
    alert(error.message);
    return false;
  }
};
