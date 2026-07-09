import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { authApi } from "../../api/auth";
import { getErrorMessage } from "../../api/client";
import { useAuth } from "../../contexts/AuthContext";
import { Button } from "../../components/ui/Button";
import { ErrorBanner } from "../../components/ui/ErrorBanner";
import { Spinner } from "../../components/ui/Spinner";
import { Field, Input, Label } from "../../components/ui/Input";
import { Brand, Card, Footer, FooterLink, Form, Screen, Subtitle, Title } from "./auth.styles";

export function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { login } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await authApi.signin({ email, password });
      login(res.data.token, email);
      navigate("/chat", { replace: true });
    } catch (err) {
      setError(getErrorMessage(err, "Invalid credentials."));
    } finally {
      setLoading(false);
    }
  }

  return (
    <Screen>
      <Card>
        <Brand>Medical Appointment Assistant</Brand>
        <Title>Welcome back</Title>
        <Subtitle>Sign in to continue your conversation</Subtitle>

        {error && <ErrorBanner>{error}</ErrorBanner>}

        <Form onSubmit={handleSubmit} style={{ marginTop: error ? 16 : 0 }}>
          <Field>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Field>
          <Field>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              autoComplete="current-password"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Field>
          <Button type="submit" disabled={loading} $fullWidth>
            {loading && <Spinner />}
            Sign in
          </Button>
        </Form>

        <Footer>
          Don't have an account? <FooterLink to="/signup">Sign up</FooterLink>
        </Footer>
      </Card>
    </Screen>
  );
}
