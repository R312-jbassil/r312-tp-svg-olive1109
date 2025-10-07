import pb from "../../utils/pb";
import { Collections } from "../../utils/pocketbase-types";

export const POST = async ({ request, cookies }) => {
  try {
    const { email, password, name } = await request.json();

    // Create new user in PocketBase
    const created = await pb.collection(Collections.Users).create({
      email,
      password,
      passwordConfirm: password,
      name,
    });

    // Authenticate the newly created user
    const authData = await pb.collection(Collections.Users).authWithPassword(email, password);

    // Save auth cookie
    cookies.set("pb_auth", pb.authStore.exportToCookie(), {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      expires: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
    });

    return new Response(JSON.stringify({ user: authData.record }), { status: 201 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: err?.message || "Registration failed" }), { status: 400 });
  }
};
