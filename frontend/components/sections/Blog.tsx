import Link from "next/link";
import { ParallaxSection } from "@/components/layout/ParallaxSection";
import { blogPosts } from "@/lib/blog-posts";

export function Blog() {
  return (
    <ParallaxSection id="blog" className="min-h-screen px-6 pt-48 pb-32 sm:px-16">
      <h2 className="font-heading text-3xl uppercase tracking-wide">Blog</h2>
      <ul className="mt-12 flex max-w-2xl flex-col gap-10">
        {blogPosts.map((post) => (
          <li key={post.slug}>
            <Link href={`/blog/${post.slug}`} className="group block">
              <p className="font-body text-sm opacity-60">{post.date}</p>
              <h3 className="mt-1 font-heading text-xl uppercase tracking-wide group-hover:text-accent">
                {post.title}
              </h3>
              <p className="mt-2 font-body text-base opacity-80">{post.excerpt}</p>
            </Link>
          </li>
        ))}
      </ul>
    </ParallaxSection>
  );
}
