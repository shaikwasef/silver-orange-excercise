import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { IRepo } from '../interfaces/apiInterfaces/repo.interface';
import Styles from '../Styles/Components/repo-card.module.scss';

type PropsInterface = Pick<
  IRepo,
  'name' | 'description' | 'language' | 'forks'
>;

export default function RepositoryCard(props: PropsInterface) {
  const { name, description, language, forks } = props;

  return (
    <Card className={Styles.card}>
      <CardContent>
        <Typography variant="h5" component="div">
          {name}
        </Typography>
        <Typography
          className={Styles.description}
          variant="body2"
          color="text.secondary"
        >
          {description}
        </Typography>
      </CardContent>
      <div className={Styles.footer}>
        <Button size="small">{language}</Button>
        <Button size="small">{forks}</Button>
      </div>
    </Card>
  );
}
