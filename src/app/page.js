import Image from "next/image";
import Link from "next/link";
import axios from "axios";

export default async function Home() {
  // Fetch posts from Strapi (adjust the URL if needed)
  const res = await axios.get(`${process.env.STRAPI_API_URL}/api/posts`);
  const posts = res.data.data || [];

  return (
    <div>
      {/* Hero Section */}
      <section className="sticky top-0 h-80 w-full flex items-center justify-center mb-8 overflow-hidden">
        <img
          src="/pictures_of_jesus_smiling.jpeg"
          alt="Jesus Christ smiling"
          // fill
          // className="object-cover brightness-75"
          // priority
          width={500}
        />
        <div className="relative z-10 text-center text-white p-4">
          <h2 className="text-2xl md:text-4xl font-bold mb-4">
            Jesus Christ is the Center
          </h2>
          <p className="text-md md:text-lg">
            Sharing inspirational gospel messages
          </p>
        </div>
      </section>

      {/* Articles Section */}
      <section>
        <h3 className="text-2xl font-bold mb-6">Recent Posts</h3>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => {
            const { id, title, slug, content } = post; // adjust to match your data

            return (
              <article
                key={id}
                className="bg-white rounded-lg shadow p-4 hover:shadow-lg transition-shadow"
              >
                <h4 className="text-xl font-semibold mb-2">{title}</h4>
                <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                  {content}
                </p>
                <Link
                  href={`/posts/${slug}`}
                  className="text-blue-600 font-semibold"
                >
                  Read More
                </Link>
              </article>
            );
          })}
        </div>
      </section>
    </div>
  );
}
