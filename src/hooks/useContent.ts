import { useEffect, useState } from 'react';
import { api } from '../utils/axios';
import { ContentDto } from '../types/dto';

const useContent = (id: string) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [content, setContent] = useState<ContentDto>();

  useEffect(() => {
    const fetchContent = async () => {
      try {
        setLoading(true);
        const res = await api.get(`/content/${id}`);
        setContent(res.data);
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchContent();
  }, [id]);

  return { loading, error, content };
};

export default useContent;
