import { cookies } from "next/headers";
import { cache } from "react";
import { generateIdFromEntropySize } from "lucia";
import { TimeSpan, createDate } from "oslo";
import { sha256 } from "oslo/crypto";
import { encodeHex } from "oslo/encoding";
import { hash, verify } from "@node-rs/argon2";
import { lucia } from "@/lib/lucia";
import { db } from "@/lib/db";

export const validateRequest = cache(async () => {
  const sessionId = cookies().get(lucia.sessionCookieName)?.value ?? null;

  if (!sessionId)
    return {
      user: null,
      session: null
    };

  const { user, session } = await lucia.validateSession(sessionId);

  try {
    if (session && session.fresh) {
      const sessionCookie = lucia.createSessionCookie(session.id);
      cookies().set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes
      );
    }

    if (!session) {
      const sessionCookie = lucia.createBlankSessionCookie();
      cookies().set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes
      );
    }
  } catch {}

  return { user, session };
});

export const hashPassword = async (password: string) => {
  return await hash(password, {
    memoryCost: 19456,
    timeCost: 2,
    outputLen: 32,
    parallelism: 1
  });
};

export const createUserSession = async (userId: string) => {
  const session = await lucia.createSession(userId, {});
  const sessionCookie = lucia.createSessionCookie(session.id);

  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );
};

export const verifyPassword = async (
  hashed: string,
  password: string
): Promise<boolean> => {
  return await verify(hashed, password, {
    memoryCost: 19456,
    timeCost: 2,
    outputLen: 32,
    parallelism: 1
  });
};

export const createTokenHash = async (tokenId: string) =>
  encodeHex(await sha256(new TextEncoder().encode(tokenId)));

export const createPasswordResetToken = async (
  userId: string
): Promise<string> => {
  await db.passwordResetToken.deleteMany({
    where: {
      userId
    }
  });

  const tokenId = generateIdFromEntropySize(25);
  const tokenHash = await createTokenHash(tokenId);

  await db.passwordResetToken.create({
    data: {
      tokenHash,
      userId,
      expiresAt: createDate(new TimeSpan(1, "d"))
    }
  });

  return tokenId;
};
