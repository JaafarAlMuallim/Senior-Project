const onSignUp = async ({
  email,
  clerkId,
  name,
}: {
  email: string;
  clerkId: string;
  name: string;
}) => {
  console.log("onSignUp");
  const response = await fetch("http://localhost:3000/auth/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, clerkId, name }),
  });
  if (!response.ok) {
    throw new Error("Failed to sign up");
  }
  const data = await response.json();
  return data;
};

export { onSignUp };
