import { Button, Typography } from '@material-ui/core';
import { FC, useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import PageColor from '../components/PageColor';
import RoleGrid from '../components/RoleGrid';
import RoleInfo from '../components/RoleInfo';
import { rolesList } from '../hooks/roles';

const RoleDescriptions: FC = () => {
  const [roleSelected, setRoleSelected] = useState<number>(0);
  const [descriptionOpen, setDescriptionOpen] = useState<boolean>(false);

  const onRoleClick = useCallback((index: number) => {
    setRoleSelected(index);
    setDescriptionOpen(true);
  }, []);

  return (
    <>
      <PageColor color="primary">
        <Typography variant="h3" component="h1">
          Pick a role to view it's description.
        </Typography>
        <RoleGrid
          roles={rolesList}
          onClick={onRoleClick}
          disabled={descriptionOpen}
        />
        <Button component={Link} to="/" color="secondary" variant="contained">
          Back
        </Button>
      </PageColor>
      <RoleInfo
        role={rolesList[roleSelected]}
        open={descriptionOpen}
        onClose={() => setDescriptionOpen(false)}
      />
    </>
  );
};

export default RoleDescriptions;
