import CircularProgress from '@mui/material/CircularProgress';
import { IApiError, ICommit } from '../interfaces';
import ReactMarkdown from 'react-markdown';
import DialogContent from '@mui/material/DialogContent';
import Typography from '@mui/material/Typography';
import ErrorComponent from './error-component';
import Styles from '../Styles/Components/repo-info-modal.module.scss';

interface PropsInterface {
  commitData: ICommit | null;
  markDownContent: string;
  loading: boolean;
  error?: IApiError;
  markDownContentError?: IApiError;
}

export default function ModalContent(props: PropsInterface) {
  const { commitData, markDownContent, loading, error, markDownContentError } =
    props;
  if (loading) {
    return <CircularProgress className={Styles.loaderClass} />;
  }
  if (error) {
    return <ErrorComponent error={error} />;
  }
  if (commitData) {
    return (
      <DialogContent>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          <span className={Styles.headings}>Author's name : </span>
          {commitData.commit.author.name}
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          <span className={Styles.headings}>Commit date : </span>
          {new Date(commitData.commit.author.date).toLocaleString()}
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          <span className={Styles.headings}>Commit : </span>
          {commitData.commit.message}
        </Typography>
        {markDownContent ? (
          <ReactMarkdown>{markDownContent}</ReactMarkdown>
        ) : markDownContentError ? (
          <ErrorComponent error={markDownContentError} />
        ) : (
          <div />
        )}
      </DialogContent>
    );
  }
  return <div />;
}
