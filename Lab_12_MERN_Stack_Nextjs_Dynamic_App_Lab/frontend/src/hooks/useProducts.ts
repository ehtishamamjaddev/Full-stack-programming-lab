import React, { useState, useEffect } from 'react';
import api from '../lib/api';

export function useProducts(query: string = '') {
  const [data, setData] = useState<any | null>(null);
  const [error, setError] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    api
      .get(`/products${query}`)
      .then((r) => {
        if (mounted) setData(r.data);
      })
      .catch((e) => {
        if (mounted) setError(e);
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });
    return () => {
      mounted = false;
    };
  }, [query]);

  return { data, error, loading };
}

export async function getProductById(id: string) {
  return api.get(`/products/${id}`).then((r) => r.data.product);
}
