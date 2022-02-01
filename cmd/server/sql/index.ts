import { GizmoDB } from "../../../db/sql";
import { GizmoServer } from "../../../server/server";

async function main() {
  const server = new GizmoServer(
    new GizmoDB({
      user: "vidhanio",
      host: "localhost",
      database: "vidhanio",
      password: "vidhanio",
      port: 5432,
    })
  );

  await server.Start();

  process.on("SIGINT", async () => {
    await server.Stop();
    process.exit(0);
  });
}

main();
