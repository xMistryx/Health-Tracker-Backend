import { getUserById } from "#db/queries/users";
import { verifyToken } from "#utils/jwt";

export default async function getUserFromToken(req, res, next) {
  const authorization = req.get("authorization");
  if (!authorization || !authorization.startsWith("Bearer ")) {
    return res.status(401).send("Unauthorized");
  }

  const token = authorization.split(" ")[1];
  try {
    const { id } = verifyToken(token);
    const user = await getUserById(id);
    if (!user) {
      return res.status(401).send("User not found.");
    }
    req.user = user;
    next();
  } catch {
    res.status(401).send("Invalid token.");
  }
}
