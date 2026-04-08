import React, { useState, useRef } from 'react';
import { useApp } from '../contexts/AppContext';
import { Button } from '../components/ui/Button';
import { UploadCloud, Search, CheckCircle2, Loader2, FileText } from 'lucide-react';
import { motion } from 'motion/react';
import { addSearchResult, mockMaps } from '../lib/mockData';
import { generateReadingMap } from '../services/geminiService';

export function GenerationCenter() {
  const { t, searchQuery, navigate } = useApp();
  const [status, setStatus] = useState<'idle' | 'generating' | 'done'>('idle');
  const [generatedId, setGeneratedId] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleGenerateFromFile = async () => {
    if (!selectedFile) return;
    setStatus('generating');
    
    try {
      const text = await selectedFile.text();
      // Truncate text if it's too long to avoid token limits
      const truncatedText = text.slice(0, 100000); 
      const newMap = await generateReadingMap(truncatedText, true);
      
      mockMaps.push(newMap);
      addSearchResult(newMap);
      
      setGeneratedId(newMap.id);
      setStatus('done');
    } catch (error) {
      console.error(error);
      setStatus('idle');
      alert('Generation failed. Please check console for details.');
    }
  };

  const handleGenerateFromQuery = async () => {
    if (!searchQuery) return;
    setStatus('generating');
    
    try {
      const newMap = await generateReadingMap(searchQuery, false);
      
      mockMaps.push(newMap);
      addSearchResult(newMap);
      
      setGeneratedId(newMap.id);
      setStatus('done');
    } catch (error) {
      console.error(error);
      setStatus('idle');
      alert('Generation failed. Please check console for details.');
    }
  };

  return (
    <div className="mx-auto max-w-5xl pb-12 min-h-screen bg-[#0f1117] text-zinc-300 px-4 sm:px-6 lg:px-8 pt-8">
      <div className="mb-8 sm:mb-10 text-center">
        <h1 className="text-2xl sm:text-3xl font-serif font-bold tracking-tight text-white">{t('gen', 'title')}</h1>
        <p className="mt-2 sm:mt-3 text-base sm:text-lg text-zinc-400">{t('gen', 'subtitle')}</p>
      </div>

      {status === 'idle' ? (
        <div className="grid gap-6 sm:gap-8 md:grid-cols-2">
          {/* Upload Card */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col rounded-3xl border border-white/5 bg-white/[0.02] p-6 sm:p-8 transition-colors hover:bg-white/[0.04]"
          >
            <div className="mb-4 sm:mb-6 flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-500">
              <UploadCloud className="h-6 w-6 sm:h-7 sm:w-7" />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">{t('gen', 'uploadTitle')}</h2>
            <p className="mt-2 text-sm sm:text-base text-zinc-400 flex-1">{t('gen', 'uploadDesc')}</p>
            
            <div className="mt-6 sm:mt-8 rounded-xl border-2 border-dashed border-white/10 bg-zinc-900/50 p-6 sm:p-8 text-center">
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileSelect} 
                className="hidden" 
                accept=".txt,.md,.csv" 
              />
              {!selectedFile ? (
                <>
                  <Button variant="secondary" className="w-full bg-zinc-800 hover:bg-zinc-700 text-white border-none" onClick={() => fileInputRef.current?.click()}>
                    Select File
                  </Button>
                  <p className="mt-3 text-xs text-zinc-500">Supported: .txt, .md (Max 50MB)</p>
                </>
              ) : (
                <div className="flex flex-col items-center gap-4">
                  <div className="flex items-center gap-2 text-amber-500">
                    <FileText className="h-5 w-5" />
                    <span className="text-sm font-medium truncate max-w-[200px]">{selectedFile.name}</span>
                  </div>
                  <div className="flex gap-2 w-full">
                    <Button variant="outline" className="flex-1 border-white/10" onClick={() => setSelectedFile(null)}>
                      Cancel
                    </Button>
                    <Button variant="primary" className="flex-1 bg-amber-500 hover:bg-amber-600 text-zinc-900 border-none" onClick={handleGenerateFromFile}>
                      {t('gen', 'uploadBtn')}
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>

          {/* Paid Card */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col rounded-3xl border border-white/5 bg-white/[0.02] p-6 sm:p-8 transition-colors hover:bg-white/[0.04] relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-4">
              <span className="inline-flex items-center rounded-full bg-amber-500/10 border border-amber-500/20 px-3 py-1 text-xs font-bold text-amber-500">
                PRO
              </span>
            </div>
            <div className="mb-4 sm:mb-6 flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-500">
              <Search className="h-6 w-6 sm:h-7 sm:w-7" />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">{t('gen', 'paidTitle')}</h2>
            <p className="mt-2 text-sm sm:text-base text-zinc-400 flex-1">{t('gen', 'paidDesc')}</p>
            
            <div className="mt-6 sm:mt-8 space-y-4">
              <div className="rounded-xl border border-white/10 bg-zinc-900/50 px-4 py-3">
                <label className="text-[10px] sm:text-xs font-medium text-zinc-500 uppercase tracking-wider">Target Book</label>
                <div className="font-medium text-white mt-1 text-sm sm:text-base">{searchQuery || 'Enter book title...'}</div>
              </div>
              <Button 
                variant="primary" 
                className="w-full h-12 sm:h-14 text-base sm:text-lg bg-amber-500 hover:bg-amber-600 text-zinc-900 border-none" 
                onClick={handleGenerateFromQuery}
                disabled={!searchQuery}
              >
                {t('gen', 'payBtn')}
              </Button>
            </div>
          </motion.div>
        </div>
      ) : (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mx-auto max-w-2xl rounded-3xl border border-white/5 bg-white/[0.02] p-8 sm:p-12 text-center"
        >
          {status === 'generating' ? (
            <>
              <Loader2 className="mx-auto h-12 w-12 sm:h-16 sm:w-16 animate-spin text-amber-500" />
              <h2 className="mt-4 sm:mt-6 text-xl sm:text-2xl font-bold text-white">{t('gen', 'statusGenerating')}</h2>
              <p className="mt-2 text-sm sm:text-base text-zinc-400">This usually takes 1-3 minutes. You can leave this page, we'll notify you when it's done.</p>
            </>
          ) : (
            <>
              <div className="mx-auto flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-500">
                <CheckCircle2 className="h-8 w-8 sm:h-10 sm:w-10" />
              </div>
              <h2 className="mt-4 sm:mt-6 text-xl sm:text-2xl font-bold text-white">{t('gen', 'statusDone')}</h2>
              <div className="mt-6 sm:mt-8">
                <Button 
                  variant="primary" 
                  size="lg" 
                  className="w-full sm:w-auto bg-amber-500 hover:bg-amber-600 text-zinc-900 border-none"
                  onClick={() => {
                    if (generatedId) {
                      navigate('map', { mapId: generatedId });
                    }
                  }}
                >
                  View Reading Map
                </Button>
              </div>
            </>
          )}
        </motion.div>
      )}
    </div>
  );
}
