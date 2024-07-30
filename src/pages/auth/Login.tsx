import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../../components/atoms/Button";
import { CustomInput } from "../../components/atoms/Input";
import { useAuth } from "../../hooks/useAuth";

const Login: React.FC = () => {
  const { error, handleChange, form, loading, loginUser } = useAuth();
  return (
    <div className="my-auto">
      <h3 className="text-[32px] font-bold leading-[44.8px] text-center mt-2">
        Sign in
      </h3>
      <div className="space-y-[1rem]">
        <CustomInput
          onChange={(e) => handleChange("email", e.target.value, true)}
          label="Email address"
          error={error?.email}
          placeholder="Enter email address"
          value={form?.email}
        />
        <CustomInput
          onChange={(e) => handleChange("password", e.target.value)}
          error={error?.password}
          label="Password"
          placeholder="Enter your password"
          type="password"
          value={form?.password}
        />
        <Button
          label={loading ? "Please Wait..." : "Sign In"}
          activeClass
          onClick={loginUser}
          isDisabled={loading}
        />
      </div>
      <p className="mt-2 text-center">
        Dont have an account{" "}
        <Link to="/register" className="text-[#1818A6]">
          Register
        </Link>
      </p>
    </div>
  );
};

export default Login;
