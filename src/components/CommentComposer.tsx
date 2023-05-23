import {
  ContentFocus,
  ProfileOwnedByMe,
  useCreateComment,
  PublicationId,
  CollectPolicyType,
} from '@lens-protocol/react-web';
import { TextField, Button, Grid, InputAdornment } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { useState } from 'react';

const upload = async (metadata: unknown) => {

  const res = await fetch('/api/upload', {
    method: 'POST',
    body: JSON.stringify({ metadata }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const data = await res.json();
  return data?.url;
}

export const CommentComposer = ({
  publisher,
  publicationId,
}: {
  publisher: ProfileOwnedByMe;
  publicationId: PublicationId;
}) => {
  const {
    execute: comment,
    error,
    isPending,
  } = useCreateComment({ publisher, upload });

  const [commentContent, setCommentContent] = useState('');

  const submit = async (content: string) => {
    let result = await comment({
      publicationId,
      content,
      contentFocus: ContentFocus.TEXT,
      locale: 'en',
      collect: {
        type: CollectPolicyType.NO_COLLECT,
      },
    });

    setCommentContent('');
  };

  return (
    <TextField
      size="small"
      type="text"
      id="comment"
      value={commentContent}
      placeholder="Leave your comment ..."
      disabled={isPending}
      onChange={(e) => setCommentContent(e.target.value)}
      sx={{
        display: 'flex',
        minWidth: '400px',
        maxWidth: '800px',
      }}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <Button
              variant="text"
              disabled={isPending}
              endIcon={<SendIcon />}
              onClick={() => submit(commentContent)}
            ></Button>
          </InputAdornment>
        ),
      }}
    ></TextField>
  );
};
