import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { IRepo } from '../interfaces/apiInterfaces/repo.interface';

type PropsInterface = Pick<
  IRepo,
  'name' | 'description' | 'language' | 'forks'
>;

export default function RepositoryCard(props: PropsInterface) {
  const { name, description, language, forks } = props;

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardContent>
        <Typography gutterBottom={true} variant="h5" component="div">
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">{language}</Button>
        <Button size="small">{forks}</Button>
      </CardActions>
    </Card>
  );
}
