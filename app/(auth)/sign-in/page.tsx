import { Container } from '@/components/container';
import { SigninForm } from '@/features/auth/components/signin-form';

export default function Page() {
  return (
    <Container className="max-w-sm py-14">
      <SigninForm />
    </Container>
  );
}
