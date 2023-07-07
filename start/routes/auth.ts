import Route from "@ioc:Adonis/Core/Route"

Route.group(() => {
  Route.post("/", "AuthController.store")
  Route.delete("/", "AuthController.destroy").middleware("auth")

  Route.get("/authenticate", "AuthController.show").middleware("auth")
}).prefix("/auth")
