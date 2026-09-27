"use client";
import { useActionState } from "react";
import { registerUser } from "../actions/users";

export default function RegisterPage() {
  const [state, formAction] = useActionState(registerUser, {
    error: "",
    values: { username: "", name: "" },
  });
  return (
    <div>
      <h2>Register</h2>
      <form action={formAction}>
        <div>
          <label>
            Username
            <input
              type="text"
              name="username"
              required
              // minLength={4}
              defaultValue={state.values.username}
            />
          </label>
        </div>
        <div>
          <label>
            Name
            <input
              type="text"
              name="name"
              required
              minLength={4}
              defaultValue={state.values.name}
            />
          </label>
        </div>
        <div>
          <label>
            Password
            <input type="password" name="password" required />
          </label>
        </div>
        <div>
          <label>
            Confirm Password
            <input type="password" name="passwordConfirm" required />
          </label>
        </div>
        <button type="submit">Register</button>
        {state.error && <p style={{ color: "red" }}>{state.error}</p>}
      </form>
    </div>
  );
}
