import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import { Button } from '../components/ui/Button';
import { BookCard } from '../components/ui/BookCard';
import { mockSearchResults, addSearchResult } from '../lib/mockData';
import { motion } from 'motion/react';

export function SearchResults() {
  const { t, searchQuery, navigate } = useApp();
  const [localQuery, setLocalQuery] = useState(searchQuery);
  const [results, setResults] = useState(mockSearchResults);

  useEffect(() => {
    if (searchQuery) {
      const lowerQuery = searchQuery.toLowerCase();
      const filtered = mockSearchResults.filter(
        (book) =>
          book.title.toLowerCase().includes(lowerQuery) ||
          book.author.toLowerCase().includes(lowerQuery)
      );

      if (filtered.length === 0) {
        // Create a temporary result for the search query
        const newResult = {
          id: `temp-${Date.now()}`,
          title: searchQuery,
          author: 'Unknown Author',
          cover: `https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=800&auto=format&fit=crop`,
          oneLiner: { zh: '', en: '' },
          saves: 0,
          status: 'no_map_paid',
        };
        setResults([newResult as any]);
      } else {
        setResults(filtered);
      }
    } else {
      setResults(mockSearchResults);
    }
  }, [searchQuery]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (localQuery.trim()) {
      navigate('search', { query: localQuery });
    }
  };

  return (
    <div className="flex flex-col gap-6 sm:gap-8 pb-12 min-h-screen bg-[#0f1117] text-zinc-300 px-4 sm:px-6 lg:px-8 pt-8">
      <div className="rounded-2xl bg-white/[0.02] p-4 sm:p-6 border border-white/5">
        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3 sm:gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-zinc-500" />
            <input
              type="text"
              value={localQuery}
              onChange={(e) => setLocalQuery(e.target.value)}
              placeholder={t('nav', 'searchPlaceholder')}
              className="w-full rounded-xl border border-white/10 bg-zinc-900/50 py-3 pl-12 pr-4 text-base text-white focus:border-amber-500/50 focus:outline-none focus:ring-1 focus:ring-amber-500/50 placeholder:text-zinc-600"
            />
          </div>
          <Button type="submit" size="lg" className="w-full sm:w-auto bg-amber-500 hover:bg-amber-600 text-zinc-900">Search</Button>
        </form>
      </div>

      <div>
        <h2 className="text-lg sm:text-xl font-medium text-zinc-400 mb-4 sm:mb-6">
          {t('search', 'resultsFor').replace('{query}', searchQuery || 'All')}
        </h2>
        
        <div className="grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {results.map((book, i) => (
            <motion.div
              key={book.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
            >
              <BookCard book={book} />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
