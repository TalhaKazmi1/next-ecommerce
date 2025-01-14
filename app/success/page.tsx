import Link from "next/link";

const SuccessPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-green-100 py-16 px-4">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md text-center">
        <svg
          className="mx-auto mb-6 text-green-500 w-16 h-16"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M5 13l4 4L19 7"
          />
        </svg>
        <h1 className="text-3xl font-semibold text-gray-800 mb-4">Payment Successful!</h1>
        <p className="text-gray-600 mb-6">
          Your payment has been processed successfully. Thank you for your purchase!
        </p>
        <Link
          href="/store"
          className="bg-green-500 text-white px-6 py-3 rounded-md font-medium hover:bg-green-600 transition"
        >
          Back to Shopping
        </Link>
      </div>
    </div>
  );
};

export default SuccessPage;
