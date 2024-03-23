import {Search, Close, ArrowBack, NavigateNext, FavoriteBorder, Favorite} from '@mui/icons-material';

type Props = {
  color: string;
  height: number;
  type: string;
  width: number;
};

const Icons = {
  "Search": Search,
  "Close": Close,
  "ArrowBack": ArrowBack,
  "NavigateNext": NavigateNext,
  "FavoriteBorder": FavoriteBorder,
  "Favorite": Favorite
}

export const SvgIcon: React.FC<Props> = ({color, height, type, width}) => {
  // eslint-disable-next-line
  const Icon = Icons[type];
  return <Icon style={{color, height, width}} />;
};
