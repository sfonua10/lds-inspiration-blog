import { NextResponse } from 'next/server';
import { draftMode } from 'next/headers';

export async function GET(request) {
  // Enable Draft Mode
  draftMode().enable();
  // Redirect to home (or wherever)
  return NextResponse.redirect(new URL('/', request.url));
}
