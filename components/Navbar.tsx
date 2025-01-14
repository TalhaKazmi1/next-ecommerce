import Link from 'next/link';
import Image from 'next/image';

const Navbar = () => {
  return (
    <nav className="bg-gray-900 text-white py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <Link href="/" className="flex items-center">
          <Image src="/icon4.webp" alt="Logo" width={40} height={40} />
          <span className="ml-2 text-xl font-bold">Roronoa Zoro</span>
        </Link>
        <div>
          <Link href="/signup" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mr-4 transition duration-300">
            Sign Up
          </Link>
          <Link href="/login" className="bg-transparent hover:bg-white hover:text-gray-900 text-white font-semibold py-2 px-4 border border-white hover:border-transparent rounded-full transition duration-300">
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

