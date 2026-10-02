export async function ServerClock() {
  console.log("[ServerClock] rendering on SERVER only");
  const now = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
  return <p className="text-sm">Rendered on the server at {now}</p>;
}