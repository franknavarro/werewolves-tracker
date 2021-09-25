import { Button, Typography } from '@material-ui/core';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import PageColor from '../components/PageColor';
import RoleGrid from '../components/RoleGrid';
import { rolesList } from '../hooks/roles';

const RoleDescriptions: FC = () => {
  return (
    <PageColor color="primary">
      <Typography variant="h3" component="h1">
        Pick a role to view it's description.
      </Typography>
      <RoleGrid roles={rolesList} />
      <Button component={Link} to="/" color="secondary" variant="contained">
        Back
      </Button>
    </PageColor>
  );
};

export default RoleDescriptions;
