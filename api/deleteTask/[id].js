export default function handler(req, res) {
  if (req.method === "DELETE") {
    res.status(200).end(`Task with ID ${req.query.id} deleted successfully`)
  } else {
    res.setHeader("Allow", ["DELETE"])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}