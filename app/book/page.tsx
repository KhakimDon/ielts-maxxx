"use client"

import { useState, useCallback, useEffect } from "react";
import dynamic from "next/dynamic";
import BookAccessRoute from "@/app/components/BookAccessRoute";

// Динамический импорт PDF компонентов для избежания SSR проблем
const Document = dynamic(() => import("react-pdf").then((mod) => mod.Document), { 
  ssr: false,
  loading: () => <div className="text-center text-gray-400">Загрузка Книги компонента...</div>
});
const Page = dynamic(() => import("react-pdf").then((mod) => mod.Page), { 
  ssr: false,
  loading: () => <div className="text-center text-gray-400">Загрузка страницы...</div>
});

// Импорт CSS
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

export default function BookPage() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [numPages, setNumPages] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isPdfReady, setIsPdfReady] = useState(false);
  const [isPageTransitioning, setIsPageTransitioning] = useState(false);
  const [pagesLoaded, setPagesLoaded] = useState<Set<number>>(new Set());
  const [isMobile, setIsMobile] = useState(false);
  const [isSmallMobile, setIsSmallMobile] = useState(false);
  const [containerHeight, setContainerHeight] = useState(826.49);
  const [mobileViewportWidth, setMobileViewportWidth] = useState(585);
  const [touchStart, setTouchStart] = useState<{ x: number; y: number } | null>(null);
  const [touchEnd, setTouchEnd] = useState<{ x: number; y: number } | null>(null);

  // Определение размера экрана
  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 1200);
      setIsSmallMobile(width < 500);
      
      // Для маленьких экранов используем полную ширину viewport
      if (width < 500) {
        setMobileViewportWidth(width); // 100% ширины экрана
        // Вычисляем высоту пропорционально ширине (стандартное соотношение A4: 1.414)
        setContainerHeight(width * 1.414);
        // setViewportWidth(width); // для PDF страниц
      } else {
        // setViewportWidth(585); // стандартная ширина
        setContainerHeight(826.49); // стандартная высота
        setMobileViewportWidth(585);
      }
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Обработчик событий полноэкранного режима
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isFullscreen) {
        toggleFullscreen();
      }
    };

    const handleFullscreenChange = () => {
      if (document.fullscreenElement) {
        setIsFullscreen(true);
      } else {
        setIsFullscreen(false);
      }
    };

    if (isFullscreen) {
      document.addEventListener('keydown', handleKeyDown);
    }
    
    document.addEventListener('fullscreenchange', handleFullscreenChange);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, [isFullscreen]);

  // Настройка PDF worker при монтировании компонента
  useEffect(() => {
    const setupPdfWorker = async () => {
      try {
        const pdfjs = await import("react-pdf");
        // Используем локальный worker из public папки
        pdfjs.pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.js";
        console.log("Книга worker настроен:", pdfjs.pdfjs.GlobalWorkerOptions.workerSrc);
        setIsPdfReady(true);
        console.log("Книга компоненты готовы к загрузке");
      } catch (error) {
        console.error("Ошибка настройки Книги worker:", error);
        setError("Ошибка инициализации книги");
      }
    };
    setupPdfWorker();
  }, []);

  const onDocumentLoadSuccess = useCallback(({ numPages }: { numPages: number }) => {
    console.log("PDF загружен успешно, страниц:", numPages);
    setNumPages(numPages);
    // setLoadingProgress(100);
    setError(null);
    // Небольшая задержка для плавности
    setTimeout(() => {
      setIsLoading(false);
    }, 100);
  }, []);

  const onDocumentLoadProgress = useCallback(({ loaded, total }: { loaded: number; total: number }) => {
    const progress = Math.round((loaded / total) * 100);
    console.log(`PDF загрузка: ${loaded}/${total} (${progress}%)`);
  }, []);

  const onDocumentLoadError = useCallback((error: Error) => {
    console.error("Ошибка загрузки PDF:", error);
    setError(`Ошибка загрузки PDF файла: ${error.message}`);
    setIsLoading(false);
    // setLoadingProgress(0);
  }, []);

  const onPageLoadSuccess = useCallback((pageNumber: number) => {
    console.log(`Страница ${pageNumber} загружена и закэширована`);
    setPagesLoaded(prev => new Set([...prev, pageNumber]));
  }, []);

  const isPageLoaded = useCallback((pageNumber: number) => {
    return pagesLoaded.has(pageNumber);
  }, [pagesLoaded]);

  // Предзагрузка соседних страниц
  useEffect(() => {
    const preloadPages = [currentPage, currentPage + 1, currentPage + 2];
    preloadPages.forEach(pageNum => {
      if (pageNum <= numPages && !isPageLoaded(pageNum)) {
        // Страница будет загружена автоматически при рендере
        console.log(`Предзагрузка страницы ${pageNum}`);
      }
    });
  }, [currentPage, numPages, isPageLoaded]);

  const goToPrevPage = () => {
    if (currentPage > 1 && !isPageTransitioning) {
      setIsPageTransitioning(true);
      // На мобильных переключаем по одной странице, на десктопах по две
      const decrement = isMobile ? 1 : 2;
      setCurrentPage(prev => Math.max(prev - decrement, 1));
      setTimeout(() => setIsPageTransitioning(false), 300);
    }
  };

  const goToNextPage = () => {
    if (currentPage < numPages && !isPageTransitioning) {
      setIsPageTransitioning(true);
      // На мобильных переключаем по одной странице, на десктопах по две
      const increment = isMobile ? 1 : 2;
      setCurrentPage(prev => Math.min(prev + increment, numPages));
      setTimeout(() => setIsPageTransitioning(false), 300);
    }
  };

  const toggleFullscreen = () => {
    if (!isFullscreen) {
      const element = document.documentElement;
      if (element.requestFullscreen) {
        element.requestFullscreen().then(() => {
          setIsFullscreen(true);
        }).catch((err) => {
          console.error('Ошибка входа в полноэкранный режим:', err);
        });
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().then(() => {
          setIsFullscreen(false);
        }).catch((err) => {
          console.error('Ошибка выхода из полноэкранного режима:', err);
        });
      }
    }
  };

  // Обработчики свайпов для мобильных устройств
  const handleTouchStart = (e: React.TouchEvent) => {
    if (isFullscreen && isSmallMobile) {
      setTouchEnd(null);
      setTouchStart({
        x: e.targetTouches[0].clientX,
        y: e.targetTouches[0].clientY
      });
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (isFullscreen && isSmallMobile) {
      setTouchEnd({
        x: e.targetTouches[0].clientX,
        y: e.targetTouches[0].clientY
      });
    }
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd || !isFullscreen || !isSmallMobile) return;
    
    const deltaX = touchStart.x - touchEnd.x;
    const deltaY = Math.abs(touchStart.y - touchEnd.y);
    const minSwipeDistance = 50;
    
    // Проверяем, что это горизонтальный свайп (не вертикальный)
    if (Math.abs(deltaX) > minSwipeDistance && deltaY < 100) {
      if (deltaX > 0) {
        // Свайп влево - следующая страница
        goToNextPage();
      } else {
        // Свайп вправо - предыдущая страница
        goToPrevPage();
      }
    }
    
    setTouchStart(null);
    setTouchEnd(null);
  };
  // Отладочная информация
  console.log("Render state:", { isPdfReady, isLoading, error, currentPage, numPages });

  return (
    <BookAccessRoute>
      <div className={isFullscreen ? "fixed inset-0 bg-black z-50" : ""}>
        {!isFullscreen && (
          <div className="text-center bg-black pb-2 pt-15">
            <h1 className="text-4xl font-bold text-[#fca311] mb-4">IELTS MAXXX 1.0</h1>
            <p className="text-gray-400">Приятного чтения!</p>
          </div>
        )}
       {/* PDF контейнер */}
       <div 
         className={`text-white flex items-center justify-center ${
           isFullscreen 
             ? isSmallMobile 
               ? 'h-[92vh] w-full bg-black' 
               : 'h-[92vh] w-full bg-black'
             : isSmallMobile 
               ? 'p-4 pt-8 pb-20 bg-black' 
               : 'p-4 pt-8 bg-black'
         }`}
         onTouchStart={handleTouchStart}
         onTouchMove={handleTouchMove}
         onTouchEnd={handleTouchEnd}
       >
         <div className={`w-full bg-white border-[4px] border-[#F7971D] flex ${
           isSmallMobile 
             ? 'w-full' 
             : 'max-w-[585px] xl:max-w-[1170px]'
         }`} style={{ 
           height: isFullscreen ? (isSmallMobile ? 'auto' : '100%') : `${containerHeight}px`,
           width: isSmallMobile ? '100%' : undefined,
           maxHeight: isFullscreen && isSmallMobile ? '90vh' : undefined
         }}>
           {error ? (
             <div className="w-full h-full flex items-center justify-center">
               <div className="text-center">
                 <div className="text-red-500 text-6xl mb-4">⚠️</div>
                 <p className="text-red-400 text-xl mb-2">Ошибка загрузки</p>
                 <p className="text-gray-400">{error}</p>
                 <button 
                   onClick={() => {
                     setError(null);
                     setIsLoading(true);
                   }}
                   className="mt-4 px-6 py-2 bg-[#fca311] text-black rounded-lg hover:bg-[#E8850A] transition-colors"
                 >
                   Попробовать снова
                 </button>
               </div>
             </div>
           ) : !isPdfReady ? (
             <div className="w-full h-full flex items-center justify-center">
               <div className="text-center">
                 <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#fca311] mx-auto mb-4"></div>
                 <p className="text-gray-400">Инициализация Книги...</p>
               </div>
             </div>
           ) : (
             <Document
               file="/book.pdf"
               onLoadSuccess={onDocumentLoadSuccess}
               onLoadProgress={onDocumentLoadProgress}
               onLoadError={onDocumentLoadError}
               className="w-full h-full"
               loading={
                 <div className={`flex flex-col items-center justify-center text-black ${
                   isSmallMobile ? '!min-h-[400px]' : ' !min-h-[800px]'
                 }`}>
                   <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#fca311] mb-2"></div>
                   <p>Загрузка PDF...</p>
                 </div>
               }
             >
               <div className="flex w-full h-full">
                 {/* Левая страница - показывается всегда */}
                 <div className="w-full xl:w-1/2 h-full bg-white xl:border-r border-gray-600 flex items-center justify-center overflow-hidden">
                   {isPageLoaded(currentPage) ? (
                     <Page
                       pageNumber={currentPage}
                       width={isSmallMobile ? mobileViewportWidth : 585}
                       className={`transition-all duration-300 ${isPageTransitioning ? 'opacity-50 scale-95' : 'opacity-100 scale-100'}`}
                       renderTextLayer={false}
                       renderAnnotationLayer={false}
                     />
                   ) : (
                     <Page
                       pageNumber={currentPage}
                       width={isSmallMobile ? mobileViewportWidth : 585}
                       className={`transition-all duration-300 ${isPageTransitioning ? 'opacity-50 scale-95' : 'opacity-100 scale-100'}`}
                       onLoadSuccess={() => onPageLoadSuccess(currentPage)}
                       renderTextLayer={false}
                       renderAnnotationLayer={false}
                       loading={
                         <div className={`flex h-full flex-col items-center justify-center text-black ${
                           isSmallMobile ? '!min-h-[400px]' : ' !min-h-[800px]'
                         }`}>
                           <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[#fca311] mb-1"></div>
                           <p className="text-sm">Загрузка страницы {currentPage}...</p>
                         </div>
                       }
                     />
                   )}
                 </div>

                 {/* Правая страница - показывается только на экранах >= 1200px */}
                 <div className="hidden xl:flex w-1/2 h-full bg-white items-center justify-center overflow-hidden">
                   {currentPage < numPages ? (
                     isPageLoaded(currentPage + 1) ? (
                       <Page
                         pageNumber={currentPage + 1}
                         width={isSmallMobile ? mobileViewportWidth : 585}
                         className={`transition-all duration-300 ${isPageTransitioning ? 'opacity-50 scale-95' : 'opacity-100 scale-100'}`}
                         renderTextLayer={false}
                         renderAnnotationLayer={false}
                       />
                     ) : (
                       <Page
                         pageNumber={currentPage + 1}
                         width={isSmallMobile ? mobileViewportWidth : 585}
                         className={`transition-all duration-300 ${isPageTransitioning ? 'opacity-50 scale-95' : 'opacity-100 scale-100'}`}
                         onLoadSuccess={() => onPageLoadSuccess(currentPage + 1)}
                         renderTextLayer={false}
                         renderAnnotationLayer={false}
                         loading={
                           <div className={`flex flex-col items-center justify-center text-black ${
                             isSmallMobile ? 'h-[400px]' : 'h-[400px] xl:h-[800px]'
                           }`}>
                             <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[#fca311] mb-1"></div>
                             <p className="text-sm">Загрузка страницы {currentPage + 1}...</p>
                           </div>
                         }
                       />
                     )
                   ) : (
                     <div className="text-center text-gray-400">
                       
                     </div>
                   )}
                 </div>
               </div>
             </Document>
           )}
         </div>
       </div>
       
       {/* Кнопки навигации для полноэкранного режима */}
       {isFullscreen && (
         <div className="h-[10vh] bg-black flex items-center justify-center gap-4">
           {/* Кнопка назад */}
           <button 
             onClick={goToPrevPage}
             disabled={currentPage <= 1 || isPageTransitioning}
             className="px-[18px] cursor-pointer h-[51px] bg-[#F7971D] text-black rounded-lg flex items-center justify-center hover:bg-[#E8850A] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
           >
             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
               <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18" />
             </svg>
           </button>

           {/* Индикатор страниц */}
           <button className="px-[18px] font-medium h-[51px] bg-[#F7971D] text-black rounded-lg flex items-center justify-center hover:bg-[#E8850A] transition-colors">
             {isMobile 
               ? `${currentPage}/${numPages} ${isPageLoaded(currentPage) ? '✓' : '⏳'}`
               : `${currentPage}-${Math.min(currentPage + 1, numPages)}/${numPages} ${isPageLoaded(currentPage) && isPageLoaded(currentPage + 1) ? '✓' : '⏳'}`
             }
           </button>

           {/* Кнопка вперед */}
           <button 
             onClick={goToNextPage}
             disabled={currentPage >= numPages || isPageTransitioning}
             className="px-[18px] cursor-pointer h-[51px] bg-[#F7971D] text-black rounded-lg flex items-center justify-center hover:bg-[#E8850A] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
           >
             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
               <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
             </svg>
           </button>

           {/* Кнопка выхода из полноэкранного режима */}
           <button 
             onClick={toggleFullscreen}
             className="px-[18px] cursor-pointer h-[51px] bg-[#F7971D] text-black rounded-lg flex items-center justify-center hover:bg-[#E8850A] transition-colors"
           >
             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
               <path strokeLinecap="round" strokeLinejoin="round" d="M9 9V4.5M9 9H4.5M9 9 3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5 5.25 5.25" />
             </svg>
           </button>
         </div>
       )}
       
       {/* Кнопки навигации для маленьких экранов */}
       {isSmallMobile && !isFullscreen && (
         <div className="fixed bottom-0 left-0 right-0 bg-black flex gap-4 justify-center py-4 z-50">
           {/* Кнопка назад */}
           <button 
             onClick={goToPrevPage}
             disabled={currentPage <= 1 || isPageTransitioning}
             className="px-[18px] cursor-pointer h-[51px] bg-[#F7971D] text-black rounded-lg flex items-center justify-center hover:bg-[#E8850A] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
           >
             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
               <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18" />
             </svg>
           </button>

           {/* Индикатор страниц */}
           <button className="px-[18px] font-medium h-[51px] bg-[#F7971D] text-black rounded-lg flex items-center justify-center hover:bg-[#E8850A] transition-colors">
             {isMobile 
               ? `${currentPage}/${numPages} ${isPageLoaded(currentPage) ? '✓' : '⏳'}`
               : `${currentPage}-${Math.min(currentPage + 1, numPages)}/${numPages} ${isPageLoaded(currentPage) && isPageLoaded(currentPage + 1) ? '✓' : '⏳'}`
             }
           </button>

           {/* Кнопка вперед */}
           <button 
             onClick={goToNextPage}
             disabled={currentPage >= numPages || isPageTransitioning}
             className="px-[18px] cursor-pointer h-[51px] bg-[#F7971D] text-black rounded-lg flex items-center justify-center hover:bg-[#E8850A] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
           >
             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
               <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
             </svg>
           </button>

           {/* Кнопка полноэкранного режима */}
           <button 
             onClick={toggleFullscreen}
             className="px-[18px] cursor-pointer h-[51px] bg-[#F7971D] text-black rounded-lg flex items-center justify-center hover:bg-[#E8850A] transition-colors"
           >
             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
               <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
             </svg>
           </button>
         </div>
       )}

      <div className="h-[100px] bg-black"></div>

       {/* Фиксированные кнопки навигации для больших экранов */}
       {!isSmallMobile && !isFullscreen && (
         <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 flex gap-4 z-50">
         {/* Кнопка назад */}
         <button 
           onClick={goToPrevPage}
           disabled={currentPage <= 1 || isPageTransitioning}
           className="px-[18px] cursor-pointer h-[51px] bg-[#F7971D] text-black rounded-lg flex items-center justify-center hover:bg-[#E8850A] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
         >
           <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
             <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18" />
           </svg>
         </button>

         {/* Индикатор страниц */}
         <button className="px-[18px] font-medium h-[51px] bg-[#F7971D] text-black rounded-lg flex items-center justify-center hover:bg-[#E8850A] transition-colors">
           {isMobile 
             ? `${currentPage}/${numPages} ${isPageLoaded(currentPage) ? '✓' : '⏳'}`
             : `${currentPage}-${Math.min(currentPage + 1, numPages)}/${numPages} ${isPageLoaded(currentPage) && isPageLoaded(currentPage + 1) ? '✓' : '⏳'}`
           }
         </button>

         {/* Кнопка вперед */}
         <button 
           onClick={goToNextPage}
           disabled={currentPage >= numPages || isPageTransitioning}
           className="px-[18px] cursor-pointer h-[51px] bg-[#F7971D] text-black rounded-lg flex items-center justify-center hover:bg-[#E8850A] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
         >
           <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
             <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
           </svg>
         </button>

         {/* Кнопка полноэкранного режима */}
         <button 
           onClick={toggleFullscreen}
           className="px-[18px] cursor-pointer h-[51px] bg-[#F7971D] text-black rounded-lg flex items-center justify-center hover:bg-[#E8850A] transition-colors"
         >
           <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
             <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
           </svg>
         </button>
       </div>
       )}
      </div>
    </BookAccessRoute>
  );
}