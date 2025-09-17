export default async function requireAdmin(req, res, next) {
  if (!req.admin) return res.status(401).send("Admins only");
  next();
}