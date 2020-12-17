import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const toastOptions = {
  position: 'top-right',
  autoClose: 2000,
  hideProgressBar: false,
  pauseOnHover: false,
  closeOnClick: true,
  progress: undefined,
};

const joinBoard = () => {
  toast.info('🥳 Welcome to join! Yeah!', toastOptions);
};

const saveSnapshot = () => {
  toast('📸 Snapshot is saved!', toastOptions);
};

const completeDownload = () => {
  toast.success('🗂 Download completed!', toastOptions);
};

const copyURL = () => {
  toast.success('🔗 URL copied!', toastOptions);
};

export default {
  joinBoard,
  saveSnapshot,
  completeDownload,
  copyURL,
};
