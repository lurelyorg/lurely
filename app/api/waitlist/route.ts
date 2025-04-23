import { NextResponse } from 'next/server';
import { Resend } from 'resend';

if (!process.env.RESEND_API_KEY) {
  throw new Error('RESEND_API_KEY is not set in environment variables');
}

if (!process.env.RESEND_AUDIENCE_ID) {
  throw new Error('RESEND_AUDIENCE_ID is not set in environment variables');
}

const RESEND_API_KEY = process.env.RESEND_API_KEY as string;
const RESEND_AUDIENCE_ID = process.env.RESEND_AUDIENCE_ID as string;

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    // Basic email validation
    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    const resend = new Resend(RESEND_API_KEY);
    const resp = await resend.contacts.create({
      email: email,
      unsubscribed: false,
      audienceId: RESEND_AUDIENCE_ID,
    });
    console.log(resp);
    console.log('New waitlist signup:', email);

    return NextResponse.json(
      { message: 'Successfully joined waitlist' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Waitlist signup error:', error);
    return NextResponse.json(
      { error: 'Failed to join waitlist' },
      { status: 500 }
    );
  }
} 