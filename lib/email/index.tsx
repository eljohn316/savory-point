import { createTransport, type TransportOptions } from 'nodemailer';
import { render } from '@react-email/components';
import { ResetPasswordEmail } from '@/lib/email/templates/reset-password';
import { type User } from '@/lib/auth-client';

const transporter = createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false,
  auth: {
    user: process.env.EMAIL_SENDER,
    pass: process.env.EMAIL_PASSWORD,
  },
} as TransportOptions);

export const sendPasswordResetLink = async (user: User, link: string) => {
  const options = {
    from: process.env.EMAIL_SENDER,
    to: user.email,
    name: 'Savory Point',
    subject: 'Reset password',
    html: await render(
      <ResetPasswordEmail userFirstname={user.firstName} resetPasswordLink={link} />,
    ),
  };
  return await transporter.sendMail(options);
};
