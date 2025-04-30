import { useState } from "react";
import { auth, db } from "../firebase";

const carriers = ["att", "verizon", "tmobile", "sprint", "googlefi"];

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [carrier, setCarrier] = useState("att");
  const [name, setName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // 1. Create auth account
      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        password
      );

      // 2. Save additional info to Firestore
      await db.collection("users").doc(user.uid).set({
        name,
        phone,
        carrier,
        email,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      });

      alert("Registration successful!");
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Full Name"
        required
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
      <input
        type="tel"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        placeholder="Phone (e.g. 5551234567)"
        required
      />
      <select value={carrier} onChange={(e) => setCarrier(e.target.value)}>
        {carriers.map((c) => (
          <option key={c} value={c}>
            {c.toUpperCase()}
          </option>
        ))}
      </select>
      <button type="submit">Register</button>
    </form>
  );
}
