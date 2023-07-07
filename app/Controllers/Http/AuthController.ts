import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext"

export default class AuthController {
  public async store({ request, auth }: HttpContextContract) {
    const { email, password } = request.all()

    const token = await auth.attempt(email, password, {
      expiresIn: "30m"
    })

    return token
  }

  public async show({ auth }: HttpContextContract) {
    const user = await auth.authenticate()

    return {
      id: user.id,
      name: user.name,
      email: user.email
    }
  }

  public async destroy({ auth }: HttpContextContract) {
    await auth.logout()
  }
}
