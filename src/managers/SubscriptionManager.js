



export const createSubscription = async (newSub) => {
    await fetch('http://localhost:8000/subscriptions', {
      method: "POST",
      headers: {
        Authorization: `Token ${localStorage.getItem("auth_token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newSub),
    });
  };