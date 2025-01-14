import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(req: NextRequest) {
  const { name, email, password } = await req.json();
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  try {
    const response = await axios.post(`${apiUrl}/users`, { name, email, password });
    return NextResponse.json({ message: 'User created successfully!' }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { message: error.response?.data.message || 'Error creating user' }, 
      { status: error.response?.status || 500 }
    );
  }
}