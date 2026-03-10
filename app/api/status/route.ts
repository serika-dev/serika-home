import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get('url');

  if (!url) {
    return NextResponse.json({ error: 'URL parameter is required' }, { status: 400 });
  }

  try {
    const response = await fetch(`https://${url}`);
    if (response.status >= 200 && response.status < 300) {
      return NextResponse.json({ status: 'operational' });
    }
    return NextResponse.json({ status: 'downtime' });
  } catch (error) {
    return NextResponse.json({ status: 'downtime' });
  }
}
