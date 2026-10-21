import { useNavigate } from "react-router";

import { useEffect } from "react";

import { useAuth } from "@/hooks/useAuth";
import AuthWrapper from "@/components/AuthWrapper";

type HomeProps = {};

export default function Home({}: HomeProps) {
  return (
    <AuthWrapper>
      <h1 className="text-9xl">Homepage</h1>
    </AuthWrapper>
  );
}
