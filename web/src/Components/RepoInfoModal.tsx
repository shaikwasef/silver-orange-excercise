import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import { IRepo } from '../interfaces/apiInterfaces/repo.interface';
import { Commit } from '../interfaces/apiInterfaces/commit.interface';
import useApi from '../helpers/hooks/use-api';
import { apiEndPoints } from '../helpers/api-helper';
import useApiMarkDown from '../helpers/hooks/use-api-markdown';
import CloseIcon from '@mui/icons-material/Close';
import Styles from '../Styles/Components/repo-info-modal.module.scss';
import { ModalContent } from './ModalContent';

interface PropsInterface {
  open: boolean;
  handleClose: () => void;
  repo: IRepo;
}

export default function RepoInfoModal(props: PropsInterface) {
  const { open, handleClose, repo } = props;
  const [commits, error, loading] = useApi<Commit>(
    `${apiEndPoints.GIT_REPOS_API}/${repo.full_name}/commits`
  );
  const [markDownContent, markDownContentError] = useApiMarkDown(
    'https://raw.githubusercontent.com/silverorange/admin/master/README.md'
  );
  const commitData = commits.length ? commits[0] : null;
  return (
    <Dialog open={open} onClose={handleClose} className={Styles.dialog}>
      <DialogTitle className={Styles.dialogHeader}>
        <IconButton onClick={handleClose} color="primary">
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <ModalContent
        commitData={commitData}
        markDownContent={markDownContent}
        loading={loading}
        error={error}
        markDownContentError={markDownContentError}
      />
    </Dialog>
  );
}
