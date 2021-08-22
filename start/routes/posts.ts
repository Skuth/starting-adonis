import Route from "@ioc:Adonis/Core/Route"

Route.resource("/posts", "PostsController")
  .apiOnly()
  .middleware({
    store: ["auth", "acl:admin"],
    update: ["auth", "acl:admin"],
    destroy: ["auth", "acl:admin"]
  })
