import Link from "next/link";
import { notFound } from "next/navigation";
import { blogPosts, getBlogPost } from "@/lib/blog-posts";

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="px-6 py-24 sm:px-16">
      <Link href="/#blog" className="font-body text-sm opacity-60 hover:text-accent">
        ← Blog
      </Link>
      <p className="mt-8 font-body text-sm opacity-60">{post.date}</p>
      <h1 className="mt-1 max-w-3xl font-body text-3xl font-bold">{post.title}</h1>
      <div className="mt-10 flex max-w-2xl flex-col gap-8 font-body text-lg leading-relaxed">
        {post.sections.map((section, i) => (
          <div key={i}>
            {section.heading && (
              <h2 className="mb-3 font-heading text-lg uppercase tracking-wide">
                {section.heading}
              </h2>
            )}
            {section.body.map((paragraph, j) => (
              <p key={j} className="mb-4 text-justify last:mb-0 opacity-90">
                {paragraph}
              </p>
            ))}
          </div>
        ))}
      </div>
    </article>
  );
}
