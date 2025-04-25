const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/users`;

export const signUp = async (formData) => {
  try {
    const res = await fetch(`${BASE_URL}/sign-up`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await res.json();
    console.log("Data: ", data);

    if (data.err) {
      throw new Error(data.err);
    }

    if (!data.token) {
      throw new Error("Invalid response from server");
    }

    localStorage.setItem("token", data.token);
    return JSON.parse(atob(data.token.split(".")[1])).payload;
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
};

export const signIn = async (formData) => {
  try {
    console.log('Attempting to sign in with URL:', `${BASE_URL}/sign-in`);
    console.log('Form data:', formData);

    const res = await fetch(`${BASE_URL}/sign-in`, {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(formData),
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error('Sign-in response not ok:', {
        status: res.status,
        statusText: res.statusText,
        errorText
      });
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const data = await res.json();
    console.log("Sign-in response data:", data);

    if (data.err) {
      console.error('Server returned error:', data.err);
      throw new Error(data.err);
    }

    if (!data.token) {
      console.error('No token in response');
      throw new Error("Invalid response from server - no token received");
    }

    localStorage.setItem("token", data.token);
    const payload = JSON.parse(atob(data.token.split(".")[1])).payload;
    console.log('Successfully signed in user:', payload);
    return payload;
  } catch (err) {
    console.error('Sign-in error:', err);
    throw new Error(`Sign-in failed: ${err.message}`);
  }
};

export const index = async () => {
  try {
    const res = await fetch(`${BASE_URL}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    const data = await res.json();

    if (data.err) {
      throw new Error(data.err);
    }

    return data;
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
};

export const show = async (userId) => {
  try {
    const res = await fetch(`${BASE_URL}/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    const data = await res.json();

    if (data.err) {
      throw new Error(data.err);
    }
    return data;
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
};
