import { createTransport, type TransportOptions } from "nodemailer";
import { render } from "@react-email/components";
import { User } from "@prisma/client";
import { ResetPasswordEmail } from "@/lib/email/templates/reset-password";

const transporter = createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false,
  auth: {
    user: process.env.SMTP_AUTH_USER,
    pass: process.env.SMTP_AUTH_PASSWORD,
  },
} as TransportOptions);

export const sendPasswordResetToken = async (user: User, link: string) => {
  const options = {
    from: process.env.EMAIL_SENDER,
    to: user.email,
    subject: "Reset password",
    html: await render(
      <ResetPasswordEmail
        userFirstname={user.firstName}
        resetPasswordLink={link}
      />,
    ),
  };

  return await transporter.sendMail(options);
};
