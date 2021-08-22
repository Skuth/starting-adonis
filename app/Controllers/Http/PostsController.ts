import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext"
import Post from "App/Models/Post"

export default class PostsController {
  public async index({}: HttpContextContract) {
    const posts = await Post.all()

    return posts
  }

  public async store({ request }: HttpContextContract) {
    const { title, content } = request.all()

    const post = await Post.create({
      title,
      content,
      slug: title.toLowerCase(),
    })

    return post
  }

  public async show({ params }: HttpContextContract) {
    const { id } = params

    const post = await Post.findOrFail(id)

    return post
  }

  public async update({ params, request }: HttpContextContract) {
    const { id } = params

    const post = await Post.findOrFail(id)

    const { title, content } = request.all()

    post.merge({
      title: title || post.title,
      content: content || post.content,
    })

    await post.save()

    return post
  }

  public async destroy({ params }: HttpContextContract) {
    const { id } = params

    const post = await Post.findOrFail(id)

    await post.delete()
  }
}
