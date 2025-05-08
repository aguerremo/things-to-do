let tasks = [
  {
    id: 1,
    title: "Task 1",
    description: "Description for Task 1",
    all_day: true,
  },
  {
    id: 2,
    title: "Task 2",
    description: "Description for Task 2",
    all_day: false,
  },
]

export default function handler(req, res) {
  if (req.method === "GET") {
    res.status(200).json(tasks)
  } else {
    res.setHeader("Allow", ["GET"])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}