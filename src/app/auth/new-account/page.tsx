import { titleFont } from '@/config/fonts';
import Link from 'next/link';

export default function NewAccont() {
  return (
    <main className="flex flex-col min-h-screen pt-32 sm:pt-52">

      <h1 className={`${titleFont.className} text-4xl mb-5`}>New accout</h1>

      <div className="flex flex-col">

        <label htmlFor="text">Name</label>
        <input
          className="px-5 py-2 border bg-gray-200 rounded mb-5"
          type="text" />

        <label htmlFor="email">Email</label>
        <input
          className="px-5 py-2 border bg-gray-200 rounded mb-5"
          type="email" />


        <label htmlFor="password">Password</label>
        <input
          className="px-5 py-2 border bg-gray-200 rounded mb-5"
          type="password" />

        <button
          className="btn-primary">
          Create
        </button>




      </div>
    </main>
  );
}