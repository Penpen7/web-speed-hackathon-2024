import { Close, Favorite, FavoriteBorder, NavigateNext, Search, ArrowBack } from '@mui/icons-material';

type Props = {
  color: string;
  height: number;
  type: keyof typeof Icons;
  width: number;
};

const Icons = {
  Close: Close,
  Favorite: Favorite,
  FavoriteBorder: FavoriteBorder,
  NavigateNext: NavigateNext,
  Search: Search,
  ArrowBack: ArrowBack,
};

export const SvgIcon: React.FC<Props> = ({ color, height, type, width }) => {
  const Icon = Icons[type];
  return <Icon style={{ color, height, width }} />;
};
