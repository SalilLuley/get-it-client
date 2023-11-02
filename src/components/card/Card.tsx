import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import icon from "../../assets/parko_logo.png";

interface PropsActionCard {
  color: string;
  index: number;
}

export default function ActionAreaCard(propsActionCard: PropsActionCard) {
  const { color, index } = propsActionCard;
  console.log(index);
  return index === 0 ? (
    <Card sx={{ maxWidth: 500, m: 2, borderRadius: 5, bgcolor: color }}>
      <CardActionArea>
        <CardMedia
          component="img"
          image={icon}
          alt="green iguana"
          sx={{ m: 2, p: 5 }}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Station 1
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book.
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  ) : (
    <Card sx={{ maxWidth: 500, m: 2, borderRadius: 5, bgcolor: color }}>
      <CardActionArea>
        <CardMedia
          component="img"
          image={icon}
          alt="green iguana"
          sx={{ m: 2, p: 5 }}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Station 1
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book.
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
