import React from 'react';
import styles from './logindialog.css';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material';
import { IAppState } from '../../app.types';

type Props = {
  appState: IAppState;
  setAppState: React.Dispatch<React.SetStateAction<IAppState>>;
};
export function LoginDialog({ appState, setAppState }: Props) {
  return (
    <Dialog
      open={appState.isLoginDialogOpen}
      onClose={() => {
        setAppState((st) => ({ ...st, isLoginDialogOpen: false }));
      }}
    >
      <DialogTitle>Авторизация</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="login"
          label="login"
          type="text"
          // fullWidth
          variant="standard"
          sx={{ marginRight: 5 }}
          value={appState.loginPassword.username}
          onChange={(e) => {
            setAppState((st) => ({
              ...st,
              loginPassword: { ...st.loginPassword, username: e.target.value },
            }));
          }}
        />
        <TextField
          autoFocus
          margin="dense"
          id="password"
          label="password"
          type="password"
          // fullWidth
          variant="standard"
          value={appState.loginPassword.password}
          onChange={(e) => {
            setAppState((st) => ({
              ...st,
              loginPassword: { ...st.loginPassword, password: e.target.value },
            }));
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            setAppState((st) => ({ ...st, isLoginDialogOpen: false }));
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={() => {
            setAppState((st) => ({ ...st, isLoginDialogOpen: false }));
            fetch('/api/login', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json;charset=utf-8',
              },
              body: JSON.stringify(appState.loginPassword),
            }).then((res) => {
              console.log(document.cookie);
              if (document.cookie) {
                setAppState((st) => ({ ...st, isLoggedin: true }));
              }
            });
          }}
        >
          login
        </Button>
      </DialogActions>
    </Dialog>
  );
}
