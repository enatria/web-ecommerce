import React from 'react';
import ListProducts from '../../components/organisms/ListProducts';

import { useHistory } from 'react-router-dom';
import { isAdmin} from '../../config/authService';

export default function Home() {
  const history = useHistory()
  if (isAdmin()) {
    history.push('/admin')
}
  return (
    <div>
      <ListProducts/>
    </div>
  );
}
