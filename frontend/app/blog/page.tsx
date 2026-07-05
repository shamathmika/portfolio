import Link from "next/link";
import { blogPosts } from "@/lib/blog-posts";

export default function BlogIndex() {
  return (
    <div className="px-16 py-24">
      <h1 className="font-display text-4xl tracking-widest">Blog</h1>
      <ul className="mt-12 flex max-w-2xl flex-col gap-10">
        {blogPosts.map((post) => (
          <li key={post.slug}>
            <Link href={`/blog/${post.slug}`} className="group block">
              <p className="font-body text-sm opacity-60">{post.date}</p>
              <h2 className="mt-1 font-heading text-xl uppercase tracking-wide group-hover:text-accent">
                {post.title}
              </h2>
              <p className="mt-2 font-subtitle text-base opacity-80">{post.excerpt}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
