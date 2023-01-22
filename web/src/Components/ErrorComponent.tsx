import { IApiError } from '../interfaces/use-api.interface';
import Styles from '../Styles/Components/error-components.module.scss';

interface PropsInterface {
  error: IApiError;
}
export default function ErrorComponent(props: PropsInterface) {
  const { error } = props;
  return (
    <div className={Styles.errorContainer}>
      <h1>{error.status}</h1>
      <h2>{error.message}</h2>
    </div>
  );
}
