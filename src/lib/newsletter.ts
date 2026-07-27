// Kept out of actions.ts because a "use server" module may only export async functions.
export type SubscribeState = {
  status: "idle" | "success" | "error";
  message: string;
};

export const subscribeInitialState: SubscribeState = { status: "idle", message: "" };
