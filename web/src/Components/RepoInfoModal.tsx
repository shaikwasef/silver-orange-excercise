import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { IRepo } from '../interfaces/apiInterfaces/repo.interface';
import { Commit } from '../interfaces/apiInterfaces/commit.interface';
import useApi from '../helpers/hooks/use-api';
import { apiEndPoints } from '../helpers/api-helper';
import ReactMarkdown from 'react-markdown';
import useApiMarkDown from '../helpers/hooks/use-api-markdown';
import Styles from '../Styles/Components/repo-info-modal.module.scss';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 'fit-content',
  height: 400,
  overflow: 'scroll',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

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
        <Modal open={open} onClose={handleClose}>
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              <span className={Styles.headings}>Author's name : </span>
              {commitData.commit.author.name}
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <span className={Styles.headings}>Commit : </span>
              {commitData.commit.message}
            </Typography>
            <ReactMarkdown>{markDownContent}</ReactMarkdown>
          </Box>
        </Modal>
      )}
    </div>
  );
}
