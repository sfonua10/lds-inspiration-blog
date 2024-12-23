import Image from 'next/image';
import Link from 'next/link';
import { draftMode } from 'next/headers';
import { getContentfulClient } from '@/lib/contentful';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

export default async function Home() {
  const dm = await draftMode();
  const isPreview = dm.isEnabled;
  const client = getContentfulClient(isPreview);

  const response = await client.getEntries({
    content_type: 'post',
    order: '-sys.createdAt',
  });
  const posts = response.items || [];

  return (
    <main className="bg-gray-100 w-full min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full h-[50vh] overflow-hidden">
        <Image
          src="/pictures_of_jesus_smiling.jpeg"
          alt="Jesus Christ smiling"
          fill
          priority
          className="object-cover object-[center_20%]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-white/80 via-white/30 to-transparent" />
        <div className="absolute bottom-0 right-0 z-10 pb-6 px-6 text-gray-800 text-right">
          <h1 className="text-2xl md:text-3xl font-bold mb-2 drop-shadow-sm">
            Jesus Christ is the Center
          </h1>
          <p className="text-md md:text-lg drop-shadow-sm">
            Sharing inspirational gospel messages
          </p>
        </div>
      </section>

      {/* Search/Filter - placeholder */}
      <section className="max-w-3xl mx-auto py-6 px-4">
        <div className="flex items-center space-x-4">
          <input
            type="text"
            placeholder="Search..."
            className="border border-gray-300 rounded p-2 w-full"
          />
          <select className="border border-gray-300 rounded p-2">
            <option value="">All Categories</option>
            <option value="faith">Faith</option>
            <option value="scriptures">Scriptures</option>
            <option value="service">Service</option>
          </select>
        </div>
      </section>

      {/* Recent Posts */}
      <section className="max-w-3xl mx-auto pb-10 px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
          Recent Posts
        </h2>
        <div className="space-y-8">
          {posts.map((post) => {
            const {
              title,
              slug,
              content,
              image,   // <-- use 'image' instead of 'coverImage'
              author,
              date,
            } = post.fields;

            const imageUrl = image?.fields?.file?.url;

            const publishedDate = date
              ? new Date(date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })
              : new Date(post.sys.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                });

            let excerpt = '';
            if (content?.nodeType) {
              const rendered = documentToReactComponents(content);
              excerpt = rendered[0] || '...';
            } else {
              excerpt = content?.slice(0, 150) + '...';
            }

            return (
              <article
                key={post.sys.id}
                className="bg-white rounded-lg shadow hover:shadow-md transition-shadow overflow-hidden"
              >
                {imageUrl && (
                  <div className="relative w-full h-56">
                    <Image
                      // Prepend 'https:' if the URL starts with '//images.ctfassets.net/...'
                      src={'https:' + imageUrl}
                      alt={title}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <div className="p-4">
                  <h3 className="text-xl font-semibold mb-1 text-gray-800">
                    {title}
                  </h3>
                  <p className="text-sm text-gray-500 mb-3">
                    {author || 'Unknown'} | {publishedDate}
                  </p>
                  <div className="text-sm text-gray-600 line-clamp-3 mb-4">
                    {excerpt}
                  </div>
                  <Link
                    href={`/posts/${slug}`}
                    className="inline-block text-blue-600 font-semibold hover:underline"
                  >
                    Read More
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </main>
  );
}
