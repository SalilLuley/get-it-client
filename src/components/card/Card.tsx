import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";

interface PropsActionCard {
  color: string;
  index: number;
}

export default function ActionAreaCard(propsActionCard: PropsActionCard) {
  const { color, index } = propsActionCard;
  return (
    <Card
      sx={{
        width: { xs: 1 },
        m: 2,
        borderRadius: 5,
        bgcolor: color,
      }}
    >
      <CardActionArea>
        <CardMedia
          component="img"
          image={
            "https://info.hignell.com/hubfs/HR/Images/Blog%20Images/reserved%20parking%20spot_10441780.jpg"
          }
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Station {index + 1}
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
