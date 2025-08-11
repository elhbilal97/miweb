import { useState } from "react";
import SearchInterface from "@/components/search-interface";
import { Search } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import type { SearchSuggestion } from "@shared/schema";

export default function Home() {
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const { data: popularSuggestions = [] } = useQuery({
    queryKey: ["/api/suggestions", { q: "" }],
    select: (data: SearchSuggestion[]) => data.slice(0, 6),
  });

  const handleSearch = (results: any[]) => {
    setSearchResults(results);
    setIsSearching(false);
  };

  const handleSearchStart = () => {
    setIsSearching(true);
  };

  return (
    <div className="min-h-screen hero-background">
      {/* Cosmic Background Elements */}
      <div className="futuristic-grid"></div>
      <div className="stars">
        <div className="star"></div>
        <div className="star"></div>
        <div className="star"></div>
        <div className="star"></div>
        <div className="star"></div>
        <div className="star"></div>
        <div className="star"></div>
        <div className="star"></div>
      </div>
      <div className="cosmic-particle" style={{top: '10%', left: '20%', animationDelay: '0s'}}></div>
      <div className="cosmic-particle" style={{top: '60%', left: '80%', animationDelay: '5s'}}></div>
      <div className="cosmic-particle" style={{top: '80%', left: '30%', animationDelay: '10s'}}></div>

      {/* Header */}
      <header className="bg-black/20 backdrop-blur-sm border-b border-cyan-500/20 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-8">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg flex items-center justify-center text-white font-bold shadow-lg shadow-cyan-500/25">
                  <Search className="w-4 h-4" />
                </div>
                <h1 className="text-xl font-bold gradient-text">BuscaYa</h1>
              </div>
              
              <nav className="hidden md:flex items-center space-x-6">
                <a href="#" className="text-cyan-300/80 hover:text-cyan-300 transition-colors text-sm relative group">
                  Descubrir
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-400 group-hover:w-full transition-all duration-300"></span>
                </a>
                <a href="#" className="text-cyan-300/80 hover:text-cyan-300 transition-colors text-sm relative group">
                  Popular
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-400 group-hover:w-full transition-all duration-300"></span>
                </a>
                <a href="#" className="text-cyan-300/80 hover:text-cyan-300 transition-colors text-sm relative group">
                  Recientes
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-400 group-hover:w-full transition-all duration-300"></span>
                </a>
                <a href="#" className="text-cyan-300/80 hover:text-cyan-300 transition-colors text-sm relative group">
                  Categorías
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-400 group-hover:w-full transition-all duration-300"></span>
                </a>
              </nav>
            </div>
            
            <div className="flex items-center space-x-4">
              <button className="text-cyan-300/80 hover:text-cyan-300 text-sm transition-colors">
                Acceder
              </button>
              <button className="bg-gradient-to-r from-cyan-500/20 to-purple-500/20 hover:from-cyan-500/30 hover:to-purple-500/30 text-cyan-300 px-4 py-2 rounded-full text-sm transition-all backdrop-blur-sm border border-cyan-500/30 shadow-lg shadow-cyan-500/10">
                Registrarse
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10">

        {/* Hero Section */}
        <div className="text-center py-16 px-6 fade-in relative">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 max-w-4xl mx-auto leading-tight">
            Obtén tu listado de{" "}
            <span className="gradient-text">opciones</span>{" "}
            en una simple búsqueda
          </h2>
          <p className="text-lg text-cyan-200/70 max-w-2xl mx-auto mb-12">
            No pierdas más tiempo filtrando resultados. Busca "restaurantes madrid" y obtén automáticamente los mejor valorados de Google Maps.
            Hoteles, spas, discotecas... todo con las mejores reseñas, al instante.
          </p>

          {/* Search Interface */}
          <div className="mb-8">
            <SearchInterface 
              onSearch={handleSearch}
              onSearchStart={handleSearchStart}
            />
          </div>

          {/* Trending Searches */}
          <div className="flex flex-wrap justify-center gap-2 max-w-2xl mx-auto">
            <span className="text-cyan-300/60 text-sm mr-2">Consultas populares:</span>
            {popularSuggestions.slice(0, 5).map((suggestion) => (
              <button
                key={suggestion.id}
                className="search-chip px-3 py-1 rounded-full text-sm"
                onClick={() => {
                  // Handle suggestion click
                }}
                data-testid={`trending-${suggestion.id}`}
              >
                {suggestion.suggestion}
              </button>
            ))}
          </div>
        </div>

        {/* Search Results */}
        {isSearching && (
          <div className="max-w-4xl mx-auto px-6 mb-8 slide-up">
            <div className="bg-black/30 backdrop-blur-sm rounded-2xl p-6 border border-cyan-500/30 shadow-xl shadow-cyan-500/10">
              <div className="flex items-center justify-center space-x-3">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-cyan-400"></div>
                <span className="text-cyan-300/80">Escaneando el cosmos...</span>
              </div>
            </div>
          </div>
        )}

        {searchResults.length > 0 && (
          <div className="max-w-4xl mx-auto px-6 mb-8 slide-up">
            <div className="bg-black/30 backdrop-blur-sm rounded-2xl p-6 border border-cyan-500/30 shadow-xl shadow-cyan-500/10">
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                <Search className="w-5 h-5 mr-2 text-cyan-400" />
                Datos encontrados
              </h3>
              <div className="space-y-4">
                {searchResults.map((result, index) => (
                  <div 
                    key={index}
                    className="p-4 border border-cyan-500/20 rounded-lg hover:bg-cyan-500/5 transition-all cursor-pointer hover:border-cyan-400/40 hover:shadow-lg hover:shadow-cyan-500/10"
                    data-testid={`result-item-${index}`}
                  >
                    <h4 className="font-medium text-white mb-1">{result.title}</h4>
                    <p className="text-cyan-200/70 text-sm">{result.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Bottom Section */}
        <div className="max-w-6xl mx-auto px-6 pb-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <button className="text-cyan-300/60 hover:text-cyan-300 transition-colors text-sm flex items-center space-x-1">
                <span>Popular</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>
            
            <button className="text-cyan-300/60 hover:text-cyan-300 transition-colors text-sm flex items-center space-x-1">
              <span>Filtros</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
              </svg>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}