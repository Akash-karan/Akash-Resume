"use server";

import { site } from "./site";

import type { SubscribeState } from "./newsletter";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export async function subscribeToUpdates(
  _prevState: SubscribeState,
  formData: FormData,
): Promise<SubscribeState> {
  const email = String(formData.get("email") ?? "").trim();

  if (!EMAIL_PATTERN.test(email) || email.length > 254) {
    return { status: "error", message: "That doesn't look like a valid email." };
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.NEWSLETTER_FROM_EMAIL;

  if (!apiKey || !from) {
    console.warn(
      "[newsletter] RESEND_API_KEY / NEWSLETTER_FROM_EMAIL are unset — dropping signup for %s",
      email,
    );
    return {
      status: "error",
      message: "Signups aren't switched on yet. Email me directly and I'll add you.",
    };
  }

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: site.email,
        reply_to: email,
        subject: `New project-update signup: ${email}`,
        text: `${email} wants to be notified about new project updates.`,
      }),
    });

    if (!response.ok) {
      console.error(
        "[newsletter] Resend returned %s: %s",
        response.status,
        await response.text(),
      );
      return { status: "error", message: "Something broke on my end. Try again in a bit?" };
    }
  } catch (error) {
    console.error("[newsletter] signup request failed", error);
    return { status: "error", message: "Something broke on my end. Try again in a bit?" };
  }

  return { status: "success", message: "You're on the list. I'll be in touch." };
}
