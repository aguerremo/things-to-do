export default function handler(req, res, task) {
  if (req.method === "POST") {
    res.status(200).json(task)
  } else {
    res.setHeader("Allow", ["POST"])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}