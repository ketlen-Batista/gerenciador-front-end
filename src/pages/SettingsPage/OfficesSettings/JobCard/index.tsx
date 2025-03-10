import React from 'react';

import { DeleteOutlined } from '@material-ui/icons';
import CreateOutlinedIcon from '@material-ui/icons/CreateOutlined';
import { Box, Card, CardContent, IconButton, Typography } from '@mui/material';

interface JobCardProps {
  job: { value: number; name: string };
  onEdit?: (name: string, id?: number) => void;
  onDelete?: (id?: number) => void;
}

const JobCard: React.FC<JobCardProps> = ({ job, onEdit, onDelete }) => {
  return (
    <Card variant="outlined">
      <CardContent>
        <Box
          display={'flex'}
          flexDirection={'row'}
          alignItems={'center'}
          justifyContent={'space-between'}
        >
          <Typography variant="h6">{job.name}</Typography>

          <Box display="flex" justifyContent="flex-end" mt={1}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <IconButton onClick={() => onEdit(job?.name, job?.value)}>
                <CreateOutlinedIcon fontSize="medium" color="primary" />
              </IconButton>
              <IconButton onClick={() => onDelete(job?.value)}>
                <DeleteOutlined color="secondary" />
              </IconButton>
            </div>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default JobCard;
