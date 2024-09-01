'use client';

import { Button } from './Button';
import React, { useState } from 'react';
import { usePlayer } from '@/hooks/usePlayer';
import { useUser } from '@/hooks/useUser';
import { useAuthModal } from '@/hooks/useAuthModal';
import { ListItem } from './ListItem';
import { useSupabaseClient } from '@supabase/auth-helpers-react';

import { FaUserAlt } from 'react-icons/fa';
import { RxCaretLeft } from 'react-icons/rx';
import { RxCaretRight } from 'react-icons/rx';
import { HiHome } from 'react-icons/hi';
import { BiSearch } from 'react-icons/bi';

import { useRouter, usePathname } from 'next/navigation';
import { useSubscribeModal } from '@/hooks/useSubscribeModal';
import { twMerge } from 'tailwind-merge';
import { AiOutlinePlus } from 'react-icons/ai';
import { toast } from 'react-hot-toast';
import { useUploadModal } from '@/hooks/useUploadModal';

interface HeaderProps {
  children?: React.ReactNode;
  className?: string;
  userDetails?: {
    first_name?: string;
    email?: string;
    avatar_url?: string;
  } | null;
}

export const Header: React.FC<HeaderProps> = ({ children, className, userDetails }) => {
  const authModal = useAuthModal();
  const router = useRouter();
  const pathname = usePathname();
  const supabaseClient = useSupabaseClient();
  const { user, subscription } = useUser();
  const player = usePlayer();
  const subscribeModal = useSubscribeModal();
  const uploadModal = useUploadModal();

  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleLogout = async () => {
    const { error } = await supabaseClient.auth.signOut();
    player.reset();
    router.refresh();

    if (error) {
      toast.error(error.message);
    } else {
      toast.success('Logged out!');
    }
  };

  const onClick = () => {
    if (!user) {
      return authModal.onOpen();
    }

    if (!subscription) {
      return subscribeModal.onOpen();
    }

    //* Open upload modal
    return uploadModal.onOpen();
  };

  return (
    <div
      className={twMerge(
        `relative h-fit p-6 bg-neutral-900 transition-colors duration-1000 ease-in-out`,
        className
      )}
    >
      {/* Overlay for gradient transition */}
      <div
        className={twMerge(
          `absolute inset-0 transition-opacity duration-1000 ease-in-out pointer-events-none bg-gradient-to-b from-violet-900`,
          isHovered ? 'opacity-100' : 'opacity-0'
        )}
      ></div>

      <div className="relative w-full mb-4 flex items-center justify-between">
        <div className="hidden md:flex gap-x-2 items-center">
          <button
            onClick={() => router.back()}
            className="rounded-full bg-black flex items-center justify-center hover:opacity-75 transition"
          >
            <RxCaretLeft className="text-white" size={35} />
          </button>
          <button
            onClick={() => router.forward()}
            className="rounded-full bg-black flex items-center justify-center hover:opacity-75 transition"
          >
            <RxCaretRight className="text-white" size={35} />
          </button>
        </div>
        <div className="flex md:hidden gap-x-2 items-center">
          <button
            onClick={() => router.push('/')}
            className="rounded-full p-2 bg-white flex items-center justify-center hover:opacity-75 transition"
          >
            <HiHome className="text-black" size={20} />
          </button>
          <button
            onClick={() => router.push('/search')}
            className="rounded-full p-2 bg-white flex items-center justify-center hover:opacity-75 transition"
          >
            <BiSearch className="text-black" size={20} />
          </button>
          <button
            onClick={onClick}
            className="rounded-full p-2 bg-white flex items-center justify-center hover:opacity-75 transition"
          >
            <AiOutlinePlus className="text-black" size={20} />
          </button>
        </div>
        <div className="flex justify-between items-center gap-x-4">
          {user ? (
            <div className="flex gap-x-4 items-center">
              <Button onClick={handleLogout} className="bg-white px-6 py-2">
                Logout
              </Button>
              <Button
                onClick={() => router.push('/account')}
                className={user.avatar_url ? 'p-0 border-none' : 'bg-white'}
              >
                {user.avatar_url ? (
                  <img
                    src={user.avatar_url}
                    alt="User Avatar"
                    className="w-10 h-10 rounded-full object-cover"
                  />
                ) : (
                  <FaUserAlt className="w-4 h-4" />
                )}
              </Button>
            </div>
          ) : (
            <>
              <div>
                <Button
                  onClick={authModal.onOpen}
                  className="bg-transparent text-neutral-300 font-medium"
                >
                  Sign Up
                </Button>
              </div>
              <div>
                <Button onClick={authModal.onOpen} className="bg-white px-6 py-2">
                  Log in
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
      { pathname === '/' && (
        <div className="relative mb-2">
          <h1 className="text-white text-3xl font-bold">
            {userDetails && userDetails.email
              ? `Welcome back, ${userDetails.first_name || userDetails.email.split('@')[0]}!`
              : 'Hello, Listener!'}
          </h1>
          {/* Adjust the ListItem container width */}
          <div
            className="max-w-md w-full grid gap-3 mt-4 relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <ListItem image="/images/liked_song.svg" name="Liked Songs" href="liked" />
          </div>
        </div>
      )}
      {children}
    </div>
  );
};
