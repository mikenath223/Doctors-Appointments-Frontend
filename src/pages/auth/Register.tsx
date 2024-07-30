import React from "react";
import { useAuth } from "../../hooks/useAuth";
import { CustomInput } from "../../components/atoms/Input";
import { Button } from "../../components/atoms/Button";
import { Link } from "react-router-dom";

const Register: React.FC = () => {
  const { error, handleChange, register, form, loading } = useAuth();

  return (
    <div className="my-auto">
      <h3 className="text-[30px] font-bold leading-[44.8px] mt-2 text-center">
        Sign Up
      </h3>
      <div className="space-y-[1rem]">
        <CustomInput
          onChange={(e) => handleChange("name", e.target.value)}
          error={error?.name}
          value={form?.name}
          label="Full name"
          placeholder="Enter full name"
        />
        <CustomInput
          onChange={(e) => handleChange("email", e.target.value)}
          error={error?.email}
          value={form?.email}
          label="Email address"
          placeholder="Enter email address"
        />
        <CustomInput
          onChange={(e) => handleChange("phoneNo", e.target.value)}
          error={error?.phoneNo}
          value={form?.phoneNo}
          label="Phone number"
          placeholder="Enter your phone number"
        />
        <CustomInput
          onChange={(e) => handleChange("password", e.target.value)}
          error={error?.password}
          value={form?.password}
          label="Password"
          placeholder="Enter your password"
          type="password"
        />
        <Button
          label={loading ? "Please wait..." : "Sign Up"}
          isDisabled={loading}
          activeClass
          onClick={register}
        />
      </div>
      <p className="mt-2 text-center">
        Already have an account{" "}
        <Link to="/login" className="text-[#1818A6]">
          Login
        </Link>
      </p>
    </div>
  );
};

export default Register;
