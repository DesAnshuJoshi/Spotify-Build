'use client';

import { useState, useEffect } from 'react';

import { toast } from 'react-hot-toast';

import { useRouter } from 'next/navigation';

import { Button } from '@/components/Button';

import { useSubscribeModal } from '@/hooks/useSubscribeModal';
import { useUser } from '@/hooks/useUser';

import { postData } from '@/libs/helpers';

export const AccountContent = () => {
  const router = useRouter();
  const subscribeModal = useSubscribeModal();
  const { isLoading, user, userDetails, subscription } = useUser();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isLoading && !user) {
      router.replace('/');
    }
  }, [isLoading, user, router]);

  const redirectToCustomerPortal = async () => {
    setLoading(true);
    try {
      const { url, error } = await postData({
        url: '/api/create-portal-link',
      });
      window.location.assign(url);
    } catch (error) {
      if (error) {
        toast.error((error as Error).message);
      }
      setLoading(false);
    }
  };
  return (
    <div className="mb-7 px-6">

      {userDetails && (
        <div className="mb-4">
          <p className="text-lg font-semibold">Hello, {userDetails.full_name || `${userDetails.first_name} ${userDetails.last_name}`}!</p>
        </div>
      )}

      {!subscription && (
        <div className="flex flex-col gap-y-4">
          <p>You don&apos;t have an active plan.</p>
          <Button onClick={subscribeModal.onOpen} className="w-[300px]">
            Subscribe
          </Button>
        </div>
      )}
      {subscription && (
        <div className="flex flex-col gap-y-4">
          <p>
            You are currently on the <b>{subscription?.prices?.products?.name}</b> plan.
          </p>
          <Button
            onClick={redirectToCustomerPortal}
            disabled={loading || isLoading}
            className="w-[300px]"
          >
            Open customer portal
          </Button>
        </div>
      )}
    </div>
  );
};
