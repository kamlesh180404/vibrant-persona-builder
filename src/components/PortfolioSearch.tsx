
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Portfolio } from '@/types';

interface PortfolioSearchProps {
  onSearch: (query: string) => Promise<Portfolio[]>;
}

export function PortfolioSearch({ onSearch }: PortfolioSearchProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Portfolio[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const navigate = useNavigate();

  const handleSearch = async () => {
    if (!query.trim()) return;
    
    setIsSearching(true);
    try {
      const searchResults = await onSearch(query);
      setResults(searchResults);
    } catch (error) {
      console.error('Search failed:', error);
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-4">
      <div className="flex gap-2">
        <Input
          type="text"
          placeholder="Search public portfolios..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
        />
        <Button onClick={handleSearch} disabled={isSearching}>
          <Search className="h-4 w-4 mr-2" />
          {isSearching ? 'Searching...' : 'Search'}
        </Button>
      </div>

      {results.length > 0 && (
        <div className="grid gap-4 mt-4">
          {results.map((portfolio) => (
            <div
              key={portfolio.id}
              className="p-4 border rounded-lg hover:bg-accent cursor-pointer"
              onClick={() => navigate(`/portfolio/${portfolio.slug}`)}
            >
              <h3 className="font-medium">{portfolio.title}</h3>
              {portfolio.summary && (
                <p className="text-sm text-muted-foreground mt-1">{portfolio.summary}</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
