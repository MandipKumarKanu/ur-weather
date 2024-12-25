import {
  Clock,
  Loader2,
  Search,
  SearchIcon,
  Star,
  XCircle,
} from "lucide-react";
import { Button } from "./ui/button";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "./ui/command";
import { useState } from "react";
import { useLocationSearch } from "@/hooks/useWeather";
import { useNavigate } from "react-router-dom";
import { useSearchHistory } from "@/hooks/useSearchHistory";
import { format } from "date-fns";
import { useFavorite } from "@/hooks/useFavourite";

const CitySearch = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [query, setQuery] = useState<string>("");
  const navigate = useNavigate();

  const { data: locations, isLoading } = useLocationSearch(query);

  const { history, clearHistory, addToHistory } = useSearchHistory();
  const { favorites } = useFavorite();

  console.log(locations);

  const handleDialogOpen = () => {
    setOpen(true);
  };

  const handleSelect = (cityData: string) => {
    const [lat, lon, name, country] = cityData.split("|");

    addToHistory.mutate({
      query,
      name,
      lat: parseFloat(lat),
      lon: parseFloat(lon),
      country,
    });

    setOpen(false);
    navigate(`/city/${name}?lat=${lat}&lon=${lon}`);
  };
  return (
    <>
      <Button
        onClick={handleDialogOpen}
        variant={"outline"}
        className="relative w-full justify-start text-sm text-muted-foreground sm:pr-12 md:w-40 lg:w-64"
      >
        <SearchIcon className="h-5 w-5 text-gray-500" />
        <span className="ml-2">Search cities...</span>
      </Button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput
          placeholder="Search cities..."
          value={query}
          onValueChange={setQuery}
        />
        <CommandList>
          {query.length > 2 && !isLoading && (
            <CommandEmpty>No Cities found.</CommandEmpty>
          )}

          {favorites.length > 0 && (
            <>
              <CommandGroup heading="Favorites">
                {favorites.map((location) => {
                  return (
                    <CommandItem
                      key={`${location.id}`}
                      value={`${location.lat}|${location.lon}|${location.name}|${location.country}`}
                      onSelect={handleSelect}
                    >
                      <Star className="mr-2 w-4 h-4 text-yellow-500" />
                      <span>{location.name},</span>
                      {location.state && (
                        <span className="text-sm text-muted-foreground">
                          {location.state},
                        </span>
                      )}
                      <span className="text-sm text-muted-foreground">
                        {location.country}
                      </span>
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            </>
          )}

          {history.length > 0 && (
            <>
              <CommandSeparator />
              <CommandGroup>
                <div className="flex justify-between items-center px-2 my-2">
                  <p className="text-xs text-muted-foreground">
                    Recent Searches
                  </p>
                  <Button
                    variant={"ghost"}
                    size={"sm"}
                    onClick={() => clearHistory.mutate()}
                  >
                    <XCircle className="h-4 w-4" />
                    Clear
                  </Button>
                </div>
                {history.map((location) => {
                  return (
                    <CommandItem
                      key={`${location.lat}-${location.lon}`}
                      value={`${location.lat}|${location.lon}|${location.name}|${location.country}`}
                      onSelect={handleSelect}
                    >
                      <Clock className="mr-2 w-4 h-4 text-muted-foreground" />
                      <span>{location.name},</span>
                      {location.state && (
                        <span className="text-sm text-muted-foreground">
                          {location.state},
                        </span>
                      )}
                      <span className="text-sm text-muted-foreground">
                        {location.country}
                      </span>
                      <span className="text-xs text-muted-foreground ml-auto">
                        {format(location.searchedAt, "MMM d, h:mm a")}
                      </span>
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            </>
          )}

          <CommandSeparator />

          {locations && locations.length > 0 && (
            <CommandGroup heading="Suggestions">
              {isLoading && (
                <div className="flex items-center justify-center p-4">
                  <Loader2 className="h-4 w-4 animate-spin" />
                </div>
              )}
              {locations.map((location) => {
                return (
                  <CommandItem
                    key={`${location.lat}-&{location.lon}`}
                    value={`${location.lat}|${location.lon}|${location.name}|${location.country}`}
                    onSelect={handleSelect}
                  >
                    <Search className="mr-2 w-4 h-4" />
                    <span>{location.name},</span>
                    {location.state && (
                      <span className="text-sm text-muted-foreground">
                        {location.state},
                      </span>
                    )}
                    <span className="text-sm text-muted-foreground">
                      {location.country}
                    </span>
                  </CommandItem>
                );
              })}
            </CommandGroup>
          )}
        </CommandList>
      </CommandDialog>
    </>
  );
};

export default CitySearch;
