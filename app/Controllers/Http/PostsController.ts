import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext"
import { StoreValidator, UpdateValidator } from "App/Validators/Post"
import Post from "App/Models/Post"

import urlSlug from "url-slug"

export default class PostsController {
  public async index({}: HttpContextContract) {
    const posts = await Post.query().orderBy("id", "desc").preload("author")

    return posts
  }

  public async store({ request, auth }: HttpContextContract) {
    const { title, content } = await request.validate(StoreValidator)

    const user = await auth.authenticate()

    const post = await Post.create({
      title,
      content,
      slug: urlSlug(title),
      authorId: user.id
    })

    await post.load("author")

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

    const { title, content } = await request.validate(UpdateValidator)

    post.merge({
      title: title || post.title,
      content: content || post.content
    })

    await post.save()

    await post.load("author")

    return post
  }

  public async destroy({ params }: HttpContextContract) {
    const { id } = params

    const post = await Post.findOrFail(id)

    await post.delete()
  }
}
