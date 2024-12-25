import { WeatherData } from "@/api/types";
import { useFavorite } from "@/hooks/useFavourite";
import { Button } from "./ui/button";
import { Star } from "lucide-react";
import { toast } from "sonner";

type FavBtnProps = {
  data: WeatherData;
};

const FavBtn = ({ data }: FavBtnProps) => {
  const { addToFavorite, isFavorite, removeFavorite } = useFavorite();

  const isCurrentlyFav = isFavorite(data.coord.lat, data.coord.lon);

  const handleTogglEFav = () => {
    if (isCurrentlyFav) {
      removeFavorite.mutate(`${data.coord.lat}-${data.coord.lon}`);
      toast.error(`Removed ${data.name} from Favorites`);
    } else {
      addToFavorite.mutate({
        name: data.name,
        lat: data.coord.lat,
        lon: data.coord.lon,
        country: data.sys.country,
      });
      toast.success(`Added ${data.name} to Favorites`);
    }
  };

  return (
    <Button
      variant={`${isCurrentlyFav ? "default" : "outline"}`}
      size={"icon"}
      className={` ${
        isCurrentlyFav ? "bg-yellow-500 hover:bg-yellow-600" : ""
      }`}
      onClick={handleTogglEFav}
    >
      <Star className={`h-4 w-4 ${isCurrentlyFav ? "fill-current" : ""}`} />
    </Button>
  );
};

export default FavBtn;
