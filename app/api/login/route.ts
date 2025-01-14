import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  try {
    const response = await axios.post(`${apiUrl}/users/login`, { email, password });
    const token = response.data.token;
    return NextResponse.json({ token }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { message: error.response?.data.message || 'Invalid credentials' }, 
      { status: error.response?.status || 401 }
    );
  }
}