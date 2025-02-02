import * as React from 'react';
import {
  Body,
  Button,
  Container,
  Head,
  Html,
  Preview,
  Section,
  Text
} from '@react-email/components';

interface ResetPasswordEmailProps {
  userFirstname?: string;
  resetPasswordLink?: string;
}

export const ResetPasswordEmail = ({
  userFirstname,
  resetPasswordLink
}: ResetPasswordEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>Savory point reset your password</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section>
            <Text style={text}>Hi {userFirstname},</Text>
            <Text style={text}>
              You recently requested to reset your password for your Savory
              Point account. Use the button below to reset it.
            </Text>
            <Button style={button} href={resetPasswordLink}>
              Reset password
            </Button>
            <Text style={text}>
              If you don&apos;t want to change your password or didn&apos;t
              request this, just ignore and delete this message.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

const main = {
  backgroundColor: '#f6f9fc',
  padding: '10px 0'
};

const container = {
  backgroundColor: '#ffffff',
  border: '1px solid #f0f0f0',
  padding: '45px'
};

const text = {
  fontSize: '16px',
  fontFamily:
    "'Open Sans', 'HelveticaNeue-Light', 'Helvetica Neue Light', 'Helvetica Neue', Helvetica, Arial, 'Lucida Grande', sans-serif",
  fontWeight: '300',
  color: '#404040',
  lineHeight: '26px'
};

const button = {
  backgroundColor: '#059669',
  borderRadius: '4px',
  color: '#fff',
  fontFamily: "'Open Sans', 'Helvetica Neue', Arial",
  fontSize: '16px',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'block',
  width: '210px',
  padding: '14px 7px'
};
