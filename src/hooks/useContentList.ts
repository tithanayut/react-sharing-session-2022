import { useEffect, useState } from 'react';
import { api } from '../utils/axios';
import { ContentDto } from '../types/dto';

const useContentList = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [contents, setContents] = useState<ContentDto[]>([]);

  useEffect(() => {
    const fetchContents = async () => {
      try {
        const res = await api.get('/content');
        setContents(res.data.data);
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchContents();
  }, []);

  return { loading, error, contents };
};

export default useContentList;
