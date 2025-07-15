import { Container } from '@/components/container';
import { SignupForm } from '@/features/auth/components/signup-form';

export default function Page() {
  return (
    <Container className="max-w-md py-14">
      <SignupForm />
    </Container>
  );
}
