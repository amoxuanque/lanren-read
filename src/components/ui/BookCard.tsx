import React from 'react';
import { useApp } from '../../contexts/AppContext';
import { Button } from './Button';
import { FileText, Upload, CreditCard } from 'lucide-react';

interface BookCardProps {
  book: any;
}

export function BookCard({ book }: BookCardProps) {
  const { language, t, navigate } = useApp();

  const handleAction = () => {
    if (book.status === 'has_map') {
      navigate('map', { mapId: book.id });
    } else {
      navigate('gen', { query: book.title });
    }
  };

  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl border border-white/5 bg-white/[0.02] transition-all hover:bg-white/[0.04]">
      <div className="aspect-[3/4] w-full overflow-hidden bg-zinc-900 relative">
        <img 
          src={book.cover} 
          alt={book.title} 
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105 opacity-80"
          referrerPolicy="no-referrer"
        />
        <div className="absolute top-3 right-3 flex gap-2">
          {book.status === 'has_map' && (
            <span className="rounded-full bg-amber-500/10 border border-amber-500/20 px-2.5 py-1 text-xs font-medium text-amber-500">
              {t('search', 'hasMap')}
            </span>
          )}
        </div>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-bold text-white line-clamp-1">{book.title}</h3>
        <p className="mt-1 text-sm text-zinc-500 line-clamp-1">{book.author}</p>
        
        {book.oneLiner && book.oneLiner[language] && (
          <p className="mt-3 text-sm text-zinc-400 line-clamp-2 flex-1">
            "{book.oneLiner[language]}"
          </p>
        )}
        
        <div className="mt-5">
          {book.status === 'has_map' ? (
            <Button className="w-full bg-amber-500 hover:bg-amber-600 text-zinc-900 border-none" onClick={handleAction}>
              <FileText className="mr-2 h-4 w-4" />
              {t('search', 'viewMap')}
            </Button>
          ) : book.status === 'no_map_upload' ? (
            <Button variant="secondary" className="w-full bg-zinc-800 hover:bg-zinc-700 text-white border-none" onClick={handleAction}>
              <Upload className="mr-2 h-4 w-4" />
              {t('search', 'uploadGenerate')}
            </Button>
          ) : (
            <Button variant="outline" className="w-full border-white/10 hover:bg-white/5 text-zinc-300" onClick={handleAction}>
              <CreditCard className="mr-2 h-4 w-4" />
              {t('search', 'paidGenerate')}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
