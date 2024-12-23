import { draftMode } from 'next/headers';
import { getContentfulClient } from '@/lib/contentful';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

async function getPost(slug, isPreview) {
  const client = getContentfulClient(isPreview);

  const response = await client.getEntries({
    content_type: 'post',
    'fields.slug': slug,
    limit: 1,
  });

  return response.items[0];
}

export default async function PostPage({ params }) {
  // Must await draftMode()
  const dm = await draftMode();
  const isPreview = dm.isEnabled;

  const post = await getPost(params.slug, isPreview);

  if (!post) {
    return <div className="p-4">Post not found.</div>;
  }

  const { title, content } = post.fields;

  return (
    <article className="mx-auto p-4 max-w-3xl bg-white rounded shadow">
      <h1 className="text-3xl font-bold mb-4">{title}</h1>

      {/* If Rich Text */}
      {content?.nodeType ? (
        <div className="leading-7">
          {documentToReactComponents(content)}
        </div>
      ) : (
        // Otherwise, if it's plain text
        <p className="leading-7">{content}</p>
      )}
    </article>
  );
}
