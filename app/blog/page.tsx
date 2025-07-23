import Link from "next/link";

const demoPosts = [
  {
    id: "1",
    title: "Welcome to Ramenzen Blog",
    content: "This is a demo post. Share your ramen stories and tips!",
    image: "/ramen_color_noBG.png",
    createdAt: "2025-07-23",
  },
  {
    id: "2",
    title: "How to Make Perfect Ramen Eggs",
    content:
      "Learn the secret to creamy, flavorful ramen eggs in this step-by-step guide.",
    image: "/about-ramen.png",
    createdAt: "2025-07-22",
  },
];

export default function BlogDemoPage() {
  return (
    <main className="container mx-auto py-8">
      <h1 className="mb-8 text-center text-4xl font-bold">Blog Demo</h1>
      <div className="mt-12 grid gap-8 md:grid-cols-2">
        {demoPosts.map((post) => (
          <Link
            key={post.id}
            href={`/blog/${post.id}`}
            className="block rounded-lg bg-white/10 p-6 shadow hover:bg-white/20"
          >
            <img
              src={post.image}
              alt={post.title}
              className="mb-4 h-40 w-full rounded object-cover"
            />
            <h2 className="mb-2 text-2xl font-semibold">{post.title}</h2>
            <p className="mb-2 text-sm text-gray-300">{post.content}</p>
            <span className="text-xs text-gray-400">{post.createdAt}</span>
          </Link>
        ))}
      </div>
    </main>
  );
}
