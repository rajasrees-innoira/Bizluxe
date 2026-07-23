// src/hooks/useApi.ts
//
// Local, backend-free stand-ins for the removed `@workspace/api-client-react`
// workspace package. Every component that used these hooks already has its
// own hardcoded fallback data (fallbackProperties, fallbackTestimonials,
// fallbackCarousel, fallbackStats, etc.) and only uses the API data when the
// hook returns >= N items. Returning `undefined` here means every component
// falls back to its static data automatically - no UI/behavior changes.
//
// If you later add a real backend, replace the bodies of these functions
// with real fetch/axios/react-query calls. The shapes (data/isLoading for
// queries, mutate/isPending for mutations) are kept identical so no
// component code needs to change again.

import { useState, useCallback } from 'react';

type QueryResult<T> = {
  data: T | undefined;
  isLoading: boolean;
};

type MutationOptions<TVars> = {
  onSuccess?: () => void;
  onError?: (error: unknown) => void;
};

type MutationResult<TVars> = {
  isPending: boolean;
  mutate: (vars: { data: TVars }, options?: MutationOptions<TVars>) => void;
};

// ---------------------------------------------------------------------------
// Queries - return no data so components use their built-in fallbacks
// ---------------------------------------------------------------------------

export function useListProperties(_params?: Record<string, unknown>): QueryResult<unknown[]> {
  return { data: undefined, isLoading: false };
}

export function useListTestimonials(_params?: Record<string, unknown>): QueryResult<unknown[]> {
  return { data: undefined, isLoading: false };
}

export function useGetStats(): QueryResult<Record<string, unknown>> {
  return { data: undefined, isLoading: false };
}

// ---------------------------------------------------------------------------
// Mutations - simulate a network round-trip then report success, so form UX
// (loading spinners, "submitted" states) behaves the same as before.
// ---------------------------------------------------------------------------

function useLocalMutation<TVars = unknown>(): MutationResult<TVars> {
  const [isPending, setIsPending] = useState(false);

  const mutate = useCallback((_vars: { data: TVars }, options?: MutationOptions<TVars>) => {
    setIsPending(true);
    // Simulate latency so the existing "Submitting..." UI is still visible.
    window.setTimeout(() => {
      setIsPending(false);
      options?.onSuccess?.();
    }, 500);
  }, []);

  return { isPending, mutate };
}

export function useBookConsultation(): MutationResult<{
  name: string;
  email: string;
  phone: string;
}> {
  return useLocalMutation();
}

export function useSubmitInquiry(): MutationResult<{
  name: string;
  email: string;
  phone: string;
  propertyType: string;
  location?: string;
  price?: string;
  message?: string;
}> {
  return useLocalMutation();
}