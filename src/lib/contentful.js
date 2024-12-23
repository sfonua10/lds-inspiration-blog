import { createClient } from 'contentful';

export function getContentfulClient(isPreview = false) {
  const space = process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID;
  const accessToken = isPreview
    ? process.env.NEXT_PUBLIC_CONTENTFUL_PREVIEW_TOKEN
    : process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN;

  // 'preview.contentful.com' for drafts, 'cdn.contentful.com' for published
  const host = isPreview ? 'preview.contentful.com' : 'cdn.contentful.com';

  return createClient({
    space,
    accessToken,
    host,
  });
}
