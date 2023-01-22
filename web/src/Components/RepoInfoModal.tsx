import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import { IRepo } from '../interfaces/apiInterfaces/repo.interface';
import { Commit } from '../interfaces/apiInterfaces/commit.interface';
import useApi from '../helpers/hooks/use-api';
import { apiEndPoints } from '../helpers/api-helper';
import ReactMarkdown from 'react-markdown';
import useApiMarkDown from '../helpers/hooks/use-api-markdown';
import CloseIcon from '@mui/icons-material/Close';
import Styles from '../Styles/Components/repo-info-modal.module.scss';

// const style = {
//   position: 'absolute' as 'absolute',
//   top: '50%',
//   left: '50%',
//   transform: 'translate(-50%, -50%)',
//   width: 'fit-content',
//   height: 400,
//   overflow: 'scroll',
//   bgcolor: 'background.paper',
//   border: '2px solid #000',
//   boxShadow: 24,
//   p: 4,
// };

interface PropsInterface {
  open: boolean;
  handleClose: () => void;
  repo: IRepo;
}

export default function RepoInfoModal(props: PropsInterface) {
  const { open, handleClose, repo } = props;
  const commits = useApi<Commit>(
    `${apiEndPoints.GIT_REPOS_API}/${repo.full_name}/commits`
  );
  const markDownContent = useApiMarkDown(
    'https://raw.githubusercontent.com/silverorange/admin/master/README.md'
  );

  const commitData = commits.length ? commits[0] : null;
  return (
    <div>
      {commitData && (
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle className={Styles.dialogHeader}>
            <IconButton onClick={handleClose} color="primary">
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              <span className={Styles.headings}>Author's name : </span>
              {commitData.commit.author.name}
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <span className={Styles.headings}>Commit : </span>
              {commitData.commit.message}
            </Typography>
            <ReactMarkdown>{markDownContent}</ReactMarkdown>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
