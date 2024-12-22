import axios from 'axios';

async function getPostBySlug(slug) {
  const res = await axios.get(
    `${process.env.STRAPI_API_URL}/api/posts?filters[slug][$eq]=${slug}`
  );
  // Adjust based on how your Strapi returns data
  return res.data.data?.[0];
}

export default async function PostPage({ params }) {
  const { slug } = params;
  const postData = await getPostBySlug(slug);

  if (!postData) {
    return <div>Post not found</div>;
  }

  const { title, content } = postData;

  return (
    <article className="p-4 bg-white rounded shadow">
      <h1 className="text-3xl font-bold mb-4">{title}</h1>
      <p className="mb-2">
        {content}
      </p>
    </article>
  );
}
