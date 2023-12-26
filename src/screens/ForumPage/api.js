import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
const baseUrl = "https://envision.kosh-web.cfd";
// const baseUrl = "https://envision.kosh-web.cfd";

// const baseUrl = AsyncStorage.getItem("BASEURL");
// let baseUrl;

export const pingServer = async () => {
  // baseUrl = url;
  try {
    const responsePromise = axios.get(`${baseUrl}/ping`);

    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => {
        reject(new Error("Fail"));
        130;
      }, 3000);
    });

    const response = await Promise.race([responsePromise, timeoutPromise]);

    if (response.status === 200) {
      const dataGet = response.data;
      //   console.log(dataGet);
      // await AsyncStorage.setItem("BASEURL", baseUrl);
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
    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error("Request timed out")), 5000)
    );

    const response = await Promise.race([
      fetch(`${baseUrl}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      }),
      timeoutPromise,
    ]);

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
    if (error.message === "Request timed out") {
      alert(error.message);
      return error.message;
    } else {
      alert(error.message);
      return false;
    }
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

export const getPosts = async (id) => {
  const postid = id ? id : 0;
  const authkey = await AsyncStorage.getItem("TOKEN");
  try {
    const response = await fetch(`${baseUrl}/getpost`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authkey}`,
      },
      body: JSON.stringify({ postid }),
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(`${errorMessage}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    alert(error.message);
  }
};

export const toggleLike = async (postid) => {
  const authkey = await AsyncStorage.getItem("TOKEN");
  try {
    const response = await fetch(`${baseUrl}/togglelike`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authkey}`,
      },
      body: JSON.stringify({ postid }),
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(`${errorMessage}`);
    }
    const data = await response.text();
    return data;
  } catch (error) {
    alert(error.message);
  }
};

export const fetchImage = (imagePath1) => {
  const imagePath = imagePath1.replace(/\\/g, "/");
  return `${baseUrl}/fetchimage?path=${encodeURIComponent(imagePath)}`;
};

export async function uploadImage(formData, data) {
  const authkey = await AsyncStorage.getItem("TOKEN");

  try {
    const response = await fetch(`${baseUrl}/upload-image`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${authkey}`,
        "Content-Type": "multipart/form-data",
      },
      body: formData,
    });
    if (response.ok) {
      const result = await response.json();
      console.log("Image uploaded:", result.imagePath);
      return await submitPost(result.imagePath, data);
    }
    if (!response.ok) {
      const err = await response.text();
      console.error(err);
      alert(err);
    }
  } catch (error) {
    console.error("Error uploading image:", error);
    alert("Error uploading image");
    return false;
  }
}

async function submitPost(image, mdata) {
  const data = {
    postname: mdata.title,
    content: mdata.content,
    image,
  };
  const authkey = await AsyncStorage.getItem("TOKEN");

  try {
    const response = await fetch(`${baseUrl}/post`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authkey}`, // Add your authentication token here
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      localStorage.setItem("err", errorMessage);
      throw new Error(`${errorMessage}`);
    }

    const result = await response.text();
    console.log(result);
    return result;
    //   alert('Post submitted successfully!');
  } catch (error) {
    console.error("Error submitting post:", error);
    alert(error);
    return false;
  }
}
