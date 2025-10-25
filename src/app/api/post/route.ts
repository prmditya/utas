import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { authOptions } from "@/lib/auth";

export async function GET() {
  const posts = await prisma.post.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      author: {
        select: {
          id: true,
          username: true,
        },
      },
    },
  });
  return NextResponse.json(posts);
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user.id) {
    return new Response(JSON.stringify({ message: "Unauthorized" }), {
      status: 401,
    });
  }

  const { content, authorId } = await req.json();

  if (!content || !authorId) {
    return new Response(
      JSON.stringify({ message: "Content and authorId are required" }),
      { status: 400 }
    );
  }

  await prisma.post.create({
    data: {
      content,
      authorId,
    },
  });

  return new Response(
    JSON.stringify({
      message: "Post created successfully",
      post: { content, authorId },
    }),
    { status: 201 }
  );
}
