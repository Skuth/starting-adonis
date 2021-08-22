import BaseSeeder from "@ioc:Adonis/Lucid/Seeder"
import User from "App/Models/User"

export default class CreateUsersSeeder extends BaseSeeder {
  public async run() {
    await User.createMany([
      {
        name: "User admin",
        email: "admin@adonis.com",
        password: "secret",
        role: "admin"
      },
      {
        name: "User normal",
        email: "user@adonis.com",
        password: "secret",
        role: "normal"
      }
    ])
  }
}
