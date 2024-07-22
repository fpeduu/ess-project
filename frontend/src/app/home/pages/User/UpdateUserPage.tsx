// src/pages/User/UpdateUserPage.tsx

import React from 'react';
import { useParams } from 'react-router-dom';
import UpdateUserForm from '../../forms/UpdateUserForm';

const UpdateUserPage: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();

  if (!userId) {
    return <p>User ID is missing</p>; // Mensagem de erro ou redirecionamento
  }

  return (
    <div>
     
      <UpdateUserForm userId={userId} /> {/* Passando userId para o componente UpdateUserForm */}
    </div>
  );
};

export default UpdateUserPage;
